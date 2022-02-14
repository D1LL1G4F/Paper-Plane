import type { NextPage } from "next";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import styled from "styled-components";
import Grid from "@kiwicom/orbit-components/lib/utils/Grid";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import Plus from "@kiwicom/orbit-components/lib/icons/Plus";
import Box from "@kiwicom/orbit-components/lib/Box";
import { CardSection } from "@kiwicom/orbit-components/lib/Card";
import TileGroup from "@kiwicom/orbit-components/lib/TileGroup";
import Tile from "@kiwicom/orbit-components/lib/Tile";
import Text from "@kiwicom/orbit-components/lib/Text";
import { Check, Alert, Send } from "@kiwicom/orbit-components/lib/icons";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import { Badge } from "@kiwicom/orbit-components";
import { Edit } from "@kiwicom/orbit-components/es/icons";

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

type Mock = {
  title: string;
  description?: string;
  id: string;
  status: "active" | "outdated";
};

type MockGroup = {
  mocks: Array<Mock>;
  id: string;
  title: string;
  description: string;
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

const Mocks: NextPage = () => {
  return (
    <PageGrid {...layoutOptions}>
      <Grid rows="1fr auto auto">
        <Stack justify="center">
          <Box padding="XLarge">
            <Heading type="display">Manage My Booking</Heading>
          </Box>
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
            <CardSection
              key={mockGroup.id}
              expandable
              expanded
              title={
                <Stack inline align="center">
                  <Heading type="title2">{mockGroup.title}</Heading>
                  <Button size="small" type="white" iconLeft={<Edit />} />
                </Stack>
              }
              description={mockGroup.description}
            >
              <TileGroup>
                {mockGroup.mocks.map((mock) => (
                  <Tile noPadding key={mock.id}>
                    <Stack direction="row" align="center" spacing="none">
                      <ButtonLink
                        fullWidth
                        iconLeft={<Send />}
                        iconRight={
                          <Badge
                            type={
                              mock.status === "active"
                                ? "successInverted"
                                : "criticalInverted"
                            }
                            icon={
                              mock.status === "active" ? <Check /> : <Alert />
                            }
                          />
                        }
                      >
                        <Text type="primary" weight="bold">
                          {mock.title}
                        </Text>
                        <Text>{mock.description}</Text>
                      </ButtonLink>
                      <Button type="white" iconLeft={<Edit />} />
                    </Stack>
                  </Tile>
                ))}
                <Tile noPadding>
                  <Stack justify="center">
                    <Button fullWidth type="white" iconLeft={<Plus />}>
                      New Mock
                    </Button>
                  </Stack>
                </Tile>
              </TileGroup>
            </CardSection>
          ))}
        </Stack>
      </PageSidebar>
    </PageGrid>
  );
};

export default Mocks;
