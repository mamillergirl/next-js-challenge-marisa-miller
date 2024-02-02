import React, { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const imageRef = useRef();

  useEffect(() => {
    let observer;

    const loadImage = () => {
      if (imageRef.current && imageSrc !== src) {
        setImageSrc(null);
        const imageLoader = new Image();
        imageLoader.src = src;
        imageLoader.onload = () => {
          setImageSrc(src);
        };
      }
    };

    if (IntersectionObserver) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(imageRef.current);
          }
        });
      });
      observer.observe(imageRef.current);
    } else {
      // Fallback for browsers that do not support IntersectionObserver
      loadImage();
    }

    return () => {
      if (observer && imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src, imageSrc]);

  return <img ref={imageRef} src={imageSrc} alt={alt} />;
};

export default LazyImage;
