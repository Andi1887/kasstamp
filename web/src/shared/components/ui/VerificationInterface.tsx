import React from 'react';
import { Button } from './Button';
import { FileUp, X } from 'lucide-react';

export interface VerificationInterfaceProps {
  // File input
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveAttachment: (index: number) => void;
  attachments: File[];

  // Receipt input
  receiptInputRef: React.RefObject<HTMLInputElement>;
  onReceiptInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveReceipt: () => void;
  receipt: File | null;

  // Verification
  onVerify: () => void;
  verifying: boolean;
  verificationResult: string | null;
}

export function VerificationInterface(props: VerificationInterfaceProps) {
  const {
    fileInputRef,
    onFileInputChange,
    onRemoveAttachment,
    attachments,
    receiptInputRef,
    onReceiptInputChange,
    onRemoveReceipt,
    receipt,
    onVerify,
    verifying,
    verificationResult,
  } = props;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Verify a Stamp</h2>
      <div className="content-interface box-interactive relative">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Original File</h3>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center ${
                attachments.length > 0 ? 'border-emerald-500' : 'border-gray-300'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={onFileInputChange}
              />
              {attachments.length === 0 ? (
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  Select File
                </Button>
              ) : (
                <div className="flex items-center justify-between">
                  <span>{attachments[0].name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveAttachment(0)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Receipt File (.kas)</h3>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center ${
                receipt ? 'border-emerald-500' : 'border-gray-300'
              }`}
            >
              <input
                ref={receiptInputRef}
                type="file"
                accept=".kas"
                className="hidden"
                onChange={onReceiptInputChange}
              />
              {!receipt ? (
                <Button
                  variant="outline"
                  onClick={() => receiptInputRef.current?.click()}
                  className="w-full"
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  Select Receipt
                </Button>
              ) : (
                <div className="flex items-center justify-between">
                  <span>{receipt.name}</span>
                  <Button variant="ghost" size="sm" onClick={onRemoveReceipt}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button
            onClick={onVerify}
            disabled={!attachments.length || !receipt || verifying}
            className="w-full"
          >
            {verifying ? 'Verifying...' : 'Verify'}
          </Button>
        </div>
        {verificationResult && (
          <div
            className={`mt-4 p-4 rounded-lg text-center ${
              verificationResult.startsWith('CONFIRMED')
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {verificationResult}
          </div>
        )}
      </div>
    </div>
  );
}
