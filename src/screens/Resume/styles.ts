import styled from 'styled-components';
import {View, Text, ScrollView} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export const Container = styled(View)`
    background-color: ${({theme})=> theme.colors.background};
    flex: 1;
`;
export const  Header = styled(View)`
    background-color: ${({theme})=> theme.colors.primary};
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const  Title = styled(Text)`
    color: ${({theme})=> theme.colors.shape};
    font-family: ${({theme})=> theme.fonts.regular};
    font-size: ${RFValue(18)}px ;
`;

export const Content = styled(ScrollView)`
`;

export const ChartContainer = styled(View)`
    align-items: center;
`;

export const Moth = styled(Text)`
    font-family: ${({theme})=> theme.fonts.regular};
    font-size: ${RFValue(20)}px ;
`;
export const MothSelect = styled(View)`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
`;
export const MothSelectButton = styled(BorderlessButton)``;

export const MothSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px ;
`;

export const Loading = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;