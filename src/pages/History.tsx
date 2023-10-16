import React, { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonCard,
  IonButtons,
  IonBadge,
  IonGrid,
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
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import ProductsContext from "../data/product-context";
import HistoryContext from "../data/history-context";

const History: React.FC = () => {
  const productsCtx = useContext(ProductsContext);
  const historyCtx = useContext(HistoryContext);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();
  const cartProducts = productsCtx.product.filter((product) => product.cart);
  const totalByTransactionId = new Map<string, number>();
  const [filter, setFilter] = useState(false);
  
  const handleCartClick = () => {
    history.push("/cart");
  };

  const handleDetailClick = (transactionId:string) => {
    history.push('/history/' + transactionId);
  };

  historyCtx.history.forEach((historyItem) => {
    const transactionId = historyItem.transactionId;
    const total = totalByTransactionId.get(transactionId) || 0;
    totalByTransactionId.set(
      transactionId,
      total + historyItem.price * historyItem.quantity
    );
  });

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
        <IonContent class="ion-padding">
            {filter? (<IonButton onClick={() => setFilter(false)}>Sort by latest</IonButton>):(<IonButton onClick={() => setFilter(true)}>Sort by Transaction ID</IonButton>)}
          <IonList>
          {
  filter
    ? Array.from(totalByTransactionId.keys())
        .sort()
        .map((transactionId, index) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IonCard
              color="medium"
              key={index}
              style={{ width: '80%', padding: '20px 30px' }}
            >
              <IonText>
                <p>
                  <b>Code: {transactionId}</b>
                </p>
              </IonText>
              <IonText>
                <p>
                  <b>
                    Total: Rp{' '}
                    {totalByTransactionId
                      .get(transactionId)
                      ?.toLocaleString()}
                  </b>
                </p>
              </IonText>
              <IonText className="ion-text-center">
                <IonGrid>
                  <IonRow>
                    <IonCol size="12" size-md="6" offset-md="3">
                    <IonButton onClick={handleDetailClick.bind(null,transactionId)}>Detail</IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonText>
            </IonCard>
          </div>
        ))
    : Array.from(totalByTransactionId.keys())
        .reverse()
        .map((transactionId, index) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IonCard
            color="medium"
              key={index}
              style={{ width: '80%', padding: '20px 30px' }}
            >
              <IonText>
                <p>
                  <b>Code: {transactionId}</b>
                </p>
              </IonText>
              <IonText>
                <p>
                  <b>
                    Total: Rp{' '}
                    {totalByTransactionId
                      .get(transactionId)
                      ?.toLocaleString()}
                  </b>
                </p>
              </IonText>
              <IonText className="ion-text-center">
                <IonGrid>
                  <IonRow>
                    <IonCol size="12" size-md="6" offset-md="3">
                    <IonButton onClick={handleDetailClick.bind(null,transactionId)}>Detail</IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonText>
            </IonCard>
          </div>
        ))
}
          </IonList>
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default History;
