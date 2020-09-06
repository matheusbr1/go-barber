import React, { useRef, useCallback } from 'react'
import { 
    Image,
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

import getValidationErros from '../../utils/getValidationErros'

import Input from '../../components/Input'
import Button from '../../components/Button'
import logoImg from '../../assets/logo.png'

import { 
    Container,
    Title, 
    BackToSignIn,
    BackToSignInText
} from './styles'

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)

    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)

    const handleSignUp = useCallback(async (data: SignUpFormData) => {

        try {
        formRef.current?.setErrors({})
        const schema = yup.object().shape({
            name: yup.string().required('Nome obrigatório'),
            email: yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            password: yup.string().min(6, 'No mínimo 6 dígitos')
        })
        await schema.validate(data, {
            abortEarly: false,
        })
        
        // await api.post('/users', data)
        
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const errors = getValidationErros(err)
                console.log(errors)
                formRef.current?.setErrors(errors)
                return
            }
            Alert.alert(
                'Erro no cadastro',
                'Ocorreu um erro ao fazer cadastro'
            )
        }
        }, [])

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
                        <Form ref={formRef} onSubmit={handleSignUp} >
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