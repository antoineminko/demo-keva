import { Email, Footer, Navbar, Social } from '@/containers';
import FloatingControls from '@/components/ui/FloatingControls';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Layout = ({ children, className = '' }: Props) => {
  return (
    <>
      <Navbar />
      <main className={className}>
        {children}
      </main>
      <Footer />
      <Social />
      <Email />
      <FloatingControls />
    </>
  );
};

export default Layout;
