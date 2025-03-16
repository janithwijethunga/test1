import React, { useState } from "react";
import { Button, message } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const GetLocation = () => {
  const [location, setLocation] = useState(null);

  // Function to get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          message.success(`Location: ${latitude}, ${longitude}`);
        },
        (error) => {
          message.error("Unable to retrieve location. Please enable GPS.");
          console.error("Geolocation Error:", error);
        }
      );
    } else {
      message.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="p-4">
      <Button type="primary" icon={<EnvironmentOutlined />} onClick={getUserLocation}>
        Get My Location
      </Button>

      {location && (
        <p className="mt-4">
          📍 Latitude: {location.latitude} | Longitude: {location.longitude}
        </p>
      )}
    </div>
  );
};

export default GetLocation;
