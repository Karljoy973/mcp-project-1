// create a classs that is supposed to allow client side messaging
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client";
import ollama, { type Tool } from "ollama";
import dotenv from "dotenv";
import { z } from "zod";
import type { TODO } from "@/types";

dotenv.config();
export class MCPClient {
  private mcp: Client;
  private transport: StdioClientTransport | null = null;
  private tools: Tool[] = [];
  private provider: Provider;
  constructor(specs: { name: string; logLevel?: TODO; logger?: TODO }) {
    this.provider = new Provider(specs);
    this.mcp = new Client({ name: specs.name, version: "1.0.0" });
  }
  setupHandlers() {
    this.mcp.onerror = (error) => console.error(error);
    this.mcp.onclose = () =>
      console.error(`server closed at date: ${Date.now().toLocaleString()}`);
  }
  async connectToServer(serverScriptPath: string) {
    //j'imagine qu il faudrait que je puisse fetch les server path dont j ai besoin
    //puis que je cree une connexion par chemin
    //j imagine que je peux implementer ca plus tard
    try {
      if (!serverScriptPath.endsWith(".js")) {
        console.error("Invalid Server Path, Server will close now.");
        return;
      }
      const command = process.execPath;
      this.transport = new StdioClientTransport({
        command,
        args: [serverScriptPath],
      });
      this.mcp.connect(this.transport);
    } catch (e) {
      //should check which error forces to close the server
      this.mcp.close();
    }
  }
  async processQuery(query: string) {}
  async chatLoop() {}
  async cleanup() {
    this.mcp.close();
  }
}

//je me demande si ollama ne fait pas deja le job de ma classe provider
//je me demande si si je ne devrais pas utiliser un decorateur ici
export class Provider {
  logLevel: TODO; // error warn info
  logger: TODO;
  ollama: typeof ollama;

  constructor(specs: { logLevel?: TODO; logger?: TODO }) {
    //endpoint headers fetch use zod to validate data
    //https://www.npmjs.com/package/debug
    if (!!specs && !!specs.logLevel) this.logLevel = specs.logLevel;
    if (!!specs && !!specs.logger) this.logger = specs.logger;
    this.ollama = ollama;
  }
}
