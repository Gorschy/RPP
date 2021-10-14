/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      given_name
      family_name
      phone_number
      admin
      carbon_reports {
        items {
          id
          userID
          date
          totalCarbon
          transportCarbon
          electricityCarbon
          gasCarbon
          wasteCarbon
          waterCarbon
          paperCarbon
          foodDrinkCarbon
          eventsCarbon
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        given_name
        family_name
        phone_number
        admin
        carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
      userID
      user {
        id
        email
        given_name
        family_name
        phone_number
        admin
        carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
      date
      totalCarbon
      transportCarbon
      electricityCarbon
      gasCarbon
      wasteCarbon
      waterCarbon
      paperCarbon
      foodDrinkCarbon
      eventsCarbon
      createdAt
      updatedAt
    }
  }
`;
export const listReports = /* GraphQL */ `
  query ListReports(
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        user {
          id
          email
          given_name
          family_name
          phone_number
          admin
          createdAt
          updatedAt
        }
        date
        totalCarbon
        transportCarbon
        electricityCarbon
        gasCarbon
        wasteCarbon
        waterCarbon
        paperCarbon
        foodDrinkCarbon
        eventsCarbon
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSolutions = /* GraphQL */ `
  query GetSolutions($id: ID!) {
    getSolutions(id: $id) {
      id
      title
      desc
      coordX
      coordY
      filledP
      totalP
      type
      goal
      funding
      backerCount
      visibility
      priority
      createdAt
      updatedAt
    }
  }
`;
export const listSolutions = /* GraphQL */ `
  query ListSolutions(
    $filter: ModelSolutionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSolutions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        desc
        coordX
        coordY
        filledP
        totalP
        type
        goal
        funding
        backerCount
        visibility
        priority
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
