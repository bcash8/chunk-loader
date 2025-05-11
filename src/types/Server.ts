import type { ServerAdapter } from "@types";

export interface Server {
  id: string;
  name: string;
  type: string;
  adapter: ServerAdapter;
  config: Record<string, string>;
}
