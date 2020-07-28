import React from 'react';
import GlobalStyle from './styles/global'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './routes'

import AppProvider from './hooks'

const App: React.FC = () => (
  <>
    <AppProvider>
      <Router>
        <Routes />
      </Router>
    </AppProvider>
    <GlobalStyle />
  </>
)

export default App;
