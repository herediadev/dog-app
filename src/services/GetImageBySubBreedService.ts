import {IGateway} from "./IGateway";
import {ImageResponse} from "./ImageResponse";

export class GetImageBySubBreedService {
    constructor(private gateway: IGateway) {
    }

    public async execute(subBreed: string): Promise<ImageResponse> {
        return await this.gateway.get<ImageResponse>("https://dog.ceo/api/breed/" + subBreed + "/images");
    }
}
