import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getHistory } from "../actions/index";

import * as firebase from "firebase";
import "firebase/firestore";

import Preloader from "../components/Preloader/Preloader";
import ItemList from "../components/ItemList/ItemList";



const History = ({ historyList, getHistory, navigation }) => {
  const [loading, setLoading] = useState(true);

  const uid = firebase.auth().currentUser.uid;
  const db = firebase.firestore();

  const clearHistory = () => {
    setLoading(true);

    db
      .collection("History")
      .doc(uid)
      .collection("list")
      .get()
      .then(snapshot => {
        const batch = db.batch();
        snapshot.forEach((doc) => batch.delete(doc.ref));
        return batch.commit();
      })
  }

  useEffect(() => {
    setLoading(true);

    db
      .collection("History")
      .doc(uid)
      .collection("list")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        let list = [];
        snapshot.forEach((doc) => list.push(doc.data()));
        getHistory(list);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <TouchableOpacity onPress={() => clearHistory()}>
          <Text style={styles.clear}>Clear</Text>
        </TouchableOpacity>
      </View>

      {!loading ?
        <FlatList
          data={historyList}
          renderItem={({ item }) => (<ItemList item={item} navigation={navigation} />)}
          style={styles.flatList}
          keyExtractor={() => `f${(~~(Math.random() * 1e8)).toString(16)}`}
        /> : <Preloader />
      }
    </View>
  )
};

const mapStateToProps = (state) => ({
  historyList: state.historyList,
});

export default connect(mapStateToProps, { getHistory })(History);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#ccc",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: "#43676A",
    borderBottomWidth: 1,
    padding: 20,
  },
  clear: {
    color: '#43676A',
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});
