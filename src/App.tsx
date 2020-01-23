import React from 'react';
import './App.css';
import {Button, Card, Layout, TreeSelect, Typography} from "antd";
import {IBreedResponse} from "./services/IBreedResponse";
import {GetAllBreedsService} from "./services/GetAllBreedsService";
import {axiosGateway} from "./services/AxiosGateway";
import {GetImageByBreedService} from "./services/GetImageByBreedService";

const {Header, Content} = Layout;
const {Title} = Typography;
const {SHOW_PARENT} = TreeSelect;

class App extends React.Component<any, any> {
    private readonly getAllBreedsService: GetAllBreedsService;
    private readonly getImageByBreedService: GetImageByBreedService;

    state = {
        selectedBreeds: [],
        dogsImages: [],
        treeData: []
    };

    constructor(props: any) {
        super(props);
        this.getAllBreedsService = new GetAllBreedsService(axiosGateway);
        this.getImageByBreedService = new GetImageByBreedService(axiosGateway);
    }

    onChange = (value: any) => {
        this.setState({selectedBreeds: value});
    };

    searchDogs = async () => {
        const getImagePromise = this.state.selectedBreeds.map(selectedBreedsAndSubBreed => this.getImageByBreedService.execute(selectedBreedsAndSubBreed));
        const imageResponses = await Promise.all(getImagePromise);
        const images = imageResponses.flatMap(selectedBreed => selectedBreed.message);
        this.setState({dogsImages: images});
    };

    async componentDidMount(): Promise<void> {
        const breeds: IBreedResponse = await this.getAllBreedsService.execute();
        const breedAndSubBreeds = Object.keys(breeds.message).map((breed) => {
            return {breed: breed, subBreeds: breeds.message[breed]}
        });
        const treeData = breedAndSubBreeds.map((breedAndSubBreed, index) => {
            const value = "0-" + index;
            return {
                title: breedAndSubBreed.breed,
                value: breedAndSubBreed.breed,
                key: value,
                children: breedAndSubBreed.subBreeds.map((subBreed, subIndex) => {
                    return {
                        title: breedAndSubBreed.breed + "-" + subBreed,
                        value: breedAndSubBreed.breed + "/" + subBreed,
                        key: value + "-" + subIndex
                    };
                })
            };
        });
        this.setState({treeData});
    }

    render() {
        const tProps = {
            treeData: this.state.treeData,
            value: this.state.selectedBreeds,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select the dogs you want to search',
            style: {
                width: '100%',
            },
        };
        return (
            <Layout>
                <Header className="header">
                    <Title className="title">Dog App</Title>
                </Header>
                <Layout>
                    <Content className="content">
                        <TreeSelect {...tProps} style={{width: "85%"}}/>
                        <Button type={"primary"} onClick={this.searchDogs}>Search</Button>
                        <div className="row">
                            {this.state.dogsImages.map((image, index) => (
                                <div className="column" key={image}>
                                    <Card style={{width: 240, height: "100%", marginTop: "5px"}}
                                          cover={<img alt={image} src={image}/>}>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;
