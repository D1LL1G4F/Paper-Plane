import { ReactElement } from "react";
import type { AppProps } from "next/app";
import styled from "styled-components";
import Grid from "@kiwicom/orbit-components/lib/utils/Grid";
import Navbar from "../components/Navbar";
import ThemeProvider from "@kiwicom/orbit-components/lib/ThemeProvider";
import { defaultTheme } from "@kiwicom/orbit-components";
import "normalize.css/normalize.css";

const NavContainer = styled.header`
  z-index: 99;
  position: relative;
`;

const GridWrapper = styled(Grid)`
  min-height: 100vh;
`;

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GridWrapper rows="64px 1fr">
        <NavContainer>
          <Navbar />
        </NavContainer>
        <Component {...pageProps} />
      </GridWrapper>
    </ThemeProvider>
  );
}

export default MyApp;
