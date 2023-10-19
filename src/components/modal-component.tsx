import * as React from 'react';
import NewContactModal from '@/components/modals/new-contact-modal.tsx';
import AlertModal from '@/components/modals/alert-modal';
export default function ModalComponent() {
    return (
        <React.Fragment>
            <NewContactModal />
            <AlertModal />
        </React.Fragment>
    )
}
