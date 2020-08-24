import React, {useRef} from 'react'
import { 
    Image,
    View, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform,
    TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import Input from '../../components/Input'
import Button from '../../components/Button'
import logoImg from '../../assets/logo.png'

import { 
    Container,
    Title, 
    BackToSignIn,
    BackToSignInText
} from './styles'

const SignUp: React.FC = () => {
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)

    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)

    return (
        <>
            <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding': undefined} 
                    style={{ flex:1 }}
                    enabled
                >
                <ScrollView 
                    contentContainerStyle={{ flex:1 }}
                    keyboardShouldPersistTaps='handled'
                >
                    <Container>
                        <Image source={logoImg} />
                        <View>
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form ref={formRef} onSubmit={(data) => console.log(data)} >
                            <Input 
                                name='name' 
                                autoCapitalize='words'
                                icon='user'
                                returnKeyType='next'
                                placeholder='Nome'
                                onSubmitEditing={() => {emailInputRef.current?.focus()}}
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
                                onSubmitEditing={() => {passwordInputRef.current?.focus()}}
                                />
                            <Input 
                                name='password' 
                                ref={passwordInputRef}
                                returnKeyType='send'
                                textContentType='newPassword'
                                secureTextEntry
                                icon='lock' 
                                placeholder='Senha'
                                onSubmitEditing= {() => formRef.current?.submitForm()}
                                />
                        </Form>
                        <Button onPress={() => formRef.current?.submitForm()} >Entrar</Button>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignIn onPress={() => navigation.goBack()} >
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackToSignInText>
                    Voltar para Logon
                </BackToSignInText>
            </BackToSignIn>
        </>
    )
} 

export default SignUp