import React from "react";
import usePlacesAutoComplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from '@reach/combobox';
import "@reach/combobox/styles.css";
function SearchBar(props){
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutoComplete({
        requestOptions:{
            location: {lat: ()=>props.latlng.lat, lng: ()=>props.latlng.lng},
            radius: 100*1000
        }
    })
    return (
        <Combobox 
            onSelect={async(address)=>{
            setValue(address, false);
            clearSuggestions();
            try{
                const res = await getGeocode({address});
                const {lat, lng} = await getLatLng(res[0]);
                console.log(lat,lng);
                props.panTo({lat,lng});
                props.addMarkers({lat,lng});
            }catch(err){
                console.log(err);
            }
        }}>
            <ComboboxInput style={{
                paddingTop: '2px',
                paddingBottom: '2px',
                fontWeight:'bold',
                color:"#000000",
                width:'30vw',
                marginLeft:'2vw',
                marginTop:'2vh'
            }}
                value={value}
                onChange={(event)=>setValue(event.target.value)}
                disabled = {!ready}
                placeholder = "Enter a address"
            />
            <ComboboxPopover><ComboboxList style={{color:'#000000'}}>
                {status ==='OK' ? data.map(({place_id, description})=> <ComboboxOption key = {place_id} value={description}/>) : null}
            </ComboboxList></ComboboxPopover>
        </Combobox>
    )
}
export default SearchBar;