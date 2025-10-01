import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImagePopup = ({ isOpen, onClose, images, currentIndex, onPrevious, onNext, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 md:p-4">
      <div className="relative w-full h-full md:max-w-4xl md:max-h-full flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-200 hover:scale-110"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrevious}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 md:p-3 rounded-full transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 md:p-3 rounded-full transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </>
        )}

        {/* Main image */}
        <div className="bg-white rounded-none md:rounded-lg overflow-hidden flex-1 flex flex-col">
          <img
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full md:h-auto md:max-h-[70vh] object-contain flex-1 transition-opacity duration-300"
          />
          
          {/* Image counter and title */}
          <div className="p-3 md:p-4 bg-white flex-shrink-0">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 md:mb-2 truncate">{title}</h3>
            {images.length > 1 && (
              <p className="text-xs md:text-sm text-gray-600">
                Image {currentIndex + 1} of {images.length}
              </p>
            )}
          </div>
        </div>

        {/* Thumbnail strip for multiple images */}
        {images.length > 1 && images.length <= 8 && (
          <div className="hidden md:flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => onNext && onNext(index - currentIndex)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                  index === currentIndex ? 'border-orange-500' : 'border-transparent hover:border-gray-400'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePopup;