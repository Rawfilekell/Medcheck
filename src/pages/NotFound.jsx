import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <>
      <PageHeader eyebrow="404" title="That page doesn’t exist" />
      <div className="container-page pb-10 text-center"><Button to="/">Back to home</Button></div>
    </>
  );
}
