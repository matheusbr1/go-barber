import React, { useCallback, useRef } from 'react'
import { FiUser, FiArrowLeft, FiMail, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErros from '../../Utils/getValidationErros'
import api from '../../services/api'
import { Container, Content, Background, AnimationContainer } from './styles'
import logoImg from '../../assets/logo.svg'
import { useToast } from '../../hooks/toast'

interface SignUpFormData {
    name: string
    email: string
    password: string
}

const SignUp: React.FC = () => {

    const history = useHistory()

    const { addToast } = useToast()

    const formRef = useRef<FormHandles>(null)

    console.log(formRef)

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {

            formRef.current?.setErrors({})

            const schema = yup.object().shape({
                name: yup.string().required('Nome obrigatório'),
                email: yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: yup.string().min(6, 'No mínimo 6 dígitos')
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            await api.post('/users', data)

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu Logon no Gobarber'
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
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer Cadastro, tente novamente.'
            })
        }
    }, [addToast, history])

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="goBarber" />

                    <Form ref={formRef} initialData={{ name: 'Matheus', }} onSubmit={handleSubmit} >
                        <h1>Faça seu Cadastro</h1>

                        <Input name="name" placeholder="Nome" icon={FiUser} />
                        <Input name="email" placeholder="E-mail" icon={FiMail} />
                        <Input name="password" type="password" placeholder="Senha" icon={FiLock} />

                        <Button type="submit">Cadastrar</Button>

                    </Form>

                    <Link to="/" >
                        <FiArrowLeft />
                    Voltar para Logon
                </Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
}

export default SignUp