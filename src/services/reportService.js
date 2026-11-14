import { unavailable } from './api';

// submit(FormData) -> { id }
export const reportService = {
  submit: (formData) => unavailable('Report submission', formData),
  adminList: () => unavailable('Report management'),
  adminUpdateStatus: (id, status) => unavailable('Report status updates', { id, status }),
};
