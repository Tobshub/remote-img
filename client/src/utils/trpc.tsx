import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import  { type AppRouter } from "@server/api/router";
import { PropsWithChildren } from "react";
import { type Context } from "@server/config/trpc";
import { serverUrl } from "@/data/url";
import clientToken from "./token";

/**
 * trpc react handler
 *
 * interfaces server-side api
 */
export const trpc = createTRPCReact<AppRouter, Context>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30 /* 30 seconds */,
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: serverUrl + "/api",
      headers() {
        return {
          // api token
          authorization: clientToken.get() ?? undefined,
        };
      },
    }),
  ],
});

/** `trpc.Provider` & `QueryClientProvider` wrapper */
export function TRPCProvider({ children }: PropsWithChildren) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
