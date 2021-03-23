import React, { useState } from 'react'
import css from './styles.module.scss'
import Sign from '../../components/Sign'
import { getUser } from '../../services/auth'

const Auth: React.FC = () => {

	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')

	const changeEmail = (e: React.FormEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value)
	}

	const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value)
	}

	const signInHandle = (e: React.MouseEvent) => {
		e.preventDefault()
		console.log("AKI")
	}

	if (getUser())
		window.location.href = '/rooms'

	return (
		<div className={css['pg-auth']}>
			<Sign />
		</div>
	)
}

export default Auth