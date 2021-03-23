export const TOKEN_KEY = "@chat-Token"
export const USER_INFO = "@chat-User"

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const getUser = () => JSON.parse(localStorage.getItem(USER_INFO))

export const login = (token, user ) => {
	localStorage.setItem(TOKEN_KEY, token)
	localStorage.setItem(USER_INFO, JSON.stringify(user))
}

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY)
	localStorage.removeItem(USER_INFO)
}