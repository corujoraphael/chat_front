import React, { useState, useEffect } from 'react'
import Modal from '../index'
import css from './styles.module.scss'
import { createRoom, editRoom, removeRoom } from '../../../http/room'
import { RoomType } from '../../../interfaces' 

const ModalRoom: React.FC<{
	closeModal: () => void, 
	success: (res: RoomType | null, action: string) => void,
	room: RoomType | null
}> = ({ closeModal, success, room }) => {

	const id: number | null = room ? room.id : null
	const [ title, setTitle ] = useState<string>(room ? room.name : '')
	const [ description, setDescription ] = useState<string>(room ? room.description : '')
	const [ errors, setErrors ] = useState<{title?: string}>({})


	const changeTitle = (e: React.FormEvent<HTMLInputElement>) => {
		let value = e.currentTarget.value
		setTitle(value)
	}

	const validate = {
		title: () => {
			let newErrors = {...errors}
			delete newErrors.title
			if (!title || title === '')
				newErrors.title = "Digite um titulo válido"
			setErrors(newErrors)

		}
	}

	useEffect(() => {
		if (title !== '')
	   		validate.title()
	}, [ title ])

	const changeDescription = (e: React.FormEvent<HTMLTextAreaElement>) => {
		setDescription(e.currentTarget.value)
	}

	const validateForm = () =>  {
		return Object.keys(errors).length === 0

	}

	const saveRoom = (e: React.MouseEvent) => {
		e.preventDefault()
		if (validateForm()){
			let request = null
			if (id)
				request = editRoom({
					id,
					name: title,
					description,
				})
			else
				request = createRoom({
					name: title,
					description,
				})

			request.then(res => {
				success(res.data, id ? 'edit' : 'add')
				closeModal()
			}).catch(err => alert(err))
		}
	}

	const deleteRoom = (e: React.MouseEvent) => {
		e.preventDefault()
		removeRoom({
			id
		}).then(res => {
			success(room, 'delete')
			closeModal()
		}).catch(err => alert(err))
	}


	return (
		<Modal closeModal={ closeModal }>
			<div className={css['cp-modal-room']}>
				<h1 className={css['cp-modal-room__title']}> { id ? 'Editar' : 'Criar' }  sala </h1>
				<form className={css['cp-modal-room__form']}>
					<div className={css['cp-modal-room__input-group']}>
						<label htmlFor="title">Título: </label>
						<input 
							className={`${css['cp-modal-room__input']} ${ errors.title ? css['error'] : ''}`} 
							type="text" 
							id="title"
							placeholder="Digite um título" 
							value = { title }
							onChange={ changeTitle }
						/>
						{ errors.title && <p className={css['cp-modal-room__error']}>{ errors.title }</p> }
					</div>
					<div className={css['cp-modal-room__input-group']}>
						<label htmlFor="description">Descrição: </label>
						<textarea
							className={css['cp-modal-room__input']}
							placeholder="Digite uma descrição"
							id="description"
							value={ description }
							onChange={ changeDescription }
						></textarea>
					</div>

					<button 
						className={css['cp-modal-room__action']}
						type="submit"
						disabled={ title === "" || Object.keys(errors).length > 0 }
						onClick={ saveRoom }
					>
						Salvar
					</button>
					{ id  &&
						<button 
							className={`${css['delete']} ${css['cp-modal-room__action']}`}
							type="submit"
							onClick={ deleteRoom }
						>
							Deletar
						</button>
					}
				</form>
			</div>
		</Modal>
	)
}

export default ModalRoom