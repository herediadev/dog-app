import {IGateway} from "./IGateway";
import {IBreedResponse} from "./IBreedResponse";

class GetAllBreedsService {
    private gateway: IGateway;

    constructor(gateway: IGateway) {
        this.gateway = gateway;
    }

    public async execute(): Promise<IBreedResponse> {
        return await this.gateway.get<IBreedResponse>("/api/breeds/list/all");
    }
}

export {
    GetAllBreedsService,
}
