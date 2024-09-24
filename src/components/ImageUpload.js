import React from 'react';

const ImageUpload = ({ onUpload }) => {
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

    return (
        <div className="image-upload">
            <h4>Upload Image</h4>
            <input type="file" onChange={handleImageUpload} />
        </div>
    );
};

export default ImageUpload;
