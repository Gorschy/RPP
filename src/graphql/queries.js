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
      projects_created {
        items {
          id
          creatorID
          title
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      projects_in {
        items {
          id
          projectID
          editorID
          createdAt
          updatedAt
        }
        nextToken
      }
      hasRegistered
      carbon_units
      offsetted_units
      my_solutions {
        items {
          id
          solutionID
          backerID
          money_amount
          credits
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
        projects_created {
          nextToken
        }
        projects_in {
          nextToken
        }
        hasRegistered
        carbon_units
        offsetted_units
        my_solutions {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      creatorID
      creator {
        id
        email
        given_name
        family_name
        phone_number
        admin
        carbon_reports {
          nextToken
        }
        projects_created {
          nextToken
        }
        projects_in {
          nextToken
        }
        hasRegistered
        carbon_units
        offsetted_units
        my_solutions {
          nextToken
        }
        createdAt
        updatedAt
      }
      editors {
        items {
          id
          projectID
          editorID
          createdAt
          updatedAt
        }
        nextToken
      }
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        creatorID
        creator {
          id
          email
          given_name
          family_name
          phone_number
          admin
          hasRegistered
          carbon_units
          offsetted_units
          createdAt
          updatedAt
        }
        editors {
          nextToken
        }
        title
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSolution = /* GraphQL */ `
  query GetSolution($id: ID!) {
    getSolution(id: $id) {
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
      backers {
        items {
          id
          solutionID
          backerID
          money_amount
          credits
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
export const listSolutions = /* GraphQL */ `
  query ListSolutions(
    $filter: ModelSolutionFilterInput
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
        backers {
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
        projects_created {
          nextToken
        }
        projects_in {
          nextToken
        }
        hasRegistered
        carbon_units
        offsetted_units
        my_solutions {
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
          hasRegistered
          carbon_units
          offsetted_units
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
