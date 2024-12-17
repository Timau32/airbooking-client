import { type LatLngBounds, type LatLngTuple, type Map } from 'leaflet';
import { MapContainer } from 'react-leaflet';

import { useRef } from 'react';
import LocationTile from './LocationTile';
import classes from './Map.module.scss';

type Props = {
  zoom: number;
  bounds: LatLngBounds;
};

const MapView = ({ zoom, bounds }: Props) => {
  const mapRef = useRef<Map>(null);
  const initialPosition = [40.52939913919699, 72.79727950121293] as LatLngTuple;

  return (
    <MapContainer
      className={classes.mapContainer}
      center={initialPosition}
      zoom={zoom}
      scrollWheelZoom={false}
      minZoom={1}
      maxZoom={18}
      ref={mapRef}
    >
      <LocationTile zoom={zoom} bounds={bounds} initialPosition={initialPosition} />
    </MapContainer>
  );
};

export default MapView;
