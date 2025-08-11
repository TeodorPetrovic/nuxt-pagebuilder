import { ErrorCode } from "./errors";
import { H3Error, H3Event } from "h3";

interface ErrorPayload {
    message: string;
    statusCode?: number
    errorCode?: ErrorCode
    data?: Record<string, any>
}

export function sendAppError(event: H3Event, payload: ErrorPayload) {
    const error: H3Error = createError({
        statusCode: payload.statusCode || 400,
        statusMessage: payload.message,
        data: {
            errorCode: payload.errorCode || ErrorCode.UNKNOWN_ERROR,
            ...payload.data
        }
    });

    sendError(event, error);
}

export function makeAppError(payload: ErrorPayload) {
    return createError({
        statusCode: payload.statusCode || 400,
        statusMessage: payload.message,
        data: {
            errorCode: payload.errorCode || ErrorCode.UNKNOWN_ERROR,
            ...payload.data
        }
    });
}

export function handleError(event: H3Event, error: any) {
    if (error instanceof H3Error) {
        return sendError(event, error);
    }

    return sendAppError(event, {
        message: error.message,
        statusCode: 500,
        errorCode: ErrorCode.UNKNOWN_ERROR,
        data: {
            error: error
        }
    })
}