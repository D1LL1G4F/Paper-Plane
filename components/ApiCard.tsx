import Stack from "@kiwicom/orbit-components/lib/Stack";
import { CardSection } from "@kiwicom/orbit-components/lib/Card";
import Collapse from "@kiwicom/orbit-components/lib/Collapse";
import Text from "@kiwicom/orbit-components/lib/Text";
import Tooltip from "@kiwicom/orbit-components/lib/Tooltip";
import JSONInput from "react-json-editor-ajrm";
import { ApiMock, JSONInputContentType } from "../utils/types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - https://github.com/AndrewRedican/react-json-editor-ajrm/issues/163
import locale from "react-json-editor-ajrm/locale/en";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
import { useCallback, useEffect } from "react";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import validateResponseObject from "../utils/validateResponseObject";
import useGetOpenAPISchema from "../utils/hooks/useGetOpenAPISchema";
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
  }, [append, endpointMockCollection, remove]);

  const onJSONInputChange = useCallback(
    (form: UseFormReturn<ApiMock, unknown>, index: number) =>
      ({ error, jsObject }: JSONInputContentType) => {
        if (error) {
          form.setError(`endpointMockCollection.${index}.responseObject`, {
            type: "custom",
            message: error.reason,
          });
        } else {
          form.clearErrors(`endpointMockCollection.${index}.responseObject`);
        }
        const path = form.getValues(
          `endpointMockCollection.${index}.endpointPath`
        );
        const method = form.getValues(`endpointMockCollection.${index}.method`);
        const statusCode = form.getValues(
          `endpointMockCollection.${index}.responseStatus`
        );
        form.setValue(
          `endpointMockCollection.${index}.validity`,
          validateResponseObject(
            openAPISchema,
            jsObject,
            path,
            method,
            statusCode
          )
        );
        form.setValue(
          `endpointMockCollection.${index}.responseObject`,
          jsObject
        );
      },
    [openAPISchema]
  );

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
      {fields.map((field, index) => (
        <CardSection
          key={field.id}
          expandable
          title={
            <Stack direction="row">
              <EndpointMockValidityIcon
                validity={form.watch(
                  `endpointMockCollection.${index}.validity`
                )}
              />
              <Text weight="bold">{field.method.toUpperCase()}</Text>
              <Text>{field.endpointPath}</Text>
            </Stack>
          }
          description={field.description}
        >
          <Stack>
            <Controller
              name={`endpointMockCollection.${index}.responseStatus`}
              control={form.control}
              render={({ field: renderField, fieldState }) => (
                <InputField
                  {...renderField}
                  onChange={(e) =>
                    renderField.onChange(
                      parseInt((e.target as HTMLTextAreaElement).value, 10)
                    )
                  }
                  type="number"
                  inputMode="numeric"
                  label="Response Status Code"
                  placeholder="200"
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name={`endpointMockCollection.${index}.responseObject`}
              control={form.control}
              render={({ field: renderField }) => (
                <JSONInput
                  {...renderField}
                  onChange={onJSONInputChange(form, index)}
                  placeholder={renderField.value}
                  locale={locale}
                  height="550px"
                  width="100%"
                />
              )}
            />
          </Stack>
        </CardSection>
      ))}
    </Collapse>
  );
};

export default ApiCard;
