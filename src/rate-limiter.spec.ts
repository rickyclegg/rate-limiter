// BUILD A RATE LIMITER
// A rate limiter can limit by requests x number per second
// Given {id: "xxxxxxx"} it will return a boolean to represent if the action is allowed
import RateLimiter from './rate-limiter'
import {Limitless, AllowParams} from './types'

describe("Rate limiter", () => {
  let rl: Limitless

  const getRandomInt = (): number => Math.floor(Math.random() * 1000)

  const createRandomParams = (): AllowParams => ({
    id: getRandomInt().toString()
  })

  const assertAllowedCalls = (params: AllowParams, calls: number): void => {
    for(let i = 0; i < calls; i++) {
      expect(rl.isAllowed(params)).toBe(true)
    }
  }

  const assertBlockedCalls = (params: AllowParams, calls: number) => {
    for(let i = 0; i < calls; i++) {
      expect(rl.isAllowed(params)).toBe(false)
    }
  }

  it('should NOT allow calling anything beyond rate', () => {
    const params1 = createRandomParams()
    const params2 = createRandomParams()
    const allowedCalls = 1

    rl = new RateLimiter({allowedCalls})

    assertAllowedCalls(params1, allowedCalls)
    assertBlockedCalls(params1, allowedCalls)
    assertAllowedCalls(params2, allowedCalls)
  })

  it('should allow calling rate after timeout', () => {
    const params1 = createRandomParams()
    const allowedCalls = getRandomInt()

    jest.useFakeTimers();

    rl = new RateLimiter({allowedCalls, timeperiod: 1000})
    
    assertAllowedCalls(params1, allowedCalls)
    assertBlockedCalls(params1, getRandomInt())

    jest.advanceTimersByTime(1001)

    assertAllowedCalls(params1, allowedCalls)

    jest.useRealTimers();
  })
});
