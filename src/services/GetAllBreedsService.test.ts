import {GetAllBreedsService} from "./GetAllBreedsService";
import {IGateway} from "./IGateway";

import breeds from "./breeds.json";
import {IBreedModel} from "./IBreedModel";

/*jest.mock('./Gateway');
const MockGateway: jest.Mocked<IGateway> = new Gateway("") as jest.Mocked<Gateway>;
MockGateway.get.mockImplementation(() => breeds);*/

/*const MockGateway = jest.fn<Gateway, any>((baseUrl: any) => ({
    get(url: string): Array<any> {
        return [""];
    }
}));*/


const MockGateway = jest.fn<IGateway, any>(() => {
    return {
        get<IBreedModel>(url: string): IBreedModel {
            return breeds as any;
        },
    };
});

describe("Given the GetAllBreedsService", () => {
    const getAllBreedsService = new GetAllBreedsService(new MockGateway());

    test("it will get all the breeds", async () => {
        const allBreeds: IBreedModel = await getAllBreedsService.execute();
        expect(allBreeds.status).toBe("success");
        expect(allBreeds.message).toBeDefined();
    });
});
