import {IGateway} from "../IGateway";
import {GetImageBySubBreedService} from "../GetImageBySubBreedService";
import {ImageResponse} from "../ImageResponse";
import {AxiosGateway} from "../AxiosGateway";

jest.mock('../AxiosGateway');
const MockGateway: jest.Mocked<IGateway> = new AxiosGateway() as jest.Mocked<AxiosGateway>;
MockGateway.get.mockImplementation(() => Promise.resolve({
    "message": [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg"
    ],
    "status": "success"
} as ImageResponse));


describe("GetImageBySubBreedService", () => {
    let getImageBySubBreedService = new GetImageBySubBreedService(MockGateway);

    describe("Given the sub breed", () => {
        it("it will get the sub breed", async () => {
            const imageResponse = await getImageBySubBreedService.execute("hound/afghan");
            expect(imageResponse.status).toBe("success");
            expect(imageResponse.message.length).toBeGreaterThan(0);
            expect(MockGateway.get).toHaveBeenCalled();
        });
    });

    describe("Given two sub breeds", () => {
        it("it will get the two responses", async () => {
            const subBreed1 = "hound/afghan";
            const subBreed2 = "bulldog/english";
            const allSubBreed = await Promise.all([
                    getImageBySubBreedService.execute(subBreed1),
                    getImageBySubBreedService.execute(subBreed2)
                ]
            ).then((response) => {
                let allSubBreed: string[] = [];
                response.forEach(imageResponse => allSubBreed = allSubBreed.concat(imageResponse.message));
                return allSubBreed;
            });

            expect(allSubBreed.length).toBe(10);
        });
    });
});
