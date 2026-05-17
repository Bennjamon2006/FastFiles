import { useRef } from "react";
import { useAction } from "./useAction";
import type { ActionResult } from "./useAction";

type QueryState<T, A extends unknown[]> = Omit<ActionResult<T>, "execute"> & {
  execute: (...args: A) => Promise<void>;
};

export function useMutation<T, A extends unknown[]>(
  mutation: (...args: A) => Promise<T>,
  initialArgs?: A,
): QueryState<T, A> {
  const argsRef = useRef<A | undefined>(initialArgs);

  const action = useAction(() => {
    if (!argsRef.current) {
      throw new Error("No args provided for the mutation");
    }

    return mutation(...argsRef.current);
  });

  const execute = async (...args: A) => {
    if (action.type === "loading") {
      return;
    }

    argsRef.current = args;
    await action.execute();
  };

  return {
    ...action,
    execute,
  };
}
