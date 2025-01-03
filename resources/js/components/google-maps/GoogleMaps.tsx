import * as React from "react";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    StandaloneSearchBox,
    LoadScript,
} from "@react-google-maps/api";
import { Input } from "../ui/input";

interface Position {
    lat: number;
    lng: number;
}

const center = { lat: -15.7801, lng: -47.9292 };

export function GoogleMaps(props: {
    geolocalization?: { lat: number; lng: number };
}) {
    const [markerPosition, setMarkerPosition] = React.useState<Position | null>(
        null
    );
    const inputRef = React.useRef<any>(null);

    const onLoad = (ref: any) => (inputRef.current = ref);

    function handlePlaceChanged() {
        const [place] = inputRef.current.getPlaces();
        setMarkerPosition({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        });
    }

    // Função que será chamada quando o mapa for clicado
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const newPosition = {
            lat: event.latLng?.lat() || 0,
            lng: event.latLng?.lng() || 0,
        };
        setMarkerPosition(newPosition); // Atualiza a posição do marcador
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBGkVceXOyvDwgH5mYQRyXYD7bzi6W7ygg"
            libraries={["places"]}
        >
            <GoogleMap
                center={center}
                zoom={3}
                mapContainerStyle={{ width: "100%", height: "400px" }}
                options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
                }}
                onClick={handleMapClick} // Adiciona o evento de clique no mapa
            >
                <div
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        zIndex: 1,
                    }}
                >
                    <StandaloneSearchBox
                        onLoad={onLoad}
                        onPlacesChanged={handlePlaceChanged}
                    >
                        <Input
                            type="text"
                            placeholder="Pesquisa"
                            className="bg-white"
                        />
                    </StandaloneSearchBox>
                </div>
                <Marker position={markerPosition || center} />
            </GoogleMap>
        </LoadScript>
    );
}
