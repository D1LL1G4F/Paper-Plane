// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string,
    mocked_route: string,
    method: string | undefined,
    request_body: any
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { route } = req.query
    const mockedRoute = Array.isArray(route) ? route.join('/') : route
    res.status(200).json({ name: 'Mocked API response', mocked_route: mockedRoute, method: req.method, request_body: req.body })
}
