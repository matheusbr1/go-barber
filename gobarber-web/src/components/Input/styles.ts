import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip/index'

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
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

    ${props => props.isErrored && css`
        border-color: #c53030;
    `}

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
        color: #666360;

        &::placeholder {
            color: #666360;
        }
    }

    svg {
        margin-right: 16px;
    }
`

export const Error = styled(Tooltip)`
    height:20px;
    margin-left: 16px;

    svg {
        margin: 0
    }

    span {
        background: #c53030;
        color: #fff;

        &::before {
            border-color: #c53030 transparent
        }
    }
`