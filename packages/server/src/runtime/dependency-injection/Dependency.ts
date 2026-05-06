type ResolveKey<Registry, Type> = keyof Registry extends infer K
  ? K extends keyof Registry
    ? Registry[K] extends Type
      ? K
      : never
    : never
  : never;

export type MapKeys<
  Registry,
  Dependencies extends any[],
> = Dependencies extends [infer First, ...infer Rest]
  ? [ResolveKey<Registry, First>, ...MapKeys<Registry, Rest>]
  : number extends Dependencies["length"]
    ? Array<keyof Registry>
    : [];

export type Dependency<Registry, Type, Dependencies extends any[] = []> = {
  resolve: (...deps: Dependencies) => Type | Promise<Type>;
  dependencies: MapKeys<Registry, Dependencies>;
};
