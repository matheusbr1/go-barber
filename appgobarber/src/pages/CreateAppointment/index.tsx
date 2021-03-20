import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'

import { 
  Container,  
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar
} from './styles'

interface RouteParams {
  providerId: string
}

const CreateAppointment: React.FC = () => {
  const route = useRoute()
  const { providerId } = route.params as RouteParams
  const [avatarMock] = useState('https://avatars.githubusercontent.com/u/28275815?v=4')
  const { goBack } = useNavigation()

  const navigateBack = useCallback(() => {
    goBack()
  },[goBack])

  return (
    <Container>
      <Header>
        <BackButton  onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>


        <UserAvatar source={{ uri: avatarMock }} />

      </Header>
    </Container>
  )
}

export default CreateAppointment