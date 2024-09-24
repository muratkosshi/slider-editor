import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSlide, setActiveSlide, addElement, updateElementPosition, removeElement } from './slidesSlice';
import SlidePreview from './SlidePreview';
import SlidesOverview from './SlidesOverview';
import ImageUpload from './ImageUpload';
import ContextMenu from './ContextMenu';

const SlideEditor = () => {
    const dispatch = useDispatch();
    const { slides, activeSlideIndex } = useSelector((state) => state.slides);

    const handleAddSlide = () => {
        dispatch(addSlide());
    };

    const handleSetActiveSlide = (index) => {
        dispatch(setActiveSlide(index));
    };

    const handleAddElement = (newElement) => {
        dispatch(addElement(newElement));
    };

    const handleUpdateElementPosition = (elementId, newPosition, newSize) => {
        dispatch(updateElementPosition({ elementId, newPosition, newSize }));
    };

    const handleRemoveElement = (elementId) => {
        dispatch(removeElement(elementId));
    };

    return (
        <div className="slide-editor-container">
            <h1>Slide Editor with Redux State Management</h1>

            <div className="editor-panel">
                <ImageUpload onUpload={(imageUrl) => handleAddElement({ id: Date.now(), type: 'image', imageUrl, width: 200, height: 200, x: 100, y: 100 })} />
                <button className="button" onClick={handleAddSlide}>Add New Slide</button>
            </div>

            <SlidesOverview slides={slides} setActiveSlide={handleSetActiveSlide} activeSlideIndex={activeSlideIndex} />

            <SlidePreview
                slide={slides[activeSlideIndex]}
                updateElementPosition={handleUpdateElementPosition}
                handleRemoveElement={handleRemoveElement}
            />
        </div>
    );
};

export default SlideEditor;
