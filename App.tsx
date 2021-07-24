import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'react-native';
import { Routes } from './src/Routes';
import theme from './src/global/styles/theme';
import { ThemeProvider } from 'styled-components';
import { AuthProvider, useAuth } from './src/hooks/Auth';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const {userStorageLoading} = useAuth();

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
        <StatusBar barStyle='light-content'/>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
     </ThemeProvider>
  )
}
