import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

interface Props extends TextInputProps{}

export function Input({...rest}:Props){
    return(
        <Container {...rest}/>
    );
}