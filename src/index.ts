type Cache = {
  value: unknown;
  expire: number;
  timeout: NodeJS.Timeout;
};
class Memory {
  private cache: Record<string, Cache> = {};
  public put(key: string, value: unknown, time: number) {
    const timeout = setTimeout(() => {
      // TODO: delete cache
    }, time);
    this.cache[key] = {
      value,
      expire: Date.now() + time,
      timeout,
    };
    return value;
  }

  public get(key: string) {
    const cached = this.cache[key];
    if (!cached) return null;
    if (this.isExpire(cached)) {
      // TODO: delete cache
      return null;
    }
    return cached;
  }

  private isExpire(cached: Cache): boolean {
    return true;
  }
}

export default new Memory();
