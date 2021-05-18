import createTheme from 'react-storefront/createTheme'
import red from '@material-ui/core/colors/red'

const theme = createTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'ff-meta-web-pro',
    fontSize: 16
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
      root: {
        '@media (prefers-color-scheme: dark)': {
          background: '#222'
        },
      },
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
    RSFAmpMenu: {
      root: {
        '@media (prefers-color-scheme: dark)': {
          background: '#222',
        },
      }
    },
    RSFMenuIcon: {
      root: {
        '& .rsf-hamburger-inner, & .rsf-hamburger-inner:before, & .rsf-hamburger-inner:after': {
          '@media (prefers-color-scheme: dark)': {
            background: 'white'
          },
        }
      }
    },
    RSFImageSwitcher: {
      viewerOverlay: {
        '@media (prefers-color-scheme: dark)': {
          background: '#222'
        },
      },
      activeThumbs: {
        background: 'rgba(255, 255, 255, .85)',
        '@media (prefers-color-scheme: dark)': {
          background: '#222'
        },
      }
    },
    MuiTabs: {
      scroller: {
        marginBottom: '0 !important',
      }
    },
    RSFNavTabs: {
      root: {
        '&:before, &:after': {
          background: 'none'
        }
      }
    },
    RSFNavTab: {
      root: {
        opacity: 1
      },
      selected: {
        backgroundColor: 'rgba(102, 153, 204, .3)'
      }
    },
    MuiPaper: {
      root: {
        '@media (prefers-color-scheme: dark)': {
          background: '#222',
          color: 'white'
        },
      }
    },
    RSFAppBar: {
      withAmp: {
        zIndex: 1310
      }
    },
    MuiTypography: {
      h1: {
        fontSize: 24,
        fontWeight: 'bold',
        '@media (prefers-color-scheme: dark)': {
          color: 'white',
        },
      },
      body1: {
        '@media (prefers-color-scheme: dark)': {
          color: 'white',
        },
      },
      body2: {
        '@media (prefers-color-scheme: dark)': {
          color: 'white',
        },
      },
      subtitle1: {
        '@media (prefers-color-scheme: dark)': {
          color: 'white',
        },
      }
    },
    MuiPrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: '#69c'
      }
    },
    MuiPrivateTabScrollButton: {
      root: {
        width: 0
      }
    },
    MuiIconButton: {
      root: {
        '@media (prefers-color-scheme: dark)': {
          color: 'white'
        },
      }
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: '#69c',
        }
      }
    },
    MuiListItemText: {
      root: {
        '&:first-child': {
          paddingLeft: 15
        }
      },
      primary: {
        fontWeight: 'bold',
      },
    },
    RSFTabsRow: {
      tab: {
        fontWeight: 'bold',
        textTransform: 'none'
      },
      indicator: {
        height: 0
      }
    },
  }
})

export default theme
