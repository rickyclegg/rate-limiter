import {Limitless, AllowParams, RateLimiterOptions} from './types'

class RateLimiter implements Limitless {

    private calls: Record<string, number> = {}
    private options: RateLimiterOptions 
    
    constructor(options: RateLimiterOptions) {
        this.options = options;
    }
    
    public isAllowed(params: AllowParams): boolean {
        if (!this.options.timeperiod) {
            if (!this.getNumberOfCalls(params.id)) {
                this.setNumberOfCalls(params.id, 1)
                return true
            } 
            return false
        } else {
            if (this.getNumberOfCalls(params.id) < this.options.allowedCalls) {
                this.setNumberOfCalls(params.id, 1)

                setTimeout(() => {
                    this.deleteNumberOfCalls(params.id)
                }, this.options.timeperiod);

                return true
            }
        }

        return false 
    }

    private setNumberOfCalls(id: AllowParams['id'], increment: number) : void {
        let numberOfCalls = this.getNumberOfCalls(id)
        numberOfCalls += increment;
        this.calls[id] = numberOfCalls;
    }

    private getNumberOfCalls(id: AllowParams['id']): number {
        return this.calls[id] ?? 0
    }

    private deleteNumberOfCalls(id: AllowParams['id']): void {
        delete this.calls[id]
    }
}

export default RateLimiter