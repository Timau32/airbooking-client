import Leaflet, { type LatLngBounds, type LatLngTuple, type Map } from 'leaflet';
import { MapContainer } from 'react-leaflet';

import retinaMarker from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadowMarker from 'leaflet/dist/images/marker-shadow.png';
import { useEffect, useRef } from 'react';
import { IApartment } from '../../interfaces';
import LocationTile from './LocationTile';
import classes from './Map.module.scss';

type Props = {
  zoom: number;
  bounds: LatLngBounds;
  apartments: IApartment[];
  dragging?: boolean;
};

const MapView = ({ zoom, bounds, apartments, dragging = true,  }: Props) => {
  useEffect(() => {
    // @ts-ignore
    delete Leaflet.Icon.Default.prototype._getIconUrl;
    Leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: retinaMarker,
      iconUrl: icon,
      shadowUrl: shadowMarker,
    });
  }, []);
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
      dragging={dragging}
    >
      <LocationTile zoom={zoom} apartments={apartments} bounds={bounds} initialPosition={initialPosition} />
    </MapContainer>
  );
};

export default MapView;
