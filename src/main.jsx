import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "flowbite/dist/flowbite.min.js";
import UserContextProvider from "./Context/UserContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext.jsx";
import WishListContextProvider from "./Context/WishListContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <UserContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <App />
          </WishListContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
