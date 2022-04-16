import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import Tile from "@kiwicom/orbit-components/lib/Tile";
import Text from "@kiwicom/orbit-components/lib/Text";
import { Send, Edit } from "@kiwicom/orbit-components/lib/icons";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { ApiMock, EndpointMockValidityEnum } from "../utils/types";
import EndpointMockValidityIcon from "./EndpointMockValidityIcon";

type MockTileProps = {
  mock: ApiMock;
  mockId: string;
  mockGroupId: string;
};

const MockTile = ({
  mock,
  mockId,
  mockGroupId,
}: MockTileProps): ReactElement => {
  const { asPath } = useRouter();
  const hasSchemaViolatingResponse = mock.endpointMockCollection.some(
    (endpoint) => endpoint.validity === EndpointMockValidityEnum.VIOLATES_SCHEMA
  );

  return (
    <Tile noPadding>
      <Stack direction="row" align="center" spacing="none">
        <ButtonLink
          fullWidth
          iconLeft={<Send />}
          iconRight={
            hasSchemaViolatingResponse && (
              <EndpointMockValidityIcon
                validity={EndpointMockValidityEnum.VIOLATES_SCHEMA}
              />
            )
          }
        >
          <Text type="primary" weight="bold">
            {mock.title}
          </Text>
          <Text>{mock.description}</Text>
        </ButtonLink>
        <Button
          href={`${asPath}/mock-group/${mockGroupId}/mock-edit/${mockId}`}
          type="white"
          iconLeft={<Edit />}
        />
      </Stack>
    </Tile>
  );
};

export default MockTile;
