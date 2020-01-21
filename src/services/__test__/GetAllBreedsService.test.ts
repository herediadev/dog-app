import {GetAllBreedsService} from "../GetAllBreedsService";
import {IBreedModel} from "../IBreedModel";
import {IGateway} from "../IGateway";
import {Gateway} from "../Gateway";

jest.mock('../Gateway');
const MockGateway: jest.Mocked<IGateway> = new Gateway("") as jest.Mocked<Gateway>;
MockGateway.get.mockImplementation(() => Promise.resolve({
    "message": {
        "affenpinscher": [],
        "african": [],
        "airedale": [],
        "akita": [],
        "appenzeller": [],
        "australian": [
            "shepherd"
        ],
        "basenji": [],
        "beagle": [],
        "bluetick": [],
        "borzoi": [],
        "bouvier": [],
        "boxer": [],
        "brabancon": [],
        "briard": [],
        "buhund": [
            "norwegian"
        ],
        "bulldog": [
            "boston",
            "english",
            "french"
        ],
        "bullterrier": [
            "staffordshire"
        ],
        "cairn": [],
        "cattledog": [
            "australian"
        ],
        "chihuahua": [],
        "chow": [],
        "clumber": [],
        "cockapoo": [],
        "collie": [
            "border"
        ],
        "coonhound": [],
        "corgi": [
            "cardigan"
        ],
        "cotondetulear": [],
        "dachshund": [],
        "dalmatian": [],
        "dane": [
            "great"
        ],
        "deerhound": [
            "scottish"
        ],
        "dhole": [],
        "dingo": [],
        "doberman": [],
        "elkhound": [
            "norwegian"
        ],
        "entlebucher": [],
        "eskimo": [],
        "frise": [
            "bichon"
        ],
        "germanshepherd": [],
        "greyhound": [
            "italian"
        ],
        "groenendael": [],
        "hound": [
            "afghan",
            "basset",
            "blood",
            "english",
            "ibizan",
            "walker"
        ],
        "husky": [],
        "keeshond": [],
        "kelpie": [],
        "komondor": [],
        "kuvasz": [],
        "labrador": [],
        "leonberg": [],
        "lhasa": [],
        "malamute": [],
        "malinois": [],
        "maltese": [],
        "mastiff": [
            "bull",
            "english",
            "tibetan"
        ],
        "mexicanhairless": [],
        "mix": [],
        "mountain": [
            "bernese",
            "swiss"
        ],
        "newfoundland": [],
        "otterhound": [],
        "papillon": [],
        "pekinese": [],
        "pembroke": [],
        "pinscher": [
            "miniature"
        ],
        "pitbull": [],
        "pointer": [
            "german",
            "germanlonghair"
        ],
        "pomeranian": [],
        "poodle": [
            "miniature",
            "standard",
            "toy"
        ],
        "pug": [],
        "puggle": [],
        "pyrenees": [],
        "redbone": [],
        "retriever": [
            "chesapeake",
            "curly",
            "flatcoated",
            "golden"
        ],
        "ridgeback": [
            "rhodesian"
        ],
        "rottweiler": [],
        "saluki": [],
        "samoyed": [],
        "schipperke": [],
        "schnauzer": [
            "giant",
            "miniature"
        ],
        "setter": [
            "english",
            "gordon",
            "irish"
        ],
        "sheepdog": [
            "english",
            "shetland"
        ],
        "shiba": [],
        "shihtzu": [],
        "spaniel": [
            "blenheim",
            "brittany",
            "cocker",
            "irish",
            "japanese",
            "sussex",
            "welsh"
        ],
        "springer": [
            "english"
        ],
        "stbernard": [],
        "terrier": [
            "american",
            "australian",
            "bedlington",
            "border",
            "dandie",
            "fox",
            "irish",
            "kerryblue",
            "lakeland",
            "norfolk",
            "norwich",
            "patterdale",
            "russell",
            "scottish",
            "sealyham",
            "silky",
            "tibetan",
            "toy",
            "westhighland",
            "wheaten",
            "yorkshire"
        ],
        "vizsla": [],
        "waterdog": [
            "spanish"
        ],
        "weimaraner": [],
        "whippet": [],
        "wolfhound": [
            "irish"
        ]
    },
    "status": "success"
} as IBreedModel));

describe("Given the GetAllBreedsService", () => {

    const getAllBreedsService = new GetAllBreedsService(MockGateway);

    it("it will get all the breeds", async () => {
        const allBreeds: IBreedModel = await getAllBreedsService.execute();
        expect(allBreeds.status).toBe("success");
        expect(allBreeds.message).toBeDefined();
        expect(MockGateway.get).toHaveBeenCalled();
    });
});
