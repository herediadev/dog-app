import React from 'react';
import './App.css';
import {Button, Card, Layout, TreeSelect, Typography} from "antd";
import {IBreedResponse} from "./services/IBreedResponse";
import {GetAllBreedsService} from "./services/GetAllBreedsService";
import {axiosGateway} from "./services/AxiosGateway";
import {GetImageByBreedService} from "./services/GetImageByBreedService";
import {GetBreedAndSubBreeds} from "./GetBreedAndSubBreeds";
import {CreateTreeData} from "./CreateTreeData";
import {BreedSubBreedModel} from "./BreedSubBreedModel";
import {ITreeDataModel} from "./ITreeDataModels";

const {Header, Content} = Layout;
const {Title} = Typography;
const {SHOW_PARENT} = TreeSelect;

interface IAppState {
    selectedBreeds: string[],
    dogsImages: string[],
    treeData: ITreeDataModel[]
}

class App extends React.Component<any, IAppState> {
    private readonly getAllBreedsService: GetAllBreedsService;
    private readonly getImageByBreedService: GetImageByBreedService;
    private readonly getBreedAndSubBreeds: GetBreedAndSubBreeds;
    private readonly createTreeData: CreateTreeData;

    constructor(props: any) {
        super(props);
        this.state = {
            selectedBreeds: [],
            dogsImages: [],
            treeData: []
        };
        this.createTreeData = new CreateTreeData();
        this.getBreedAndSubBreeds = new GetBreedAndSubBreeds();
        this.getAllBreedsService = new GetAllBreedsService(axiosGateway);
        this.getImageByBreedService = new GetImageByBreedService(axiosGateway);
    }

    public async componentDidMount(): Promise<void> {
        const breeds: IBreedResponse = await this.getAllBreedsService.execute();
        const breedAndSubBreeds: BreedSubBreedModel[] = this.getBreedAndSubBreeds.execute(breeds);
        const treeData: ITreeDataModel[] = this.createTreeData.execute(breedAndSubBreeds);
        this.setState({treeData});
    }

    public render(): React.ReactNode {
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
                            {this.state.dogsImages.map((image) => (
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

    private onChange = (value: string[]): void => {
        this.setState({selectedBreeds: value});
    };

    private searchDogs = async (): Promise<void> => {
        const getImagePromise = this.state.selectedBreeds.map(selectedBreedsAndSubBreed => this.getImageByBreedService.execute(selectedBreedsAndSubBreed));
        const imageResponses = await Promise.all(getImagePromise);
        const images = imageResponses.flatMap(selectedBreed => selectedBreed.message);
        this.setState({dogsImages: images});
    };
}

export default App;
