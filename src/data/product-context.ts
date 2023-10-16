import React from 'react';

export interface Product {
    id: number,
    name: string,
    price: number,
    wishlist: boolean,
    cart: boolean,
    cartQty: number,
    photo: string
}

interface Context {
    product: Product[];
    addWishlist: (id:number) => void,
    removeWishlist: (id:number) => void,
    addCart: (id:number) => void,
    removeCart: (id:number) => void,
    updatedCartQty: (id:number, qty:number) => void,
}

const ProductContext = React.createContext<Context>({
    product: [],
    addWishlist: () => {},
    removeWishlist: () => {},
    addCart: () => {},
    removeCart: () => {},
    updatedCartQty: () => {},
});

export default ProductContext;