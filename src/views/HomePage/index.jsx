import React, { useState, useEffect } from "react";
import CommonSlider from "../../components/CommonSlider";
import CategoryCardSlider from "../../components/CommonSlider/CategoryCardSlider";
import { allProducts, categoriesData } from "../../utils/data";
import ProductCategories from "../../components/HomeComponents/ProductDetails";
import FeaturedProduct from "../../components/HomeComponents/FeaturedProduct";
import { useGetAllCategoriesMutation } from "../../store/category/categoryApiSlice";
import { useGetAllProductsMutation } from "../../store/product/productApiSlice";

const HomePage = () => {
  const sliderSettings = {
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
  };
  const [getAllCategories, { data: categories, isLoading }] =
    useGetAllCategoriesMutation();
  const [getAllProdcts, { data: products }] = useGetAllProductsMutation();
  useEffect(() => {
    getAllCategories();
    getAllProdcts();
  }, []);
  useEffect(() => {
    if (categories) {
      console.log("all categories", categories);
    }
  }, [categories]);
  useEffect(() => {
    if (products) {
      console.log("all categories", products);
    }
  }, [products]);
  return (
    <div className="home-page">
      <div className="mt-5">
        <CommonSlider settings={sliderSettings} slides={allProducts} />
      </div>
      {/* <div className="px-6 py-3">
        <h2 className="text-3xl font-bold text-center mb-6 text-left">
          PopularCategories
        </h2>
        <CategoryCardSlider categories={categoriesData} />
      </div> */}
      <ProductCategories categories={categories} />
      <FeaturedProduct products={products} title="Featured Prodcts" />
      <FeaturedProduct
        products={products}
        title="All Products"
        showAllProducts={true}
      />
    </div>
  );
};

export default HomePage;
