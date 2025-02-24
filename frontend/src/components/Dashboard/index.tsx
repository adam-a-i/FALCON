import Navbar from '../Navbar';
import FloodMap from '../FloodMap';
import './styles.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      
      <main className="dashboard-content">
        <div className="map-section">
          <FloodMap />
          <div className="map-legend">
            <h4>Risk Levels</h4>
            <div className="legend-item">
              <span className="dot high"></span>
              <p>High Risk</p>
            </div>
            <div className="legend-item">
              <span className="dot moderate"></span>
              <p>Moderate</p>
            </div>
            <div className="legend-item">
              <span className="dot safe"></span>
              <p>Safe</p>
            </div>
          </div>
        </div>

        <div className="data-panel">
          <section className="metrics-section">
            <h3>Key Metrics</h3>
            
            <div className="metric-card">
              <h4>Rainfall Level</h4>
              <div className="progress-bar">
                <div className="progress" style={{ width: '70%' }}></div>
              </div>
              <p>50mm/hr</p>
            </div>

            <div className="metric-card">
              <h4>Water Flow</h4>
              <div className="status rising">Rising</div>
              <p>Current: 2.5m³/s</p>
            </div>

            <div className="metric-card">
              <h4>Flood Severity</h4>
              <div className="severity high">High Risk</div>
              <p>Updated 5 min ago</p>
            </div>
          </section>

          <section className="alerts-section">
            <h3>Recent Alerts</h3>
            <div className="alert-list">
              <div className="alert-item urgent">
                <span className="alert-icon">🚨</span>
                <div className="alert-content">
                  <p>Heavy rainfall detected in Abu Dhabi</p>
                  <small>10 minutes ago</small>
                </div>
              </div>
              <div className="alert-item warning">
                <span className="alert-icon">⚠️</span>
                <div className="alert-content">
                  <p>Rising water levels in Dubai Creek</p>
                  <small>25 minutes ago</small>
                </div>
              </div>
              <div className="alert-item info">
                <span className="alert-icon">ℹ️</span>
                <div className="alert-content">
                  <p>Weather system approaching from Gulf</p>
                  <small>1 hour ago</small>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>Developed for Zayed University Hackathon</p>
      </footer>
    </div>
  );
};

export default Dashboard; 