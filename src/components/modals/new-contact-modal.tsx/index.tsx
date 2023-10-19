import { Dialog, Transition } from '@headlessui/react';
import { useModalData } from '@/context/modal.context';
import React from 'react';
import ModalBody from './modal-body';

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
