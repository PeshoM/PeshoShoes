import React from 'react';
import { useEffect, useState, useRef, useContext } from 'react';
import Navigation from "./Navigation.tsx";
import Footer from "./Footer.tsx";
import "../styles/product.css";
import { useSearchParams } from 'react-router-dom';

const Product = () => {
    const [searchParams] = useSearchParams();
    const [product, setProduct] = useState<prod>();
    const title = searchParams.get("title");
    interface prod {
        title: string,
        description: string,
        images: string[],
        price: number,
        sizes: number[],
        color: string[],
        season: string
    }

    useEffect(() => {
        let fetchProduct = async () => {
            let response = await fetch("http://localhost:8000/fetchProduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title
                }),
            }).then((res) => {
                return res.json();
            });
            setProduct(response.product);
        };
        fetchProduct()
    }, []);

    return (
        <div>
            <Navigation />
            <div className='product-info-and-options'>
                <div className='product-pictures'>
                    <div className="grid-container">
                        {product && product.images.map((image, index) => (
                            <img className={"product-images pic" + index} src={"http://localhost:8000/uploads/" + image} />
                        ))}
                    </div>
                </div>
                <div className='product-options'>
                    <div className="product-title">{product?.title}</div>
                    <div className="product-color">{product?.color}</div>
                    <div className="product-rating" ></div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Product;