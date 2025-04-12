import { useEffect } from "react";
import useCategoryStore from "../../../stores/useCategoryStore";

const CategoryFilter = () => {
  const {
    categories,
    setCategorySelected,
    requestCategories,
  } = useCategoryStore();

  const handleSelect = (e) => {
    // console.log(e.target.value);
    if(e.target.value === "all"){
      setCategorySelected(null);
      return;
    }
    const numberCategoryId = Number(e.target.value);
    const categoryFound = categories.find((item) => item.id === numberCategoryId);
    // console.log({ categoryFound });
    setCategorySelected(categoryFound);
  }

  useEffect(() => {
    requestCategories();
  }, []);

  return (
    <div className="col-span-full">
      <select className="select" onChange={handleSelect}>
        <option value="all">Todas las categorías</option>
        {categories.length !== 0
          ? categories.map((category) => (
              <option key={category.id} value={category.id}>{category.nombre}</option>
            ))
          : null}
      </select>
    </div>
  );
};

export default CategoryFilter;
