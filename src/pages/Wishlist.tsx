import React, { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonButtons, IonBadge, IonGrid, IonCol, IonRow, IonMenuButton, IonToast, IonText, IonButton, IonToolbar, IonList, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonItem, IonAvatar, IonLabel } from '@ionic/react';
import { cartOutline, trash } from 'ionicons/icons';
import ProductsContext from '../data/product-context';

const Wishlist: React.FC = () => {
    const productsCtx = useContext(ProductsContext);
    const [toastMessage, setToastMessage] = useState('');
    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
    const wishlistProducts = productsCtx.product.filter((product) => product.wishlist);
    const history = useHistory();
    const cartProducts = productsCtx.product.filter((product) => product.cart);

    const handleButtonClick = () => {
      history.push('/home');
    };

    const handleCartClick = () => {
        history.push("/cart");
    };

    const cartHandler = (productId: number) => {
        const product = productsCtx.product.find((f) => f.id === productId);
        productsCtx.addCart(product!.id);
        setToastMessage("Added to your cart!");
        slidingOptionsRef.current?.closeOpened();
    };

    const unwishlistHandler = (productId: number) => {
        const product = productsCtx.product.find((f) => f.id === productId);
        productsCtx.removeWishlist(product!.id);
        setToastMessage("Removed from your wishlist!");
    }

    return (
    <React.Fragment>
        <IonToast
            isOpen={!!toastMessage}
            message={toastMessage}
            duration={2000}
            onDidDismiss={() => {setToastMessage('')}}
            />
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton color="primary" />
            </IonButtons>
            <IonTitle slot="start">
              <img src='./images/logo.png' style={{width:"100px",paddingTop:"5px"}}></img>
            </IonTitle>
            <IonButtons slot="end">
              <IonButtons slot="end">
                <IonButton
                  onClick={handleCartClick}
                  style={{ position: "relative" }}
                >
                  <IonIcon color="primary" slot="start" size="large" icon={cartOutline} />
                  <IonBadge
                    color="danger"
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      left: "20px",
                      fontSize: "12px",
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {cartProducts.length}
                  </IonBadge>
                </IonButton>
              </IonButtons>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
            <IonContent>
                <IonList>
                    {wishlistProducts.length > 0 ? (
                        wishlistProducts.map((product) => (
                          <IonItemSliding key={product.id} ref={slidingOptionsRef}>
                            <IonItemOptions side="start">
                              <IonItemOption color="danger" onClick={unwishlistHandler.bind(null, product.id)}>
                                <IonIcon slot="icon-only" icon={trash} />
                              </IonItemOption>
                            </IonItemOptions>
                            <IonItemOptions side="end">
                              <IonItemOption color="success" onClick={() => cartHandler(product.id)}>
                                <IonIcon slot="icon-only" icon={cartOutline} />
                              </IonItemOption>
                            </IonItemOptions>
                            <IonItem key={product.id} lines="full">
                            <div style={{ width: '100px', height: '100px', overflow: 'hidden', marginRight: '20px', padding: '10px'}}>
                            <img src={product.photo} alt={product.name} style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                            </div>
                              <IonLabel>
                                <b>{product.name}</b><br></br>
                                <small>Rp {product.price.toLocaleString()}</small>
                              </IonLabel>
                            </IonItem>
                          </IonItemSliding>
                        ))
                      ) : (
                        <IonText className="ion-text-center">
                            <p>Currently you don't have any wishlist...</p>
                            <h4>Would you like to have a look?</h4>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12" size-md="6" offset-md="3">
                                        <IonButton onClick={handleButtonClick}>
                                            Go to Shop
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonText>
                      )
                    }
                </IonList>
            </IonContent>
        </IonPage>
    </React.Fragment>
    )};

export default Wishlist;