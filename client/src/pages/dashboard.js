import React, { useState } from "react";
import { Layout } from "../modules/layout";
import { Stack, Box, Heading, Flex, Grid } from "@chakra-ui/layout";
import Toggle from "../common/components/ThemeToggle";
import { Button, IconButton } from "@chakra-ui/button";
import {
	SettingsIcon,
	SearchIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
} from "@chakra-ui/icons";
import EventCard from "../modules/dashboard/components/EventCard";

import TempData from "../modules/dashboard/eventData.json";

const Dashboard = () => {
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
					<Grid columnGap={4} templateColumns={"repeat(3, 1fr)"}>
						<Toggle />
						<IconButton
							aria-label={"Open Settings"}
							icon={<SettingsIcon />}
						/>
						<IconButton
							aria-label={"Search for events"}
							icon={<SearchIcon />}
						/>
					</Grid>
				</Flex>
				<Box w={"100%"}>
					<Flex w={"100%"} justifyContent={"space-between"}>
						<Flex>
							<Heading textAlign={"left"}>Your Events</Heading>
							<Button ml={5}>View All</Button>
						</Flex>
						<Flex
							width={"10%"}
							flexDirection={"row"}
							justifyContent={"space-between"}
						>
							<IconButton
								icon={<ChevronLeftIcon />}
								disabled={personalCardPos.start === 0}
							/>
							<IconButton
								icon={<ChevronRightIcon />}
								disabled={
									personalCardPos.end >
									TempData.personal.items.length
								}
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
								Popular near 11378
							</Heading>
							<Button ml={5}>View All</Button>
						</Flex>
						<Flex
							width={"10%"}
							flexDirection={"row"}
							justifyContent={"space-between"}
						>
							<IconButton
								icon={<ChevronLeftIcon />}
								disabled={popularCardPos.start === 0}
							/>
							<IconButton
								icon={<ChevronRightIcon />}
								disabled={
									popularCardPos.end >
									TempData.personal.items.length
								}
							/>
						</Flex>
					</Flex>
					<Grid columnGap={4} templateColumns={"repeat(4, 1fr)"}>
						{renderEvents(
							TempData.popular.items.slice(
								personalCardPos.start,
								personalCardPos.end
							)
						)}
					</Grid>
				</Box>
			</Stack>
		</Layout>
	);
};

export default Dashboard;
