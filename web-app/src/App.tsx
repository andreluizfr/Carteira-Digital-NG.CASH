import './App.css';
import FirstPage from './Pages/FirstPage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface IUser {
	username: string,
	password: string
}

const apiURL = "http://localhost:5353";

function App() {

	const accessToken = localStorage.getItem('x-access-token');
	const [user, setUser] = useState<IUser | null>(null);
	
	const fetchUserData = useCallback(()=>{

		if(accessToken){

			axios.get(apiURL+"/user/getUser", {headers: { Authorization: `Bearer ${accessToken}` }}).then(response=>{

				console.log(response.data.message);

				if(response.data.user)
					setUser(response.data.user);
				else
					localStorage.clear();
				
			}).catch(error=>{
				localStorage.clear();
				console.error(error);
			});

		}

	}, [accessToken]);

	useEffect(() => {

		fetchUserData();

	}, [fetchUserData]);
	

	let router = createBrowserRouter([

		{
			path: "/",
			element: <HomePage user={user} setUser={setUser}/>,
		},
		{
			path: "/login",
			element: <LoginPage/>
		},
		{
			path: "/signup",
			element: <SignupPage/>
		}

	]);

	let router2 =createBrowserRouter([
	
		{
			path: "/",
			element: <FirstPage/>
		},
		{
			path: "/login",
			element: <LoginPage/>
		},
		{
			path: "/signup",
			element: <SignupPage/>
		}
		
	]);

	if(user)
		return(
			<RouterProvider router={router}/>
		);
		
	else 
		return(
			<RouterProvider router={router2}/>
		);

	
}

export default App;
