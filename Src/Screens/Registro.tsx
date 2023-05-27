import { StackCardInterpolationProps, StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import React, { useState } from 'react'
import { Alert, View, Text, Button, StyleSheet, Modal, Pressable } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';


interface Props extends StackScreenProps<any, any> { };


export const Registro = ({ navigation }: Props) => {
  const [modal, setmodal] = useState(false);
  const AbrirModalError = () => {
    setmodal(true);
  }
  const UpdateStudent = async (nombre: String, Cedula: string, Apellidos: String, Creditos: String) => {
    axios.put('https://apirrestjean.azurewebsites.net/UpdateStudents', {
      NombreCompleto: nombre,
      Cedula: Cedula,
      Apellidos: Apellidos,
      Creditos: Creditos
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(Response => {
      console.log(Response.data)

    }).catch(err => console.log(err));

  }

  const CreateStudent = async (nombre: String, Cedula: string, Apellidos: String, Creditos: String) => {
    axios.post('https://apirrestjean.azurewebsites.net/CreateStudents', {
      Cedula: Cedula,
      NombreCompleto: nombre,
      Apellidos: Apellidos,
      Creditos: Creditos
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(Response => {
      console.log(Response.data)

    }).catch(err => console.log(err));

  }

  const [txtCedula, settxtCedula] = useState('');
  const obtenerCedula = (text: string) => {
    settxtCedula(text);
  }

  const [txtNombrevalue, settxtNombre] = useState('');

  const obtenerNombre = (text: string) => {
    settxtNombre(text);
  }
  const [txtApellidosValue, settxtApellidos] = useState('');

  const obtenerApellidos = (text: string) => {
    settxtApellidos(text);
  }
  const [txtCreditosvalue, settxtcreditos] = useState('');

  const obtenerCreditos = (text: string) => {
    settxtcreditos(text);
  }
  const ValidarCamposVacios = () => {
    if (txtCedula == "") {
      return 'la Cedula'
    } else if (txtNombrevalue == "") {
      return 'el Nombre'
    }
    else if (txtApellidosValue == "") {
      return 'los Apellidos'
    } else if (txtCreditosvalue == "") {
      return ' los Creditos'
    } else {
      return 'no'
    }
  }
  const LimpiarCampos = () => {
    settxtCedula("");
    settxtNombre("");
    settxtcreditos("");
    settxtApellidos("");
  }
  const [modal2, setmodal2] = useState(false)
  const [modal3, setmodal3] = useState(false)
  return (

    <View style={styles.ContendorPrincipal}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal3}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setmodal(!modal3);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Actualizadado exitosamente </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setmodal3(!modal3)}>
                <Text style={styles.textStyle}>cerrar </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal2}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setmodal(!modal2);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Estudiante Registrado Exitosamente </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setmodal2(!modal2)}>
                <Text style={styles.textStyle}>cerrar </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setmodal(!modal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>debes agregar {ValidarCamposVacios()}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setmodal(!modal)}>
                <Text style={styles.textStyle}>cerrar </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>
      <Text style={styles.TextoDato}>Cedula</Text>
      {/* Campo de Cedula */}
      <TextInput value={txtCedula} onChangeText={obtenerCedula} style={styles.txtCampo} inputMode='text' id='Cedula' >

      </TextInput>
      <Text style={styles.TextoDato}>Nombre Completo</Text>
      {/* Campo de Nombre */}
      <TextInput value={txtNombrevalue} onChangeText={obtenerNombre} style={styles.txtCampo} >

      </TextInput>

      <Text style={styles.TextoDato}>Apellidos</Text>
      {/* Campo de Apellidos*/}
      <TextInput value={txtApellidosValue} onChangeText={obtenerApellidos} style={styles.txtCampo}  ></TextInput>

      <Text style={styles.TextoDato}>Creditos</Text>
      {/* Campo de Creditos*/}
      <TextInput value={txtCreditosvalue} onChangeText={obtenerCreditos} style={styles.txtCampo}  ></TextInput>

      <TouchableOpacity style={styles.btn} onPress={() => {
        const Validar = ValidarCamposVacios();
        if (Validar == "no") {
          CreateStudent(txtNombrevalue, txtCedula, txtApellidosValue, txtCreditosvalue);
          setmodal2(true)
          LimpiarCampos();
        } else {
          AbrirModalError();
        }

      }} >
        <Text style={styles.txtbtn}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => {
        const validar = ValidarCamposVacios();
        if (validar == "no") {
          UpdateStudent(txtNombrevalue, txtCedula, txtApellidosValue, txtCreditosvalue)
          setmodal3(true);
          LimpiarCampos();
        } else {
          AbrirModalError();
        }



      }} >
        <Text style={styles.txtbtn}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Listado')}>
        <Text style={styles.txtbtn}>Ir al listado</Text>
      </TouchableOpacity>



    </View>
  )
}

const styles = StyleSheet.create({

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

