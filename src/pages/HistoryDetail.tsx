import React, { useRef, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  IonItemDivider,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import ProductsContext from "../data/product-context";
import HistoryContext from "../data/history-context";

const HistoryDetail: React.FC = () => {
  const productsCtx = useContext(ProductsContext);
  const historyCtx = useContext(HistoryContext);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();
  const cartProducts = productsCtx.product.filter((product) => product.cart);
  const totalByTransactionId = new Map<string, number>();
  const mId = useParams<{ mailId: string }>().mailId;
  if (!mId) {
    return <div>Invalid route parameter</div>;
  }
const selectedHistory = historyCtx.history.filter((m) => m.transactionId === mId);
console.log(selectedHistory);

  const handleCartClick = () => {
    history.push("/cart");
  };

  historyCtx.history.forEach((historyItem) => {
    const transactionId = historyItem.transactionId;
    const total = totalByTransactionId.get(transactionId) || 0;
    totalByTransactionId.set(
      transactionId,
      total + historyItem.price * historyItem.quantity
    );
  });

  const total = selectedHistory.reduce((acc, historyItem) => {
    return acc + historyItem.price * historyItem.quantity;
  }, 0);

  if (mId) return (
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
              <IonMenuButton color="primary" />
            </IonButtons>
            <IonTitle slot="start">History Detail</IonTitle>
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
        <IonButton onClick={() => history.goBack()}>Back</IonButton>
           <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
  <IonCard
  color="light"
    style={{ width: '80%', padding: '20px 30px' }}
  >
    <IonText>
    <p><b>Code: {mId}</b></p>
    </IonText>

    <IonText>
    <p style={{ marginTop: "50px" }}><b>Products:</b></p>
    </IonText>
    {selectedHistory.map((historyItem, index) => (
  <IonGrid key={index.toString() + historyItem.transactionId}>
        <IonRow style={{ marginTop: "-20px" }}>
            <IonCol>
                <p>{index + 1}. {historyItem.name} ({historyItem.quantity}x)</p>
            </IonCol>
            <IonCol>
                <p>= Rp{(historyItem.price * historyItem.quantity).toLocaleString("id-ID")}</p>
            </IonCol>
        </IonRow>
    </IonGrid>
))}

    {/* <IonItemDivider></IonItemDivider> */}
        <IonText className="ion-text-center">
            <h4><b>Total: Rp {total.toLocaleString()}</b></h4>
        </IonText>
  </IonCard>
           </div>
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default HistoryDetail;
