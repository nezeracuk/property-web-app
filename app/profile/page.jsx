import Image from 'next/image';
import Property from '@/models/Property';
import connectDB from '@/config/database';
import { getSessionUser } from '@/utils/getSessionUser';
import profileDefault from '@/assets/images/profile.png';
import ProfileProperties from '@/components/ProfileProperties';
import { converToSerializableObject } from '@/utils/convertToObject';

const ProfilePage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;
  if (!userId) {
    throw new Error('User ID required');
  }

  const propertiesDocs = await Property.find({ owner: userId }).lean();
  const properties = propertiesDocs.map(converToSerializableObject);
  return (
    <div>
      <section className="bg-blue-50 px-4 sm:px-6">
        <div className="container mx-auto py-12 md:py-24">
          <div className="bg-white px-4 sm:px-6 py-6 sm:py-8 mb-4 shadow-md rounded-md border">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center md:text-left">Your Profile</h1>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 px-4 sm:px-6 md:px-8 mb-8 md:mb-0">
                <div className="mb-4 flex justify-center md:justify-start">
                  <Image
                    className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 rounded-full"
                    src={sessionUser.user.image || profileDefault}
                    width={200}
                    height={200}
                    alt="User"
                  />
                </div>

                <h2 className="text-xl sm:text-2xl mb-3 text-center md:text-left">
                  <span className="font-bold block">Name: </span>
                  <span className="break-words">{sessionUser.user.name}</span>
                </h2>
                <h2 className="text-xl sm:text-2xl text-center md:text-left">
                  <span className="font-bold block">Email: </span>
                  <span className="break-words">{sessionUser.user.email}</span>
                </h2>
              </div>

              <div className="w-full md:w-3/4 md:pl-4 mt-8 md:mt-0">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center md:text-left">Your Listings</h2>
                <ProfileProperties properties={properties} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
