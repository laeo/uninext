import { Redirect, Route } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';

import HomePage from './pages/HomePage';

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path='/home' exact component={HomePage} />
          <Redirect exact from='/' to='/home' />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
