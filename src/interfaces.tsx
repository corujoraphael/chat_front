interface User {
	id: number;
	name: string;
	createdAt: string;
}

interface Room {
	id: number;
	name: string;
	description: string;
	owner_id: number;
	user_to_id: number;
	user_to: User;
}

interface Message {
	id: number;
	body: string;
	user_from_id: number;
	user_from: User,
	createdAt: string
}

export type UserType = User
export type RoomType = Room
export type MessageType = Message