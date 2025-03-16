import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Layout, Typography, Button, message } from "antd";
import { AimOutlined, RedoOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

const MapWithRoute = () => {
  const [positions, setPositions] = useState([]); // Stores selected locations
  const [route, setRoute] = useState([]); // Stores the road route coordinates
  const [distance, setDistance] = useState(null); // Stores calculated distance

  // Function to handle map clicks & select locations
  const AddMarker = () => {
    useMapEvents({
      click(e) {
        if (positions.length < 2) {
          setPositions([...positions, [e.latlng.lat, e.latlng.lng]]);
          message.success(`Point ${positions.length + 1} selected!`);
        } else {
          message.warning("You already selected two points! Click Reset to start over.");
        }
      },
    });
    return null;
  };

  // Function to calculate route & distance
  const calculateRoute = async () => {
    if (positions.length < 2) {
      message.error("Select two points first!");
      return;
    }
  
    const apiKey = "5b3ce3597851110001cf6248cca36ed689cd47df914b571ee74e7594"; // Provided API key
    const start = `${positions[0][1]},${positions[0][0]}`; // Longitude, Latitude
    const end = `${positions[1][1]},${positions[1][0]}`;
  
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start}&end=${end}`;
  
    try {
      const response = await axios.get(url);
      console.log("API Response:", response.data); // Debugging
  
      if (!response.data.features || response.data.features.length === 0) {
        message.error("No route found!");
        return;
      }
  
      const routeData = response.data.features[0];
  
      // Convert OpenRouteService [lng, lat] to Leaflet [lat, lng]
      const decodedRoute = routeData.geometry.coordinates.map(coord => [coord[1], coord[0]]);
      setRoute(decodedRoute);
      
      // Extract and convert distance from meters to km
      const routeDistance = (routeData.properties.segments[0].distance / 1000).toFixed(2);
      setDistance(routeDistance);
  
      message.success(`Route calculated: ${routeDistance} km`);
    } catch (error) {
      console.error("Error fetching route:", error);
      message.error("Failed to calculate route. Check API key or request limit.");
    }
  };
  

  // Reset selections
  const resetMap = () => {
    setPositions([]);
    setRoute([]);
    setDistance(null);
  };

  return (
    <Layout style={{ padding: "24px" }}>
      <Content>
        <Title level={2}>
          <AimOutlined /> Select Two Places & Show Route on Roads
        </Title>

        {/* Map Component */}
        <MapContainer center={[6.9498798, 80.5974965]} zoom={10} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {positions.map((pos, index) => (
            <Marker key={index} position={pos} />
          ))}
          {route.length > 0 && <Polyline positions={route} color="blue" />}
          <AddMarker />
        </MapContainer>

        {/* Buttons & Distance Display */}
        <div style={{ marginTop: "16px" }}>
          <Button type="primary" icon={<AimOutlined />} onClick={calculateRoute} disabled={positions.length < 2}>
            Show Route & Distance
          </Button>
          <Button style={{ marginLeft: "10px" }} icon={<RedoOutlined />} danger onClick={resetMap}>
            Reset
          </Button>
          {distance && (
            <Title level={4} style={{ marginTop: "10px" }}>
              📏 Distance: {distance} km (on roads)
            </Title>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default MapWithRoute;
