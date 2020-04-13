import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import { getHistory } from "../actions/index";

import * as firebase from 'firebase';
import 'firebase/firestore';
import Preloader from '../components/Preloader/Preloader';
import ItemList from '../components/ItemList/ItemList';

const History = ({historyList, getHistory}) => {
  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;
    firebase.firestore()
      .collection("History").doc(uid)
      .collection("list").onSnapshot(snapshot => {
        let list = [];
        snapshot.forEach(doc => list.push(doc.data()));
        getHistory(list);
      })
  }, [])

  return historyList.length ? (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
      </View>
      
      <FlatList
        data={historyList}
        renderItem={({ item }) => <ItemList item={item} />}
        style={styles.flatList}
      />
    </View> 
  ) : ( 
    <Preloader /> 
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingHorizontal: 20,
    fontWeight: '600',
    color: '#ccc'
  },
  flatList: {
    marginBottom: 66
  },
  header: {
    borderBottomColor: '#43676A',
    borderBottomWidth: 1,
    paddingVertical: 15
  }
});

const mapStateToProps = (state) => ({
  historyList: state.historyList,
});

export default connect(mapStateToProps, { getHistory })(History);
