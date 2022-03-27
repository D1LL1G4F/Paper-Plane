import useGetOpenAPISchema from "./useGetOpenAPISchema";
import generateFakeSchema from "../generateFakeSchema";
import { OpenAPI } from "openapi-types";

const useFakedSchema = (openAPIUrl: string): OpenAPI.Document | null => {
  const { data } = useGetOpenAPISchema(openAPIUrl);

  if (!data) {
    return null;
  }

  return generateFakeSchema(data);
};

export default useFakedSchema;
