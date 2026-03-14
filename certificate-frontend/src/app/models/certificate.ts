export interface Certificate {
  id: string;
  ownerName: string;
  email: string;
  type: string;
  status: string;
  createdAt: string;
  validUntil: string;
}

export interface CreateCertificateRequest {
  id: string;
  ownerName: string;
  email: string;
  type: string;
  status: string;
  createdAt: string;
  validUntil: string;
}