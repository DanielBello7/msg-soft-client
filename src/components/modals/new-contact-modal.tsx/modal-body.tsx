import { Dialog, Transition } from '@headlessui/react';
import { useModalData } from '@/context/modal.context';
import { ParticipantDataType } from '@/vite-env';
import { useApplicationData } from '@/context/data.context';
import InputBox from '@ui/input-box';
import React from 'react';

export default function ModalBody() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [fullname, setFullname] = React.useState("");
    const [identifier, setIdentifier] = React.useState("");
    const { ToggleNewContact, ToggleAlert } = useModalData();
    const { setContacts, setCurrentTab, user } = useApplicationData();

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!fullname.trim() || !identifier.trim()) return
        if (identifier === user?._id) return ToggleAlert(true, "Can't add your own account");
        setIsLoading(true);

        const contact: ParticipantDataType = {
            _id: identifier,
            fullname: fullname
        }

        setContacts((prev) => [...prev, contact]);
        setFullname("");
        setIdentifier("");
        ToggleNewContact(false);
        setIsLoading(false);
        return setCurrentTab("contacts");
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
                <Transition.Child
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    leave="ease-in duration-200"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full h-full sm:my-8 sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4">
                            <div className="mt-3 w-full text-start">
                                <Dialog.Title as="h3" className="text-lg leading-6 text-gray-900 font-bold">
                                    Add New Contact
                                </Dialog.Title>
                                <form className='w-full mt-6' onSubmit={HandleSubmit} id="new-contact-form">
                                    <InputBox
                                        id='fullname'
                                        length='100px'
                                        setValue={setFullname}
                                        title="full name"
                                        type='text'
                                        value={fullname}
                                    />

                                    <InputBox
                                        id='identifier'
                                        length='100px'
                                        setValue={setIdentifier}
                                        title="identifier"
                                        type='text'
                                        value={identifier}
                                    />
                                </form>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                className="rounded-md px-4 py-2 bg-blue-600 font-bold text-white hover:bg-blue-700 text-xs"
                                type="submit"
                                form='new-contact-form'
                                disabled={isLoading && true}
                            >
                                {
                                    isLoading ? "Loading" : "Submit"
                                }
                            </button>

                            <button
                                className="shadow-sm px-4 py-2 text-black font-bold text-xs"
                                type="button"
                                onClick={() => ToggleNewContact(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </div>
    )
}
