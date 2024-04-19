import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'; // Importa Alert desde 'react-native'
import { getLists, deleteList } from '../api'; // Importa las funciones de la API

  


const SensorList = () => {
  const [lists, setLists] = useState([]);

  // Obtiene las listas de la API cuando el componente se monta
  useEffect(() => {
    fetchLists();
  }, []);

  // Función para obtener las listas desde la API
  const fetchLists = async () => {
    try {
      const response = await getLists();
      setLists(response); // Actualiza el estado con las listas obtenidas
    } catch (error) {
      console.error('Error al obtener las listas:', error);
    }
  };

  // Función para eliminar un elemento de la lista
  const handleDeleteListItem = async (code) => {
    try {
      // Mostrar alerta de confirmación antes de eliminar
      Alert.alert(
        'Confirmar eliminación',
        '¿Está seguro de que desea eliminar este elemento?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await deleteList(code);
              // Después de eliminar, obtener las listas actualizadas
              fetchLists();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error al eliminar el elemento de la lista:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    {lists.map((item) => (
      <View key={item.code} style={styles.card}>
        <View style={styles.cardBody}>
          <Text style={styles.textItem}>Temperatura:  {item.valorPotenciometro}  °</Text>
          <Text style={styles.textItem}>Distancia: {item.TemperaturaActual}cm</Text>
          <Text style={styles.textItem}>Sensor de luz: {item.objetoDetectado}</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => handleDeleteListItem(item.code)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    ))}
  </ScrollView>
);
};

const styles = StyleSheet.create({
scrollViewContent: {
  flexGrow: 1,
  alignItems: 'center',
  paddingVertical: 20,
},
card: {
  width: '70%',
  backgroundColor: 'white',
  borderRadius: 20,
  marginBottom: 22,
  padding: 15,
  alignItems: 'center',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 6,
},
cardBody: {
  marginBottom: 10,
},
textItem: {
  fontSize: 14,
  marginBottom: 7,
  color: '#161D39',
  textAlign: 'center',
},
buttonDelete: {
  backgroundColor: '#FF7C0C',
  paddingVertical: 10,
  paddingHorizontal: 30,
  borderRadius: 20,
  alignItems: 'center',
  marginTop: 4,
},
buttonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
});
  

export default SensorList