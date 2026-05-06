export interface LifeCycle {
  start(): Promise<void>;
  stop(): Promise<void>;
}
