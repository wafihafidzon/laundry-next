import '@/styles/globals.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    // <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    // </ChakraProvider>
  );
}
