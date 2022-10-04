import { endpointMap } from "./common";
import { omit } from "lodash";
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
  let formattedQuery: { [key: string]: Primitives } | undefined = undefined;
  if (query) {
    formattedQuery = {
      ...omit(query, "types"),
      ...(query?.types ? { types: query?.types?.join(",") } : null),
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
