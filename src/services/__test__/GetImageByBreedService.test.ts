import {GetImageByBreedService} from "../GetImageByBreedService";
import {IGateway} from "../IGateway";
import {ImageResponse} from "../ImageResponse";
import {AxiosGateway} from "../AxiosGateway";

jest.mock('../AxiosGateway');
const breedResponse = {
    "message": [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10822.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10832.jpg",

        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10147.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10185.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10225.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10437.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10439.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10447.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10680.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10787.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10848.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10859.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10986.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_11211.jpg"
    ],
    "status": "success"
} as ImageResponse;
const subBreedResponse = {
    "message": [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg"
    ],
    "status": "success"
} as ImageResponse;

describe("GetImageByBreedService", () => {
    let getImageByBreedService: GetImageByBreedService;
    let mockGateway: jest.Mocked<IGateway>;

    beforeEach(() => {
        mockGateway = new AxiosGateway() as jest.Mocked<AxiosGateway>;
        getImageByBreedService = new GetImageByBreedService(mockGateway)
    });

    describe("Given the breed", () => {
        it("it will get the breed images", async () => {
            mockGateway.get.mockResolvedValue(breedResponse);
            const byBreed: ImageResponse = await getImageByBreedService.execute("hound");
            expect(byBreed.message.length).toBeGreaterThan(0);
            expect(byBreed.status).toBe("success");
            expect(mockGateway.get).toHaveBeenCalledTimes(1);
        });
    });

    describe("Given two breeds", () => {
        it("it will get the two responses", async () => {
            mockGateway.get.mockResolvedValue(subBreedResponse);
            const subBreed1 = "hound/afghan";
            const subBreed2 = "bulldog/english";
            const breedsResponses = await Promise.all([getImageByBreedService.execute(subBreed1), getImageByBreedService.execute(subBreed2)]);
            const breedsImages = breedsResponses.flatMap(breeds => breeds.message);
            expect(mockGateway.get).toHaveBeenCalledTimes(2);
            expect(breedsImages.length).toBe(10);
        });
    });
});
