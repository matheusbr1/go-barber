import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
    width: 100%;
    height: 60px;
    background: rgb(255, 144, 0);
    border-radius: 10px;
    margin-top:8px;

    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: rgb(49, 46, 56);
    font-size: 18px;
`