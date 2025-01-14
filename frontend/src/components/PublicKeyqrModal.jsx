import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-hot-toast'

const PublicKeyQRModal = ({ publicKey, isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    const handleCopy = async() => {
        await navigator.clipboard.writeText(publicKey);
        toast.success("Public Key copied");

    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Your Public Key QR Code</h3>

                    {/* QR Code */}
                    {publicKey ? (
                        <QRCodeSVG value={publicKey} size={256} className="mx-auto mb-4" />
                    ) : (
                        <p className="text-red-500">Public key is not available.</p>
                    )}

                    {/* Public Key Display */}
                    {publicKey && (
                        <div>
                            <p className="text-sm text-gray-700 mb-4">{publicKey}</p>
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
                            >
                                Copy Public Key
                            </button>
                        </div>
                    )}
                </div>

                {/* Close Button */}
                <div className="mt-4 text-center">
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PublicKeyQRModal;
