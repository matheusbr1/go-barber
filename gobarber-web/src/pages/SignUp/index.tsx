import React, { useCallback, useRef } from 'react'
import { FiUser, FiArrowLeft, FiMail, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as yup from 'yup'
import getValidationErros from '../../Utils/getValidationErros'

import { Container, Content, Background } from './styles'
import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    console.log(formRef)

    const handleSubmit = useCallback(async (data: object) => {
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

        } catch (err) {
            console.log(err)

            const errors = getValidationErros(err)

            formRef.current?.setErrors(errors)
        }
    }, [])

    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="goBarber" />

                <Form ref={formRef} initialData={{ name: 'Matheus', }} onSubmit={handleSubmit} >
                    <h1>Faça seu Cadastro</h1>

                    <Input name="name" placeholder="Nome" icon={FiUser} />
                    <Input name="email" placeholder="E-mail" icon={FiMail} />
                    <Input name="password" type="password" placeholder="Senha" icon={FiLock} />

                    <Button type="submit">Cadastrar</Button>

                </Form>

                <a href="" >
                    <FiArrowLeft />
                    Voltar para Logon
                </a>

            </Content>
        </Container>
    )
}

export default SignUp