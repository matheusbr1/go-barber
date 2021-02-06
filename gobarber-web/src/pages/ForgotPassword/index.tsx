import React, { useCallback, useRef, useState } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import { Container, Content, Background, AnimationContainer } from './styles'
import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErros from '../../Utils/getValidationErros'

import { useToast } from '../../hooks/toast'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {

    const [loading, setLoading] = useState(false)
    const formRef = useRef<FormHandles>(null)

    const { addToast } = useToast()

    const history = useHistory()

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try {

            setLoading(true)

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
            await api.post('/password/forgot', {
              email: data.email
            })

            addToast({
              type: 'success',
              title: 'E-mail de recuperação enviado',
              description: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
            })

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

        } finally {
          setLoading(false)
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

                        <Button type="submit" loading={Number(loading)} >Recuperar</Button>

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