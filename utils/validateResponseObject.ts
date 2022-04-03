// eslint-disable-next-line @typescript-eslint/no-var-requires
const ZSchema = require(`z-schema`);

const validateResponseObject = (
  openAPISchema: unknown,
  responseObject: unknown,
  path: string,
  method: string,
  statusCode: number
): boolean => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const schemaPath = openAPISchema?.openapi
    ? `paths.["${path}"].${method}.responses.["${statusCode}"].content.["application/json"].schema`
    : `paths.["${path}"].${method}.responses.["${statusCode}"].schema`;
  ZSchema.registerFormat("int64", (val: unknown) => Number.isInteger(val));
  ZSchema.registerFormat("int32", (val: unknown) => Number.isInteger(val));
  const validator = new ZSchema();
  return validator.validate(responseObject, openAPISchema, {
    schemaPath,
  });
};

export default validateResponseObject;
