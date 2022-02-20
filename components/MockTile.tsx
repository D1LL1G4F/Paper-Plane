import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import Tile from "@kiwicom/orbit-components/lib/Tile";
import Text from "@kiwicom/orbit-components/lib/Text";
import { Check, Alert, Send, Edit } from "@kiwicom/orbit-components/lib/icons";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import { Badge } from "@kiwicom/orbit-components";
import { ReactElement } from "react";

export type Mock = {
  title: string;
  description?: string;
  id: string;
  status: "active" | "outdated";
};

type MockTileProps = {
  mock: Mock;
};

const MockTile = ({ mock }: MockTileProps): ReactElement => {
  return (
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
              icon={mock.status === "active" ? <Check /> : <Alert />}
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
  );
};

export default MockTile;
