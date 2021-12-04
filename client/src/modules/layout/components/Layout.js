import React from "react";
import Nav from "./Nav";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Toggle from "../../../common/components/ThemeToggle";

const Layout = ({ children, shouldHideNav }) => {
	let footerBgColor = useColorModeValue("gray.100", "gray.900");

	return (
		<Box
			margin="0 auto"
			maxWidth={!shouldHideNav ? 800 : 1100}
			transition="0.5s ease-out"
		>
			<Box m={["20px", "0"]}>
				{!shouldHideNav && <Nav />}
				<Box
					as={"main"}
					display={"flex"}
					justifyContent={"center"}
					flexDirection={"column"}
					alignItems={"center"}
				>
					{children}
				</Box>
				{!shouldHideNav && (
					<Box as={"footer"} bg={footerBgColor} px={4} p={5}>
						<Toggle />
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Layout;
