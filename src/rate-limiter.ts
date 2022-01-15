import {Limitless, AllowParams, RateLimiterOptions} from './types'
import {MemBucket} from './buckets/mem-bucket'
import { Bucket } from './buckets/types';

class RateLimiter implements Limitless {

    private bucket: Bucket
    private options: Omit<RateLimiterOptions, 'bucket'>

    constructor({bucket, ...options}: RateLimiterOptions) {
        this.options = options;
        this.bucket = bucket
    }

    //@ts-ignore
    public async isAllowed(params: AllowParams): Promise<boolean> {
        if (await this.bucket.get(params.id) < this.options.allowedCalls) {
            await this.bucket.set(params.id, 1)

            if (this.options.timeperiod) {
                setTimeout(async () => {
                    await this.bucket.delete(params.id)
                }, this.options.timeperiod);
            }

            return true
        }

        return false
    }
}

export default RateLimiter
