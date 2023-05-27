import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Modal, Alert, Pressable } from 'react-native';
import Table from '../Components/TableDatos';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

interface IUser {
  Cedula: string;
  Nombrecompleto: string;
  Apellidos: string;
  creditos: string;
}

export const Listado = () => {
  const [ModalEli, setModalEli] = useState(false)
  const DeleteStudent = (Cedula: string) => {
    if (Cedula != null) {


      axios.delete('https://apirrestjean.azurewebsites.net/DeleteStudents', {
        data: { Cedula: Cedula }
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });


    } else {
      console.log("Debes añadir la cedula")
    }

  }
  const [Datosvalue, setDatos] = useState([]);

  const GetStudent = () => {
    axios.get('https://apirrestjean.azurewebsites.net/Getstudents').then(Response => {
      setDatos(Response.data)
    }).catch(err => console.log(err));
  }
  GetStudent();
  const Item = ({ Datosvalue }: { Datosvalue: IUser }) => (
    <View
      style={{
        backgroundColor: '#39948d',
        borderRadius: 10,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }}>
      <Text style={styles.texto}>CEDULA: {Datosvalue.Cedula}</Text>
      <Text style={styles.texto}> NOMBRE: {Datosvalue.Nombrecompleto}</Text>
      <Text style={styles.texto}> APELLIDOS: {Datosvalue.Apellidos}</Text>
      <Text style={styles.texto}> CREDITOS: {Datosvalue.creditos}</Text>
      <TouchableOpacity style={styles.btnEliminar} onPress={() => { DeleteStudent(Datosvalue.Cedula); setModalEli(true) }}>
        <Text style={styles.textoBtn}>
          Eliminar
        </Text>
      </TouchableOpacity>
    </View>
  )
  return (
    <View style={{ flex: 1 }}>

      <FlatList
        data={Datosvalue}
        renderItem={({ item }) => <Item Datosvalue={item} />}
        keyExtractor={(item: IUser) => item.Cedula}
      />

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={ModalEli}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalEli(!ModalEli);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Eliminado exitosamente </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalEli(!ModalEli)}>
                <Text style={styles.textStyle}>cerrar </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10
  },
  btnEliminar:
  {
    backgroundColor: 'red',
    width: 120,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center'
  },
  textoBtn:
  {
    fontSize: 20,
    fontFamily: 'Arial',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  ContendorPrincipal: {
    flex: 1,
    backgroundColor: '#000040',
    flexDirection: 'column',
    width: '100%'
  },
  TextoDato: {
    width: '100%',
    fontSize: 30,
    fontFamily: 'Arial',
    color: 'white',
    marginLeft: 55,
    position: 'relative',
    bottom: 20
  },
  txtCampo: {
    backgroundColor: 'white',
    color: 'black',
    width: 300,
    borderRadius: 10,
    marginLeft: 60,
    marginBottom: 5,
    position: 'relative',
    bottom: 20
  },
  btn: {
    textAlign: 'center',
    backgroundColor: '#4FFFFF',
    width: 250,
    height: 60,
    borderRadius: 100,
    marginTop: 30,
    marginLeft: 85,
    alignItems: 'center',
    marginBottom: 20
  },
  txtbtn: {
    width: 200,
    fontSize: 30,
    fontFamily: 'Arial',
    color: 'black',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 6,
    justifyContent: 'center'

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: 330,
    height: 190,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 110,

  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
});

