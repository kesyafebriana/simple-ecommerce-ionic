import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonToggle, IonMenu, IonHeader, IonToolbar, IonTitle, IonList, IonMenuToggle, IonButton, IonIcon, IonItem, IonContent, IonLabel, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import History from './pages/History';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import HistoryDetail from './pages/HistoryDetail';
import HighlightContextProvider from './data/HighlightContextProvider';
import ProductContextProvider from './data/ProductContextProvider';
import HistoryContextProvider from './data/HistoryContextProvider';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark',!isDarkMode);
    if(!isDarkMode){
      localStorage.setItem('darkModeActivated', 'true');
    } else {
      localStorage.setItem('darkModeActivated','false');
    }
    setIsDarkMode(!isDarkMode);
  };

return(
  <IonApp className='dark'>
    <IonReactRouter>
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar>
          <IonTitle slot="start">
              <img src='./images/logo.png' style={{width:"100px",paddingTop:"5px"}}></img>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
            <IonItem button routerLink="/home">
                {/* <IonIcon slot="start" icon={list} /> */}
                <IonLabel color="primary">Home</IonLabel>
              </IonItem>
              <IonItem button routerLink="/wishlist">
                {/* <IonIcon slot="start" icon={list} /> */}
                <IonLabel color="primary">Wishlist</IonLabel>
              </IonItem>
              <IonItem button routerLink="/history">
                {/* <IonIcon slot="start" icon={warning} /> */}
                <IonLabel color="primary">History</IonLabel>
              </IonItem>
              <IonItem button routerLink="/profile">
                {/* <IonIcon slot="start" icon={settings} /> */}
                <IonLabel color="primary">Profile</IonLabel>
              </IonItem>
              <IonItem button>
                <IonLabel color="primary" slot='start'>Dark Theme</IonLabel><IonToggle
          slot="end"
          checked={isDarkMode}
          onIonChange={toggleDarkMode}
        ></IonToggle>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
        <HighlightContextProvider>
          <ProductContextProvider>
            <HistoryContextProvider>
              <IonRouterOutlet id="main">
                <Route path="/home" component={Home} />
                <Route path="/wishlist" component={Wishlist} />
                <Route exact path="/history" component={History} />
                <Route exact path="/history/:mailId" component={HistoryDetail} />
                <Route path="/profile" component={Profile} />
                <Route path="/cart" component={Cart} />
                <Redirect exact from="/" to="/home" />
              </IonRouterOutlet>
            </HistoryContextProvider>
          </ProductContextProvider>
        </HighlightContextProvider>
    </IonReactRouter>
  </IonApp>
)};

export default App;
