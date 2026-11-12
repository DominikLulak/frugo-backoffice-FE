import type {ReactNode} from "react";

type Props = {
    onCancel: () => void;
    onSubmit?: () => void;
    cancelText?: string;
    submitText?: string;
    loadingText?: string;
    isLoading?: boolean;
    submitDisabled?: boolean;
    submitVariant?: "success" | "danger" | "primary";
    extraActions?: ReactNode;
}

export default function ModalActions({
    onCancel,
    onSubmit,
    cancelText = "Zrusit",
    submitText = "Ulozit",
    loadingText = "Ukladam...",
    isLoading = false,
    submitDisabled = false,
    submitVariant = "success",
    extraActions
}:Props){
    return(
            <div className="d-flex justify-content-end gap-2">
                {extraActions}

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    {cancelText}
                </button>

                {onSubmit && (
                    <button
                        type="button"
                        className={`btn btn-${submitVariant}`}
                        onClick={onSubmit}
                        disabled={isLoading || submitDisabled}
                    >
                        {isLoading ? loadingText : submitText}
                    </button>
                )}
            </div>
    )
}

