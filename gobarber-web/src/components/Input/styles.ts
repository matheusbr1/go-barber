import styled, { css } from 'styled-components'

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`

    background: #E8F0FE;
    border-radius: 10px;
    padding:16px;
    width: 100%;
    display: flex;
    align-items:center;

    border: 2px solid #666360;
    color: #666360;

    & + div {
        margin-top: 16px;
    }

    ${props => props.isFocused && css`
        color: #ff9000;
        border-color:#ff9000;
    `}

    ${props => props.isFilled && css`
        color: #ff9000;
    `}

    input {
        flex: 1;
        border: 0;
        background: transparent;
        color: #E8F0FE;

        &::placeholder {
            color: #666360;
        }
    }

    svg {
        margin-right: 16px;
    }

`