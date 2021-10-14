/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      given_name
      family_name
      phone_number
      admin
      carbon_reports {
        items {
          userID
          id
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      given_name
      family_name
      phone_number
      admin
      carbon_reports {
        items {
          userID
          id
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      given_name
      family_name
      phone_number
      admin
      carbon_reports {
        items {
          userID
          id
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
export const createReport = /* GraphQL */ `
  mutation CreateReport(
    $input: CreateReportInput!
    $condition: ModelReportConditionInput
  ) {
    createReport(input: $input, condition: $condition) {
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
      id
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
export const updateReport = /* GraphQL */ `
  mutation UpdateReport(
    $input: UpdateReportInput!
    $condition: ModelReportConditionInput
  ) {
    updateReport(input: $input, condition: $condition) {
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
      id
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
export const deleteReport = /* GraphQL */ `
  mutation DeleteReport(
    $input: DeleteReportInput!
    $condition: ModelReportConditionInput
  ) {
    deleteReport(input: $input, condition: $condition) {
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
      id
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
export const createSolutions = /* GraphQL */ `
  mutation CreateSolutions(
    $input: CreateSolutionsInput!
    $condition: ModelSolutionsConditionInput
  ) {
    createSolutions(input: $input, condition: $condition) {
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
export const updateSolutions = /* GraphQL */ `
  mutation UpdateSolutions(
    $input: UpdateSolutionsInput!
    $condition: ModelSolutionsConditionInput
  ) {
    updateSolutions(input: $input, condition: $condition) {
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
export const deleteSolutions = /* GraphQL */ `
  mutation DeleteSolutions(
    $input: DeleteSolutionsInput!
    $condition: ModelSolutionsConditionInput
  ) {
    deleteSolutions(input: $input, condition: $condition) {
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
