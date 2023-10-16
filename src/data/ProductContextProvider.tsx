import React, {useState} from 'react';
import ProductContext, {Product} from "./product-context";
import HistoryContext, { HistoryItem } from './history-context';

interface ProductContextProviderProps { 
    children: React.ReactNode; 
   } 
    
const ProductContextProvider: React.FC<ProductContextProviderProps> = (props) => {
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: "New Balance 530",
            price: 1725000,
            wishlist: false,
            cart: false,
            cartQty: 0,
            photo: './images/NewBalance530.png'
        },
        {
            id: 2,
            name: "New Balance 550",
            price: 2099000,
            wishlist: false,
            cart: false,
            cartQty: 0,
            photo: './images/NewBalance550.png'
        },
        {
            id: 3,
            name: "Air Jordan 1",
            price: 2800000,
            wishlist: false,
            cart: false,
            cartQty: 0,
            photo: './images/AirJordan1RetroHigh.png'
        },
        {
            id: 4,
            name: "Nike Air Max 97",
            price: 3000000,
            wishlist: false,
            cart: false,
            cartQty: 0,
            photo: './images/NikeAirMax97Futura.png'
        },
        {
            id: 5,
            name: "Adidas StanSmith",
            price: 1750000,
            wishlist: false,
            cart: false,
            cartQty: 0,
            photo: './images/AdidasStanSmith.png'
        },
        {
            id: 6,
            name: "Adidas Samba",
            price: 1900000,
            wishlist: false,
            cart: false,
            cartQty: 0,
            photo: './images/AdidasSpikelessSamba.png'
        }
    ]);

    const [history, setHistory] = useState<HistoryItem[]>([]);

    const addToHistory = (item: HistoryItem) => {
        setHistory((currentHistory) => [item, ...currentHistory]);
      };

    const addWishlist = (id: number) => {
		setProducts((currProducts) => {
			return currProducts.map((product) => {
				if (product.id === id) {
					return {
						...product,
						wishlist: true,
					};
				}
				return product;
			});
		});
	};

    const removeWishlist = (id: number) => {
		setProducts((currProducts) => {
			return currProducts.map((product) => {
				if (product.id === id) {
					return {
						...product,
						wishlist: false,
					};
				}
				return product;
			});
		});
	};

    const addCart = (id: number) => {
		setProducts((currProducts) => {
			return currProducts.map((product) => {
				if (product.id === id) {
					return {
						...product,
						cart: true,
                        cartQty: product.cartQty+1,
					};
				}
				return product;
			});
		});
	};

    const updatedCartQty = (id: number, qty:number) => {
		setProducts((currProducts) => {
			return currProducts.map((product) => {
				if (product.id === id) {
					return {
						...product,
                        cartQty: qty,
					};
				}
				return product;
			});
		});
	};

    const removeCart = (id: number) => {
		setProducts((currProducts) => {
			return currProducts.map((product) => {
				if (product.id === id) {
					return {
						...product,
						cart: false,
					};
				}
				return product;
			});
		});
	};

    return (
        <ProductContext.Provider value={{
            product: products,
            addWishlist,
            removeWishlist,
            addCart,
            removeCart,
            updatedCartQty
        }}>
            {props.children}
        </ProductContext.Provider>
        
    );
}

export default ProductContextProvider;