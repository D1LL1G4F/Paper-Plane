import { ReactElement } from "react";
import type { AppProps } from "next/app";
import styled from "styled-components";
import Grid from "@kiwicom/orbit-components/lib/utils/Grid";
import Navbar from "../components/Navbar";
import ThemeProvider from "@kiwicom/orbit-components/lib/ThemeProvider";
import { defaultTheme } from "@kiwicom/orbit-components";
import firebase from "firebase/compat/app";
import "normalize.css/normalize.css";
import firebaseConfig from "../utils/firebaseConfig";
import { AuthProvider } from "../components/contexts/Auth";

const NavContainer = styled.header`
  z-index: 99;
  position: relative;
`;

const GridWrapper = styled(Grid)`
  min-height: 100vh;
`;

firebase.initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <GridWrapper rows="64px 1fr">
          <NavContainer>
            <Navbar />
          </NavContainer>
          <Component {...pageProps} />
        </GridWrapper>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
