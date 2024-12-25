declare module '@onflow/fcl' {
  export interface FlowConfig {
    'flow.network': string;
    'app.detail.title': string;
    'app.detail.icon': string;
  }

  export interface FlowSigner {
    authorize: (privateKey: string) => string;
  }

  export interface FlowArg {
    String: string;
    UFix64: string;
    Address: string;
  }

  export interface FlowBlock {
    height: number;
    timestamp: number;
    collectionGuarantees: unknown[];
  }

  export type ArgFunction = (value: unknown, type: string) => unknown;

  export const config: (config: Partial<FlowConfig>) => void;
  export const signer: FlowSigner;
  export const authz: unknown;
  export const arg: ArgFunction;
  export function query(params: {
    cadence: string;
    args: (arg: ArgFunction, t: FlowArg) => unknown[];
  }): Promise<unknown>;
  export function mutate(params: {
    cadence: string;
    args: (arg: ArgFunction, t: FlowArg) => unknown[];
    proposer: unknown;
    payer: unknown;
    authorizations: unknown[];
    limit: number;
  }): Promise<string>;
  export function send(args: unknown[]): Promise<unknown>;
  export function decode(response: unknown): Promise<FlowBlock>;
  export function getBlock(isSealed: boolean, height?: number): unknown;
}

declare module '@onflow/types' {
  export const String: string;
  export const UFix64: string;
  export const Address: string;
}
