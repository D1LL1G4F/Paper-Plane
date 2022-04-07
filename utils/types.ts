import { Props as IllustrationProps } from "@kiwicom/orbit-components/lib/Illustration";

export enum EndpointMockValidityEnum {
  VALID = "valid",
  VIOLATES_SCHEMA = "violates OpenAPI schema",
  WITHOUT_SCHEMA = "could not found definition in schema",
}

export enum EndpointMockMethodEnum {
  GET = "get",
  POST = "post",
  PUT = "put",
  HEAD = "head",
  DELETE = "delete",
  PATCH = "patch",
  OPTIONS = "options",
  CONNECT = "connect",
  TRACE = "trace",
}

export type EndpointMock = {
  endpointPath: string;
  responseStatus: number;
  responseObject: unknown;
  method: EndpointMockMethodEnum;
  summary?: string;
  description?: string;
  validity: EndpointMockValidityEnum;
};

export enum ApiMockTypeEnum {
  OPENAPI = "OpenAPI",
  CUSTOM = "Custom",
}

export type ApiMock = {
  type: ApiMockTypeEnum;
  title: string;
  description?: string;
  openAPISchemaUrl: string;
  endpointMockCollection: Array<EndpointMock>;
};

export type JSONInputContentType = {
  plainText: string;
  markupText: string;
  json: string;
  jsObject: unknown;
  lines: number;
  error:
    | false
    | {
        reason: string | undefined;
        line: number | undefined;
        theme: string | undefined;
      };
};

export type ProjectEditForm = {
  projectName: string;
  projectDescription: string;
  illustration: IllustrationProps["name"];
  clientUrl: string;
  apiOverrideUrlParamName: string;
  apiMockCollection: Array<ApiMock>;
};
