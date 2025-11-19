import type { HttpClient } from "./HttpClient";

export class Service {
  protected client: HttpClient;

  protected resource: string;

  constructor(client: HttpClient, resource: string) {
    this.client = client;
    this.resource = resource;
  }

  public getResource(): string {
    return this.resource;
  }
}
