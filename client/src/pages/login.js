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
	Text
} from "@chakra-ui/react";
import superagent from "superagent";
import { useHistory } from "react-router";
const backendHost = 'http://localhost:8080/';
const LoginPage = () => {
	if(sessionStorage.getItem('user_id')){
		sessionStorage.clear();
	}
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [invalidLogin, setInvalidLogin] = useState(false);
	// const [loginStatus, setLogin] = useState(false);
	const history = useHistory();
	const validateLogin = async (email,password)=>{
		const login_attempt = await axios({
			method:'POST',
			url: `${backendHost}users/login`,
			data:{
				user_identification: email,
				password: password
			}
		}).then((res)=>{
			if(res.status==204){
				setInvalidLogin(true);
			}else if(res.status==200){
				setIsSubmitting(false);
				res = res.data;
				for(let i in res){
					console.log(i, res[i]);
					window.sessionStorage.setItem(i, JSON.stringify(res[i]));
					
				}
				
				// const resp = await superagent.post("/api/user/session");
				history.push("/dashboard");
			}
		});
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		validateLogin(email,password);		
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
				<Heading>Welcome Back</Heading>
				<Form onSubmit={handleSubmit}>
					<FormControl id="email" isRequired>
						<FormLabel>Email address</FormLabel>
						<Input
							type="email"
							placeholder={"Hi@example.com"}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<FormHelperText>
							We'll never share your email.
						</FormHelperText>
					</FormControl>
					<FormControl id="password" isRequired>
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							placeholder={"*******"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>
					<Button
						bg={"#EC6EAD"}
						color={"white"}
						isLoading={isSubmitting}
						type="submit"
						// onClick={()=>{
						// }}
					>
						Submit
					</Button>
					{invalidLogin && <Text color={"red"}>Invalid Login</Text>}
				</Form>
			</Stack>
		</Layout>
	);
};

export default LoginPage;

const Form = styled.form`
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	row-gap: 1rem;
`;
