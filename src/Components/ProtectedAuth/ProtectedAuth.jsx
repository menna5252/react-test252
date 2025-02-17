import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedAuth({ children }) {
  const { isLogin } = useContext(UserContext);

  if (isLogin) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}
