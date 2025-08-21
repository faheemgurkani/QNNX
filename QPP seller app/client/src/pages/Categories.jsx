import React from "react";

// Dynamically import all images from the categories folder
function importAll(r) {
  return r.keys().map((key) => ({
    src: r(key),
    name: key
      .replace("./", "")
      .replace(/\.[^/.]+$/, "") // remove extension
      .replace(/[-_]/g, " ") // replace - and _ with space
  }));
}

const images = importAll(
  require.context("../assets/categories", false, /\.(png|jpe?g|svg)$/)
);

const Categories = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {images.map((img) => (
          <div
            key={img.name}
            className="flex flex-col items-center bg-white rounded-lg shadow hover:shadow-lg transition p-4"
          >
            <img
              src={img.src}
              alt={img.name}
              className="w-24 h-24 object-contain mb-2"
            />
            <span className="text-sm font-medium text-gray-700 capitalize text-center">
              {img.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
