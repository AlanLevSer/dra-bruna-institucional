export type AppRole = 'admin' | 'analyst' | 'readonly';

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  criado_em: string;
}

export interface Profile {
  id: string;
  email: string | null;
  nome_completo: string | null;
  criado_em: string;
  atualizado: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

export const ROLE_HIERARCHY: Record<AppRole, number> = {
  admin: 3,
  analyst: 2,
  readonly: 1,
};

export function hasRoleOrHigher(userRole: AppRole, requiredRole: AppRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
