import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface ConfirmDeleteModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  show,
  onHide,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>削除の確認</Modal.Title>
      </Modal.Header>
      <Modal.Body>この項目を本当に削除しますか？</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          キャンセル
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          削除
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
