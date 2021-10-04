import styled, { css } from "styled-components";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
interface Props {
    active: boolean
}

export const Container = styled(TextInput) <Props>`
    width: 100%;
    padding: 16px 18px;
    border-radius: 5px;
    margin-bottom: 8px;
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.textDark};
    font-family: ${({ theme }) => theme.fonts.regular} ;
    background-color: ${({ theme }) => theme.colors.shape};
    
    ${({active})=> active && css`
        border-width: 3px;
        border-color: ${({ theme }) => theme.colors.attention};
    `}
`;