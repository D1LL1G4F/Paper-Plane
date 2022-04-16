/* eslint-disable babel/camelcase */
import type { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";
import initMiddleware from "../../utils/initMiddleware";

// Initialize the cors middleware
const corsMiddleware = initMiddleware(cors());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  const { route } = req.query;
  const mockedRoute = Array.isArray(route) ? route.join("/") : route;

  await corsMiddleware(req, res);

  res.status(200).json({
    name: "Mocked API response",
    mocked_route: mockedRoute,
    method: req.method,
    request_body: req.body,
  });
}
