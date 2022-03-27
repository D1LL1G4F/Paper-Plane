import transformToAPIMock from "../transformToAPIMock";
import mockOpenApiV3 from "../mockedData/mockOpenApiV3";
import generateFakeSchema from "../generateFakeSchema";
import mockOpenApiV2 from "../mockedData/mockOpenApiV2";
import { OpenAPI } from "openapi-types";
import JSONSchemaFaker from "json-schema-faker";
import Chance from "chance";

describe("transformToAPIMock", () => {
  JSONSchemaFaker.extend("chance", () => new Chance(42));
  JSONSchemaFaker.option({
    minItems: 2,
    maxItems: 2,
    ignoreMissingRefs: true,
    failOnInvalidTypes: false,
    failOnInvalidFormat: false,
    reuseProperties: true,
    alwaysFakeOptionals: true,
    random: () => 0.79,
  });
  const expectedAPIMock = {
    type: "OpenAPI",
    title: "Swagger Petstore",
    description: "",
    openAPISchemaUrl: "http://petstore.swagger.io/v1/schema.json",
    endpointMockCollection: [
      {
        endpointPath: "/pets",
        responseStatus: 200,
        responseObject: [
          {
            id: 58000000,
            name: "Lorem ipsum dolor laborum",
            tag: "Lorem ipsum dolor laborum",
          },
          {
            id: 58000000,
            name: "Lorem ipsum dolor laborum",
            tag: "Lorem ipsum dolor laborum",
          },
        ],
        method: "get",
        summary: "List all pets",
        description: "",
      },
      {
        endpointPath: "/pets",
        responseStatus: 201,
        responseObject: null,
        method: "post",
        summary: "Create a pet",
        description: "",
      },
      {
        endpointPath: "/pets/{petId}",
        responseStatus: 200,
        responseObject: {
          id: 58000000,
          name: "Lorem ipsum dolor laborum",
          tag: "Lorem ipsum dolor laborum",
        },
        method: "get",
        summary: "Info for a specific pet",
        description: "",
      },
    ],
  };

  it("transforms faked OpenAPI v3 schema to API mock format", () => {
    const result = transformToAPIMock(
      generateFakeSchema(mockOpenApiV3) as OpenAPI.Document
    );

    expect(result).toMatchObject(expectedAPIMock);
  });

  it("transforms faked OpenAPI v2 schema to API mock format", () => {
    const result = transformToAPIMock(
      generateFakeSchema(mockOpenApiV2) as OpenAPI.Document
    );

    expect(result).toMatchObject({ ...expectedAPIMock, openAPISchemaUrl: "" });
  });
});
