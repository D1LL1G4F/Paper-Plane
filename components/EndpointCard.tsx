import Stack from "@kiwicom/orbit-components/lib/Stack";
import { CardSection } from "@kiwicom/orbit-components/lib/Card";
import Text from "@kiwicom/orbit-components/lib/Text";
import JSONInput from "react-json-editor-ajrm";
import { ApiMock, JSONInputContentType } from "../utils/types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - https://github.com/AndrewRedican/react-json-editor-ajrm/issues/163
import locale from "react-json-editor-ajrm/locale/en";
import { Controller, FieldArrayWithId, UseFormReturn } from "react-hook-form";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import validateResponseObject from "../utils/validateResponseObject";
import EndpointMockValidityIcon from "./EndpointMockValidityIcon";
import { Schema } from "json-schema-faker";

type EndpointCardProps = {
  field: FieldArrayWithId<ApiMock, "endpointMockCollection", "id">;
  index: number;
  form: UseFormReturn<ApiMock, unknown>;
  openAPISchema: Schema | null | undefined;
};

const EndpointCard = ({
  field,
  openAPISchema,
  index,
  form,
}: EndpointCardProps): JSX.Element => {
  const updateEndpointsValidity = () => {
    const path = form.getValues(`endpointMockCollection.${index}.endpointPath`);
    const method = form.getValues(`endpointMockCollection.${index}.method`);
    const responseObject = form.getValues(
      `endpointMockCollection.${index}.responseObject`
    );
    const responseStatus = form.getValues(
      `endpointMockCollection.${index}.responseStatus`
    );

    form.setValue(
      `endpointMockCollection.${index}.validity`,
      validateResponseObject(
        openAPISchema,
        responseObject,
        path,
        method,
        responseStatus
      )
    );
  };

  const onJSONInputChange = ({ error, jsObject }: JSONInputContentType) => {
    if (error) {
      form.setError(`endpointMockCollection.${index}.responseObject`, {
        type: "custom",
        message: error.reason,
      });
    } else {
      form.clearErrors(`endpointMockCollection.${index}.responseObject`);
    }
    form.setValue(`endpointMockCollection.${index}.responseObject`, jsObject);
    updateEndpointsValidity();
  };

  return (
    <CardSection
      expandable
      title={
        <Stack direction="row">
          <EndpointMockValidityIcon
            validity={form.watch(`endpointMockCollection.${index}.validity`)}
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
              onChange={(e) => {
                renderField.onChange(
                  parseInt((e.target as HTMLTextAreaElement).value, 10)
                );
                return updateEndpointsValidity();
              }}
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
              onChange={onJSONInputChange}
              placeholder={renderField.value}
              locale={locale}
              height="550px"
              width="100%"
            />
          )}
        />
      </Stack>
    </CardSection>
  );
};

export default EndpointCard;
