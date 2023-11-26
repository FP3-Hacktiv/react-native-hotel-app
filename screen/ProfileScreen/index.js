import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
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

const ProfilePage = () => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [gender, setGender] = useState("Male");
  const [language, setLanguage] = useState("English");
  const [searchHistory, setSearchHistory] = useState("");
  const [problemReport, setProblemReport] = useState("");
  const toast = useToast();

  const handleSave = () => {
    console.log("Data saved:", {
      firstName,
      lastName,
      email,
      gender,
      language,
      searchHistory,
      problemReport,
    });
    toast.show({
      title: "Data saved!",
      placement: "top",
      variant: "top-accent",
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f0f0f0" }}
      behavior="padding"
    >
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

              <FormControl.Label>Language</FormControl.Label>
              <Select
                variant="filled"
                selectedValue={language}
                minWidth={200}
                placeholder="Select language"
                onValueChange={(itemValue) => setLanguage(itemValue)}
              >
                <Select.Item label="English" value="English" />
              </Select>

              <FormControl.Label>Search History</FormControl.Label>
              <Input
                variant="filled"
                placeholder="Enter your search history"
                value={searchHistory}
                onChangeText={(text) => setSearchHistory(text)}
              />

              <FormControl.Label>Report a Problem</FormControl.Label>
              <Input
                variant="filled"
                placeholder="Enter your problem report"
                value={problemReport}
                onChangeText={(text) => setProblemReport(text)}
              />
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
          <Text style={[styles.item, { color: "red" }]} >Log Out</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "center",
    marginVertical:15
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
