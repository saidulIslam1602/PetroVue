/**
 * Modal Component
 * Accessible modal dialog for critical operations
 * Designed for oil & gas industry safety and data management
 */

import React, { useEffect } from 'react';
import { ModalBackdrop, ModalContainer, ModalHeader, ModalContent, ModalFooter, CloseButton } from './Modal.styles';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  'data-testid'?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  'data-testid': testId,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={handleBackdropClick} data-testid={testId}>
      <ModalContainer size={size} role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined}>
        {title && (
          <ModalHeader>
            <h2 id="modal-title" style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
              {title}
            </h2>
            <CloseButton onClick={onClose} aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </CloseButton>
          </ModalHeader>
        )}
        
        <ModalContent>{children}</ModalContent>
        
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default Modal;
