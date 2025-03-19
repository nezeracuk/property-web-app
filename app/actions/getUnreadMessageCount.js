'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

async function getUnreadMessageCount(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || (!sessionUser.userId && !sessionUser._id)) {
    return { error: 'You must be logged in to bookmark a property' };
  }

  const userId = sessionUser.userId || sessionUser._id;

  const count = await Message.countDocuments({ recipient: userId, read: false });
  return { count };
}

export default getUnreadMessageCount;
