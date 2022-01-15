import { Bucket } from './buckets/types';

export interface AllowParams {
    id: string
}

export interface Limitless {
    isAllowed(params: AllowParams): boolean
}

export interface RateLimiterOptions {
    container: Bucket,
    allowedCalls: number,
    timeperiod?: number
}


