import type { ServerStatus } from "@types";
import { spawn } from "child_process";
import { ServerAdapter } from "core/ServerAdapter";
import { existsSync } from "fs";
import { Rcon } from "rcon-client";
import path from "path";

export class MinecraftServerAdapter extends ServerAdapter {
  private config: Record<string, string> | null = null;
  private rcon: Rcon | null = null;
  private rconReady = false;
  constructor() {
    super();
  }

  async connectRcon(host: string, port: number, password: string) {
    this.rcon = new Rcon({ host, port, password });
    return new Promise<void>((res, rej) => {
      this.rcon?.on("authenticated", () => {
        this.rconReady = true;
        res();
      });

      this.rcon?.on("error", rej);
      void this.rcon?.connect();
    });
  }

  async start(config: Record<string, string>): Promise<void> {
    if (this.process) {
      console.log("Server already running");
      return;
    }

    this.config = config;

    const javaPath = "java";
    const jarPath = path.resolve(config.jarPath || "./server.jar");
    const workingDir = path.dirname(jarPath);
    const memory = config.memory || "2G";

    if (existsSync(jarPath)) throw new Error(`Jar file not found at ${jarPath}`);

    this.process = spawn(javaPath, ["-Xmx" + memory, "-Xms" + memory, "-jar", jarPath, "nogui"], {
      cwd: workingDir,
      stdio: "pipe"
    });

    this.process.stdout.on("data", (data) => {
      console.log(`[MC] ${data}`);
    });

    this.process.stderr.on("data", (data) => {
      console.log(`[MC ERROR] ${data}`);
    });

    this.process.on("exit", (code) => {
      console.log(`Minecraft server exited with code ${code}`);
      this.process = null;
    });
  }

  async stop(): Promise<void> {
    if (!this.process) {
      console.log("Server is not running");
      return;
    }

    this.process.stdin.write("stop\n");
    await new Promise<void>((res) => this.process?.once("exit", () => res()));
  }

  async restart(): Promise<void> {
    console.log("Restarting minecraft server");
    await this.stop();
    if (!this.config) throw new Error("No config available to restart the server");
    await this.start(this.config);
  }

  async status(): Promise<ServerStatus> {
    if (this.process && !this.process.killed) return "online";
    return "offline";
  }

  async runCommand(command: string): Promise<string> {
    if (!this.rcon || !this.rconReady) {
      await this.connectRcon("localhost", 27757, "");
    }
    if (!this.process) {
      console.log("Server not running");
      return "";
    }

    const res = await this.rcon!.send(command);
    return res;
  }
}
