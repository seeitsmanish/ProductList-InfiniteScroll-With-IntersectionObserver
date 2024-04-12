"use client"
import React from 'react';

const ProductCard = ({ image, name, price, description }) => {
    return (
        <div className={`card max-w-md mx-auto mb-[50px] bg-white shadow-md rounded-lg overflow-hidden}`}>
            <img className="h-[200px] w-full object-cover" src={image} alt={name} />
            <div className="p-6">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base mb-4">{description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-semibold">${price}</span>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
