import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { saveStorage, getStorage } from "../utils/localStorage";
import axios from "axios";
import { toast } from "react-toastify";
import getTimeExpToken from "../utils/jwt";

const useAuthStore = create(
  devtools((set) => ({
    user: null,
    token: null, //jwt
    isLogged: false,

    // login: async (email, password, callback) => {
    login: async (email, password) => {
      try {
        const user = {
          email,
          password,
        };
        const response = await axios.post(
          "https://json-server-vercel-eosin-tau.vercel.app/login",
          user
        );
        if (response.status === 200) {
          //la API esta devolviendo al loguearse:
          /**
         * {
              "accessToken": "",
              "user": {
                  "email": "",
                  "name": ""
              }
          }
         */
          const { accessToken, user } = response.data;
          saveStorage("token", accessToken);
          // getTimeExpToken(accessToken);
          set(
            { user, token: accessToken, isLogged: true },
            false,
            "auth/Login"
          );
          toast.success(`Bienvenido ${user.name}!!`);
          // callback();
        }
      } catch (error) {
        toast.error("Hubo un error revise sus datos");
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      set({ token: null, isLogged: false, user: null }, false, "auth/Logout");
      toast.info("Sesión cerrada");
    },
    verifyAuth: () => {
      const token = getStorage("token");
      if (!token) return;

      try {
        const { isTokenValid, email } = getTimeExpToken(token);
        if (isTokenValid) {
          set(
            {
              token,
              isLogged: true,
              user: {
                name: null,
                email: email,
              },
            },
            false,
            "auth/verifyAuth"
          );
        } else {
          localStorage.removeItem("token");
          set(
            { token: null, isLogged: false, user: null },
            false,
            "auth/verifyAuth"
          );
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
          set(
            { token: null, isLogged: false, user: null },
            false,
            "auth/verifyAuth"
          );
      }
    },
  }))
);

export default useAuthStore;
