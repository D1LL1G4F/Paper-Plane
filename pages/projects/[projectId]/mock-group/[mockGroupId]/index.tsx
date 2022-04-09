import type { NextPage } from "next";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Box from "@kiwicom/orbit-components/lib/Box";
import { Controller, useForm } from "react-hook-form";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import { Separator } from "@kiwicom/orbit-components";
import Button from "@kiwicom/orbit-components/lib/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { mockGroupEditValidationSchema } from "../../../../../utils/validationSchemas";
import { MockGroupEditForm } from "../../../../../utils/types";
import Layout from "../../../../../components/Layout";
import ApiCard from "../../../../../components/ApiCard";

const MockGroupEdit: NextPage = () => {
  const form = useForm<MockGroupEditForm>({
    resolver: zodResolver(mockGroupEditValidationSchema),
  });
  const { basePath } = useRouter();

  const { handleSubmit, watch, control } = form;

  // eslint-disable-next-line no-warning-comments
  // TODO: update to DB
  const onSubmit = handleSubmit((data) => data);

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
            {/* TODO map on data from DB*/}
            {[].map((apiMock, index) => (
              <ApiCard key={index} form={form} {...apiMock} />
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
