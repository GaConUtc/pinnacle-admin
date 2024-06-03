import React from 'react';
import { Modal } from 'antd';
function ModalConfirm({ message, isOpen, setIsOpen, onConfirm }) {
    return (
        <Modal
            className="delete-modal"
            styles={{
                header: {
                    textAlign: 'center',
                    marginTop: '16px',
                },
                body: {
                    textAlign: 'center',
                },
                footer: {
                    textAlign: 'center',
                    marginBottom: '16px',
                },
            }}
            title="Delete Confirmation"
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={onConfirm}
            okText="Ok"
            cancelText="No"
        >
            {message}
        </Modal>
    );
}

export default ModalConfirm;
