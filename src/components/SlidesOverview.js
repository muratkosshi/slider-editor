import React from 'react';

const SlidesOverview = ({ slides, activeSlideIndex, setActiveSlide }) => {
    return (
        <div className="slides-overview">
            <h2>Slides</h2>
            <div className="slides-list">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide-thumbnail ${index === activeSlideIndex ? 'active' : ''}`}
                        onClick={() => setActiveSlide(index)}
                    >
                        <p>Slide {index + 1}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SlidesOverview;
