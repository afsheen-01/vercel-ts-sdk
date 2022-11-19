const { beforeAll, test, expect } = require("@jest/globals");
import { endpointMap, BASE_URL } from "../src/utils/common";
import {
  createTeam,
  deleteTeam,
  deleteTeamInviteCode,
  getAccessRequestStatus,
  getTeam,
  inviteUser,
  joinTeam,
  listTeamMembers,
  listTeams,
  removeTeamMember,
  requestAccessToTeam,
  setVercelToken,
  updateTeam,
  updateTeamMember,
} from "../src/index";

beforeAll(() => setVercelToken(process?.env?.VERCEL_TOKEN));

test("list teams (with 'since' and 'next')", async () => {
  const { data, error } = await listTeams({
    since: 20,
    next: 10,
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(BASE_URL + endpointMap.listTeams);
  expect(data?.query).toEqual({
    since: "20",
    until: "10",
  });
});

test("create team", async () => {
  const { data, error } = await createTeam({
    slug: "team-slug",
    name: "team-slug",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.body).toBe(
    JSON.stringify({
      slug: "team-slug",
      name: "team-slug",
    })
  );
});

test("delete team (without reason)", async () => {
  const { data, error } = await deleteTeam({ teamId: "team1" });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.body).toBeFalsy();
  expect(data?.url).toBe(BASE_URL + endpointMap.deleteTeam("team1"));
});

test("delete team (with reason)", async () => {
  const { data, error } = await deleteTeam({
    teamId: "team1",
    reasons: [
      {
        description: "blah",
        slug: "blah",
      },
    ],
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.body).toEqual(
    JSON.stringify({
      reasons: [
        {
          description: "blah",
          slug: "blah",
        },
      ],
    })
  );
  expect(data?.url).toBe(BASE_URL + endpointMap.deleteTeam("team1"));
});

test("delete team invite code", async () => {
  const { data, error } = await deleteTeamInviteCode({
    teamId: "team1",
    inviteId: "invite1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(
    BASE_URL +
      endpointMap.deleteTeamInviteCode({ teamId: "team1", inviteId: "invite1" })
  );
});

test("get team", async () => {
  const { data, error } = await getTeam({ teamId: "team1" });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.getTeam("team1"));
});

test("get access request status", async () => {
  const { data, error } = await getAccessRequestStatus({
    teamId: "team1",
    userId: "user1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(
    BASE_URL +
      endpointMap.getAccessRequestStatus({ teamId: "team1", userId: "user1" })
  );
});
test("get access request status without userId", async () => {
  const { data, error } = await getAccessRequestStatus({
    teamId: "team1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(
    BASE_URL + endpointMap.getAccessRequestStatus({ teamId: "team1" })
  );
});

test("invite user", async () => {
  const { data, error } = await inviteUser({
    teamId: "team1",
    email: "user@email",
    role: "MEMBER",
    uid: "user1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.inviteUser("team1"));
  expect(data?.body).toEqual(
    JSON.stringify({
      email: "user@email",
      role: "MEMBER",
      uid: "user1",
    })
  );
});

test("join team", async () => {
  const { data, error } = await joinTeam({
    teamId: "team1",
    inviteCode: "invite-code-1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.joinTeam("team1"));
  expect(data?.body).toEqual(
    JSON.stringify({
      teamId: "team1",
      inviteCode: "invite-code-1",
    })
  );
});

test("list team members", async () => {
  const { data, error } = await listTeamMembers({
    teamId: "team1",
    role: "MEMBER",
    search: "search-string",
    next: 1234,
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(BASE_URL + endpointMap.listTeamMembers("team1"));
  expect(data?.query).toEqual({
    role: "MEMBER",
    search: "search-string",
    until: "1234",
  });
});

test("remove team member", async () => {
  const { data, error } = await removeTeamMember({
    teamId: "team1",
    userId: "user1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(
    BASE_URL +
      endpointMap.removeTeamMember({
        teamId: "team1",
        userId: "user1",
      })
  );
});

test("request access to team", async () => {
  const { data, error } = await requestAccessToTeam({
    teamId: "team1",
    joinedFrom: "origin",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(
    BASE_URL + endpointMap.requestAccessToTeam("team1")
  );
  expect(data?.body).toEqual(
    JSON.stringify({
      joinedFrom: "origin",
    })
  );
});

test("update team", async () => {
  const body = {
    avatar: "avatar",
    description: "desc",
    name: "team-name",
    slug: "team-slug",
  };
  const { data, error } = await updateTeam({
    teamId: "team1",
    ...body,
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(BASE_URL + endpointMap.updateTeam("team1"));
  expect(data?.body).toEqual(JSON.stringify(body));
});

test("update team member", async () => {
  const body = {
    joinedFrom: "origin",
    role: "MEMBER",
  };
  const { data, error } = await updateTeamMember({
    teamId: "team1",
    userId: "user1",
    ...body,
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(
    BASE_URL +
      endpointMap.updateTeamMember({
        teamId: "team1",
        userId: "user1",
      })
  );
  expect(data?.body).toEqual(JSON.stringify(body));
});
