import {ITreeDataModel, ITreeDataModelBase} from "./ITreeDataModels";
import {BreedSubBreedModel} from "./BreedSubBreedModel";

class CreateTreeData {
    public execute = (breedAndSubBreeds: BreedSubBreedModel[]): ITreeDataModel[] => {
        return breedAndSubBreeds.map((breedAndSubBreed: BreedSubBreedModel, index: number) => this.createDataTreeModel(index, breedAndSubBreed));
    };

    private createDataTreeModel(index: number, breedAndSubBreed: BreedSubBreedModel): ITreeDataModel {
        const value: string = "0-" + index;
        return {
            title: breedAndSubBreed.breed,
            value: breedAndSubBreed.breed,
            key: value,
            children: this.getChildren(breedAndSubBreed, value)
        };
    }

    private getChildren(breedAndSubBreed: BreedSubBreedModel, index: string): ITreeDataModelBase[] {
        return breedAndSubBreed.subBreeds.map((subBreed: string, subIndex: number) => CreateTreeData.createTreeDataChildrenModel(breedAndSubBreed, subBreed, index, subIndex));
    }

    private static createTreeDataChildrenModel(breedAndSubBreed: BreedSubBreedModel, subBreed: string, index: string, subIndex: number): ITreeDataModelBase {
        return {
            title: breedAndSubBreed.breed + "-" + subBreed,
            value: breedAndSubBreed.breed + "/" + subBreed,
            key: index + "-" + subIndex
        };
    }
}

export {
    CreateTreeData
}
