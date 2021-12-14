import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { Layout } from "../modules/layout";
// import usePlacesAutoComplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
// import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from '@reach/combobox';
// import "@reach/combobox/styles.css";
import {
	Stack,
	Heading,
	FormControl,
	Input,
	Flex,
	FormLabel,
	Textarea,
	Link,
    Select,
    Grid,
    Text
} from "@chakra-ui/react";
import Toggle from "../common/components/ThemeToggle";
import { Button, IconButton } from "@chakra-ui/button";
import {
	PlusSquareIcon,
	SearchIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
	ExternalLinkIcon,
} from "@chakra-ui/icons";
import { useHistory } from "react-router";
const backendHost = 'http://localhost:8080/';
const CreateEventPage = () => {
	
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endDate, setEndDate] = useState();
    const [endTime, setEndTime] = useState();
    const [online, setOnline] = useState(false);
    const [vac, setVac] = useState(true);
    const [capacity, setCapacity] = useState();
    const [imageURL, setImageURL] = useState('https://i.gifer.com/4KL.mp4');
    const [address, setAddress] = useState();
    const [zip, setZip] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [validDate, setValidDate] = useState(0);
	const history = useHistory();
	if(!sessionStorage.getItem('user_id')){
		history.push("/login");
	}
    const attempt_createEvent = async (start,end)=>{
        const createEvent_req = await axios({
            method:'POST',
			url: `${backendHost}event`,
            data:{
				event_name: title,
				event_desc: desc,
                capacity: parseInt(capacity),
				event_start: start,
				event_end: end,
				is_online: online,
                require_vac: vac,
                event_address: address,
				event_state: state,
                event_zip: zip,
                event_city: city,
                event_country: country,
				event_image: imageURL,
                creator: sessionStorage.getItem('user_id').substring(1,sessionStorage.getItem('user_id').length-1)
			}
        }).then(res=>{
            if(res.status===203){
                setValidDate(3);   
            }
        });
    }
	const handleSubmit = (e) => {
		e.preventDefault();
        // spliting the YYYY-MM-DD HH:mm format into a readable format
        let end = endDate.split('-');
        end.push(...endTime.split(':'));
        end = new Date(end[0],end[1]-1,end[2],end[3],end[4]);
        
        let start = startDate.split('-');
        start.push(...startTime.split(':'));
        start = new Date(start[0],start[1]-1,start[2],start[3],start[4]);
        if(start>end){
            setValidDate(1);
        }else if(new Date()>start){
            setValidDate(2);
        }else{
            setValidDate(0);
            attempt_createEvent(start,end);
        }
	};
	return (
		<Layout shouldHideNav>
			<Stack
				textAlign={"center"}
				justifyContent={"center"}
				alignItems={"center"}
				spacing={{ md: 12 }}
				flexDirection={"column"}
				w={"100%"}
			>
				<Flex
					justifyContent={"space-between"}
					alignItems={"center"}
					flexDirection={"row"}
					w={"100%"}
					mt={12}
				>
					<Heading>Feed</Heading>
					<Grid columnGap={5} templateColumns={"repeat(4, 1fr)"}>
						<Toggle />

						<IconButton
							aria-label={"Create Event"}
							icon={<PlusSquareIcon />}
                            disabled    
						/>
						<IconButton
							aria-label={"Search for events"}
							icon={<SearchIcon />}
							onClick={() => history.push("/search")}
						/>
						<IconButton
							aria-label={"Logout"}
							icon={<ExternalLinkIcon />}
							onClick={()=>{
								sessionStorage.clear();
								history.push('/');
								// no need to make another state for this
							}}
						/>
					</Grid>
				</Flex>
				<Heading>Host a event</Heading>
				<Form onSubmit={handleSubmit}>
					<FormControl id="eventInfo" isRequired>
						<FormLabel>Title:</FormLabel>
						<Input
							type="text"
							placeholder={"CTP Project Showcase"}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
                        <FormLabel>Description</FormLabel>
						<Textarea 
							placeholder={"Annual showcase of projects by CTP Web development and Data science students"}
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
						/>
					</FormControl>
                    <FormControl id="start" isRequired>
						<FormLabel>Start Date</FormLabel>
						<Input
							type="date"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
						/>
                        <FormLabel>Start Time</FormLabel>
						<Input
							type="time"
							value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
						/>
					</FormControl>
                    <FormControl id="end" isRequired>
						<FormLabel>End Date</FormLabel>
						<Input
							type="date"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
						/>
                        <FormLabel>End Time</FormLabel>
						<Input
							type="time"
							value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
						/>
					</FormControl>
                    <FormControl id="online" isRequired>
						<FormLabel>Online</FormLabel>
						<Select placeholder={'Select'} value = {online}
                        onChange={(e) => setOnline(e.target.value)}>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </Select>
					</FormControl>
                    <FormControl id="vac" isRequired>
						<FormLabel>Requires Vaccination</FormLabel>
						<Select placeholder={'Select'} value = {vac}
                        onChange={(e) =>setVac(e.target.value)}>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </Select>
					</FormControl>
                    <FormControl id="capacity" isRequired>
						<FormLabel>Capacity</FormLabel>
						<Input
							type="number"
							value={capacity}
							onChange={(e) => setCapacity(e.target.value)}
						/>
					</FormControl>
                    <FormControl id="address" isRequired>
						<FormLabel>Event Address</FormLabel>
						<Input
							type="text"
                            placeholder="Address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
                        <Input
							type="text"
                            placeholder="Zip / Postal Code"
							value={zip}
							onChange={(e) => setZip(e.target.value)}
						/>
                        <Input
							type="text"
                            placeholder="City"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
                        <Input
							type="text"
                            placeholder="State"
							value={state}
							onChange={(e) => setState(e.target.value)}
						/>
                        <Input
							type="text"
                            placeholder="Country"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						/>
					</FormControl>
                    <FormControl id="imageURL" isRequired>
						<FormLabel>Event Image</FormLabel>
						<Input
							type="url"
                            placeholder="https://i.gifer.com/4KL.mp4"
							value= {imageURL}
							onChange={(e) => setImageURL(e.target.value)}
						/>
					</FormControl>
					<Button
						bg={"#EC6EAD"}
						color={"white"}
						isLoading={isSubmitting}
						type="submit">
						Create
					</Button>
                    <Text color={'red.500'}>{validDate===1 ? 'Your event starts before it ends!' :
                                            validDate===2 ? 'The start/end dates has past!' :
                                            validDate===3 ? 'Address is invalid, please expand the state, city, and country names': ''}</Text>
				</Form>
			</Stack>
		</Layout>
	);
};

export default CreateEventPage;

const Form = styled.form`
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	row-gap: 1rem;
`;
