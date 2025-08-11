import { H3Event } from "h3";
import { ZodType } from "zod";
import { ErrorCode } from "./errors";

export async function validateBody<T>(event: H3Event, schema: ZodType) {
    const result = await readValidatedBody(event, schema.safeParse);

    if (result.success) {
        return result.data;
    }

    throw createError({
        statusCode: 400,
        statusMessage: "Validation Error",
        data: {
            errorCode: ErrorCode.VALIDATION_ERROR,
            issues: result.error.issues.map(issue => ({
                path: issue.path.join('.'),
                message: issue.message
            }))
        }
    })
}