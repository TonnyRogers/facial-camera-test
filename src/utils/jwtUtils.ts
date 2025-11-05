import { decodeJwt } from 'jose';

interface JWTPayload {
  sub: string;
  iat: number;
  exp: number;
  name: string;
  'custom:cpf': string;
  'custom:role': string;
  'custom:proposal_id': string;
  'custom:proposal_type': string;
  'custom:refer_id': string;
  'cognito:username': string;
  event_id: string;
  token_use: string;
  auth_time: number;
  aud: string;
  iss: string;
  origin_jti: string;
  jti: string;
  birthdate: string;
}

export function decodeJWT(token: string): JWTPayload | null {
  try {
    const payload = decodeJwt(token) as unknown;
    return payload as JWTPayload;
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error);
    return null;
  }
}

export function getProposalFromToken(token: string) {
  const payload = decodeJWT(token);
  if (!payload) return null;

  return {
    id: payload['custom:proposal_id'],
    type: payload['custom:proposal_type'] as 'PERSONAL' | 'SME',
  };
}

export function getBeneficiaryFromToken(token: string) {
  const payload = decodeJWT(token);
  if (!payload) return null;

  return {
    id: payload['custom:refer_id'],
    name: payload.name,
    cpf: payload['custom:cpf'],
    type: payload['custom:role'],
  };
}
