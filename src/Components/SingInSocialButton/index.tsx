import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { Button, Title, ImageContainer } from './styles';

interface Props extends RectButtonProps {
    title: string;
    svg: React.FC<SvgProps>;
}

export function SingInSocialButton({ title, svg:Svg, ...rest }: Props) {
    return (
        <Button {...rest} >
            <ImageContainer>
                <Svg />
            </ImageContainer>
            <Title>
                {title}
            </Title>
        </Button>
    );
}