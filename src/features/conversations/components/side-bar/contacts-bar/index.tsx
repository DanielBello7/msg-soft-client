import { FaUsers } from "react-icons/fa";
import { useApplicationData } from "@/context/data.context";
import Contact from "./contact";

export default function ContactsBarComponent() {
    const { contacts } = useApplicationData();
    return (
        <div className="w-full flex grow flex-col">
            <h1 className="p-2 font-bold text-xl">
                Contacts
            </h1>
            <div className="border-t border-blue-300 flex flex-col grow overflow-scroll">
                {
                    contacts.map((item) => (
                        <Contact
                            {...item}
                            key={item._id}
                        />
                    ))
                }
                {
                    contacts.length < 1 &&
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="flex items-center">
                            <p className="text-gray-400 font-bold fs-8 me-2">
                                Your contacts appear here
                            </p>
                            <FaUsers size={20} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
