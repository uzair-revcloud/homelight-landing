import React from 'react';
import Carousel from '../ui/Carousel';
import PropertyCard from '../ui/PropertyCard';
import { PROPERTIES_LIST } from '../../constants/lists';

const RecentlySoldCarousel = () => {


    return (
        <Carousel title={
            <>
                Recently Sold with {import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers"}<sup className="text-2xl">®</sup>
            </>
        }>
            {PROPERTIES_LIST.map((property) => (
                <PropertyCard
                    key={property.id}
                    price={property.price}
                    address={property.address}
                    beds={property.beds}
                    baths={property.baths}
                    sqft={property.sqft}
                    daysSold={property.daysSold}
                    image={property.image}
                />
            ))}
        </Carousel>
    );
};

export default RecentlySoldCarousel;
