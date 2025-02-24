import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import './styles.css';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  setShowMap: (show: boolean) => void;
}

const Layout = ({ children, setShowMap }: LayoutProps) => {
  return (
    <div className="layout">
      <Navbar setShowMap={setShowMap} />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
        <footer className="dashboard-footer">
          <p>Developed for Zayed University Hackathon</p>
        </footer>
      </motion.main>
    </div>
  );
};

export default Layout; 