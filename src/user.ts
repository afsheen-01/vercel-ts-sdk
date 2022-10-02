import { endpointMap } from "./common";
import { merge } from "lodash";
import {
  UserDeletionReason,
  UserEventParams,
  UserEventsResponse,
  UserResponse,
} from "./types/user";
import { del, get } from "./utils/fetch";
import { Primitives } from "./types/fetch";

export const getUser = () => {
  return get<UserResponse>(endpointMap.getUser);
};

export const getUserEvents = (query?: UserEventParams) => {
  let formattedQuery: { [key: string]: Primitives | undefined } | undefined =
    undefined;
  if (query) {
    formattedQuery = {
      ...query,
      types: query?.types?.join(",") || undefined,
    };
  }
  return get<UserEventsResponse>(endpointMap.getUserEvents, {
    query: formattedQuery,
  });
};

export const deleteUser = (params?: { reasons: UserDeletionReason[] }) => {
  return del<{}>(endpointMap.deleteUser, {
    ...(params?.reasons ? { data: { reasons: params?.reasons } } : null),
  });
};
