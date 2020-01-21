import {IGateway} from "./IGateway";

class Gateway implements IGateway {
    constructor(private baseUrl: string) {
    }

    public get(url: string): any {
        return [];
    }
}

export {
    Gateway,
}

