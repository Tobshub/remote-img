import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { TRPCProvider } from "./utils/trpc";
import AuthPage from "./pages/auth";
import clientToken from "./utils/token";
import IndexPage from "./pages";
import { Suspense, lazy } from "react";
const UploadPage = lazy(() => import("./pages/upload"));
const ImagesPage = lazy(() => import("./pages/images"));

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
      <Suspense
        fallback={
          <div>
            <img className="mx-auto" src={"https://tobsmg.onrender.com/img/p_u659o7974g"} height={50} />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </TRPCProvider>
  );
}

export default App;
