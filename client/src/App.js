import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/login";
import Map from "./pages/map";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ChakraProvider } from "@chakra-ui/provider";
// import{ Map } from './src/modules/layout/component/Map.js';
import "./App.css";
import DashboardPage from "./pages/dashboard";
import SearchPage from "./pages/search";
import SignupPage from "./pages/signup";

const App = () => {
	return (
		<Provider store={store}>
			<ChakraProvider>
				<Router>
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/signup" component={SignupPage} />
						<Route
							exact
							path="/dashboard"
							component={DashboardPage}
						/>
						<Route exact path="/search" component={SearchPage} />
						<Route exact path="/map" component={Map} />
					</Switch>
				</Router>
			</ChakraProvider>
		</Provider>
	);
};

export default App;
