import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TRPCProvider } from "./utils/trpc";

const router = createBrowserRouter([]);

function App() {
  return (
    <TRPCProvider>
      <RouterProvider router={router} />
    </TRPCProvider>
  );
}

export default App;
