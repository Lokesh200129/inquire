import { AxiosError } from "axios";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";

const parseError = (error: unknown): string => {
    let message = "Something went wrong, please try again later";

    if (typeof error === "string") {
        message = error;
    }

    if (error instanceof Error) {
        message = error.message;
    }

    if (error instanceof ZodError) {
        message = fromError(error, {
            prefix: null,
            maxIssuesInMessage: 1,
        }).toString();
    }

    if (error instanceof AxiosError && error.response?.data?.message) {
        message = error.response.data.message;
    }

    message = message.trim();
    message = message.charAt(0).toUpperCase() + message.slice(1);
    return message;
};

export default parseError;