import React from 'react';
import {Heading, Button, Flex,Text, Box, Input, Image} from '@chakra-ui/react';
import spotifyLogo from "./spotify.png";

function CustomerDashboardCard({ onLogin }) {
  return (
    <Flex>
    <Box position="absolute" top="0%" left="50%" width="100%" height="20%" transform="translate(-50%, -50%)" padding="1rem" background="black">
      <Image  marginTop="80px" height="35%" width="4%" src={spotifyLogo}/>
    </Box>
    <Text position="absolute" top="2%" left="6%" fontSize="30px" fontWeight="bold" color="white">Newsify</Text>
    <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" padding="1rem" background="black" borderRadius="15px" h="43%" w="35%">
      <Heading size='md' mb={20} top="15%" color="white">Log in to Newsify with your Spotify account:</Heading>
      <Flex direction="column" p={4} alignItems="center"  >
        <Text position="absolute" top="30%" left="20%" fontSize="15px" fontWeight="bold" color="white">Email or Username:</Text>
          <Input placeholder="Username" h="10" w="70%" mb={10} top="35%" color="white" backgroundColor="#333"/>
        <Text position="absolute" top="54%" left="20%" fontSize="15px" fontWeight="bold" color="white">Password:</Text>
          <Input placeholder="Password" h="10" w="70%" backgroundColor="#333" />
      </Flex>
      <Button className="login_btn" colorScheme='green' borderRadius="30" color="black" fontWeight="bold" w="60" onClick={onLogin}>Log in</Button>
    </Box>
    </Flex>
  );
}

export default CustomerDashboardCard;
