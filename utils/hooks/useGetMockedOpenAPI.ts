import { useQuery, UseQueryResult } from "react-query";

import { Schema } from "json-schema-faker";
import mockOpenApiv3 from "../mockedData/mockOpenApiV3";
import { ApiMock } from "../types";
import generateFakeSchema from "../generateFakeSchema";
import transformToAPIMock from "../transformToAPIMock";

const useGetMockedOpenAPI = (
  openAPIUrl: string
): UseQueryResult<ApiMock | null, Error> =>
  useQuery(openAPIUrl, () => {
    const openAPISchema: Schema = mockOpenApiv3;
    const fakedSchema = generateFakeSchema(openAPISchema);

    if (!fakedSchema) return null;

    return transformToAPIMock(fakedSchema);
  });

export default useGetMockedOpenAPI;
