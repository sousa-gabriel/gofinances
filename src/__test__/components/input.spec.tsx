import React from 'react';
import { render } from '@testing-library/react-native';
import { Input } from '../../Components/Form/Input';
import { ThemeProvider } from 'styled-components';
import Theme from '../../global/styles/theme';

const Providers : React.FC = ({children}) =>(
    <ThemeProvider theme={Theme}>
        {children}
    </ThemeProvider>
);

describe('Input Component', () => {
    test('must have specific border when active', () => {
        const { getByTestId } = render(
            <Input
                testID="input-test"
                placeholder="E-mail"
                autoCorrect={false}
                active={true}
            />,
            {
                wrapper: Providers
            }
        )
        
        const inputComponent = getByTestId('input-test');
        console.log(inputComponent.props)

        expect(inputComponent.props.style[0].borderColor)
        .toEqual('#E83F5B')
    })
})