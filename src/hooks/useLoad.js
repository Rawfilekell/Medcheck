import { useEffect, useState } from 'react';

/** Runs a loader on mount and tracks loading / error / data. */
export default function useLoad(loader, deps = []) {
  const [state, setState] = useState({ loading: true, error: null, data: null });
  useEffect(() => {
    let active = true;
    setState({ loading: true, error: null, data: null });
    Promise.resolve()
      .then(loader)
      .then((data) => active && setState({ loading: false, error: null, data }))
      .catch((error) => active && setState({ loading: false, error, data: null }));
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}
