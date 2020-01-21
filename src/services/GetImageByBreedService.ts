import {IGateway} from "./IGateway";
import {ImageResponse} from "./ImageResponse";

class GetImageByBreedService {
    constructor(private gateway: IGateway) {
    }

    public async execute(breed: string): Promise<ImageResponse> {
        return await this.gateway.get("api/breed/" + breed + "/images")
    }
}

export {
    GetImageByBreedService
}
