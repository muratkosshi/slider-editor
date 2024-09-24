import React, { useEffect } from 'react';

const ImageUpload = ({ onUpload }) => {
    // Загрузка изображения через input
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                onUpload(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Вставка изображения из буфера обмена
    const handlePaste = (event) => {
        const clipboardItems = event.clipboardData.items;
        for (let i = 0; i < clipboardItems.length; i++) {
            const item = clipboardItems[i];
            if (item.type.indexOf('image') !== -1) {
                const file = item.getAsFile();
                const reader = new FileReader();
                reader.onload = () => {
                    onUpload(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    // Добавляем обработчик события 'paste' при монтировании компонента
    useEffect(() => {
        window.addEventListener('paste', handlePaste);
        return () => {
            window.removeEventListener('paste', handlePaste);
        };
    }, []);

    return (
        <div className="image-upload">
            <h4>Upload Image</h4>
            <input type="file" onChange={handleImageUpload} />
            <p>Or paste an image from your clipboard.</p>
        </div>
    );
};

export default ImageUpload;
