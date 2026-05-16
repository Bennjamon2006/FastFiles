export class ModuleRegistry<Registry extends Record<string, unknown>> {
  private registry: Partial<Registry> = {};

  public register<Name extends keyof Registry>(
    name: Name,
    exports: Registry[Name],
  ): void {
    if (this.registry[name]) {
      throw new Error(
        `Module with name "${String(name)}" is already registered`,
      );
    }

    this.registry[name] = exports;
  }

  public get<Name extends keyof Registry>(name: Name): Registry[Name] {
    const module = this.registry[name];

    if (!module) {
      throw new Error(`Module with name "${String(name)}" is not registered`);
    }

    return module;
  }
}
