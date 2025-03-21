import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { FaQuestionCircle } from 'react-icons/fa';
import Link from 'next/link';
import Pagination from '@/components/Pagination';

export default async function PropertiesPage(context) {
  const searchParams = await context.searchParams;

  const pageStr = searchParams?.page || '1';
  const pageSizeStr = searchParams?.pageSize || '9';

  const page = parseInt(pageStr, 10);
  const pageSize = parseInt(pageSizeStr, 10);

  await connectDB();
  const skip = (page - 1) * pageSize;

  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize);
  const showPagination = total > pageSize;
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <section className="bg-blue-50 min-h-screen flex-grow">
            <div className="container m-auto max-w-2xl py-24">
              <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <div className="flex justify-center">
                  <FaQuestionCircle className="text-yellow-500 text-8xl fa-5x" />
                </div>
                <div className="text-center">
                  <h1 className="text-3xl font-bold mt-4 mb-2">Properties not found</h1>
                  <p className="text-gray-500 text-xl mb-10"></p>
                  <Link href="/" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded">
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-grow"></div>
          </section>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && <Pagination page={page} pageSize={pageSize} totalItems={total} />}
      </div>
    </section>
  );
}
