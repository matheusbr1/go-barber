import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Platform } from 'react-native'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 80 : 40 }px;
`

export const Title = styled.Text`
    font-size: 24px;
    color: 'rgb(244,237,232)';
    font-family: 'RobotoSlab-Medium';
    margin: 64px 0 24px; 
`;

export const BackToSignIn = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgb(49, 46, 56);
    border-top-width: 1px;
    border-color: rgb(35, 33, 41);
    padding:16px 0${16 + getBottomSpace()}px;

    justify-content:center;
    align-items: center;
    flex-direction: row;
`

export const BackToSignInText = styled.Text`
    color:rgb(255, 255, 255);
    font-size:18px;
    font-family: 'RobotoSlab-Regular';
    margin-left:16px
`