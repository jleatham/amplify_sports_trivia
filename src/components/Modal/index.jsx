/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Location 17 */
import { API, graphqlOperation } from 'aws-amplify';
import { updateAnswer } from '../../graphql/mutations';

import './index.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      question: '',
      gameID: '',
      userAnswer: -1,
    };
    console.log("Modal/constructor --> Made it here");
    console.log("Modal/constructor: state: ",JSON.stringify(this.state)); 
    console.log("Modal/constructor: props: ",JSON.stringify(props));
    
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //added username and gameID with sam
    const { drawInfo, className, username, gameID } = nextProps;
    console.log("Modal/getDerivedStateFromProps --> Made it here");
    console.log("Modal/getDerivedStateFromProps: drawInfo: ",JSON.stringify(drawInfo)); 
    console.log("Modal/getDerivedStateFromProps: className: ",JSON.stringify(className)); 
    console.log("Modal/getDerivedStateFromProps: nextProps: ",JSON.stringify(nextProps)); 
    console.log("Modal/getDerivedStateFromProps: prevState: ",JSON.stringify(prevState));     
    if (className === 'hidden') {
      console.log("Modal/getDerivedStateFromProps/className=hidden --> Made it here");
      console.log("Modal/getDerivedStateFromProps/className=hidden: answer,question,gameID,userAnswer = blank or -1");
      return {
        answers: [],
        question: '',
        gameID: '',
        userAnswer: -1,
      };
    }
    let newState = {};
    if ('onCreateQuestion' in drawInfo) {
      if (prevState.userAnswer !== -1) {
        console.log("Modal/getDerivedStateFromProps/onCreateQuestion/userAnswer===-1--> Made it here");
        console.log("Modal/getDerivedStateFromProps/onCreateQuestion/userAnswer===-1: return prevState: ",JSON.stringify(prevState));        
        return prevState;
      }
      newState = drawInfo.onCreateQuestion;
      newState.userAnswer = -1;
      //added with sam
      newState.username = username;
      newState.gameID = gameID;
      //
    } else if ('onUpdateQuestion' in drawInfo) {
        console.log("Modal/getDerivedStateFromProps/onUpdateQuestion in drawInfo--> Made it here");
        newState = drawInfo.onUpdateQuestion;
        console.log("Modal/getDerivedStateFromProps/onUpdateQuestion in drawInfo: newState: ",JSON.stringify(newState)); 
        newState.userAnswer = prevState.userAnswer;
        console.log("Modal/getDerivedStateFromProps/onUpdateQuestion in drawInfo: newState.userAnswer updated: ",JSON.stringify(newState.userAnswer));  
        console.log("Modal/getDerivedStateFromProps/onUpdateQuestion in drawInfo: new newState returned: ",JSON.stringify(newState));        
    }
    return newState;
  }

  answerChosen = (index) => {
    //added with sam
    const { gameID, username, question } = this.state;
    //
    console.log("Modal/AnswerChosen --> Made it here");
    console.log("Modal/AnswerChosen: gameID: ",JSON.stringify(gameID));
    console.log("Modal/AnswerChosen: index = userAnswer: ",JSON.stringify(index));
    /* Location 18 */
    API.graphql(
      graphqlOperation(
        updateAnswer,
        {
          input: {
            gameID,           //was already added by sam but not working
            //answer: [index],
            //answer: [100,200,300],  //graphQL list would turn each item into it's own N numbered list, 1 per item, not useful.
            answer: [{question: question, gameID: gameID, answer:index}],
            owner:username,   //added with sam
            
          },
        },
      ),
    ).then((res) => {
      console.log('Modal/AnswerChosen: successfully submitted answer: ', JSON.stringify(res));
    }).catch((err) => {
      console.log('Modal/AnswerChosen: err: ', JSON.stringify(err));
    });
    
    this.setState({
      userAnswer: index,
    });
     
  }

  drawAnswerButtons = (answers, userAnswer, answerId) => {
      console.log("Modal/drawAnswerButtons --> Made it here");
      console.log("Modal/drawAnswerButtons: answers: ",JSON.stringify(answers));
      console.log("Modal/drawAnswerButtons: userAnswer: ",JSON.stringify(userAnswer));
      console.log("Modal/drawAnswerButtons: answerId: ",JSON.stringify(answerId));
      
      //creates a button for each answer option, each formatted with the styling based on user selection
      //if no userAnswer (not selected an option yet) , then answers = [] , userAnswer = -1 , answerId = null
      const buttons = answers.map((answer, index) => {
          //map loops through answers dictionary, 
          //example answer = "1932"  index = 0, 
          //        answer = "1940" , index = 1
          let className = 'answerButton';
          if (userAnswer === index) {
            console.log("Modal/drawAnswerButtons/userAnswer==index --> Made it here");
            className = className.concat(' selectedAnswer');
            if (answerId && answerId !== userAnswer) {
              console.log("Modal/drawAnswerButtons/userAnswer!==index --> Made it here");
              className = className.concat(' wrongAnswer');
            }
          }
    
          if (answerId === index) {
            console.log("Modal/drawAnswerButtons/answerId==index --> Made it here");
            className = className.concat(' correctAnswer');
          }
    
          return (
            <li>
              {/*button unclickable (disabled) if answer has already chosen ... on click, send the index (0,1, or 2) to answerChosen*/}
              {/*pass array onClick [gameID,question,index]*/}
              {/*will need to change Answer Schema*/}
              <button
                disabled={answerId !== null} 
                onClick={() => this.answerChosen(index)}
                className={className}
                type="button"
              >
                { answer }
              </button>
            </li>
          );
        });

    return (
      <ul>
        {buttons}
      </ul>
    );
  }
  //define gameID as well and pass question and gameID into drawAnswerButtons as well.
  render() {
    const {
      question, answers, answerId, userAnswer,
    } = this.state;
    const { className } = this.props;
    console.log("Modal/render --> Made it here");
    console.log("Modal/render state: question: ",JSON.stringify(question));
    console.log("Modal/render state: answers: ",JSON.stringify(answers));
    console.log("Modal/render state: answerId: ",JSON.stringify(answerId));
    console.log("Modal/render state: userAnswer: ",JSON.stringify(userAnswer));
    return (
      <div className={`modal-container ${className}`}>
        <div data-prevent-distortion>
          <div className="question-container">
            <div className="question">
              <div className="question-title-container">
                <div className="question-title">{ question }</div>
              </div>
              <div className="answers-container">
                <div className="answers">
                  {this.drawAnswerButtons(answers, userAnswer, answerId)} 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  className: PropTypes.string.isRequired,
  drawInfo: PropTypes.shape({
    onCreateQuestion: PropTypes.object,
    onUpdateQuestion: PropTypes.object,
  }),
};
