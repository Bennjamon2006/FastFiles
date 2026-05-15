import { useState } from "react";

type IdleAction = {
  type: "idle";
  result: null;
  error: null;
};

type LoadingAction = {
  type: "loading";
  result: null;
  error: null;
};

type SuccessAction<T> = {
  type: "success";
  result: T;
  error: null;
};

type ErrorAction = {
  type: "error";
  result: null;
  error: Error;
};

type ActionState<T> =
  | IdleAction
  | LoadingAction
  | SuccessAction<T>
  | ErrorAction;

type ActionResult<T> = ActionState<T> & {
  execute: () => Promise<void>;
};

const wrapError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }

  return new Error(String(error));
};

export default function useAction<T>(action: () => Promise<T>) {
  const [state, setState] = useState<ActionState<T>>({
    type: "idle",
    result: null,
    error: null,
  });

  const execute = async () => {
    if (state.type === "loading") return;

    setState({ type: "loading", result: null, error: null });

    try {
      const result = await action();
      setState({ type: "success", result, error: null });
    } catch (error) {
      setState({ type: "error", result: null, error: wrapError(error) });
    }
  };

  return { ...state, execute } as ActionResult<T>;
}
