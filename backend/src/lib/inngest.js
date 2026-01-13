import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "code-room" });

const syncUser = inngest.createFunction(
      { id: "sync-user" },
      { event: "clerk/user.created" },
      async ({ event }) => {
            await connectDB();

            const { id, email_addresses, first_name, last_name, image_url } = event.data;

            const userData = {
                  clerkId: id,
                  email: email_addresses[0]?.email_address,
                  name: `${first_name || ""} ${last_name || ""}`,
                  profileImage: image_url,
            };

            // --- CHANGED FROM User.create() TO findOneAndUpdate ---
            // This fixes the crash. If user exists, update them. If not, create them.
            await User.findOneAndUpdate(
                  { clerkId: id },  // Search criteria
                  userData,         // Data to update/insert
                  { upsert: true, new: true } // Options: upsert creates if missing
            );

            // Now this will run even if the user was already in MongoDB
            await upsertStreamUser({
                  id: userData.clerkId.toString(),
                  name: userData.name,
                  image: userData.profileImage,
            });
      }
);

const deleteUserFromDB = inngest.createFunction(
      { id: "delete-user-from-db" },
      { event: "clerk/user.deleted" },
      async ({ event }) => {
            await connectDB();

            const { id } = event.data;
            await User.deleteOne({ clerkId: id });

            await deleteStreamUser(id.toString());
      }
);

export const functions = [syncUser, deleteUserFromDB];