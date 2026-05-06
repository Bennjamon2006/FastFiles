import type { LifeCycle } from ".";

export class LifeCycleManager {
  private lifeCycles: LifeCycle[] = [];

  public register(lifeCycle: LifeCycle): void {
    this.lifeCycles.push(lifeCycle);
  }

  public async start(): Promise<void> {
    for (const lifeCycle of this.lifeCycles) {
      await lifeCycle.start();
    }
  }

  public async stop(): Promise<void> {
    for (const lifeCycle of this.lifeCycles) {
      await lifeCycle.stop();
    }
  }
}
