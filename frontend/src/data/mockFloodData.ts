export const mockFloodZones = [
  {
    id: 1,
    location: 'Dubai Downtown',
    latitude: 25.276987,
    longitude: 55.296249,
    riskLevel: 'high',
    rainfall: 45.2,
    waterLevel: 2.8,
    flowRate: 3.5,
    groundSaturation: 85,
    lastUpdate: '2024-03-15T10:30:00',
    prediction: 'Rising water levels expected in next 6 hours. Potential flash flood risk.',
    historicalContext: 'Area experienced similar conditions during the 2023 flooding event.',
  },
  {
    id: 2,
    location: 'Abu Dhabi Corniche',
    latitude: 24.453884,
    longitude: 54.377343,
    riskLevel: 'medium',
    rainfall: 28.5,
    waterLevel: 1.5,
    flowRate: 2.1,
    groundSaturation: 65,
    lastUpdate: '2024-03-15T10:25:00',
    prediction: 'Moderate rainfall expected to continue. Monitor drainage systems.',
    historicalContext: 'Historically good drainage, but recent construction may impact water flow.',
  },
  {
    id: 3,
    location: 'Dubai Marina',
    latitude: 25.075573,
    longitude: 55.134037,
    riskLevel: 'low',
    rainfall: 12.3,
    waterLevel: 0.8,
    flowRate: 1.2,
    groundSaturation: 45,
    lastUpdate: '2024-03-15T10:20:00',
    prediction: 'Stable conditions expected. No immediate flood risk.',
    historicalContext: 'Area has robust flood defense infrastructure in place.',
  }
];

export const mockAlerts = [
  {
    id: 1,
    type: "warning",
    message: "Heavy rainfall expected in Dubai Downtown area",
    timestamp: "2024-03-15T10:15:00"
  },
  {
    id: 2,
    type: "alert",
    message: "Flash flood warning in Sharjah industrial area",
    timestamp: "2024-03-15T10:00:00"
  }
]; 