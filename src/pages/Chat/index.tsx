import React, { useState, useEffect } from 'react'
import { MessageType, UserType } from '../../interfaces'
import { getUser } from '../../services/auth'
import { useParams } from "react-router-dom"
import { io } from "socket.io-client";

import css from './styles.module.scss'

import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import Modaluser from '../../components/Modal/User'
import { getMesssages, createMessage } from '../../http/message'



const Chat: React.FC = () => {

	const [ messages, setMessages ] = useState<Array<MessageType>>([])
	const [ liveMessages, setLiveMessages ] = useState<Array<MessageType>>([])
	const [ loading, setLoading ] = useState<boolean>(true)
	const [ loadingSend, setLoadingSend ] = useState<boolean>(false)
	const [ newMessage, setNewMessage ] = useState<string>('')
	const [ modalUser, setModalUser ] = useState<boolean>(false)
	const [ selectedUser, setSelecteduser ] = useState<UserType | null>(null)
	const { roomId } = useParams<{ roomId: string }>()
	const user = getUser();
	

	useEffect( () => {
		
		getMesssages({
			room_id: roomId
		}).then(res => {
			setMessages(res.data.reverse())
			setLoading(false)
			scrollToLast()
			const socket = io(process.env.REACT_APP_SOCKET_URL || '')
			socket.emit("joinRoom", { userId: 1, roomId });

			socket.on("newMessage", data => {
				if (data.user_from_id !== user.id){
					setLiveMessages(state => [...state, data])
					scrollToLast()
				}
	    	});
		}).catch( e => {
			if (e.response.status === 401)
				window.location.href = '/rooms'
		} )
	},[ roomId, user.id ])

	const handleSubmit = () => {

		setLoadingSend(true);
		createMessage({
			body: newMessage,
			room_id: roomId
		}).then( res => {
			setNewMessage('')
			setLiveMessages(state => [...state, res.data])
			scrollToLast()
			setLoadingSend(false)
		}).catch( e => alert(e) )
	}


	const scrollToLast = () => {
		let messages = document.querySelectorAll(".message")
		let lastMessage = messages[messages.length - 1] as HTMLElement
		let messagesList = document.getElementById('chat-messages')

		if (messagesList && lastMessage)
			messagesList.scrollTop = lastMessage.offsetTop + lastMessage.scrollHeight
	}

	const openModalUser = (user: UserType) => {
		if (user){
			setSelecteduser(user)
			setModalUser(true)
		}
	}

	return (
		<div>
			<Header />
			<div className={css['pg-messages']}>
				{ !loading ? 
					<div id="chat-messages" className={`${css['pg-messages__list']}`}>
						{ messages.map( (message: MessageType) => (
							<Message key={message.id} message={ message } clickUser={ openModalUser } />
						))}
						{ liveMessages.map( (message: MessageType) => (
							<Message key={message.id} message={ message } clickUser={ openModalUser } />
						))}
					</div> : 
					<div className={css['pg-messages__loader']}>
						<Loader />
					</div>
				}
				<div className={css['pg-messages__actions']}>
					<textarea 
						value={newMessage} 
						onChange={ (e) => setNewMessage(e.currentTarget.value) } 
						placeholder="Digite sua mensagem"
					></textarea>
					<button
						disabled={loading || loadingSend || !newMessage || newMessage === ''} 
						onClick={ handleSubmit }
					> { loadingSend ? <Loader /> : "Enviar" }</button>
				</div>
			</div>

			{modalUser && selectedUser && 
				<Modaluser 
					user={selectedUser}
					closeModal={ () => setModalUser(false)}
				/>
			}
		</div>
	)
}

export default Chat