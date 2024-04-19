import React, { useState, useEffect } from 'react';
import {  View,Text,TextInput, Button,FlatList,TouchableOpacity, StyleSheet, Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PasswordRepository = () => {
  const [passwords, setPasswords] = useState([]);
  const [passwordText, setPasswordText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    loadPasswords();
  }, []);

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

  const savePasswords = async (newPasswords) => {
    try {
      await AsyncStorage.setItem('passwords', JSON.stringify(newPasswords));
    } catch (error) {
      console.error('Error saving passwords:', error);
    }
  };

  const addPassword = () => {
    if (passwordText.trim() === '') {
      Alert.alert('Password is empty!');
      return;
    }
    const newPassword = { id: Date.now().toString(), password: passwordText };
    const updatedPasswords = [...passwords, newPassword];
    setPasswords(updatedPasswords);
    savePasswords(updatedPasswords);
    setPasswordText('');
  };

  const editPassword = (index) => {
    setPasswordText(passwords[index].password);
    setEditingIndex(index);
  };

  const updatePassword = () => {
    if (passwordText.trim() === '') {
      Alert.alert('Password is empty!');
      return;
    }
    const updatedPasswords = [...passwords];
    updatedPasswords[editingIndex].password = passwordText;
    setPasswords(updatedPasswords);
    savePasswords(updatedPasswords);
    setPasswordText('');
    setEditingIndex(null);
  };

  const deletePassword = (index) => {
    const updatedPasswords = [...passwords];
    updatedPasswords.splice(index, 1);
    setPasswords(updatedPasswords);
    savePasswords(updatedPasswords);
  };

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={passwordText}
        onChangeText={(text) => setPasswordText(text)}
      />
      {editingIndex === null ? (
        <Button title="Add Password" onPress={addPassword} />
      ) : (
        <Button title="Update Password" onPress={updatePassword} />
      )}
      <FlatList
        style={styles.list}
        data={passwords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

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

export default PasswordRepository; 
