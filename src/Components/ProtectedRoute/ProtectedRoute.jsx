import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";

export default function ProtectedRoute({ children }) {
  const { isLogin } = useContext(UserContext);

  if (isLogin) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
