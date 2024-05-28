import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      name
    }
  }
`;
export const CREATE_SOLPLACE_LOG_BY_SOLPLACE_NAME = gql`
  mutation CreateSolplaceLogBySolplaceName(
    $solplaceName: String!
    $createSolplaceLogInput: CreateSolplaceLogInput!
  ) {
    createSolplaceLogBySolplaceName(
      solplaceName: $solplaceName
      createSolplaceLogInput: $createSolplaceLogInput
    ) {
      id
      introduction
      solplaceName
      images
      userId
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
