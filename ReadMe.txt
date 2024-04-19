*Additional Libraries Required*

@react-native-async-storage/async-storage: This library is used for asynchronous storage in React Native applications. 
It is utilized here to store and retrieve passwords locally on the device.

*App Purpose and Use*

The purpose of this app is to serve as a simple password repository where users can add, edit, and delete passwords.
It allows users to store their passwords locally on their device, providing a convenient and secure way to manage 
their login credentials.

1) Add Password: Users can add a new password to the repository by entering it into the input field and pressing the "Add Password" button.
2) Edit Password: Users can edit an existing password by clicking the "Edit" button next to the password they wish to modify. This will populate
the input field with the selected password, allowing the user to make changes.
3) Delete Password: Users can delete a password by clicking the "Delete" button next to the password they want to remove from the repository.
4) Local Storage: All passwords are stored locally on the device using AsyncStorage, ensuring that the passwords persist across app sessions.
