

import React, { useState } from 'react';
import './ProductImage.css';
const ProductImages = ({ productName, productImg }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    return (
        <div className="product-images">
            <div className="main-image">
                {selectedImageIndex === 0 ? (
                    <iframe
                        title="product-video"
                        src={`/${productName}/video.mp4`}
                        width="100%"
                        height="400"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <img
                        src={`/${productName}/${productImg[selectedImageIndex - 1]}`}
                        // src={`https://ae01.alicdn.com/kf/${product.colorsImg[selectedImageIndex - 1]}`}
                        alt={`Color ${selectedImageIndex}`}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                )}
            </div>
            {/* <div className="thumbnail-images">
                {product.colorsImg.map((img, index) => (
                    <img
                        key={index}
                        src={`https://ae01.alicdn.com/kf/${img}`}
                        alt={`Color ${index + 1}`}
                        className={selectedImageIndex === index + 1 ? 'selected' : ''}
                        onClick={() => handleImageClick(index + 1)}
                    />
                ))}
            </div> */}
            <div className="thumbnail-images">
  {productImg.map((img, index) => (
    <img
      key={index}
      src={`/${productName}/${img}`}
      alt={`Color ${index + 1}`}
      className={selectedImageIndex === index + 1 ? 'selected' : ''}
      onClick={() => handleImageClick(index + 1)}
    />
  ))}
</div>
        </div>
    );
};

export default ProductImages;