import type { NextPage } from "next";
import styled from "styled-components";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import PaperPlaneLogo from "/public/PaperPlaneLogo1280x929.png";
import Image from "next/image";
import { Box } from "@kiwicom/orbit-components";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.orbit.paletteProductNormal};
  display: flex;
`;

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Stack direction="column" align="center" justify="start">
        <Box maxWidth="90vh">
          <Image src={PaperPlaneLogo} alt="Paper Plane Logo" />
        </Box>
        <Heading inverted type="display">
          Paper Plane
        </Heading>
      </Stack>
    </Wrapper>
  );
};

export default Home;
