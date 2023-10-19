import * as React from 'react';
import NewContactModal from '@/modules/NewContact.modal';
import AlertModal from '@/modules/Alert.modal';
export default function ModalComponent() {
    return (
        <React.Fragment>
            <NewContactModal />
            <AlertModal />
        </React.Fragment>
    )
}
