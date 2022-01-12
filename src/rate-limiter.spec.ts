// BUILD A RATE LIMITER
// A rate limiter can limit by requests x number per second
// Given {id: "xxxxxxx"} it will return a boolean to represent if the action is allowed
import RateLimiter from './rate-limiter'
import {Limitless} from './types'

describe("Rate limiter", () => {
  let rl: Limitless

  it('should NOT allow calling anything beyond rate', () => {
    rl = new RateLimiter({allowedCalls: 1})

    expect(rl.isAllowed({id: 'A'})).toBe(true)
    expect(rl.isAllowed({id: 'A'})).toBe(false)
    expect(rl.isAllowed({id: 'B'})).toBe(true)
  })

  it('should allow calling rate after timeout', () => {
    jest.useFakeTimers();

    rl = new RateLimiter({allowedCalls: 2, timeperiod: 1000})
    
    expect(rl.isAllowed({id: 'A'})).toBe(true)
    expect(rl.isAllowed({id: 'A'})).toBe(true)
    expect(rl.isAllowed({id: 'A'})).toBe(false)

    jest.advanceTimersByTime(1001)

    expect(rl.isAllowed({id: 'A'})).toBe(true)

    jest.useRealTimers();
  })
});
