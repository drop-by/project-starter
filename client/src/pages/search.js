import React, { useState } from "react";
import styled from "styled-components";
import {
	Stack,
	Heading,
	Flex,
	Grid,
	FormControl,
	Input,
	FormHelperText,
	FormLabel,
} from "@chakra-ui/react";
import { Layout } from "../modules/layout";
import { Button, IconButton } from "@chakra-ui/button";
import {
	SettingsIcon,
	SearchIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
} from "@chakra-ui/icons";
import Toggle from "../common/components/ThemeToggle";
import Results from "../common/components/Results";

const fetchResults = async (url) => {
	console.log(url);
};

const SearchPage = () => {
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [data, setData] = useState(null);
	const [isFiltered, setIsFiltered] = useState(false);
	const [filteredData, setFilteredData] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
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
					<Heading>Start Meetin'</Heading>
					<Grid columnGap={4} templateColumns={"repeat(3, 1fr)"}>
						<Toggle />

						<IconButton
							aria-label={"Open Settings"}
							icon={<SettingsIcon />}
						/>
						<IconButton aria-label={"Feed"} icon={<SearchIcon />} />
					</Grid>
				</Flex>
				<Form onSubmit={handleSubmit}>
					<FormControl id="title" isRequired>
						<FormLabel>Event Title</FormLabel>
						<Input
							type="text"
							placeholder={"Concert"}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormControl>
					<FormControl id="location">
						<FormLabel>Location</FormLabel>
						<Input
							type="text"
							placeholder={"New York"}
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					</FormControl>
					<Button
						bg={"#EC6EAD"}
						color={"white"}
						isLoading={isSubmitting}
						type="submit"
						padding={"0 2.5rem"}
					>
						Submit
					</Button>
				</Form>
				{data && <Results data={isFiltered ? filteredData : data} />}
			</Stack>
		</Layout>
	);
};

export default SearchPage;

const Form = styled.form`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	flex-direction: row;
	gap: 0.5rem;
	width: 100%;
`;
