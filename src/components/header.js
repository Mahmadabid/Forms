import React from 'react';
import { Box, Text, Center } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      as="header"
      bg="black"
      width="100%"
      py={3} // Padding on the y-axis for space above and below the text
    >
      <Center>
        <Text fontSize={["4xl", "5xl", "5xl"]} fontWeight="bold" color="white" as="h2" >
          CYC Seminar
        </Text>
      </Center>
    </Box>
  );
}

export default Header;
