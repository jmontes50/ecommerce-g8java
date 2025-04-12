import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

const Map = () => {
  const [mapCoords, setMapCoords] = useState([-12.06, -77.02]);
  const [positionMarker, setPositionMarker] = useState(null);

  const MapActions = () => {
    const map = useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setPositionMarker([lat, lng]);
        map.flyTo([lat, lng]);
      }
    })

    if(mapCoords){
      map.flyTo(mapCoords);
    }

    return <>
      {positionMarker ? <Marker position={positionMarker} /> : null}
    </>
  }

  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
        const { latitude, longitude } = position.coords;
        setMapCoords([latitude, longitude]);
      })
    }
  },[])

  return (
    <div className="w-full border-2 rounded h-[450px] my-4">
      <MapContainer center={mapCoords} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapActions />
        {/* Marcador estático */}
        {/* <Marker position={[-12.06, -77.02]}>
          <Popup>
            <h4 className="font-semibold text-green-600">
              Contenido del marcador
            </h4>
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
};

export default Map;
