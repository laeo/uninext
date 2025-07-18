import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css'
// import '@ionic/react/css/structure.css'
// import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css'
// import '@ionic/react/css/float-elements.css'
// import '@ionic/react/css/text-alignment.css'
// import '@ionic/react/css/text-transformation.css'
// import '@ionic/react/css/flex-utils.css'
// import '@ionic/react/css/display.css'

import './index.css'
import App from './App.tsx'
import { setupAuthStore } from './store/auth.ts'
import { setupRuntimeStore } from './store/runtime.ts'

Promise.all([setupAuthStore(), setupRuntimeStore()])
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
  .catch((reason) => {
    console.error(reason);
  })
