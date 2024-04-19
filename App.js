import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch,Alert,TouchableOpacity} from 'react-native';
import Card from './components/Card';
import SensorControl from './components/SensorControl';
import SensorList from './components/SensorList';
import Buttons from './components/Buttons';
import WebSocket from 'react-native-websocket';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage desde la nueva ubicación
import { insertList } from './api'; // Importa la función insertList desde el archivo api.js


const App = () => {

  const [TemperaturaActual, setTemperaturaActual] = useState('0');
  const [LDR, setLDR] = useState(true);
  const [DistanciaObjeto, setDistanciaObjeto] = useState('0');
  const [ledEncendido, setLedEncendido] = useState(false); 

  const handleData = (message) => {
    const data = JSON.parse(message.data);
    setTemperaturaActual(data.temperatura);
    // setDistanciaObjeto(data[1]);
    // setLDR(data[2]);
    
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
        TemperaturaActual,
        LDR: LDR ? 'Sí' : 'No', // Representa "Sí" o "No" en lugar de true o false
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
  const backStyle = {
    backgroundColor: getBackgroundColor(LDR)
  };

  return (
    <View style={[styles.container, backStyle]}>
      
      <Text style={styles.welcomeText}>Bienvenido</Text>
      
      <View style={styles.containerCards}>
      <Card title={TemperaturaActual} content="Temperatura" />
      <Card title={DistanciaObjeto} content="Distancia" />
      </View>
      
      <View>
      <SensorControl/>
      </View>

      <View>
        <SensorList/>
      </View>
      <View>
        <Buttons style={styles.btn}></Buttons>
      </View>
      <WebSocket
        url="ws://192.168.121.110:80"
        onOpen={onOpen}
        onMessage={handleData}
        onError={(error) => console.log('Error de WebSocket:', error)}
        reconnect={true}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
 container:{
  
  height:"auto",
  display:"flex",
  justifyContent:"center"
 },
 welcomeText:{
  color:"black",
  textAlign:"left",
  fontSize:30,
  marginLeft:50,
  marginTop:40
 },
 containerCards: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 10,
  marginTop:0
},
btn:{
  backgroundColor:"#F6F6F6",
  position:"absolute",

}
});


function getBackgroundColor(ldr) {
  if(ldr){
    return "#F6F6F6"; 
    }else{
      return "#161D39";
    }
    
  }



export default App;