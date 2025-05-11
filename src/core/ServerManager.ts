import type { Server } from "@types";

export class ServerManager {
  private servers: Map<string, Server>;

  constructor() {
    this.servers = new Map();
  }

  addServer(server: Server) {
    if (this.servers.has(server.id)) throw new Error(`Server with ID ${server.id} already exists.`);
    this.servers.set(server.id, server);
  }

  removeServer(serverId: string) {
    if (!this.servers.has(serverId)) throw new Error(`Server with ID ${serverId} not found.`);
    this.servers.delete(serverId);
  }

  getServer(serverId: string) {
    return this.servers.get(serverId);
  }

  async startAllServers() {
    for (const server of this.servers.values()) {
      await server.adapter.start();
    }
  }

  async stopAllServers() {
    for (const server of this.servers.values()) {
      await server.adapter.stop();
    }
  }
}
