import React, { useState, useEffect } from 'react'
import css from './styles.module.scss'
import { login, createAccount } from '../../http/auth'
import { login as serviceLogin} from '../../services/auth'
import SHA256 from "crypto-js/sha256";

const Sign: React.FC = () => {

	const [ email, setEmail ] = useState<string>('')
	const [ password, setPassword ] = useState<string>('')
	const [ name, setName ] = useState<string>('')
	const [ newUser, setNewUser ] = useState<boolean>(false)
	const [ sended, setSended ] = useState<boolean>(false)
	const [ errors, setErrors ] = useState<{email?: string, name?: string, password?: string}>({})

	const changeEmail = (e: React.FormEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value)
	}

	const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value)
	}

	const changeName = (e: React.FormEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value)
	}

	interface ErroType {
		email?: string
		name?: string
		password?: string
	}

	useEffect( () => {
		let error: string | null = null
		if (email === '' || !(/\S+@\S+\.\S+/g).test(email))
			error = "Digite um email válido"
		
		setErrors( state => {
			if (error)
				return {...state, email: error}
			delete state.email
			return state
		})
	}, [ email ])

	useEffect( () => {
		if (newUser){
			let error: string | null = null
			if (newUser && name === '')
				error = "Digite um nome válido"
			setErrors( state => {
				if (error)
					return {...state, name: error}
				delete state.name
				return state
			})
		}
	}, [ newUser, name ])	

	useEffect( () => {
		let error: string | null = null
		if (password === '')
			error = "Digite uma senha válido"
	
		if (password.length < 5 || password.length >= 15 )
			error = "Sua senha deve ter entre 6 e 15 digitos"
		
		setErrors( state => {
			if (error)
				return {...state, password: error}
			delete state.password
			return state
		})

	}, [password])

	const validateForm = () => Object.keys(errors).length === 0

	const handleLogin = () => {
		setSended(true)
		if (validateForm())
			login({
				email,
				password: SHA256(password).toString()
			}).then( res => {
				if(res.data && res.data.auth){
					serviceLogin(res.data.token, res.data.user)
					window.location.href = '/rooms'
				}
			}).catch( e => {
				if (e.response.status === 422 && e.response.data.errCode === 'not_exists')
					return alert("Usuário ou senha incorretos!")
				alert("Ocorreu um erro. Tente novamente!")
			})
	}

	const handleSignup = () => {
		setSended(true)
		if (validateForm())
			createAccount({
				email,
				password: SHA256(password).toString(),
				name
			})
			.then( res => {
				if(res.data && res.data.auth){
					serviceLogin(res.data.token, res.data.user)
					window.location.href = '/rooms'
				}
			}).catch( e => {
				if (e.response.status === 422 && e.response.data.error.name === "SequelizeUniqueConstraintError")
					alert("Já existe um usuário com este email. Tente outro!")
			})

	}

	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault()
		if (newUser)
			return handleSignup()
		handleLogin()
	}


	return (
		<div className={css['cp-sign']}>
			<div className={css['cp-sign__tabs']}>
				<div className={`${css['cp-sign__tab']} ${ !newUser ? css['active'] : ''}`} onClick={ () => setNewUser(false) }>
					Entrar
				</div>
				<div className={`${css['cp-sign__tab']} ${ newUser ? css['active'] : ''}`} onClick={ () => setNewUser(true) }>
					Cadastrar
				</div>
			</div>
			<form>
				<h1 className={css['cp-sign__title']}> Faça seu { newUser ? 'cadastro' : 'login' } </h1>
				{ newUser && 
					<div>
						<input 
							className={`${css['cp-sign__input']}  ${sended &&errors.name ? css['error'] : ''}`}
							type="text" 
							placeholder="Nome" 
							value = { name }
							onChange={ changeName }
							onInput={ changeName }
						/>
						{sended && errors.name && <p className={css['cp-sign__error']}> {errors.name} </p> }
					</div>
				}
				<input 
					className={`${css['cp-sign__input']}  ${sended &&errors.email ? css['error'] : ''}`}
					type="email" 
					placeholder="Email" 
					value = { email }
					onChange={ changeEmail }
					onInput={ changeEmail }
				/>
				{sended && errors.email && <p className={css['cp-sign__error']}> {errors.email} </p> }
				<input
					className={`${css['cp-sign__input']} ${sended &&errors.password ? css['error'] : ''}`}
					type="password"
					placeholder="Senha"
					value={ password }
					onChange={ changePassword }
					onInput={ changePassword }
				/>
				{sended && errors.password && <p className={css['cp-sign__error']}> {errors.password} </p> }

				<button 
					className={css['cp-sign__action']}
					type="submit"
					onClick={ handleSubmit }
				>
					{newUser ? 'Cadastrar' : 'Acessar'}
				</button>
			</form>
		</div>
	)
}

export default Sign