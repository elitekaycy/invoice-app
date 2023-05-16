import { Modal } from "./Modal";
import React, { useState } from 'react'
import './Modal.css'
import { EditButton } from "../ButtonsUI/EditButton";
import { DeleteButton } from "../ButtonsUI/DeleteButton";
import { DeleteInvoice } from "../../helpers/Api";
import { useNavigate } from "react-router-dom";

interface DeletePropsTypes {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    id: Number
}

export const DeleteModal: React.FC<DeletePropsTypes> = ({
    isOpen,
    setIsOpen,
    id
}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleOpen = (): void => {
        console.log("handle open is open", isOpen)
        setIsOpen(true);
    };

    const handleClose = (): void => {
        setIsOpen(false);
    };

    const deleteFunct = (id: Number): void => {
        setLoading(true)
        DeleteInvoice(id)
        handleClose()
        navigate(-1)
        setLoading(false)
    }

    return (
        <div>
            <Modal isOpen={isOpen} title="" onClose={handleClose}>
                <h1 className="invoice-h1">Confirm Deletion</h1>
                <p className="invoice-body-1">Are you sure you want to delete invoice #{String(id)} This action cannot be undone.</p>
                <div className="delete-modal-btns">
                    <EditButton title="Cancel" handleClick={handleClose} />
                    <DeleteButton loading={loading} handleClick={() => deleteFunct(Number(id))} />
                </div>
            </Modal>
        </div>
    );
};