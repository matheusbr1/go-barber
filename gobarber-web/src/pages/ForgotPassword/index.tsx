import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import { Container, Content, Background, AnimationContainer } from './styles'
import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErros from '../../Utils/getValidationErros'

import { useToast } from '../../hooks/ToastContext'
import { Link, useHistory } from 'react-router-dom'

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const { addToast } = useToast()

    const history = useHistory()

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try {

            formRef.current?.setErrors({})

            const schema = yup.object().shape({
                email: yup.string()
                .required('E-mail obrigatório')
                .email('Digite um e-mail válido'),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            //  Recuperação de senha

            // history.push('/dashboard')

        } catch (err) {

            console.log(err)

            if (err instanceof yup.ValidationError) {
                const errors = getValidationErros(err)

                formRef.current?.setErrors(errors)

                return
            }

            addToast({
                type: 'error',
                title: 'Erro na recuperação de senha',
                description: 'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.'
            })

        }
    }, [addToast])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="goBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit} >
                        <h1>Recuperar senha</h1>

                        <Input name="email" placeholder="E-mail" icon={FiMail} />

                        <Button type="submit">Recuperar</Button>

                        <a href="forgot" >Esqueci minha senha</a>
                    </Form>

                    <Link to="/" >
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    )
}

export default ForgotPassword