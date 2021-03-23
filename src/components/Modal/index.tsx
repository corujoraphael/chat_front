import React, { useEffect } from 'react'

import css from './styles.module.scss'

const Modal: React.FC<{children: any, closeModal: () => void}> = ({ children, closeModal }) => {

	useEffect( () => {
		let body = document.querySelector('body')
		if (body)
			body.style.overflow = 'hidden'

		return () => {
			let body = document.querySelector('body')
			if (body)
				body.style.overflow = 'auto'
		}
	}, [])

	return (
		<div className={css['cp-modal']}>
			<div className={css['cp-modal__background']}></div>
			<div className={css['cp-modal__content']}>
				<button 
					onClick={ closeModal }
					className={css['cp-modal__close']}
				>
					x
				</button>
				{ children }
			</div>
		</div>
	)
}

export default Modal