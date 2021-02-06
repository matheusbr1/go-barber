import React from 'react'
import { Container, Header, HeaderContent, Profile } from './styles'

import logoImg from '../../assets/logo.svg'
import { FiPower } from 'react-icons/fi'
import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {

  const { signOut, user } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber"/>
          <Profile>
            <img src="https://avatars.githubusercontent.com/u/28275815?s=460&u=07b68060e0c143581888029bef65ac1496406262&v=4" alt={user.name}/>
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
  
          <button type="button" onClick={signOut} >
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  ) 
} 

export default Dashboard