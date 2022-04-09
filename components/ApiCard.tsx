import Stack from "@kiwicom/orbit-components/lib/Stack";
import Collapse from "@kiwicom/orbit-components/lib/Collapse";
import Text from "@kiwicom/orbit-components/lib/Text";
import Tooltip from "@kiwicom/orbit-components/lib/Tooltip";
import { ApiMock, EndpointMockValidityEnum } from "../utils/types";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import useGetOpenAPISchema from "../utils/hooks/useGetOpenAPISchema";
import EndpointCard from "./EndpointCard";
import EndpointMockValidityIcon from "./EndpointMockValidityIcon";

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
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "endpointMockCollection",
  });
  const { data: openAPISchema } = useGetOpenAPISchema(
    form.getValues("openAPISchemaUrl")
  );

  useEffect(() => {
    remove();
    endpointMockCollection.forEach((endpointMock) => {
      append(endpointMock);
    });
  });

  const watchedEndpointMockCollection = form.watch("endpointMockCollection");

  const hasSchemaViolatingResponse = watchedEndpointMockCollection?.some(
    (endpoint) => endpoint.validity === EndpointMockValidityEnum.VIOLATES_SCHEMA
  );

  return (
    <Collapse
      label={
        <Stack direction="row" align="center">
          <Tooltip size="medium" content={openAPISchemaUrl}>
            <Text type="primary" weight="bold">
              {title}
            </Text>
          </Tooltip>
          <Text type="secondary">{description}</Text>
          {hasSchemaViolatingResponse && (
            <EndpointMockValidityIcon
              validity={EndpointMockValidityEnum.VIOLATES_SCHEMA}
            />
          )}
        </Stack>
      }
    >
      {fields.map((field, index) => (
        <EndpointCard
          key={field.id}
          form={form}
          field={field}
          index={index}
          openAPISchema={openAPISchema}
        />
      ))}
    </Collapse>
  );
};

export default ApiCard;
