type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class RequestBuilder implements RequestBuilder {
  private _method: HttpMethod = 'GET';
  private _url: string = '';
  private _headers: Record<string, string> = {};
  private _body?: any;

  addMethod(method: HttpMethod): this {
    this._method = method;

    return this;
  }

  addUrl(url: string): this {
    this._url = url;

    return this;
  }

  addHeader(key: string, value: string): this {
    this._headers[key] = value;

    return this;
  }

  addBody(body: any): this {
    if (this._method === 'GET' || this._method === 'DELETE') {
      throw new Error(`Метод ${this._method} не поддерживает тело запроса`);
    }
    this._body = body;

    return this;
  }

  async exec() {
    if (!this._url) {
      throw new Error('URL не задан');
    }

    const options: RequestInit = {
      method: this._method,
      headers: this._headers,
      body: this._body,
    };

    return await fetch(this._url, options);
  }
}
