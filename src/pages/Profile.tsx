import React, { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButtons,
  IonCard,
  IonCardContent,
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
  IonCardHeader,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import ProductsContext from "../data/product-context";

const Profile: React.FC = () => {
  const productsCtx = useContext(ProductsContext);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();
  const cartProducts = productsCtx.product.filter((product) => product.cart);

  const handleCartClick = () => {
    history.push("/cart");
  };

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              marginTop: "50px",
            }}
          >
            <IonCard color="light" style={{ width: "70%", height: "100%" }}>
              <IonCardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "180px",
                    height: "180px",
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src="./images/profile.png"
                    alt="Profile Picture"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <IonText
                  className="ion-text-center"
                  style={{ marginTop: "20px" }}
                  color="primary"
                >
                  <h2>
                    <b>Kesya Febriana Manampiring</b>
                  </h2>
                  <p>
                    <b>(00000065476)</b>
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default Profile;
