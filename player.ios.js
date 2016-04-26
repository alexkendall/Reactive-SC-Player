import React, {
  StyleSheet,
  View,
  Text,
  Component,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image
} from 'react-native';
let clientId = "b9c5fb9e9a2a62aa8de88e2bff32580f"
var audioPlayer = require('react-native').NativeModules.RNAudioPlayerURL;

class Player extends Component {
  constructor(props) {
    super(props)
    if this.props.streamURL {
      audioPlayer.initWithURL("https://api.soundcloud.com/tracks/13158665/stream?client_id=b9c5fb9e9a2a62aa8de88e2bff32580f") // temporary url to show we can play songs with audio pkayer module
      audioPlayer.play()
    }
	}
  render()
  {
        return (
          <View style={styles.placeholder}>
          </View>
        )
	  }
}

var styles = StyleSheet.create({
});

module.exports = Player
