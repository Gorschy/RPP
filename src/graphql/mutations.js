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
          description
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
          description
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
          description
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
  }
`;
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
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
        project_carbon_reports {
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
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
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
        project_carbon_reports {
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
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
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
        project_carbon_reports {
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
  }
`;
export const createProjectReport = /* GraphQL */ `
  mutation CreateProjectReport(
    $input: CreateProjectReportInput!
    $condition: ModelProjectReportConditionInput
  ) {
    createProjectReport(input: $input, condition: $condition) {
      id
      projectID
      project {
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
        description
        project_carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
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
        project_carbon_reports {
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
export const updateProjectReport = /* GraphQL */ `
  mutation UpdateProjectReport(
    $input: UpdateProjectReportInput!
    $condition: ModelProjectReportConditionInput
  ) {
    updateProjectReport(input: $input, condition: $condition) {
      id
      projectID
      project {
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
        description
        project_carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
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
        project_carbon_reports {
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
export const deleteProjectReport = /* GraphQL */ `
  mutation DeleteProjectReport(
    $input: DeleteProjectReportInput!
    $condition: ModelProjectReportConditionInput
  ) {
    deleteProjectReport(input: $input, condition: $condition) {
      id
      projectID
      project {
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
        description
        project_carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
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
        project_carbon_reports {
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
export const createProjectEditor = /* GraphQL */ `
  mutation CreateProjectEditor(
    $input: CreateProjectEditorInput!
    $condition: ModelProjectEditorConditionInput
  ) {
    createProjectEditor(input: $input, condition: $condition) {
      id
      projectID
      editorID
      project {
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
        description
        project_carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
      editor {
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
        project_carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateProjectEditor = /* GraphQL */ `
  mutation UpdateProjectEditor(
    $input: UpdateProjectEditorInput!
    $condition: ModelProjectEditorConditionInput
  ) {
    updateProjectEditor(input: $input, condition: $condition) {
      id
      projectID
      editorID
      project {
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
        description
        project_carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
      editor {
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
        project_carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteProjectEditor = /* GraphQL */ `
  mutation DeleteProjectEditor(
    $input: DeleteProjectEditorInput!
    $condition: ModelProjectEditorConditionInput
  ) {
    deleteProjectEditor(input: $input, condition: $condition) {
      id
      projectID
      editorID
      project {
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
        description
        project_carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
      editor {
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
        project_carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createSolution = /* GraphQL */ `
  mutation CreateSolution(
    $input: CreateSolutionInput!
    $condition: ModelSolutionConditionInput
  ) {
    createSolution(input: $input, condition: $condition) {
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
export const updateSolution = /* GraphQL */ `
  mutation UpdateSolution(
    $input: UpdateSolutionInput!
    $condition: ModelSolutionConditionInput
  ) {
    updateSolution(input: $input, condition: $condition) {
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
export const deleteSolution = /* GraphQL */ `
  mutation DeleteSolution(
    $input: DeleteSolutionInput!
    $condition: ModelSolutionConditionInput
  ) {
    deleteSolution(input: $input, condition: $condition) {
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
export const createSolutionBacked = /* GraphQL */ `
  mutation CreateSolutionBacked(
    $input: CreateSolutionBackedInput!
    $condition: ModelSolutionBackedConditionInput
  ) {
    createSolutionBacked(input: $input, condition: $condition) {
      id
      solutionID
      backerID
      solution {
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
      backer {
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
        project_carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
      money_amount
      credits
      createdAt
      updatedAt
    }
  }
`;
export const updateSolutionBacked = /* GraphQL */ `
  mutation UpdateSolutionBacked(
    $input: UpdateSolutionBackedInput!
    $condition: ModelSolutionBackedConditionInput
  ) {
    updateSolutionBacked(input: $input, condition: $condition) {
      id
      solutionID
      backerID
      solution {
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
      backer {
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
        project_carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
      money_amount
      credits
      createdAt
      updatedAt
    }
  }
`;
export const deleteSolutionBacked = /* GraphQL */ `
  mutation DeleteSolutionBacked(
    $input: DeleteSolutionBackedInput!
    $condition: ModelSolutionBackedConditionInput
  ) {
    deleteSolutionBacked(input: $input, condition: $condition) {
      id
      solutionID
      backerID
      solution {
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
      backer {
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
        project_carbon_reports {
          nextToken
        }
        createdAt
        updatedAt
      }
      money_amount
      credits
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
        project_carbon_reports {
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
export const updateReport = /* GraphQL */ `
  mutation UpdateReport(
    $input: UpdateReportInput!
    $condition: ModelReportConditionInput
  ) {
    updateReport(input: $input, condition: $condition) {
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
        project_carbon_reports {
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
export const deleteReport = /* GraphQL */ `
  mutation DeleteReport(
    $input: DeleteReportInput!
    $condition: ModelReportConditionInput
  ) {
    deleteReport(input: $input, condition: $condition) {
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
        project_carbon_reports {
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
