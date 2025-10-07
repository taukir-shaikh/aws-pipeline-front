import { useState, useRef } from "react";
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  List,
  ListItem,
  Text,
  useOutsideClick,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { pipelines } from "../../data/pipelines";
import PipelineModal from "./PipelineModal";
import {FaTimes} from "react-icons/fa";

const PipelineSearch = () => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const ref = useRef(null); // ✅ create the ref

  // ✅ Attach the ref here
  useOutsideClick({
    ref: ref,
    handler: () => setShowResults(false),
  });

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (!value.trim()) {
      setFiltered([]);
      setShowResults(false);
      return;
    }

    const matched = Object.keys(pipelines).flatMap((key) =>
      key.includes(value) || value.includes(key)
        ? pipelines[key]
        : pipelines[key].filter((pipe) =>
            pipe.name.toLowerCase().includes(value)
          )
    );

    setFiltered(matched);
    setShowResults(true);
  };

  const handleSelect = (pipeline) => {
    setSelectedPipeline(pipeline);
    setShowResults(false);
  };

  return (
    <Box position="relative" ref={ref} width="100%" maxW="600px">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" mt={3} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search AWS pipelines..."
          value={query}
          onChange={handleSearch}
          bg="gray.50"
          _focus={{ bg: "white", borderColor: "teal.400" }}
          rounded="full"
          px={5}
          py={6}
        />
        {query && (
          <InputRightElement>
            <IconButton
            mt={1}
              size="sm"
              variant="ghost"
              icon={<FaTimes/>}
              onClick={() => {
                setQuery("");
                setFiltered([]);
              }}
            />
          </InputRightElement>
        )}
      </InputGroup>

      {showResults && filtered.length > 0 && (
        <List
          position="absolute"
          top="50px"
          width="100%"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          zIndex="1000"
          maxH="250px"
          overflowY="auto"
        >
          {filtered.map((pipe, index) => (
            <ListItem
              key={index}
              p={3}
              _hover={{ bg: "gray.100", cursor: "pointer" }}
              onClick={() => handleSelect(pipe)}
            >
              <Text fontWeight="medium">{pipe.name}</Text>
              <Text fontSize="sm" color="gray.500">
                Region: {pipe.region}
              </Text>
            </ListItem>
          ))}
        </List>
      )}

      {selectedPipeline && (
        <PipelineModal
          pipeline={selectedPipeline}
          onClose={() => setSelectedPipeline(null)}
        />
      )}
    </Box>
  );
};

export default PipelineSearch;
