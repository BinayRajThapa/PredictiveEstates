import PropTypes from 'prop-types';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as ELG from 'esri-leaflet-geocoder';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]);
  useEffect(() => {
    const geocoder = ELG.geocodeService({
      apikey:
        'AAPKaa769652b5d741d087c26dc06936c81ab2OyOX7gkYTNpibzA70xhwruc3jFTcUlyp0yWCyaHtq36erlG1YJwhG3QlEMlKCj',
    });
    geocoder
      .geocode()
      .text(address)
      .run((err, results, response) => {
        if (results?.results && results.results.length > 0) {
          const { lat, lng } = results.results[0].latlng;
          setPosition([lat, lng]);
          map.flyTo([lat, lng], 6);
        }
      });
  }, [address, map]);
  return (
    <>
      <Marker position={position} icon={DefaultIcon}>
        <Popup />
      </Marker>
    </>
  );
};

GeoCoderMarker.propTypes = {
  address: PropTypes.string.isRequired,
};

export default GeoCoderMarker;
