import { Navigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useAuthStore();

  return (
    <>
      { isLogged ? children : <Navigate to='/' />}
    </>
  )
}

export default ProtectedRoute