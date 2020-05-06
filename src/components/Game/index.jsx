import React, { Component } from 'react';
/* Location 8 */
import awsvideoconfig from '../../aws-video-exports';

/* Location 10 */
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { onCreateQuestion, onUpdateQuestion } from '../../graphql/subscriptions';
/* Location 15 */
import { createAnswer } from '../../graphql/mutations';

import Video from '../Video';
import Modal from '../Modal';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      drawInfo: {},
    };
  }

  componentDidMount() {
    this.listenForQuestions();
    this.listenForAnswers();
    this.setupClient();
  }

  setupClient = () => {
    /* Location 16 */
    Auth.currentSession()
      .then((data) => {
        API.graphql(
          graphqlOperation(createAnswer, { input: { gameID: '1', owner: data.idToken.payload['cognito:username'] } }),
        ).then(((res) => {
          console.log(res);
        })).catch((err) => {
          console.log('err: ', err);
      });
    });
        
  }

listenForQuestions = () => {
    const self = this;
    API.graphql(
      graphqlOperation(onCreateQuestion),
    ).subscribe({
      next: (data) => {
        self.setState({
          drawInfo: data.value.data,
          modalVisible: true,
        });
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
    API.graphql(
      graphqlOperation(onUpdateQuestion),
    ).subscribe({
      next: (data) => {
        self.setState({
          drawInfo: data.value.data,
          modalVisible: true,
        });
        setTimeout(() => {
        this.setState({
          modalVisible: false,
        });
      }, 10000);
      },
    });


  }

  callbackFunction = (childData) => {
    /* Location 14 */
  }

  render() {
    /* Location 9 */
    const url = awsvideoconfig.awsOutputLiveLL;

    const { modalVisible, drawInfo } = this.state;
    return (
      <div className="game-container">
        <Video
          controls
          src={url}
          bigPlayButton={false}
          parentCallback={this.callbackFunction}
          autoplay
        />
        <Modal className={modalVisible ? 'show' : 'hidden'} drawInfo={drawInfo} />
      </div>
    );
  }
}

export default Game;
