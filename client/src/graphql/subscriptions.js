/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      username
      role
      profilePicture
      email
      phone
      createdAt
      updatedAt
      posts {
        nextToken
        __typename
      }
      postReports {
        nextToken
        __typename
      }
      sightings {
        nextToken
        __typename
      }
      sightingReports {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      commentReports {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      username
      role
      profilePicture
      email
      phone
      createdAt
      updatedAt
      posts {
        nextToken
        __typename
      }
      postReports {
        nextToken
        __typename
      }
      sightings {
        nextToken
        __typename
      }
      sightingReports {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      commentReports {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      username
      role
      profilePicture
      email
      phone
      createdAt
      updatedAt
      posts {
        nextToken
        __typename
      }
      postReports {
        nextToken
        __typename
      }
      sightings {
        nextToken
        __typename
      }
      sightingReports {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      commentReports {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
      id
      name
      status
      gender
      summary
      description
      resolved
      lastKnownLocation {
        latitude
        longitude
        address
        __typename
      }
      species
      images
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      comments {
        nextToken
        __typename
      }
      postReports {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
      id
      name
      status
      gender
      summary
      description
      resolved
      lastKnownLocation {
        latitude
        longitude
        address
        __typename
      }
      species
      images
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      comments {
        nextToken
        __typename
      }
      postReports {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
      id
      name
      status
      gender
      summary
      description
      resolved
      lastKnownLocation {
        latitude
        longitude
        address
        __typename
      }
      species
      images
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      comments {
        nextToken
        __typename
      }
      postReports {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
      id
      content
      postID
      parentCommentID
      parentComment {
        id
        content
        postID
        parentCommentID
        userID
        createdAt
        updatedAt
        __typename
      }
      replies {
        nextToken
        __typename
      }
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      commentReports {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
      id
      content
      postID
      parentCommentID
      parentComment {
        id
        content
        postID
        parentCommentID
        userID
        createdAt
        updatedAt
        __typename
      }
      replies {
        nextToken
        __typename
      }
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      commentReports {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
      id
      content
      postID
      parentCommentID
      parentComment {
        id
        content
        postID
        parentCommentID
        userID
        createdAt
        updatedAt
        __typename
      }
      replies {
        nextToken
        __typename
      }
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      commentReports {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSighting = /* GraphQL */ `
  subscription OnCreateSighting($filter: ModelSubscriptionSightingFilterInput) {
    onCreateSighting(filter: $filter) {
      id
      image
      location {
        latitude
        longitude
        address
        __typename
      }
      reporterType
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      email
      phone
      sightingReports {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSighting = /* GraphQL */ `
  subscription OnUpdateSighting($filter: ModelSubscriptionSightingFilterInput) {
    onUpdateSighting(filter: $filter) {
      id
      image
      location {
        latitude
        longitude
        address
        __typename
      }
      reporterType
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      email
      phone
      sightingReports {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSighting = /* GraphQL */ `
  subscription OnDeleteSighting($filter: ModelSubscriptionSightingFilterInput) {
    onDeleteSighting(filter: $filter) {
      id
      image
      location {
        latitude
        longitude
        address
        __typename
      }
      reporterType
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      email
      phone
      sightingReports {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePostReport = /* GraphQL */ `
  subscription OnCreatePostReport(
    $filter: ModelSubscriptionPostReportFilterInput
  ) {
    onCreatePostReport(filter: $filter) {
      id
      reason
      description
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      post {
        id
        name
        status
        gender
        summary
        description
        resolved
        species
        images
        userID
        createdAt
        updatedAt
        __typename
      }
      postID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePostReport = /* GraphQL */ `
  subscription OnUpdatePostReport(
    $filter: ModelSubscriptionPostReportFilterInput
  ) {
    onUpdatePostReport(filter: $filter) {
      id
      reason
      description
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      post {
        id
        name
        status
        gender
        summary
        description
        resolved
        species
        images
        userID
        createdAt
        updatedAt
        __typename
      }
      postID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePostReport = /* GraphQL */ `
  subscription OnDeletePostReport(
    $filter: ModelSubscriptionPostReportFilterInput
  ) {
    onDeletePostReport(filter: $filter) {
      id
      reason
      description
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      post {
        id
        name
        status
        gender
        summary
        description
        resolved
        species
        images
        userID
        createdAt
        updatedAt
        __typename
      }
      postID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCommentReport = /* GraphQL */ `
  subscription OnCreateCommentReport(
    $filter: ModelSubscriptionCommentReportFilterInput
  ) {
    onCreateCommentReport(filter: $filter) {
      id
      reason
      description
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      comment {
        id
        content
        postID
        parentCommentID
        userID
        createdAt
        updatedAt
        __typename
      }
      commentID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCommentReport = /* GraphQL */ `
  subscription OnUpdateCommentReport(
    $filter: ModelSubscriptionCommentReportFilterInput
  ) {
    onUpdateCommentReport(filter: $filter) {
      id
      reason
      description
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      comment {
        id
        content
        postID
        parentCommentID
        userID
        createdAt
        updatedAt
        __typename
      }
      commentID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCommentReport = /* GraphQL */ `
  subscription OnDeleteCommentReport(
    $filter: ModelSubscriptionCommentReportFilterInput
  ) {
    onDeleteCommentReport(filter: $filter) {
      id
      reason
      description
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      comment {
        id
        content
        postID
        parentCommentID
        userID
        createdAt
        updatedAt
        __typename
      }
      commentID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSightingReport = /* GraphQL */ `
  subscription OnCreateSightingReport(
    $filter: ModelSubscriptionSightingReportFilterInput
  ) {
    onCreateSightingReport(filter: $filter) {
      id
      reason
      description
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      sighting {
        id
        image
        reporterType
        userID
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      sightingID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSightingReport = /* GraphQL */ `
  subscription OnUpdateSightingReport(
    $filter: ModelSubscriptionSightingReportFilterInput
  ) {
    onUpdateSightingReport(filter: $filter) {
      id
      reason
      description
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      sighting {
        id
        image
        reporterType
        userID
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      sightingID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSightingReport = /* GraphQL */ `
  subscription OnDeleteSightingReport(
    $filter: ModelSubscriptionSightingReportFilterInput
  ) {
    onDeleteSightingReport(filter: $filter) {
      id
      reason
      description
      user {
        id
        username
        role
        profilePicture
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      userID
      sighting {
        id
        image
        reporterType
        userID
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      sightingID
      createdAt
      updatedAt
      __typename
    }
  }
`;
