"use server";
import { connectMongo } from "@/lib/db/mongoose";
import Message from "@/lib/models/messages";

const getAllMessages = async (from, to, skip = 0) => {
  await connectMongo();
  try {
    const messages = await Message.find({
      $or: [
        { user_id: to, sender: from },
        { user_id: from, sender: to },
      ],
    })
      .lean()
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(20);
    const plainMessages = JSON.parse(JSON.stringify(messages));
    return plainMessages;
  } catch (error) {
    console.error(error);
  }
};

export default getAllMessages;
