import { unavailable } from './api';

// Saved medicines, search history and submitted reports need an account + backend.
export const userDataService = {
  listSaved: () => unavailable('Saved medicines'),
  listSearches: () => unavailable('Search history'),
  listReports: () => unavailable('Your submitted reports'),
};
