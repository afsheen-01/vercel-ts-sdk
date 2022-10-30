import {
  AddDomainToProjectParams,
  AddDomainToProjectResponse,
  CreateEnvVarsParams,
  CreateEnvVarsResponse,
  CreateNewProjectParams,
  CreateNewProjectResponse,
  DeleteProjectParams,
} from "./types/projects";
import { endpointMap } from "./utils/common";
import { del, post } from "./utils/fetch";

export const addDomainToProject = (params: AddDomainToProjectParams) => {
  const { projectId, teamId, ...rest } = params;
  return post<AddDomainToProjectResponse>(
    endpointMap.addDomainToProject(projectId),
    {
      ...(teamId && { query: { teamId } }),
      ...(Object.keys(rest).length && { data: rest }),
    }
  );
};

export const createNewProject = (params: CreateNewProjectParams) => {
  const { teamId, ...rest } = params;
  return post<CreateNewProjectResponse>(endpointMap.createNewProject, {
    ...(teamId && { query: { teamId } }),
    ...(Object.keys(rest).length && { data: rest }),
  });
};

export const createEnvVars = (params: CreateEnvVarsParams) => {
  const { teamId, projectId, ...rest } = params;
  const data = Object.keys(rest).length > 0;
  const vars = rest.vars;
  return post<CreateEnvVarsResponse>(endpointMap.createEnvVars(projectId), {
    ...(teamId && { query: { teamId } }),
    ...(data && (vars ? { data: vars } : { data: rest })),
  });
};

export const deleteProject = (params: DeleteProjectParams) => {
  const { teamId, projectId } = params;
  return del<{}>(endpointMap.deleteProject(projectId), {
    ...(teamId && { query: { teamId } }),
  });
};
