import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  return (
    <div className="rounded-xl shadow-md relative">
      <Link href={`/properties/${property._id}`}>
        <Image
          src={property.images[0]}
          width={500}
          height={300}
          alt=""
          className="w-full h-[300px] rounded-t-xl object-contain"
        />
      </Link>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {property.rates.monthly
            ? `$${property.rates.monthly}/mo`
            : property.rates.weekly
            ? `$${property.rates.weekly}/wk`
            : `$${property.rates.nightly}/night`}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="md:hidden lg:inline mr-1" />
            {property.beds}
            <span className="md:hidden lg:inline ml-1">Beds</span>
          </p>
          <p>
            <FaBath className="md:hidden lg:inline" /> {property.baths}
            <span className="md:hidden lg:inline ml-1">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="md:hidden lg:inline" />
            {property.square_feet}
            <span className="md:hidden lg:inline ml-1">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates.nightly > 1 && (
            <p>
              <FaMoneyBill className="md:hidden lg:inline mr-1" />
              {property.rates.nightly} Nigthly
            </p>
          )}
          {property.rates.weekly > 1 && (
            <p>
              <FaMoneyBill className="md:hidden lg:inline mr-1" />
              {property.rates.weekly} Weekly
            </p>
          )}
          {property.rates.monthly > 1 && (
            <p>
              <FaMoneyBill className="md:hidden lg:inline mr-1" />
              {property.rates.monthly} Monthly
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-orange-700 mt-1" />
            <span className="text-orange-700">
              {property.location.city} | {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
