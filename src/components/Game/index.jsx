import React, { Component } from 'react';
/* Location 8 */
import awsvideoconfig from '../../aws-video-exports';

/* Location 10 */
import { Auth, Analytics, API, graphqlOperation } from 'aws-amplify';
import { onCreateQuestion, onUpdateQuestion, onUpdateGameId } from '../../graphql/subscriptions';
/* Location 15 */
import { createAnswer } from '../../graphql/mutations';

import Video from '../Video';
import Modal from '../Modal';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      drawInfo: {}, //don't need to add gameID unless you want  or need to.  Optional , Sam usually doesn't
    };
    console.log("Game/constructor --> Made it here");
    console.log("Game/constructor: state.modalVisible",JSON.stringify(this.state.modalVisible));
    console.log("Game/constructor: state.drawInfo",JSON.stringify(this.state.drawInfo));
  }

  async componentDidMount() {
    this.listenForQuestions();
    this.listenForAnswers();
    this.listenForGameID();
    this.setupClient();
    
    console.log("Game/componentDidMount --> Made it here");
  }

  async setupClient() {
    /* Location 16 */
    console.log("Game/setupClient --> Made it here");
    const self = this;
    
    
    
    const authData = await Auth.currentSession();
    this.setState({gameID:'2', username:authData.idToken.payload['cognito:username']})
    try {
        const newAnswer = await API.graphql(graphqlOperation(createAnswer, { input: { gameID: '2', owner: authData.idToken.payload['cognito:username'] } }));
        console.log("Game/setupClient/graph/createAnswer/then --> Made it here");
        console.log("Game/setupClient/graph/createAnswer/then: res: ",JSON.stringify(newAnswer));
        
        //analytics plugin
        trackUserIdforPinpoint();
    } catch(Error){console.log('Error: ',Error)}

        
  }
  
  
  
/*
Original setup fuction
  setupClient = () => {

    console.log("Game/setupClient --> Made it here");
    const self = this;
    
    
    
    Auth.currentSession()
      .then((data) => {
        //added with Sam
        this.setState({gameID:'1', username:data.idToken.payload['cognito:username']})
        //
        API.graphql(
          graphqlOperation(createAnswer, { input: { gameID: '1', owner: data.idToken.payload['cognito:username'] } }),
        ).then(((res) => {
          console.log("Game/setupClient/graph/createAnswer/then --> Made it here");
          console.log("Game/setupClient/graph/createAnswer/then: res: ",JSON.stringify(res));
        })).catch((err) => {
          console.log('err: ', err);
      });
    });
        
  }

*/  
  
  
  
  

listenForQuestions = () => {
    const self = this;
    console.log("Game/listenForQuestions --> Made it here");
    //console.log("self: ",JSON.stringify(self));    
    API.graphql(
      graphqlOperation(onCreateQuestion),
    ).subscribe({
      next: (data) => {
        self.setState({
          drawInfo: data.value.data,
          modalVisible: true,
        });
        console.log("Game/listenForQuestions/graph/onCreateQuestion --> Made it here");
        //console.log("Game/listenForQuestions/graph/onCreateQuestion: data",JSON.stringify(data));  
        console.log("Game/listenForQuestions/graph/onCreateQuestion: drawInfo=data.value.data=",JSON.stringify(data.value.data));  
        setTimeout(() => {
        this.setState({
          modalVisible: false,
        });
      }, 10000);
      },
    });


  }


  listenForAnswers = () => {
    const self = this;
    console.log("Game/listenForAnswers --> Made it here");
    //console.log("self: ",JSON.stringify(self));      
    API.graphql(
      graphqlOperation(onUpdateQuestion),
    ).subscribe({
      next: (data) => {
        self.setState({
          drawInfo: data.value.data,
          modalVisible: true,
        });
        console.log("Game/listenForAnswers/graph/onUpdateQuestion --> Made it here");
        //console.log("Game/listenForAnswers/graph/onUpdateQuestion: data",JSON.stringify(data));  
        console.log("Game/listenForAnswers/graph/onUpdateQuestion: drawInfo=data.value.data=",JSON.stringify(data.value.data));         
        setTimeout(() => {
        this.setState({
          modalVisible: false,
        });
      }, 10000);
      },
    });


  }





  listenForGameID = () => {
    const self = this;
    console.log("Game/listenForGameID --> Made it here");
    //console.log("self: ",JSON.stringify(self));      
    API.graphql(
      graphqlOperation(onUpdateGameId),
    ).subscribe({
      next: (data) => {
        self.setState({
          gameID: data.value.data.onUpdateGameID.gameID
        });
        console.log("Game/listenForGameID/graph/onUpdateGameID --> Made it here");
        //console.log("Game/listenForGameID/graph/onUpdateQuestion: data",JSON.stringify(data));  
        console.log("Game/listenForGameID/graph/onUpdateGameID: drawInfo=data.value.data=",JSON.stringify(data.value.data));         
      },
    });


  }


  callbackFunction = (childData) => {
    /* Location 14 */
  }

  render() {
    /* Location 9 */
    const url = awsvideoconfig.awsOutputLiveLL;
    //added username and gameinfo with Sam
    const { modalVisible, drawInfo, username, gameID } = this.state;
    return (
      <div className="game-container">
        <Video
          controls
          src={url}
          bigPlayButton={false}
          parentCallback={this.callbackFunction}
          autoplay
        />
        <Modal className={modalVisible ? 'show' : 'hidden'} drawInfo={drawInfo} username={username} gameID={gameID} /> {/*added username and gameID with Sam*/}
      </div>
    );
  }
}

export default Game;

//added analytics
Analytics.autoTrack('session', {
    enable: true,
    provider: 'AWSPinpoint'
});

Analytics.autoTrack('pageView', {
    enable: true,
    eventName: 'pageView',
    type: 'SPA',
    provider: 'AWSPinpoint',
    getUrl: () => {
        return window.location.origin + window.location.pathname;
    }
});

const mappedobjects = f => obj =>
  Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: f(obj[key]) }), {});
const Arrayofourstrings = value => [`${value}`];
const mapArrayofourstrings = mappedobjects(Arrayofourstrings);

async function trackUserIdforPinpoint() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const userAttributes = mapArrayofourstrings(attributes);
    console.log(JSON.stringify(userAttributes));
    Analytics.updateEndpoint({
      address: attributes.email,      
      channelType: 'EMAIL',      
      optOut: 'NONE',      
      userId: attributes.sub,      
      userAttributes,    
    });
  } 

