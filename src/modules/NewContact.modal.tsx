import { Dialog, Transition } from '@headlessui/react';
import { FaInfoCircle } from 'react-icons/fa';
import { useModalData } from '../context/modal.context';
import React from 'react';

function ModalBody() {
    const { ToggleNewContact } = useModalData();

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <Transition.Child
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    leave="ease-in duration-200"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <FaInfoCircle
                                        color="green"
                                        size={24}
                                    />
                                </div>

                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-lg leading-6 text-gray-900 font-bold">
                                        Finder Alert
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            hey
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
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

export default function NewContactModal() {
    const { ToggleNewContact, newContact } = useModalData();
    return (
        <Transition.Root show={newContact} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => ToggleNewContact(false)}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <ModalBody />
            </Dialog>
        </Transition.Root>
    );
}