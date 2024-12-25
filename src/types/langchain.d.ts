declare module '@langchain/core/base' {
  export class Tool {
    name: string;
    description: string;
    constructor();
    protected _call(input: string): Promise<string>;
  }
}
