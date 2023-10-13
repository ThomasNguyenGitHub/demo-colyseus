import {RequestHandler} from 'express';

import {checkAuth} from '@app/api/rest/middlewares/checkAuth';

export interface ServerExtraStatusResp {
    ip: string;
    timestampMs: number;
}

type MainRequestHandler = RequestHandler<unknown, ServerExtraStatusResp>;

// =============================================================================

const mainHandler: MainRequestHandler = async (req, res, next) => {
    try {
        const dateNow = new Date().getTime();
        res.status(200).json({
            timestampMs: dateNow,
            time: new Date().getTime(),
            ip: req.socket.remoteAddress,
            xForwardedIp: req.headers['x-forwarded-for'] || 'null',
            connect: req.connection.remoteAddress || '',
            socket: req.socket.remoteAddress || '',
            XRealIP: req.header('X-Real-IP') || '',
        });
    } catch (error) {
        next(error);
    }
};

// =============================================================================

export const getExtraStatus = (): Array<RequestHandler> => [
    checkAuth,
    mainHandler,
];
