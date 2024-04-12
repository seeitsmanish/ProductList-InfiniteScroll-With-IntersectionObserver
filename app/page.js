"use client"
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import SkeletonProductCard from './SkeletonProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (isLast) return;
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (responseData.products.length === 0) {
        setLoading(false);
        setIsLast(true);
        return;
      }
      setProducts(prevProducts => ([
        ...prevProducts,
        ...responseData.products,
      ]));
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const containerRef = useRef();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (containerRef.current.querySelectorAll('.card').length === 0) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5,
    });

    const lastCardObserver = new IntersectionObserver(entries => {
      const lastCard = entries[0];
      if (lastCard.isIntersecting && !isLast) {
        fetchProducts();
      }
    }, {
      rootMargin: "100px",
    });

    if (containerRef.current) {
      containerRef.current.querySelectorAll('.card').forEach(child => {
        observer.observe(child);
      });
      lastCardObserver.observe(containerRef.current.querySelector(".card:last-child"));
    }


    return () => {
      observer.disconnect();
      lastCardObserver.disconnect();
    };
  }, [containerRef, fetchProducts]);

  return (
    <div className="container w-[500px] mx-auto p-5" ref={containerRef}>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          image={product.images[0]}
          name={product.title}
          price={product.price}
          description={product.description}
        />
      ))}

      {
        loading && <SkeletonProductCard />
      }
    </div>
  );
}
