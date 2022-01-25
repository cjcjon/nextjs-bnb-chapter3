import Header from "../components/Header"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
    </>
  )
}

export default MyApp
