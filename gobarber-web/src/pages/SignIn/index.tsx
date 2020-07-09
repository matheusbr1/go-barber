import React from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'


import { Container, Content, Background } from './styles'
import logoImg from '../../assets/logo.svg'


import Input from '../../components/Input'
import Button from '../../components/Button'

const SignIn: React.FC = () => {

    function handleSubmit() {
        console.log('test')
    }

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="goBarber" />

                <Form onSubmit={handleSubmit} >
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