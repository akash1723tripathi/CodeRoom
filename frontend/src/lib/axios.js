import { useAuth } from "@clerk/clerk-react"; // Import this hook
import axiosInstance from "../lib/axios"; // Import your axios file

const Dashboard = () => {
      const { getToken } = useAuth(); // Get the token helper

      const handleStartSession = async () => {
            try {
                  // 1. Get the real security token
                  const token = await getToken();

                  // 2. Send the request with the token in the Headers
                  const response = await axiosInstance.post("/sessions",
                        {
                              // ... any data you need to send ...
                        },
                        {
                              headers: {
                                    Authorization: `Bearer ${token}` // <--- THIS FIXES THE 302 ERROR
                              }
                        }
                  );

                  console.log("Success:", response.data);
                  // Add your navigation logic here (e.g., navigate(`/room/${response.data.roomId}`))

            } catch (error) {
                  console.error("Failed to create session:", error);
            }
      };

      return (
            <button onClick={handleStartSession}>Start Session</button>
      );
};

export default Dashboard;