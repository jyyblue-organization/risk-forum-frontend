import React, { createContext, useContext, useState } from 'react';

const AuthContent = createContext({
	user: null,
	setUser: () => { },
	receiveNotification: null,
	setReceiveNotification: () => { },
});

export const AuthProvider = ({ children }) => {
	const [user, _setUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);

	const [receiveNotification, setReceiveNotification] = useState(null);

	// set user to local storage
	const setUser = (user) => {
		if (user) {
			console.log('set user to local storage');
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
		}
		_setUser(user);
	};

	return (
		<AuthContent.Provider value={{ user, setUser, receiveNotification, setReceiveNotification }}>
			{children}
		</AuthContent.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContent);
};