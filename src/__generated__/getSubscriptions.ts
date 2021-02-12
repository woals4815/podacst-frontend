/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSubscriptions
// ====================================================

export interface getSubscriptions_getSubscriptions_subscriptions {
  __typename: "Podcast";
  id: number;
  title: string;
}

export interface getSubscriptions_getSubscriptions {
  __typename: "GetSubscriptionOutput";
  ok: boolean;
  error: string | null;
  subscriptions: getSubscriptions_getSubscriptions_subscriptions[] | null;
}

export interface getSubscriptions {
  getSubscriptions: getSubscriptions_getSubscriptions;
}
