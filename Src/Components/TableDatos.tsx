import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export const Table = () => {
    const data = [
        { id: 1, nombre: 'John Doe', edad: 25, email: 'john@example.com' },
        { id: 2, nombre: 'Jane Smith', edad: 30, email: 'jane@example.com' },
        // Agrega más datos aquí...
      ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nombre</Text>
        <Text style={styles.headerText}>Edad</Text>
        <Text style={styles.headerText}>Email</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.nombre}</Text>
            <Text style={styles.cell}>{item.edad}</Text>
            <Text style={styles.cell}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
  },
});

export default Table;
