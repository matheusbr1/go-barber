import styled,{ css } from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

interface ContainerProps {
    isFocused: Boolean
}

export const Container = styled.View<ContainerProps>`
    width:100%;
    height: 60px;
    padding: 0 16px;
    background: rgb(35, 33, 41);
    border-radius: 10px;
    margin-bottom: 8px;
    border-width: 2px;
    border-color: #232129;

    flex-direction: row;
    align-items: center;

    ${props => props.isFocused && css`
        border-color: #ff9000
    `}
`

export const TextInput = styled.TextInput`
    flex: 1;
    color: rgb(255, 255, 255);
    font-size:16px;
    font-family: 'RobotoSlab-Regular';
`

export const Icon = styled(FeatherIcon)`
    margin-right:16px
`