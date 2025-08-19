// src/features/user/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@/store';
import type { UserData, TipoUsuario } from '@shared/types/user';
import { API_URL } from '@shared/config/env';
import { setUserLoading, setUserError, setUserProfile } from './userSlice';

type UsuarioRest = {
  documentId: string;
  username: string;
  email: string;
  tipo_usuario?: TipoUsuario;
  condominio?: {
    documentId: string;
    nome: string;
    bairro?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    raio_atuacao?: number | null;
  } | null;
  user?: { id?: number; documentId?: string; username?: string; email?: string } | null;
};

function userShallowEqual(a: UserData | null | undefined, b: UserData | null | undefined): boolean {
  if (!a && !b) return true;
  if (!a || !b) return false;
  const condA = a.condominio ?? null;
  const condB = b.condominio ?? null;
  return (
    String(a.id ?? '') === String(b.id ?? '') &&
    String(a.documentId ?? '') === String(b.documentId ?? '') &&
    String(a.username ?? '') === String(b.username ?? '') &&
    String(a.email ?? '') === String(b.email ?? '') &&
    String(a.tipo_usuario ?? '') === String(b.tipo_usuario ?? '') &&
    (condA === null) === (condB === null) &&
    (condA === null || (
      String(condA.id ?? '') === String(condB?.id ?? '') &&
      String(condA.nome ?? '') === String(condB?.nome ?? '') &&
      String(condA.bairro ?? '') === String(condB?.bairro ?? '') &&
      Number(condA.latitude ?? NaN) === Number(condB?.latitude ?? NaN) &&
      Number(condA.longitude ?? NaN) === Number(condB?.longitude ?? NaN) &&
      Number(condA.raio_atuacao ?? NaN) === Number(condB?.raio_atuacao ?? NaN)
    ))
  );
}

// Adapter: Usuario -> UserData (usa relação user para username/email quando existir)
export function toUserDataFromUsuario(node: any): UserData {
  const userRel = node?.user ?? {};
  const cond = node?.condominio ?? null;
  const logicalId = String(userRel.documentId ?? userRel.id ?? node?.documentId ?? '');
  return {
    id: logicalId,
    ...(userRel.documentId ? { documentId: String(userRel.documentId) } : node?.documentId ? { documentId: String(node.documentId) } : {}),
    username: String(userRel.username ?? node?.username ?? ''),
    email: String(userRel.email ?? node?.email ?? ''),
    tipo_usuario: (node?.tipo_usuario as TipoUsuario | undefined) ?? 'visitante',
    condominio: cond
      ? {
          id: String(cond.documentId ?? cond.id ?? ''),
          nome: String(cond.nome ?? ''),
          ...(cond.bairro != null ? { bairro: String(cond.bairro) } : {}),
          ...(cond.latitude != null ? { latitude: Number(cond.latitude) } : {}),
          ...(cond.longitude != null ? { longitude: Number(cond.longitude) } : {}),
          ...(cond.raio_atuacao != null ? { raio_atuacao: Number(cond.raio_atuacao) } : {}),
        }
      : null,
  };
}

async function fetchUsuarioByUser(token: string, _me: { id: number; documentId?: string | null }) {
  // Strapi v5 can reject relation filter keys; avoid filters and match in-memory.
  // Populate using bracket syntax and keep payload small with pagination.
  const url = new URL(`${API_URL}/api/usuarios`);
  url.searchParams.set('populate[user]', 'true');
  url.searchParams.set('populate[condominio]', 'true');
  url.searchParams.set('pagination[pageSize]', '100');
  return fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
}

function isProbablyUsuarioObject(o: any): boolean {
  return !!(
    o && typeof o === 'object' && (
      'documentId' in o || 'username' in o || 'email' in o || 'tipo_usuario' in o || 'condominio' in o || 'user' in o
    )
  );
}

function unwrapStrapiList(json: any): any[] {
  if (!json) return [];
  // Already an array of nodes
  if (Array.isArray(json)) return json;
  // Strapi v4 default: { data: [...] } (with or without attributes)
  if (Array.isArray(json.data)) return json.data.map((x: any) => (x?.attributes ? { id: x.id, ...x.attributes } : x));
  // Some setups return { results: [...] }
  if (Array.isArray(json.results)) return json.results;
  // Single object payload case
  if (isProbablyUsuarioObject(json)) return [json];
  return [];
}

function looksLikeUsuarioCT(n: any): boolean {
  return !!(n && (n.tipo_usuario != null || n.condominio != null || n.user != null));
}

