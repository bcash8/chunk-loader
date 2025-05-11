export interface ServerAdapter {
  start(config: Record<string, string>): Promise<void>;
  stop(): Promise<void>;
  restart(): Promise<void>;
  status(): Promise<ServerStatus>;
  runCommand(command: string): Promise<string>;
  onLog?: (callback: (line: string) => void) => void;
}

export type ServerStatus = "online" | "offline" | "starting" | "stopping";
