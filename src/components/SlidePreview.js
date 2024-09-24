import React from 'react';
import { Rnd } from 'react-rnd';

const SlidePreview = ({ slide, handleContextMenu, updateElementPosition, startEditing, editingElementId, editingText, handleTextChange, stopEditing }) => {
    return (
        <div className="slide-preview" onContextMenu={handleContextMenu} style={{ width: '960px', height: '540px', position: 'relative', backgroundColor: 'white' }}>
            {slide.elements
                .slice() // Создаем копию массива элементов
                .sort((a, b) => a.zIndex - b.zIndex) // Сортируем по z-index, от меньшего к большему
                .map((element) => (
                    <Rnd
                        key={element.id}
                        size={{ width: element.width, height: element.height }}
                        bounds="parent"
                        style={{ zIndex: element.zIndex }}
                        onDragStop={(e, d) => {
                            updateElementPosition(element.id, { x: d.x, y: d.y }, { width: element.width, height: element.height });
                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            updateElementPosition(element.id, position, {
                                width: ref.style.width.replace('px', ''),
                                height: ref.style.height.replace('px', ''),
                            });
                        }}
                    >
                        {element.type === 'text' ? (
                            editingElementId === element.id ? (
                                <textarea
                                    value={editingText}
                                    onChange={handleTextChange}
                                    onBlur={stopEditing}
                                    style={{ width: '100%', height: '100%' }}
                                    autoFocus
                                />
                            ) : (
                                <div
                                    className="text-element"
                                    onDoubleClick={() => startEditing(element.id, element.text)}
                                    style={{ border: '1px solid blue', padding: '5px', cursor: 'move' }}
                                >
                                    {element.text}
                                </div>
                            )
                        ) : (
                            <img src={element.imageUrl} alt="slide element" style={{ width: '100%', height: '100%' }} />
                        )}
                    </Rnd>
                ))}
        </div>
    );
};

export default SlidePreview;
