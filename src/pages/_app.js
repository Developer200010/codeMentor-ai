import "../styles/globals.css";
import Head from 'next/head';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" /> {/* Adjust href if your file name differs */}
      </Head>
      <Component {...pageProps} />
    </>
  )
}
