import React, { useEffect, useRef, useState } from "react";
import ModalStyle from "./DraggableModal.module.css";

export default function DraggableModal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && modalRef.current) {
      modalRef.current.style.left = `${e.clientX - dragOffset.x}px`;
      modalRef.current.style.top = `${e.clientY - dragOffset.y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  return (
    <div className={ModalStyle.modalBackdrop} onClick={onClose}>
      <div
        ref={modalRef}
        className={ModalStyle.modalContent}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
      >
        <button className={ModalStyle.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
