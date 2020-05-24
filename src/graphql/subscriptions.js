/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
      id
      question
      answers
      answerId
    }
  }
`;
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
      id
      question
      answers
      answerId
    }
  }
`;
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
      id
      question
      answers
      answerId
    }
  }
`;
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer($owner: String!) {
    onCreateAnswer(owner: $owner) {
      owner
      gameID
      answer {
        question
        gameID
        answer
      }
    }
  }
`;
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer($owner: String!) {
    onUpdateAnswer(owner: $owner) {
      owner
      gameID
      answer {
        question
        gameID
        answer
      }
    }
  }
`;
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer($owner: String!) {
    onDeleteAnswer(owner: $owner) {
      owner
      gameID
      answer {
        question
        gameID
        answer
      }
    }
  }
`;
