import React from 'react';
import g1 from '../../assets/gallery-1.jpg';
import g2 from '../../assets/gallery-2.jpg';
import g3 from '../../assets/gallery-3.jpg';
import g4 from '../../assets/gallery-4.jpg';
import g5 from '../../assets/gallery-5.jpg';
import g6 from '../../assets/gallery-6.jpg';
import g7 from '../../assets/gallery-7.jpg';
//import g8 from '../../assets/gallery-2.jpg';
//import g9 from '../../assets/gallery-3.jpg';
const Gallery = () => {
  const galleryItems = [
    { img: g1},
    { img: {g2}},
    { img: {g3}},
    { img: {g4}},
    { img: {g5}},
    { img: {g6}},
    { img: {g7}},
    { img: {g7}},
    { img: {g7}},
  ];

  return (
    <>
      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
        <h1 className="text-lg font-semibold h-20 p-4  text-center">Our Gallery Collection</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                <div
                  className="h-64 bg-cover bg-center flex items-end transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(/images/${item.img})` }}
                >
                  <a
                    href={`/images/${item.img}`}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <span className="text-2xl">
                      <i className="fa fa-expand"></i>
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <ul className="flex space-x-2 text-gray-700">
              <li><a href="#" className="px-3 py-1 border rounded hover:bg-gray-200">&lt;</a></li>
              <li className="px-3 py-1 border rounded bg-black text-white">1</li>
              <li><a href="#" className="px-3 py-1 border rounded hover:bg-gray-200">2</a></li>
              <li><a href="#" className="px-3 py-1 border rounded hover:bg-gray-200">3</a></li>
              <li><a href="#" className="px-3 py-1 border rounded hover:bg-gray-200">4</a></li>
              <li><a href="#" className="px-3 py-1 border rounded hover:bg-gray-200">5</a></li>
              <li><a href="#" className="px-3 py-1 border rounded hover:bg-gray-200">&gt;</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
