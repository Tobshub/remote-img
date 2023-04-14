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
import IndexPage from "./pages";
import ImagesPage from "./pages/images";

const router = createBrowserRouter([
  {
    path: "auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    loader: async () => {
      const token = clientToken.get();
      if (!token) {
        return redirect("/auth");
      }
      return token;
    },
    children: [
      {
        path: "upload",
        element: <UploadPage />,
      },
      // TODO: create page to view all images
      {
        path: "images",
        element: <ImagesPage />,
      },
    ],
  },
  {
    index: true,
    element: <IndexPage />,
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
