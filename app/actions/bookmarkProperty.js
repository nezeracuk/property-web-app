'use server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId) {
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

  let message;

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = 'Bookmark Removed';
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = 'Bookmark Added';
    isBookmarked = true;
  }

  await user.save();
  revalidatePath('/property/saved');
  return { message, isBookmarked };
}

export default bookmarkProperty;
