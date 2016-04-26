import React, {
  StyleSheet,
  View,
  Text,
  Component,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
let clientId = "b9c5fb9e9a2a62aa8de88e2bff32580f"
var audioPlayer = require('react-native').NativeModules.RNAudioPlayerURL;

class Player extends Component {
  constructor(props) {
    super(props)
    if (this.props.track) {
      audioPlayer.initWithURL("track.stream_url") // temporary url to show we can play songs with audio pkayer module
      audioPlayer.play()
    }
	}
  render()
  {
    if (this.props.track) {
      var artwork_url = "http://3.bp.blogspot.com/-PzpJFD56NmM/U4OEGvGR5pI/AAAAAAAAIO8/s9UBNaw800A/s1600/soundcloud.png"
        if(this.props.track.artwork_url != null) {
          artwork_url = this.props.track.artwork_url
        }
        return (
          <View style={styles.container}>
            <Text>{this.props.track.title}</Text>
            <Image style={styles.artwork} source={{uri: artwork_url}}/>
          </View>
        )
      } else {
        return (
          <View>
            <Text>
              No Track Selected yet
            </Text>
          </View>
        )
      }
	  }
}

var styles = StyleSheet.create({
  artwork: {
    height: 200,
    width: 200,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

module.exports = Player
