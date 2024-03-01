import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import Link from 'next/link';

import '../global.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Julien Cardinal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
