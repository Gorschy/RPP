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


