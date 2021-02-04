import React, { useCallback, useRef } from 'react'
import { FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import { Container, Content, Background, AnimationContainer } from './styles'
import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErros from '../../Utils/getValidationErros'

import { useToast } from '../../hooks/ToastContext'
import { useHistory, useLocation } from 'react-router-dom'
import api from '../../services/api'

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const { addToast } = useToast()

    const history = useHistory()
    const location = useLocation()

    const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
        try {

            formRef.current?.setErrors({})

            const schema = yup.object().shape({
                password: yup.string()
                .required('Senha obrigatória'),
                password_confirmation: yup.string()
                .oneOf(
                  [yup.ref('password'), undefined], 
                  'Confirmação incorreta'
                )
                .required('Senha obrigatória'),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            const { password, password_confirmation } = data 
            const token = location.search.replace('?token=', '')

            if (!token) {
              throw new Error()
            }

            await api.post('/password/reset', {
              password,
              password_confirmation
            })

            history.push('/')

        } catch (err) {

            console.log(err)

            if (err instanceof yup.ValidationError) {
                const errors = getValidationErros(err)

                formRef.current?.setErrors(errors)

                return
            }

            addToast({
                type: 'error',
                title: 'Erro ao resetar senha',
                description: 'Ocorreu um erro ao resetar sua senha, tente novamente.'
            })

        }
    }, [addToast, history, location.search])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="goBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit} >
                        <h1>Resetar senha</h1>

                        <Input 
                            name="password" 
                            type="password" 
                            placeholder="Nova senha" 
                            icon={FiLock} 
                        />

                        <Input 
                            name="password_confirmation" 
                            type="password" 
                            placeholder="Confirmação da senha" 
                            icon={FiLock} 
                        />

                        <Button type="submit">Alterar senha</Button>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    )
}

export default SignIn