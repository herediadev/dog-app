import {GetImageByBreedService} from "../GetImageByBreedService";
import {IGateway} from "../IGateway";
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
} as ImageResponse));


describe("GetImageByBreedService", () => {
    describe("Given the breed", () => {
        it("it will get the breed images", async () => {
            const getImageByBreedService = new GetImageByBreedService(MockGateway);
            const byBreed: ImageResponse = await getImageByBreedService.execute("hound");
            expect(byBreed.message.length).toBeGreaterThan(0);
            expect(byBreed.status).toBe("success");
            expect(MockGateway.get).toHaveBeenCalled();
        });
    });
});
