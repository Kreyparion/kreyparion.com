import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import Link from 'next/link';

import '../global.css';

import Projects from "./Projects";
import Competitions from "./Competitions";
import Home from "./index";
import References from "./References";
import Header from '../components/Header';
import Footer from '../components/Footer';



export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
