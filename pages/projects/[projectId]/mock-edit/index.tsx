import type { NextPage } from "next";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Layout from "../../../../components/Layout";
import Box from "@kiwicom/orbit-components/lib/Box";
import Image from "next/image";
import PaperPlaneLogo from "/public/PaperPlaneLogo1280x929.png";
import { Controller, useForm } from "react-hook-form";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import { Separator } from "@kiwicom/orbit-components";
import Button from "@kiwicom/orbit-components/lib/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type MockEditForm = {
  mockName: string;
  mockDescription: string;
  urlPath: string;
};

const schema = z.object({
  mockName: z.string().min(1, { message: "Required" }),
  mockDescription: z.string().min(1, { message: "Required" }),
  urlPath: z.string().optional(),
});

const MockEdit: NextPage = () => {
  const { handleSubmit, watch, control } = useForm<MockEditForm>({
    resolver: zodResolver(schema),
  });
  const onSubmit = handleSubmit((data) => data);

  return (
    <Layout
      sidebar={
        <Stack justify="start" direction="column" align="center">
          <Box padding="XLarge">
            <Stack direction="column" spacing="large">
              <Heading type="display">
                {watch("mockName") || "New Mock"}
              </Heading>
              <Heading type="displaySubtitle">
                {watch("mockDescription") || "Mock description..."}
              </Heading>
              <Stack align="center" justify="center">
                <Box maxWidth="90vh">
                  <Image src={PaperPlaneLogo} alt="Paper Plane Logo" />
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      }
    >
      <form onSubmit={onSubmit}>
        <Stack spacing="XLarge">
          <Stack>
            <Controller
              name="mockName"
              control={control}
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  label="Mock Name"
                  placeholder="New Mock"
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="mockDescription"
              control={control}
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  label="Mock Description"
                  placeholder="Mock description..."
                  error={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Separator />
          <Controller
            name="urlPath"
            control={control}
            render={({ field, fieldState }) => (
              <InputField
                {...field}
                label="Website URL path"
                placeholder="/custom-path"
                prefix="https://kiwi.com"
                error={fieldState.error?.message}
              />
            )}
          />
          <Separator />

          <Stack direction="row-reverse">
            <Button size="large" submit>
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Layout>
  );
};

export default MockEdit;
