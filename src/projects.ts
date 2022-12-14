import {
  AddDomainToProjectParams,
  AddDomainToProjectResponse,
  CreateEnvVarsParams,
  CreateEnvVarsResponse,
  CreateNewProjectParams,
  CreateNewProjectResponse,
  DeleteProjectParams,
  EditEnvVarParams,
  EditEnvVarResponse,
  FindProjectByIdParams,
  FindProjectByIdResponse,
  GetEnvVarResponse,
  GetEnvVarValueParams,
  GetProjectDomainParams,
  GetProjectDomainResponse,
  ListEnvVarsParams,
  ListEnvVarsResponse,
  ListProjectDomainsParams,
  ListProjectDomainsResponse,
  ListProjectsParams,
  ListProjectsResponse,
  RemoveEnvVarParams,
  RemoveEnvVarResponse,
  RemoveProjectDomainParams,
  UpdateProjectDomainParams,
  UpdateProjectDomainResponse,
  UpdateProjectParams,
  UpdateProjectResponse,
  VerifyProjectDomainParams,
  VerifyProjectDomainResponse,
} from "./types/projects";
import { endpointMap } from "./utils/common";
import { del, get, patch, post } from "./utils/fetch";

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

export const editEnvVar = (params: EditEnvVarParams) => {
  const { projectId, envId, teamId, ...rest } = params;
  return patch<EditEnvVarResponse>(
    endpointMap.editEnvVar({ projectId, envId }),
    {
      ...(teamId && { query: { teamId } }),
      ...(Object.keys(rest).length && { data: rest }),
    }
  );
};

export const findProjectById = (params: FindProjectByIdParams) => {
  const { projectId, teamId } = params;
  return get<FindProjectByIdResponse>(endpointMap.findProjectById(projectId), {
    ...(teamId && { query: { teamId } }),
  });
};

export const getProjectDomain = (params: GetProjectDomainParams) => {
  const { projectId, domain, teamId } = params;
  return get<GetProjectDomainResponse>(
    endpointMap.getProjectDomain({ projectId, domain }),
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};

export const removeProjectDomain = (params: RemoveProjectDomainParams) => {
  const { projectId, domain, teamId } = params;
  return del<{}>(endpointMap.removeProjectDomain({ projectId, domain }), {
    ...(teamId && { query: { teamId } }),
  });
};

export const removeEnvVar = (params: RemoveEnvVarParams) => {
  const { projectId, envKeyOrId, teamId } = params;
  return del<RemoveEnvVarResponse>(
    endpointMap.removeEnvVar({ projectId, envKeyOrId }),
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};

export const listProjects = (params?: ListProjectsParams) => {
  return get<ListProjectsResponse>(endpointMap.listProjects, {
    ...(params && { query: params }),
  });
};

export const listProjectDomains = (params: ListProjectDomainsParams) => {
  const { projectId, ...rest } = params;
  return get<ListProjectDomainsResponse>(
    endpointMap.listProjectDomains(projectId),
    {
      ...(Object.keys(rest).length && { query: rest }),
    }
  );
};

export const getEnvVarValue = (params: GetEnvVarValueParams) => {
  const { teamId, projectId, envId } = params;
  return get<GetEnvVarResponse>(
    endpointMap.getEnvVarValue({ projectId, envId }),
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};

export const listEnvVars = (params: ListEnvVarsParams) => {
  const { projectId, ...rest } = params;
  return get<ListEnvVarsResponse>(endpointMap.listEnvVars(projectId), {
    ...(Object.keys(rest).length && { query: rest }),
  });
};

export const updateProjectDomain = (params: UpdateProjectDomainParams) => {
  const { projectId, domain, teamId, ...rest } = params;
  return patch<UpdateProjectDomainResponse>(
    endpointMap.updateProjectDomain({
      projectId,
      domain,
    }),
    {
      ...(teamId && { query: { teamId } }),
      ...(Object.keys(rest).length && { data: rest }),
    }
  );
};

export const updateProject = (params: UpdateProjectParams) => {
  const { projectId, teamId, ...rest } = params;
  return patch<UpdateProjectResponse>(endpointMap.updateProject(projectId), {
    ...(teamId && { query: { teamId } }),
    ...(Object.keys(rest).length && { data: rest }),
  });
};

export const verifyProjectDomain = (params: VerifyProjectDomainParams) => {
  const { teamId, projectId, domain } = params;
  return post<VerifyProjectDomainResponse>(
    endpointMap.verifyProjectDomain({ projectId, domain }),
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};
