import {
  CheckArtifactExistsParams,
  CheckArtifactExistsResponse,
  DownloadCacheArtifactParams,
  GetRemoteCachingStatusParams,
  GetRmoteCachingStatusResponse,
  RecordCacheUsageEventParams,
  UploadCacheArtifactParams,
} from "./types/artifacts";
import { endpointMap } from "./utils/common";
import { get, head, post, put } from "./utils/fetch";

export const checkArtifactExists = (params: CheckArtifactExistsParams) => {
  const { teamId, hash } = params;
  return head<CheckArtifactExistsResponse>(
    endpointMap.checkArtifactExists(hash),
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};

export const downloadCacheArtifact = (params: DownloadCacheArtifactParams) => {
  const { teamId, hash, artifactClientCI, artifactClientInteractive } = params;
  const headers = {
    ...(artifactClientCI && { "x-artifact-client-ci": artifactClientCI }),
    ...([0, 1].includes(artifactClientInteractive as number) && {
      "x-artifact-client-interactive": `${artifactClientInteractive}`,
    }),
  };
  return get<string>(endpointMap.downloadCacheArtifact(hash), {
    ...(teamId && { query: { teamId } }),
    headers,
  });
};

export const getRemoteCachingStatus = (
  params: GetRemoteCachingStatusParams
) => {
  const { teamId } = params;
  return get<GetRmoteCachingStatusResponse>(
    endpointMap.getRemoteCachingStatus,
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};

export const recordCacheUsageEvent = (params: RecordCacheUsageEventParams) => {
  const { teamId, artifactClientCI, artifactClientInteractive, ...rest } =
    params;
  const headers = {
    ...(artifactClientCI && { "x-artifact-client-ci": artifactClientCI }),
    ...([0, 1].includes(artifactClientInteractive as number) && {
      "x-artifact-client-interactive": `${artifactClientInteractive}`,
    }),
  };
  return post<{}>(endpointMap.recordCacheUsageEvent, {
    ...(Object.keys(rest).length && { data: rest }),
    ...(teamId && { query: { teamId } }),
    headers,
  });
};

export const uploadCacheArtifact = (params: UploadCacheArtifactParams) => {
  const {
    teamId,
    hash,
    artifactClientInteractive,
    artifactClientCI,
    artifactDuration,
    artifactTag,
  } = params;
  const headers = {
    ...(artifactClientCI && { "x-artifact-client-ci": artifactClientCI }),
    ...(artifactClientInteractive && {
      "x-artifact-client-interactive": `${artifactClientInteractive}`,
    }),
    ...(artifactDuration && { "x-artifact-duration": `${artifactDuration}` }),
    ...(artifactTag && { "x-artifact-tag": artifactTag }),
  };
  return put<{}>(endpointMap.uploadCacheArtifact(hash), {
    ...(teamId && { query: { teamId } }),
    headers,
  });
};
