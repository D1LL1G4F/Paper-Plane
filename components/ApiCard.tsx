import Stack from "@kiwicom/orbit-components/lib/Stack";
import { CardSection } from "@kiwicom/orbit-components/lib/Card";
import Collapse from "@kiwicom/orbit-components/lib/Collapse";
import Text from "@kiwicom/orbit-components/lib/Text";
import Tooltip from "@kiwicom/orbit-components/lib/Tooltip";
import JSONInput from "react-json-editor-ajrm";
import { ApiMock } from "../utils/types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - https://github.com/AndrewRedican/react-json-editor-ajrm/issues/163
import locale from "react-json-editor-ajrm/locale/en";
import { Controller, UseFormReturn } from "react-hook-form";

type ApiCardProps = ApiMock & {
  form: UseFormReturn<ApiMock, unknown>;
};

const ApiCard = ({
  title,
  description,
  openAPISchemaUrl,
  endpointMockCollection,
  form,
}: ApiCardProps): JSX.Element => {
  return (
    <Collapse
      label={
        <Stack spacing="none">
          <Tooltip size="medium" content={openAPISchemaUrl}>
            <Text type="primary" weight="bold">
              {title}
            </Text>
          </Tooltip>
          <Text type="secondary">{description}</Text>
        </Stack>
      }
    >
      {endpointMockCollection.map((endpointMock) => (
        <CardSection
          key={endpointMock.method + endpointMock.endpointPath}
          expandable
          title={
            <Stack direction="row">
              <Text weight="bold">{endpointMock.method.toUpperCase()}</Text>
              <Text>{endpointMock.summary}</Text>
            </Stack>
          }
          description={endpointMock.description}
        >
          <Controller
            name="openAPISchemaUrl"
            control={form.control}
            render={({ field }) => (
              <JSONInput
                {...field}
                placeholder={endpointMock.responseObject}
                locale={locale}
                height="550px"
                width="100%"
              />
            )}
          />
        </CardSection>
      ))}
    </Collapse>
  );
};

export default ApiCard;