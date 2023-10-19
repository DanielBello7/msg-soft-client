import SidebarComponent from "../components/SidebarComponent";
import useCachedResources from "../hooks/useCachedResources";
import ChatboxComponent from "../components/ChatboxComponent";
import LoadingComponent from "@/components/loading-component";
import ErrorComponent from "@/components/error-component";

export default function MainApp() {
    const { error, isError, isLoadingComplete } = useCachedResources();

    if (!isLoadingComplete) return <LoadingComponent />
    if (isError) return <ErrorComponent error={error as Error} />
    return (
        <div className="w-full h-full bg-white rounded flex flex-row">
            <SidebarComponent />
            <ChatboxComponent />
        </div>
    )
}
