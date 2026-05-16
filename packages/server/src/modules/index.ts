import { Module } from "./Module";
import RoomsModule from "./rooms/RoomsModule";

export const modules = [RoomsModule] as const;

type MapModulesToExports<M extends readonly any[]> = 
  M extends readonly [infer First, ...infer Rest]
    ? First extends new (...args: any) => Module<infer Name, infer Exports>
      ? { [K in Name]: Exports } & MapModulesToExports<Rest>
      : MapModulesToExports<Rest>
    : {};

export type ModulesExports = MapModulesToExports<typeof modules>;