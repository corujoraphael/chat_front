import React from 'react'

import css from './styles.module.scss'
import { logout } from '../../services/auth'

const Header: React.FC<{showBack?: boolean}> = ({ showBack = true }) => {
	
	const handleLogout = () => {
		logout()
		window.location.href = '/';
	}

	return (
		<div className={`${css['cp-header']}`}>
			<div className={`${css['cp-header__left']}`}>
				{showBack &&
					<a href="/rooms" className={css['cp-header__action']}> Voltar</a>
				}
			</div>
			<div className={`${css['cp-header__right']}`}>
				<button className={css['cp-header__action']} onClick={ handleLogout }>Sair</button>
			</div>

		</div>
	)
}

export default Header