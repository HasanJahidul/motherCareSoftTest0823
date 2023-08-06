import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import {Toaster} from "react-hot-toast"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"

export default function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient();
  useEffect(()=>{

  },[])

  return <>
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
    <Toaster position='top-right' />
  </QueryClientProvider>
  </>
}