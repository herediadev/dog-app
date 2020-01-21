import {IGateway} from "./IGateway";
import imageBySubBreed from "./imageBySubBreed.json";
import {GetImageBySubBreedService} from "./GetImageBySubBreedService";

const MockGateway = jest.fn<IGateway, any>(() => {
    return {
        get<Any>(url: string): Any {
            return imageBySubBreed as any;
        },
    };
});

describe("GetImageBySubBreedService", () => {
    let getImageBySubBreedService = new GetImageBySubBreedService(new MockGateway());

    describe("Given the sub breed", () => {
        it("it will get the sub breed", async () => {
            const imageResponse = await getImageBySubBreedService.execute("hound/afghan");
            expect(imageResponse.status).toBe("success");
            expect(imageResponse.message.length).toBeGreaterThan(0);
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
