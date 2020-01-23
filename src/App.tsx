import React from 'react';
import './App.css';
import {Button, Card, Layout, TreeSelect, Typography} from "antd";
import {IBreedResponse} from "./services/IBreedResponse";
import {GetAllBreedsService} from "./services/GetAllBreedsService";
import {axiosGateway} from "./services/AxiosGateway";

const {Header, Content} = Layout;
const {Title} = Typography;
const {SHOW_PARENT} = TreeSelect;
const {Meta} = Card;

const dogsImages = {
    "message": [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10822.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10832.jpg",

        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10147.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10185.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10225.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10437.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10439.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10447.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10680.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10787.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10848.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10859.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10986.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_11211.jpg"
    ],
    "status": "success"
};

class App extends React.Component<any, any> {
    private readonly tProps: any;
    private readonly getAllBreedsService: GetAllBreedsService;

    state = {
        value: [],
        dogsImages: [],
        treeData: []
    };

    constructor(props: any) {
        super(props);
        this.getAllBreedsService = new GetAllBreedsService(axiosGateway);
        this.tProps = {
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select the dogs you want to search',
            style: {
                width: '100%',
            },
        };
    }

    onChange = (value: any) => {
        console.log('onChange ', value);
        this.setState({value});
    };
    searchDogs = () => {
        console.log(this.state.value);
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
        console.log(treeData)
    }

    render() {
        return (
            <Layout>
                <Header className="header">
                    <Title className="title">Dog App</Title>
                </Header>
                <Layout>
                    <Content className="content">
                        <TreeSelect {...this.tProps} treeData={this.state.treeData} style={{width: "85%"}}/>
                        <Button type={"primary"} onClick={this.searchDogs}>Search</Button>
                        <div className="row">
                            {dogsImages.message.map(image => (
                                <div className="column" key={image}>
                                    <Card
                                        hoverable
                                        style={{width: 240, height: "100%", marginTop: "5px"}}
                                        cover={<img alt="example" src={image}/>}>
                                        <Meta title="bark bark"/>
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
