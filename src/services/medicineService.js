import { unavailable } from './api';

// Expected future shapes:
// search({ query, type }) -> { results: Medicine[] }
// getById(id) -> Medicine { id, name, brandName, activeIngredients[], uses[], sideEffects[], warnings[], registration{ number, holder, status, ... } }
// list({ query, letter, page }) -> { results: Medicine[], total }
export const medicineService = {
  search: (params) => unavailable('Medicine verification search', params),
  getById: (id) => unavailable('Medicine details', id),
  list: (params) => unavailable('The medicine library', params),
};
