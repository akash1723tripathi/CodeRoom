import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react"; // 1. Import Auth
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import axiosInstance from "../lib/axios"; // 2. Use Axios directly

function useStreamClient(session, loadingSession, isHost, isParticipant) {
      const [streamClient, setStreamClient] = useState(null);
      const [call, setCall] = useState(null);
      const [chatClient, setChatClient] = useState(null);
      const [channel, setChannel] = useState(null);
      const [isInitializingCall, setIsInitializingCall] = useState(true);

      const { getToken } = useAuth(); // 3. Get the Token Helper

      useEffect(() => {
            let videoCall = null;
            let chatClientInstance = null;

            const initCall = async () => {
                  if (!session?.callId) return;
                  if (!isHost && !isParticipant) return;
                  if (session.status === "completed") return;

                  setIsInitializingCall(true);

                  try {
                        // 4. Get the real Clerk Token
                        const clerkToken = await getToken();

                        // 5. Call the CORRECT endpoint with the Token
                        const { data } = await axiosInstance.get("/chat/token", {
                              headers: {
                                    Authorization: `Bearer ${clerkToken}`,
                              },
                        });

                        const { token, userId, userName, userImage } = data;

                        // --- Initialize Stream Video ---
                        const client = await initializeStreamClient(
                              {
                                    id: userId,
                                    name: userName,
                                    image: userImage,
                              },
                              token
                        );
                        setStreamClient(client);

                        videoCall = client.call("default", session.callId);
                        await videoCall.join({ create: true });
                        setCall(videoCall);

                        // --- Initialize Stream Chat ---
                        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
                        chatClientInstance = StreamChat.getInstance(apiKey);

                        await chatClientInstance.connectUser(
                              {
                                    id: userId,
                                    name: userName,
                                    image: userImage,
                              },
                              token
                        );
                        setChatClient(chatClientInstance);

                        const chatChannel = chatClientInstance.channel("messaging", session.callId);
                        await chatChannel.watch();
                        setChannel(chatChannel);

                  } catch (error) {
                        toast.error("Failed to join video call");
                        console.error("Error init call", error);
                  } finally {
                        setIsInitializingCall(false);
                  }
            };

            if (session && !loadingSession) initCall();

            return () => {
                  (async () => {
                        try {
                              if (videoCall) await videoCall.leave();
                              if (chatClientInstance) await chatClientInstance.disconnectUser();
                              await disconnectStreamClient();
                        } catch (error) {
                              console.error("Cleanup error:", error);
                        }
                  })();
            };
      }, [session, loadingSession, isHost, isParticipant, getToken]);

      return {
            streamClient,
            call,
            chatClient,
            channel,
            isInitializingCall,
      };
}

export default useStreamClient;