import { useState } from "react";
import useGetAxios from "../../hooks/useGetAxios";
import CustomCarousel from "./components/CustomCarousel";
import ProductCard from "./components/ProductCard";
import Loading from "../ui/components/Loading";
import CategoryFilter from "./components/CategoryFilter";
import useCategoryStore from "../../stores/useCategoryStore";
import PaginationProducts from "./components/PaginationProducts";

const ProductPage = () => {
  const [page, setPage] = useState(1);
  
  const { categorySelected } = useCategoryStore();
  
  const categoryParam = categorySelected ? `categoryId=${categorySelected.id}` : "";

  const limitProducts = 8;

  const URL = `https://json-server-vercel-eosin-tau.vercel.app/products?${categoryParam}&_limit=${limitProducts}&_page=${page}`;

  //totalCount es la cantidad total del productos que tenemos
  const { data, loading, error, totalCount } = useGetAxios(URL);

  const totalPages = Math.ceil(Number(totalCount)/limitProducts); //calculamos la cantidad de paginas a mostrar
  // console.log("totalPages index.js", totalPages)
  if (error) {
    return <p>
      Ocurrio un error, actualice o contactesé con soporte
      </p>;
  }

  if(loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto lg:container">
      <CustomCarousel />
      <h1 className="text-3xl my-6">Productos de temporada</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-full flex justify-between">
          <CategoryFilter />
          <PaginationProducts 
            totalPages={totalPages} 
            setPage={setPage}
          />
        </div>
        {data
          ? data.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          : null}
      </div>
    </div>
  );
};

export default ProductPage;
