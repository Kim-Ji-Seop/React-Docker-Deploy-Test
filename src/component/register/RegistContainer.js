import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from "styled-components";

import {useEffect, useRef} from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const RegistContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 72px;
  height: calc(100% - 72px);
  width: 100%;
  overflow: scroll;
`

export default function RegistContainer({ children }) {
    const location = useLocation();
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = 0;
        }
    }, [location]);

    return (
        <div>
            <Header />
            <RegistContainerStyled ref={ref}>
                {children}
                <Footer />
            </RegistContainerStyled>
        </div>
    );
}