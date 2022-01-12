import {Limitless, AllowParams, RateLimiterOptions} from './types'

class RateLimiter implements Limitless {

    private calls: Record<string, number> = {}
    private options: RateLimiterOptions 
    
    constructor(options: RateLimiterOptions) {
        this.options = options;
    }
    
    public isAllowed(params: AllowParams): boolean {
        if (!this.options.timeperiod) {
            if (!this.calls[params.id]) {
                this.calls[params.id] = 1
                return true
            } 
            return false
        } else {
            let numberOfCalls = this.calls[params.id] ?? 0

            if (numberOfCalls < this.options.allowedCalls) {
                numberOfCalls += 1;
                this.calls[params.id] = numberOfCalls;

                setTimeout(() => {
                    delete this.calls[params.id];
                }, this.options.timeperiod);

                return true
            }
        }

        return false 
    }

}

export default RateLimiter