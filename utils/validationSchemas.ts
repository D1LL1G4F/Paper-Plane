import { z } from "zod";
import {
  ApiMockTypeEnum,
  EndpointMockMethodEnum,
  EndpointMockValidityEnum,
} from "./types";

export const apiMockEditValidationSchema = z.object({
  type: z.nativeEnum(ApiMockTypeEnum),
  title: z.string().min(1, { message: "Required" }),
  description: z.string().optional(),
  openAPISchemaUrl: z.string().url().min(1, { message: "Required" }),
  endpointMockCollection: z.array(
    z.object({
      endpointPath: z.string().regex(/^\/.*/),
      responseStatus: z.number().min(100).max(599),
      responseObject: z.nullable(
        z.object({}).passthrough().or(z.array(z.any()))
      ),
      method: z.nativeEnum(EndpointMockMethodEnum),
      summary: z.string().optional(),
      description: z.string().optional(),
      validity: z.nativeEnum(EndpointMockValidityEnum),
    })
  ),
});
