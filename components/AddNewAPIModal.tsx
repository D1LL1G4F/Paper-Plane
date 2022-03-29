import Button from "@kiwicom/orbit-components/lib/Button";
import Modal, {
  ModalHeader,
  ModalFooter,
} from "@kiwicom/orbit-components/lib/Modal";
import useGetMockedOpenAPI from "../utils/hooks/useGetMockedOpenAPI";

type AddNewAPIModalProps = {
  onClose: () => void;
};

const AddNewAPIModal = ({ onClose }: AddNewAPIModalProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useGetMockedOpenAPI("todo...");
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
