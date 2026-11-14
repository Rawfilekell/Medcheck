import Hero from '../components/home/Hero';
import Tools from '../components/home/Tools';
import WhoFor from '../components/home/WhoFor';
import InsideDashboard from '../components/home/InsideDashboard';
import Faq from '../components/home/Faq';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('');

  return (
    <>
      <Hero />
      <Tools />
      <WhoFor />
      <InsideDashboard />
      <Faq />
    </>
  );
}
