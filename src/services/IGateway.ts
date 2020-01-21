export interface IGateway {
    get<RESPONSE>(url: string): Promise<RESPONSE>;
}
