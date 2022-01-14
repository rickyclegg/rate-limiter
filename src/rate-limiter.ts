import {Limitless, AllowParams, RateLimiterOptions, Container} from './types'
import {Bucket} from './bucket'

class RateLimiter implements Limitless {

    private calls: Container
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