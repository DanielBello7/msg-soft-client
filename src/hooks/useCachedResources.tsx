import React from "react"

export default function useCachedResources() {
    const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
        async function loadAsyncData() {
            try {
                setIsLoadingComplete(true);
            }
            catch (error: any) {
                setError(error);
                setIsError(true);
                return setIsLoadingComplete(true);
            }
        }

        loadAsyncData();
    }, []);

    return { isLoadingComplete, isError, error }
}