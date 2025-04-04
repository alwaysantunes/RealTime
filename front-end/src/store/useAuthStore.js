import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import { data } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../../../back-end/src/contollers/auth.controller.js";



export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng:false,
    isUpdatingProfile: false,


    isCheckingAuth: true,

    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/auth/check");
  
        set({ authUser: res.data });
        get().connectSocket();
      } catch (error) {
        console.log("Error in checkAuth:", error);
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account created successfully");
          get().connectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isSigningUp: false });
        }
      },

    logout:async () => {
      try {
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logged out successfully");
        
      } catch (error) {
        toast.error(error.response.data.message);

        
      }
    }

}));