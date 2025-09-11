import { Logger, type ILogObj } from "tslog";
import ollama, { type ChatRequest, type GenerateRequest } from "ollama/browser";
import type { IndexOf, logLevels, LogLevel, Merge } from "@/types";
import { overwrite } from "zod/v4";

/**
 * @class AIProvider
 * @description Is suppopsed to provide the communication capabilities 
 * to establish the communication with the server. 
 * 
 * @field {LogLevel} logLevel : use it in order to filter the logs based on their 
 * minimum level
 ** ex : loglevel == 2 => info, warn, error & fatal logs are printed  but 
 * debug and trace aren't 
 * @field {ollama} Provides the connection between the backend and the front-end 
 * @field {logger} tslogger 
 */
export class AIProvider {
  logLevel: LogLevel; // error warn info
  ollama: typeof ollama;
  logger: Logger<ILogObj>

  constructor(specs: { logLevel?: LogLevel, loggerMetaData?: {minLevel:IndexOf<typeof logLevels>} }) {
    //endpoint headers fetch use zod to validate data
    this.logLevel = specs.logLevel?? "warn"
      this.logger = new Logger<ILogObj>({  ...specs.loggerMetaData })
    this.ollama = ollama;
  }

  private isChatRequest = (request : ChatRequest | GenerateRequest ) => "messages" in request

  public createMessages = (messageSpecs : Merge<ChatRequest, GenerateRequest>) => {
  /**!SECTION 
   if (this.isChatRequest(messageSpecs)) {
    const payload = {...messageSpecs, options:{thinking:"high"}, stream:false}
    ollama.chat(payload as ChatRequest)
  }
  else {
    ollama.generate({...messageSpecs})}
  * */
}
  
}
