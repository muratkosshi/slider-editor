import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PptxGenJS from 'pptxgenjs'; // Импорт библиотеки для генерации pptx
import { addSlide, setActiveSlide, addElement, updateElementPosition, removeElement, updateTextElement } from '../store/slidesSlice';
import SlidePreview from './SlidePreview';
import SlidesOverview from './SlidesOverview';
import ImageUpload from './ImageUpload';
import ContextMenu from './ContextMenu';

const SlideEditor = () => {
    const dispatch = useDispatch();
    const { slides, activeSlideIndex } = useSelector((state) => state.slides);

    const [isContextMenuVisible, setIsContextMenuVisible] = React.useState(false);
    const [contextMenuPosition, setContextMenuPosition] = React.useState({ x: 0, y: 0 });
    const [selectedElementId, setSelectedElementId] = React.useState(null);
    const [editingElementId, setEditingElementId] = React.useState(null); // состояние для режима редактирования
    const [editingText, setEditingText] = React.useState(''); // состояние для хранения текста во время редактирования




    // Контекстное меню для добавления элементов
    const handleContextMenu = (event, elementId = null) => {
        event.preventDefault();

        const adjustedX = event.clientX + window.scrollX;
        const adjustedY = event.clientY + window.scrollY;

        setContextMenuPosition({ x: adjustedX, y: adjustedY });
        setIsContextMenuVisible(true);
        setSelectedElementId(elementId);
    };

    const handleLeftClick = () => {
        setIsContextMenuVisible(false);
        setSelectedElementId(null);
    };

    // Добавление нового элемента на слайд
    const handleAddElement = (newElement) => {
        dispatch(addElement(newElement));
        setIsContextMenuVisible(false);
    };

    const handleRemoveElement = (elementId) => {
        dispatch(removeElement(elementId));
    };

    // Генерация презентации PPTX
    const generatePpt = () => {
        let pptx = new PptxGenJS();
        const pxToInch = 1 / 96; // Соотношение пикселей к дюймам

        slides.forEach((slide) => {
            let pptSlide = pptx.addSlide();

            // Добавляем каждый элемент на слайд презентации
            slide.elements.forEach((element) => {
                if (element.type === 'text') {
                    pptSlide.addText(element.text, {
                        x: element.x * pxToInch, // Конвертируем координаты X из пикселей в дюймы
                        y: element.y * pxToInch, // Конвертируем координаты Y из пикселей в дюймы
                        w: element.width * pxToInch, // Ширина в дюймах
                        h: element.height * pxToInch, // Высота в дюймах
                        fontSize: 16,
                        color: '363636',
                    });
                } else if (element.type === 'image') {
                    pptSlide.addImage({
                        path: element.imageUrl,
                        x: element.x * pxToInch,
                        y: element.y * pxToInch,
                        w: element.width * pxToInch,
                        h: element.height * pxToInch,
                    });
                }
            });
        });

        pptx.writeFile({ fileName: 'presentation.pptx' });
    };


    // Начать редактирование текста при двойном клике
    const startEditing = (elementId, text) => {
        setEditingElementId(elementId);
        setEditingText(text);
    };

    // Обновить текст после редактирования
    const handleTextChange = (event) => {
        setEditingText(event.target.value);
    };

    // Сохранить текст и выйти из режима редактирования
    const stopEditing = () => {
        dispatch(updateTextElement({ elementId: editingElementId, newText: editingText }));
        setEditingElementId(null);
    };

    return (
        <div className="slide-editor-container" onClick={handleLeftClick}>
            <h1>Slide Editor with Text Editing and PPTX Generation</h1>

            <div className="editor-panel">
                <ImageUpload onUpload={(imageUrl) => handleAddElement({ id: Date.now(), type: 'image', imageUrl, width: 200, height: 200, x: 100, y: 100 })} />
                <button className="button" onClick={() => dispatch(addSlide())}>Add New Slide</button>
                <button className="button" onClick={generatePpt}>Generate PPTX</button> {/* Кнопка генерации презентации */}
            </div>

            <SlidesOverview slides={slides} activeSlideIndex={activeSlideIndex} setActiveSlide={(index) => dispatch(setActiveSlide(index))} />

            <SlidePreview
                slide={slides[activeSlideIndex]}
                handleContextMenu={handleContextMenu}
                updateElementPosition={(elementId, newPosition, newSize) => dispatch(updateElementPosition({ elementId, newPosition, newSize }))}
                startEditing={startEditing}
                editingElementId={editingElementId}
                editingText={editingText}
                handleTextChange={handleTextChange}
                stopEditing={stopEditing}
            />

            <ContextMenu
                isVisible={isContextMenuVisible}
                position={contextMenuPosition}
                addTextElement={() =>
                    handleAddElement({
                        id: Date.now(),
                        type: 'text',
                        text: 'New Text',
                        x: contextMenuPosition.x, // Устанавливаем x координаты по клику ПКМ
                        y: contextMenuPosition.y, // Устанавливаем y координаты по клику ПКМ
                        width: 200,
                        height: 100,
                    })
                }
                removeElement={selectedElementId ? () => handleRemoveElement(selectedElementId) : null}
            />
        </div>
    );
};

export default SlideEditor;
