import { useNavigate } from "react-router-dom";

const AnimatedLink = ({ to, children, ...rest }) => {
  const navigate = useNavigate();

  const handleAnchor = (event) => {
    event.preventDefault();
    // console.log("Click en <a>");
    //estamos usando viewTransition para cambiar de vistas de forma más elegante.
    //Esta API, no esta disponible para Firefox, asi que verificamos
    //que el método/prop startViewTransition exista para recién usarlo
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(to);
      });
    } else {
      navigate(to);//Esto es para firefox
    }
  };

  return (
    <a href={to} onClick={handleAnchor} {...rest}>
      {children}
    </a>
  );
};

export default AnimatedLink;
