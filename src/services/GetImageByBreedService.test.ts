import {GetImageByBreedService} from "./GetImageByBreedService";
import {IGateway} from "./IGateway";
import imageByBreed from "./imageByBreed.json";
import {ImageResponse} from "./ImageResponse";

const MockGateway = jest.fn<IGateway, any>(() => {
    return {
        get<ImageByBreed>(url: string): ImageByBreed {
            return imageByBreed as any;
        },
    };
});

describe("GetImageByBreedService", () => {
    describe("Given the breed", () => {
        test("it will get the breed images", async () => {
            const getImageByBreedService = new GetImageByBreedService(new MockGateway());
            const byBreed: ImageResponse = await getImageByBreedService.execute("hound");
            expect(byBreed.message.length).toBeGreaterThan(0);
            expect(byBreed.status).toBe("success");
        });
    });
});
