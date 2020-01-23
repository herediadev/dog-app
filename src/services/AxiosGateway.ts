import axios, {AxiosInstance} from "axios";
import {IGateway} from "./IGateway";
import {ApiConfig} from "../commons/ApiConfig";

class AxiosGateway implements IGateway {
    private readonly apiServiceInstance: AxiosInstance;

    constructor() {
        this.apiServiceInstance = axios.create(ApiConfig);
    }

    public async get<RESPONSE>(url: string): Promise<RESPONSE> {
        const {data} = await this.apiServiceInstance.get(url);
        return data;
    }
}

export const axiosGateway = new AxiosGateway();

export {
    AxiosGateway,
}

