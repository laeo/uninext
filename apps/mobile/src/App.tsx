import { Redirect, Route } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { authStore } from './store/auth';
import { useSnapshot } from 'valtio';
import { useEffect } from 'react';
import { SplashScreen } from '@capacitor/splash-screen';

setupIonicReact();

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const snap = useSnapshot(authStore);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path='/home' exact render={() => {
            console.log(`isLoggedIn: ${snap.isLoggedIn}`);
            return snap.isLoggedIn ? <HomePage /> : <Redirect to='/auth/login' />
          }} />
          <Route path='/auth/login' exact component={LoginPage} />
          <Route path='/auth/register' exact component={RegisterPage} />
          <Redirect exact from='/' to='/home' />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
