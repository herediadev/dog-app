import axios, {AxiosInstance} from "axios";
import {IGateway} from "./IGateway";
import {ApiConfig} from "../commons/ApiConfig";

class AxiosGateway implements IGateway {
    private readonly apiServiceInstance: AxiosInstance;

    constructor() {
        this.apiServiceInstance = axios.create(ApiConfig);
    }

    public async get<RESPONSE>(url: string): Promise<RESPONSE> {
        return this.apiServiceInstance.get(url);
    }
}

export {
    AxiosGateway,
}

