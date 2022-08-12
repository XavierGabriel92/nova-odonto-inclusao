import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";

type Props = {
  buttonText: string;
  buttonColor?: string;
  mr?: number;
  size?: string;
  message?: string;
  isLoading?: boolean;
  onClick: () => void;
};

const ConfirmationModal = ({
  buttonText,
  buttonColor,
  onClick,
  mr,
  size = "sm",
  isLoading = false,
  message = "Confirmar ação",
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirm = async () => {
    await onClick();
    onClose();
  };

  return (
    <>
      <Button
        type="button"
        colorScheme={buttonColor}
        size={size}
        mr={mr}
        onClick={onOpen}
        isLoading={isLoading}
      >
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading as="h3" size="md">
              {message}
            </Heading>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Spacer />
            <Button colorScheme="teal" onClick={handleConfirm}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
