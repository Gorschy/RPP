/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($id: String) {
    onCreateUser(id: $id) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($id: String) {
    onUpdateUser(id: $id) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($id: String) {
    onDeleteUser(id: $id) {
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
export const onCreateReport = /* GraphQL */ `
  subscription OnCreateReport($userID: String) {
    onCreateReport(userID: $userID) {
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
export const onUpdateReport = /* GraphQL */ `
  subscription OnUpdateReport($userID: String) {
    onUpdateReport(userID: $userID) {
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
export const onDeleteReport = /* GraphQL */ `
  subscription OnDeleteReport($userID: String) {
    onDeleteReport(userID: $userID) {
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
export const onCreateSolutions = /* GraphQL */ `
  subscription OnCreateSolutions {
    onCreateSolutions {
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
export const onUpdateSolutions = /* GraphQL */ `
  subscription OnUpdateSolutions {
    onUpdateSolutions {
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
export const onDeleteSolutions = /* GraphQL */ `
  subscription OnDeleteSolutions {
    onDeleteSolutions {
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
