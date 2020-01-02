import createTheme from 'react-storefront/createTheme'
import red from '@material-ui/core/colors/red'

const theme = createTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'monospace'
  },
  palette: {
    secondary: {
      main: red[700],
      light: red[600],
      dark: red[800],
      contrastText: '#fff'
    },
    price: {
      full: '#000',
      main: '#000',
      sale: '#900'
    }
  },
  spacing: {
    container: 15,
    row: 15
  },
  overrides: {
    RSFLoadMask: {
      fullscreen: {
        height: `calc(100vh - 181px)`
      }
    },
    RSFContainer: {
      root: {
        maxWidth: 960
      }
    },
    RSFLink: {
      root: {
        color: '#69c'
      }
    },
    RSFImage: {
      fill: {
        '& > img': {
          objectFit: 'cover'
        }
      }
    },
    MuiTypography: {
      h1: {
        fontSize: 24
      }
    },
    MuiPrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: '#69c'
      }
    }
  }
})

export default theme
