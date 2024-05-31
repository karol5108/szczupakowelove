
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import pt from './pt.png'
import pg from './pg.png'
import a from './a.png'
import z from './z.png'
import baner from "./slBANER.png"

const items = [
    { image: pt, link: '/Twarde' },
    { image: pg, link: '/Gumy' },
    { image: z, link: '/Zestawy' },
    { image: a, link: '/Akcesoria' },
    { image: baner, link: '#' },
];

const Carousel = () => {
    const handleImageClick = (link) => {
        window.location.href = link;
    };

    const renderItems = () => {
        return items.map((item, index) => (
            <img
                key={index}
                src={item.image}
                onClick={() => handleImageClick(item.link)}
                data-value={index + 1}
            />
        ));
    };

    return (
          <div> {/* Ensure carousel container doesn't overflow */}
            <AliceCarousel
                autoPlay
                autoPlayControls
                autoPlayStrategy="none"
                autoPlayInterval={5000}
                animationDuration={2000}
                animationType="fadeout"
                infinite
                touchTracking={false}
                disableDotsControls
                disableButtonsControls
                items={renderItems()}
                responsive={{ 0: { items: 1 }, 1500: { items: 2 }, 3000: { items: 3 } }} // Responsive settings for different screen sizes
            />
        </div>
    );
};



export default Carousel;