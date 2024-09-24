import React from 'react';

const SlideThumbnail = ({ slide, index, isActive, onClick }) => {
    return (
        <div
            className={`slide-thumbnail ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            <p>Slide {index + 1}</p>
        </div>
    );
};

export default SlideThumbnail;
