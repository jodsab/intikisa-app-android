import AsyncStorage from '@react-native-async-storage/async-storage';

/* var USUARIO = "credenciales_nombre"
var PASSWORD = "credenciales_password" */

export const storeNombre = async (name) => {
    try {
      await AsyncStorage.setItem("credenciales_nombre", name)
    } catch (e) {
      // saving error
    }
}

export const storePassword = async (password) => {
    try {
      await AsyncStorage.setItem("credenciales_password", password)
    } catch (e) {
      // saving error
    }
}

export const getNombre = async () => {
    try {
      const value = await AsyncStorage.getItem("credenciales_nombre")
      if(value !== null) {
        // value previously stored
        return(value)
      }
      
    } catch(e) {
      // error reading value
    }
}

export const getPassword = async () => {
    try {
      const value2 = await AsyncStorage.getItem("credenciales_password")
      if(value2 !== null) {
        // value previously stored
        return value2
      }else{
          return ''
      }
    } catch(e) {
      // error reading value
    }
}

export const removeNombre = async () => {
  try {
    await AsyncStorage.removeItem("credenciales_nombre")
    return true;
  } catch(e) {
    return false;
  }
}

export const removePassword = async () => {
  try {
    await AsyncStorage.removeItem("credenciales_password")
    return true;
  } catch(e) {
    return false
  }
}