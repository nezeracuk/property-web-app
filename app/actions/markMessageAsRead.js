'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function markMessageAsRead(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || (!sessionUser.userId && !sessionUser._id)) {
    return { error: 'You must be logged in to bookmark a property' };
  }

  const userId = sessionUser.userId || sessionUser._id;

  const message = await Message.findById(messageId);
  if (!message) throw new Error('Message not found');

  if (message.recipient.toString() !== userId) {
    throw new Error('You are not authorized to mark this message as read');
  }

  message.read = !message.read;

  revalidatePath('/messages', 'page');
  await message.save();

  return message.read;
}

export default markMessageAsRead;
