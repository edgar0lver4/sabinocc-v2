import { HeadersRequest } from '../types/services.type';

class FetchPetition {
  private token: string | undefined;
  private isV2: boolean | undefined;
  constructor(token?: string, isVersion2?: boolean) {
    this.token = token;
    this.isV2 = isVersion2;
  }
  protected generateHeader(): HeadersRequest | undefined {
    let headers = undefined;
    if (this.token !== undefined) {
      if (this.isV2 === true) {
        headers = {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
            'X-API-Version': 2.0,
          },
        };
      } else {
        headers = {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        };
      }
    } else {
      if (this.isV2 === true) {
        headers = {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Version': 2.0,
          },
        };
      } else {
        headers = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
      }
    }

    return headers;
  }
  async get<T>(url: string): Promise<Response> {
    const header = this.generateHeader();
    return await fetch(url, header);
  }

  async post<T>(url: string, body: any): Promise<T | Response> {
    const header = {
      ...this.generateHeader(),
      method: 'POST',
      body: JSON.stringify(body),
    };
    return await fetch(url, header);
  }

  async delete<T>(url: string, body?: any): Promise<T | Response> {
    if (body !== undefined) {
      const header = {
        ...this.generateHeader(),
        method: 'DELETE',
        body: JSON.stringify(body),
      };
      return await fetch(url, header);
    } else {
      const header = {
        ...this.generateHeader(),
        method: 'DELETE',
      };
      return await fetch(url, header);
    }
  }
  async patch<T>(url: string, body?: any): Promise<T | Response> {
    const header = {
      ...this.generateHeader(),
      method: 'PATCH',
    };
    return await fetch(url, header);
  }
}

export default FetchPetition;