function findUsuarioMatch(list: any[], me: { id: number; documentId?: string | null; username?: string; email?: string }) {
  const byRel = list.find((n) => {
    const ur = n?.user;
    const hasData = !!ur?.data;
    const uId = hasData ? ur.data.id : ur?.id;
    const uDoc = hasData ? ur.data.attributes?.documentId : ur?.documentId;
    const uName = hasData ? ur.data.attributes?.username : ur?.username;
    const uEmail = hasData ? ur.data.attributes?.email : ur?.email;
    return (
      (uId != null && String(uId) === String(me.id)) ||
      (me.documentId && uDoc && String(uDoc) === String(me.documentId)) ||
      (uName != null && String(uName) === String(me.username)) ||
      (uEmail != null && String(uEmail) === String(me.email))
    );
  });
  if (byRel && looksLikeUsuarioCT(byRel)) return byRel;

  const byIdentity = list.find((n) =>
    looksLikeUsuarioCT(n) && (
      (me.username && n?.username && String(n.username) === String(me.username)) ||
      (me.email && n?.email && String(n.email) === String(me.email))
    )
  );
  return byIdentity ?? null;
}

// Bootstrap de perfil a partir de Users + filtro em 'usuarios'
export const bootstrapUserFromUsuarioMe = createAsyncThunk<
  UserData | null,
  void,
  { dispatch: AppDispatch; state: RootState }
