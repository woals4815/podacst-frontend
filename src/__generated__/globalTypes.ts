/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Host = "Host",
}

export interface CreateEpisodeInput {
  podcastId: number;
  title: string;
  description: string;
}

export interface CreatePodcastInput {
  title: string;
  categoryName: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface DeleteEpisodeInput {
  podcastId: number;
  episodeId: number;
}

export interface DeletePodcastInput {
  podcastId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SearchPodcastInput {
  query: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
