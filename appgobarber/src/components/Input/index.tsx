import React, { useEffect, useRef } from 'react'
import { Container, TextInput, Icon } from './styles'
import { useField } from '@unform/core'

import { TextInputProps } from 'react-native'

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
    
    const { registerField, defaultValue = '', fieldName, error }  = useField(name)
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue })
    
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value'
        })
    },[fieldName, registerField])

    return (
        <Container>
            <Icon name={icon} size={20} color='#666360' />
            <TextInput 
                keyboardAppearance='dark'
                placeholderTextColor='#666360' 
                onChangeText={value => {
                    inputValueRef.current.value = value
                }}
                {...rest }  
            />
        </Container>
    )
}

export default Input

