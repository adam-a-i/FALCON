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
    priority: 1
  },
  {
    id: 2,
    location: 'Dubai Desert Conservation Reserve',
    latitude: 24.8169,
    longitude: 55.6666,
    riskLevel: 'high',
    rainfall: 38.5,
    waterLevel: 2.1,
    flowRate: 2.8,
    groundSaturation: 90,
    lastUpdate: '2024-03-15T10:28:00',
    prediction: 'Flash flood warning. Desert wadis at risk of sudden flooding.',
    historicalContext: 'Desert floods can be particularly dangerous due to lack of drainage.',
    priority: 2
  },
  {
    id: 3,
    location: 'Al Qudra Desert',
    latitude: 24.9837,
    longitude: 55.3321,
    riskLevel: 'medium',
    rainfall: 30.2,
    waterLevel: 1.8,
    flowRate: 2.2,
    groundSaturation: 75,
    lastUpdate: '2024-03-15T10:26:00',
    prediction: 'Moderate flood risk in desert depressions.',
    historicalContext: 'Area prone to water accumulation during heavy rainfall.',
    priority: 3
  },
  {
    id: 4,
    location: 'Dubai Marina',
    latitude: 25.075573,
    longitude: 55.134037,
    riskLevel: 'high',
    rainfall: 42.3,
    waterLevel: 2.5,
    flowRate: 3.2,
    groundSaturation: 80,
    lastUpdate: '2024-03-15T10:20:00',
    prediction: 'Urban flooding likely. Infrastructure at risk.',
    historicalContext: 'Previous flooding affected basement levels.',
    priority: 1
  },
  {
    id: 5,
    location: 'Margham Desert',
    latitude: 24.9982,
    longitude: 55.5757,
    riskLevel: 'medium',
    rainfall: 28.5,
    waterLevel: 1.5,
    flowRate: 1.9,
    groundSaturation: 70,
    lastUpdate: '2024-03-15T10:15:00',
    prediction: 'Desert roads may be affected by flooding.',
    historicalContext: 'Flash floods common in this area during heavy rain.',
    priority: 3
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