import React from 'react';

const ContextMenu = ({ isVisible, position, addTextElement, removeElement }) => {
    if (!isVisible) return null;

    return (
        <ul className="context-menu" style={{ top: `${position.y}px`, left: `${position.x}px` }}>
            <li onClick={addTextElement}>Add Text</li>
            {removeElement && <li onClick={removeElement}>Remove Element</li>}
        </ul>
    );
};

export default ContextMenu;
