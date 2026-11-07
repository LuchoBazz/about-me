import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import HaradaApp from '@site/src/features/harada/HaradaApp';

export default function HaradaPage() {
  return (
    <Layout title="Harada Goals" description="Harada Method (Open Window 64) goal tracker">
      <BrowserOnly>{() => <HaradaApp />}</BrowserOnly>
    </Layout>
  );
}
