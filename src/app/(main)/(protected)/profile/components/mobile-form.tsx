"use client"
import { X } from "lucide-react";
import Form from "./form";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CustomModal = ({ isOpen = true, onClose, }: ModalProps) => {

    if (!isOpen) return null;

    return (
        // <div className="fixed inset-0 z-50 flex items-center justify-center ">
        //     <div
        //         className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        //         onClick={onClose}
        //     />

        //     {/* Modal Content */}
        //     <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
        //         <div className="flex items-center justify-between p-4 border-b">
        //             <h3 className="font-semibold text-lg">{title || "Edit Profile"}</h3>
        //             <button
        //                 onClick={onClose}
        //                 className="p-1 rounded-full hover:bg-muted transition-colors"
        //             >
        //                 <X className="w-5 h-5" />
        //             </button>
        //         </div>

        //         <div className=" max-h-[80vh] overflow-y-auto">
        //             <Form />
        //         </div>
        //     </div>
        // </div>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in duration-200">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Form Content */}
                <div >
                    <Form />
                </div>
            </div>
        </div>
    );
};
export default CustomModal