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
    googleMapsApiKey: 'AIzaSyBGoIGa0Z6BgVc0LO59A5Ye8cpake0s9L8',  
  });

  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (morada) {
      geocodeAddress(morada);
    }
  }, [morada]);

  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: address,
          key: 'AIzaSyBGoIGa0Z6BgVc0LO59A5Ye8cpake0s9L8'  
        }
      });

      const results = response.data.results;

      if (results.length > 0) {
        const location = results[0].geometry.location;
        setLocation(location);
      } else {
        setLocation(null);
      }
    } catch (error) {
      console.error("Erro ao obter coordenadas:", error);
      setLocation(null);
    }
  };

  if (!morada) {
    return <Alert severity="info">Por favor, forneça uma morada para mostrar no mapa.</Alert>;
  }

  if (!location) {
    return <Alert severity="info">Não foi possível encontrar a localização para a morada fornecida.</Alert>;
  }

  if (loadError) return <div>Erro ao carregar mapas</div>;
  if (!isLoaded) return <div>A carregar...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={location || { lat: 0, lng: 0 }}
      options={options}
    >
      {location && <Marker position={location} />}
    </GoogleMap>
  );
};

export default Mapa;