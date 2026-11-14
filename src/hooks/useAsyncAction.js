import { useCallback, useState } from 'react';

/** Wraps an async function with loading / error / data state. */
export default function useAsyncAction(fn) {
  const [state, setState] = useState({ loading: false, error: null, data: null });
  const run = useCallback(
    async (...args) => {
      setState({ loading: true, error: null, data: null });
      try {
        const data = await fn(...args);
        setState({ loading: false, error: null, data });
        return data;
      } catch (error) {
        setState({ loading: false, error, data: null });
        return null;
      }
    },
    [fn]
  );
  const reset = useCallback(() => setState({ loading: false, error: null, data: null }), []);
  return { ...state, run, reset };
}