>('user/bootstrapFromUsuarioMe', async (_: void, { dispatch, getState }) => {
  const token = getState().auth.token;
  if (!token) return null;
  try {
    console.log('[bootstrapUserFromUsuarioMe] start, hasToken:', !!token);
    dispatch(setUserLoading(true));
    dispatch(setUserError(null));

    // 1) Obter usuário autenticado do Users & Permissions
    const meResp = await fetch(`${API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    if (!meResp.ok) throw new Error(`/api/users/me falhou: ${meResp.status}`);
    const me = await meResp.json();
    console.log('[bootstrapUserFromUsuarioMe] me:', me);

    // 2) Buscar registro em 'usuarios' relacionado ao user
    const uResp = await fetchUsuarioByUser(token, { id: Number(me.id), documentId: me.documentId });
    let list: any[] = [];
    if (!uResp.ok) {
      const body = await uResp.text();
      console.log('[bootstrapUserFromUsuarioMe] /api/usuarios not ok, continuing with empty list:', uResp.status, body);
    } else {
      const raw = await uResp.json();
      list = unwrapStrapiList(raw);
      console.log('[bootstrapUserFromUsuarioMe] usuarios list length:', list.length);
    }
    const node: UsuarioRest | null = findUsuarioMatch(list, { id: Number(me.id), documentId: me.documentId, username: me.username, email: me.email });
    console.log('[bootstrapUserFromUsuarioMe] usuario node:', node);

    const mapped = node ? toUserDataFromUsuario(node) : ({
      id: String(me.documentId ?? me.id),
      ...(me.documentId ? { documentId: String(me.documentId) } : {}),
      username: String(me.username ?? ''),
      email: String(me.email ?? ''),
      tipo_usuario: 'visitante',
      condominio: null,
    } as UserData);

    // Garantir username/email do me caso o node não traga
    mapped.username = mapped.username || String(me.username ?? '');
    mapped.email = mapped.email || String(me.email ?? '');

    const prev = getState().user.profile;
    if (userShallowEqual(prev, mapped)) {
      console.log('[bootstrapUserFromUsuarioMe] mapped equals prev, skip update');
      return prev;
    }
    console.log('[bootstrapUserFromUsuarioMe] mapped user (will update):', mapped);
    dispatch(setUserProfile(mapped));
    return mapped;
  } catch (e: any) {
    const msg = e?.message ?? 'Falha ao carregar perfil';
    console.log('[bootstrapUserFromUsuarioMe] error:', msg);
    dispatch(setUserError(msg));
    return null;
  } finally {
    dispatch(setUserLoading(false));
    console.log('[bootstrapUserFromUsuarioMe] end');
  }
});

// GET /api/users?filters[email][$eq]=...&populate[condominio]=true (mantido)
export const loadUserByEmail = createAsyncThunk<
  UserData | null,
  { email: string },
  { dispatch: AppDispatch; state: RootState }
>('user/loadByEmail', async ({ email }, { dispatch }) => {
  try {
    dispatch(setUserLoading(true));
    dispatch(setUserError(null));

    const url = new URL(`${API_URL}/api/users`);
    url.searchParams.set('filters[email][$eq]', email);
    url.searchParams.set('populate', 'condominio');

    const r = await fetch(url.toString(), { headers: { 'Content-Type': 'application/json' } });
    if (!r.ok) throw new Error(`/users falhou: ${r.status}`);
    const arr: UsuarioRest[] = await r.json();
    const node = arr?.[0];
    if (!node) {
      dispatch(setUserProfile(null));
      return null;
    }

    const user: UserData = {
      id: node.documentId,
      documentId: node.documentId,
      username: node.username,
      email: node.email,
      tipo_usuario: node.tipo_usuario ?? 'visitante',
      condominio: node.condominio
        ? {
            id: node.condominio.documentId,
            nome: node.condominio.nome,
            ...(node.condominio.bairro != null ? { bairro: node.condominio.bairro as string } : {}),
            ...(node.condominio.latitude != null ? { latitude: Number(node.condominio.latitude) } : {}),
            ...(node.condominio.longitude != null ? { longitude: Number(node.condominio.longitude) } : {}),
            ...(node.condominio.raio_atuacao != null ? { raio_atuacao: Number(node.condominio.raio_atuacao) } : {}),
          }
        : null,
    };

    dispatch(setUserProfile(user));
    return user;
  } catch (e: any) {
    const msg = e?.message ?? 'Falha ao carregar usuário';
    dispatch(setUserError(msg));
    throw e;
  } finally {
    dispatch(setUserLoading(false));
  }
});

// Carrega informações expandidas (tipo_usuario, condominio) pelo id atual do usuário
export const loadUserExpanded = createAsyncThunk<
  UserData | null,
  void,
  { dispatch: AppDispatch; state: RootState }
>('user/loadExpanded', async (_: void, { dispatch, getState }) => {
  const state = getState();
  const token = state.auth.token;
  const curr = state.user.profile;
  if (!token || !curr?.id) return null;
  try {
    console.log('[loadUserExpanded] curr:', curr);
    dispatch(setUserLoading(true));
    dispatch(setUserError(null));

    // 1) Confirmar usuário autenticado
    const meResp = await fetch(`${API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    if (!meResp.ok) throw new Error(`/api/users/me falhou: ${meResp.status}`);
    const me = await meResp.json();

    // 2) Trazer o registro de 'usuarios' relacionado a esse user (com fallback de filtro)
    const uResp = await fetchUsuarioByUser(token, { id: Number(me.id), documentId: me.documentId });
    let list: any[] = [];
    if (!uResp.ok) {
      const body = await uResp.text();
      console.log('[loadUserExpanded] /api/usuarios not ok, continuing with empty list:', uResp.status, body);
    } else {
      const raw = await uResp.json();
      list = unwrapStrapiList(raw);
      console.log('[loadUserExpanded] usuarios list length:', list.length);
    }
    const node: UsuarioRest | null = findUsuarioMatch(list, { id: Number(me.id), documentId: me.documentId, username: me.username, email: me.email });
    console.log('[loadUserExpanded] usuario node:', node);
    if (!node) {
      const fallback = { ...curr } as UserData;
      fallback.username = fallback.username || String(me.username ?? '');
      fallback.email = fallback.email || String(me.email ?? '');
      console.log('[loadUserExpanded] no usuario record, fallback visitante:', fallback);
      if (userShallowEqual(curr, fallback)) {
        console.log('[loadUserExpanded] fallback equals curr, skip update');
        return curr;
      }
      console.log('[loadUserExpanded] fallback (will update):', fallback);
      dispatch(setUserProfile(fallback));
      return fallback;
    }

    const updated: UserData = {
      ...curr,
      id: String(curr.documentId ?? curr.id),
      ...(curr.documentId ? { documentId: curr.documentId } : {}),
      username: curr.username || String(me.username ?? ''),
      email: curr.email || String(me.email ?? ''),
      tipo_usuario: (node.tipo_usuario as TipoUsuario | undefined) ?? curr.tipo_usuario ?? 'visitante',
      condominio: node.condominio
        ? {
            id: String(node.condominio.documentId ?? (node as any).condominio?.id ?? ''),
            nome: node.condominio.nome ?? '',
            ...(node.condominio.bairro != null ? { bairro: node.condominio.bairro as string } : {}),
            ...(node.condominio.latitude != null ? { latitude: Number(node.condominio.latitude) } : {}),
            ...(node.condominio.longitude != null ? { longitude: Number(node.condominio.longitude) } : {}),
            ...(node.condominio.raio_atuacao != null ? { raio_atuacao: Number(node.condominio.raio_atuacao) } : {}),
          }
        : curr.condominio ?? null,
    } as UserData;

    if (userShallowEqual(curr, updated)) {
      console.log('[loadUserExpanded] no changes, skip update');
      return curr;
    }
    console.log('[loadUserExpanded] updated (will update state):', updated);
    dispatch(setUserProfile(updated));
    return updated;
  } catch (e: any) {
    const msg = e?.message ?? 'Falha ao carregar usuário (expanded)';
    console.log('[loadUserExpanded] error:', msg);
    dispatch(setUserError(msg));
    return null;
  } finally {
    dispatch(setUserLoading(false));
    console.log('[loadUserExpanded] end');
  }
});