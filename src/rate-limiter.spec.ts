// BUILD A RATE LIMITER
// A rate limiter can limit by requests x number per second
// Given {id: "xxxxxxx"} it will return a boolean to represent if the action is allowed
import { MemBucket } from './buckets/mem-bucket';
import RateLimiter from './rate-limiter'
import {Limitless, AllowParams} from './types'

describe("Rate limiter", () => {
  const getRandomInt = (): number => Math.floor(Math.random() * 1000)

  const createRandomParams = (): AllowParams => ({
    id: getRandomInt().toString()
  })

  const assertAllowedCalls = async (rl: Limitless, params: AllowParams, calls: number): Promise<void> => {
    for(let i = 0; i < calls; i++) {
      expect(await rl.isAllowed(params)).toBe(true)
    }
  }

  const assertBlockedCalls = async (rl: Limitless, params: AllowParams, calls: number): Promise<void> => {
    for(let i = 0; i < calls; i++) {
      expect(await rl.isAllowed(params)).toBe(false)
    }
  }

  it('should NOT allow calling anything beyond rate', async () => {
    const params1 = createRandomParams()
    const params2 = createRandomParams()
    const allowedCalls = getRandomInt()

    const rl = new RateLimiter({allowedCalls, container: new MemBucket()})

    await assertAllowedCalls(rl, params1, allowedCalls)
    await assertBlockedCalls(rl, params1, allowedCalls)
    await assertAllowedCalls(rl, params2, allowedCalls)
  })

  it('should allow calling rate after timeout', async () => {
    const params1 = createRandomParams()
    const allowedCalls = getRandomInt()

    jest.useFakeTimers();

    const rl = new RateLimiter({allowedCalls, timeperiod: 1000, container: new MemBucket()})

    await assertAllowedCalls(rl, params1, allowedCalls)
    await assertBlockedCalls(rl, params1, getRandomInt())

    jest.advanceTimersByTime(1001)

    await assertAllowedCalls(rl, params1, allowedCalls)

    jest.useRealTimers();
  })
});
