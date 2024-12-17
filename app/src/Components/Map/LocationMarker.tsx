import { Tooltip } from 'antd';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

const LocationMarker = ({ markerPositions }: any) => {
  const map = useMapEvents({});

  const renderMarker = markerPositions.map((position: any, idx: number) => (
    <Marker
      key={`marker-position-${idx + position[0]}`}
      position={position}
      eventHandlers={{
        click: (e) => {
          e.target.flyTo(position, 8);
        },
        mouseover: (event) => {
          event.target.openPopup();
          console.log(event);
        },
      }}
    >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  ));

  return renderMarker;
};

export default LocationMarker;
