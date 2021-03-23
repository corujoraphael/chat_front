import { Route, Redirect } from "react-router-dom"
import { isAuthenticated } from "../services/auth"

export const PrivateRoute = ({component: Component, ...rest }) => {
	return (
		<Route 
			{...rest}
			render={ props => 
				isAuthenticated() === true ? 
				<Component { ...props } /> :
				<Redirect 
					to={{
						pathname: "/",
						state: { from: props.location }
					}}
				/>
			}
		/>
	);
}