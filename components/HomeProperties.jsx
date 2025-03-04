import connectDB from '@/config/database';
import Property from '@/models/Property';
import PropertyCard from '@/components/PropertyCard';
import { FaQuestionCircle } from 'react-icons/fa';
import Link from 'next/link';

const HomeProperties = async () => {
  await connectDB();
  const properties = await Property.find({}).lean();
  const recentProperties = await Property.find({}).sort({ createdAt: -1 }).limit(3).lean();
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent properties</h2>
          {properties.length === 0 ? (
            <div className="container m-auto max-w-xl py-12">
              <div className="bg-white px-3 py-12 mb-2 shadow-md rounded-md border m-2 md:m-0">
                <div className="flex justify-center">
                  <FaQuestionCircle className="text-yellow-500 text-8xl fa-5x" />
                </div>
                <div className="text-center">
                  <h1 className="text-3xl font-bold mt-4 mb-2">Properties not found</h1>
                  <p className="text-gray-500 text-xl mb-10"></p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {properties.length != 0 && (
        <section className="m-auto max-w-lg my-6 px-6">
          <Link
            href="/properties"
            className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
          >
            View All Properties
          </Link>
        </section>
      )}
    </>
  );
};

export default HomeProperties;
