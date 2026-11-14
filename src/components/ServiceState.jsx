import Spinner from './Spinner';
import Notice from './Notice';
import { ServiceUnavailableError } from '../services/api';

/** Renders loading / unavailable / error states for a service call. Renders nothing when idle or when data exists. */
export default function ServiceState({ loading, error, loadingLabel }) {
  if (loading) return <Spinner label={loadingLabel} />;
  if (!error) return null;
  if (error instanceof ServiceUnavailableError) {
    return (
      <Notice tone="warn" title="Not yet available">
        {error.message} No result has been generated, and none should be assumed.
      </Notice>
    );
  }
  return <Notice tone="error" title="Something went wrong">{error.message || 'Please try again.'}</Notice>;
}
