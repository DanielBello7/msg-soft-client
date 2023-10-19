import { Dialog, Transition } from '@headlessui/react';
import { useModalData } from '@/context/modal.context';
import React from 'react';
import ModalBody from './modal-body';

export default function AlertModal() {
    const { alert: toast, ToggleAlert: ToggleToast } = useModalData();
    React.useEffect(() => {
        const timeout = setTimeout(() => ToggleToast(false), 2000);
        return () => clearTimeout(timeout);
    }, [toast.show]);
    return (
        <Transition.Root show={toast.show} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => ToggleToast(false)}>
                <Transition.Child
                    as={'div'}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <ModalBody />
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
}