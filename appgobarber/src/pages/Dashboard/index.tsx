import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useEffect, useState } from 'react'

import Icon from 'react-native-vector-icons/Feather'

import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import Profile from '../Profile'

import { 
  Container, 
  Header, 
  HeaderTitle, 
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle
} from './styles'

export interface Provider {
  id: string
  name: string
  avatar_url: string
}

const Dashboard: React.FC = () => {
  const [avatarMock] = useState('https://avatars.githubusercontent.com/u/28275815?v=4')

  const { user, signOut } = useAuth()

  const [providers, setProviders] = useState<Provider[]>([])

  const { navigate } = useNavigation()

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  },[])

  const navigateToProfile = useCallback(() => {
    // navigate('profile')

    signOut()
  }, [navigate])

  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('createAppointment', { providerId })
  },[navigate])

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem Vindo, {"\n"}
          <UserName>{ user.name }</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile} >
          <UserAvatar source={{ uri: avatarMock }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers} 
        ListHeaderComponent={() => (
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        )}
        keyExtractor={(provider) => provider?.id}
        renderItem={({ item: provider }) => (
          <ProviderContainer onPress={() => navigateToCreateAppointment(provider.id)}>
            <ProviderAvatar source={{ uri: avatarMock }} />

            <ProviderInfo>
              <ProviderName> { provider.name } </ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />

    </Container>
  )
}

export default Dashboard