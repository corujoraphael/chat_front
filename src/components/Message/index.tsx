import React from 'react'
import { MessageType, UserType } from '../../interfaces'
import { parseISO, format } from "date-fns";
import { getUser } from '../../services/auth'

import css from './styles.module.scss'

const Message: React.FC<{message: MessageType, clickUser: (user: UserType) => void}> = ({message, clickUser}) => {
	const user = getUser();

	return (
		<div className={`message ${css['cp-message']} ${user && message.user_from_id === user.id ? css['cp-message__sender'] : ''}`}>
			<p className={css['cp-message__user']} onClick={ () => clickUser(message.user_from) }>
				{ message.user_from.name } 
			</p>

			<p className={css['cp-message__message']} >
				{ message.body }
			</p>
			<p className={css['cp-message__time']} >
				{ format(parseISO(message.createdAt), "dd/mm kk:mm") } 
			</p>
		</div>
	)
}

export default Message