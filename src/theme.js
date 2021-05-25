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
        background: '#151515'
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
        background: '#151515',
      }
    },
    RSFMenuIcon: {
      root: {
        '& .rsf-hamburger-inner, & .rsf-hamburger-inner:before, & .rsf-hamburger-inner:after': {
          background: 'white'
        }
      }
    },
    RSFImageSwitcher: {
      viewerOverlay: {
        background: '#151515'
      },
      activeThumbs: {
        background: '#151515'
      },
    },
    MuiTabs: {
      root: {
        overflow: 'visible',
      },
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
      label: {
        position: 'relative',
        top: -1,
        transition: 'color .2s ease-in-out',
        '&:hover': {
          color: 'rgba(102, 153, 204, 1)',
        },
        '&:active': {
          color: 'white',
        },
      },
      selected: {
        backgroundColor: 'rgba(102, 153, 204, .5)',
        '& $label': {
          color: 'white',
        },
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: '#151515',
      }
    },
    RSFAppBar: {
      withAmp: {
        zIndex: 1310
      }
    },
    MuiTypography: {
      h1: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
      },
      body1: {
        color: 'white',
      },
      body2: {
        color: 'white',
      },
      subtitle1: {
        color: 'white',
      }
    },
    MuiPrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: '#69c'
      }
    },
    MuiPrivateTabScrollButton: {
      root: {
        margin: '0 20px',
        width: 0,
        zIndex: 1,
      }
    },
    MuiIconButton: {
      root: {
        color: 'white'
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
    MuiCircularProgress: {
      colorSecondary: {
        color: '#69c'
      }
    },
    MuiModal: {
      root: {
        zIndex: 1311,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '1px solid rgba(128, 128, 128, .5)',
        paddingRight: 10,
      },
      head: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      body: {
        color: 'white',
        fontSize: 16,
      },
    },
    MuiTableRow: {
      root: {
        '&:last-child td': {
          borderBottom: 0,
        },
      },
    },
    MuiExpansionPanel: {
      root: {
        background: 'rgba(128, 128, 128, .2)',
      },
      expanded: {
        margin: 0,
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        background: 'rgba(128, 128, 128, .2)',
        marginTop: 1,
      },
      content: {
        margin: '20px 0',
      },
    },
    MuiExpansionPanelDetails: {
      root: {
        display: 'block',
      },
    },
  }
})

export default theme
