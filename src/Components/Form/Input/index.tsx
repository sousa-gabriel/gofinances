import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

interface Props extends TextInputProps{
    active?: boolean; //criado para ser utilizado no teste
}

export function Input({active = false, ...rest}:Props){
    return(
        <Container 
            testID='input-test' 
            active={active} 
            {...rest} 
        />
    );
}