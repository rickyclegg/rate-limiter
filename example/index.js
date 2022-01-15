const RateLimiter = require("../dist/rate-limiter").default;
const { MemBucket } = require("../dist/buckets/mem-bucket");

const BUCKET_CLEAR_TIME = 10000;
const ATTEMPTS = 3;

(async function main () {
  const options = {
    allowedCalls: ATTEMPTS,
    timeperiod: BUCKET_CLEAR_TIME,
    bucket: new MemBucket()
  }
  const rl = new RateLimiter(options)

  function colorize(color, output) {
    return ['\033[', color, 'm', output, '\033[0m'].join('');
  }

  console.log(`Rate Limiter - ${ATTEMPTS} allowed every ${BUCKET_CLEAR_TIME / 1000}s`);

  let requestsMade = 1;

  setInterval(() => {
    requestsMade = 1

    console.log(`\nReset limit!`);
  }, BUCKET_CLEAR_TIME)

  setInterval(async () => {
    const isAllowed = await rl.isAllowed({id: 'example'})

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${requestsMade} Attempting.`);

    setTimeout(() => {
      process.stdout.write(`.`);
    }, 500)

    setTimeout(() => {
      process.stdout.write(`.`);
    }, 800)

    setTimeout(() => {
      process.stdout.write(isAllowed ? colorize(92, ' Allowed') : colorize(91, ' Blocked'));

      requestsMade += 1
    }, 1000)
  }, Math.floor(BUCKET_CLEAR_TIME / 5))
}())

