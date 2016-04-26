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
  TouchableOpacity,
  TabBarIOS,
} from 'react-native';
var Player = require("./player.ios")
var {height, width} = Dimensions.get('window');
var Icon = require('react-native-vector-icons/FontAwesome');

// list view variables
var listDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


class SCPlayer extends Component {
  constructor(props) {
    super(props)
		this.state = {
      track_models: [],
      selectedTab: 'searchTab',
      selectedTrack: "",
	 	}
    this.setTrack = this.setTrack.bind(this)
    this.renderTrack = this.renderTrack.bind(this)
  }
  render() {
    listDS.cloneWithRows(this.state.track_models)
return (
    <TabBarIOS tintColor="white"
        barTintColor="black"
    >
        <Icon.TabBarItem
          title="Search"
          iconName="search"
          selectedIconName="search"
          selected={this.state.selectedTab === 'searchTab'}
          onPress={() => {
          this.setState({
           selectedTab: 'searchTab',
          });
        }}>
        <View style={styles.container}>
          <Player/>
          <View style={styles.header}>
            <Image style={styles.logo} source={{uri: "http://3.bp.blogspot.com/-PzpJFD56NmM/U4OEGvGR5pI/AAAAAAAAIO8/s9UBNaw800A/s1600/soundcloud.png"}}/>
            <Text style={styles.headerText}>SOUNDCLOUD QUERY</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.fetchData(text)}
            placeholder="SEARCH TRACKS"
          />
          <ListView enableEmptySections={true} style={styles.listView}
              dataSource={listDS.cloneWithRows(this.state.track_models)}
              renderRow={this.renderTrack}
           />
        </View>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Player"
          iconName="play"
          selectedIconName="play"
          selected={this.state.selectedTab === 'playTab'}
          onPress={() => {
          this.setState({
           selectedTab: 'playTab',
          });
        }}>
        <Player track={this.state.selectedTrack.track}/>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
  setTrack(track) {
    this.setState({
          selectedTrack: {track}
        });
  }
  renderTrack(track){
    var imageURL = track.artwork_url
    if(imageURL == null) {
      imageURL = "http://3.bp.blogspot.com/-PzpJFD56NmM/U4OEGvGR5pI/AAAAAAAAIO8/s9UBNaw800A/s1600/soundcloud.png"
    }
    return (
      <TouchableOpacity onPress={() => this.setTrack(track)}>
        <View style={styles.trackView}>
          <Image source={{uri: imageURL}} style={styles.thumbnail}/>
          <View style={styles.infoContainer}>
            <Text numberOfLines={1} style={styles.titleText}>{track.title}</Text>
            <Text numberOfLines={1} style={styles.userText}>{track.user.username}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
    backgroundColor: 'white',
  },
  listView: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
  },
  trackView: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    width: width - 40,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 6,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: 'white',
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
    width: width - 20 - 75 - 5 -20
  },
  header: {
    height: 100,
    backgroundColor: 'black',
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  logo: {
    height: 60,
    width: 60,
  }
});

AppRegistry.registerComponent('SCPlayer', () => SCPlayer);
