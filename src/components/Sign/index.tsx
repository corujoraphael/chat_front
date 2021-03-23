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

	const validate = {
		email: () => {
			let newErrors = {...errors}
			delete newErrors.email
			if (email == '' || !(/\S+@\S+\.\S+/g).test(email))
				newErrors.email = "Digite um email válido"
			setErrors(newErrors)

		},
		name: () => {
			let newErrors = {...errors}
			delete newErrors.name
			if (newUser && name == '')
				newErrors.name = "Digite um nome válido"
			setErrors(newErrors)
		},
		password: () => {
			let newErrors = {...errors}
			delete newErrors.password
			if (password == '')
				newErrors.password = "Digite uma senha válido"
		
			if (password.length < 5 || password.length >= 15 )
				newErrors.password = "Sua senha deve ter entre 6 e 15 digitos"
			setErrors(newErrors)
		},
	}

	const validateForm = () => {
		let error: ErroType = {}
		
		validate.email();
		validate.name();
		validate.password();
			
		setErrors(error)

		return Object.keys(error).length == 0
	}

	const handleLogin = () => {
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
				if (e.response.status === 422 && e.response.data.errCode ==='not_exists')
					return alert("Usuário ou senha incorretos!")
				alert("Ocorreu um erro. Tente novamente!")
			})
	}

	const handleSignup = () => {
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

	useEffect(() => {
		if (email != '')
	   		validateForm()
	}, [ email ]);

	useEffect(() => {
		if (password != '')
	   		validateForm()
	}, [ password ]);

	useEffect(() => {
		if (name != '')
	   		validateForm()
	}, [ name ]);

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
							className={`${css['cp-sign__input']}  ${errors.name ? css['error'] : ''}`}
							type="text" 
							placeholder="Nome" 
							value = { name }
							onChange={ changeName }
							onInput={ changeName }
						/>
						{errors.name && <p className={css['cp-sign__error']}> {errors.name} </p> }
					</div>
				}
				<input 
					className={`${css['cp-sign__input']}  ${errors.email ? css['error'] : ''}`}
					type="email" 
					placeholder="Email" 
					value = { email }
					onChange={ changeEmail }
					onInput={ changeEmail }
				/>
				{errors.email && <p className={css['cp-sign__error']}> {errors.email} </p> }
				<input
					className={`${css['cp-sign__input']} ${errors.password ? css['error'] : ''}`}
					type="password"
					placeholder="Senha"
					value={ password }
					onChange={ changePassword }
					onInput={ changePassword }
				/>
				{errors.password && <p className={css['cp-sign__error']}> {errors.password} </p> }

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