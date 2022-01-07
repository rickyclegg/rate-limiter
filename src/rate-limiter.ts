import {Limitless, ValidParams} from './types'

class RateLimiter implements Limitless {

    private calls: Record<string, boolean> = {}

    public isValidId(params: ValidParams): boolean {
        if (!this.calls[params.id]) {
            this.calls[params.id] = true
            return true
        } 
        return false
    }

}

export default RateLimiter