import React from 'react';

const SlidesOverview = ({ slides, setActiveSlide, activeSlideIndex, addNewSlide }) => (
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
        <button className="button" onClick={addNewSlide}>Add New Slide</button>
    </div>
);

export default SlidesOverview;
