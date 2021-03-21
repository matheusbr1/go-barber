import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import api from '../../services/api'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'react-native'

import { 
  Container,  
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText
} from './styles'

interface RouteParams {
  providerId: string
}

export interface Provider {
  id: string
  name: string
  avatar_url: string
}

interface AvailabilityItem {
  hour: number
  available: boolean
}

const CreateAppointment: React.FC = () => {
  const route = useRoute()
  const routeParams = route.params as RouteParams
  const [avatarMock] = useState('https://avatars.githubusercontent.com/u/28275815?v=4')
  const { goBack } = useNavigation()

  const [providers, setProviders] = useState<Provider[]>([])

  const [showDatePicker, setShowDatePicker] = useState(false)

  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId)

  const [selectedDate, setSelectedDate] = useState(new Date())

  const [availability, setAvailability] = useState<AvailabilityItem[]>([])

  const navigateBack = useCallback(() => {
    goBack()
  },[goBack])

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  },[])

  useEffect(() => {
    api.get(`providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear,
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    }).then(response  => {
      setAvailability(response.data)
    })
  }, [selectedDate, selectedProvider])

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId)
  },[])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state)
  }, [])

  const handleDateChanged = useCallback((event: any, date: Date | undefined) => {
    if(Platform.OS === 'android') {
      setShowDatePicker(false)
    }

    if(date) {
      setSelectedDate(date)  
    }
  }, [])

  return (
    <Container>
      <Header>
        <BackButton  onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: avatarMock }} />

      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem ={({ item: provider }) => (
            <ProviderContainer 
              onPress={() => handleSelectProvider(provider.id)} 
              selected={provider.id === selectedProvider} 
            >
              <ProviderAvatar source={{ uri: avatarMock }} />
              <ProviderName selected={provider.id === selectedProvider} > 
              { provider.name }   
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
              Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>
        
        {showDatePicker && (
          <DateTimePicker 
            mode="date"
            onChange={handleDateChanged}
            is24Hour
            value={selectedDate}
            display="calendar"
          />
        )}
      </Calendar>

    </Container>
  )
}

export default CreateAppointment