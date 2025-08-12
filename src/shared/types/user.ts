// src/types/user.ts

export type TipoUsuario =
  | 'visitante'
  | 'creator'
  | 'consumer'
  | 'moderador'
  | 'anunciante'
  | 'lider_comunitario';

export interface CondominioRef {
  id: string; // documentId do Strapi
  nome: string;
}

export interface UserData {
  id: string; // usar documentId como id lógico
  documentId?: string;
  username: string;
  email: string;
  tipo_usuario: TipoUsuario;
  condominio: CondominioRef | null;
  unidade: string | null;
}