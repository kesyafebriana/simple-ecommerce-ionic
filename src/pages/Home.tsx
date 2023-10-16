import React, { useRef, useState, useContext } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonIcon,
  IonTitle,
  IonToast,
  IonGrid,
  IonCol,
  IonRow,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButtons,
  IonMenuButton,
  IonToolbar,
  IonBadge,
  IonCard,
  IonCardContent,
  IonButton,
  IonImg,
  isPlatform,
} from "@ionic/react";
import { cartOutline, heartOutline, heart, add } from "ionicons/icons";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import HighlightsContext from "../data/highlight-context";
import ProductsContext from "../data/product-context";
import { useHistory } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@ionic/react/css/ionic-swiper.css";

const Home: React.FC = () => {
  const isIOS = isPlatform("ios");
  const highlightsCtx = useContext(HighlightsContext);
  const productsCtx = useContext(ProductsContext);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();
  const cartProducts = productsCtx.product.filter((product) => product.cart);

  const handleCartClick = () => {
    history.push("/cart");
  };

  const wishlistHandler = (productId: number) => {
    const product = productsCtx.product.find((f) => f.id === productId);
    productsCtx.addWishlist(product!.id);
    setToastMessage("Added to your wishlist!");
  };

  const cartHandler = (productId: number) => {
    const product = productsCtx.product.find((f) => f.id === productId);
    productsCtx.addCart(product!.id);
    setToastMessage("Added to your cart!");
  };

  const unwishlistHandler = (productId: number) => {
    const product = productsCtx.product.find((f) => f.id === productId);
    productsCtx.removeWishlist(product!.id);
    setToastMessage("Removed from your wishlist!");
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
          <IonToolbar style={{backgroundColor:"black"}}>
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
                  <IonIcon slot="start" color="primary" size="large" icon={cartOutline} />
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
          <Swiper
            effect="coverFlow"
            pagination={{ clickable: true }}
            className="bulletActiveClassActive"
          >
            {highlightsCtx.highlight.map((highlight, index) => (
              <SwiperSlide key={index}>
                <IonImg src={highlight.photo}></IonImg>
              </SwiperSlide>
            ))}
          </Swiper>
          <IonGrid>
            <IonRow>
              {productsCtx.product.map((product) => (
                <IonCol size="6" size-md="3" key={product.id}>
                  <IonCard color="light">
                    {isIOS ? (
                      <IonCardHeader>
                        <IonCardSubtitle>
                          Rp {product.price.toLocaleString()}
                        </IonCardSubtitle>
                        <IonCardTitle
                          style={{ fontSize: "14px", marginTop: "10px" }}
                        >
                          {product.name}
                        </IonCardTitle>
                        <img
                          src={product.photo}
                          alt={product.name}
                          style={{ borderRadius: "5px" }}
                        />
                      </IonCardHeader>
                    ) : (
                      <IonCardHeader>
                        <img
                          src={product.photo}
                          alt={product.name}
                          style={{ borderRadius: "5px" }}
                        />
                        <IonCardTitle
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {product.name}
                        </IonCardTitle>
                        <IonCardSubtitle>
                          Rp {product.price.toLocaleString()}
                        </IonCardSubtitle>
                      </IonCardHeader>
                    )}

                    <IonCardContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          {product.wishlist ? (
                            <IonButton
                              fill="clear"
                              onClick={() => unwishlistHandler(product.id)}
                            >
                              <IonIcon icon={heart} color="danger"></IonIcon>
                            </IonButton>
                          ) : (
                            <IonButton
                              fill="clear"
                              onClick={() => wishlistHandler(product.id)}
                            >
                              <IonIcon icon={heartOutline}></IonIcon>
                            </IonButton>
                          )}
                        </div>
                        <div>
                          <IonButton
                            fill="clear"
                            onClick={() => cartHandler(product.id)}
                          >
                            <IonIcon icon={add}></IonIcon>
                          </IonButton>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default Home;
