import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
  JSON: { input: any; output: any; }
};

export type Avaliacao = {
  __typename?: 'Avaliacao';
  avaliado?: Maybe<Usuario>;
  avaliador?: Maybe<Usuario>;
  comentario?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  nota: Scalars['Int']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  tipo_avaliacao?: Maybe<Enum_Avaliacao_Tipo_Avaliacao>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AvaliacaoEntityResponseCollection = {
  __typename?: 'AvaliacaoEntityResponseCollection';
  nodes: Array<Avaliacao>;
  pageInfo: Pagination;
};

export type AvaliacaoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AvaliacaoFiltersInput>>>;
  avaliado?: InputMaybe<UsuarioFiltersInput>;
  avaliador?: InputMaybe<UsuarioFiltersInput>;
  comentario?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AvaliacaoFiltersInput>;
  nota?: InputMaybe<IntFilterInput>;
  or?: InputMaybe<Array<InputMaybe<AvaliacaoFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  tipo_avaliacao?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AvaliacaoInput = {
  avaliado?: InputMaybe<Scalars['ID']['input']>;
  avaliador?: InputMaybe<Scalars['ID']['input']>;
  comentario?: InputMaybe<Scalars['String']['input']>;
  nota?: InputMaybe<Scalars['Int']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  tipo_avaliacao?: InputMaybe<Enum_Avaliacao_Tipo_Avaliacao>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  containsi?: InputMaybe<Scalars['Boolean']['input']>;
  endsWith?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  eqi?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  nei?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentSharedMedia = {
  __typename?: 'ComponentSharedMedia';
  file?: Maybe<UploadFile>;
  id: Scalars['ID']['output'];
};

export type ComponentSharedQuote = {
  __typename?: 'ComponentSharedQuote';
  body?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentSharedRichText = {
  __typename?: 'ComponentSharedRichText';
  body?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentSharedSeo = {
  __typename?: 'ComponentSharedSeo';
  id: Scalars['ID']['output'];
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  shareImage?: Maybe<UploadFile>;
};

export type ComponentSharedSlider = {
  __typename?: 'ComponentSharedSlider';
  files: Array<Maybe<UploadFile>>;
  files_connection?: Maybe<UploadFileRelationResponseCollection>;
  id: Scalars['ID']['output'];
};


export type ComponentSharedSliderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentSharedSliderFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Condominio = {
  __typename?: 'Condominio';
  bairro?: Maybe<Scalars['String']['output']>;
  cep: Scalars['String']['output'];
  cidade?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  endereco?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  nome: Scalars['String']['output'];
  posts: Array<Maybe<Post>>;
  posts_connection?: Maybe<PostRelationResponseCollection>;
  produtos: Array<Maybe<Produto>>;
  produtos_connection?: Maybe<ProdutoRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  raio_atuacao?: Maybe<Scalars['Int']['output']>;
  uf?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  usuarios: Array<Maybe<Usuario>>;
  usuarios_connection?: Maybe<UsuarioRelationResponseCollection>;
};


export type CondominioPostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CondominioPosts_ConnectionArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CondominioProdutosArgs = {
  filters?: InputMaybe<ProdutoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CondominioProdutos_ConnectionArgs = {
  filters?: InputMaybe<ProdutoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CondominioUsuariosArgs = {
  filters?: InputMaybe<UsuarioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CondominioUsuarios_ConnectionArgs = {
  filters?: InputMaybe<UsuarioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CondominioEntityResponseCollection = {
  __typename?: 'CondominioEntityResponseCollection';
  nodes: Array<Condominio>;
  pageInfo: Pagination;
};

export type CondominioFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CondominioFiltersInput>>>;
  bairro?: InputMaybe<StringFilterInput>;
  cep?: InputMaybe<StringFilterInput>;
  cidade?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  endereco?: InputMaybe<StringFilterInput>;
  latitude?: InputMaybe<FloatFilterInput>;
  longitude?: InputMaybe<FloatFilterInput>;
  nome?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CondominioFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CondominioFiltersInput>>>;
  posts?: InputMaybe<PostFiltersInput>;
  produtos?: InputMaybe<ProdutoFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  raio_atuacao?: InputMaybe<IntFilterInput>;
  uf?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  usuarios?: InputMaybe<UsuarioFiltersInput>;
};

export type CondominioInput = {
  bairro?: InputMaybe<Scalars['String']['input']>;
  cep?: InputMaybe<Scalars['String']['input']>;
  cidade?: InputMaybe<Scalars['String']['input']>;
  endereco?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  nome?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  produtos?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  raio_atuacao?: InputMaybe<Scalars['Int']['input']>;
  uf?: InputMaybe<Scalars['String']['input']>;
  usuarios?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  containsi?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  eqi?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  nei?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DeleteMutationResponse = {
  __typename?: 'DeleteMutationResponse';
  documentId: Scalars['ID']['output'];
};

export type Denuncia = {
  __typename?: 'Denuncia';
  autor?: Maybe<Usuario>;
  comentario?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  moderador_responsavel?: Maybe<Usuario>;
  motivo?: Maybe<Enum_Denuncia_Motivo>;
  post_denunciado?: Maybe<Post>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  status_denuncia?: Maybe<Enum_Denuncia_Status_Denuncia>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DenunciaEntityResponseCollection = {
  __typename?: 'DenunciaEntityResponseCollection';
  nodes: Array<Denuncia>;
  pageInfo: Pagination;
};

export type DenunciaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DenunciaFiltersInput>>>;
  autor?: InputMaybe<UsuarioFiltersInput>;
  comentario?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  moderador_responsavel?: InputMaybe<UsuarioFiltersInput>;
  motivo?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<DenunciaFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DenunciaFiltersInput>>>;
  post_denunciado?: InputMaybe<PostFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  status_denuncia?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DenunciaInput = {
  autor?: InputMaybe<Scalars['ID']['input']>;
  comentario?: InputMaybe<Scalars['String']['input']>;
  moderador_responsavel?: InputMaybe<Scalars['ID']['input']>;
  motivo?: InputMaybe<Enum_Denuncia_Motivo>;
  post_denunciado?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status_denuncia?: InputMaybe<Enum_Denuncia_Status_Denuncia>;
};

export type DenunciaRelationResponseCollection = {
  __typename?: 'DenunciaRelationResponseCollection';
  nodes: Array<Denuncia>;
};

export enum Enum_Avaliacao_Tipo_Avaliacao {
  Post = 'post',
  Produto = 'produto',
  Servico = 'servico',
  Usuario = 'usuario'
}

export enum Enum_Denuncia_Motivo {
  ConteudoImproprio = 'conteudo_improprio',
  Fake = 'fake',
  Fraude = 'fraude',
  Golpe = 'golpe',
  Ofensivo = 'ofensivo',
  Outro = 'outro',
  Spam = 'spam'
}

export enum Enum_Denuncia_Status_Denuncia {
  Pendente = 'pendente',
  Recusada = 'recusada',
  Resolvida = 'resolvida'
}

export enum Enum_Post_Escopo_Visibilidade {
  Bairro = 'bairro',
  Condominio = 'condominio',
  EntornoExpandido = 'entorno_expandido',
  MultiCondominio = 'multi_condominio',
  ProximidadeImediata = 'proximidade_imediata',
  RegiaoParceira = 'regiao_parceira'
}

export enum Enum_Post_Nivel_Visibilidade {
  ApenasCondominio = 'apenas_condominio',
  Publico = 'publico',
  Restrito = 'restrito'
}

export enum Enum_Post_Restrito_Para {
  Anunciante = 'anunciante',
  Consumer = 'consumer',
  Creator = 'creator',
  LiderComunitario = 'lider_comunitario',
  Moderador = 'moderador',
  Visitante = 'visitante'
}

export enum Enum_Post_Status_Post {
  Ativo = 'ativo',
  Expirado = 'expirado',
  Removido = 'removido'
}

export enum Enum_Post_Tipo_Negociacao {
  Doacao = 'doacao',
  Troca = 'troca',
  Venda = 'venda'
}

export enum Enum_Post_Tipo_Post {
  Aviso = 'aviso',
  Campanha = 'campanha',
  Doacao = 'doacao',
  Evento = 'evento',
  Pedido = 'pedido',
  Servico = 'servico',
  Troca = 'troca',
  Venda = 'venda'
}

export enum Enum_Produto_Condicao {
  Novo = 'novo',
  Reformado = 'reformado',
  Usado = 'usado'
}

export enum Enum_Produto_Status_Produto {
  Disponivel = 'disponivel',
  Indisponivel = 'indisponivel',
  Reservado = 'reservado'
}

export enum Enum_Solicitacao_Status_Solicitacao {
  Aceita = 'aceita',
  Cancelada = 'cancelada',
  Pendente = 'pendente',
  Recusada = 'recusada'
}

export enum Enum_Solicitacao_Tipo_Interacao {
  Doacao = 'doacao',
  InscricaoEvento = 'inscricao_evento',
  InteresseServico = 'interesse_servico',
  ParticiparCampanha = 'participar_campanha',
  Pedido = 'pedido',
  Reserva = 'reserva',
  Troca = 'troca'
}

export enum Enum_Usuario_Origem_Validacao {
  Geolocalizacao = 'geolocalizacao',
  Manual = 'manual',
  Ocr = 'ocr'
}

export enum Enum_Usuario_Status_Validacao {
  Pendente = 'pendente',
  Rejeitado = 'rejeitado',
  Validado = 'validado'
}

export enum Enum_Usuario_Tipo_Usuario {
  Anunciante = 'anunciante',
  Consumer = 'consumer',
  Creator = 'creator',
  LiderComunitario = 'lider_comunitario',
  Moderador = 'moderador',
  Visitante = 'visitante'
}

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains?: InputMaybe<Scalars['Float']['input']>;
  containsi?: InputMaybe<Scalars['Float']['input']>;
  endsWith?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  eqi?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nei?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']['input']>;
  notContainsi?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type GenericMorph = Avaliacao | ComponentSharedMedia | ComponentSharedQuote | ComponentSharedRichText | ComponentSharedSeo | ComponentSharedSlider | Condominio | Denuncia | I18NLocale | Post | Produto | ReviewWorkflowsWorkflow | ReviewWorkflowsWorkflowStage | Solicitacao | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Usuario;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  nodes: Array<I18NLocale>;
  pageInfo: Pagination;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  containsi?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  eqi?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  nei?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notContainsi?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains?: InputMaybe<Scalars['Int']['input']>;
  containsi?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  eqi?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nei?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']['input']>;
  notContainsi?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains?: InputMaybe<Scalars['JSON']['input']>;
  containsi?: InputMaybe<Scalars['JSON']['input']>;
  endsWith?: InputMaybe<Scalars['JSON']['input']>;
  eq?: InputMaybe<Scalars['JSON']['input']>;
  eqi?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  ne?: InputMaybe<Scalars['JSON']['input']>;
  nei?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']['input']>;
  notContainsi?: InputMaybe<Scalars['JSON']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createAvaliacao?: Maybe<Avaliacao>;
  createCondominio?: Maybe<Condominio>;
  createDenuncia?: Maybe<Denuncia>;
  createPost?: Maybe<Post>;
  createProduto?: Maybe<Produto>;
  createReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  createReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  createSolicitacao?: Maybe<Solicitacao>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createUsuario?: Maybe<Usuario>;
  deleteAvaliacao?: Maybe<DeleteMutationResponse>;
  deleteCondominio?: Maybe<DeleteMutationResponse>;
  deleteDenuncia?: Maybe<DeleteMutationResponse>;
  deletePost?: Maybe<DeleteMutationResponse>;
  deleteProduto?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflow?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflowStage?: Maybe<DeleteMutationResponse>;
  deleteSolicitacao?: Maybe<DeleteMutationResponse>;
  deleteUploadFile?: Maybe<UploadFile>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteUsuario?: Maybe<DeleteMutationResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAvaliacao?: Maybe<Avaliacao>;
  updateCondominio?: Maybe<Condominio>;
  updateDenuncia?: Maybe<Denuncia>;
  updatePost?: Maybe<Post>;
  updateProduto?: Maybe<Produto>;
  updateReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  updateReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  updateSolicitacao?: Maybe<Solicitacao>;
  updateUploadFile: UploadFile;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateUsuario?: Maybe<Usuario>;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateAvaliacaoArgs = {
  data: AvaliacaoInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateCondominioArgs = {
  data: CondominioInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateDenunciaArgs = {
  data: DenunciaInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreatePostArgs = {
  data: PostInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateProdutoArgs = {
  data: ProdutoInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateSolicitacaoArgs = {
  data: SolicitacaoInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationCreateUsuarioArgs = {
  data: UsuarioInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationDeleteAvaliacaoArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteCondominioArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteDenunciaArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteProdutoArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteSolicitacaoArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsuarioArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUpdateAvaliacaoArgs = {
  data: AvaliacaoInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateCondominioArgs = {
  data: CondominioInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateDenunciaArgs = {
  data: DenunciaInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePostArgs = {
  data: PostInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateProdutoArgs = {
  data: ProdutoInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateSolicitacaoArgs = {
  data: SolicitacaoInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateUploadFileArgs = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsuarioArgs = {
  data: UsuarioInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type Post = {
  __typename?: 'Post';
  afinidade_score?: Maybe<Scalars['Int']['output']>;
  condominio?: Maybe<Condominio>;
  conteudo?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  criador_post?: Maybe<Usuario>;
  data_expiracao?: Maybe<Scalars['DateTime']['output']>;
  data_publicacao?: Maybe<Scalars['DateTime']['output']>;
  denuncias: Array<Maybe<Denuncia>>;
  denuncias_connection?: Maybe<DenunciaRelationResponseCollection>;
  documentId: Scalars['ID']['output'];
  escopo_visibilidade?: Maybe<Enum_Post_Escopo_Visibilidade>;
  microreacoes?: Maybe<Scalars['Int']['output']>;
  nivel_visibilidade?: Maybe<Enum_Post_Nivel_Visibilidade>;
  preco?: Maybe<Scalars['Float']['output']>;
  produto?: Maybe<Produto>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  restrito_para?: Maybe<Enum_Post_Restrito_Para>;
  status_post?: Maybe<Enum_Post_Status_Post>;
  tipo_negociacao?: Maybe<Enum_Post_Tipo_Negociacao>;
  tipo_post: Enum_Post_Tipo_Post;
  titulo: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type PostDenunciasArgs = {
  filters?: InputMaybe<DenunciaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PostDenuncias_ConnectionArgs = {
  filters?: InputMaybe<DenunciaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PostEntityResponseCollection = {
  __typename?: 'PostEntityResponseCollection';
  nodes: Array<Post>;
  pageInfo: Pagination;
};

export type PostFiltersInput = {
  afinidade_score?: InputMaybe<IntFilterInput>;
  and?: InputMaybe<Array<InputMaybe<PostFiltersInput>>>;
  condominio?: InputMaybe<CondominioFiltersInput>;
  conteudo?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  criador_post?: InputMaybe<UsuarioFiltersInput>;
  data_expiracao?: InputMaybe<DateTimeFilterInput>;
  data_publicacao?: InputMaybe<DateTimeFilterInput>;
  denuncias?: InputMaybe<DenunciaFiltersInput>;
  documentId?: InputMaybe<IdFilterInput>;
  escopo_visibilidade?: InputMaybe<StringFilterInput>;
  microreacoes?: InputMaybe<IntFilterInput>;
  nivel_visibilidade?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PostFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PostFiltersInput>>>;
  preco?: InputMaybe<FloatFilterInput>;
  produto?: InputMaybe<ProdutoFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  restrito_para?: InputMaybe<StringFilterInput>;
  status_post?: InputMaybe<StringFilterInput>;
  tipo_negociacao?: InputMaybe<StringFilterInput>;
  tipo_post?: InputMaybe<StringFilterInput>;
  titulo?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PostInput = {
  afinidade_score?: InputMaybe<Scalars['Int']['input']>;
  condominio?: InputMaybe<Scalars['ID']['input']>;
  conteudo?: InputMaybe<Scalars['String']['input']>;
  criador_post?: InputMaybe<Scalars['ID']['input']>;
  data_expiracao?: InputMaybe<Scalars['DateTime']['input']>;
  data_publicacao?: InputMaybe<Scalars['DateTime']['input']>;
  denuncias?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  escopo_visibilidade?: InputMaybe<Enum_Post_Escopo_Visibilidade>;
  microreacoes?: InputMaybe<Scalars['Int']['input']>;
  nivel_visibilidade?: InputMaybe<Enum_Post_Nivel_Visibilidade>;
  preco?: InputMaybe<Scalars['Float']['input']>;
  produto?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  restrito_para?: InputMaybe<Enum_Post_Restrito_Para>;
  status_post?: InputMaybe<Enum_Post_Status_Post>;
  tipo_negociacao?: InputMaybe<Enum_Post_Tipo_Negociacao>;
  tipo_post?: InputMaybe<Enum_Post_Tipo_Post>;
  titulo?: InputMaybe<Scalars['String']['input']>;
};

export type PostRelationResponseCollection = {
  __typename?: 'PostRelationResponseCollection';
  nodes: Array<Post>;
};

export type Produto = {
  __typename?: 'Produto';
  categoria?: Maybe<Scalars['String']['output']>;
  condicao?: Maybe<Enum_Produto_Condicao>;
  condominio?: Maybe<Condominio>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  descricao?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  dono_produto?: Maybe<Usuario>;
  historico_donos: Array<Maybe<UsersPermissionsUser>>;
  historico_donos_connection?: Maybe<UsersPermissionsUserRelationResponseCollection>;
  nome: Scalars['String']['output'];
  post?: Maybe<Post>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  solicitacoes: Array<Maybe<Solicitacao>>;
  solicitacoes_connection?: Maybe<SolicitacaoRelationResponseCollection>;
  status_produto?: Maybe<Enum_Produto_Status_Produto>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ProdutoHistorico_DonosArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProdutoHistorico_Donos_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProdutoSolicitacoesArgs = {
  filters?: InputMaybe<SolicitacaoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProdutoSolicitacoes_ConnectionArgs = {
  filters?: InputMaybe<SolicitacaoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProdutoEntityResponseCollection = {
  __typename?: 'ProdutoEntityResponseCollection';
  nodes: Array<Produto>;
  pageInfo: Pagination;
};

export type ProdutoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ProdutoFiltersInput>>>;
  categoria?: InputMaybe<StringFilterInput>;
  condicao?: InputMaybe<StringFilterInput>;
  condominio?: InputMaybe<CondominioFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  descricao?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  dono_produto?: InputMaybe<UsuarioFiltersInput>;
  historico_donos?: InputMaybe<UsersPermissionsUserFiltersInput>;
  nome?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ProdutoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProdutoFiltersInput>>>;
  post?: InputMaybe<PostFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  solicitacoes?: InputMaybe<SolicitacaoFiltersInput>;
  status_produto?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProdutoInput = {
  categoria?: InputMaybe<Scalars['String']['input']>;
  condicao?: InputMaybe<Enum_Produto_Condicao>;
  condominio?: InputMaybe<Scalars['ID']['input']>;
  descricao?: InputMaybe<Scalars['String']['input']>;
  dono_produto?: InputMaybe<Scalars['ID']['input']>;
  historico_donos?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  nome?: InputMaybe<Scalars['String']['input']>;
  post?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  solicitacoes?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  status_produto?: InputMaybe<Enum_Produto_Status_Produto>;
};

export type ProdutoRelationResponseCollection = {
  __typename?: 'ProdutoRelationResponseCollection';
  nodes: Array<Produto>;
};

export enum PublicationStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Query = {
  __typename?: 'Query';
  avaliacao?: Maybe<Avaliacao>;
  avaliacoes: Array<Maybe<Avaliacao>>;
  avaliacoes_connection?: Maybe<AvaliacaoEntityResponseCollection>;
  condominio?: Maybe<Condominio>;
  condominios: Array<Maybe<Condominio>>;
  condominios_connection?: Maybe<CondominioEntityResponseCollection>;
  denuncia?: Maybe<Denuncia>;
  denuncias: Array<Maybe<Denuncia>>;
  denuncias_connection?: Maybe<DenunciaEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocale>;
  i18NLocales: Array<Maybe<I18NLocale>>;
  i18NLocales_connection?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  post?: Maybe<Post>;
  posts: Array<Maybe<Post>>;
  posts_connection?: Maybe<PostEntityResponseCollection>;
  produto?: Maybe<Produto>;
  produtos: Array<Maybe<Produto>>;
  produtos_connection?: Maybe<ProdutoEntityResponseCollection>;
  reviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  reviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  reviewWorkflowsWorkflowStages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  reviewWorkflowsWorkflowStages_connection?: Maybe<ReviewWorkflowsWorkflowStageEntityResponseCollection>;
  reviewWorkflowsWorkflows: Array<Maybe<ReviewWorkflowsWorkflow>>;
  reviewWorkflowsWorkflows_connection?: Maybe<ReviewWorkflowsWorkflowEntityResponseCollection>;
  solicitacao?: Maybe<Solicitacao>;
  solicitacoes: Array<Maybe<Solicitacao>>;
  solicitacoes_connection?: Maybe<SolicitacaoEntityResponseCollection>;
  uploadFile?: Maybe<UploadFile>;
  uploadFiles: Array<Maybe<UploadFile>>;
  uploadFiles_connection?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRole>;
  usersPermissionsRoles: Array<Maybe<UsersPermissionsRole>>;
  usersPermissionsRoles_connection?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUser>;
  usersPermissionsUsers: Array<Maybe<UsersPermissionsUser>>;
  usersPermissionsUsers_connection?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  usuario?: Maybe<Usuario>;
  usuarios: Array<Maybe<Usuario>>;
  usuarios_connection?: Maybe<UsuarioEntityResponseCollection>;
};


export type QueryAvaliacaoArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryAvaliacoesArgs = {
  filters?: InputMaybe<AvaliacaoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryAvaliacoes_ConnectionArgs = {
  filters?: InputMaybe<AvaliacaoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCondominioArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCondominiosArgs = {
  filters?: InputMaybe<CondominioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCondominios_ConnectionArgs = {
  filters?: InputMaybe<CondominioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDenunciaArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDenunciasArgs = {
  filters?: InputMaybe<DenunciaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDenuncias_ConnectionArgs = {
  filters?: InputMaybe<DenunciaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryI18NLocaleArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryI18NLocales_ConnectionArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPostArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPosts_ConnectionArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProdutoArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProdutosArgs = {
  filters?: InputMaybe<ProdutoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProdutos_ConnectionArgs = {
  filters?: InputMaybe<ProdutoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowsArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflows_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QuerySolicitacaoArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QuerySolicitacoesArgs = {
  filters?: InputMaybe<SolicitacaoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QuerySolicitacoes_ConnectionArgs = {
  filters?: InputMaybe<SolicitacaoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUploadFileArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUploadFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsRoleArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsRoles_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsUserArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsuarioArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsuariosArgs = {
  filters?: InputMaybe<UsuarioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsuarios_ConnectionArgs = {
  filters?: InputMaybe<UsuarioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type ReviewWorkflowsWorkflow = {
  __typename?: 'ReviewWorkflowsWorkflow';
  contentTypes: Scalars['JSON']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  stageRequiredToPublish?: Maybe<ReviewWorkflowsWorkflowStage>;
  stages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  stages_connection?: Maybe<ReviewWorkflowsWorkflowStageRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ReviewWorkflowsWorkflowEntityResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowEntityResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflow>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  contentTypes?: InputMaybe<JsonFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  stageRequiredToPublish?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  stages?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReviewWorkflowsWorkflowInput = {
  contentTypes?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  stageRequiredToPublish?: InputMaybe<Scalars['ID']['input']>;
  stages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ReviewWorkflowsWorkflowStage = {
  __typename?: 'ReviewWorkflowsWorkflowStage';
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  workflow?: Maybe<ReviewWorkflowsWorkflow>;
};

export type ReviewWorkflowsWorkflowStageEntityResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowStageEntityResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflowStage>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowStageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  color?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  workflow?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
};

export type ReviewWorkflowsWorkflowStageInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  workflow?: InputMaybe<Scalars['ID']['input']>;
};

export type ReviewWorkflowsWorkflowStageRelationResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowStageRelationResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflowStage>;
};

export type Solicitacao = {
  __typename?: 'Solicitacao';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data_manifestacao?: Maybe<Scalars['DateTime']['output']>;
  data_resposta?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  mensagem_adicional?: Maybe<Scalars['String']['output']>;
  post_solicitado?: Maybe<Post>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  solicitante?: Maybe<UsersPermissionsUser>;
  status_solicitacao?: Maybe<Enum_Solicitacao_Status_Solicitacao>;
  tipo_interacao?: Maybe<Enum_Solicitacao_Tipo_Interacao>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SolicitacaoEntityResponseCollection = {
  __typename?: 'SolicitacaoEntityResponseCollection';
  nodes: Array<Solicitacao>;
  pageInfo: Pagination;
};

export type SolicitacaoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<SolicitacaoFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  data_manifestacao?: InputMaybe<DateTimeFilterInput>;
  data_resposta?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  mensagem_adicional?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<SolicitacaoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<SolicitacaoFiltersInput>>>;
  post_solicitado?: InputMaybe<PostFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  solicitante?: InputMaybe<UsersPermissionsUserFiltersInput>;
  status_solicitacao?: InputMaybe<StringFilterInput>;
  tipo_interacao?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type SolicitacaoInput = {
  data_manifestacao?: InputMaybe<Scalars['DateTime']['input']>;
  data_resposta?: InputMaybe<Scalars['DateTime']['input']>;
  mensagem_adicional?: InputMaybe<Scalars['String']['input']>;
  post_solicitado?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  solicitante?: InputMaybe<Scalars['ID']['input']>;
  status_solicitacao?: InputMaybe<Enum_Solicitacao_Status_Solicitacao>;
  tipo_interacao?: InputMaybe<Enum_Solicitacao_Tipo_Interacao>;
};

export type SolicitacaoRelationResponseCollection = {
  __typename?: 'SolicitacaoRelationResponseCollection';
  nodes: Array<Solicitacao>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  containsi?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  eqi?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nei?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notContainsi?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  ext?: Maybe<Scalars['String']['output']>;
  formats?: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata?: Maybe<Scalars['JSON']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  nodes: Array<UploadFile>;
  pageInfo: Pagination;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  nodes: Array<UploadFile>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  documentId: Scalars['ID']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  nodes: Array<UsersPermissionsPermission>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Maybe<UsersPermissionsPermission>>;
  permissions_connection?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users: Array<Maybe<UsersPermissionsUser>>;
  users_connection?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRolePermissions_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  nodes: Array<UsersPermissionsRole>;
  pageInfo: Pagination;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUser>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  nodes: Array<UsersPermissionsUser>;
  pageInfo: Pagination;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  provider?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  nodes: Array<UsersPermissionsUser>;
};

export type Usuario = {
  __typename?: 'Usuario';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  condominio?: Maybe<Condominio>;
  confirmationToken?: Maybe<Scalars['String']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  documento_alterado?: Maybe<Scalars['Boolean']['output']>;
  documento_tipo?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  origem_validacao?: Maybe<Enum_Usuario_Origem_Validacao>;
  password?: Maybe<Scalars['String']['output']>;
  posts: Array<Maybe<Post>>;
  posts_connection?: Maybe<PostRelationResponseCollection>;
  produtos: Array<Maybe<Produto>>;
  produtos_connection?: Maybe<ProdutoRelationResponseCollection>;
  provider?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  reputacao?: Maybe<Scalars['Int']['output']>;
  resetPasswordToken?: Maybe<Scalars['String']['output']>;
  status_validacao?: Maybe<Enum_Usuario_Status_Validacao>;
  tipo_usuario?: Maybe<Enum_Usuario_Tipo_Usuario>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UsersPermissionsUser>;
  username?: Maybe<Scalars['String']['output']>;
};


export type UsuarioPostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsuarioPosts_ConnectionArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsuarioProdutosArgs = {
  filters?: InputMaybe<ProdutoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsuarioProdutos_ConnectionArgs = {
  filters?: InputMaybe<ProdutoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsuarioEntityResponseCollection = {
  __typename?: 'UsuarioEntityResponseCollection';
  nodes: Array<Usuario>;
  pageInfo: Pagination;
};

export type UsuarioFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsuarioFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  condominio?: InputMaybe<CondominioFiltersInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  documento_alterado?: InputMaybe<BooleanFilterInput>;
  documento_tipo?: InputMaybe<StringFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsuarioFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsuarioFiltersInput>>>;
  origem_validacao?: InputMaybe<StringFilterInput>;
  password?: InputMaybe<StringFilterInput>;
  posts?: InputMaybe<PostFiltersInput>;
  produtos?: InputMaybe<ProdutoFiltersInput>;
  provider?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  reputacao?: InputMaybe<IntFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  status_validacao?: InputMaybe<StringFilterInput>;
  tipo_usuario?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsuarioInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  condominio?: InputMaybe<Scalars['ID']['input']>;
  confirmationToken?: InputMaybe<Scalars['String']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  documento_alterado?: InputMaybe<Scalars['Boolean']['input']>;
  documento_tipo?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  origem_validacao?: InputMaybe<Enum_Usuario_Origem_Validacao>;
  password?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  produtos?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  provider?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  reputacao?: InputMaybe<Scalars['Int']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  status_validacao?: InputMaybe<Enum_Usuario_Status_Validacao>;
  tipo_usuario?: InputMaybe<Enum_Usuario_Tipo_Usuario>;
  user?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UsuarioRelationResponseCollection = {
  __typename?: 'UsuarioRelationResponseCollection';
  nodes: Array<Usuario>;
};

export type PostFieldsFragment = { __typename?: 'Post', documentId: string, titulo: string, createdAt?: string | null, data_publicacao?: string | null, tipo_post: Enum_Post_Tipo_Post, status_post?: Enum_Post_Status_Post | null, preco?: number | null, condominio?: { __typename?: 'Condominio', documentId: string, nome: string } | null, criador_post?: { __typename?: 'Usuario', documentId: string, username?: string | null, email: string } | null };

export type ListMyCondoPostsQueryVariables = Exact<{
  condominioId: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ListMyCondoPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', documentId: string, titulo: string, createdAt?: string | null, data_publicacao?: string | null, tipo_post: Enum_Post_Tipo_Post, status_post?: Enum_Post_Status_Post | null, preco?: number | null, condominio?: { __typename?: 'Condominio', documentId: string, nome: string } | null, criador_post?: { __typename?: 'Usuario', documentId: string, username?: string | null, email: string } | null } | null> };

export type ListNeighborhoodPostsQueryVariables = Exact<{
  bairro: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ListNeighborhoodPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', documentId: string, titulo: string, createdAt?: string | null, data_publicacao?: string | null, tipo_post: Enum_Post_Tipo_Post, status_post?: Enum_Post_Status_Post | null, preco?: number | null, condominio?: { __typename?: 'Condominio', documentId: string, nome: string } | null, criador_post?: { __typename?: 'Usuario', documentId: string, username?: string | null, email: string } | null } | null> };

export type ListPostsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ListPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', documentId: string, titulo: string, createdAt?: string | null, data_publicacao?: string | null, tipo_post: Enum_Post_Tipo_Post, status_post?: Enum_Post_Status_Post | null, preco?: number | null, condominio?: { __typename?: 'Condominio', documentId: string, nome: string } | null, criador_post?: { __typename?: 'Usuario', documentId: string, username?: string | null, email: string } | null } | null> };

export type PostDetailFieldsFragment = { __typename?: 'Post', documentId: string, titulo: string, conteudo?: string | null, createdAt?: string | null, data_publicacao?: string | null, tipo_post: Enum_Post_Tipo_Post, tipo_negociacao?: Enum_Post_Tipo_Negociacao | null, preco?: number | null, status_post?: Enum_Post_Status_Post | null, escopo_visibilidade?: Enum_Post_Escopo_Visibilidade | null, nivel_visibilidade?: Enum_Post_Nivel_Visibilidade | null, restrito_para?: Enum_Post_Restrito_Para | null, condominio?: { __typename?: 'Condominio', documentId: string, nome: string } | null, criador_post?: { __typename?: 'Usuario', documentId: string, username?: string | null, email: string } | null, produto?: { __typename?: 'Produto', documentId: string } | null };

export type GetPostByDocumentIdQueryVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;


export type GetPostByDocumentIdQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', documentId: string, titulo: string, conteudo?: string | null, createdAt?: string | null, data_publicacao?: string | null, tipo_post: Enum_Post_Tipo_Post, tipo_negociacao?: Enum_Post_Tipo_Negociacao | null, preco?: number | null, status_post?: Enum_Post_Status_Post | null, escopo_visibilidade?: Enum_Post_Escopo_Visibilidade | null, nivel_visibilidade?: Enum_Post_Nivel_Visibilidade | null, restrito_para?: Enum_Post_Restrito_Para | null, condominio?: { __typename?: 'Condominio', documentId: string, nome: string } | null, criador_post?: { __typename?: 'Usuario', documentId: string, username?: string | null, email: string } | null, produto?: { __typename?: 'Produto', documentId: string } | null } | null> };

export type UsuarioFieldsFragment = { __typename?: 'Usuario', documentId: string, username?: string | null, email: string, tipo_usuario?: Enum_Usuario_Tipo_Usuario | null, condominio?: { __typename?: 'Condominio', documentId: string, nome: string, bairro?: string | null } | null, user?: { __typename?: 'UsersPermissionsUser', documentId: string, email: string, username: string } | null };

export type UsuarioByUserDocQueryVariables = Exact<{
  userDocumentId: Scalars['ID']['input'];
}>;


export type UsuarioByUserDocQuery = { __typename?: 'Query', usuarios: Array<{ __typename?: 'Usuario', documentId: string, username?: string | null, email: string, tipo_usuario?: Enum_Usuario_Tipo_Usuario | null, condominio?: { __typename?: 'Condominio', documentId: string, nome: string, bairro?: string | null } | null, user?: { __typename?: 'UsersPermissionsUser', documentId: string, email: string, username: string } | null } | null> };

export const PostFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"titulo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"data_publicacao"}},{"kind":"Field","name":{"kind":"Name","value":"tipo_post"}},{"kind":"Field","name":{"kind":"Name","value":"status_post"}},{"kind":"Field","name":{"kind":"Name","value":"preco"}},{"kind":"Field","name":{"kind":"Name","value":"condominio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"nome"}}]}},{"kind":"Field","name":{"kind":"Name","value":"criador_post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<PostFieldsFragment, unknown>;
export const PostDetailFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostDetailFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"titulo"}},{"kind":"Field","name":{"kind":"Name","value":"conteudo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"data_publicacao"}},{"kind":"Field","name":{"kind":"Name","value":"tipo_post"}},{"kind":"Field","name":{"kind":"Name","value":"tipo_negociacao"}},{"kind":"Field","name":{"kind":"Name","value":"preco"}},{"kind":"Field","name":{"kind":"Name","value":"status_post"}},{"kind":"Field","name":{"kind":"Name","value":"escopo_visibilidade"}},{"kind":"Field","name":{"kind":"Name","value":"nivel_visibilidade"}},{"kind":"Field","name":{"kind":"Name","value":"restrito_para"}},{"kind":"Field","name":{"kind":"Name","value":"condominio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"nome"}}]}},{"kind":"Field","name":{"kind":"Name","value":"criador_post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"produto"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}}]}}]}}]} as unknown as DocumentNode<PostDetailFieldsFragment, unknown>;
export const UsuarioFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UsuarioFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Usuario"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"tipo_usuario"}},{"kind":"Field","name":{"kind":"Name","value":"condominio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"nome"}},{"kind":"Field","name":{"kind":"Name","value":"bairro"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<UsuarioFieldsFragment, unknown>;
export const ListMyCondoPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListMyCondoPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"condominioId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"condominio"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"documentId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"condominioId"}}}]}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"status_post"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"StringValue","value":"ativo","block":false}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"data_publicacao:desc","block":false},{"kind":"StringValue","value":"createdAt:desc","block":false}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"titulo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"data_publicacao"}},{"kind":"Field","name":{"kind":"Name","value":"tipo_post"}},{"kind":"Field","name":{"kind":"Name","value":"status_post"}},{"kind":"Field","name":{"kind":"Name","value":"preco"}},{"kind":"Field","name":{"kind":"Name","value":"condominio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"nome"}}]}},{"kind":"Field","name":{"kind":"Name","value":"criador_post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<ListMyCondoPostsQuery, ListMyCondoPostsQueryVariables>;
export const ListNeighborhoodPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListNeighborhoodPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bairro"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"condominio"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"bairro"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bairro"}}}]}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"status_post"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"StringValue","value":"ativo","block":false}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"data_publicacao:desc","block":false},{"kind":"StringValue","value":"createdAt:desc","block":false}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"titulo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"data_publicacao"}},{"kind":"Field","name":{"kind":"Name","value":"tipo_post"}},{"kind":"Field","name":{"kind":"Name","value":"status_post"}},{"kind":"Field","name":{"kind":"Name","value":"preco"}},{"kind":"Field","name":{"kind":"Name","value":"condominio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"nome"}}]}},{"kind":"Field","name":{"kind":"Name","value":"criador_post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<ListNeighborhoodPostsQuery, ListNeighborhoodPostsQueryVariables>;
export const ListPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"createdAt:desc","block":false}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"titulo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"data_publicacao"}},{"kind":"Field","name":{"kind":"Name","value":"tipo_post"}},{"kind":"Field","name":{"kind":"Name","value":"status_post"}},{"kind":"Field","name":{"kind":"Name","value":"preco"}},{"kind":"Field","name":{"kind":"Name","value":"condominio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"nome"}}]}},{"kind":"Field","name":{"kind":"Name","value":"criador_post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<ListPostsQuery, ListPostsQueryVariables>;
export const GetPostByDocumentIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostByDocumentId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"documentId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostDetailFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostDetailFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"titulo"}},{"kind":"Field","name":{"kind":"Name","value":"conteudo"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"data_publicacao"}},{"kind":"Field","name":{"kind":"Name","value":"tipo_post"}},{"kind":"Field","name":{"kind":"Name","value":"tipo_negociacao"}},{"kind":"Field","name":{"kind":"Name","value":"preco"}},{"kind":"Field","name":{"kind":"Name","value":"status_post"}},{"kind":"Field","name":{"kind":"Name","value":"escopo_visibilidade"}},{"kind":"Field","name":{"kind":"Name","value":"nivel_visibilidade"}},{"kind":"Field","name":{"kind":"Name","value":"restrito_para"}},{"kind":"Field","name":{"kind":"Name","value":"condominio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"nome"}}]}},{"kind":"Field","name":{"kind":"Name","value":"criador_post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"produto"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}}]}}]}}]} as unknown as DocumentNode<GetPostByDocumentIdQuery, GetPostByDocumentIdQueryVariables>;
export const UsuarioByUserDocDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UsuarioByUserDoc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userDocumentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usuarios"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"documentId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userDocumentId"}}}]}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"createdAt:desc","block":false}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UsuarioFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UsuarioFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Usuario"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"tipo_usuario"}},{"kind":"Field","name":{"kind":"Name","value":"condominio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"nome"}},{"kind":"Field","name":{"kind":"Name","value":"bairro"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<UsuarioByUserDocQuery, UsuarioByUserDocQueryVariables>;