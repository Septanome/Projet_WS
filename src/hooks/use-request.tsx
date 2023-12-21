import { useCallback, useEffect, useState } from "react";
import { Request } from "../models/request/request";

interface UseRequestConfig<T> {
    defaultRequest?: Request<T>;
    autoExecute?: boolean;
}

export const useRequest = <T,>({
    defaultRequest,
    autoExecute = true,
}: UseRequestConfig<T> = {}) => {
    const [request, setRequest] = useState<Request<T> | null>(
        defaultRequest ?? null,
    );
    const [result, setResult] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const execute = useCallback(() => {
        if (!request) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        request
            .execute()
            .then(setResult)
            .catch((error) => {
                console.error(error);
                setError(String(error));
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [request]);

    useEffect(() => {
        if (autoExecute && request) {
            execute();
        }
    }, [autoExecute, execute, request]);

    return { request, setRequest, result, error, isLoading, execute };
};
