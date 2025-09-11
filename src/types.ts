export type TODO = unknown;

export const logLevels = ["trace","debug","info","warn","error","fatal"] as const;
export type LogLevel = typeof logLevels[number];
export type IndexOf<T extends readonly unknown[]> =
  Exclude<keyof T, keyof any[]> extends infer K
    ? K extends `${infer N extends number}`
      ? N
      : never
    : never;

  
export type Merge<T, U> = Omit<T, keyof U> & U;
export type MessageParams = { role: "user" | "assistant", content: string | { [k: string]: string | any }[] }
export type Normalized<T, K extends keyof T, R> = Omit<T, K> & R;

