import { Box, Heading } from "@chakra-ui/layout";
import React from "react";

const Results = ({ data }) => {
	return (
		<Box>
			<Heading>Results {data.length}</Heading>
		</Box>
	);
};

export default Results;
