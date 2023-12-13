import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import {
  Input,
  Stack,
  FormControl,
  Button,
  useToast,
  Select,
  CheckIcon,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateProfile } from "../../redux/hotel/hotelSlice";

const ProfilePage = () => {
  const profile = useSelector((state) => state.profile);
  const defaultFirstName = profile?.firstName || "";
  const defaultLastName = profile?.lastName || "";
  const defaultEmail = profile?.email || "";
  const defaultGender = profile?.gender || "";

  const [firstName, setFirstName] = useState(defaultFirstName);
  const [lastName, setLastName] = useState(defaultLastName);
  const [email, setEmail] = useState(defaultEmail);
  const [gender, setGender] = useState(defaultGender);

  const toast = useToast();
  const dispatch = useDispatch();
  const handleSave = () => {
    const profileData = {
      firstName,
      lastName,
      email,
      gender,
    };
    dispatch(updateProfile(profileData));
    toast.show({
      title: "Data saved!",
      placement: "top",
      variant: "top-accent",
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.show({
      title: "Logout Success",
      placement: "top",
      variant: "top-accent",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Account</Text>
        <FormControl>
          <Stack space={3}>
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              variant="filled"
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />

            <FormControl.Label>Last Name</FormControl.Label>
            <Input
              variant="filled"
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />

            <FormControl.Label>Email</FormControl.Label>
            <Input
              variant="filled"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <FormControl.Label>Gender</FormControl.Label>
            <Select
              variant="filled"
              selectedValue={gender}
              minWidth={200}
              placeholder="Select gender"
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Select.Item label="Male" value="Male" />
              <Select.Item label="Female" value="Female" />
            </Select>
          </Stack>
        </FormControl>
        <Button
          onPress={handleSave}
          colorScheme="primary"
          style={{ marginTop: 15 }}
        >
          Save
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <Text style={styles.item}>Terms & Privacy</Text>
        <Pressable onPress={handleLogout}>
          <Text style={[styles.item, { color: "red" }]}>Log Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "center",
    marginVertical: 15,
  },
  section: {
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProfilePage;
