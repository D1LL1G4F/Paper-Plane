import Heading from "@kiwicom/orbit-components/lib/Heading";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import { CardSection } from "@kiwicom/orbit-components/lib/Card";
import TileGroup from "@kiwicom/orbit-components/lib/TileGroup";
import Tile from "@kiwicom/orbit-components/lib/Tile";
import { Edit, Plus } from "@kiwicom/orbit-components/lib/icons";
import { ReactElement } from "react";
import MockTile, { Mock } from "./MockTile";
import { useRouter } from "next/router";

export type MockGroup = {
  mocks: Array<Mock>;
  id: string;
  title: string;
  description: string;
};

type MockGroupProps = {
  mockGroup: MockGroup;
};

const MockGroupCard = ({ mockGroup }: MockGroupProps): ReactElement => {
  const { asPath } = useRouter();
  return (
    <CardSection
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
          <MockTile mock={mock} key={mock.id} />
        ))}
        <Tile noPadding>
          <Stack justify="center">
            <Button
              href={`${asPath}/mock-edit/`}
              fullWidth
              type="white"
              iconLeft={<Plus />}
            >
              New Mock
            </Button>
          </Stack>
        </Tile>
      </TileGroup>
    </CardSection>
  );
};

export default MockGroupCard;
