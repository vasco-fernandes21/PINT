import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Alert from '@mui/material/Alert';
import axios from 'axios';

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Mapa = ({ morada }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBkvnVEmV_pwnsc52AqcPmx5giZmVu7LpU',
  });

  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (morada) {
      console.log("Received morada:", morada);
      geocodeAddress(morada);
    }
  }, [morada]);

  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: address,
          key: 'AIzaSyBkvnVEmV_pwnsc52AqcPmx5giZmVu7LpU'
        }
      });

      console.log("Geocode response:", response); // Debugging line
      const status = response.data.status;
      if (status === "OK") {
        const results = response.data.results;
        console.log("Geocode results:", results); // Debugging line

        if (results.length > 0) {
          const location = results[0].geometry.location;
          setLocation(location);
        } else {
          setLocation(null);
        }
      } else {
        console.error("Geocode error status:", status); // Log error status
        setLocation(null);
      }
    } catch (error) {
      console.error("Erro ao obter coordenadas:", error);
      setLocation(null);
    }
  };

  if (loadError) return <div>Erro ao carregar mapas</div>;
  if (!isLoaded) return <div>A carregar...</div>;

  return (
    <>
      {!location ? (
        <Alert severity="info">Não foi possível encontrar a localização para a morada fornecida.</Alert>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={location}
          options={options}
        >
          <Marker position={location} />
        </GoogleMap>
      )}
    </>
  );
};

export default Mapa;
