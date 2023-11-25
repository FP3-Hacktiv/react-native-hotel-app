import React, { useState } from "react";
import {
  Input,
  Stack,
  FormControl,
  Button,
  Heading,
  useToast,
} from "native-base";
import { useDispatch } from "react-redux";
import { login } from "../../redux/hotel/hotelAction";

export const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (!username || !password) {
      return toast.show({
        title: "Username and Password is Required",
        placement: "top",
        variant: "top-accent",
      });
    }
    const response = await dispatch(login({ username, password }));

    if (response) {
      return toast.show({
        title: "Login Success",
        placement: "top",
        variant: "top-accent",
      });
    }
  };

  return (
    <FormControl style={{ flex: 1, justifyContent: "center" }}>
      <Heading mb={6} textAlign="center" color="primary.500">
        Login
      </Heading>
      <Stack space={5} p={4}>
        <Stack>
          <FormControl.Label>Username</FormControl.Label>
          <Input
            variant="underlined"
            p={2}
            placeholder="Enter your username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </Stack>
        <Stack>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            variant="underlined"
            p={2}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </Stack>
        <Button
          colorScheme="primary"
          onPress={handleSignIn}
          _pressed={{ bg: "primary.500" }}
        >
          Login
        </Button>
      </Stack>
    </FormControl>
  );
};
