export type CheckArtifactExistsParams = {
  hash: string;
  teamId?: string;
};

export type CheckArtifactExistsResponse = {};

export type DownloadCacheArtifactParams = {
  hash: string;
  teamId?: string;
  artifactClientCI?: string;
  artifactClientInteractive?: 0 | 1;
};

export type GetRemoteCachingStatusParams = {
  teamId?: string;
};

export type GetRmoteCachingStatusResponse = {
  status: "disabled" | "enabled" | "over_limit" | "paused";
};

export type RecordCacheUsageEventParams = {
  teamId?: string;
  event: "HIT" | "MISS";
  hash: string;
  sessionId: string;
  source: "LOCAL" | "REMOTE";
  duration: number;
  artifactClientCI?: string;
  artifactClientInteractive?: 0 | 1;
};

export type UploadCacheArtifactParams = {
  "Content-Length": number;
  artifactClientCI?: string;
  artifactClientInteractive?: 0 | 1;
  artifactDuration?: number;
  artifactTag?: string;
  teamId?: string;
  hash: string;
};
