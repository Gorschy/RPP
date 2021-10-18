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
          items {
          editorID
          carbon_reports {
            items{
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
        }
        }
        title
        description
        
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getID = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
    }
  }
`;