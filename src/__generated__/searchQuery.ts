/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchQuery
// ====================================================

export interface searchQuery_searchPodcastName_searchResults {
  __typename: "Podcast";
  id: number;
  title: string;
  createdAt: any;
}

export interface searchQuery_searchPodcastName {
  __typename: "SearchPodcastOutput";
  ok: boolean;
  error: string | null;
  searchResults: searchQuery_searchPodcastName_searchResults[] | null;
  totalResultNumber: number | null;
}

export interface searchQuery {
  searchPodcastName: searchQuery_searchPodcastName;
}

export interface searchQueryVariables {
  input: SearchPodcastInput;
}
