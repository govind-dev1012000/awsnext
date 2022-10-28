// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp
import { AppProps } from "next/app"
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react" // highlight-line

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // highlight-start
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    // highlight-end
  )
}
