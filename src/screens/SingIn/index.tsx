import React from 'react';
import AppleSVG from '../../Assets/apple.svg';
import GoogleSVG from '../../Assets/google.svg';
import LogoSVG from '../../Assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert } from 'react-native';

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

export function SingIn() {
    const {signInWithGoogle, signInWithApple } = useAuth()

    async function handlesingInWithGoogle(){
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possivel conectar-se a sua conta Google')
        }
    }
    
    async function handlesigInWithApple(){
        try {
            await signInWithApple();
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possivel conectar-se a sua conta Apple')
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
                    <SingInSocialButton
                        title='Entrar com Apple'
                        svg={AppleSVG}
                        onPress={handlesigInWithApple}
                    />
                </FooterWrapper>
            </Footer>

        </Container>
    );
}