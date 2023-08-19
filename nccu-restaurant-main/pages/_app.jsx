import "../styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
     
      <Component {...pageProps}></Component>
    </>
  );
}

export default MyApp;
