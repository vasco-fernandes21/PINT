import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Alert from '@mui/material/Alert';

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Mapa = ({ latitude, longitude }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBGoIGa0Z6BgVc0LO59A5Ye8cpake0s9L8', 
  });

  if (latitude === undefined || latitude === null || longitude === undefined || longitude === null) {
    return <Alert severity="error">Não há dados disponíveis para fornecer um ponteiro no mapa.</Alert>;
  }

  if (loadError) return <div>Erro ao carregar mapas</div>;
  if (!isLoaded) return <div>A carregar...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={{ lat: latitude, lng: longitude }}
      options={options}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};

export default Mapa;