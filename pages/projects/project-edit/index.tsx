import type { NextPage } from "next";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Layout from "../../../components/Layout";
import Box from "@kiwicom/orbit-components/lib/Box";
import { Controller, useForm } from "react-hook-form";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import { Separator } from "@kiwicom/orbit-components";
import Button from "@kiwicom/orbit-components/lib/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "@kiwicom/orbit-components/lib/Select";
import Illustration, {
  Props as IllustrationProps,
} from "@kiwicom/orbit-components/lib/Illustration";
import illustrations from "../../../utils/illustations";

import { ApiMock } from "../../../utils/types";
import { useState } from "react";
import AddNewAPIModal from "../../../components/AddNewAPIModal";
import { Plus } from "@kiwicom/orbit-components/lib/icons";

type ProjectEditForm = {
  projectName: string;
  projectDescription: string;
  illustration: IllustrationProps["name"];
  apiMockCollection: Array<ApiMock>;
};

const schema = z.object({
  projectName: z.string().min(1, { message: "Required" }),
  projectDescription: z.string().min(1, { message: "Required" }),
  illustration: z.string().min(1, { message: "Required" }),
});

const ProjectEdit: NextPage = () => {
  const { handleSubmit, watch, control } = useForm<ProjectEditForm>({
    resolver: zodResolver(schema),
  });
  const [isAddNewAPIModalVisible, setIsAddNewAPIModalVisible] =
    useState<boolean>(false);

  const onSubmit = handleSubmit((data) => data);

  return (
    <>
      {isAddNewAPIModalVisible && (
        <AddNewAPIModal onClose={() => setIsAddNewAPIModalVisible(false)} />
      )}
      <Layout
        sidebar={
          <Stack justify="start" direction="column" align="center">
            <Box padding="XLarge" width="100%">
              <Stack direction="column" spacing="XXLarge">
                <Heading type="display">
                  {watch("projectName") || "New Project"}
                </Heading>
                <Heading type="displaySubtitle">
                  {watch("projectDescription") || "Project description..."}
                </Heading>
                {watch("illustration") && (
                  <Stack align="center" justify="center">
                    <Illustration size="large" name={watch("illustration")} />
                  </Stack>
                )}
              </Stack>
            </Box>
          </Stack>
        }
      >
        <form onSubmit={onSubmit}>
          <Stack spacing="XLarge">
            <Stack>
              <Controller
                name="projectName"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    label="Project Name"
                    placeholder="New Project"
                    error={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="projectDescription"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    label="Project Description"
                    placeholder="Project description..."
                    error={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="illustration"
                control={control}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    label="Illustration"
                    placeholder="None"
                    options={illustrations.map((illustration) => ({
                      label: illustration,
                      value: illustration,
                    }))}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </Stack>
            <Separator />
            <Stack direction="row" justify="between" align="center">
              <Heading type="title2">APIs</Heading>
              <Button
                circled
                type="secondary"
                iconLeft={<Plus />}
                onClick={() => setIsAddNewAPIModalVisible(true)}
              >
                Add API
              </Button>
            </Stack>

            <Separator />

            <Stack direction="row-reverse">
              <Button size="large" submit>
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </Layout>
    </>
  );
};

export default ProjectEdit;
