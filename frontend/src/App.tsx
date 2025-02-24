import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import './styles/global.css';

function App() {
  const [showMap, setShowMap] = useState(false);
  const { scrollYProgress } = useScroll();

  const stats = [
    { number: 85, suffix: "%", label: "Prediction Accuracy", icon: "🎯", decimal: 0 },
    { number: 24, suffix: "/7", label: "Real-time Monitoring", icon: "🔍", decimal: 0 },
    { number: 15, suffix: "min", label: "Early Warning Time", icon: "⚡", decimal: 0 },
    { number: 250, suffix: "+", label: "Monitoring Stations", icon: "📡", decimal: 0 },
  ];

  return (
    <Layout setShowMap={setShowMap}>
      {showMap ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Dashboard />
        </motion.div>
      ) : (
        <>
          <div className="hero-section">
            <motion.div 
              className="gradient-sphere"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hero-title"
            >
              AI-Powered <span>Flood</span> Prediction<br />
              for a <span>Safer</span> UAE
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hero-subtitle"
            >
              F.A.L.C.O.N uses advanced AI technology to predict, monitor, and alert you about potential flood risks in real-time across the UAE.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="check-area-btn large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMap(true)}
              >
                Check My Area
              </motion.button>
              <motion.button
                className="view-alerts-btn large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMap(true)}
              >
                View Live Alerts
              </motion.button>
            </motion.div>
          </div>

          <motion.div 
            className="stats-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 8px 32px rgba(0, 168, 255, 0.2)"
                  }}
                >
                  <div className="stat-content">
                    <span className="stat-icon">{stat.icon}</span>
                    <h3>
                      <CountUp
                        end={stat.number}
                        duration={2.5}
                        decimals={stat.decimal}
                        suffix={stat.suffix}
                      />
                    </h3>
                    <p>{stat.label}</p>
                  </div>
                  <div className="stat-gradient"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="features-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>Advanced Features</h2>
            <div className="features-grid">
              <motion.div 
                className="feature-card"
                whileHover={{ scale: 1.05 }}
              >
                <h3>AI Predictions</h3>
                <p>Advanced deep learning models for accurate flood predictions</p>
              </motion.div>
              <motion.div 
                className="feature-card"
                whileHover={{ scale: 1.05 }}
              >
                <h3>Real-time Monitoring</h3>
                <p>24/7 monitoring of water levels and weather conditions</p>
              </motion.div>
              <motion.div 
                className="feature-card"
                whileHover={{ scale: 1.05 }}
              >
                <h3>Early Warnings</h3>
                <p>Instant alerts and notifications for potential flood risks</p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </Layout>
  );
}

export default App;
