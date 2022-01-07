class RateLimiter implements Limitless {

    private isValidCalled = false

    public isValidId(): boolean {
        if (!this.isValidCalled) {
            this.isValidCalled = true
            return true
        } 
        return false
    }

}

export default RateLimiter