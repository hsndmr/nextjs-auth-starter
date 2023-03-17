import Client from '@/api/client';

export abstract class BaseService {
  public client: Client;
  constructor(client: Client) {
    this.client = client;
  }
}
