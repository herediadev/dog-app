import {IGateway} from "./IGateway";

class Gateway implements IGateway {
    constructor(private baseUrl: string) {
    }

    public async get<RESPONSE>(url: string): Promise<RESPONSE> {
        return Promise.resolve({} as RESPONSE);
    }
}

export {
    Gateway,
}

