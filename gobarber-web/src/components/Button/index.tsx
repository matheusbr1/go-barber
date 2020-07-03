import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'
import { type } from 'os'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
    <Container type="button" {...rest} >
        {children}
    </Container>
)

export default Button