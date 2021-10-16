/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
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
      description
      carbon_reports {
        items {
          id
          projectID
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
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
      description
      carbon_reports {
        items {
          id
          projectID
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
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
      description
      carbon_reports {
        items {
          id
          projectID
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
export const onCreateProjectReport = /* GraphQL */ `
  subscription OnCreateProjectReport {
    onCreateProjectReport {
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
export const onUpdateProjectReport = /* GraphQL */ `
  subscription OnUpdateProjectReport {
    onUpdateProjectReport {
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
export const onDeleteProjectReport = /* GraphQL */ `
  subscription OnDeleteProjectReport {
    onDeleteProjectReport {
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
export const onCreateProjectEditor = /* GraphQL */ `
  subscription OnCreateProjectEditor {
    onCreateProjectEditor {
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
        carbon_reports {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProjectEditor = /* GraphQL */ `
  subscription OnUpdateProjectEditor {
    onUpdateProjectEditor {
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
        carbon_reports {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProjectEditor = /* GraphQL */ `
  subscription OnDeleteProjectEditor {
    onDeleteProjectEditor {
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
        carbon_reports {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSolution = /* GraphQL */ `
  subscription OnCreateSolution {
    onCreateSolution {
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
export const onUpdateSolution = /* GraphQL */ `
  subscription OnUpdateSolution {
    onUpdateSolution {
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
export const onDeleteSolution = /* GraphQL */ `
  subscription OnDeleteSolution {
    onDeleteSolution {
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
export const onCreateSolutionBacked = /* GraphQL */ `
  subscription OnCreateSolutionBacked {
    onCreateSolutionBacked {
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
export const onUpdateSolutionBacked = /* GraphQL */ `
  subscription OnUpdateSolutionBacked {
    onUpdateSolutionBacked {
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
export const onDeleteSolutionBacked = /* GraphQL */ `
  subscription OnDeleteSolutionBacked {
    onDeleteSolutionBacked {
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
export const onCreateReport = /* GraphQL */ `
  subscription OnCreateReport($userID: String) {
    onCreateReport(userID: $userID) {
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
export const onUpdateReport = /* GraphQL */ `
  subscription OnUpdateReport($userID: String) {
    onUpdateReport(userID: $userID) {
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
export const onDeleteReport = /* GraphQL */ `
  subscription OnDeleteReport($userID: String) {
    onDeleteReport(userID: $userID) {
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
