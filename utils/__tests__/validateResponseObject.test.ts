import mockOpenApiV3 from "../mockedData/mockOpenApiV3";
import mockOpenApiV2 from "../mockedData/mockOpenApiV2";
import validateResponseObject from "../validateResponseObject";

describe("validateResponseObject", () => {
  const testResponseArray = [
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
  ];
  it("transforms faked OpenAPI v3 schema to API mock format", () => {
    const result = validateResponseObject(
      mockOpenApiV3,
      testResponseArray,
      "/pets",
      "get",
      200
    );

    expect(result).toBe(true);
  });

  it("transforms faked OpenAPI v2 schema to API mock format", () => {
    const result = validateResponseObject(
      mockOpenApiV2,
      testResponseArray,
      "/pets",
      "get",
      200
    );

    expect(result).toBe(true);
  });
});
