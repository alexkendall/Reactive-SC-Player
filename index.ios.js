/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// required imports
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
} from 'react-native';
var Player = require("./player.ios")

// list view variables
var listDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


class SCPlayer extends Component {
  constructor(props) {
    super(props)
		this.state = {
      track_models: [],
	 	}
  }
  render() {
    listDS.cloneWithRows(this.state.track_models)
    return (
      <View style={styles.container}>
        <Player/>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.fetchData(text)}
          placeholder="SEARCH TRACKS"
        />
        <ListView style={styles.listView}
            dataSource={listDS.cloneWithRows(this.state.track_models)}
            renderRow={this.renderTrack}
         />
      </View>
    );
  }

  renderTrack(track){
    return (
      <View style={styles.trackView}>
        <Text>{track.title}</Text>
      </View>
    );
  }

  fetchData(query) {
    https://api.soundcloud.com/tracks.json?q=\(formattedQuery)&client_id=\(clientId)&limit=50
    let formattedQuery = query.replace(/\s+/g, '+');
    let requestBase = "https://api.soundcloud.com/tracks.json?q="
    let clientAuthExt = "&client_id=b9c5fb9e9a2a62aa8de88e2bff32580f&limit=50"
    let requestURL = requestBase + formattedQuery + clientAuthExt
    fetch(requestURL)
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({
              track_models: responseData
            })
          })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView: {
    marginTop: 20,
  },
  trackView: {
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 50,
    marginRight: 20,
    marginLeft: 20,
  }
});

AppRegistry.registerComponent('SCPlayer', () => SCPlayer);
