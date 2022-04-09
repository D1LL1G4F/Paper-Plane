import type { NextPage } from "next";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import { Plus } from "@kiwicom/orbit-components/lib/icons";
import Box from "@kiwicom/orbit-components/lib/Box";
import MockGroupCard, { MockGroup } from "../../../components/MockGroupCard";
import InputGroup from "@kiwicom/orbit-components/lib/InputGroup";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Select from "@kiwicom/orbit-components/lib/Select";
import { ChangeEvent, useState } from "react";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";

const mockGroups: Array<MockGroup> = [
  {
    title: "Invoices",
    description: "MMB invoices page",
    id: "1213",
    mocks: [
      {
        title: "Single Invoice",
        description: "1 Slovak passenger",
        id: "123",
        status: "active",
      },
      {
        title: "Multiple Invoices",
        description: "3 Russian passenger",
        id: "123321",
        status: "outdated",
      },
    ],
  },
];

const defaultWebUrlBases = ["https://kiwi.com", "https://localhost:3000"];

const Mocks: NextPage = () => {
  const [webUrlBase, setWebUrlBase] = useState(defaultWebUrlBases[0]);
  const { push, query } = useRouter();

  return (
    <Layout
      sidebar={
        <Stack justify="start" direction="column" align="center">
          <Box padding="XLarge">
            <Stack direction="column" spacing="large">
              <Heading type="display">Manage My Booking</Heading>
              <Heading type="displaySubtitle">
                Refunds, Ancillaries, Check-in, Schedule Changes...
              </Heading>
              <Stack align="center" justify="center">
                <Illustration name="Lounge" />
              </Stack>
            </Stack>
          </Box>
          <Stack>
            <Box padding="large">
              <InputGroup
                flex={["9 9 15em", "0.5 0.5 0.5em"]}
                label="Web URL base"
              >
                <InputField
                  onChange={(event) =>
                    setWebUrlBase(
                      (event as ChangeEvent<HTMLInputElement>).target.value
                    )
                  }
                  value={webUrlBase}
                  inputMode="url"
                />
                <Select
                  value={webUrlBase}
                  onChange={(event) =>
                    setWebUrlBase(
                      (event as ChangeEvent<HTMLSelectElement>).target.value
                    )
                  }
                  options={[
                    ...defaultWebUrlBases.map((url) => ({
                      value: url,
                      label: url,
                    })),
                    { value: webUrlBase, label: "custom" },
                  ]}
                />
              </InputGroup>
            </Box>
          </Stack>
        </Stack>
      }
    >
      <Stack direction="column">
        <Stack direction="row-reverse">
          <Button
            circled
            size="large"
            iconLeft={<Plus />}
            title="Create new Mock"
            type="secondary"
            onClick={() => {
              push(`${query.projectId}/mock-group-edit`);
            }}
          >
            New Mock Group
          </Button>
        </Stack>
        {mockGroups.map((mockGroup) => (
          <MockGroupCard mockGroup={mockGroup} key={mockGroup.id} />
        ))}
      </Stack>
    </Layout>
  );
};

export default Mocks;
