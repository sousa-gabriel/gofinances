import styled,{css} from "styled-components";
import { Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

interface IconProps {
    type: 'up'|'down'
}
interface ContainerProps{
    isActive: boolean,
    type: 'up'|'down'
}

export const Container = styled(RectButton)<ContainerProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    border-width: ${({isActive})=>isActive ? 0 : 1.5}px;
    border-style: solid;
    border-color: ${({theme})=>theme.colors.text};

    border-radius: 5px;
    padding: 16px;
    

    ${({isActive, type})=> isActive && type === 'up' && css`
        background-color:${({theme})=>theme.colors.sucessLigth};
    `}

    ${({isActive, type})=> isActive && type === 'down' && css`
        background-color:${({theme})=>theme.colors.attentionLigth};
    `}
`;

export const Title = styled(Text)`
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(14)}px;
    margin-right: 12px;
    color: ${({theme, type})=> type === 'up' ? theme.colors.sucess : theme.colors.attention}
`;