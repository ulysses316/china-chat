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
    })
      .lean()
      .sort({ $natural: -1 })
      //.skip(0)
      //.limit(2);
      // TODO: El limite debe de ser 30, pero dejemoslo en 2 ahorita mientras hacemos pruebas.
    return messages;
  } catch (error) {
    console.error(error);
  }
};

export default getAllMessages;
