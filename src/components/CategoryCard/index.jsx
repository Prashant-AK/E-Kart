import React from "react";

const CategoryCard = ({ category, image }) => {
  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-[280px] max-h-[280px]">
      <a href="#">
        <img
          className="rounded-t-lg object-cover w-full max-h-[200px] min-h-[200px]"
          src={image}
          alt={category}
        />
      </a>
      <div className="p-4">
        <a href="#">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {category}
          </h5>
        </a>
      </div>
    </div>
  );
};

export default CategoryCard;
