import React from 'react';
import { BrowserRouter as  Switch, Route,  BrowserRouter,Redirect } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DrawerMenu from './Componentes/inicio/inicio';

function App() {
  const [prefersDarkMode] = React.useState(true);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <BrowserRouter>
          <Route path='/' exact>
              <Redirect to="/Inicio" />
          </Route>
          <Route path='/ListaReportes' exact>
              <Redirect to="/Inicio" />
          </Route>
          <Route path='/Formulario' exact>
              <Redirect to="/Inicioform" />
          </Route>
          <Route path='/Inicio' exact component={DrawerMenu} />
          <Route path='/Inicioform' exact component={DrawerMenu} />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}


export default App;