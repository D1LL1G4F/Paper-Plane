import { QueryKey, useQuery, UseQueryResult } from "react-query";
import mockOpenApiv3 from "../mockedData/mockOpenApiV3";
import { Schema } from "json-schema-faker";

const useGetOpenAPISchema = (
  openAPIUrl: QueryKey
): UseQueryResult<Schema | null, Error> =>
  useQuery(openAPIUrl, () => {
    if (!openAPIUrl) {
      return null;
    }
    return mockOpenApiv3;
  });

export default useGetOpenAPISchema;
