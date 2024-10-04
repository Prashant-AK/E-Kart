import React from "react";
import CommonSlider from "../../components/CommonSlider";
import CategoryCardSlider from "../../components/CommonSlider/CategoryCardSlider";
import { allProducts, categoriesData } from "../../utils/data";
import ProductCategories from "../../components/HomeComponents/ProductDetails";
import FeaturedProduct from "../../components/HomeComponents/FeaturedProduct";

const HomePage = () => {
  const sliderSettings = {
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
  };

  return (
    <div className="home-page">
      <div>
        <CommonSlider settings={sliderSettings} slides={allProducts} />
      </div>
      {/* <div className="px-6 py-3">
        <h2 className="text-3xl font-bold text-center mb-6 text-left">
          PopularCategories
        </h2>
        <CategoryCardSlider categories={categoriesData} />
      </div> */}
      <ProductCategories />
      <FeaturedProduct />
    </div>
  );
};

export default HomePage;
