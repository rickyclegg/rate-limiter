import {Limitless, AllowParams, RateLimiterOptions} from './types'
import {MemBucket} from './buckets/mem-bucket'
import { Bucket } from './buckets/types';

class RateLimiter implements Limitless {

    private calls: Bucket
    private options: Omit<RateLimiterOptions, 'container'>

    constructor({container, ...options}: RateLimiterOptions) {
        this.options = options;
        this.calls = container
    }

    public isAllowed(params: AllowParams): boolean {
        if (this.calls.get(params.id) < this.options.allowedCalls) {
            this.calls.set(params.id, 1)

            if (this.options.timeperiod) {
                setTimeout(() => {
                    this.calls.delete(params.id)
                }, this.options.timeperiod);
            }

            return true
        }

        return false
    }
}

export default RateLimiter
