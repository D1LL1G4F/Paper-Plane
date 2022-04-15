import { ApiMock } from "./types";
import _ from "lodash";

const filterChangedApiMocks = (
  originalApiMockCollection: Array<ApiMock>,
  changedApiMockCollection: Array<ApiMock>
): Array<ApiMock> => {
  return changedApiMockCollection
    .map((changedApiMock): ApiMock => {
      const originalApiMock = originalApiMockCollection.find(
        (apiMock) =>
          apiMock.openAPISchemaUrl === changedApiMock.openAPISchemaUrl
      );

      const changedEndpointMockCollection = _.differenceWith(
        changedApiMock.endpointMockCollection,
        (originalApiMock as ApiMock).endpointMockCollection,
        _.isEqual
      );

      return {
        ...changedApiMock,
        endpointMockCollection: changedEndpointMockCollection,
      };
    })
    .filter((apiMock) => apiMock.endpointMockCollection.length);
};

export default filterChangedApiMocks;
