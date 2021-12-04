import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/login";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ChakraProvider } from "@chakra-ui/provider";

import "./App.css";
import DashboardPage from "./pages/dashboard";

const App = () => {
	return (
		<Provider store={store}>
			<ChakraProvider>
				<Router>
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/login" component={LoginPage} />
						<Route
							exact
							path="/dashboard"
							component={DashboardPage}
						/>
					</Switch>
				</Router>
			</ChakraProvider>
		</Provider>
	);
};

export default App;
