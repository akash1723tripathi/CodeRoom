import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react"; // Import Clerk Auth
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios"; // Import your fixed Axios instance

// --- 1. Create Session ---
export const useCreateSession = () => {
  const { getToken } = useAuth(); // Get the token helper

  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: async (data) => {
      const token = await getToken(); // Get fresh token
      const res = await axiosInstance.post("/sessions", data, {
        headers: { Authorization: `Bearer ${token}` }, // Attach token
      });
      return res.data;
    },
    onSuccess: () => toast.success("Session created successfully!"),
    onError: (error) => toast.error(error.response?.data?.message || "Failed to create room"),
  });
};

// --- 2. Get Active Sessions ---
export const useActiveSessions = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["activeSessions"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axiosInstance.get("/sessions/active", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
};

// --- 3. Get Recent Sessions ---
export const useMyRecentSessions = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axiosInstance.get("/sessions/my-recent", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
};

// --- 4. Get Session By ID ---
export const useSessionById = (id) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const token = await getToken();
      const res = await axiosInstance.get(`/sessions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!id && !!getToken, // Only run if we have an ID
    refetchInterval: 5000, 
  });
};

// --- 5. Join Session ---
export const useJoinSession = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["joinSession"],
    mutationFn: async (sessionId) => {
      const token = await getToken();
      // Assuming endpoint is POST /sessions/:id/join
      const res = await axiosInstance.post(`/sessions/${sessionId}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => toast.success("Joined session successfully!"),
    onError: (error) => toast.error(error.response?.data?.message || "Failed to join session"),
  });
};

// --- 6. End Session ---
export const useEndSession = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["endSession"],
    mutationFn: async (sessionId) => {
      const token = await getToken();

      // FIX 1: Use .post() instead of .delete()
      // FIX 2: Add "/end" to the URL
      const res = await axiosInstance.post(
        `/sessions/${sessionId}/end`, // <--- Correct URL
        {}, // Empty body for POST requests
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Session ended successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to end session");
    },
  });
};