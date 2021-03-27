import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 80 : 40 }px;
    position: relative;
`

export const Title = styled.Text`
    font-size: 20px;
    color: 'rgb(244,237,232)';
    font-family: 'RobotoSlab-Medium';
    margin: 24px 0 24px; 
    text-align: left;
`;

export const BackButton = styled.TouchableOpacity`
    margin-top: 40px;
`

export const UserAvatarButton= styled.TouchableOpacity`
    margin-top: 32px;
`

export const UserAvatar= styled.Image`
    width: 166px;
    height: 166px;
    border-radius:  98px;
    align-self: center;
`