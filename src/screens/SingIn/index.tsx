import React from 'react';
import AppleSVG from '../../Assets/apple.svg';
import GoogleSVG from '../../Assets/google.svg';
import LogoSVG from '../../Assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { ActivityIndicator, Alert, Platform } from 'react-native';

import { SingInSocialButton } from '../../Components/SingInSocialButton';
import { useAuth } from '../../hooks/Auth';
import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SingInTitle,
    Footer,
    FooterWrapper,
} from './styles';
import { useState } from 'react';
import theme from '../../global/styles/theme';

export function SingIn() {
    const [isLoading, setIsLoading] = useState(false);
    const {signInWithGoogle, signInWithApple } = useAuth()

    async function handlesingInWithGoogle(){
        try {
            setIsLoading(true);
            return await signInWithGoogle();
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possivel conectar-se a sua conta Google')
            setIsLoading(false);
        }
    }
    
    async function handlesigInWithApple(){
        try {
            setIsLoading(true);
            return await signInWithApple();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possivel conectar-se a sua conta Apple');
            setIsLoading(false);
        }
    }
    return (
        <Container >
            <Header>
                <TitleWrapper>
                    <LogoSVG
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SingInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SingInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SingInSocialButton
                        title='Entrar com o Google'
                        svg={GoogleSVG}
                        onPress={handlesingInWithGoogle}
                    />
                    { 
                        Platform.OS === 'ios' &&
                        <SingInSocialButton
                            title='Entrar com Apple'
                            svg={AppleSVG}
                            onPress={handlesigInWithApple}
                        />
                    }
                    
                </FooterWrapper>
                {
                    isLoading && <ActivityIndicator size='large' color={theme.colors.shape}/>
                }
            </Footer>
        </Container>
    );
}