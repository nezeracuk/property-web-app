import Link from 'next/link';
import { FaArrowCircleRight } from 'react-icons/fa';
import { FaArrowCircleLeft } from 'react-icons/fa';

const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 ? (
        <Link href={`/properties?page=${page - 1}`} className="cursor-pointer">
          <FaArrowCircleLeft />
        </Link>
      ) : null}
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={`/properties?page=${page + 1}`} className="cursor-pointer">
          <FaArrowCircleRight />
        </Link>
      ) : null}
    </section>
  );
};

export default Pagination;
