import { useQuery, UseQueryResult } from "react-query";

import { Schema } from "json-schema-faker";
import mockOpenApiv3 from "../mockedData/mockOpenApiV3";

const useGetOpenAPISchema = (openAPIUrl: string): UseQueryResult<Schema> =>
  useQuery([openAPIUrl], () => {
    return mockOpenApiv3;
  });

export default useGetOpenAPISchema;
