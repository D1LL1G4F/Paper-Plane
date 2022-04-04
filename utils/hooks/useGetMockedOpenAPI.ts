import { ApiMock } from "../types";
import generateFakeSchema from "../generateFakeSchema";
import transformToAPIMock from "../transformToAPIMock";
import useGetOpenAPISchema from "./useGetOpenAPISchema";
import { UseQueryResult } from "react-query";

const useGetMockedOpenAPI = (
  openAPISchemaUrl: string
): UseQueryResult<ApiMock | null | undefined, Error> => {
  const openAPISchemaQueryResult = useGetOpenAPISchema(openAPISchemaUrl);
  if (!openAPISchemaQueryResult.data) {
    return openAPISchemaQueryResult as UseQueryResult<undefined, Error>;
  }
  try {
    const fakedSchema = generateFakeSchema(openAPISchemaQueryResult.data);
    if (!fakedSchema) {
      return { ...openAPISchemaQueryResult, data: null } as UseQueryResult<
        null,
        Error
      >;
    }
    return {
      ...openAPISchemaQueryResult,
      data: transformToAPIMock(fakedSchema),
    } as UseQueryResult<ApiMock, Error>;
  } catch (e) {
    return {
      ...openAPISchemaQueryResult,
      data: null,
      error: e,
    } as UseQueryResult<null, Error>;
  }
};

export default useGetMockedOpenAPI;
