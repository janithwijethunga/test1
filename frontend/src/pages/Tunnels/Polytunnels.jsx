import React from 'react';
import PolytunnelsTable from '../../components/tunnel_management/polytunnels/PolytunnelsTable';

function Polytunnels() {
  // Sample data
  const sampleData = [
    {
      id: 1,
      name: 'Tunnel A',
      location: 'North Field',
      status: 'Active',
      assignedCrop: 'Tomato',
      capacity: 100,
      temperature: '22°C',
      humidity: '60%',
      soilMoisture: '35%',
    },
    {
      id: 2,
      name: 'Tunnel B',
      location: 'South Field',
      status: 'Inactive',
      assignedCrop: 'Lettuce',
      capacity: 80,
      temperature: '20°C',
      humidity: '55%',
      soilMoisture: '30%',
    },
    {
      id: 3,
      name: 'Tunnel C',
      location: 'East Field',
      status: 'Active',
      assignedCrop: 'Cucumber',
      capacity: 90,
      temperature: '21°C',
      humidity: '58%',
      soilMoisture: '33%',
    },
    {
      id: 4,
      name: 'Tunnel D',
      location: 'West Field',
      status: 'Active',
      assignedCrop: 'Carrot',
      capacity: 120,
      temperature: '23°C',
      humidity: '62%',
      soilMoisture: '40%',
    },
    {
      id: 5,
      name: 'Tunnel E',
      location: 'Central Field',
      status: 'Inactive',
      assignedCrop: 'Bell Pepper',
      capacity: 110,
      temperature: '19°C',
      humidity: '50%',
      soilMoisture: '28%',
    },
    {
      id: 6,
      name: 'Tunnel F',
      location: 'North West',
      status: 'Active',
      assignedCrop: 'Spinach',
      capacity: 95,
      temperature: '20°C',
      humidity: '57%',
      soilMoisture: '32%',
    },
    {
      id: 7,
      name: 'Tunnel G',
      location: 'South East',
      status: 'Inactive',
      assignedCrop: 'Strawberry',
      capacity: 85,
      temperature: '18°C',
      humidity: '48%',
      soilMoisture: '29%',
    },
    {
      id: 8,
      name: 'Tunnel H',
      location: 'North East',
      status: 'Active',
      assignedCrop: 'Broccoli',
      capacity: 105,
      temperature: '22°C',
      humidity: '60%',
      soilMoisture: '37%',
    },
    {
      id: 9,
      name: 'Tunnel I',
      location: 'South West',
      status: 'Inactive',
      assignedCrop: 'Onion',
      capacity: 100,
      temperature: '19°C',
      humidity: '52%',
      soilMoisture: '31%',
    },
    {
      id: 10,
      name: 'Tunnel J',
      location: 'Far West',
      status: 'Active',
      assignedCrop: 'Garlic',
      capacity: 130,
      temperature: '24°C',
      humidity: '65%',
      soilMoisture: '42%',
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Polytunnels</h1>
      <PolytunnelsTable data={sampleData} />
    </div>
  );
}

export default Polytunnels;
