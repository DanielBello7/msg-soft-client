import { useApplicationData } from '../context/data.context';
import { FaSpinner } from 'react-icons/fa';
import { useModalData } from '../context/modal.context';
import { v4 as uuid } from 'uuid';
import React from "react";
import InputBox from '../modules/InputBox';

function AuthenticationApp() {
    const [identifier, setIdentifier] = React.useState("");
    const [fullname, setFullname] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const { ToggleAlert: ToggleToast } = useModalData();
    const { setUser } = useApplicationData();

    const HandleRandomize = () => {
        const value = uuid();
        return setIdentifier(value);
    }

    const HandleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!fullname.trim() || !identifier.trim()) return ToggleToast(true, 'Please type in something...');
        setIsLoading(true);
        setUser({ _id: identifier, fullname: fullname });
        return setIsLoading(false);
    }

    return (
        <div className="flex justify-center items-center border border-black w-full h-full">
            <form className="p-3" style={{ width: 300, height: 300 }} onSubmit={HandleSubmit}>
                <input />
                <InputBox
                    id="fullname"
                    setValue={setFullname}
                    title="username"
                    type="text"
                    value={fullname}
                    length="100"
                />

                <InputBox
                    id="identifier"
                    setValue={setIdentifier}
                    title="identifier"
                    type="text"
                    classname="w-full"
                    value={identifier}
                    length="100"
                />

                <button className='font-bold fs-7 text-gray-400 hover:text-black uppercase' type="button" onClick={HandleRandomize}>
                    generate random identifier
                </button>

                <button className="mt-2 w-full h-10 text-white flex items-center justify-center bg-blue-500 hover:opacity-50 font-bold text-xs rounded"
                    disabled={isLoading && true}>
                    {isLoading ? <FaSpinner className="animate-spin" /> : "PROCEED"}
                </button>
            </form>
        </div>
    )
}

export default AuthenticationApp;