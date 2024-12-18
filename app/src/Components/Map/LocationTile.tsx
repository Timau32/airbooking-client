import type { LatLngBounds, LatLngTuple } from 'leaflet';
import { useEffect } from 'react';

import { Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { IApartment } from '../../interfaces';

type Props = {
  zoom: number;
  initialPosition: LatLngTuple;
  bounds: LatLngBounds;
  apartments: IApartment[]
};

const LocationTile = ({ zoom, initialPosition, bounds, apartments }: Props) => {
  const map = useMap();

  const positions: { position: number[]; fullAdres: string }[] = apartments.reduce(
    (accum: any, house) => [
      ...accum,
      ...house.locations.map(({ latitude, longitude, address, city }) => ({
        position: [latitude, longitude],
        fullAdres: `${address || ''} ${city.name}, ${city.region.country.name}`,
      })),
    ],
    [] as any
  );

  useEffect(() => {
    if (bounds.isValid()) {
      map.fitBounds(bounds);
    }
  }, [bounds]);

  useEffect(() => {
    document.querySelector('.leaflet-bottom.leaflet-right')?.remove();
  }, []);

  return (
    <>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {positions &&
        positions.map((pos, idx) => (
          <Marker key={`Marker-${pos.position[1]}-${pos.position[0]}-${idx}`} position={pos.position as LatLngTuple}>
            <Popup>{pos.fullAdres}</Popup>
          </Marker>
        ))}
    </>
  );
};

export default LocationTile;
