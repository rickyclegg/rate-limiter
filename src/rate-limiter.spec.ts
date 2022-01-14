// BUILD A RATE LIMITER
// A rate limiter can limit by requests x number per second
// Given {id: "xxxxxxx"} it will return a boolean to represent if the action is allowed
import RateLimiter from './rate-limiter'
import {Limitless} from './types'

describe("Rate limiter", () => {
  let rl: Limitless

  const createRandomParams = () => ({
    id: Math.floor(Math.random() * 10000).toString()
  })

  it('should NOT allow calling anything beyond rate', () => {
    const params1 = createRandomParams()
    const params2 = createRandomParams()

    rl = new RateLimiter({allowedCalls: 1})

    expect(rl.isAllowed(params1)).toBe(true)
    expect(rl.isAllowed(params1)).toBe(false)
    expect(rl.isAllowed(params2)).toBe(true)
  })

  it('should allow calling rate after timeout', () => {
    const params1 = createRandomParams()

    jest.useFakeTimers();

    rl = new RateLimiter({allowedCalls: 2, timeperiod: 1000})
    
    expect(rl.isAllowed(params1)).toBe(true)
    expect(rl.isAllowed(params1)).toBe(true)
    expect(rl.isAllowed(params1)).toBe(false)

    jest.advanceTimersByTime(1001)

    expect(rl.isAllowed(params1)).toBe(true)

    jest.useRealTimers();
  })
});
