import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';

export default createMuiTheme({
    palette: {
        primary: {
            main: `${colors.dark_background}`
        },
        secondary: {
            main: `${colors.title_font}`
        },
        background: {
            default: `${colors.lighter_background}`
        }
    }
})