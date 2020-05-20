/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      question
      answers
      answerId
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        question
        answers
        answerId
      }
      nextToken
    }
  }
`;
export const getAnswer = /* GraphQL */ `
  query GetAnswer($owner: String!, $gameID: ID!) {
    getAnswer(owner: $owner, gameID: $gameID) {
      owner
      gameID
      answer
    }
  }
`;
export const listAnswers = /* GraphQL */ `
  query ListAnswers(
    $owner: String
    $gameID: ModelIDKeyConditionInput
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAnswers(
      owner: $owner
      gameID: $gameID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner
        gameID
        answer
      }
      nextToken
    }
  }
`;
