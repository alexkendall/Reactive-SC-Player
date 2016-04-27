import React, {
  StyleSheet,
  View,
  Text,
  Component,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

let clientId = "b9c5fb9e9a2a62aa8de88e2bff32580f"
var audioPlayer = require('react-native').NativeModules.RNAudioPlayerURL;
var {height, width} = Dimensions.get('window');
var Slider = require('react-native-slider');

class Player extends Component {
  componentDidMount() {
    setInterval(this.updateSlider, 1000)
  }
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      trackLoaded: false,
      currentTrack: ""
    }
    this.togglePlay = this.togglePlay.bind(this)
    this.updateSlider = this.updateSlider.bind(this)
  }
  loadStream () {
    if (this.props.track) {
      let streamURL = this.props.track.stream_url + "?client_id=b9c5fb9e9a2a62aa8de88e2bff32580f"
      audioPlayer.initWithURL(streamURL) // temporary url to show we can play songs with audio pkayer module
      audioPlayer.play()
      this.state = {
        playing: true,
        trackLoaded: true,
        currentTrack: this.props.track,
        sliderVal: 0.0,
      }
    }
  }
  updateSlider() {
    console.log("should update slider")
    if(this.state.trackLoaded) {
      audioPlayer.getCurrentTime((time) => {
        audioPlayer.getDuration((duration) => {
          this.setState({
            sliderVal: time / duration,
          })
        })
      });
    }
  }
  togglePlay () {
      if(this.state.trackLoaded == false) {
        if(this.props.track) {
          this.loadStream()
          this.setState ({
            playing: true,
            trackLoaded: true,
            currentTrack: this.props.track,
          });
        }
      } else if (this.state.playing) {
        audioPlayer.pause()
        this.setState({
          playing: false,
        });
      } else {
        audioPlayer.play()
        this.setState({
          playing: true,
        });
      }
  }
  render()
  {
    if (this.props.track) {
      if (this.props.track !=  this.state.currentTrack) {
        this.loadStream()
      }
        var artwork_url = "http://3.bp.blogspot.com/-PzpJFD56NmM/U4OEGvGR5pI/AAAAAAAAIO8/s9UBNaw800A/s1600/soundcloud.png"
        if(this.props.track.artwork_url != null) {
          artwork_url = this.props.track.artwork_url
          artwork_url = artwork_url.replace("large", "t500x500")
        }
        var playbackURL = require('./images/pause.png')
        if(!this.state.playing) {
          playbackURL = require('./images/play.png')
        }
        return (
          <View style={styles.container}>
            <Image style={styles.artwork} source={{uri: artwork_url}}/>
            <Slider
              style={styles.slider}
              value={this.state.sliderVal}
              onSlidingComplete={(value) =>
                audioPlayer.getDuration((duration) => {
                  this.setState({
                    sliderVal: value,
                  })
                  audioPlayer.seekToTime(value * duration)
                })
              }
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
            />
            <Text style={styles.title}>{this.props.track.title}</Text>
            <Text style={styles.username}>{this.props.track.user.username}</Text>
            <View style={styles.playbackContainer}>
              <Image style={styles.playbackImage} source={require('./images/rewind.png')}/>
              <TouchableOpacity onPress={this.togglePlay}>
                <Image style={styles.playbackImage} source={playbackURL}/>
              </TouchableOpacity>
              <Image style={styles.playbackImage} source={require('./images/fastForward.png')}/>
            </View>
          </View>
        )
      } else {
        return (
          <View>
          </View>
        )
      }
	  }
}

var styles = StyleSheet.create({
  slider: {
    width: width - 40,
    marginLeft: 20,
    marginRight: 20,
  },
  playbackImage: {
    height: 75,
    width: 75,
    marginRight: 20,
    marginLeft: 20,
  },
  playbackContainer: {
    height: height - width - 160,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  artwork: {
    height: width,
    width: width,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
  username: {
    fontSize: 14,
    color: 'gray'
  },
  thumb: {
    width: 10,
    height: 25,
    borderRadius: 0,
    backgroundColor: '#eaeaea',
    borderColor: '#9a9a9a',
    borderWidth: 1,
  },
  track: {
    height: 10,
    borderRadius: 2,
    backgroundColor: 'white',
    borderColor: '#9a9a9a',
    borderWidth: 1,
  },
});

module.exports = Player
