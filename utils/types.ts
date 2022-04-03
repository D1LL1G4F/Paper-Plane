export type EndpointMock = {
  endpointPath: string;
  responseStatus: number;
  responseObject: unknown;
  method: string;
  summary?: string;
  description?: string;
};

export type ApiMock = {
  type: "OpenAPI" | "Custom";
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
