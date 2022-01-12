// BUILD A RATE LIMITER
// A rate limiter can limit by requests x number per second
// Given {id: "xxxxxxx"} it will return a boolean to represent if the action is allowed
import RateLimiter from './rate-limiter'
import {Limitless} from './types'

describe("Rate limiter", () => {
  let rl: Limitless

  beforeEach(() => {
    rl = new RateLimiter()
  })

  it('should calling anything twice', () => {
    expect(rl.isAllowed({id: 'A'})).toBe(true)
    expect(rl.isAllowed({id: 'A'})).toBe(false)
    expect(rl.isAllowed({id: 'B'})).toBe(true)
  })
});
