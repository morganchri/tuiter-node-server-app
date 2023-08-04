import users from "./users.js"

// let users = [];


export const findAllUsers = () => users;


export const findUserById = (uid) => {
	const index = users.findIndex((u) => u._id === uid);
	if (index !== -1) return users[index];
	return null;
};


export const findUserByUsername = (username) => {
	const index = users.findIndex((u) => u.username === username);
	if (index !== -1) return users[index];
	return null;
};


export const findUserByCredentials = (username, password) => {
	console.log("Username");
	console.log(username);
	console.log("Password");
	console.log(password);
	console.log("Users");
	console.log(users)
	const index = users.findIndex((u) => u.username === username && u.password === password);
	console.log(index);
	if (index !== -1) {
		return users[index];
	}
	return null;
};


export const createUser = (user) => users.push(user);


export const updateUser = (uid, user) => {
	const index = users.findIndex((u) => u._id === uid);
	users[index] = { ...users[index], ...user };
	return {status: 'ok'}
};

export const deleteUser = (uid) => {
	const index = users.findIndex((u) => u._id === uid);
	users.splice(index, 1);
	return {status: 'ok'}
};
