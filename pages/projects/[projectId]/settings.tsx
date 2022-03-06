import type { NextPage } from "next";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Stack from "@kiwicom/orbit-components/lib/Stack";

const Settings: NextPage = () => {
  return (
    <Stack direction="column" align="center" justify="start">
      <Heading type="display">Project Settings</Heading>
    </Stack>
  );
};

export default Settings;
