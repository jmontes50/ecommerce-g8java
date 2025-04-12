import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useGetAxios from "../../hooks/useGetAxios";
import Loading from "../ui/components/Loading";
import ButtonsQty from "../ui/components/ButtonsQty";
import Stars from "../ui/components/Stars";
import useCartStore from "../../stores/useCartStore";
import useThemeStore from "../../stores/useThemeStore";

const ProductDetailPage = () => {
  const [qtyCart, setQtyCart] = useState(1);

  const { id } = useParams();

  const { data, loading, error } = useGetAxios(
    `https://json-server-vercel-eosin-tau.vercel.app/products/${id}`
  );

  const { cart, addProductToCart } = useCartStore();

  const { theme } = useThemeStore();

  const notify = () => toast.success("Producto agregado!", { theme: theme }); //theme utiliza light y dark igual que el store del tema

  const handleClickAddCart = () => {
    const productToCart = { ...data, qtyCart: qtyCart };
    addProductToCart(productToCart);
    notify();
  };

  const incrementQty = () => {
    if (qtyCart === data.cantidad) return;
    setQtyCart(qtyCart + 1);
  };

  const decrementQty = () => {
    if (qtyCart === 1) return;
    setQtyCart(qtyCart - 1);
  };

  useEffect(() => {
    if (cart) {
      const numberId = Number(id);
      const productExists = cart.find((item) => item.id === numberId);
      if (productExists) {
        setQtyCart(productExists.qtyCart);
      }
    }
  }, [cart]);

  if (error) {
    return <p>Ocurrio un error, actualice o contactesé con soporte</p>;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-4 mx-auto container max-w-7xl">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="w-full max-h-[500px]">
          <img 
            className="object-cover w-full h-full"
            src={data.imagen} 
            alt={data.nombre} 
          />
        </div>
        <div className="my-2">
          <h2 className="text-3xl font-semibold mb-5">{data.nombre}</h2>

          <Stars rating={data.estrellas} />

          <div className="mb-5 text-3xl">
            <span className="me-2">S/ {data.precio_oferta.toFixed(2)}</span>
            <span className="line-through text-slate-400">
              S/ {data.precio.toFixed(2)}
            </span>
          </div>

          <p className="mb-5">{data.descripcion}</p>
          <div className="flex gap-4">
            <ButtonsQty
              qtyCart={qtyCart}
              incrementQty={incrementQty}
              decrementQty={decrementQty}
            />
            <button
              className="btn btn-accent btn-xl px-16"
              onClick={handleClickAddCart}
            >
              Añadir a Carrito
            </button>
          </div>
        </div>
      </div>
      <div className="pt-5 border-t-2 border-slate-300 mt-10">
        <h4 className="mb-5 text-xl font-semibold">Detalles</h4>
        <p className="whitespace-pre-wrap">{data.detalles} </p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
