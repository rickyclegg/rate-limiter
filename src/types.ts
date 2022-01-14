export interface AllowParams {
    id: string
}

export interface Limitless {
    isAllowed(params: AllowParams): boolean
}

export interface RateLimiterOptions {
    container: Container,
    allowedCalls: number,
    timeperiod?: number
}


export interface Container {
    set(id: AllowParams['id'], increment: number) : void 

    get(id: AllowParams['id']): number 

    delete(id: AllowParams['id']): void
}
