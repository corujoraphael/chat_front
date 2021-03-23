import React from 'react'
import css from './styles.module.scss'
import Sign from '../../components/Sign'
import { getUser } from '../../services/auth'

const Auth: React.FC = () => {

	if (getUser())
		window.location.href = '/rooms'

	return (
		<div className={css['pg-auth']}>
			<Sign />
		</div>
	)
}

export default Auth