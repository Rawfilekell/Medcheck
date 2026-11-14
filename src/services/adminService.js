import { unavailable } from './api';

export const adminService = {
  listMedicines: () => unavailable('Medicine record management'),
  saveMedicine: (record) => unavailable('Saving medicine records', record),
  deleteMedicine: (id) => unavailable('Deleting medicine records', id),
};
