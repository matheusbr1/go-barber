import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import { Container, Content, Background } from './styles'
import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErros from '../../Utils/getValidationErros'

import { useAuth } from '../../hooks/AuthContext'

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const { signIn } = useAuth()

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

            signIn({
                email: data.email,
                password: data.password
            })

        } catch (err) {
            console.log(err)

            const errors = getValidationErros(err)

            formRef.current?.setErrors(errors)
        }
    }, [signIn])

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="goBarber" />

                <Form ref={formRef} onSubmit={handleSubmit} >
                    <h1>Faça seu logon</h1>

                    <Input name="email" placeholder="E-mail" icon={FiMail} />
                    <Input name="password" type="password" placeholder="Senha" icon={FiLock} />

                    <Button type="submit">Entrar</Button>

                    <a href="forgot" >Esqueci minha senha</a>
                </Form>

                <a href="" >
                    <FiLogIn />
                    Criar conta
                </a>

            </Content>
            <Background />
        </Container>
    )
}

export default SignIn