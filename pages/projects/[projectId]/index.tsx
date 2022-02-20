import type { NextPage } from "next";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import styled from "styled-components";
import Grid from "@kiwicom/orbit-components/lib/utils/Grid";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import { Plus } from "@kiwicom/orbit-components/lib/icons";
import Box from "@kiwicom/orbit-components/lib/Box";
import MockGroupCard, { MockGroup } from "../../../components/MockGroupCard";
import InputGroup from "@kiwicom/orbit-components/lib/InputGroup";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Select from "@kiwicom/orbit-components/lib/Select";
import { ChangeEvent, useState } from "react";

const PageGrid = styled(Grid)`
  width: 100%;
  min-height: 100%;
  height: fit-content;
  background: ${({ theme }) => theme.orbit.paletteCloudLight};
`;

const PageSidebar = styled.aside`
  background: ${({ theme }) => theme.orbit.paletteWhite};
  padding: ${({ theme }) => theme.orbit.spaceXLarge};
  height: 100%;
`;

const layoutOptions = {
  maxWidth: "100%",
  columns: "2fr minmax(272px, 5fr)",
};

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

  return (
    <PageGrid {...layoutOptions}>
      <Grid rows="1fr auto auto">
        <Stack justify="start" direction="column" align="center">
          <Box padding="XLarge">
            <Heading type="display">Manage My Booking</Heading>
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
      </Grid>
      <PageSidebar>
        <Stack direction="column">
          <Stack direction="row-reverse">
            <Button
              circled
              size="large"
              iconLeft={<Plus />}
              title="Create new Mock"
              type="secondary"
            >
              New Mock Group
            </Button>
          </Stack>
          {mockGroups.map((mockGroup) => (
            <MockGroupCard mockGroup={mockGroup} key={mockGroup.id} />
          ))}
        </Stack>
      </PageSidebar>
    </PageGrid>
  );
};

export default Mocks;
