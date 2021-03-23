import React from 'react'

import AuthPage from './pages/Auth'
import RoomsPage from './pages/Rooms'
import ChatPage from './pages/Chat'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from './route/PrivateRoute';
		

const App: React.FC = () => {

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={AuthPage} /> 
				<PrivateRoute path="/rooms" exact component={RoomsPage} />
				<PrivateRoute path="/room/:roomId" exact component={ChatPage} />
				<Route render={() => <Redirect to="/" />} />
			</Switch>
		</BrowserRouter>
	);
}

export default App
