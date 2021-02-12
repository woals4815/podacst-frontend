/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeletePodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteMutation
// ====================================================

export interface deleteMutation_deletePodcast {
  __typename: "DeleteOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteMutation {
  deletePodcast: deleteMutation_deletePodcast;
}

export interface deleteMutationVariables {
  input: DeletePodcastInput;
}
