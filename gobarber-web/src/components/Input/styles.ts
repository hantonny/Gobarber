import styled, {css} from 'styled-components'

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
            background: #232129;
            border-radius: 10px;
            border: 2px solid #232129;
            padding: 16px;
            color: #666360;
            width: 100%;
            display: flex;
            align-items: center;
            & + div {
                margin-top: 8px;
            }
            ${(props) => props.isFocused && css`
                color: #FF9000;
                border-color: #FF9000;
            `}
            ${(props) => props.isFilled && css`
                color: #FF9000;
            `}
        input {
            flex: 1;
            border: 0;
            background: transparent;
            color: #F4EDE8;
            &::placeholder {
                color: #666360;
            }
        
        }
        svg {
            margin-right: 16px;
        }
`;