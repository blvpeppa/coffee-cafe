import react from 'react'
import t1 from '../../assets/pricing-1.jpg';
import t2 from '../../assets/pricing-2.jpg';
import t3 from '../../assets/pricing-3.jpg';
export default function Training_home() {
    return (
        <>
         {/* Affordable Tours Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center pb-12 mb-6">
            <div className="w-full md:w-2/3 text-center">
              <h2 className="text-3xl font-bold text-green-800">Affordable Tours</h2>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            {/* Tour Card 1 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${t1})`}}
                ></div>
                <div className="text-center p-6">
                  <span className="block text-gray-600 mb-2">Professional visit</span>
                  <span className="text-2xl font-semibold">
                    <sup className="text-base">$</sup>20
                  </span>
                  <a href="#" className="block mt-4 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded">
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            {/* Tour Card 2 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage:`url(${t2})`}}
                ></div>
                <div className="text-center p-6">
                  <span className="block text-gray-600 mb-2">Academic visit</span>
                  <span className="text-2xl font-semibold">
                    <sup className="text-base">$</sup>400
                  </span>
                  <sub className="block text-sm text-gray-500">/1-30 people</sub>
                  <a href="#" className="block mt-4 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded">
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            {/* Tour Card 3 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${t3})`}}
                ></div>
                <div className="text-center p-6">
                  <span className="block text-gray-600 mb-2">Institutional visit</span>
                  <span className="text-2xl font-semibold">free</span>
                  <a href="#" className="block mt-4 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded">
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            {/* More visits button */}
            <div className="w-full md:w-1/3 px-4"></div>
            <div className="w-full md:w-1/3 px-4">
              <div className="text-center p-6">
                <a
                  href=""
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded inline-block"
                >
                  more visits <span className="ml-2">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}