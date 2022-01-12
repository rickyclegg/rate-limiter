import {Limitless, AllowParams} from './types'

class RateLimiter implements Limitless {

    private calls: Record<string, boolean> = {}

    public isAllowed(params: AllowParams): boolean {
        if (!this.calls[params.id]) {
            this.calls[params.id] = true
            return true
        } 
        return false
    }

}

export default RateLimiter