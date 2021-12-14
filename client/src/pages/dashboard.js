import React, { useEffect, useState } from "react";
import { Layout } from "../modules/layout";
import { Stack, Box, Heading, Flex, Grid } from "@chakra-ui/layout";
import Toggle from "../common/components/ThemeToggle";
import { Button, IconButton } from "@chakra-ui/button";
import {
	PlusSquareIcon,
	SearchIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
	ExternalLinkIcon,
} from "@chakra-ui/icons";
import EventCard from "../modules/dashboard/components/EventCard";
import superagent from "superagent";
import TempData from "../modules/dashboard/eventData.json";
import { useHistory } from "react-router";
// import Session from 'react-session-api'

const Dashboard = () => {
	const history = useHistory();
	if(!sessionStorage.getItem('user_id')){
		history.push("/login");
	}
	const [isLoading, setIsLoading] = useState();
	const [personalCardPos, setPersonalCardPos] = useState({
		start: 0,
		end: 4,
	});

	const [popularCardPos, setPopularCardPos] = useState({
		start: 0,
		end: 4,
	});

	const renderEvents = (data) => {
		return data.map((el, i) => (
			<EventCard
				key={`event-${i}-${el.date}`}
				title={el.title}
				description={el.description}
				host={el.host}
				eventImage={el.eventImage}
			/>
		));
	};

	const handleNextPress = (type) => {
		if (type === "personal") {
			setPersonalCardPos({
				start: personalCardPos.start + 4,
				end: personalCardPos.end + 4,
			});
		} else {
			setPopularCardPos({
				start: popularCardPos.start + 4,
				end: popularCardPos.end + 4,
			});
		}
	};

	const handlePrevPress = (type) => {
		if (type === "personal") {
			setPersonalCardPos({
				start: personalCardPos.start - 4,
				end: personalCardPos.end - 4,
			});
		} else {
			setPopularCardPos({
				start: popularCardPos.start - 4,
				end: popularCardPos.end - 4,
			});
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
							onClick={()=>{history.push('/createEvent')}}
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
				<Box w={"100%"}>
					<Flex w={"100%"} justifyContent={"space-between"}>
						<Flex>
							<Heading textAlign={"left"}>{sessionStorage.getItem('username').substring(1,sessionStorage.getItem('username').length-1) || 'Your'}'s Events</Heading>
							<Button ml={5}>View All</Button>
						</Flex>
						<Flex
							width={"10%"}
							flexDirection={"row"}
							justifyContent={"space-between"}
						>
							<IconButton
								icon={<ChevronLeftIcon />}
								disabled={personalCardPos.start - 4 < 0}
								onClick={() => handlePrevPress("personal")}
							/>
							<IconButton
								icon={<ChevronRightIcon />}
								disabled={
									personalCardPos.end + 4 >
									TempData.personal.items.length
								}
								onClick={() => handleNextPress("personal")}
							/>
						</Flex>
					</Flex>
					<Grid columnGap={4} templateColumns={"repeat(4, 1fr)"}>
						{renderEvents(
							TempData.personal.items.slice(
								personalCardPos.start,
								personalCardPos.end
							)
						)}
					</Grid>
				</Box>
				<Box w={"100%"}>
					<Flex w={"100%"} justifyContent={"space-between"}>
						<Flex>
							<Heading textAlign={"left"}>
								Popular near {sessionStorage.getItem('zip').substring(1,sessionStorage.getItem('zip').length-1)}
							</Heading>
							<Button ml={5} onClick={()=>history.push('/map')}>View All</Button>
						</Flex>
						<Flex
							width={"10%"}
							flexDirection={"row"}
							justifyContent={"space-between"}
						>
							<IconButton
								icon={<ChevronLeftIcon />}
								disabled={popularCardPos.start - 4 < 0}
								onClick={() => handlePrevPress("popular")}
							/>
							<IconButton
								icon={<ChevronRightIcon />}
								disabled={
									popularCardPos.end + 4 >
									TempData.popular.items.length
								}
								onClick={() => handleNextPress("popular")}
							/>
						</Flex>
					</Flex>
					<Grid columnGap={4} templateColumns={"repeat(4, 1fr)"}>
						{renderEvents(
							TempData.popular.items.slice(
								popularCardPos.start,
								popularCardPos.end
							)
						)}
					</Grid>
				</Box>
			</Stack>
		</Layout>
	);
};

export default Dashboard;
