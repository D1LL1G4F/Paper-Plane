import { ReactElement } from "react";
import type { AppProps } from "next/app";
import styled from "styled-components";
import Grid from "@kiwicom/orbit-components/lib/utils/Grid";
import Navbar from "../components/Navbar";
import ThemeProvider from "@kiwicom/orbit-components/lib/ThemeProvider";
import { defaultTheme } from "@kiwicom/orbit-components";
import "normalize.css/normalize.css";
import { AuthProvider } from "../components/contexts/Auth";
import { QueryClient, QueryClientProvider } from "react-query";
import JSONSchemaFaker from "json-schema-faker";
import Chance from "chance";
import { ReactQueryDevtools } from "react-query/devtools";
import firebase from "../utils/firebase";

const NavContainer = styled.header`
  z-index: 99;
  position: relative;
`;

const GridWrapper = styled(Grid)`
  min-height: 100vh;
`;

// eslint-disable-next-line no-unused-expressions,babel/no-unused-expressions
firebase;
const queryClient = new QueryClient();
JSONSchemaFaker.extend("chance", () => new Chance(42));
JSONSchemaFaker.option({
  minItems: 2,
  maxItems: 2,
  ignoreMissingRefs: true,
  failOnInvalidTypes: false,
  failOnInvalidFormat: false,
  reuseProperties: true,
  alwaysFakeOptionals: true,
  random: () => 0.79,
});

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <GridWrapper rows="64px 1fr">
            <NavContainer>
              <Navbar />
            </NavContainer>
            <Component {...pageProps} />
          </GridWrapper>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
