import React from 'react'
import { FiUser, FiArrowLeft, FiMail, FiLock } from 'react-icons/fi'


import { Container, Content, Background } from './styles'
import logoImg from '../../assets/logo.svg'


import Input from '../../components/Input'
import Button from '../../components/Button'

const SignUp: React.FC = () => (
    <Container>
        <Background />
        <Content>
            <img src={logoImg} alt="goBarber" />

            <form>
                <h1>Faça seu Cadastro</h1>

                <Input name="name" placeholder="Nome" icon={FiUser} />
                <Input name="email" placeholder="E-mail" icon={FiMail} />
                <Input name="password" type="password" placeholder="Senha" icon={FiLock} />

                <Button type="submit">Cadastrar</Button>

            </form>

            <a href="" >
                <FiArrowLeft />
                Voltar para Logon
            </a>

        </Content>
    </Container>
)

export default SignUp