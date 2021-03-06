import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import { Container, Content, Background, AnimationContainer } from './styles'
import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErros from '../../Utils/getValidationErros'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import { Link, useHistory } from 'react-router-dom'

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const { signIn } = useAuth()

    const { addToast } = useToast()

    const history = useHistory()

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {

            formRef.current?.setErrors({})

            const schema = yup.object().shape({
                email: yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: yup.string().required('Senha obrigatória')
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            await signIn({
                email: data.email,
                password: data.password
            })

            history.push('/dashboard')

        } catch (err) {

            if (err instanceof yup.ValidationError) {
                const errors = getValidationErros(err)

                formRef.current?.setErrors(errors)

                return
            }

            addToast({
                type: 'error',
                title: 'Erro na autênticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
            })

        }
    }, [signIn, addToast, history])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="goBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit} >
                        <h1>Faça seu logon</h1>

                        <Input name="email" placeholder="E-mail" icon={FiMail} />
                        <Input name="password" type="password" placeholder="Senha" icon={FiLock} />

                        <Button type="submit">Entrar</Button>

                        <Link to="forgot-password" >Esqueci minha senha</Link>
                    </Form>

                    <Link to="signup" >
                        <FiLogIn />
                    Criar conta
                </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    )
}

export default SignIn