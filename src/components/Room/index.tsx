import React from 'react'
import { RoomType } from '../../interfaces'

import css from './styles.module.scss'
import { getUser } from '../../services/auth'

const Room: React.FC<{room: RoomType, handleEdit: (room: RoomType) => void}> = ({room, handleEdit}) => {
	
	const user = getUser();

	return (
		<a href={`/room/${room.id}`} className={css['cp-room__room']}>
			<img 
				className={css['cp-room__avatar']} 
				src={`https://ui-avatars.com/api/?background=random&name=${ room.user_to ? room.user_to.name : room.name }`} 
				alt={`Avatar ${ room.name }`}
			/>
			<div className={css['cp-room__info']} >
				<h5 className={css['cp-room__title']} >
					{ room.user_to ? room.user_to.name : room.name }
				</h5>
				{ !room.user_to &&
					<p className={css['cp-room__desc']} >
						{ room.description }
					</p>
				}
			</div>
			{ !room.user_to && user.id === room.owner_id &&
				<div className={css['cp-room__actions']} >
					<button onClick={ e => {
						e.preventDefault()
						handleEdit(room)
					}}>
						Editar
					</button>
				</div>
			}
		</a>
	)
}

export default Room