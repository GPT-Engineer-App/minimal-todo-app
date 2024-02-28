import React, { useState } from "react";
import { Box, VStack, Heading, Input, IconButton, InputGroup, InputRightElement, List, ListItem, ListIcon, Text, useColorModeValue } from "@chakra-ui/react";
import { FaPlus, FaCheckCircle, FaRegCircle } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const addTask = () => {
    if (inputValue.trim() === "") return;
    const newTasks = [...tasks, { id: Date.now(), text: inputValue, completed: false }];
    setTasks(newTasks);
    setInputValue("");
  };

  const toggleTaskCompletion = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const bgColor = useColorModeValue("blue.100", "blue.700");

  return (
    <VStack p={8} spacing={4}>
      <Heading>Todo App</Heading>
      <InputGroup>
        <Input placeholder="Add a new task..." value={inputValue} onChange={handleInputChange} rounded="md" />
        <InputRightElement width="4.5rem">
          <IconButton h="1.75rem" size="sm" onClick={addTask} icon={<FaPlus />} colorScheme="blue" rounded="md" />
        </InputRightElement>
      </InputGroup>
      <Box w="100%">
        <List spacing={3}>
          {tasks.map((task) => (
            <ListItem key={task.id} display="flex" alignItems="center" bg={bgColor} p={2} rounded="md">
              <ListIcon as={task.completed ? FaCheckCircle : FaRegCircle} onClick={() => toggleTaskCompletion(task.id)} color={task.completed ? "green.500" : "gray.500"} cursor="pointer" />
              <Text as={task.completed ? "del" : ""} pl={2}>
                {task.text}
              </Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  );
};

export default Index;
