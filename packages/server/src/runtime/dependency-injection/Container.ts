import type { Dependency, MapKeys } from "./Dependency";

type MapDependencies<Registry> = {
  [K in keyof Registry]?: Dependency<Registry, Registry[K], any[]>;
};

export class Container<Registry> {
  private dependencies: MapDependencies<Registry> = {};
  private instances: Partial<Registry> = {};

  public register<
    K extends keyof Registry,
    Dependencies extends Registry[keyof Registry][],
  >(
    key: K,
    resolve: (...deps: Dependencies) => Registry[K] | Promise<Registry[K]>,
    keys: MapKeys<Registry, Dependencies>,
  ): void {
    this.dependencies[key] = { resolve, dependencies: keys };
  }

  public async start(): Promise<void> {
    const resolving: Array<keyof Registry> = [];

    const resolve = async <K extends keyof Registry>(
      key: K,
    ): Promise<Registry[K]> => {
      if (this.instances[key]) {
        return this.instances[key] as Registry[K];
      }

      if (resolving.includes(key)) {
        const cycle = [...resolving, key].join(" -> ");
        throw new Error(`Circular dependency detected: ${cycle}`);
      }

      const dependency = this.dependencies[key];

      if (!dependency) {
        throw new Error(`Dependency for key "${String(key)}" not registered`);
      }

      resolving.push(key);

      const resolvedDeps = await Promise.all(
        dependency.dependencies.map((depKey) => resolve(depKey)),
      );

      const instance = await dependency.resolve(...resolvedDeps);

      this.instances[key] = instance;

      resolving.pop();

      return instance;
    };

    for (const key in this.dependencies) {
      await resolve(key);
    }
  }

  public get<K extends keyof Registry>(key: K): Registry[K] {
    const instance = this.instances[key];

    if (!instance) {
      throw new Error(`Dependency for key "${String(key)}" not resolved`);
    }

    return instance as Registry[K];
  }

  public async stop(): Promise<void> {
    this.instances = {}; // LifeCycleManager will handle stopping individual dependencies
  }
}
