import React, { useState, useRef, useCallback, useEffect } from 'react'
import { 
    View, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform,
    TextInput,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'
import api from '../../services/api'

import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useAuth } from '../../hooks/auth'

import { 
  Container,
  BackButton,
  UserAvatarButton,
  UserAvatar,
  Title, 
} from './styles'

interface ProfileFormData {
  name: string
  email: string
  password: string
  old_password: string
  password_confirmation: string
}

const Profile: React.FC = () => {
    const navigation = useNavigation()

    const [avatarMock] = useState('https://avatars.githubusercontent.com/u/28275815?v=4')

    const { user, updateUser } = useAuth()
    
    const formRef = useRef<FormHandles>(null)

    useEffect(() => {
      console.log(user)
    }, [user])

    const emailInputRef = useRef<TextInput>(null)
    const oldPasswordInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)
    const confirmPasswordInputRef = useRef<TextInput>(null)

    const handleSignUp = useCallback(async (data: ProfileFormData) => {
        try {

        formRef.current?.setErrors({})

        const schema = yup.object().shape({
          name: yup.string()
            .required('Nome obrigatório'),

          email: yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          
          old_password: yup.string(),

          password: yup.string().when('old_password', {
            is: val => !!val.length,
            then: yup.string().required('Campo obrigatório'),
            otherwise: yup.string()
          }),

          password_confirmation: yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: yup.string().required('Campo obrigatório'),
              otherwise: yup.string()
            })
            .oneOf(
              [yup.ref('password'), undefined], 
              'Confirmação incorreta'
            )
        })

        await schema.validate(data, {
            abortEarly: false,
        })

        const { name, email, old_password, password, password_confirmation } = data

        const formData = Object.assign({
          name,
          email
        }, data.old_password ? {
          old_password,
          password,
          password_confirmation 
        } : {})
        
        const response = await api.put('/profile', formData)

        updateUser(response.data)

        Alert.alert('Perfil atualizado com sucesso!')

        navigation.goBack()
        
        } catch (err) {
            if (err instanceof yup.ValidationError) {
              const errors = getValidationErrors(err)
              console.log(errors)
              formRef.current?.setErrors(errors)
              return
            }
            Alert.alert(
              'Erro na atualização do perfil',
              'Ocorreu um erro ao atualizar seu perfil, teste novamente'
            )
        }
        }, [navigation])

    const handleGoBack = useCallback(() => {
      navigation.goBack()
    }, [navigation])

    return (
      <React.Fragment>
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding': undefined} 
            style={{ flex:1 }}
            enabled
          >
            <ScrollView  contentContainerStyle={{ flex:1 }} keyboardShouldPersistTaps='handled'>
              <Container>

                <BackButton onPress={handleGoBack} >
                  <Icon name='chevron-left' size={24} color='#999591' />
                </BackButton>

                <UserAvatarButton onPress={() => {}} >
                  <UserAvatar source={{ uri: avatarMock }} />
                </UserAvatarButton>

                <View>
                  <Title>Meu perfil</Title>
                </View>
                
                <Form initialData={user} ref={formRef} onSubmit={handleSignUp} >
                  <Input 
                    name='name' 
                    autoCapitalize='words'
                    icon='user'
                    returnKeyType='next'
                    placeholder='Nome'
                    onSubmitEditing={() => emailInputRef.current?.focus()}
                  />
                  <Input 
                    name='email' 
                    ref={emailInputRef}
                    keyboardType='email-address'
                    autoCorrect={false}
                    autoCapitalize='none'
                    icon='mail' 
                    returnKeyType='next'
                    placeholder='E-mail'
                    onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
                  />
                  <Input 
                    name='old_password' 
                    ref={oldPasswordInputRef}
                    returnKeyType='next'
                    secureTextEntry
                    icon='lock' 
                    placeholder='Senha atual'
                    containerStyle={{ marginTop: 16 }}
                    onSubmitEditing= {() => passwordInputRef.current?.focus()}
                  />
                  <Input 
                    name='password' 
                    ref={passwordInputRef}
                    returnKeyType='next'
                    secureTextEntry
                    icon='lock' 
                    placeholder='Nova Senha'
                    onSubmitEditing= {() => confirmPasswordInputRef.current?.focus()}
                  />
                  <Input 
                    name='password' 
                    ref={confirmPasswordInputRef}
                    returnKeyType='send'
                    secureTextEntry
                    icon='lock' 
                    placeholder='Confirmar Senha'
                    onSubmitEditing= {() => formRef.current?.submitForm()}
                  />
                </Form>
                <Button onPress={() => formRef.current?.submitForm()} >Confirmar mudanças</Button>
              </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </React.Fragment>
    )
} 

export default Profile