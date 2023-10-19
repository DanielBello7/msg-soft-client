import Sidebar from "./components/side-bar";
import useCachedResources from "@/hooks/use-cached-resources";
import Chatbox from "./components/chat-box";
import LoadingComponent from "@/components/loading-component";
import ErrorComponent from "@/components/error-component";

export default function Conversations() {
    const { error, isError, isLoadingComplete } = useCachedResources();

    if (!isLoadingComplete) return <LoadingComponent />
    if (isError) return <ErrorComponent error={error as Error} />
    return (
        <div className="w-full h-full bg-white rounded flex flex-row">
            <Sidebar />
            <Chatbox />
        </div>
    )
}
