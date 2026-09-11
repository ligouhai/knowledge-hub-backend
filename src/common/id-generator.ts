/*
 * @Date: 2026-09-01 16:22:18
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-01 16:40:00
 */

/**
 * 64-bit 雪花 ID（与 snowflake-id 包同一套 bit 布局）：
 * timestamp | worker(10) | sequence(12)，以十进制字符串返回，供 Postgres BIGINT 使用。
 */
class SnowflakeGenerator {
  private seq = 0;
  private lastTime = 0;

  constructor(
    private readonly mid: number,
    private readonly offset: number,
  ) {}

  generate(): string {
    let time = Date.now();
    if (this.lastTime === time) {
      this.seq += 1;
      if (this.seq > 4095) {
        this.seq = 0;
        while (Date.now() <= time) {
          // 同一毫秒内序列耗尽，等到下一毫秒
        }
        time = Date.now();
      }
    } else {
      this.seq = 0;
    }
    this.lastTime = time;

    const timestampBits = BigInt(time - this.offset);
    const workerBits = BigInt(this.mid & 1023);
    const seqBits = BigInt(this.seq & 4095);
    const id = (timestampBits << 22n) | (workerBits << 12n) | seqBits;
    return id.toString();
  }
}

const snowflake = new SnowflakeGenerator(
  Number(process.env.SNOWFLAKE_WORKER_ID ?? 1) % 1023,
  Number(process.env.SNOWFLAKE_OFFSET ?? 1704067200000),
);

/** 生成雪花 ID（string），对应 Postgres BIGINT */
export function nextSnowflakeId(): string {
  return snowflake.generate();
}
