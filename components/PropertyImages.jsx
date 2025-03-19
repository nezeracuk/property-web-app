'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { useEffect } from 'react';

const PropertyImages = ({ images }) => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .pswp__img {
        object-fit: contain !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const options = {
    imageClickAction: 'zoom',
    wheelToZoom: true,
    showHideAnimationType: 'fade',
    pswpModule: () => import('photoswipe'),
    bgOpacity: 0.9,
    preloaderDelay: 0,
    paddingFn: () => ({ top: 30, bottom: 30, left: 30, right: 30 }),
    fit: 'contain',
    allowPanToNext: false,
    initialZoomLevel: 0.8,
    getDoubleTapZoom: (isMouseClick, item) => 1.5,
    secondaryZoomLevel: 1.5,
    maxZoomLevel: 3,
    showHideOpacity: true,
  };

  return (
    <Gallery options={options} withCaption>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
              alt="Property image"
              cropped={false}
            >
              {({ ref, open }) => (
                <Image
                  src={images[0]}
                  alt=""
                  ref={ref}
                  onClick={open}
                  className="object-contain h-[400px] w-full rounded-xl cursor-pointer"
                  width={1800}
                  height={400}
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="col-span-1">
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1000"
                    height="600"
                    alt={`Property image ${index + 1}`}
                    cropped={false}
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt=""
                        width={1800}
                        height={400}
                        priority={true}
                        className="object-contain h-[400px] w-full rounded-xl cursor-pointer"
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
