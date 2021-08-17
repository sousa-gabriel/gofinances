import React from 'react';
import {View, Text, TextInput} from 'react-native';

export function Profile(){
    return(
        <View>
            <Text>Perfil</Text>
            <TextInput
                placeholder='Nome: '
                autoCorrect={false} 
            />
            <TextInput
                placeholder='sobrenome'
            />
        </View>
    )
}