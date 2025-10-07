import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Badge,
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalFooter,
  useDisclosure,
  Box,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reservePipeline } from "../../store/slices/pipelineSlice";
import { toast } from "react-toastify";
import { FaArrowAltCircleRight } from "react-icons/fa";

const PipelineModal = ({ pipeline, onClose }) => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState("");

  // ✅ Chakra modal control for Reserve prompt
  const {
    isOpen: isReserveOpen,
    onOpen: onReserveOpen,
    onClose: onReserveClose,
  } = useDisclosure();

  if (!pipeline) return null;

  const handleReserve = async () => {
    await dispatch(reservePipeline({ pipelineId: pipeline.id, duration }));
    toast.success("Pipeline reserved successfully!");
    setDuration("");
    onReserveClose();
    onClose();
  };

  return (
    <>
      {/* MAIN DETAILS MODAL */}
      <Modal isOpen={!!pipeline} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{pipeline.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <Text fontWeight="semibold">Pipeline ID: {pipeline.id}</Text>
            <Text mt={2}>Region: {pipeline.region}</Text>
            <Text mt={2}>
              Status:{" "}
              <Badge
                colorScheme={
                  pipeline.status?.toLowerCase() === "active" ? "green" : "red"
                }
                px={2}
              >
                {pipeline.status}
              </Badge>
            </Text>
            <Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text fontWeight={"semibold"} mb={0}>
                  Waiting Queue
                </Text>
                <Button
                  size={"sm"}
                  leftIcon={<FaArrowAltCircleRight />}
                  colorScheme="teal"
                >
                  Request Pipeline
                </Button>
              </Box>
              <Divider my={2} />
              <Box>
                {/* From api */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <Text key={index}>{pipeline.email}</Text>
                ))}
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            {pipeline.status?.toLowerCase() === "available" ? (
              <Button colorScheme="teal" onClick={onReserveOpen}>
                Reserve
              </Button>
            ) : (
              <Button variant="outline" isDisabled>
                In Use
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* RESERVE PIPELINE MODAL */}
      <Modal isOpen={isReserveOpen} onClose={onReserveClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reserve Pipeline</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Duration (minutes)</FormLabel>
              <Input
                type="time"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleReserve}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={onReserveClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PipelineModal;
