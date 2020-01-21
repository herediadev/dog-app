import {IGateway} from "./IGateway";
import {IBreedModel} from "./IBreedModel";

class GetAllBreedsService {
    private gateway: IGateway;
    private url: string = "https://dog.ceo/api/breeds/list/all";

    constructor(gateway: IGateway) {
        this.gateway = gateway;
    }

    async execute(): Promise<IBreedModel> {
        return await this.gateway.get<IBreedModel>(this.url);
    }
}

export {
    GetAllBreedsService,
}
