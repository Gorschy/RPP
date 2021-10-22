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
        description
        project_carbon_reports {
          items {
          id
          projectID
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
      nextToken
    }
  }
`;

export const getID = /* GraphQL */ `
query getID(
    $filter: ModelUserFilterInput
    $limit: Int
  ){
  listUsers (filter: $filter, limit: $limit){
    items {
      id
    }
  }
}
`;

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      admin
    }
  }
`;