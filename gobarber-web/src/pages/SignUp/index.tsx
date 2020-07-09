import React from 'react'
import { FiUser, FiArrowLeft, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'

import { Container, Content, Background } from './styles'
import logoImg from '../../assets/logo.svg'


import Input from '../../components/Input'
import Button from '../../components/Button'

const SignUp: React.FC = () => {

    function handleSubmit(data: object): void {
        console.log(data)
    }

    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="goBarber" />

                <Form initialData={{ name: 'Matheus', }} onSubmit={handleSubmit} >
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