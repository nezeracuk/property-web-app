import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <ToastContainer />
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
