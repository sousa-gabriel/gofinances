//usado para sobreescrever o thema do styled componentes
import 'styled-components';
import theme from './theme';

declare module 'styled-components'{
    type ThemeType = typeof theme

    export interface DefaultTheme extends ThemeType{}
}