import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native'
import React from 'react'

const SensorControl = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Enceder</Text>
      
      <TouchableOpacity style={styles.button}>
      <Image 
        source={require('../assets/cambiar.png')}  // Reemplaza con la ruta de tu imagen
        style={styles.icon}
      />
    </TouchableOpacity>
    </View>
  )
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161D39',
    padding: 20,
    margin: 10,
    borderRadius: 30,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    elevation: 5,  // For Android shadow
    width: '90%', // You can adjust the width based on your design needs
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    color:"white",
    paddingLeft:40
  },
  icon:{
    height:50,
    width:50

  },
  button:{
    backgroundColor:"#FF7C0C",
    borderRadius:100
  }

});


export default SensorControl