import { Redirect, Route } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path='/home' exact component={HomePage} />
          <Route path='/auth/login' exact component={LoginPage} />
          <Route path='/auth/register' exact component={RegisterPage} />
          <Redirect exact from='/' to='/home' />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
