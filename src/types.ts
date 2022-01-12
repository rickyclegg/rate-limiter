export interface AllowParams {
    id: string
}

export interface Limitless {
    isAllowed(params: AllowParams): boolean
}

export interface RateLimiterOptions {
    allowedCalls: number,
    timeperiod?: number
}
