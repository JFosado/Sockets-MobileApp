import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'; // Importa Alert desde 'react-native'
import WebSocket from 'react-native-websocket';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 
import { insertList } from '../api'; // Importa la función insertList desde el archivo api.js


const Buttons = () => {

  const [valorPotenciometro, setValorPotenciometro] = useState('0');
  const [TemperaturaActual, setTemperaturaActual] = useState('0');
  const [objetoDetectado, setObjetoDetectado] = useState(false);
  const [DistanciaObjeto, setDistanciaObjeto] = useState(0);


  useEffect(() => {
  }, []);

  const handleData = (message) => {
    const data = message.data.split(',');
    setValorPotenciometro(data[0]);
    setTemperaturaActual(data[1]);
    setDistanciaObjeto(data[2]);
    setObjetoDetectado(data[2] < 20); // Suponiendo que la detección se realiza a menos de 20 cm
  };

  const onOpen = (event) => {
    console.log("Conexión WebSocket abierta");
  };

  const generarCodigoAleatorio = () => {
    return Math.floor(1000 + Math.random() * 9000); // Genera un número aleatorio de 4 dígitos
  };

  const guardarDatos = async () => {
    try {
      const codigo = generarCodigoAleatorio(); // Genera el código aleatorio
      const datosAGuardar = {
        code: codigo, // Inserta el código aleatorio
        valorPotenciometro,
        TemperaturaActual,
        objetoDetectado: objetoDetectado ? 'Sí' : 'No', // Representa "Sí" o "No" en lugar de true o false
        DistanciaObjeto
      };

      // Guardar los datos localmente
      await AsyncStorage.setItem('datosGuardados', JSON.stringify(datosAGuardar));

      // Enviar los datos a la base de datos a través de la API
      await insertList(datosAGuardar);
      
      console.log('Datos guardados y enviados a la base de datos:', datosAGuardar);

      // Mostrar alerta de guardado exitoso
      Alert.alert('Guardado exitoso', 'Los datos se han guardado correctamente.');

    } catch (error) {
      console.error('Error al guardar los datos:', error);
      // Mostrar alerta de error si ocurre algún problema
      Alert.alert('Error', 'Ha ocurrido un error al intentar guardar los datos.');
    }
  };





  return (
    <View style={styles.Maincontainer}>
      

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={guardarDatos}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Mostrar</Text>
        </TouchableOpacity>
      </View>

     
    </View>
  );
};

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  
  },
 
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 25,
    backgroundColor:"#F6F6F6",
    height:60
  },
  button: {
    backgroundColor: '#FF7C0C',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Buttons;



