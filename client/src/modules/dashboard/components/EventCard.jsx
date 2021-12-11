import React from "react";
import {
	Box,
	Center,
	Image,
	Stack,
	Heading,
	Text,
	Avatar,
	Button,
	Flex,
} from "@chakra-ui/react";

import { useColorModeValue } from "@chakra-ui/color-mode";
import { ViewIcon } from "@chakra-ui/icons";

const EventCard = (props) => {
	const { title, description, host, date, eventImage } = props;

	return (
		<Center py={6}>
			<Box
				minH={"20rem"}
				w={"100%"}
				bg={useColorModeValue("white", "gray.900")}
				rounded={"md"}
				p={6}
				overflow={"hidden"}
			>
				<Box bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
					<Image
						src={
							eventImage ??
							"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
						}
						layout={"fill"}
					/>
				</Box>
				<Stack>
					<Text
						color={"#EC6EAD"}
						textTransform={"uppercase"}
						fontWeight={800}
						fontSize={"sm"}
						letterSpacing={1.1}
						textAlign={"left"}
					>
						EVENT
					</Text>
					<Heading
						color={useColorModeValue("gray.700", "white")}
						fontSize={"1xl"}
						fontFamily={"body"}
						textAlign={"left"}
					>
						{title}
					</Heading>
					<Text color={"gray.500"} textAlign={"left"} noOfLines={3}>
						{description}
					</Text>
				</Stack>
				<Stack mt={6} direction={"row"} spacing={4} align={"center"}>
					<Avatar
						src={
							host.image ??
							"https://avatars0.githubusercontent.com/u/1164541?v=4"
						}
						alt={"Author"}
					/>
					<Stack direction={"column"} spacing={0} fontSize={"sm"}>
						<Text fontWeight={600}>{host.name}</Text>
						<Text color={"gray.500"}>{date}</Text>
					</Stack>
				</Stack>
				<Flex mt={6} w={"100%"} justifyContent={"space-between"}>
					<Button w={"48%"}>View</Button>
					<Button w={"48%"}>Join</Button>
				</Flex>
			</Box>
		</Center>
	);
};

export default EventCard;
