import { RequestBuilder } from '../12-builder/builder.js';

interface IDummyPrduct {
  getProduct(id: number): Promise<Record<string, any> | Error>;
}

class DummyProduct implements IDummyPrduct {
  async getProduct(id: number): Promise<Record<string, any>> {
    try {
      const res = await new RequestBuilder()
        .addUrl(`https://dummyjson.com/products/${id}`)
        .exec();

      if (!res.ok) {
        console.error(`Продукт с id ${id} не найден`);
      }

      return await res.json();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

class ProxyDummy implements IDummyPrduct {
  constructor(
    private api: IDummyPrduct,
    private itemId: number,
  ) {}

  async getProduct(id: number): Promise<Record<string, any> | Error> {
    if (id <= 10) {
      return await this.api.getProduct(this.itemId);
    }

    return new Error('Такого id не существует');
  }
}

const proxy = new ProxyDummy(new DummyProduct(), 11);
proxy.getProduct(11).then((res) => console.log(res));
