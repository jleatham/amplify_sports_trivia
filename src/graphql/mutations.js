/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
      id
      question
      answers
      answerId
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
      id
      question
      answers
      answerId
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
      id
      question
      answers
      answerId
    }
  }
`;
export const createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $input: CreateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    createAnswer(input: $input, condition: $condition) {
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
export const updateAnswer = /* GraphQL */ `
  mutation UpdateAnswer(
    $input: UpdateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    updateAnswer(input: $input, condition: $condition) {
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
export const deleteAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $input: DeleteAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    deleteAnswer(input: $input, condition: $condition) {
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
export const createGameId = /* GraphQL */ `
  mutation CreateGameId(
    $input: CreateGameIDInput!
    $condition: ModelGameIDConditionInput
  ) {
    createGameID(input: $input, condition: $condition) {
      id
      gameID
    }
  }
`;
export const updateGameId = /* GraphQL */ `
  mutation UpdateGameId(
    $input: UpdateGameIDInput!
    $condition: ModelGameIDConditionInput
  ) {
    updateGameID(input: $input, condition: $condition) {
      id
      gameID
    }
  }
`;
export const deleteGameId = /* GraphQL */ `
  mutation DeleteGameId(
    $input: DeleteGameIDInput!
    $condition: ModelGameIDConditionInput
  ) {
    deleteGameID(input: $input, condition: $condition) {
      id
      gameID
    }
  }
`;
