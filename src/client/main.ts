// create a classs that is supposed to allow client side messaging
import { Client } from "@modelcontextprotocol/sdk/client";
import type {  Tool } from "ollama/browser";
import ollama from "ollama/browser"
import type { Message } from "ollama";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { URL } from "url";


export class MCPClient {
  private mcp: Client;
  private transport: |StreamableHTTPClientTransport |null = null;
  private tools: Tool[] = [];
  public provider: typeof ollama;
  public data: string
  constructor(specs: {
    name: string;

  }) {
    this.provider = ollama
    this.mcp = new Client({ name: specs.name, version: "1.0.0" });
    this.data = ""

  }
  
  async connectToServer(serverScriptPath: string) {

    try {
      
      const command = process.execPath;
      const url = new URL("http://localhost:11434/")
      this.transport = new StreamableHTTPClientTransport(url, {}) //TODO improve
      this.mcp.connect(this.transport);
      const toolsResult = await this.mcp.listTools();
      this.tools = toolsResult.tools.map(tool => {
        return {
          type: "function", 
          function: {
            name: tool.name,
            description: tool.description,
            parameters:tool.inputSchema.properties,   
          }
         
        }
      })
      //TODO je pense que j aurai un soucis de mapping
      /**!SECTION
       * function: {
        name?: string | undefined;
        description?: string | undefined;
        type?: string | undefined;
        parameters?: {
            type?: string | undefined;
            $defs?: any;
            items?: any;
            required?: string[] | undefined;
            properties?: {
                [key: string]: {
                    type?: string | string[] | undefined;
                    items?: any;
                    description?: string | undefined;
                    enum?: any[] | undefined;
                };
            } | undefined;
        } | undefined;
    };
       */
       console.log(
            "Connected to server with tools:",
            this.tools.map(tool => tool.function.name)
          );
    } catch (e) {
      console.error(e)
      this.mcp.close();
    }
  }
  async processQuery(query: {
    inputMessage: string, 
    model: string
  }) {
    const messages: Message[] = [{ role: "user", content: query.inputMessage }]
    const response = await this.provider.chat({model:query.model, messages:messages, tools:this.tools})
   this.data = response.message.content;
    
  }
  
  async cleanup() {
    this.mcp.close();
  }
}


/**!SECTION
const response = await this.provider.createMessages({
  model:
}) //je post 
 * const messages: MessageParam[] = [{role: "user",content: query},];
 * const response = await this.anthropic.messages.create({model: "claude-3-5-sonnet-20241022",max_tokens: 1000,messages,tools: this.tools});
 * ligne 1 : on cree le message a partir de la requete de lutilisateur, 
 * ligne 2 on post le message, 
 * tu recois la reponse, tu distingue si tu recois un outil ou de la donne 
 * si tu as un outil, tu recuperes l outils et les args, tu appelles l outil avec les args 
 * tu recupere le resultat des outils 
 * 
 */

