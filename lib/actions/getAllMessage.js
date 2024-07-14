"use server";
import { connectMongo } from "@/lib/db/mongoose";
import Message from "@/lib/models/messages";

const getAllMessages = async (from, to) => {
  await connectMongo();
  try {
    const messages = await Message.find({
      $or: [
        { user_id: to, sender: from },
        { user_id: from, sender: to },
      ],
    }).lean();
    return messages;
  } catch (error) {
    console.error(error);
  }
};

export default getAllMessages;
