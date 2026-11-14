import { unavailable } from './api';

// check({ medicines: string[] }) -> { interactions: [...] }
export const interactionService = {
  check: (payload) => unavailable('Drug interaction checking', payload),
};
