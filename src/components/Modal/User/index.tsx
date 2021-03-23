import React, { useState } from 'react'
import Modal from '../index'
import css from './styles.module.scss'
import { createRoom, editRoom, removeRoom } from '../../../http/room'
import { UserType } from '../../../interfaces' 

const ModalUser: React.FC<{closeModal: () => void, user: UserType}> = ({ closeModal, user }) => {

	const saveRoom = (e: React.MouseEvent) => {
		e.preventDefault()
		createRoom({
			user_to_id: user.id
		}).then(res => {
			window.location.href = `/room/${res.data.id}`;
			closeModal()
		})
	}


	return (
		<Modal closeModal={ closeModal }>
			<div className={css['cp-modal-user']}>
				<h1>{user.name}</h1>
				<button onClick={saveRoom}>Conversar no privado</button>
			</div>
		</Modal>
	)
}

export default ModalUser