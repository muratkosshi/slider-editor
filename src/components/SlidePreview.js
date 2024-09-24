import React, { forwardRef } from 'react';
import { Rnd } from 'react-rnd';

const SlidePreview = forwardRef(({ slide, slideWidth, slideHeight, updateSlideElements, handleContextMenu, setSelectedElementId }, ref) => (
    <div className="slide-preview" ref={ref} style={{ width: `${slideWidth}px`, height: `${slideHeight}px` }} onContextMenu={handleContextMenu}>
        <h2>Slide Preview</h2>
        {slide.elements.map((element) => (
        <Rnd
            key={element.id}
            size={{ width: element.width, height: element.height }}
            position={{ x: element.x, y: element.y }}
            bounds="parent"
            onDragStop={(e, d) => updateSlideElements({ ...element, x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, position) =>
                updateSlideElements({
                    ...element,
                    width: ref.style.width.replace('px', ''),
                    height: ref.style.height.replace('px', ''),
                    x: position.x,
                    y: position.y,
                })
            }
            onContextMenu={(e) => handleContextMenu(e, element.id)} // ПКМ на элементе
        >
            {element.type === 'text' ? (
                <div
                    className="text-element"
                    onDoubleClick={() => setSelectedElementId(element.id)}
                    style={{
                        border: element.id ? '1px solid blue' : 'none',
                        padding: '5px',
                    }}
                >
                    {element.text}
                </div>
            ) : (
                <img src={element.imageUrl} alt="Slide visual" className="image-element" />
            )}
        </Rnd>
        ))}
    </div>
));

export default SlidePreview;
