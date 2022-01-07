// BUILD A RATE LIMITER
// A rate limiter can limit by requests x number per second
// Given {id: "xxxxxxx"} it will return a boolean to represent if the action is allowed
import RateLimiter from './rate-limiter'

describe("Rate limiter", () => {
  it('exists', () => {
    const rl = new RateLimiter()

    expect(rl).toBeDefined()
  })
});
