export type EndpointMock = {
  endpointPath: string;
  responseStatus: number;
  responseObject: object;
  method: string;
  summary: string;
  description: string;
};

export type ApiMock = {
  type: "OpenAPI" | "Custom";
  title: string;
  description: string;
  openAPISchemaUrl: string;
  endpointMockCollection: Array<EndpointMock>;
};
