import React from 'react';
import {View, Text, TextInput} from 'react-native';

export function Profile(){
    return(
        <View>
            <Text testID='text-title'>
                Perfil
            </Text>
            <TextInput
                testID='input-name'
                placeholder='Nome'
                autoCorrect={false} 
                value='Gabriel'
            />
            <TextInput
                testID='input-surname'
                placeholder='sobrenome'
                value='Rocha'
            />
        </View>
    )
}