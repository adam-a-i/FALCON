import { motion } from 'framer-motion';
import './styles.css';

interface NavbarProps {
  setShowMap: (show: boolean) => void;
}

const Navbar = ({ setShowMap }: NavbarProps) => {
  const navItems = ['Flood Map', 'Live Data', 'Alerts', 'About'];

  const handleNavClick = (item: string) => {
    if (item === 'Flood Map') {
      setShowMap(true);
    }
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="navbar-container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMap(false)}
          style={{ cursor: 'pointer' }}
        >
          F.A.L.C.O.N
        </motion.div>

        <div className="nav-items">
          {navItems.map((item) => (
            <motion.a
              key={item}
              onClick={() => handleNavClick(item)}
              style={{ cursor: 'pointer' }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <div className="nav-buttons">
          <motion.button
            className="emergency-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Emergency Contacts
          </motion.button>
          <motion.button
            className="check-area-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Check My Area
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 