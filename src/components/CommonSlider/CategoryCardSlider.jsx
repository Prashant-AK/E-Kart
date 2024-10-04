import React from "react";
import Slider from "react-slick";
import CategoryCard from "../CategoryCard";

const CategoryCardSlider = ({ categories }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...sliderSettings}>
      {categories.map((category, index) => (
        <div key={index}>
          <CategoryCard category={category.name} image={category.image} />
        </div>
      ))}
    </Slider>
  );
};

export default CategoryCardSlider;
