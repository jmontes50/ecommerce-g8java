import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const useCategoryStore = create(
  devtools((set) => ({
    categories: [],
    categorySelected: null,
    setCategorySelected: (category) =>
      set(
        { categorySelected: category },
        false,
        "category/setCategorySelected"
      ),
    setCategories: (categories) => set({ categories: categories }),
    requestCategories: async () => {
      try {
        const result = await axios.get(
          "https://json-server-vercel-eosin-tau.vercel.app/categories"
        );
        if (result.status === 200) {
          set({ categories: result.data }, false, "category/requestCategories");
        } else {
          throw new Error("Error en la petición de categorias");
        }
      } catch (error) {
        console.log("Error al obtener las categorias", error);
        return state;
      }
    },
  }))
);

export default useCategoryStore;
