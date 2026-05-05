import type { LifeCycleDependency } from ".";

type MapDepenencies<T> = {
  [K in keyof T]: LifeCycleDependency<T[K]>;
};

export class Container<T> {
  private dependencies: Partial<MapDepenencies<T>> = {};

  public register<K extends keyof T>(
    key: K,
    dependency: LifeCycleDependency<T[K]>,
  ): void {
    if (this.dependencies[key]) {
      throw new Error(
        `Dependency with key ${String(key)} is already registered`,
      );
    }

    this.dependencies[key] = dependency;
  }

  public async start(): Promise<void> {
    for (const key in this.dependencies) {
      const dependency = this.dependencies[key];
      if (dependency) {
        await dependency.start();
      }
    }
  }

  public async stop(): Promise<void> {
    for (const key in this.dependencies) {
      const dependency = this.dependencies[key];
      if (dependency) {
        await dependency.stop();
      }
    }
  }

  public get<K extends keyof T>(key: K): T[K] {
    const dependency = this.dependencies[key];
    if (!dependency) {
      throw new Error(`Dependency with key ${String(key)} is not registered`);
    }

    return dependency.get();
  }
}
