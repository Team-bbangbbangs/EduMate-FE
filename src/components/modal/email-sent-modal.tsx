'use client';

import { Mail } from 'lucide-react';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalOverlay,
  ModalPortal,
} from './base-modal';

interface EmailSentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EmailSentModal({ open, onOpenChange }: EmailSentModalProps) {
  const handleConfirm = () => {
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalPortal>
        <ModalOverlay />
        <ModalContent aria-describedby={undefined} className="max-w-md rounded-xl px-8 py-6">
          <ModalHeader className="w-full">
            <ModalTitle className="flex flex-col items-center justify-center gap-4 text-[20px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-gray-800">이메일이 발송되었습니다</span>
            </ModalTitle>
          </ModalHeader>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleConfirm}
              className="rounded-md bg-slate-800 px-6 py-2 font-bold text-white transition-colors hover:bg-slate-950"
            >
              확인
            </button>
          </div>
        </ModalContent>
      </ModalPortal>
    </Modal>
  );
}
