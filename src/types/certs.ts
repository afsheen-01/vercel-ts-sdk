export interface Cert {
  id: string;
  createdAt: number;
  expiresAt: number;
  autoRenew: boolean;
  cns: string[];
}

export type UploadCertParams = {
  teamId?: string;
  ca: string;
  cert: string;
  key: string;
  skipValidation?: boolean;
};

export type GetCertParams = {
  teamId?: string;
  certId: string;
};

export type RemoveCertParams = { teamId?: string; certId: string };

export type IssueNewCertParams = { teamId?: string; cns?: string[] };
