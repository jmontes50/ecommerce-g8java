import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isLogged } = useAuthStore();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);
    const { email, password } = data;
    // const goToHome = () => navigate('/');
    // login(email, password, goToHome);
    login(email, password);
  };

  useEffect(() => {
    if(isLogged) {
      navigate('/')
    }
  },[isLogged])

  return (
    <div className="w-full max-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-2 lg:col-span-1 w-full h-[150px] lg:h-[768px]">  
        <img
          src="https://images.unsplash.com/photo-1557777586-f6682739fcf3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image login"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="col-span-2 md:col-span-1 w-full h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full flex justify-center items-center"
        >
          <div className="w-[400px] border-2 rounded p-4 mt-20 md:mt-0">
            <h4 className="font-bold text-xl">Login</h4>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Correo:</legend>
              <input
                type="email"
                className="input w-full"
                placeholder="user@email.com"
                {...register("email", {
                  required: "Este campo es obligatorio",  
                })}
              />
              {errors.email && (
                <p className="fieldset-label text-red-600">
                  {errors.email.message}
                </p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password:</legend>
              <input
                type="password"
                className="input w-full"
                placeholder="Ingrese su contraseña"
                {...register("password", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.password && (
                <p className="fieldset-label text-red-600">
                  {errors.password.message}
                </p>
              )}
            </fieldset>
            <button className="btn btn-accent mt-3 btn-block">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
