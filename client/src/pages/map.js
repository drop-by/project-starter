import React from "react";
import axios from "axios";
// import {Button} from "@chakra-ui/react";
import { GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import { SearchBar } from "../modules/layout";

const libraries = ["places"];
const google_env = "googleMapsApiKey";
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 0.0,
  lng: 0.0,
};
const backendHost = 'http://localhost:8080/';
const zoom = 15;
let def = true;
const Map = (props)=>{
  const mapRef = React.useRef();
  const panTo = React.useCallback(({lat,lng})=>{
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    mapRef.current.panTo({lat,lng});
    mapRef.current.setZoom(zoom);
    def = false;
    clearMarkers();
    getActiveEvents();
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: google_env,
    libraries,
  });
  const clearMarkers = (()=>{
    setMarkers((current)=>[]);
  });
  const addMarkers = ((params)=>{
    params.event_lat = parseFloat(params.event_lat);
    params.event_long = parseFloat(params.event_long);
    setMarkers((current)=>[
      ...current,
      {
        uuid: params.event_id,
        lat: params.event_lat,
        lng: params.event_long,
        event_image: params.event_image || "https://www.transactis.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png",
        start_date: params.event_start,
        end_date: params.event_end,
        capacity: params.capacity,
        taken: params.taken,
        is_online: params.is_online,
        hit_capacity: params.hit_capacity,
        requires_vac: params.requires_vac,
        event_title: params.event_name,
        event_desc: params.event_desc,
      }
    ]);
  });
  const getData = async(backend_url) =>{
    return await axios(backend_url).then(res=>res.data);
  }
  const getActiveEvents = async ()=>{
    const data = await getData(`${backendHost}event/active`);
    for(let location of data){
      await addMarkers(location);
    }
  }
  const getDate = (date)=>{
    return (new Date(date)).toLocaleString("en-us", {weekday: 'long',year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: "2-digit"});
  }
  if(loadError) return 'Error loading Map';
  if(!isLoaded) return 'Loading';
  return (
    <React.Fragment>
      <div style={{'color':'#00000'}}>
      <div style={{position: 'absolute',textAlign: 'center',zIndex: 2}}>
        <SearchBar latlng = {center} panTo = {panTo} addMarkers = {addMarkers}>
      </SearchBar></div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={def ? 3 : zoom}
        center={center}
        options={options}
        onClick={(event)=>{
          
          // setMarkers((current)=>[
          //   ...current,
          //     {
          //       lat: event.latLng.lat(),
          //       lng: event.latLng.lng(),
          //       time: new Date()
          //     }
          //   ]);
          }
        }
        onLoad={(event)=>{          
          mapRef.current = event;
        }}
      >
          {markers.map((marker) =>(
            <Marker
              key={marker.uuid}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={()=>{
                  setSelected(marker);
                }
              }
            />
          ))}
          {selected ? (<InfoWindow position={{lat:selected.lat, lng:selected.lng}} onCloseClick={()=>setSelected(null)}>
            <div>
              <img style={{ marginTop: `2vh`, height: "25vh", width:"25vw" }} src = "https://www.transactis.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png" alt="Not Found"/>
              <br/><span style={{fontSize:'20px', fontWeight: "bolder"}}>{selected.event_title}</span><hr/>
              <span style={{fontSize:'8px', fontstyle: "italic", color:'#999999', margin:0}}>{console.log(selected.start_date)}
                {getDate(selected.start_date)} - {getDate(selected.end_date)}
              </span>
              <h5>{selected.event_desc}</h5>
              <hr/>
              <div style={{}}>
                  {selected.taken}/{selected.capacity} Attendees

              </div>
              

              <button>hgel</button>

            </div>
          </InfoWindow>) : null}
        </GoogleMap></div>
        </React.Fragment>
    )
}
export default Map;