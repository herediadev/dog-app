import {IBreedResponse} from "./services/IBreedResponse";
import {BreedSubBreedModel} from "./BreedSubBreedModel";

class GetBreedAndSubBreeds {
    public execute = (breeds: IBreedResponse): BreedSubBreedModel[] => {
        return Object.keys(breeds.message).map((breed: string) => GetBreedAndSubBreeds.createBreedSubBreedModel(breed, breeds));
    };

    private static createBreedSubBreedModel(breed: string, breeds: IBreedResponse): BreedSubBreedModel {
        return {
            breed: breed,
            subBreeds: breeds.message[breed]
        };
    }
}

export {
    GetBreedAndSubBreeds
}
