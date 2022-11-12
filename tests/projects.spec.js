import { beforeAll, test, expect } from "@jest/globals";
import { endpointMap } from "../src/utils/common";
import {
  addDomainToProject,
  createNewProject,
  createEnvVars,
  deleteProject,
  editEnvVar,
  findProjectById,
  getProjectDomain,
  removeProjectDomain,
  removeEnvVar,
  listProjects,
  listProjectDomains,
  getEnvVarValue,
  listEnvVars,
  updateProjectDomain,
  updateProject,
  verifyProjectDomain,
  setVercelToken,
} from "../src/index";

beforeAll(() => setVercelToken(process.env.VERCEL_TOKEN));

test("add domain to project", async () => {
  const { data, error } = await addDomainToProject({
    projectId: "project1",
    teamId: "team1",
    name: "google.com",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(endpointMap.addDomainToProject("project1"));
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("post");
});

test("create a new project", async () => {
  const { data, error } = await createNewProject({
    teamId: "team1",
    name: "proj1",
    buildCommand: "yarn build",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(endpointMap.createNewProject);
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("post");
  expect(data?.body).toEqual(
    JSON.stringify({ name: "proj1", buildCommand: "yarn build" })
  );
});

test("create env vars", async () => {
  const { data, error } = await createEnvVars({
    projectId: "project1",
    teamId: "team1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(endpointMap.createEnvVars("project1"));
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("post");
});

test("delete a project", async () => {
  const { data, error } = await deleteProject({
    projectId: "project1",
    teamId: "team1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(endpointMap.deleteProject("project1"));
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("delete");
});

test("edit env var", async () => {
  const { data, error } = await editEnvVar({
    projectId: "project1",
    teamId: "team1",
    envId: "env1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(
    endpointMap.editEnvVar({ projectId: "project1", envId: "env1" })
  );
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("patch");
});

test("find project by ID", async () => {
  const { data, error } = await findProjectById({
    projectId: "project1",
    teamId: "team1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(endpointMap.findProjectById("project1"));
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("get");
});

test("get project domain", async () => {
  const { data, error } = await getProjectDomain({
    projectId: "project1",
    domain: "domain1",
    teamId: "team1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(
    endpointMap.getProjectDomain({ projectId: "project1", domain: "domain1" })
  );
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("get");
});

test("remove project domain", async () => {
  const { data, error } = await removeProjectDomain({
    projectId: "project1",
    domain: "domain1",
    teamId: "team1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(
    endpointMap.removeProjectDomain({
      projectId: "project1",
      domain: "domain1",
    })
  );
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("delete");
});

test("remove env var", async () => {
  const { data, error } = await removeEnvVar({
    projectId: "project1",
    envKeyOrId: "env1",
    teamId: "team1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(
    endpointMap.removeEnvVar({ projectId: "project1", envKeyOrId: "env1" })
  );
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("delete");
});

test("list all projects", async () => {
  const { data, error } = await listProjects({ teamId: "team1" });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(endpointMap.listProjects);
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("get");
});

test("list all projects without params", async () => {
  const { data, error } = await listProjects();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toEqual(endpointMap.listProjects);
  expect(data?.method).toEqual("get");
});

test("list project domains", async () => {
  const { data, error } = await listProjectDomains({
    projectId: "project1",
    order: "ASC",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(endpointMap.listProjectDomains("project1"));
  expect(data?.query).toEqual({ order: "ASC" });
  expect(data?.method).toEqual("get");
});

test("get env var value", async () => {
  const { data, error } = await getEnvVarValue({
    projectId: "project1",
    envId: "env1",
    teamId: "team1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(
    endpointMap.getEnvVarValue({ projectId: "project1", envId: "env1" })
  );
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("get");
});

test("list env vars", async () => {
  const { data, error } = await listEnvVars({
    projectId: "project1",
    teamId: "team1",
    decrypt: true,
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(endpointMap.listEnvVars("project1"));
  expect(data?.query).toEqual({ teamId: "team1", decrypt: "true" });
  expect(data?.method).toEqual("get");
});

test("update project domain", async () => {
  const { data, error } = await updateProjectDomain({
    projectId: "project1",
    teamId: "team1",
    domain: "google.com",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(
    endpointMap.updateProjectDomain({
      projectId: "project1",
      domain: "google.com",
    })
  );
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("patch");
});

test("update project", async () => {
  const { data, error } = await updateProject({
    projectId: "project1",
    teamId: "team1",
    buildCommand: "yarn build",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(endpointMap.updateProject("project1"));
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("patch");
  expect(data?.body).toEqual(JSON.stringify({ buildCommand: "yarn build" }));
});

test("verify project domain", async () => {
  const { data, error } = await verifyProjectDomain({
    projectId: "project1",
    teamId: "team1",
    domain: "domain1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(
    endpointMap.verifyProjectDomain({
      projectId: "project1",
      domain: "domain1",
    })
  );
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.method).toEqual("post");
});
