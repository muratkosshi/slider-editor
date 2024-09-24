import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    slides: [{ id: Date.now(), elements: [] }],
    activeSlideIndex: 0,
};

export const slidesSlice = createSlice({
    name: 'slides',
    initialState,
    reducers: {
        addSlide: (state) => {
            state.slides.push({ id: Date.now(), elements: [] });
            state.activeSlideIndex = state.slides.length - 1;
        },
        setActiveSlide: (state, action) => {
            state.activeSlideIndex = action.payload;
        },
        addElement: (state, action) => {
            // Находим максимальный zIndex среди элементов
            const activeSlide = state.slides[state.activeSlideIndex];
            const maxZIndex = activeSlide.elements.length > 0
                ? Math.max(...activeSlide.elements.map((el) => el.zIndex || 0))
                : 0;

            const newElement = { ...action.payload, zIndex: maxZIndex + 1 }; // Новый элемент всегда сверху
            state.slides[state.activeSlideIndex].elements.push(newElement);
        },
        updateElementPosition: (state, action) => {
            const { elementId, newPosition, newSize } = action.payload;
            const activeSlide = state.slides[state.activeSlideIndex];
            const element = activeSlide.elements.find(el => el.id === elementId);
            if (element) {
                element.x = newPosition.x;
                element.y = newPosition.y;
                element.width = newSize.width;
                element.height = newSize.height;
            }
        },
        removeElement: (state, action) => {
            const activeSlide = state.slides[state.activeSlideIndex];
            activeSlide.elements = activeSlide.elements.filter(el => el.id !== action.payload);
        },
        updateTextElement: (state, action) => {
            const { elementId, newText } = action.payload;
            const activeSlide = state.slides[state.activeSlideIndex];
            const element = activeSlide.elements.find(el => el.id === elementId);
            if (element && element.type === 'text') {
                element.text = newText;
            }
        },


    },
});

export const { addSlide, setActiveSlide, addElement, updateElementPosition, removeElement, updateTextElement } = slidesSlice.actions;

export default slidesSlice.reducer;
