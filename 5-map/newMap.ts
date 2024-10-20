import { IBucket, TBucketEl, TStatus } from './helpers.js';

export class newMap {
  private _bucket: IBucket[] = [];

  get bucket(): IBucket[] {
    return this._bucket;
  }

  private hashCode(key: string): number {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      const hash = key.charCodeAt(i);
      hashCode = (hashCode * 13 + hash) % key.length;
    }

    return hashCode;
  }

  private log(message: TStatus): void {
    console.log(message);
  }

  set(key: string, value: string | number) {
    const hash = this.hashCode(key);
    const bucketEl: TBucketEl = [key, value];
    const item = this._bucket.find((el) => el.hash === hash);

    if (!item) {
      this._bucket.push({ hash, data: [bucketEl] });
      this.log({ status: 'success', message: `В баккет добавлен элемент` });
    } else {
      const index = item.data.findIndex((el: TBucketEl) => el[0] === key);
      if (index >= 0) {
        item.data[index] = bucketEl;
        this.log({
          status: 'success',
          message: `Данные по ключу ${key} перезаписаны`,
        });
      } else {
        item.data = [...item.data, bucketEl];
        this.log({
          status: 'success',
          message: `В элемент баккета добавлено еще одно значение`,
        });
      }
    }
  }

  private findBucket(key: string) {
    const hash = this.hashCode(key);
    return this._bucket.find((el) => el.hash === hash);
  }

  delete(key: string) {
    const bucket = this.findBucket(key);
    if (bucket) {
      const index = bucket.data.findIndex((el: TBucketEl) => el[0] === key);
      if (index >= 0) {
        bucket.data = bucket.data.filter((el: TBucketEl) => el[0] !== key);
        this.log({
          status: 'success',
          message: `Значение по ключу ${key} удалено`,
        });
      } else {
        this.log({
          status: 'error',
          message: `Значение по ключу ${key} не существует`,
        });
      }
    }
  }

  get(key: string): TBucketEl[] | undefined {
    const bucket = this.findBucket(key);
    if (bucket) {
      return bucket.data.filter((el: TBucketEl) => el[0] === key);
    } else {
      this.log({
        status: 'error',
        message: `Значение по ключу ${key} не существует`,
      });
    }
  }

  clear() {
    this._bucket = [];
    this.log({ status: 'success', message: 'Баккет очищен' });
  }
}

const qqq: newMap = new newMap();
qqq.set('name', 'Viktor');
qqq.set('name', 'Viktor2');
qqq.set('nama', 'Viktor3');
// console.log(qqq.bucket[0].data);
qqq.delete('nama');
console.log(qqq.bucket[0].data);
// console.log(qqq.get('nama'));
// qqq.clear();
// console.log(qqq.bucket);