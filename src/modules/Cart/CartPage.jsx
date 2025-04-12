import { useState } from "react";
import useCartStore from "../../stores/useCartStore";
import ButtonsQty from "../ui/components/ButtonsQty";
import { useForm } from "react-hook-form";
import Map from "../ui/components/Map";

const CartPage = () => {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      label: "Carrito",
      isSelected: true,
    },
    {
      id: 2,
      label: "Mis datos",
      isSelected: false,
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { cart, changeQtyProduct } = useCartStore();

  const total = cart.reduce(
    (acum, item) => acum + item.precio * item.qtyCart,
    0
  );

  const COSTO_DELIVERY = 5;

  const incrementQty = (product, qtyCart) => {
    changeQtyProduct(product, qtyCart + 1);
  };

  const decrementQty = (product, qtyCart) => {
    changeQtyProduct(product, qtyCart - 1);
  };

  const handleClickTab = (id) => {
    const tabsTemp = [...tabs];
    const changedTabs = tabsTemp.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setTabs(changedTabs);
  };

  const handleConfirmForm = (data) => {
    console.log(data);
  };

  return (
    <div className="px-4 py-10 mx-auto container max-w-7xl">
      <h2 className="text-3xl font-semibold mb-5">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="col-span-2">
          <div role="tablist" className="tabs tabs-border mb-4">
            {/* <a role="tab" className="tab">Tab 1</a>
            <a role="tab" className="tab tab-active">Tab 2</a> */}
            {tabs.map((item) => (
              <a
                key={item.id}
                role="tab"
                className={`tab ${item.isSelected ? "tab-active" : ""}`}
                onClick={() => {
                  handleClickTab(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className={tabs[0].isSelected ? "block" : "hidden"}>
            <table className="w-full">
              <thead className="text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Producto</th>
                  <th className="px-6 py-3 text-left">Precio Unit.</th>
                  <th className="px-6 py-3 text-left">Cantidad</th>
                  <th className="px-6 py-3 text-left">Sub-total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {cart
                  ? cart.map((prod) => (
                      <tr key={prod.id} className="border-b-2">
                        <td className="px-6 py-4">{prod.nombre}</td>
                        <td className="px-6 py-4">
                          S/ {prod.precio.toFixed(2)}
                        </td>
                        {/* <td className="px-6 py-4">{prod.qtyCart}</td> */}
                        <td className="px-6 py-4">
                          <ButtonsQty
                            qtyCart={prod.qtyCart}
                            incrementQty={() => {
                              incrementQty(prod, prod.qtyCart);
                            }}
                            decrementQty={() => {
                              decrementQty(prod, prod.qtyCart);
                            }}
                          />
                        </td>
                        <td className="px-6 py-4">
                          S/ {(prod.qtyCart * prod.precio).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
          <div className={tabs[1].isSelected ? "block" : "hidden"}>
            <h3 className="text-lg font-semibold mb-3">Ingrese sus datos</h3>
            <form onSubmit={handleSubmit(handleConfirmForm)}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Nombres y Apellidos:
                </legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="ej. Juan Perez"
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && (
                  <p className="fieldset-label text-red-600">
                    El campo es obligatorio.
                  </p>
                )}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Dirección</legend>
                <input
                  type="text"
                  placeholder="Av. Arenales"
                  className="input w-full"
                  {...register("address", {
                    required: "La dirección es obligatoria",
                    minLength: {
                      value: 8,
                      message: "La dirección requiere al menos 8 letras",
                    },
                    maxLength: {
                      value: 30,
                      message: "La dirección no puede ser más de 30 letras",
                    },
                  })}
                />
                {errors.address && (
                  <p className="field-label text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </fieldset>
              {/* Mapa leaflet */}
              <Map />
              <button className="btn btn-success">Confirmar</button>
            </form>
          </div>
        </div>
        {/* descuento */}
        <div className="col-span-1 border-2">
          <div className="flex justify-between p-6 font-bold border-b-2">
            <span>Subtotal</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
          <div className="p-6 border-b-2">
            <input
              type="text"
              placeholder="Ingrese el código de descuento"
              className="p-4 border-2 border-black rounded-s-xl outline-none h-[60px]"
            />
            <button className="px-8 py-4 text-white bg-black rounded-e-xl h-[60px]">
              Aplicar
            </button>
          </div>
          <div className="flex justify-between text-sm p-6">
            <span>Costo del delivery</span>
            <span>S/ {COSTO_DELIVERY.toFixed(2)}</span>
          </div>
          <div className="flex justify-between p-6">
            <span>Total</span>
            <span>S/ {total + COSTO_DELIVERY}</span>
          </div>
          <div className="px-6 mb-6">
            <button className="btn btn-neutral btn-xl w-full">
              Realizar checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
