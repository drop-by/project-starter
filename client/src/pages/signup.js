import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { Layout } from "../modules/layout";
// import Session from 'react-session-api'		
import {
	Stack,
	Button,
	Heading,
	FormControl,
	Input,
	FormHelperText,
	FormLabel,
	Text,
    InputGroup,
    InputRightElement,
	Link
} from "@chakra-ui/react";
import superagent from "superagent";
import { useHistory } from "react-router";
const backendHost = 'http://localhost:8080/';
const SignupPage = () => {
	const history = useHistory();
	if(sessionStorage.getItem('user_id')){
		history.push("/dashboard");
	}else{
		sessionStorage.clear();
	}
    const [isSubmitting, setIsSubmitting] = useState(false);
	const [email, setEmail] = useState();
    const [first, setFirst] = useState();
    const [last, setLast] = useState();
    const [username, setUsername] = useState();
    const [dob, setDOB] = useState();
    const [phoneNum, setPhoneNum] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [zip, setZip] = useState();
	const [password, setPassword] = useState();
    const [show, setShow] = React.useState(false)
    const [takenInfo, setTakenInfo] = React.useState();
    const handleShow = () => setShow(!show);
	const createUser = async ()=>{
		const login_attempt = await axios({
			method:'POST',
			url: `${backendHost}users/sign_up`,
			data:{
				username: username,
				password: password,
                first_name: first,
                last_name: last,
                email: email,
                birth_date: String(new Date(dob)),
                city: city,
                phone_number: phoneNum,
                address: address,
                state: state,
                zip: zip,
                country: country
			}
		}).then((res)=>{
            if(res.status=='203'){
                setTakenInfo(res.data.msg);
            }else if(res.status=='200'){
				res = res.data;
				for(let i in res){
					window.sessionStorage.setItem(i, JSON.stringify(res[i]));
				}
                history.push("/login");
            }
            
		});
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		createUser();
	};
	return (
		<Layout>
			<Stack
				as={"main"}
				textAlign={"center"}
				justifyContent={"center"}
				alignItems={"center"}
				spacing={{ base: 8, md: 14 }}
				py={{ base: 20, md: 36 }}
			>
				<Heading>Welcome</Heading>
				<Form onSubmit={handleSubmit}>
					<FormControl id="email" isRequired>
						<FormLabel>Email address</FormLabel>
						<Input
							type="email"
							placeholder={"Jdoe@example.com"}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>
                    <FormControl id="first" isRequired>
						<FormLabel>First Name</FormLabel>
						<Input
							type="text"
							placeholder={"John"}
							value={first}
							onChange={(e) => setFirst(e.target.value)}/>
					</FormControl>
                    
                    <FormControl id="last" isRequired>
						<FormLabel>Surname / LastName</FormLabel>
						<Input
							type="text"
							placeholder={"Doe"}
							value={last}
							onChange={(e) => setLast(e.target.value)}/>
					</FormControl>
                    <FormControl id="username" isRequired>
						<FormLabel>Username</FormLabel>
						<Input
							type="text"
							placeholder={"JDoe"}
							value={username}
							onChange={(e) => setUsername(e.target.value)}/>
					</FormControl>
                    <FormControl id="address" isRequired>
						<FormLabel>Address</FormLabel>
						<Input
							type="text"
							placeholder={"4 Privet Drive"}
							value={address}
							onChange={(e) => setAddress(e.target.value)}/>
					</FormControl>
                    <FormControl id="city" isRequired>
						<FormLabel>City</FormLabel>
						<Input 
							type="text"
							placeholder={"Little Whinging"}
							value={city}
							onChange={(e) => setCity(e.target.value)}/>
					</FormControl>
                    <FormControl id="zip" isRequired>
						<FormLabel>Zip / Postal Code</FormLabel>
						<Input
							type="text"
							placeholder={"CH61 1DE"}
							value={zip}
							onChange={(e) => setZip(e.target.value)}/>
					</FormControl>
                    <FormControl id="state" isRequired>
						<FormLabel>State</FormLabel>
						<Input
							type="text"
							placeholder={"England"}
							value={state}
							onChange={(e) => setState(e.target.value)}/>
					</FormControl>
                    <FormControl id="country" isRequired>
						<FormLabel>Country</FormLabel>
						<Input
							type="text"
							placeholder={"United Kingdom"}
							value={country}
							onChange={(e) => setCountry(e.target.value)}/>
					</FormControl>
                    <FormControl id="phoneNum" isRequired>
						<FormLabel>Phone Number</FormLabel>
						<Input
							type="tel"
							placeholder={"800-273-8255"}
							value={phoneNum}
							onChange={(e) => setPhoneNum(e.target.value)}/>
					</FormControl>
                    <FormControl id="dob" isRequired>
						<FormLabel>Date of Birth</FormLabel>
						<Input
							type="date"
							// placeholder={'2000-01-01'}
							value={dob}
							onChange={(e) => setDOB(e.target.value)}/>
					</FormControl>
					<FormControl id="password" isRequired>
						<FormLabel>Password</FormLabel>
                        <InputGroup size='md'>
						<Input
							type={show ? 'text' : 'password'}
							placeholder={"*******"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
                        <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm'  onClick={handleShow}>
                            <Text color={'#000000'}>{show ? 'Hide' : 'Show'}</Text>
                        </Button>
                        </InputRightElement>
                        </InputGroup>
					</FormControl>
					<Button
						bg={"#EC6EAD"}
						color={"white"}
						isLoading={isSubmitting}
						type="submit">
						Signup
					</Button>
				</Form>
				<Link href='./login'>Already have a account?</Link> 
                {takenInfo!=='' && <Text color={'red.500'}>{takenInfo}</Text>}
			</Stack>
            
		</Layout>
	);
};

export default SignupPage;

const Form = styled.form`
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	row-gap: 1rem;
`;
