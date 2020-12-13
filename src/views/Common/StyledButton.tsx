
import React from 'react';
import {
    Button,
} from 'react-neu'
import { ButtonProps } from 'react-neu/dist/components/Button';
import styled from 'styled-components'


const StyledPrimaryButton = ({ full, onClick, text, variant, size }: ButtonProps) =>
    <StyledButtonContainer>
        <Button
            full={full}
            onClick={onClick}
            text={text}
            variant={variant}
            size={size}
        />
    </StyledButtonContainer>



const StyledButtonContainer = styled.div`

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