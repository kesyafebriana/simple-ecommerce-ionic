import React, { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButtons,
  IonGrid,
  IonInput,
  IonCol,
  IonRow,
  IonMenuButton,
  IonToast,
  IonText,
  IonButton,
  IonToolbar,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonItem,
  IonCard,
  IonLabel,
  IonBadge,
  IonItemDivider,
} from "@ionic/react";
import { add, remove, cartOutline } from "ionicons/icons";
import ProductsContext from "../data/product-context";
import HistoryContext from '../data/history-context';

type HistoryItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    transactionId: string;
    date: Date;
  };

const Cart: React.FC = () => {
  const productsCtx = useContext(ProductsContext);
  const historyCtx = useContext(HistoryContext);
  const [toastMessage, setToastMessage] = useState("");
  const cartProducts = productsCtx.product.filter((product) => product.cart);
  const history = useHistory();

  const handleCartClick = () => {
    history.push("/cart");
  };

  const handleButtonClick = () => {
    history.push("/home");
  };

  const incrementQuantity = (productId: number) => {
    const productToFind = productsCtx.product.find((product) => product.id === productId);
    const total = (productToFind?.cartQty ?? 0) + 1;
    productsCtx.updatedCartQty(productId, total);
  };

  const decrementQuantity = (productId: number) => {
    const productToFind = productsCtx.product.find((product) => product.id === productId);
    const total = (productToFind?.cartQty ?? 0) - 1;
    if (total === 0) {
      productsCtx.removeCart(productId);
    } else {
      productsCtx.updatedCartQty(productId, total);
    }
  };

  const handleCheckout = () => {
    const historyItems: HistoryItem[] = [];
    const transactionId = generateRandomTransactionId();

    cartProducts.forEach((product) => {
      const historyItem: HistoryItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.cartQty,
        transactionId: transactionId,
        date: new Date(),
      };

      historyItems.push(historyItem);
      productsCtx.removeCart(product.id);
      productsCtx.updatedCartQty(product.id,0);
    });

    historyCtx.addToHistory(historyItems);
    setToastMessage('Checkout completed!');
  }; 

  function generateRandomTransactionId() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
  
    let randomTransactionId = '';
  
    for (let i = 0; i < 3; i++) {
      randomTransactionId += letters[Math.floor(Math.random() * letters.length)];
    }
  
    for (let i = 0; i < 3; i++) {
      randomTransactionId += numbers[Math.floor(Math.random() * numbers.length)];
    }
  
    return randomTransactionId;
  }

  const total = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.cartQty;
  }, 0);

  return (
    <React.Fragment>
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => {
          setToastMessage("");
        }}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton color="primary"/>
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
            {cartProducts.length > 0 ? (
              cartProducts.map((product) => (
                <IonItem key={product.id} lines="full">
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      overflow: "hidden",
                      marginRight: "20px",
                      padding: "10px",
                    }}
                  >
                    <img
                      src={product.photo}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <IonLabel>
                    <b>{product.name}</b>
                    <br></br>
                    <small>Rp {product.price.toLocaleString()}</small>
                  </IonLabel>
                  <IonItem>
                    <IonButton style={{height:"30px", width:"20px"}} onClick={() => decrementQuantity(product.id)}>-</IonButton>
                    <IonInput
                      type="number"
                      style={{width:"40px", height:"60px", fontSize:"12px", textAlign:"center", borderRadius:"5px"}}
                      value={product.cartQty}
                      onIonChange={(e) => {
                        const updatedQty = parseInt(e.detail.value!, 10) || 0;

                        if (updatedQty <= 0) {
                          productsCtx.removeCart(product.id);
                          productsCtx.updatedCartQty(product.id, 0);
                        } else {
                          productsCtx.updatedCartQty(product.id, updatedQty);
                        }
                      }}
                    />
                    <IonButton style={{height:"30px", width:"20px"}} onClick={() => incrementQuantity(product.id)}>+</IonButton>
                  </IonItem>
                </IonItem>
              ))
            ) : (
              <IonText className="ion-text-center">
                <p>Currently you don't have any in your cart...</p>
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
            )}
          </IonList>
          {cartProducts.length > 0 ? (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IonCard color="primary" style={{ width: "70%", height: "100%" }}>
                  <IonGrid>
                    {cartProducts.map((product) => (
                      <IonRow>
                        <IonCol>
                          <IonText className="ion-text-center">
                            <p>
                              {product.name} ({product.cartQty}x)
                            </p>
                          </IonText>
                        </IonCol>
                        <IonCol>
                          <IonText className="ion-text-center">
                            <p>
                              : Rp
                              {(product.price * product.cartQty).toLocaleString(
                                "id-ID"
                              )}
                            </p>
                          </IonText>
                        </IonCol>
                      </IonRow>
                    ))}
                  </IonGrid>
                  {/* <IonItemDivider
                    style={{ paddingTop: "-20px" }}
                  ></IonItemDivider> */}
                  <IonText className="ion-text-center">
                    <h3>
                      <b>Total: Rp {total.toLocaleString("id-ID")}</b>
                    </h3>
                  </IonText>
                </IonCard>
              </div>
              <IonText className="ion-text-center">
                <IonGrid>
                  <IonRow>
                    <IonCol size="12" size-md="6" offset-md="3">
                      <IonButton onClick={handleCheckout}>Checkout</IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonText>
            </div>
          ) : (
            ""
          )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default Cart;
