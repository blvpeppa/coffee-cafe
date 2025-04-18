import react from 'react'
import g1 from '../../assets/gallery-1.jpg';
import g2 from '../../assets/gallery-2.jpg';
import g3 from '../../assets/gallery-3.jpg';
import {Link} from 'react-router-dom';
export default function Gallery() {
return ( 
<>
 {/* Farm Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center pb-12 mb-6">
            <div className="w-full md:w-2/3 text-center">
              <h2 className="text-3xl font-bold">Farm Gallery</h2>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            {/* Gallery Item 1 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div
                className="relative h-64 bg-cover bg-center flex items-end"
                style={{backgroundImage: `url(${g1})`}}
              >
                <a
                  href="images/gallery-1.jpg"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="bg-white w-full px-4 py-3">
                  <h2 className="text-xl font-semibold">
                    <a href="work-single.html">Rabbit pellets</a>
                  </h2>
                </div>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div
                className="relative h-64 bg-cover bg-center flex items-end"
                style={{ backgroundImage: `url(${g2})`}}
              >
                <a
                  href="images/gallery-2.jpg"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="bg-white w-full px-4 py-3">
                  <h2 className="text-xl font-semibold">
                    <a href="work-single.html">Stock1</a>
                  </h2>
                </div>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div
                className="relative h-64 bg-cover bg-center flex items-end"
                style={{ backgroundImage: `url(${g3})`}}
              >
                <a
                  href="images/gallery-3.jpg"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="bg-white w-full px-4 py-3">
                  <h2 className="text-xl font-semibold">
                    <a href="work-single.html">Stock2</a>
                  </h2>
                </div>
              </div>
            </div>

            {/* More Gallery Button */}
            <div className="w-full md:w-1/3 px-4"></div>
            <div className="w-full md:w-1/3 px-4">
              <div className="text-center p-6">
              <Link to="/gallery" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded inline-block">
                  more on gallery <span className="ml-2">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};