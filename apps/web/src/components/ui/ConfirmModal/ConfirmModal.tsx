import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import classes from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onClose: () => void;
    isPending?: boolean;
    errorMessage?: string;
}

export default function ConfirmModal({
    title,
    message,
    onConfirm,
    onClose,
    isPending,
    errorMessage,
}: ConfirmModalProps) {
    return (
        <Modal onClose={onClose}>
            <div className={classes["modal__container"]}>
                <h3 className={classes["modal__title"]}>{title}</h3>
                <p className={classes["modal__message"]}>{message}</p>
                {errorMessage && <p className={classes.error}>{errorMessage}</p>}
                <div className={classes["modal__buttons-action"]}>
                    <Button type={"button"} variant={"danger"} onClick={onConfirm} disabled={isPending}>
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                    <Button type={"button"} variant={"secondary"} onClick={onClose} disabled={isPending}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
