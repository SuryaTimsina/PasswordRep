import React, { useState, useEffect } from 'react';
import {  View,Text,TextInput, Button,FlatList,TouchableOpacity, StyleSheet, Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

} from 'react-native'; // Import necessary components from React Native
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for data storage

const PasswordRepository = () => { // Define the PasswordRepository component
  // State variables for passwords, password text, and editing index
  const [passwords, setPasswords] = useState([]); // Array of passwords
  const [passwordText, setPasswordText] = useState(''); // Text input for new password
  const [editingIndex, setEditingIndex] = useState(null); // Index of password being edited

  // useEffect hook to load passwords from storage when component mounts
  useEffect(() => {
    loadPasswords();
  }, []);

  // Function to load passwords from AsyncStorage
  const loadPasswords = async () => {
    try {
      const storedPasswords = await AsyncStorage.getItem('passwords');
      if (storedPasswords !== null) {
        setPasswords(JSON.parse(storedPasswords));
      }
    } catch (error) {
      console.error('Error loading passwords:', error);
    }
  };

  // Function to save passwords to AsyncStorage
  const savePasswords = async (newPasswords) => {
    try {
      await AsyncStorage.setItem('passwords', JSON.stringify(newPasswords));
    } catch (error) {
      console.error('Error saving passwords:', error);
    }
  };

  // Function to add a new password
  const addPassword = () => {
    // Check if password text is empty
    if (passwordText.trim() === '') {
      Alert.alert('Password is empty!');
      return;
    }
    // Create a new password object with current timestamp as id
    const newPassword = { id: Date.now().toString(), password: passwordText };
    // Update passwords array and save to AsyncStorage
    const updatedPasswords = [...passwords, newPassword];
    setPasswords(updatedPasswords);
    savePasswords(updatedPasswords);
    // Clear the password text input
    setPasswordText('');
  };

  // Function to edit a password
  const editPassword = (index) => {
    // Set password text input to the password being edited
    setPasswordText(passwords[index].password);
    // Set editing index to the index of the password being edited
    setEditingIndex(index);
  };

  // Function to update a password
  const updatePassword = () => {
    // Check if password text is empty
    if (passwordText.trim() === '') {
      Alert.alert('Password is empty!');
      return;
    }
    // Create a copy of passwords array
    const updatedPasswords = [...passwords];
    // Update the password at editing index
    updatedPasswords[editingIndex].password = passwordText;
    // Update passwords array and save to AsyncStorage
    setPasswords(updatedPasswords);
    savePasswords(updatedPasswords);
    // Clear the password text input and reset editing index
    setPasswordText('');
    setEditingIndex(null);
  };

  // Function to delete a password
  const deletePassword = (index) => {
    // Create a copy of passwords array and remove the password at given index
    const updatedPasswords = [...passwords];
    updatedPasswords.splice(index, 1);
    // Update passwords array and save to AsyncStorage
    setPasswords(updatedPasswords);
    savePasswords(updatedPasswords);
  };

  // Function to render each password item
  const renderItem = ({ item, index }) => (
    <View style={styles.passwordContainer}>
      <Text style={styles.passwordText}>{item.password}</Text>
      <TouchableOpacity onPress={() => editPassword(index)}>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deletePassword(index)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  // Return the component structure
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={passwordText}
        onChangeText={(text) => setPasswordText(text)}
      />
      {/* Conditional rendering based on editing state */}
      {editingIndex === null ? (
        <Button title="Add Password" onPress={addPassword} />
      ) : (
        <Button title="Update Password" onPress={updatePassword} />
      )}
      {/* FlatList to display passwords */}
      <FlatList
        style={styles.list}
        data={passwords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// Stylesheet for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordText: {
    flex: 1,
    fontSize: 18,
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default PasswordRepository; // Export the component as default
