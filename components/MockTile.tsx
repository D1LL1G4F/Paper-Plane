import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import Tile from "@kiwicom/orbit-components/lib/Tile";
import Text from "@kiwicom/orbit-components/lib/Text";
import { Send, Edit } from "@kiwicom/orbit-components/lib/icons";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { EndpointMockValidityEnum, Mock } from "../utils/types";
import EndpointMockValidityIcon from "./EndpointMockValidityIcon";

type MockTileProps = {
  mock: Mock;
  mockId: string;
  mockGroupId: string;
  webUrlBase: string;
};

const MockTile = ({
  mock,
  mockId,
  mockGroupId,
  webUrlBase,
}: MockTileProps): ReactElement => {
  const {
    asPath,
    query: { projectId },
  } = useRouter();
  const hasSchemaViolatingResponse = mock.apiMockCollection.some((apiMock) =>
    apiMock.endpointMockCollection.some(
      (endpoint) =>
        endpoint.validity === EndpointMockValidityEnum.VIOLATES_SCHEMA
    )
  );

  const mockApiBase = `${window.location.origin}/api/projectId/${projectId}/mockGroupId/${mockGroupId}/mockId/${mockId}`;

  const mockUrl: URL = new URL(mock.clientUrl);
  mockUrl.host = webUrlBase;
  mockUrl.searchParams.set(mock.apiOverrideUrlParamName, mockApiBase);

  return (
    <Tile noPadding>
      <Stack direction="row" align="center" spacing="none">
        <ButtonLink
          href={mockUrl.toString()}
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
            {mock.mockName}
          </Text>
          <Text>{mock.mockDescription}</Text>
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
