/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: podcastQuery
// ====================================================

export interface podcastQuery_getPodcast_podcast_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface podcastQuery_getPodcast_podcast_creator {
  __typename: "User";
  id: number;
  name: string;
}

export interface podcastQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  description: string | null;
  createdAt: any;
}

export interface podcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  createdAt: any;
  category: podcastQuery_getPodcast_podcast_category;
  creator: podcastQuery_getPodcast_podcast_creator;
  episodes: podcastQuery_getPodcast_podcast_episodes[];
}

export interface podcastQuery_getPodcast {
  __typename: "GetPodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: podcastQuery_getPodcast_podcast | null;
}

export interface podcastQuery {
  getPodcast: podcastQuery_getPodcast;
}

export interface podcastQueryVariables {
  input: number;
}
