import { ReactElement } from "react";
import transition from "@kiwicom/orbit-components/lib/utils/transition";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import LinkList from "@kiwicom/orbit-components/lib/LinkList";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import GitHubLogo from "/public/GitHub-Logo-32x32.png";
import PaperPlaneLogo from "/public/PaperPlaneLogo640x464.png";
import styled, { css } from "styled-components";
import Image from "next/image";

const StyledNavigationBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 52px;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.orbit.paletteProductDark};
  box-shadow: ${({ theme }) => theme.orbit.boxShadowFixed};
  padding: ${({ theme }) => theme.orbit.spaceSmall};
  box-sizing: border-box;
  z-index: 700;
  transition: ${transition(["transform"], "normal", "ease-in-out")};
  ${mq.tablet(css`
    height: 64px;
  `)};
`;

const Navbar = (): ReactElement => (
  <StyledNavigationBar>
    <Stack direction="row" align="center" justify="center">
      <TextLink href="/">
        <Image
          src={PaperPlaneLogo}
          width={80}
          height={58}
          alt="Paper Plane Logo"
        />
      </TextLink>
      <LinkList direction="row">
        <TextLink type="white" href="/projects">
          Projects
        </TextLink>
        <TextLink type="white" href="/projects/MyProject">
          [WIP] My Project
        </TextLink>
      </LinkList>
      <Stack inline>
        <LinkList direction="row">
          <TextLink
            type="secondary"
            href="https://github.com/D1LL1G4F/Paper-Plane"
          >
            <Image src={GitHubLogo} alt="GitHub" />
          </TextLink>
        </LinkList>
      </Stack>
    </Stack>
  </StyledNavigationBar>
);

export default Navbar;
