import React from "react";
import { modalStyles as styles } from "../assets/dummystyle";
import { X } from "lucide-react";

const Model = ({
  isOpen,
  onClose,
  hideHeader,
  children,
  title,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick = () => {},
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {!hideHeader && (
          <div className={styles.header}>
            <h3 className={styles.title}>{title || "Model Title"}</h3>

            {showActionBtn && (
              <button className={styles.actionButton} onClick={onActionClick}>
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}
        <button type="button" onClick={onClose} className={styles.closeButton}>
          <X size={20} />
        </button>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Model;
