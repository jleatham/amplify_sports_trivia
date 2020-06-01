/* eslint no-param-reassign: ["error", { "props": false }] */
import React, { Component } from 'react';
import './index.css';
import JsonTable from 'ts-react-json-table';
import Popup from 'react-popup';
/* Location 1 */
import { withAuthenticator } from 'aws-amplify-react';

/* Location 3 */
import { API, graphqlOperation } from 'aws-amplify';
import { createQuestion, updateQuestion, createGameId, updateGameId } from '../../graphql/mutations';
import { listGameIDs, getGameId } from '../../graphql/queries';
import logo from './logo.svg';
//import myJson from './questions.json';
//import myJson from './nba-questions.json';
import myJson from './nba-questions.json';

const columns = [{
  key: 'Question',
  label: 'Questions:',
}, {
  key: 'button1',
  label: ' ',
  cell: () => <button type="button">Post Question</button>,
}, {
  key: 'button2',
  label: ' ',
  cell: () => <button type="button">Post Answer</button>,
}];

class Content extends Component {
  tableSettings = {
    header: false,
  }

  handleQuestionClick = (rowData) => {
    console.log("Admin/handleQuestionClick --> Made it here");
    console.log("Admin/handleQuestionClick: rowData: ",JSON.stringify(rowData));   
    //preparing the data for graphQL call, which needs to have an input:{...}
    const question = {
      input: {
        question: rowData.Question,
        answers: rowData.Answers,
      },
    };
    console.log("Admin/handleQuestionClick: question: ",JSON.stringify(question)); 
    API.graphql(graphqlOperation(createQuestion, question)).then((response) => {
      rowData.id = response.data.createQuestion.id;
      console.log("Admin/handleQuestionClick: response: ",JSON.stringify(response)); 
      console.log("Admin/handleQuestionClick: response.data.createQuestion: ",JSON.stringify(response.data.createQuestion)); 
      //console.log(response.data.createQuestion);
    });
  }

  handleAnswerClick = (rowData) => {
    if (rowData.id != null) {
      const question = {
        input: {
          id: rowData.id,
          answerId: rowData.Answer,
        },
      };
      API.graphql(graphqlOperation(updateQuestion, question)).then((response) => {
        console.log(response.data.updateQuestion);
      });
    } else {
      console.log('Nothing');
      Popup.alert('Error: You have not submitted this question yet');
    }
  }

  onClickCell = (event, columnName, rowData) => {
    console.log("onClickCell: columnName: ",JSON.stringify(columnName));
    console.log("onClickCell: rowData: ",JSON.stringify(rowData));
    if (columnName === 'button1') {
      this.handleQuestionClick(rowData);
    } else if (columnName === 'button2') {
      this.handleAnswerClick(rowData);
    }
  }
  
  shoot() {

    API.graphql(graphqlOperation(listGameIDs)).then((response) => {
      console.log("listGameIDs response: ",JSON.stringify(response));
      if ( response.data.listGameIDs.items.length > 0) {
          console.log("gameIDs exist ");
          console.log("gameIDs: ",JSON.stringify(response.data.listGameIDs.items));
           return response;
      } else {
          console.log("no GameIDs, creating now ");
          //const randomNumber = Math.floor(Math.random() * 11);
          const gameID = {
            input: {
              gameID: (Math.floor(Math.random() * 3))
            },
          };    
          
          API.graphql(graphqlOperation(createGameId, gameID)).then((response) => {
            console.log("createGameId response: ",response);
        });  
      }
  }).then((response) => {
      console.log("printing a promise plus data: ",response);
            return API.graphql(graphqlOperation(getGameId, response.data.listGameIDs.items.id)).then((response) => {
                  console.log("getGameId response: ",response);
          });     
  });
  
  
/*
            API.graphql(graphqlOperation(getGameId, response.data.listGameIDs.items.id)).then((response) => {
                  console.log("getGameId response: ",response);
          }); 
  */

  
    
  }
  
  
  async shoot2() {

    const gameList = await API.graphql(graphqlOperation(listGameIDs));
    console.log('shoot2 gameList response: ',JSON.stringify(gameList));
    if ( gameList.data.listGameIDs.items.length > 0) {
              console.log("gameIDs exist ");
              console.log("gameIDs: ",JSON.stringify(gameList.data.listGameIDs.items));
              const newGameID = await API.graphql(graphqlOperation(updateGameId,{
                input: {
                  id: (gameList.data.listGameIDs.items[0].id),
                  //gameID: (Math.floor(Math.random() * 3))
                  gameID: 2
                }
              }));
              console.log("newGameID: ",JSON.stringify(newGameID));
          } else {
              console.log("no GameIDs, creating now ");
              //const randomNumber = Math.floor(Math.random() * 11);
              const gameID = {
                input: {
                  //gameID: (Math.floor(Math.random() * 3))
                  gameID: 2
                },
              };    
              
              const newGameID = await API.graphql(graphqlOperation(createGameId, gameID))
              console.log("createGameId response: ",newGameID);
          }    
    /*
    why isn't the below query working?
    const gameID = await API.graphql(graphqlOperation(getGameId, {
          input: {
            id: (gameList.data.listGameIDs.items[0].id),
          }      
    } ));
    console.log("getGameId response: ",gameID);    
    
    */
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sports Trivia Admin Page - NBA</h1>
          <img className ="App-logo" src={logo} alt="Logo" />
        </header>
        <button onClick={this.shoot2}>Start Trivia Game!</button>
        <JsonTable rows={myJson.Questions} columns={columns} settings={this.tableSettings} onClickCell={this.onClickCell} className="tabelsa" />
      </div>
    );
  }
}

/* Location 2 */
export default withAuthenticator(Content, {includeGreetings: true});

