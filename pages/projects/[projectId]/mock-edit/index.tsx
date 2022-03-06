import type { NextPage } from "next";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Layout from "../../../../components/Layout";
import Box from "@kiwicom/orbit-components/lib/Box";
import Image from "next/image";
import PaperPlaneLogo from "/public/PaperPlaneLogo1280x929.png";
import { useForm } from "react-hook-form";

type MockEditForm = {
  firstName: string;
  lastName: string;
};

const MockEdit: NextPage = () => {
  const { register, setValue, handleSubmit } = useForm<MockEditForm>();
  // eslint-disable-next-line no-console
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Layout
      sidebar={
        <Stack justify="start" direction="column" align="center">
          <Box padding="XLarge">
            <Stack direction="column" spacing="large">
              <Heading type="display">New Mock</Heading>
              <Heading type="displaySubtitle">Mock description...</Heading>
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
        <label>First Name</label>
        <input {...register("firstName")} />
        <label>Last Name</label>
        <input {...register("lastName")} />
        <button
          type="button"
          onClick={() => {
            setValue("lastName", "luo"); // ✅
          }}
        >
          SetValue
        </button>
      </form>
    </Layout>
  );
};

export default MockEdit;
