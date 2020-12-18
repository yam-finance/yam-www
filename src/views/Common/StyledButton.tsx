
import React from 'react';
import {
    Button,
} from 'react-neu'
import { ButtonProps } from 'react-neu/dist/components/Button';
import styled from 'styled-components'


const StyledPrimaryButton = ({ full, onClick, text, variant, size, disabled }: ButtonProps) =>
    <StyledButtonContainer>
        <Button
            full={full}
            onClick={onClick}
            text={text}
            variant={variant}
            size={size}
            disabled={disabled}
        />
    </StyledButtonContainer>



const StyledButtonContainer = styled.div`
    width: 100%;
    button {
        background: #00AC69 !important;
        border-radius: 5px;
        color: #1C2129 !important;

        > span {
            color: #ffffff !important;
        }
    }
`

export default StyledPrimaryButton;