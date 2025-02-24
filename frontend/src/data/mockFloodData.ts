export const mockFloodZones = [
  {
    id: 1,
    latitude: 25.276987,
    longitude: 55.296249,
    riskLevel: "high",
    location: "Dubai Downtown",
    lastUpdate: "2024-03-15T10:30:00",
    prediction: "Rising water levels expected in next 6 hours"
  },
  {
    id: 2,
    latitude: 24.453884,
    longitude: 54.377343,
    riskLevel: "medium",
    location: "Abu Dhabi Corniche",
    lastUpdate: "2024-03-15T10:25:00",
    prediction: "Moderate rainfall expected"
  },
  {
    id: 3,
    latitude: 25.075573,
    longitude: 55.134037,
    riskLevel: "low",
    location: "Dubai Marina",
    lastUpdate: "2024-03-15T10:20:00",
    prediction: "Stable conditions"
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