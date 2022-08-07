type Cache = {
  value: unknown;
  expire: number;
  timeout: NodeJS.Timeout;
};
class Memory {
  private cache: Record<string, Cache> = {};
  public put(key: string, value: unknown, time: number) {
    const timeout = setTimeout(() => {
      this.deleteInternal(key);
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
      this.deleteInternal(key);
      return null;
    }
    return cached;
  }

  public del(key: string) {
    const cache = this.cache[key];
    let canDelete;
    if (cache) {
      if (!isNaN(cache.expire) && this.isExpire(cache)) {
        canDelete = false;
      }
    } else {
      canDelete = false;
    }
    if (canDelete) {
      this.deleteInternal(key);
    }
    return canDelete;
  }

  private deleteInternal(key: string) {
    delete this.cache[key];
  }

  private isExpire(cached: Cache): boolean {
    return cached.expire < Date.now();
  }
}

export default new Memory();
