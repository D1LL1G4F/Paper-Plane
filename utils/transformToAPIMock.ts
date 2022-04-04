import {
  ApiMock,
  ApiMockTypeEnum,
  EndpointMock,
  EndpointMockMethodEnum,
  EndpointMockValidityEnum,
} from "./types";
import _ from "lodash";
import { OpenAPI, OpenAPIV3 } from "openapi-types";

const transformToAPIMock = (fakeSchema: OpenAPI.Document): ApiMock | null => {
  if (!fakeSchema) return null;

  const endpointMockCollection = _.reduce(
    fakeSchema.paths,
    (acc: Array<EndpointMock>, pathData, path) => {
      _.forEach(pathData, (endpointData, method) => {
        if (typeof endpointData !== "string") {
          const status = (endpointData as OpenAPI.Operation)?.responses?.["200"]
            ? 200
            : Number(
                Object.keys(
                  (endpointData as OpenAPI.Operation)?.responses || {}
                )[0]
              ) || 404;

          const responseObject =
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (endpointData as OpenAPI.Operation)?.responses?.[status]?.content?.[
              "application/json"
            ]?.schema ||
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (endpointData as OpenAPI.Operation)?.responses?.[status]?.schema ||
            null;
          acc.push({
            method: method as EndpointMockMethodEnum,
            validity: EndpointMockValidityEnum.VALID,
            summary: (endpointData as OpenAPI.Operation)?.summary || "",
            description: (endpointData as OpenAPI.Operation)?.description || "",
            endpointPath: path,
            responseStatus: status,
            responseObject,
          });
        }
      });
      return acc;
    },
    []
  );

  return {
    type: ApiMockTypeEnum.OPENAPI,
    title: fakeSchema.info.title,
    description: fakeSchema.info.description || "",
    openAPISchemaUrl:
      (fakeSchema as OpenAPIV3.Document).servers?.[0]?.url?.concat(
        "/schema.json"
      ) || "",
    endpointMockCollection,
  };
};

export default transformToAPIMock;
