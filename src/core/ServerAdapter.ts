import type { ServerAdapter as ServerAdapterI, ServerStatus } from "@types";
import type { ChildProcessWithoutNullStreams } from "child_process";

export abstract class ServerAdapter implements ServerAdapterI {
  protected process: ChildProcessWithoutNullStreams | null = null;
  abstract start(config: Record<string, string>): Promise<void>;
  abstract stop(): Promise<void>;
  abstract restart(): Promise<void>;
  abstract status(): Promise<ServerStatus>;
  abstract runCommand(command: string): Promise<string>;
}
