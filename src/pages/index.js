import React, { useState } from "react";
import {
  Button,
  Flex,
  Box,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { InputForm } from "../components/input";

export default function Home() {
  const [ID, setID] = useState(null);
  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const generateID = () => Math.round(Math.random() * 1000);

  const handleSubtmitCreateBook = (event) => {
    event.preventDefault();

    if (!title && !author) return;

    setBooks(books.concat({ _id: generateID(), title, author }));

    setTitle("");
    setAuthor("");
  };

  const handleSubtmitUpdateBook = (event) => {
    event.preventDefault();

    if (!title && !author) return;

    setBooks(
      books.map((book) => (book._id === ID ? { title, author, _id: ID } : book))
    );

    setTitle("");
    setAuthor("");
  };

  const handleDeleteBook = (_id) => {
    setBooks(books.filter((book) => book._id !== _id));
  };

  const handleChangeTitle = ({ target }) => {
    setTitle(target.value);
  };

  const handleChangeAuthor = ({ target }) => {
    setAuthor(target.value);
  };

  const handleShowUpdateBookForm = (book) => {
    setID(book._id);
    setTitle(book.title);
    setAuthor(book.author);
  };
  return (
    <Box margin="4">
      {/* Header */}
      <Flex color="white" justifyContent="space-between">
        <Text color="black" fontSize="2xl">
          Crud
        </Text>
        <Button colorScheme="blue">+</Button>
      </Flex>
      {/* Input */}
      <VStack
        marginY="1rem"
        as="form"
        onSubmit={ID ? handleSubtmitUpdateBook : handleSubtmitCreateBook}
      >
        <InputForm
          type="text"
          label="Title"
          name="title"
          value={title}
          onChange={handleChangeTitle}
        />
        <InputForm
          type="text"
          label="Author"
          name="book"
          value={author}
          onChange={handleChangeAuthor}
        />

        <Button
          colorScheme="blue"
          fontSize="sm"
          alignSelf="flex-end"
          type="submit"
        >
          {ID ? "Update" : "Submit"}
        </Button>
      </VStack>
      {/* Table */}
      <Table variant="simple">
        <Thead bgColor="blue.500">
          <Tr>
            <Th textColor="white">Book</Th>
            <Th textColor="white">Author</Th>
            <Th textColor="white">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {books.map((book) => (
            <Tr key={book._id}>
              <Td>{book.title}</Td>
              <Td>{book.author}</Td>
              <Td>
                <Flex justifyContent="space-between">
                  <Button
                    colorScheme="yellow"
                    size="sm"
                    font-size="smaller"
                    onClick={() => handleShowUpdateBookForm(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    font-size="smaller"
                    onClick={() => handleDeleteBook(book._id)}
                  >
                    Remove
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
