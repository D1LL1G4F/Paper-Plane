import type { NextPage } from "next";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Layout, { LayoutColumn } from "@kiwicom/orbit-components/lib/Layout";
import Box from "@kiwicom/orbit-components/lib/Box";
import { Props as IllustrationProps } from "@kiwicom/orbit-components/lib/Illustration";

import ProjectCard from "../../components/ProjectCard";
import { Plus } from "@kiwicom/orbit-components/icons";
import Button from "@kiwicom/orbit-components/lib/Button";

export type Project = {
  title: string;
  id: string;
  description: string;
  illustration: IllustrationProps["name"];
  webUrlBase?: {
    primary: string;
    secondary?: Array<string>;
  };
};

export const projects: Array<Project> = [
  {
    title: "Manage My Booking",
    id: "123",
    description: "Refunds, Ancillaries, Check-in, Schedule Changes...",
    illustration: "Lounge",
  },
  {
    title: "Payments",
    id: "3213213",
    description: "Universal payment service",
    illustration: "Money",
  },
  {
    title: "Search",
    id: "2132",
    description: "Search for air and ground transport.",
    illustration: "DesktopSearch",
  },
  {
    title: "Booking",
    id: "132131223",
    description: "Trip booking flow.",
    illustration: "OnlineCheckIn",
  },
];

const Projects: NextPage = () => {
  return (
    <Layout type="MMB">
      <LayoutColumn>
        <Box padding={{ top: "large", bottom: "XLarge" }}>
          <Stack direction="row" justify="between">
            <Heading type="display">Projects</Heading>
            <Button
              circled
              iconLeft={<Plus />}
              title="Create new project"
              type="secondary"
            >
              New Project
            </Button>
          </Stack>
        </Box>
        <Stack
          direction="column"
          align="center"
          justify="start"
          spacing="large"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Stack>
      </LayoutColumn>
    </Layout>
  );
};

export default Projects;
