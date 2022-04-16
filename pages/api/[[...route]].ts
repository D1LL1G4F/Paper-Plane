/* eslint-disable babel/camelcase */
import type { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";
import initMiddleware from "../../utils/initMiddleware";
import admin, { ServiceAccount } from "firebase-admin";
import parseRequestRoute from "../../utils/parseRequestRoute";
import serviceAccount from "../../serviceAccountKey.json";
import mergeApiMocks from "../../utils/mergeApiMocks";
import { EndpointMock, Mock, MockGroup, Project } from "../../utils/types";
import { pathToRegexp } from "path-to-regexp";

// Initialize the cors middleware
const corsMiddleware = initMiddleware(cors());

const app =
  admin.apps[0] ||
  admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    },
    "Paper Plane Admin"
  );

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  const { route } = req.query;
  await corsMiddleware(req, res);

  const parserRequest = parseRequestRoute(route);

  if (!parserRequest) {
    return res.status(400).json({ detail: "Invalid request" });
  }
  const { projectId, mockGroupId, mockId, endpoint } = parserRequest;

  const firestore = app.firestore();

  const projectRef = firestore.doc(`projects/${projectId}`);
  const mockGroupRef = firestore.doc(
    `projects/${projectId}/mockGroupCollection/${mockGroupId}`
  );
  const mockRef = firestore.doc(
    `projects/${projectId}/mockGroupCollection/${mockGroupId}/mockCollection/${mockId}`
  );
  const [project, mockGroup, mock] = (
    await firestore.getAll(projectRef, mockGroupRef, mockRef)
  ).map((docSnapshot) => docSnapshot.data()) as [Project, MockGroup, Mock];

  const mergedMockApiCollection = mergeApiMocks(
    project.apiMockCollection,
    mockGroup.apiMockCollection,
    mock.apiMockCollection
  );

  const endpointMock = mergedMockApiCollection.reduce<null | EndpointMock>(
    (acc, apiMock) => {
      const matchingEndpointMock = apiMock.endpointMockCollection.find(
        (endpointMock) => {
          const regexp = pathToRegexp(
            endpointMock.endpointPath.replace("{", ":").replace("}", "")
          );
          return (
            regexp.test(endpoint) &&
            endpointMock.method === req.method?.toLowerCase()
          );
        }
      );
      if (matchingEndpointMock) {
        return matchingEndpointMock;
      }
      return acc;
    },
    null
  );

  if (!endpointMock) {
    return res.status(404).json({ detail: "Mock not found" });
  }

  return res.status(200).json(endpointMock.responseObject);
}
