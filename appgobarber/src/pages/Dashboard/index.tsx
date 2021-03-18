import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react'
import { View, Button } from "react-native";

import { useAuth } from '../../hooks/auth'
import Profile from '../Profile';

import { 
  Container, 
  Header, 
  HeaderTitle, 
  UserName,
  ProfileButton,
  UserAvatar
} from './styles'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  const { navigate } = useNavigation()

  const navigateToProfile = useCallback(() => {
    navigate('profile')
  }, [navigate])

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem Vindo, {"\n"}
          <UserName>{ user.name }</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile} >
          <UserAvatar source={{ uri: 'https://avatars.githubusercontent.com/u/28275815?v=4' }} />
        </ProfileButton>
      </Header>
    </Container>
  )
}

export default Dashboard