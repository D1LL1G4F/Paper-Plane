import type { NextPage } from "next";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Box from "@kiwicom/orbit-components/lib/Box";
import { Controller, useForm, useWatch } from "react-hook-form";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import { Separator } from "@kiwicom/orbit-components";
import Button from "@kiwicom/orbit-components/lib/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { mockGroupEditValidationSchema } from "../../../../../utils/validationSchemas";
import { MockGroupEditForm } from "../../../../../utils/types";
import Layout from "../../../../../components/Layout";
import ApiCard from "../../../../../components/ApiCard";
import useMockGroupMutation from "../../../../../utils/hooks/useMockGroupMutation";
import useGetMockGroupDocument from "../../../../../utils/hooks/useGetMockGroupDocument";
import { useEffect } from "react";

const MockGroupEdit: NextPage = () => {
  const form = useForm<MockGroupEditForm>({
    mode: "all",
    resolver: zodResolver(mockGroupEditValidationSchema),
    defaultValues: {
      apiMockCollection: [],
    },
  });
  const {
    basePath,
    query: { projectId, mockGroupId },
    push,
  } = useRouter();

  const { handleSubmit, watch, control, reset } = form;

  const mockGroupDocument = useGetMockGroupDocument(
    projectId as string,
    mockGroupId as string | undefined
  );
  const { mutate } = useMockGroupMutation(
    projectId as string,
    mockGroupId as string | undefined
  );

  const onSubmit = handleSubmit((data) => {
    mutate(data);
    push(`/projects/${projectId}`);
  });

  const apiMockCollection = useWatch({ name: "apiMockCollection", control });

  useEffect(() => {
    if (projectId && !mockGroupDocument?.isLoading) {
      const project = mockGroupDocument?.data?.data();
      reset(project);
    }
  }, [projectId, mockGroupDocument?.isLoading]);

  return (
    <>
      <Layout
        sidebar={
          <Stack justify="start" direction="column" align="center">
            <Box padding="XLarge" width="100%">
              <Stack direction="column" spacing="XXLarge">
                <Heading type="display">
                  {watch("mockGroupName") || "My new mock group"}
                </Heading>
                <Heading type="displaySubtitle">
                  {watch("mockGroupDescription") || "description..."}
                </Heading>
              </Stack>
            </Box>
          </Stack>
        }
      >
        <form onSubmit={onSubmit}>
          <Stack spacing="XLarge">
            <Stack>
              <Controller
                name="mockGroupName"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    label="Mock Group Name"
                    placeholder="My new mock group"
                    error={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="mockGroupDescription"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    label="Mock Group Description"
                    placeholder="description..."
                    error={fieldState.error?.message}
                  />
                )}
              />
            </Stack>
            <Separator />
            <Heading type="title2">Client</Heading>
            <Controller
              name="clientUrl"
              control={control}
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  label="Client URL"
                  placeholder="https://paper-plane-app.com"
                  suffix={
                    <Box padding={{ right: "large" }}>
                      {`?${
                        watch("apiOverrideUrlParamName") || "custom_api"
                      }=${basePath}`}
                    </Box>
                  }
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="apiOverrideUrlParamName"
              control={control}
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  label="URL query parameter for mock API"
                  placeholder="custom_api"
                  error={fieldState.error?.message}
                />
              )}
            />
            <Separator />
            <Stack direction="row" justify="between" align="center">
              <Heading type="title2">Server</Heading>
            </Stack>
            {apiMockCollection.map((apiMock, index) => (
              <ApiCard
                fieldArrayName={`apiMockCollection.${index}.endpointMockCollection`}
                key={index}
                control={control}
                {...apiMock}
              />
            ))}
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

export default MockGroupEdit;
