import type { LatLngBounds, LatLngTuple } from 'leaflet';
import { useEffect } from 'react';

import { Card, Tooltip as TitleTooltip } from 'antd';
import { Marker, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { IApartment } from '../../interfaces';
import classes from './Map.module.scss';

type Props = {
  zoom: number;
  initialPosition: LatLngTuple;
  bounds: LatLngBounds;
  apartments: IApartment[];
};

const LocationTile = ({ zoom, initialPosition, bounds, apartments }: Props) => {
  const map = useMap();
  const navigate = useNavigate();

  const positions: { position: number[]; fullAdres: string; apartment: IApartment }[] = apartments.reduce(
    (accum: any, house) => [
      ...accum,
      ...house.locations.map(({ latitude, longitude, address, city }) => {
        if (!latitude) return null;
        return {
          position: [latitude, longitude],
          fullAdres: Boolean(address || city?.name || city?.region?.country?.name)
            ? `${address || ''} ${city?.name || ''}, ${city?.region?.country?.name || ''}`
            : '',
          apartment: house,
        };
      }),
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
        positions.map((pos, idx) =>
          pos ? (
            <Marker key={`Marker-${pos.position[1]}-${pos.position[0]}-${idx}`} position={pos.position as LatLngTuple}>
              <Tooltip permanent direction='right' offset={[0, 10]} opacity={1}>
                {pos.apartment.price} сом
              </Tooltip>
              <Popup className={classes.popup}>
                <Card
                  style={{ width: 150 }}
                  classNames={{ body: classes.popup_body }}
                  cover={<img className={classes.popup_img} src={pos.apartment.images[0].image} alt='apartmemt' />}
                >
                  <Card.Meta
                    title={
                      <TitleTooltip title={pos.apartment.title}>
                        <span
                          className={classes.popup_title}
                          onClick={() => navigate(`/apartments/${pos.apartment.slug}`)}
                        >
                          {pos.apartment.title}
                        </span>
                      </TitleTooltip>
                    }
                    description={
                      <span>
                        {pos.fullAdres || 'Апартаменты'} - {pos.apartment.price} сомов{' '}
                      </span>
                    }
                  />
                </Card>
              </Popup>
            </Marker>
          ) : null
        )}
    </>
  );
};

export default LocationTile;
