import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const Toggle = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<IconButton
			aria-label={"Change theme"}
			onClick={() => toggleColorMode()}
			icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
		/>
	);
};

export default Toggle;
