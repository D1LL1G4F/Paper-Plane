import Button from "@kiwicom/orbit-components/lib/Button";
import Modal, {
  ModalHeader,
  ModalFooter,
} from "@kiwicom/orbit-components/lib/Modal";

type AddNewAPIModalProps = {
  onClose: () => void;
};

const AddNewAPIModal = ({ onClose }: AddNewAPIModalProps): JSX.Element => {
  return (
    <Modal onClose={onClose}>
      <ModalHeader title="Add new API" />
      <ModalFooter>
        <Button>Confirm</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewAPIModal;
