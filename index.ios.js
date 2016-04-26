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
  Image,
  Dimensions,
} from 'react-native';
var Player = require("./player.ios")
var {height, width} = Dimensions.get('window');

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
        <View style={styles.header}>
          <Text style={styles.headerText}>SOUNDCLOUD QUERY</Text>
        </View>
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
    console.log(track)
    console.log(track.artwork_url)
    var imageURL = track.artwork_url
    if(imageURL == null) {
      imageURL = "http://3.bp.blogspot.com/-PzpJFD56NmM/U4OEGvGR5pI/AAAAAAAAIO8/s9UBNaw800A/s1600/soundcloud.png"
    }
    return (
      <View style={styles.trackView}>
        <Image source={{uri: imageURL}} style={styles.thumbnail}/>
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>{track.title}</Text>
          <Text style={styles.userText}>{track.user.username}</Text>
        </View>
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
    alignItems: 'center',
  },
  listView: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  trackView: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    width: width - 40,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  thumbnail: {
    height: 75,
    width: 75,
  },
  infoContainer: {
    marginLeft: 5,
    flexDirection: 'column',
  },
  userText: {
    fontSize: 14,
    color: 'gray',
  },
  titleText: {
    fontSize: 18,
    color: 'black',
  },
  header: {
    height: 40,
    backgroundColor: 'black',
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
  },
});

AppRegistry.registerComponent('SCPlayer', () => SCPlayer);
