import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import CreatePage from "../pages/CreatePage/CreatePage";
import NotificationPage from "../pages/NotificationPage/NotificatonPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import ChatPage from "../pages/ChatPage/ChatPage";

import styles from "./App.module.scss";
import { ProfileContextProvider } from "../context/profileContext";
import ChatLayout from "../layouts/ChatLayout/ChatLayout";
import ChatRoomPage from "../pages/ChatRoomPage/ChatRoomPage";
import ChatNotifications from "./ChatNotifications";

function Authenticated() {
	// Route authenticated users

	const ChatApp = () => (
		<ChatLayout>
			<ChatRoomPage />
		</ChatLayout>
	);

	const MainApp = () => {
		// Use chat notifications when not in chat app

		return (
			<ChatNotifications>
				<MainLayout>
					<Switch>
						<Route exact path='/chat' component={ChatPage} />

						<Route exact path='/home' component={HomePage} />

						<Route exact path='/create' component={CreatePage} />

						<Route exact path='/search' component={SearchPage} />

						<Route
							exact
							path='/notifications'
							component={NotificationPage}
						/>

						<Route
							exact
							path='/profile/:username'
							component={ProfilePage}
						/>

						{/* Default Route */}
						<Route path='/' component={HomePage} />
					</Switch>
				</MainLayout>
			</ChatNotifications>
		);
	};

	return (
		<div id={styles.app}>
			<Router>
				<ProfileContextProvider>
					<Switch>
						<Route
							exact
							path='/chat/:room_id'
							component={ChatApp}
						/>
						<Route path='/' component={MainApp} />
					</Switch>
				</ProfileContextProvider>
			</Router>
		</div>
	);
}

export default Authenticated;