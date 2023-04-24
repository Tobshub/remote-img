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
    loader: async ({request}) => {
      const request_url = new URL(request.url);
      let success_redirect = request_url.searchParams.get("cb");
      return {success_redirect: success_redirect ? decodeURIComponent(success_redirect) : null};
    },
    element: <AuthPage />,
  },
  {
    path: "/",
    loader: async ({request}) => {
      const token = clientToken.get();
      if (!token) {
        const intended_url = request.url;
        return redirect(`/auth?cb=${encodeURIComponent(intended_url)}`);
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
