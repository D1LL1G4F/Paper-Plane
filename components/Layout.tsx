import styled from "styled-components";
import Grid from "@kiwicom/orbit-components/lib/utils/Grid";

const PageGrid = styled(Grid)`
  width: 100%;
  min-height: 100%;
  height: fit-content;
  background: ${({ theme }) => theme.orbit.paletteCloudLight};
`;

const PageContent = styled.aside`
  background: ${({ theme }) => theme.orbit.paletteWhite};
  padding: ${({ theme }) => theme.orbit.spaceXLarge};
`;

const layoutOptions = {
  maxWidth: "100%",
  columns: "2fr minmax(272px, 5fr)",
};

type LayoutProps = {
  children: JSX.Element;
  sidebar: JSX.Element;
};

const Layout = ({ sidebar, children }: LayoutProps): JSX.Element => {
  return (
    <PageGrid {...layoutOptions}>
      <Grid rows="1fr auto auto">{sidebar}</Grid>
      <PageContent>{children}</PageContent>
    </PageGrid>
  );
};

export default Layout;
