import Heading from "@kiwicom/orbit-components/lib/Heading";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Box from "@kiwicom/orbit-components/lib/Box";
import CallOutBanner from "@kiwicom/orbit-components/lib/CallOutBanner";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Button from "@kiwicom/orbit-components/lib/Button";
import Text from "@kiwicom/orbit-components/lib/Text";
import Settings from "@kiwicom/orbit-components/lib/icons/Settings";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Project } from "../pages/projects";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps): ReactElement => {
  const { push } = useRouter();

  return (
    <CallOutBanner
      key={project.id}
      title=""
      illustration={<Illustration name={project.illustration} />}
      onClick={async () => {
        await push(`projects/${project.id}`);
      }}
    >
      <Stack>
        <Stack direction="row" wrap justify="between">
          <Box width="25vw">
            <Heading type="title2">{project.title}</Heading>
          </Box>
          <Button
            circled
            size="small"
            iconLeft={<Settings />}
            type="white"
            onClick={async (e) => {
              e.stopPropagation();
              await push(`projects/${project.id}/settings`);
            }}
          />
        </Stack>
        <Box width="30vw">
          <Text>{project.description}</Text>
        </Box>
      </Stack>
    </CallOutBanner>
  );
};

export default ProjectCard;
