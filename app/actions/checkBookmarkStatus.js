'use server';

import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

async function checkBookmarkStatus(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || (!sessionUser.userId && !sessionUser._id)) {
    return { error: 'You must be logged in to bookmark a property' };
  }

  const userId = sessionUser.userId || sessionUser._id;
  const user = await User.findById(userId);

  if (!user) {
    return { error: 'User not found' };
  }

  let isBookmarked = user.bookmarks.includes(propertyId);

  return {
    isBookmarked,
  };
}

export default checkBookmarkStatus;
