import {
  LoaderFunctionArgs,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { TRPCProvider } from "./utils/trpc";
import AuthPage from "./pages/auth";
import clientToken from "./utils/token";
import UploadPage from "./pages/upload";

const router = createBrowserRouter([
  {
    path: "auth",
    element: <AuthPage />,
  },
  {
    path: "upload",
    element: <UploadPage />,
    loader: async () => {
      const token = clientToken.get();
      if (!token) {
        return redirect("/auth");
      }
      return token;
    },
  },
  {
    index: true,
    element: <>"Index page"</>,
  },
]);

function App() {
  return (
    <TRPCProvider>
      <RouterProvider router={router} />
    </TRPCProvider>
  );
}

export default App;
