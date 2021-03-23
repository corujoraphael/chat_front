import React, { useState, useEffect } from 'react'
import { RoomType } from '../../interfaces'

import css from './styles.module.scss'

import Room from '../../components/Room'
import ModalRoom from '../../components/Modal/Room'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import { getRooms } from '../../http/room'

const Rooms: React.FC = () => {

	const [ type, setType ] = useState<string>('room')
	const [ rooms, setRooms ] = useState<Array<RoomType>>([])
	const [ loading, setLoading ] = useState<boolean>(true)
	const [ showModal, setShowModal ] = useState<boolean>(false)
	const [ editableRoom, setEditableRoom ] = useState<RoomType | null>(null)
	
	const fetchRooms = (type: string) => {
		getRooms({
			onlyGroup: type === 'room'
		}).then(res => {
			setRooms(res.data)
			setLoading(false)
		}).catch(e => alert(e))
	}

	const changeTab = (type: string) => {
		setLoading(true)
		setType(type)
		fetchRooms(type)
	}

	const success = (newRoom: RoomType | null, action: string = 'add') => {
		setRooms(state => {
			if (!newRoom)
				return state

			let newState = [...state]
			if (action === 'add'){
				newState.unshift(newRoom)
				return newState
			}
			let index = state.findIndex( room => room.id === newRoom.id )
			if (action === 'delete') {
				newState.splice(index, 1)
				return newState
			}
			state[index] = newRoom
			return state 
		})
	}

	const handleEdit = (room: RoomType) => {
		setEditableRoom(room)
		setShowModal(true)
	}

	const closeModal = () => {
		setEditableRoom(null)
		setShowModal(false)
	}

	useEffect( () => {
		fetchRooms('room')
	},[])
	
	return (
		<div>
			<Header showBack={false} />
			<div className={css['pg-rooms']}>
				<div className={css['pg-rooms__tabs']}>
					<div 
						className={`${css['pg-rooms__tab']} ${ type === 'room' ? css['active'] : ''}`} 
						onClick={ () => changeTab('room') }
					>
						Salas
					</div>
					<div 
						className={`${css['pg-rooms__tab']} ${ type === 'talk' ? css['active'] : ''}`}
						onClick={ () => changeTab('talk') }
					>
						Conversas
					</div>
				</div>
				{ !loading ? 
					<div className={css['pg-rooms__list']}>
						{ rooms.map( (room: RoomType) => (
							<Room key={room.id} room={ room } handleEdit={ handleEdit} />
						))}
					</div> : 
					<div className={css['pg-rooms__loader']}>
						<Loader />
					</div>
				}
				{ type === 'room' && <button className={css['pg-rooms__new']} onClick={ () => setShowModal(true) }>Criar sala</button>}
			</div>
			{ showModal && 
				<ModalRoom 
					closeModal={ closeModal } 
					success={ success }
					room={ editableRoom }
				/>
			}
		</div>
	)
}

export default Rooms