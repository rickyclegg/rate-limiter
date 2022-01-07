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
  
  it('exists', () => {
    expect(rl).toBeDefined()
  })
  
  it('returns true when isValidId is called', () => {
    expect(rl.isValidId({id: 'A'})).toBe(true);
  })

  it('should return false if id has already been called', () => {
    expect(rl.isValidId({id: 'A'})).toBe(true)
    expect(rl.isValidId({id: 'A'})).toBe(false)
  })

  it('should return block A if called twice but allow B', () => {
    expect(rl.isValidId({id: 'A'})).toBe(true)
    expect(rl.isValidId({id: 'B'})).toBe(true)
    expect(rl.isValidId({id: 'A'})).toBe(false)
  })
  
});
