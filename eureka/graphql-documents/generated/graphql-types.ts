import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  FileUpload: any;
  GUID: string;
  /** Custom scalar for JSON */
  JSON: { [key: string]: any };
  JSONObject: any;
  /** Long type */
  Long: any;
  join__FieldSet: any;
};

export type A3AnalysisSyncResponse = {
  __typename?: 'A3AnalysisSyncResponse';
  analysisType?: Maybe<A3AnalysisTypeEnum>;
  changeDescriptionList?: Maybe<ChangeDescription>;
  insightAnswers?: Maybe<Array<Maybe<InsightAnswer>>>;
};

export enum A3AnalysisTypeEnum {
  AnomalyExplanation = 'ANOMALY_EXPLANATION',
  Change = 'CHANGE',
  Data = 'DATA',
  RelatedInsights = 'RELATED_INSIGHTS',
  Table = 'TABLE',
  Unknown = 'UNKNOWN',
  Visualization = 'VISUALIZATION'
}

export type A3Column = {
  __typename?: 'A3Column';
  a3Suggested?: Maybe<Scalars['Boolean']>;
  logicalColumn?: Maybe<EntityHeader>;
  ownerTable?: Maybe<EntityHeader>;
};

export type A3Columns = {
  __typename?: 'A3Columns';
  a3Columns?: Maybe<Array<Maybe<A3Column>>>;
  validateResponse?: Maybe<ValidateA3QueryResponse>;
};

export type AbsDiffMajority = {
  maxDiffElements?: InputMaybe<Scalars['Float']>;
  maxFraction?: InputMaybe<Scalars['Float']>;
  minAbsChangeRatio?: InputMaybe<Scalars['Float']>;
  minChangeRatio?: InputMaybe<Scalars['Float']>;
};

/** Error for AC formula */
export type AcFormulaError = {
  __typename?: 'AcFormulaError';
  errorMessage?: Maybe<Scalars['String']>;
  errorType?: Maybe<SageErrorCodeType>;
};

export type AcSession = {
  __typename?: 'AcSession';
  /** Gen No from AC */
  genNo?: Maybe<Scalars['Int']>;
  /** Session ID from AC */
  sessionId?: Maybe<Scalars['GUID']>;
};

export type AcSessionInput = {
  /** GenNo from AC */
  genNo: Scalars['Int'];
  /** List of genNos which the client may need in the future */
  genNoWorkingSet?: InputMaybe<Array<Scalars['Int']>>;
  /** Session ID from AC */
  sessionId: Scalars['GUID'];
};

export enum AccessLevel {
  Modify = 'MODIFY',
  ReadOnly = 'READ_ONLY'
}

export enum AccessLevelEnum {
  Full = 'FULL',
  ReportBookView = 'REPORT_BOOK_VIEW'
}

export type AccessLevelInput = {
  /** Minimum access level that the specified user or user group has. If no input is provided then minimum access of READ_ONLY will be considered. */
  access?: InputMaybe<AccessLevel>;
  /** GUID of the user or user group */
  id?: InputMaybe<Scalars['String']>;
  /** Username or name of the user group */
  name?: InputMaybe<Scalars['String']>;
  /** Type of access detail provided */
  type?: InputMaybe<AccessType>;
};

/** Values for share mode */
export enum AccessMode {
  Modify = 'MODIFY',
  NoAccess = 'NO_ACCESS',
  ReadOnly = 'READ_ONLY'
}

/** Access tree response for blink */
export type AccessTreeResponse = {
  __typename?: 'AccessTreeResponse';
  /** underlying data source ids */
  dependentIds: Array<Scalars['String']>;
  /** underlying data source names */
  dependentNames: Array<Scalars['String']>;
  /** permission map used for request access in share */
  permissionsMapByUserByObject: Scalars['JSON'];
  /** has edit access on all data sources */
  requireUnderlyingAccess: Scalars['Boolean'];
  /** can share underlying data sources for the objects */
  shouldShareUnderlyingSources: Scalars['Boolean'];
  /** underlying data source names on which user has no access */
  underlyingDataSourceObjects: Array<Scalars['String']>;
};

export enum AccessType {
  User = 'USER',
  UserGroup = 'USER_GROUP'
}

export type AccessibleOrgMetadata = {
  __typename?: 'AccessibleOrgMetadata';
  canAdministerAllOrgs?: Maybe<Scalars['Boolean']>;
  currentOrgId?: Maybe<Scalars['Int']>;
  orgs?: Maybe<Array<Maybe<OrgMetadata>>>;
};

export type AccessibleOrgsInput = {
  batchsize?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  pattern?: InputMaybe<Scalars['String']>;
};

/** Get accessible orgs for user */
export type AccessibleOrgsResponse = {
  __typename?: 'AccessibleOrgsResponse';
  Data?: Maybe<AccessibleOrgMetadata>;
  Error?: Maybe<Scalars['String']>;
};

export type ActionAssociationDetails = {
  __typename?: 'ActionAssociationDetails';
  availability: Scalars['String'];
  context: AssociatedActionContext;
  detail?: Maybe<ActionDetail>;
  enabled: Scalars['Boolean'];
  id: Scalars['String'];
  isContextMenuOnly: Scalars['Boolean'];
  name: Scalars['String'];
  type: Scalars['String'];
  vizId?: Maybe<Scalars['String']>;
};

export type ActionAssociationInput = {
  actionAssociationMap: ActionAssociationMap;
  actionId: Scalars['String'];
};

export type ActionAssociationMap = {
  ANSWER?: InputMaybe<Scalars['JSON']>;
  VISUALIZATION?: InputMaybe<Scalars['JSON']>;
  WORKSHEET?: InputMaybe<Scalars['JSON']>;
};

export enum ActionAvailability {
  ContextMenuOnly = 'CONTEXT_MENU_ONLY',
  Global = 'GLOBAL',
  Worksheet = 'WORKSHEET'
}

/** Get action config list */
export type ActionConfig = {
  __typename?: 'ActionConfig';
  dialogSize: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
  utl: Scalars['String'];
};

export enum ActionContext {
  ContextMenu = 'CONTEXT_MENU',
  Menu = 'MENU',
  None = 'NONE'
}

export type ActionDetail = {
  __typename?: 'ActionDetail';
  additionalUrlHeaders?: Maybe<Scalars['String']>;
  apiKey?: Maybe<Scalars['String']>;
  apiValue?: Maybe<Scalars['String']>;
  appActionType?: Maybe<Scalars['String']>;
  authSelect?: Maybe<ActionSelect>;
  authToken?: Maybe<Scalars['String']>;
  encodeUser?: Maybe<Scalars['String']>;
  function?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export type ActionDetailInput = {
  additionalUrlHeaders?: InputMaybe<Scalars['String']>;
  apiKey?: InputMaybe<Scalars['String']>;
  apiValue?: InputMaybe<Scalars['String']>;
  appActionType?: InputMaybe<Scalars['String']>;
  authSelect?: InputMaybe<ActionSelect>;
  authToken?: InputMaybe<Scalars['String']>;
  encodeUser?: InputMaybe<Scalars['String']>;
  function?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<Scalars['String']>;
};

export enum ActionSelect {
  Apikey = 'APIKEY',
  Basic = 'BASIC',
  Bearer = 'BEARER',
  None = 'NONE'
}

export enum ActionTypes {
  App = 'APP',
  Callback = 'CALLBACK',
  Url = 'URL'
}

export type AddColumnsTransform = {
  columnIds?: InputMaybe<Array<Scalars['String']>>;
  generateResponse: Scalars['Boolean'];
  schemaTableId?: InputMaybe<Scalars['Int']>;
};

export type AddInsightFeedbackInput = {
  encodedAnalysisFacts?: InputMaybe<Scalars['String']>;
  feedbackFeatureIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  feedbackId?: InputMaybe<Scalars['String']>;
  insightId: Scalars['String'];
  isLiked?: InputMaybe<Scalars['Boolean']>;
  userId: Scalars['String'];
};

export type AddJobPayload = {
  emailAddress: Scalars['String'];
  emailBody?: InputMaybe<Scalars['String']>;
  exportSettings?: InputMaybe<ScheduleExportRequest>;
  format: Scalars['String'];
  frequencyGranularity: FrequencyGranularity;
  gatingCondition?: InputMaybe<GatingConditionInput>;
  pinboardId: Scalars['GUID'];
  receivers: Array<Receiver>;
  selectedSchedule: CronFrequencySpecInput;
  timezone?: InputMaybe<Scalars['String']>;
  userguid: Scalars['String'];
};

export type AddSchemaTableTransform = {
  tableGuid?: InputMaybe<Scalars['String']>;
};

export type AddTableInput = {
  /** A JSON array of column details */
  columns: Array<InputMaybe<ColumnsInput>>;
  /** Name of the database in the data platform */
  dbName: Scalars['String'];
  /** Name of the table */
  name: Scalars['String'];
  /** Name of the schema in the database */
  schemaName: Scalars['String'];
};

export type AddUpdateFilterInput = {
  /** Filter Content containing filter operator and filter values */
  filterContent: Array<FilterContentInput>;
  /** logical column and datasource id on which filter is to be created */
  filterGroupId: FilterGroupIdInput;
  /** Container id from which cross filter is applied. */
  sourceContainerId?: InputMaybe<Scalars['GUID']>;
};

/** Upload profile picture input */
export type AddUsersToOrgInput = {
  orgid: Scalars['Int'];
  userids: Array<Scalars['String']>;
};

export type AddVizToPinboardResponse = {
  __typename?: 'AddVizToPinboardResponse';
  /**
   * ID of pinboard to which viz is pinned.
   * This would be the ID of the new pinboard if newPinboardName was set
   */
  pinboardId: Scalars['GUID'];
  /**
   * ID of tabId to which viz is pinned.
   * This would be the ID of the new tabId if newTabName was set
   */
  tabId?: Maybe<Scalars['GUID']>;
  /** ID of new Viz created inside the pinboard */
  vizId: Scalars['GUID'];
};

export type Admin_ConfigResponse = {
  __typename?: 'Admin_ConfigResponse';
  configs?: Maybe<Array<Maybe<Admin__Config>>>;
};

export type Admin_GetDevSpotEmbedSettingsResponse = {
  __typename?: 'Admin_GetDevSpotEmbedSettingsResponse';
  blockNonEmbedFullAppAccess: Scalars['String'];
  error?: Maybe<Scalars['String']>;
  lastRequested?: Maybe<Scalars['String']>;
  nginx_corshosts: Scalars['String'];
  nginx_csp_connect_src: Scalars['String'];
  nginx_csp_font_src: Scalars['String'];
  nginx_csp_frame_ancestors: Scalars['String'];
  nginx_csp_img_src: Scalars['String'];
  nginx_csp_style_src: Scalars['String'];
  serviceAuthenticationSecret: Scalars['String'];
  validRedirectDomains: Scalars['String'];
};

export type Admin_GetEulaResponse = {
  __typename?: 'Admin_GetEulaResponse';
  Data?: Maybe<Admin__EulaResponse>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin_GetHelpConfigResponse = {
  __typename?: 'Admin_GetHelpConfigResponse';
  Data?: Maybe<Array<Maybe<HelpConfig>>>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin_GetNginxCors = {
  __typename?: 'Admin_GetNginxCors';
  Data: Scalars['String'];
  Error?: Maybe<Scalars['String']>;
};

export type Admin_GetReleaseVersion = {
  __typename?: 'Admin_GetReleaseVersion';
  Data?: Maybe<Scalars['String']>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin_SamlUpdate = {
  certData?: InputMaybe<Put_CertData>;
  clientId?: InputMaybe<Scalars['String']>;
  defaultHeaders: DefaultHeaders;
  id?: InputMaybe<Scalars['String']>;
  issuer?: InputMaybe<Scalars['String']>;
  maxClockSkew?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  requestSignatureAlgorithm?: InputMaybe<Scalars['String']>;
  responseSignatureAlgorithm?: InputMaybe<Scalars['String']>;
  sso?: InputMaybe<SsoInputService>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Admin__Action = {
  __typename?: 'Admin__Action';
  type?: Maybe<Scalars['String']>;
};

export type Admin__ApplicationSettings = {
  __typename?: 'Admin__ApplicationSettings';
  action_customization?: Maybe<Scalars['Boolean']>;
  chart_customization?: Maybe<Scalars['Boolean']>;
  csv_upload?: Maybe<Scalars['Boolean']>;
  early_access_feature?: Maybe<Scalars['Boolean']>;
  embed_ui_customisation?: Maybe<Scalars['Boolean']>;
  help_customization?: Maybe<Scalars['Boolean']>;
  onboarding?: Maybe<Scalars['Boolean']>;
  search?: Maybe<Scalars['Boolean']>;
  style_customization?: Maybe<Scalars['Boolean']>;
  version_control_system?: Maybe<Scalars['Boolean']>;
};

export type Admin__AuthTokenData = {
  __typename?: 'Admin__AuthTokenData';
  org?: Maybe<Scalars['String']>;
  token: Scalars['String'];
  tokenAuthStatus: Scalars['String'];
};

export type Admin__AuthTokenResponse = {
  __typename?: 'Admin__AuthTokenResponse';
  Data?: Maybe<Admin__AuthTokenData>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__Authentication = {
  __typename?: 'Admin__Authentication';
  active_dir?: Maybe<Scalars['Boolean']>;
  internal_auth?: Maybe<Scalars['Boolean']>;
  saml?: Maybe<Scalars['Boolean']>;
};

export type Admin__Billing = {
  __typename?: 'Admin__Billing';
  credit_consumption?: Maybe<Scalars['Boolean']>;
  query_stats?: Maybe<Scalars['Boolean']>;
};

export type Admin__Config = {
  __typename?: 'Admin__Config';
  configName?: Maybe<Scalars['String']>;
  elementConfig?: Maybe<Admin__ElementConfig>;
  elementType?: Maybe<Scalars['String']>;
  infoTooltip?: Maybe<Scalars['String']>;
  validation?: Maybe<Admin__Validation>;
  value?: Maybe<Scalars['String']>;
};

export type Admin__Data = {
  __typename?: 'Admin__Data';
  status?: Maybe<Admin__Status>;
};

export type Admin__DeleteNasInput = {
  mount_point: Scalars['String'];
};

export type Admin__ElementConfig = {
  __typename?: 'Admin__ElementConfig';
  groups?: Maybe<Array<Maybe<Admin__Option>>>;
  type?: Maybe<Scalars['String']>;
};

export type Admin__EulaResponse = {
  __typename?: 'Admin__EulaResponse';
  file_path?: Maybe<Scalars['String']>;
  grace_period?: Maybe<Scalars['Int']>;
  is_signed?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['String']>;
};

export type Admin__FeatureResponse = {
  __typename?: 'Admin__FeatureResponse';
  groupName?: Maybe<Scalars['String']>;
  settings?: Maybe<Array<Maybe<Admin__Setting>>>;
};

export type Admin__GetEmbedTscliCommandResponse = {
  __typename?: 'Admin__GetEmbedTscliCommandResponse';
  Data?: Maybe<Admin_ConfigResponse>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__GetLdapAdResponse = {
  __typename?: 'Admin__GetLdapAdResponse';
  Data?: Maybe<Admin__LdapAdResponse>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__GetLocalResponse = {
  __typename?: 'Admin__GetLocalResponse';
  Data?: Maybe<Admin__LocalResponse>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__GetNasResponse = {
  __typename?: 'Admin__GetNasResponse';
  Data?: Maybe<Array<Maybe<Admin__NasResponse>>>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__GetRevSshResponse = {
  __typename?: 'Admin__GetRevSshResponse';
  Data?: Maybe<Admin__RevSshResponse>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__GetSmtpResponse = {
  __typename?: 'Admin__GetSmtpResponse';
  Data?: Maybe<Admin__SmtpResponse>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__GetSnapshotResponse = {
  __typename?: 'Admin__GetSnapshotResponse';
  Data?: Maybe<Array<Maybe<Admin__SnapshotResponse>>>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__GetSslResponse = {
  __typename?: 'Admin__GetSslResponse';
  Data?: Maybe<Admin__SslResponse>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__GetTscliCommandResponse = {
  __typename?: 'Admin__GetTscliCommandResponse';
  Data?: Maybe<Admin__FeatureResponse>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__LdapAdResponse = {
  __typename?: 'Admin__LdapAdResponse';
  automatically_create_users?: Maybe<Scalars['Boolean']>;
  domain?: Maybe<Scalars['String']>;
  enable_ldap?: Maybe<Scalars['Boolean']>;
  is_configured?: Maybe<Scalars['Boolean']>;
  search_base?: Maybe<Scalars['String']>;
  ssl?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
};

export type Admin__LearnMore = {
  __typename?: 'Admin__LearnMore';
  newWindow?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
};

export type Admin__ListConnection = {
  clientId: Scalars['String'];
  defaultHeaders: DefaultHeaders;
};

export type Admin__LocalResponse = {
  __typename?: 'Admin__LocalResponse';
  status?: Maybe<Scalars['Boolean']>;
};

export type Admin__MetaDataFile = {
  clientId?: InputMaybe<Scalars['String']>;
  defaultHeaders: DefaultHeaders;
  metaDataFile?: InputMaybe<Scalars['FileUpload']>;
};

export type Admin__NasResponse = {
  __typename?: 'Admin__NasResponse';
  mount_point?: Maybe<Scalars['String']>;
  mount_type?: Maybe<Scalars['String']>;
  path_on_server?: Maybe<Scalars['String']>;
  server_address?: Maybe<Scalars['String']>;
  status?: Maybe<NasStatus>;
};

export type Admin__Option = {
  __typename?: 'Admin__Option';
  options?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Admin__OrgsManagement = {
  __typename?: 'Admin__OrgsManagement';
  content?: Maybe<Scalars['Boolean']>;
  org?: Maybe<Scalars['Boolean']>;
};

export type Admin__RevSshResponse = {
  __typename?: 'Admin__RevSshResponse';
  configured_status?: Maybe<Scalars['Boolean']>;
  reverse_ssh_status?: Maybe<Scalars['Boolean']>;
};

export type Admin__SamlConnection = {
  certData?: InputMaybe<Header_CertData>;
  clientId?: InputMaybe<Scalars['String']>;
  defaultHeaders: DefaultHeaders;
  issuer?: InputMaybe<Scalars['String']>;
  maxClockSkew?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  requestSignatureAlgorithm?: InputMaybe<Scalars['String']>;
  responseSignatureAlgorithm?: InputMaybe<Scalars['String']>;
  sso?: InputMaybe<SsoInputService>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Admin__SamlConnectionResponse = {
  __typename?: 'Admin__SamlConnectionResponse';
  Data?: Maybe<Admin__SamlResponse>;
  Status?: Maybe<Scalars['String']>;
};

export type Admin__SamlResponse = {
  __typename?: 'Admin__SamlResponse';
  certData?: Maybe<CertData>;
  id?: Maybe<Scalars['String']>;
  issuer?: Maybe<Scalars['String']>;
  maxClockSkew?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  requestSignatureAlgorithm?: Maybe<Scalars['String']>;
  responseSignatureAlgorithm?: Maybe<Scalars['String']>;
  sso?: Maybe<SsoService>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Admin__SetDevSpotAdminPrivilegesInput = {
  blockNonEmbedFullAppAccess?: InputMaybe<Scalars['String']>;
  serviceAuthenticationSecret?: InputMaybe<Scalars['Boolean']>;
  validRedirectDomains: Scalars['String'];
};

export type Admin__SetDevSpotEmbedDevPrivilegesInput = {
  blockNonEmbedFullAppAccess: Scalars['String'];
  nginx_corshosts: Scalars['String'];
  nginx_csp_connect_src: Scalars['String'];
  nginx_csp_font_src: Scalars['String'];
  nginx_csp_frame_ancestors: Scalars['String'];
  nginx_csp_img_src: Scalars['String'];
  nginx_csp_style_src: Scalars['String'];
};

export type Admin__SetLdapAdInput = {
  automatically_create_users?: InputMaybe<Scalars['Boolean']>;
  domain: Scalars['String'];
  enable_ldap?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
  search_base: Scalars['String'];
  ssl?: InputMaybe<Scalars['Boolean']>;
  url: Scalars['String'];
  username: Scalars['String'];
};

export type Admin__SetLocalInput = {
  status?: InputMaybe<Scalars['Boolean']>;
};

export type Admin__SetNasInput = {
  mount_point?: InputMaybe<Scalars['String']>;
  mount_type?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  path_on_server?: InputMaybe<Scalars['String']>;
  server_address?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Admin__SetRevSshInput = {
  reverse_ssh_status?: InputMaybe<Scalars['Boolean']>;
};

export type Admin__SetSmtpInput = {
  from_name?: InputMaybe<Scalars['String']>;
  mail_from?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  port_number?: InputMaybe<Scalars['String']>;
  relay_host?: InputMaybe<Scalars['String']>;
  smtp_auth_status?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Admin__SetSnapshotInput = {
  name: Scalars['String'];
  ttl?: InputMaybe<Scalars['Int']>;
};

export type Admin__SetTscliCommandResponse = {
  __typename?: 'Admin__SetTscliCommandResponse';
  Data?: Maybe<Admin__FeatureResponse>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__Setting = {
  __typename?: 'Admin__Setting';
  actions?: Maybe<Array<Maybe<Admin__Action>>>;
  configs?: Maybe<Array<Maybe<Admin__Config>>>;
  learnMore?: Maybe<Admin__LearnMore>;
  resetToDefault?: Maybe<Scalars['String']>;
  settingName?: Maybe<Scalars['String']>;
};

export type Admin__SignEulaResponse = {
  __typename?: 'Admin__SignEulaResponse';
  Data?: Maybe<Scalars['String']>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__SmtpResponse = {
  __typename?: 'Admin__SmtpResponse';
  configured_status?: Maybe<Scalars['Boolean']>;
  from_name?: Maybe<Scalars['String']>;
  is_host_reachable?: Maybe<Scalars['Boolean']>;
  mail_from?: Maybe<Scalars['String']>;
  port_number?: Maybe<Scalars['String']>;
  real_name?: Maybe<Scalars['String']>;
  relay_host?: Maybe<Scalars['String']>;
  smtp_auth_status?: Maybe<Scalars['Boolean']>;
};

export type Admin__SnapshotResponse = {
  __typename?: 'Admin__SnapshotResponse';
  name?: Maybe<Scalars['String']>;
  snapshotStatus?: Maybe<SnapshotStatus>;
  start_timestamp_seconds?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type Admin__SslInfo = {
  __typename?: 'Admin__SslInfo';
  company_name?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  not_after?: Maybe<Scalars['String']>;
  organization?: Maybe<Scalars['String']>;
  organizational_unit?: Maybe<Scalars['String']>;
  signature_algorithm?: Maybe<Scalars['String']>;
  signing_algorithm?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type Admin__SslResponse = {
  __typename?: 'Admin__SslResponse';
  is_configured?: Maybe<Scalars['Boolean']>;
  ssl_info?: Maybe<Admin__SslInfo>;
  ssl_status?: Maybe<Scalars['Boolean']>;
  tls_version?: Maybe<Scalars['String']>;
};

export type Admin__Status = {
  __typename?: 'Admin__Status';
  application_settings?: Maybe<Admin__ApplicationSettings>;
  authentication?: Maybe<Admin__Authentication>;
  billing?: Maybe<Admin__Billing>;
  org_management?: Maybe<Admin__OrgsManagement>;
  system?: Maybe<Admin__System>;
  system_activities?: Maybe<Admin__SystemActivities>;
  tscli_ui?: Maybe<Array<Maybe<Scalars['String']>>>;
  user_management?: Maybe<Admin__UserManagement>;
};

export type Admin__StatusResponse = {
  __typename?: 'Admin__StatusResponse';
  Data?: Maybe<Admin__Data>;
  Error?: Maybe<Scalars['String']>;
  bothTabsDisplayed?: Maybe<Scalars['Boolean']>;
};

export type Admin__System = {
  __typename?: 'Admin__System';
  alerts?: Maybe<Scalars['Boolean']>;
  backup?: Maybe<Scalars['Boolean']>;
  backup_storage?: Maybe<Admin__System__Backup__Storage>;
  cluster_details?: Maybe<Scalars['Boolean']>;
  scheduled_maintenance?: Maybe<Scalars['Boolean']>;
  security?: Maybe<Admin__System__Security>;
  smtp?: Maybe<Scalars['Boolean']>;
  system_information?: Maybe<Scalars['Boolean']>;
  table_status?: Maybe<Scalars['Boolean']>;
  upgrade?: Maybe<Scalars['Boolean']>;
  user_agreement?: Maybe<Scalars['Boolean']>;
};

export type Admin__SystemActivities = {
  __typename?: 'Admin__SystemActivities';
  app_performance?: Maybe<Scalars['Boolean']>;
  content_activities?: Maybe<Scalars['Boolean']>;
  indexing_queries?: Maybe<Scalars['Boolean']>;
  object_usages?: Maybe<Scalars['Boolean']>;
  user_activity?: Maybe<Scalars['Boolean']>;
};

export type Admin__System__Backup__Storage = {
  __typename?: 'Admin__System__Backup__Storage';
  nas?: Maybe<Scalars['Boolean']>;
  snapshot?: Maybe<Scalars['Boolean']>;
};

export type Admin__System__Security = {
  __typename?: 'Admin__System__Security';
  rev_ssh?: Maybe<Scalars['Boolean']>;
  ssl?: Maybe<Scalars['Boolean']>;
};

export type Admin__UploadMetaDataResponse = {
  __typename?: 'Admin__UploadMetaDataResponse';
  Data?: Maybe<Admin__MetaDataResponse>;
  Status?: Maybe<Scalars['String']>;
};

export type Admin__UserManagement = {
  __typename?: 'Admin__UserManagement';
  groups?: Maybe<Scalars['Boolean']>;
  roles?: Maybe<Scalars['Boolean']>;
  users?: Maybe<Scalars['Boolean']>;
};

export type Admin__ValidateEmbedSettingsInput = {
  blockNonEmbedFullAppAccess: Scalars['String'];
  nginx_corshosts: Scalars['String'];
  nginx_csp_connect_src: Scalars['String'];
  nginx_csp_font_src: Scalars['String'];
  nginx_csp_frame_ancestors: Scalars['String'];
  nginx_csp_img_src: Scalars['String'];
  nginx_csp_style_src: Scalars['String'];
  validRedirectDomains: Scalars['String'];
};

export type Admin__ValidateEmbedSettingsResponse = {
  __typename?: 'Admin__ValidateEmbedSettingsResponse';
  Data?: Maybe<Scalars['String']>;
  Error?: Maybe<Scalars['String']>;
};

export type Admin__Validation = {
  __typename?: 'Admin__Validation';
  isNumeric?: Maybe<Scalars['String']>;
  maxLength?: Maybe<Scalars['Int']>;
  minLength?: Maybe<Scalars['Int']>;
  range?: Maybe<Scalars['String']>;
  regex?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['String']>;
};

export type Admin__MetaDataResponse = {
  __typename?: 'Admin__metaDataResponse';
  certData?: Maybe<ShortCertData>;
  issuer?: Maybe<Scalars['String']>;
  ssoServices?: Maybe<Array<Maybe<SsoService>>>;
};

export type AdminsyncPrincipalResponse = {
  __typename?: 'AdminsyncPrincipalResponse';
  /** Group name of list of groups added */
  groupsAdded?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Group name of list of groups deleted */
  groupsDeleted?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Group name of list of groups updated */
  groupsUpdated?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Username of list of users added */
  usersAdded?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Username of list of users deleted */
  usersDeleted?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Username of list of users updated */
  usersUpdated?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum AggregateFunctionTypeEnum {
  Aggregate = 'AGGREGATE',
  AggrDistinct = 'AGGR_DISTINCT',
  ApproxAggrDistinct = 'APPROX_AGGR_DISTINCT',
  ApproxAggrDistinctMerge = 'APPROX_AGGR_DISTINCT_MERGE',
  ApproxCountDistinct = 'APPROX_COUNT_DISTINCT',
  Average = 'AVERAGE',
  Count = 'COUNT',
  CountDistinct = 'COUNT_DISTINCT',
  Growth = 'GROWTH',
  Max = 'MAX',
  Median = 'MEDIAN',
  Min = 'MIN',
  None = 'NONE',
  Percentile = 'PERCENTILE',
  Rank = 'RANK',
  RankPercentile = 'RANK_PERCENTILE',
  SqlBoolAggregateOp = 'SQL_BOOL_AGGREGATE_OP',
  SqlDateAggregateOp = 'SQL_DATE_AGGREGATE_OP',
  SqlDateTimeAggregateOp = 'SQL_DATE_TIME_AGGREGATE_OP',
  SqlDoubleAggregateOp = 'SQL_DOUBLE_AGGREGATE_OP',
  SqlIntAggregateOp = 'SQL_INT_AGGREGATE_OP',
  SqlStringAggregateOp = 'SQL_STRING_AGGREGATE_OP',
  SqlTimeAggregateOp = 'SQL_TIME_AGGREGATE_OP',
  StdDeviation = 'STD_DEVIATION',
  Sum = 'SUM',
  TableAggr = 'TABLE_AGGR',
  Variance = 'VARIANCE'
}

export type AllOrgListResponse = {
  __typename?: 'AllOrgListResponse';
  countOfGroupsByOrg?: Maybe<Scalars['JSON']>;
  countOfUsersByOrg?: Maybe<Scalars['JSON']>;
  isLastBatch?: Maybe<Scalars['Boolean']>;
  orgs?: Maybe<Array<Maybe<OrgResponse>>>;
};

export type AllRoleData = {
  __typename?: 'AllRoleData';
  /** author of the role */
  author?: Maybe<Scalars['String']>;
  /** role created timestamp */
  created?: Maybe<Scalars['Float']>;
  /** description of the role */
  description?: Maybe<Scalars['String']>;
  /** id of the role */
  id?: Maybe<Scalars['String']>;
  /** is Deleted boolean */
  isDeleted?: Maybe<Scalars['Boolean']>;
  /** role modified timestamp */
  modified?: Maybe<Scalars['Float']>;
  /** name of the role */
  name?: Maybe<Scalars['String']>;
  /** number of assigned groups */
  numberOfGroupsAssigned?: Maybe<Scalars['Int']>;
  /** privileges of the role */
  privileges?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** if role is readOnly */
  readOnly?: Maybe<Scalars['Boolean']>;
};

export type AllowedActions = {
  __typename?: 'AllowedActions';
  customizeAnalysis?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  modifySchedule?: Maybe<Scalars['Boolean']>;
  pause?: Maybe<Scalars['Boolean']>;
  resume?: Maybe<Scalars['Boolean']>;
  save?: Maybe<Scalars['Boolean']>;
  scheduleAnalysis?: Maybe<Scalars['Boolean']>;
  updateAnalysis?: Maybe<Scalars['Boolean']>;
  view?: Maybe<Scalars['Boolean']>;
  viewJobRuns?: Maybe<Scalars['Boolean']>;
};

export type AnalysisActionId = {
  __typename?: 'AnalysisActionId';
  analysisResultId?: Maybe<Scalars['GUID']>;
  schedulerJobId?: Maybe<Scalars['GUID']>;
  schedulerRunId?: Maybe<Scalars['GUID']>;
};

export type AnalysisActionIdInput = {
  analysisResultId?: InputMaybe<Scalars['GUID']>;
  schedulerJobId?: InputMaybe<Scalars['GUID']>;
  schedulerRunId?: InputMaybe<Scalars['GUID']>;
};

export type AnalysisActionResponse = {
  __typename?: 'AnalysisActionResponse';
  analysisActionStatus: Array<AnalysisActionStatus>;
};

export enum AnalysisActionResponseStatus {
  Done = 'DONE',
  Failed = 'FAILED'
}

export type AnalysisActionStatus = {
  __typename?: 'AnalysisActionStatus';
  analysisId?: Maybe<AnalysisActionId>;
  message: Scalars['String'];
  status: AnalysisActionResponseStatus;
};

export enum AnalysisActionType {
  Delete = 'DELETE',
  Save = 'SAVE'
}

export type AnalysisAlgorithm = {
  absDiffMajority?: InputMaybe<AbsDiffMajority>;
  anomalyExplanation?: InputMaybe<AnalysisAlgorithmAnomalyExplanation>;
  crossCorrelation?: InputMaybe<AnalysisAlgorithmCrossCorrelation>;
  dataPoint?: InputMaybe<Array<InputMaybe<DataPoint>>>;
  linearRegression?: InputMaybe<LinearRegression>;
  madMedian?: InputMaybe<MadMedian>;
  shesd?: InputMaybe<SeasonalHybridEsd>;
  stdevMean?: InputMaybe<StdevMean>;
  trendAnalysis?: InputMaybe<AnalysisAlgorithmTrendAnalysis>;
  type?: InputMaybe<AnalysisAlgorithmTypeEnum>;
};

export type AnalysisAlgorithmAnomalyExplanation = {
  decisionTree?: InputMaybe<Scalars['String']>;
  maxExplanationColumns?: InputMaybe<Scalars['Int']>;
  minRows?: InputMaybe<Scalars['Int']>;
};

export type AnalysisAlgorithmCrossCorrelation = {
  corrCoeff?: InputMaybe<Scalars['Float']>;
  maxCorrCoeff?: InputMaybe<Scalars['Float']>;
  maxLag?: InputMaybe<Scalars['Float']>;
  minRows?: InputMaybe<Scalars['Float']>;
};

export type AnalysisAlgorithmTrendAnalysis = {
  linearRegression?: InputMaybe<LinearRegression>;
  minAbsGradientRadThreshold?: InputMaybe<Scalars['Float']>;
  minRelativeDifference?: InputMaybe<Scalars['Float']>;
  minRows?: InputMaybe<Scalars['Int']>;
  pValue?: InputMaybe<Scalars['Float']>;
  percentPoints?: InputMaybe<Scalars['Float']>;
  relativeDifference?: InputMaybe<Scalars['Float']>;
  slope?: InputMaybe<Scalars['Float']>;
};

export enum AnalysisAlgorithmTypeEnum {
  AbsDiffMajority = 'ABS_DIFF_MAJORITY',
  AnomalyExplanation = 'ANOMALY_EXPLANATION',
  CrossCorrelation = 'CROSS_CORRELATION',
  LinearRegression = 'LINEAR_REGRESSION',
  MadMedian = 'MAD_MEDIAN',
  Shesd = 'SHESD',
  StdevMean = 'STDEV_MEAN',
  TrendAnalysis = 'TREND_ANALYSIS'
}

export enum AnalysisClassEnum {
  AnomalyExplanation = 'ANOMALY_EXPLANATION',
  CrossCorrelation = 'CROSS_CORRELATION',
  CustomRAnalysis = 'CUSTOM_R_ANALYSIS',
  DiffExplanation = 'DIFF_EXPLANATION',
  OutlierDetection = 'OUTLIER_DETECTION',
  TrendAnalysis = 'TREND_ANALYSIS'
}

export type AnalysisDescriptor = {
  analysisClass?: InputMaybe<AnalysisClassEnum>;
  anomalyExplanation?: InputMaybe<AnomalyExplanation>;
  crossCorrelation?: InputMaybe<CrossCorrelation>;
  customRAnalysis?: InputMaybe<CustomRAnalysis>;
  diffExplanation?: InputMaybe<DiffExplanation>;
  outlierDetection?: InputMaybe<OutlierDetection>;
  trendAnalysis?: InputMaybe<TrendAnalysis>;
};

export type AnalysisDetails = {
  __typename?: 'AnalysisDetails';
  drillsInfo: Array<Maybe<DrillInfo>>;
  totalDrills: Scalars['Int'];
  totalInsights: Scalars['Int'];
  totalInsightsShown: Scalars['Int'];
};

export type AnalysisInfo = {
  __typename?: 'AnalysisInfo';
  allowedActions?: Maybe<AllowedActions>;
  analysisId?: Maybe<AnalysisActionId>;
  description: Scalars['String'];
  expiryDeadline: Scalars['Long'];
  granularity?: Maybe<Scalars['String']>;
  lastAnalyzed: Scalars['Long'];
  message?: Maybe<Scalars['String']>;
  periodicSchedule?: Maybe<PeriodicSchedule>;
  progress?: Maybe<Scalars['Int']>;
  state: AnalysisState;
  title: Scalars['String'];
  triggeredUserDisplayName?: Maybe<Scalars['String']>;
  triggeredUserGuid: Scalars['String'];
};

export type AnalysisParam = {
  analysisDescriptor: Array<AnalysisDescriptor>;
  autotuneDateBoundary?: InputMaybe<Scalars['Boolean']>;
  excludeNull?: InputMaybe<Scalars['Boolean']>;
  excludeZeroMeasure?: InputMaybe<Scalars['Boolean']>;
  highlightBestValue?: InputMaybe<Scalars['Boolean']>;
  maxFalconQueries?: InputMaybe<Scalars['Int']>;
  maxFalconResponseRows?: InputMaybe<Scalars['Int']>;
  maxInsightsOpts?: InputMaybe<MaxInsightOptions>;
  resourceOpts?: InputMaybe<ResourceOptions>;
};

export enum AnalysisSortBy {
  ExpiresIn = 'EXPIRES_IN',
  LastAnalyzed = 'LAST_ANALYZED',
  Name = 'NAME',
  Status = 'STATUS',
  TriggeredBy = 'TRIGGERED_BY'
}

export enum AnalysisState {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  NoInsights = 'NO_INSIGHTS',
  Paused = 'PAUSED',
  Running = 'RUNNING',
  Scheduled = 'SCHEDULED'
}

export enum AnomalyDirectionEnum {
  High = 'HIGH',
  Low = 'LOW',
  Unknown = 'UNKNOWN'
}

export type AnomalyExplanation = {
  algorithm?: InputMaybe<AnalysisAlgorithm>;
  columnBinding?: InputMaybe<Array<InputMaybe<ColumnBinding>>>;
};

export type AnsQueryBuilderSearchResult = {
  __typename?: 'AnsQueryBuilderSearchResult';
  id: AcSession;
  tokens?: Maybe<Array<RecognizedToken>>;
};

export type Answer = {
  __typename?: 'Answer';
  /** ----------- Client state related ----------- */
  clientState?: Maybe<Scalars['JSON']>;
  cohortConfig?: Maybe<CohortConfig>;
  description: Scalars['String'];
  /** -----------  Visualization Related ----------- */
  displayMode?: Maybe<DisplayMode>;
  /** -----------  Filters Related ----------- */
  filterGroups?: Maybe<Array<FilterGroup>>;
  /** -----------  AC Formula Related ----------- */
  formulas?: Maybe<Array<AnswerFormula>>;
  hashKey: Scalars['String'];
  headlineVisibilityMap?: Maybe<Array<HeadlineVisibility>>;
  /** ----------- Answer Metadata ----------- */
  id: Scalars['ID'];
  /** Parameters available to be used in this answer */
  inScopeParameters?: Maybe<Array<Parameter>>;
  isChasmTrapQuery?: Maybe<Scalars['Boolean']>;
  metadata: AnswerMetadata;
  name: Scalars['String'];
  /** Parameter overrides applied on this answer */
  parameters?: Maybe<Array<Parameter>>;
  /** ----------- Path Analysis ------------- */
  pathAnalysisConfig?: Maybe<PathAnalysisConfig>;
  /** -----------  Permission Related ----------- */
  permission?: Maybe<ObjectPermission>;
  /** ----------- Query related ----------- */
  phrases?: Maybe<Array<SagePhrase>>;
  queryableDataSource?: Maybe<QuerableDataSourceType>;
  /** ---------- Whether Used in Sage Query ------------ */
  selectedColumns?: Maybe<Array<Maybe<SelectedColumn>>>;
  selectedFormulas?: Maybe<Array<Maybe<SelectedFormula>>>;
  sortInfo?: Maybe<Array<Maybe<ColumnSortInfo>>>;
  /** ---------- Selected Sources ------------ */
  sources?: Maybe<Array<Source>>;
  suggestedDisplayMode?: Maybe<DisplayMode>;
  topInfo?: Maybe<Array<Maybe<ColumnSortInfo>>>;
  visualizations?: Maybe<Array<Maybe<Visualization>>>;
};


export type AnswerFormulasArgs = {
  includeAutoGenerated?: InputMaybe<Scalars['Boolean']>;
};

export type AnswerColumn = {
  __typename?: 'AnswerColumn';
  aggregationType?: Maybe<ColumnAggregationType>;
  baseColumnType: AnswerColumnType;
  calendarGuid?: Maybe<Scalars['GUID']>;
  columnProps?: Maybe<AnswerColumnProps>;
  customCalendarType?: Maybe<AnswerColumnCustomCalendarType>;
  customOrder?: Maybe<Array<Scalars['String']>>;
  /** Modelling properties */
  dataType?: Maybe<FalconDataType>;
  format?: Maybe<AnswerColumnFormat>;
  formatPattern?: Maybe<Scalars['String']>;
  formatType?: Maybe<AnswerColumnFormatType>;
  formulaId?: Maybe<Scalars['GUID']>;
  geoConfig?: Maybe<GeoConfig>;
  id: Scalars['ID'];
  isAdditive?: Maybe<Scalars['Boolean']>;
  isAggregateApplied?: Maybe<Scalars['Boolean']>;
  isGroupBy?: Maybe<Scalars['Boolean']>;
  isUserDefinedTitle?: Maybe<Scalars['Boolean']>;
  /** Legacy ChartColumnFormat Properties */
  legacyColumnFormatProperties?: Maybe<Scalars['JSON']>;
  /** Legacy sheet Properties */
  legacySheetProperties?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  referencedColumns?: Maybe<Array<EntityHeader>>;
  referencedTables?: Maybe<Array<EntityHeader>>;
  showGrowth?: Maybe<Scalars['Boolean']>;
  timeBucket?: Maybe<ColumnTimeBucket>;
  type?: Maybe<AnswerColumnEffectiveType>;
  uniqueValues?: Maybe<Scalars['String']>;
};

/** Answer Column Config Input for Add / Update Column */
export type AnswerColumnConfigInput = {
  aggregationType?: InputMaybe<ColumnAggregationType>;
  joinPath?: InputMaybe<Array<JoinPathInput>>;
  timeBucket?: InputMaybe<ColumnTimeBucket>;
};

export enum AnswerColumnCustomCalendarType {
  EndOfDateBucket = 'END_OF_DATE_BUCKET',
  FormattedDateBucketString = 'FORMATTED_DATE_BUCKET_STRING'
}

export enum AnswerColumnEffectiveType {
  Attribute = 'ATTRIBUTE',
  Measure = 'MEASURE',
  Unknown = 'UNKNOWN'
}

export type AnswerColumnFormat = {
  __typename?: 'AnswerColumnFormat';
  currencyFormat?: Maybe<CurrencyFormat>;
  pattern?: Maybe<Scalars['String']>;
};

export enum AnswerColumnFormatType {
  Currency = 'CURRENCY',
  None = 'NONE',
  Percentage = 'PERCENTAGE'
}

export type AnswerColumnInfo = {
  /**
   * Config for Column (optional)
   * TimeBucket will not work for now, till implemented in Sage
   */
  columnConfig?: InputMaybe<AnswerColumnConfigInput>;
  /** logicalColumnId of the column to be added */
  logicalColumnId: Scalars['GUID'];
};

export type AnswerColumnInput = {
  id: Scalars['ID'];
  type: AnswerColumnEffectiveType;
};

export enum AnswerColumnPropVersion {
  PreV1 = 'PRE_V1',
  V1 = 'V1'
}

export type AnswerColumnProperty = {
  __typename?: 'AnswerColumnProperty';
  format?: Maybe<FormatConfig>;
  sortConfig?: Maybe<ColumnSortConfigOptions>;
};

export type AnswerColumnProps = {
  __typename?: 'AnswerColumnProps';
  columnProperties?: Maybe<AnswerColumnProperty>;
  version?: Maybe<AnswerColumnPropVersion>;
};

/** Sort Information for Answer Column */
export type AnswerColumnSortInput = {
  /** Column Id to update */
  columnId: Scalars['String'];
  /** Sort Type */
  sortType: AnswerColumnSortType;
};

export enum AnswerColumnSortType {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING',
  Unknown = 'UNKNOWN'
}

export enum AnswerColumnType {
  FilterColumn = 'FILTER_COLUMN',
  GrowthColumn = 'GROWTH_COLUMN',
  SageColumn = 'SAGE_COLUMN'
}

/**  Generated from tsProto.bach.answer.AnswerContext.E  */
export enum AnswerContextType {
  CohortAnswer = 'COHORT_ANSWER',
  DownloadAnswer = 'DOWNLOAD_ANSWER',
  EditPinboardViz = 'EDIT_PINBOARD_VIZ',
  ExploreAnswer = 'EXPLORE_ANSWER',
  NewAnswer = 'NEW_ANSWER',
  PinboardViz = 'PINBOARD_VIZ',
  SavedAnswer = 'SAVED_ANSWER',
  SpotIq = 'SPOT_IQ',
  UnaggregatedAnswer = 'UNAGGREGATED_ANSWER',
  View = 'VIEW'
}

export type AnswerDataResponse = IBachResponse & {
  __typename?: 'AnswerDataResponse';
  data: Array<Scalars['JSON']>;
  id: BachSessionId;
};

export type AnswerEditSession = IBachResponse & {
  __typename?: 'AnswerEditSession';
  answer: Answer;
  /** get empty answer. This is an expensive call */
  emptyAnswer?: Maybe<EmptyAnswer>;
  id: BachSessionId;
  joinPathAmbiguityInfo?: Maybe<JoinPathAmbiguityInfo>;
};

export type AnswerEntityList = {
  __typename?: 'AnswerEntityList';
  isLastBatch: Scalars['Boolean'];
  objects?: Maybe<Array<AnswerEntityMetadata>>;
};

/** A type that describes a item in answer list */
export type AnswerEntityMetadata = {
  __typename?: 'AnswerEntityMetadata';
  /** The answer's author id */
  author: Scalars['String'];
  /** The answer's display name for author */
  authorDisplayName: Scalars['String'];
  /** The answer's author name */
  authorName: Scalars['String'];
  /** The answer's time of creation */
  created: Scalars['Float'];
  /** For pinboardList Check if tabExists */
  hasTabs?: Maybe<Scalars['Boolean']>;
  /** The answer's id */
  id: Scalars['GUID'];
  /** Check if data source is external or not */
  isExternal: Scalars['Boolean'];
  /** isFavorite */
  isFavorite?: Maybe<Scalars['Boolean']>;
  /** The answer's time of modification */
  modified?: Maybe<Scalars['Float']>;
  /** The answer's modifier */
  modifiedBy: Scalars['String'];
  /** The answer's name */
  name: Scalars['String'];
  /** The answer's owner */
  owner: Scalars['String'];
  /** Defines answer permissions */
  permission?: Maybe<Permission>;
  /** The answer's tags */
  tags?: Maybe<Array<Tag>>;
  /** Total container count in pinboard */
  totalContainerCount?: Maybe<Scalars['Int']>;
};

/** Answer Formula (derived from sage ACFormula) */
export type AnswerFormula = {
  __typename?: 'AnswerFormula';
  aggregationType?: Maybe<SageColumnAggTypes>;
  columnType?: Maybe<SageColumnType>;
  dataType?: Maybe<FalconDataType>;
  error?: Maybe<AcFormulaError>;
  header?: Maybe<SageEntityHeader>;
  isAutoGenerated?: Maybe<Scalars['Boolean']>;
  isComplete?: Maybe<Scalars['Boolean']>;
  tokens?: Maybe<Array<SageToken>>;
  wasAutoGenerated?: Maybe<Scalars['Boolean']>;
};

export type AnswerHeader = {
  __typename?: 'AnswerHeader';
  display_name?: Maybe<Scalars['String']>;
  guid?: Maybe<Scalars['GUID']>;
};

export type AnswerInfo = {
  __typename?: 'AnswerInfo';
  answer_header?: Maybe<AnswerHeader>;
  referenced_viz_type?: Maybe<Scalars['String']>;
};

export enum AnswerJoinPathAmbiguityErrorType {
  /**
   * # There is a join path ambiguity which requires manual resolution
   * # for Answers.
   * #
   * # Multiple Join Path resolution is not supported in BlinkV2, and we
   * # throw an error asking user to resolve the ambiguity manually.
   * # Thrown in AddColumns and DrillDown
   */
  JoinPathResolutionRequired = 'JOIN_PATH_RESOLUTION_REQUIRED',
  /** Any other type of issue that bach reports. */
  OtherBackendIssue = 'OTHER_BACKEND_ISSUE'
}

export type AnswerMetadata = {
  __typename?: 'AnswerMetadata';
  /**
   * # TODO: Should author be a separate User entity
   * # This would allow fetching of related info like profile pic, guid etc.
   */
  author?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  databaseStripe?: Maybe<Scalars['String']>;
  generationNum?: Maybe<Scalars['String']>;
  isDiscoverable?: Maybe<Scalars['Boolean']>;
  isFavorite?: Maybe<Scalars['Boolean']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  modifiedAt?: Maybe<Scalars['String']>;
  schemaStripe?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Tag>>;
  type?: Maybe<Scalars['String']>;
};

export type AnswerMetricData = {
  __typename?: 'AnswerMetricData';
  id: Scalars['ID'];
  metadata: AnswerMetadata;
  name: Scalars['String'];
  visualizations?: Maybe<Array<Maybe<Visualization>>>;
};

export type AnswerNaturalLanguageQuery = {
  __typename?: 'AnswerNaturalLanguageQuery';
  groupingColumns?: Maybe<Array<Maybe<OutputColumnRepresentation>>>;
  growthRepresentation?: Maybe<GrowthRepresentation>;
  joinRepresentations?: Maybe<Array<Maybe<JoinRepresentation>>>;
  name?: Maybe<Scalars['String']>;
  outputColumns?: Maybe<Array<Maybe<OutputColumnRepresentation>>>;
  sortColumns?: Maybe<Array<Maybe<SortColumnRepresentation>>>;
  topRepresentation?: Maybe<TopRepresentation>;
  userFilters?: Maybe<Array<Maybe<FilterRepresentationList>>>;
};

export type AnswerParams = {
  answerGuid?: InputMaybe<Scalars['String']>;
  printDocumentParams?: InputMaybe<PrintDocumentParams>;
  vizIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type AnswerQueryBuilderTemplates = {
  __typename?: 'AnswerQueryBuilderTemplates';
  constraints?: Maybe<Array<Maybe<TokenConstraint>>>;
  id: AcSession;
  queryEntries?: Maybe<Array<Maybe<QueryEntry>>>;
  token: Array<Maybe<RecognizedToken>>;
};

export type AnswerQueryResponse = {
  __typename?: 'AnswerQueryResponse';
  /** The GUID of the saved Answer */
  id?: Maybe<Scalars['String']>;
  /** The name of the saved Answer */
  name?: Maybe<Scalars['String']>;
  /** SQL query associated with the saved Answer */
  querySql?: Maybe<Scalars['String']>;
};

export type AnswerV2WithDecodedVizResponse = {
  __typename?: 'AnswerV2WithDecodedVizResponse';
  answer: AnswerMetricData;
  data?: Maybe<Scalars['JSON']>;
  vizData?: Maybe<Scalars['JSON']>;
};

export type Answer__DeleteAnswerResponse = {
  __typename?: 'Answer__deleteAnswerResponse';
  /** delete answer api call response */
  data?: Maybe<Scalars['JSON']>;
};

export type Application = {
  __typename?: 'Application';
  app_guid?: Maybe<Scalars['String']>;
  applicationObjects?: Maybe<Array<Maybe<ApplicationObject>>>;
  comments?: Maybe<Scalars['String']>;
  created_date?: Maybe<Scalars['Long']>;
  documentation_link?: Maybe<Scalars['String']>;
  icon_path?: Maybe<Array<Maybe<Scalars['Int']>>>;
  industry?: Maybe<Scalars['String']>;
  installedStatus?: Maybe<Scalars['String']>;
  long_description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  publish_date?: Maybe<Scalars['Long']>;
  publisher?: Maybe<Scalars['String']>;
  review_status?: Maybe<SpotAppReviewStatus>;
  short_description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  use_case?: Maybe<Scalars['String']>;
  user_guid?: Maybe<Scalars['String']>;
};

export type ApplicationBlock = {
  __typename?: 'ApplicationBlock';
  block?: Maybe<SpotAppsBlock>;
  components?: Maybe<Array<Maybe<SpotAppsComponent>>>;
};

export type ApplicationColumn = {
  __typename?: 'ApplicationColumn';
  columns?: Maybe<Array<Maybe<SpotAppsColumn>>>;
  mapColumns?: Maybe<Scalars['JSON']>;
};

export type ApplicationComponentsInfo = {
  __typename?: 'ApplicationComponentsInfo';
  components?: Maybe<Array<SpotAppsComponent>>;
  isLastBatch?: Maybe<Scalars['Boolean']>;
};

export type ApplicationObject = {
  __typename?: 'ApplicationObject';
  created_date?: Maybe<Scalars['Long']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ApplicationSchema = {
  __typename?: 'ApplicationSchema';
  app_guid?: Maybe<Scalars['String']>;
  mandatoryFlag?: Maybe<Scalars['String']>;
  templateColumnDatatype?: Maybe<Scalars['String']>;
  template_column?: Maybe<Scalars['String']>;
  template_column_desc?: Maybe<Scalars['String']>;
  template_table?: Maybe<Scalars['String']>;
  template_table_desc?: Maybe<Scalars['String']>;
};

export type ApplicationTable = {
  __typename?: 'ApplicationTable';
  dataSourceMetadata?: Maybe<Scalars['JSON']>;
  tables?: Maybe<Array<Maybe<SpotAppsTable>>>;
};

export type AppsFilterParamsInput = {
  /** Takes the author id to filter by author */
  authorId?: InputMaybe<Scalars['String']>;
  /** Sets the number of records to fetch for pagination */
  batchSize?: InputMaybe<Scalars['Float']>;
  /** Sets the next page to fetch */
  offset?: InputMaybe<Scalars['Float']>;
  /** Takes search text */
  searchTerm?: InputMaybe<Scalars['String']>;
  /**
   * Takes the column name in which you want to sort
   * Valid values - NAME, TYPE
   */
  sort?: InputMaybe<Scalars['String']>;
  /** Sets the applications list sorting order */
  sortAscending?: InputMaybe<Scalars['Boolean']>;
  /**
   * Takes the application type to filter
   * Valid values - ALL, PUBLISHED, UNDER_REVIEW, REJECTED
   */
  type?: InputMaybe<Scalars['String']>;
};

export enum AssociatedActionContext {
  ContextMenu = 'CONTEXT_MENU',
  Menu = 'MENU',
  None = 'NONE',
  Primary = 'PRIMARY'
}

/**  Generated from tsProto.atlas.JoinType.E  */
export enum AtlasJoinType {
  Cross = 'CROSS',
  Inner = 'INNER',
  Left = 'LEFT',
  Outer = 'OUTER',
  Right = 'RIGHT'
}

export type AuthCredentials = {
  instance_url: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export enum AuthTokenType {
  Bearer = 'Bearer',
  Cookie = 'Cookie'
}

export type AuthenticationUrlParam = {
  authentication_type?: InputMaybe<Scalars['String']>;
  connectionConfig?: InputMaybe<Scalars['JSON']>;
  datasourceId?: InputMaybe<Scalars['GUID']>;
  host: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};

export type AuthenticationUrlResponse = {
  __typename?: 'AuthenticationURLResponse';
  authUrl: Scalars['String'];
  requestId: Scalars['GUID'];
};

export type AuthorsInfo = {
  __typename?: 'AuthorsInfo';
  count?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  user_guid?: Maybe<Scalars['String']>;
};

export type AutoAnswerRequest = {
  /** Answer description (Optional) */
  description?: InputMaybe<Scalars['String']>;
  /** Answer name (Optional) */
  name?: InputMaybe<Scalars['String']>;
  /** Answer Session ID */
  session: BachSessionIdInput;
};

export type AutogenColumnSuggestionResponse = {
  __typename?: 'AutogenColumnSuggestionResponse';
  /**
   * Suggested columns map where the columns are sorted based on the
   * suggestion type
   */
  suggestedColumns: Array<ColumnMap>;
  /** Worksheet name for the id passed */
  worksheetName: Scalars['String'];
};

export type AutogenRelationship = {
  __typename?: 'AutogenRelationship';
  /** Details for the dest table id */
  destTable: SourceDetail;
  /** Relationship object */
  relationship?: Maybe<RelationshipDetails>;
};

/** Return type for suggested relationship call */
export type AutogenRelationshipResponse = {
  __typename?: 'AutogenRelationshipResponse';
  /** Info object regarding relationship suggestion to be sent to mixpanel */
  relationshipInfo: Scalars['String'];
  /** Actual relationship with dest table information */
  relationships: Array<AutogenRelationship>;
};

export type AvoidTokens = {
  columnGuid?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
};

export type AxisConfig = {
  __typename?: 'AxisConfig';
  category?: Maybe<Array<Maybe<AnswerColumn>>>;
  color?: Maybe<Array<Maybe<AnswerColumn>>>;
  hidden?: Maybe<Array<Maybe<AnswerColumn>>>;
  size?: Maybe<AnswerColumn>;
  sort?: Maybe<Array<Maybe<AnswerColumn>>>;
  x?: Maybe<Array<Maybe<AnswerColumn>>>;
  y?: Maybe<Array<Maybe<AnswerColumn>>>;
};

export type AxisConfigInput = {
  category?: InputMaybe<Array<Scalars['String']>>;
  color?: InputMaybe<Array<Scalars['String']>>;
  hidden?: InputMaybe<Array<Scalars['String']>>;
  size?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  x?: InputMaybe<Array<Scalars['String']>>;
  y?: InputMaybe<Array<Scalars['String']>>;
};

export type AxisExtremesProps = {
  __typename?: 'AxisExtremesProps';
  x?: Maybe<Array<Maybe<RangeParam>>>;
  y?: Maybe<Array<Maybe<RangeParam>>>;
};

export type AxisObj = {
  __typename?: 'AxisObj';
  id?: Maybe<Scalars['String']>;
  properties?: Maybe<AxisProperties>;
};

export type AxisProperties = {
  __typename?: 'AxisProperties';
  axisType?: Maybe<AxisTypes>;
  format?: Maybe<FormatConfig>;
  isOpposite?: Maybe<Scalars['Boolean']>;
  linkedColumns?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  yAxisRange?: Maybe<RangeParam>;
};

export enum AxisTypes {
  Color = 'COLOR',
  X = 'X',
  Y = 'Y'
}

export type BachPinboardSession = {
  __typename?: 'BachPinboardSession';
  /** Loaded context book sessions of vizs in pinboard */
  contextBookSessions?: Maybe<Array<Maybe<ContextBookSession>>>;
  /** Gen No from BachSession */
  genNo?: Maybe<Scalars['Int']>;
  /** Session ID from BachSession */
  sessionId: Scalars['GUID'];
};

export type BachPinboardSessionInput = {
  /** Loaded context book sessions of vizs in pinboard */
  contextBookSessions?: InputMaybe<Array<InputMaybe<ContextBookSessionInput>>>;
  /** Gen No from BachSession */
  genNo?: InputMaybe<Scalars['Int']>;
  /** Session ID from BachSession */
  sessionId: Scalars['GUID'];
};

export type BachSessionId = {
  __typename?: 'BachSessionId';
  acSession?: Maybe<AcSession>;
  /** Gen No from BachSession */
  genNo?: Maybe<Scalars['Int']>;
  /** Session ID from BachSession */
  sessionId: Scalars['GUID'];
};

/** Identifier for a specific Answer object in Session */
export type BachSessionIdInput = {
  /** AC Session for Auto Complete */
  acSession?: InputMaybe<AcSessionInput>;
  /** GenNo from Bach */
  genNo?: InputMaybe<Scalars['Int']>;
  /** List of genNos which the client may need in the future */
  genNoWorkingSet?: InputMaybe<Array<Scalars['Int']>>;
  /** Session ID from Bach */
  sessionId: Scalars['GUID'];
};

/** Identifier for a specific Sql Answer object in Session */
export type BachSessionIdSqlAnswerInput = {
  /** Gen No from BachSession */
  genNo?: InputMaybe<Scalars['Int']>;
  /** Session ID from BachSession */
  sessionId: Scalars['GUID'];
};

export enum BackgroundFormatTypes {
  Gradient = 'GRADIENT',
  Solid = 'SOLID'
}

export enum BlankTrueFalse {
  False = 'False',
  True = 'True'
}

export type CachingInfo = {
  __typename?: 'CachingInfo';
  isCached?: Maybe<Scalars['Boolean']>;
  lastLoadTime?: Maybe<Scalars['Long']>;
  type?: Maybe<Scalars['String']>;
};

/** Status object defined in callosum/public/status.proto */
export type CallosumStatus = {
  __typename?: 'CallosumStatus';
  errorCode?: Maybe<Scalars['Int']>;
  errorMessage?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['String']>;
};

export type CatalogDeatailsResult = {
  __typename?: 'CatalogDeatailsResult';
  catalogs?: Maybe<Array<Maybe<CatalogsData>>>;
  status?: Maybe<Scalars['Boolean']>;
};

export type CatalogInfo = {
  __typename?: 'CatalogInfo';
  dc_description?: Maybe<Scalars['String']>;
  dc_trustcheck?: Maybe<Scalars['String']>;
};

export type CatalogMetaData = {
  category?: InputMaybe<Scalars['String']>;
  import?: InputMaybe<Scalars['Boolean']>;
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  show?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
};

export type CatalogMetaDataResult = {
  __typename?: 'CatalogMetaDataResult';
  category?: Maybe<Scalars['String']>;
  import?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  show?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

export type CatalogsData = {
  __typename?: 'CatalogsData';
  connected?: Maybe<Scalars['Boolean']>;
  connection_id?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  last_run?: Maybe<Scalars['String']>;
  last_transaction_status?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  schedule?: Maybe<Scalars['String']>;
};

export enum CategoryType {
  Currency = 'CURRENCY',
  Custom = 'CUSTOM',
  Number = 'NUMBER',
  Percentage = 'PERCENTAGE'
}

export type CertData = {
  __typename?: 'CertData';
  cn?: Maybe<Scalars['String']>;
  expires?: Maybe<Scalars['String']>;
  kid?: Maybe<Scalars['String']>;
  x5c?: Maybe<Scalars['String']>;
};

export type ChangeAnalysisSummary = {
  __typename?: 'ChangeAnalysisSummary';
  firstAggregate: Scalars['Float'];
  firstPoint: Scalars['String'];
  measureName: Scalars['String'];
  percentChange: Scalars['Float'];
  secondAggregate: Scalars['Float'];
  secondPoint: Scalars['String'];
};

export type ChangeDescription = {
  __typename?: 'ChangeDescription';
  firstAggregate?: Maybe<Scalars['Float']>;
  firstValueList?: Maybe<Scalars['String']>;
  measureName?: Maybe<Scalars['String']>;
  percentChange?: Maybe<Scalars['Float']>;
  secondAggregate?: Maybe<Scalars['Float']>;
  secondValueList?: Maybe<Scalars['String']>;
};

export type ChartAuthor = {
  __typename?: 'ChartAuthor';
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisation?: Maybe<Scalars['String']>;
};

export type ChartAuthorInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organisation?: InputMaybe<Scalars['String']>;
};

export type ChartColumnPropertyMap = {
  __typename?: 'ChartColumnPropertyMap';
  columnId?: Maybe<Scalars['String']>;
  columnProperty?: Maybe<ChartVizColumnProperties>;
};

export type ChartConfig = {
  __typename?: 'ChartConfig';
  /** with BYOC this is no longer a required field, hence removing */
  axisConfig?: Maybe<Array<Maybe<AxisConfig>>>;
  chartType?: Maybe<ChartType>;
  customChartConfig?: Maybe<Array<Maybe<CustomChartConfig>>>;
  customChartGuid?: Maybe<Scalars['String']>;
  customChartManifest?: Maybe<CustomChartManifest>;
  isLocked?: Maybe<Scalars['Boolean']>;
};

export type ChartProperties = {
  __typename?: 'ChartProperties';
  allLabels?: Maybe<Scalars['Boolean']>;
  axisExtremes?: Maybe<AxisExtremesProps>;
  chartSpecific?: Maybe<ChartSpecificProperties>;
  dataSize?: Maybe<Scalars['Float']>;
  gridLines?: Maybe<GridLineProperties>;
  isZoomed?: Maybe<Scalars['Boolean']>;
  legendPosition?: Maybe<LegendPositionOptions>;
  mapviewport?: Maybe<MapViewport>;
  responsiveLayoutDisabled?: Maybe<Scalars['Boolean']>;
  responsiveLayoutPreference?: Maybe<ChartResponsiveLayout>;
  showLegend?: Maybe<Scalars['Boolean']>;
  showLinearRegressionLine?: Maybe<Scalars['Boolean']>;
  showStackedLabels?: Maybe<Scalars['Boolean']>;
  visibleSeriesNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum ChartResponsiveLayout {
  AutoOff = 'AUTO_OFF',
  AutoOn = 'AUTO_ON',
  UserPreferredOff = 'USER_PREFERRED_OFF',
  UserPreferredOn = 'USER_PREFERRED_ON'
}

export type ChartSpecificProperties = {
  __typename?: 'ChartSpecificProperties';
  customProps?: Maybe<Scalars['JSON']>;
  dataFieldArea?: Maybe<Scalars['String']>;
  hidePivotSummaries?: Maybe<Scalars['Boolean']>;
  isHeatmapOverlayed?: Maybe<Scalars['Boolean']>;
  isStackedAsPercent?: Maybe<Scalars['Boolean']>;
  markersEnabled?: Maybe<Scalars['Boolean']>;
  pivotState?: Maybe<PivotState>;
  pivotSummariesState?: Maybe<PivotSummariesState>;
  showPivotSummaryPrior?: Maybe<ShowPivotSummaryPrior>;
  stackedAsPercentFormat?: Maybe<FormatConfig>;
  summaryFormat?: Maybe<FormatConfig>;
  summaryMode?: Maybe<Scalars['String']>;
  useFlatLayout?: Maybe<Scalars['Boolean']>;
};

export enum ChartType {
  Area = 'AREA',
  Bar = 'BAR',
  Bubble = 'BUBBLE',
  Candlestick = 'CANDLESTICK',
  Column = 'COLUMN',
  CustomChart = 'CUSTOM_CHART',
  Funnel = 'FUNNEL',
  GeoArea = 'GEO_AREA',
  GeoBubble = 'GEO_BUBBLE',
  GeoEarthArea = 'GEO_EARTH_AREA',
  GeoEarthBar = 'GEO_EARTH_BAR',
  GeoEarthBubble = 'GEO_EARTH_BUBBLE',
  GeoEarthGraph = 'GEO_EARTH_GRAPH',
  GeoEarthHeatmap = 'GEO_EARTH_HEATMAP',
  GeoHeatmap = 'GEO_HEATMAP',
  GridTable = 'GRID_TABLE',
  Heatmap = 'HEATMAP',
  Kpi = 'KPI',
  Line = 'LINE',
  LineColumn = 'LINE_COLUMN',
  LineStackedColumn = 'LINE_STACKED_COLUMN',
  None = 'NONE',
  Pareto = 'PARETO',
  Pie = 'PIE',
  PivotTable = 'PIVOT_TABLE',
  Sankey = 'SANKEY',
  Scatter = 'SCATTER',
  SpiderWeb = 'SPIDER_WEB',
  StackedArea = 'STACKED_AREA',
  StackedBar = 'STACKED_BAR',
  StackedColumn = 'STACKED_COLUMN',
  Treemap = 'TREEMAP',
  Waterfall = 'WATERFALL',
  WhiskerScatter = 'WHISKER_SCATTER'
}

export type ChartViz = Visualization & {
  __typename?: 'ChartViz';
  clientState?: Maybe<Scalars['JSON']>;
  columns?: Maybe<Array<VizColumn>>;
  config: ChartConfig;
  customVisualProps?: Maybe<Scalars['JSON']>;
  data?: Maybe<Scalars['JSON']>;
  /** ----------- Visualization Common Fields ----------- */
  id: Scalars['ID'];
  isCustomTitle?: Maybe<Scalars['Boolean']>;
  sortInfo?: Maybe<Array<Maybe<ColumnSortInfo>>>;
  /** ----------- Chart specific Fields ----------- */
  sortOrder?: Maybe<Array<ColumnSortInfo>>;
  suggestedConfig?: Maybe<Array<ChartConfig>>;
  title?: Maybe<Scalars['String']>;
  topInfo?: Maybe<Array<Maybe<ColumnSortInfo>>>;
  vizProp?: Maybe<ChartVizProps>;
};


export type ChartVizDataArgs = {
  canceId?: InputMaybe<Scalars['String']>;
  chartVizParams?: InputMaybe<ChartVizParams>;
  deadline?: InputMaybe<Scalars['Int']>;
  isTooltipCustomizationEnabled?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<DataPaginationParamsInput>;
};

export type ChartVizColumnProperties = {
  __typename?: 'ChartVizColumnProperties';
  conditionalFormatting?: Maybe<ConditionalFormatting>;
  dataLabels?: Maybe<Scalars['Boolean']>;
};

export type ChartVizData = {
  __typename?: 'ChartVizData';
  chartViz?: Maybe<ChartViz>;
  data?: Maybe<Scalars['JSON']>;
  metricMetaData?: Maybe<MetricMetaData>;
};

export type ChartVizParams = {
  config?: InputMaybe<Array<InputMaybe<AxisConfigInput>>>;
};

export enum ChartVizPropVersion {
  V2 = 'V2',
  V2Dot1 = 'V2DOT1',
  V3 = 'V3',
  V4 = 'V4',
  V4Dot1 = 'V4DOT1',
  V4Dot2 = 'V4DOT2'
}

export type ChartVizProps = {
  __typename?: 'ChartVizProps';
  axisProperties?: Maybe<Array<Maybe<AxisObj>>>;
  chartProperties?: Maybe<ChartProperties>;
  columnProperties?: Maybe<Array<Maybe<ChartColumnPropertyMap>>>;
  customColorSelectorArray?: Maybe<Array<Maybe<Scalars['String']>>>;
  multiColorSeriesColors?: Maybe<Array<Maybe<MultiSeriesColorMap>>>;
  seriesColors?: Maybe<Array<Maybe<SeriesColor>>>;
  systemMultiColorSeriesColors?: Maybe<Array<Maybe<MultiSeriesColorMap>>>;
  systemSeriesColors?: Maybe<Array<Maybe<SeriesColor>>>;
  tooltipConfig?: Maybe<TooltipConfig>;
  version?: Maybe<ChartVizPropVersion>;
};

export enum ClientAction {
  ChangeVisualConfiguration = 'CHANGE_VISUAL_CONFIGURATION',
  HighlightFilters = 'HIGHLIGHT_FILTERS',
  HighlightTable = 'HIGHLIGHT_TABLE',
  SeeResults = 'SEE_RESULTS'
}

export type ClientActionList = {
  __typename?: 'ClientActionList';
  actionMessage?: Maybe<Scalars['String']>;
  clientAction?: Maybe<ClientAction>;
};

export type ClientState = {
  __typename?: 'ClientState';
  /** Color assigned to the tag */
  color?: Maybe<Scalars['String']>;
};

export type Cluster = {
  __typename?: 'Cluster';
  id: Scalars['String'];
  tiles: Array<ClusterTile>;
  title?: Maybe<Scalars['String']>;
};

export type ClusterOrSingleTile = Cluster | SingleTile;

export type ClusterTile = {
  __typename?: 'ClusterTile';
  answerId: Scalars['String'];
  feedbackId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  insightAnalysisDetails?: Maybe<InsightAnalysisDetails>;
  insightFeedbackQuestionnaire?: Maybe<Array<Maybe<InsightFeedbackQuestion>>>;
  isLiked?: Maybe<Scalars['Boolean']>;
};

export type CohortConfig = {
  __typename?: 'CohortConfig';
  anchorColumnId: Scalars['String'];
  otherGroupName?: Maybe<Scalars['String']>;
  returnColumnId: Scalars['String'];
};

/** Color */
export type Color = {
  color?: InputMaybe<Scalars['String']>;
};

/** A type that describes a column in SelectedSources */
export type Column = {
  __typename?: 'Column';
  /** The column's author id */
  author?: Maybe<Scalars['String']>;
  /** The column's author display name */
  authorDisplayName?: Maybe<Scalars['String']>;
  catalogInfo?: Maybe<CatalogInfo>;
  /** If this column is a cohort, then the underlying answer's ID will be provided here */
  cohortAnswerId?: Maybe<Scalars['String']>;
  /** Check for the completion of the column */
  complete?: Maybe<Scalars['Boolean']>;
  /** The column's creation time */
  created?: Maybe<Scalars['Float']>;
  /** Contains list of data that will be used in viz for sorting */
  customOrder?: Maybe<Array<Scalars['String']>>;
  /** The column's data recency */
  dataRecency?: Maybe<Scalars['Int']>;
  /** The column's data type */
  dataType: Scalars['String'];
  /** The column's database stripe */
  databaseStripe?: Maybe<Scalars['String']>;
  /** The column's default aggr. type */
  defaultAggrType?: Maybe<Scalars['String']>;
  /** Description for Column */
  description?: Maybe<Scalars['String']>;
  /** The column's entity category */
  entityCategory?: Maybe<Scalars['String']>;
  /** The column's id */
  id: Scalars['GUID'];
  /** The column's index priority */
  indexPriority?: Maybe<Scalars['Int']>;
  /** The column's index type */
  indexType?: Maybe<Scalars['String']>;
  /** Check if the column is additive */
  isAdditive?: Maybe<Scalars['Boolean']>;
  /** Check if column is derived */
  isDerived?: Maybe<Scalars['Boolean']>;
  /** Check if the column is the primary key */
  isPrimaryKey?: Maybe<Scalars['Boolean']>;
  /** The column's modification time */
  modified?: Maybe<Scalars['Float']>;
  /** The column's modifier id */
  modifiedBy?: Maybe<Scalars['String']>;
  /** The column's name */
  name: Scalars['String'];
  /** The column's owner id */
  owner: Scalars['String'];
  /** The column's owner name */
  ownerName: Scalars['String'];
  /** The column's owner type */
  ownerType?: Maybe<Scalars['String']>;
  /** The column's physical name */
  physicalColumnName?: Maybe<Scalars['String']>;
  /** The column's precision */
  precision?: Maybe<Scalars['Int']>;
  /** The column's schema */
  schemaStripe?: Maybe<Scalars['String']>;
  /** Details about the underlying data source of the column */
  sources?: Maybe<Array<ColumnSourceInfo>>;
  /** The column's spotiq preference */
  spotiqPreference?: Maybe<Scalars['String']>;
  /** Synonyms */
  synonyms?: Maybe<Array<Scalars['String']>>;
  /** The column's type */
  type: Scalars['String'];
};

/**  Generated from tsProto.atlas.AggregationType.E  */
export enum ColumnAggregationType {
  Aggregate = 'AGGREGATE',
  AggregateDistinct = 'AGGREGATE_DISTINCT',
  ApproxAggrDistinct = 'APPROX_AGGR_DISTINCT',
  ApproxAggrDistinctMerge = 'APPROX_AGGR_DISTINCT_MERGE',
  ApproxCountDistinct = 'APPROX_COUNT_DISTINCT',
  Average = 'AVERAGE',
  Count = 'COUNT',
  CountDistinct = 'COUNT_DISTINCT',
  CumulativeAverage = 'CUMULATIVE_AVERAGE',
  CumulativeCount = 'CUMULATIVE_COUNT',
  CumulativeMax = 'CUMULATIVE_MAX',
  CumulativeMin = 'CUMULATIVE_MIN',
  CumulativeSum = 'CUMULATIVE_SUM',
  Growth = 'GROWTH',
  Max = 'MAX',
  Median = 'MEDIAN',
  Min = 'MIN',
  MovingAverage = 'MOVING_AVERAGE',
  MovingCount = 'MOVING_COUNT',
  MovingMax = 'MOVING_MAX',
  MovingMin = 'MOVING_MIN',
  MovingSum = 'MOVING_SUM',
  None = 'NONE',
  Percentile = 'PERCENTILE',
  Rank = 'RANK',
  RankPercentile = 'RANK_PERCENTILE',
  SqlBoolAggregateOp = 'SQL_BOOL_AGGREGATE_OP',
  SqlDateAggregateOp = 'SQL_DATE_AGGREGATE_OP',
  SqlDateTimeAggregateOp = 'SQL_DATE_TIME_AGGREGATE_OP',
  SqlDoubleAggregateOp = 'SQL_DOUBLE_AGGREGATE_OP',
  SqlIntAggregateOp = 'SQL_INT_AGGREGATE_OP',
  SqlStringAggregateOp = 'SQL_STRING_AGGREGATE_OP',
  SqlTimeAggregateOp = 'SQL_TIME_AGGREGATE_OP',
  StdDeviation = 'STD_DEVIATION',
  Sum = 'SUM',
  TableAggr = 'TABLE_AGGR',
  Variance = 'VARIANCE'
}

export type ColumnBinding = {
  columnName?: InputMaybe<Scalars['String']>;
  sageOutputColumnId?: InputMaybe<Scalars['String']>;
  variableName?: InputMaybe<Scalars['String']>;
};

export type ColumnBindingOutput = {
  __typename?: 'ColumnBindingOutput';
  columnName?: Maybe<Scalars['String']>;
  sageOutputColumnId?: Maybe<Scalars['String']>;
  variableName?: Maybe<Scalars['String']>;
};

export type ColumnConditionalFormatConfig = {
  __typename?: 'ColumnConditionalFormatConfig';
  row?: Maybe<Array<ConditionalFormatRow>>;
};

export enum ColumnDataTypeEnum {
  Bool = 'BOOL',
  Char = 'CHAR',
  Date = 'DATE',
  DateNum = 'DATE_NUM',
  DateNumAbsDay = 'DATE_NUM_ABS_DAY',
  DateNumAbsHour = 'DATE_NUM_ABS_HOUR',
  DateNumAbsMonth = 'DATE_NUM_ABS_MONTH',
  DateNumAbsQuarter = 'DATE_NUM_ABS_QUARTER',
  DateNumAbsWeek = 'DATE_NUM_ABS_WEEK',
  DateNumAbsYear = 'DATE_NUM_ABS_YEAR',
  DateNumDayInMonth = 'DATE_NUM_DAY_IN_MONTH',
  DateNumDayInQuarter = 'DATE_NUM_DAY_IN_QUARTER',
  DateNumDayInYear = 'DATE_NUM_DAY_IN_YEAR',
  DateNumDayOfWeek = 'DATE_NUM_DAY_OF_WEEK',
  DateNumDayOfWeekStr = 'DATE_NUM_DAY_OF_WEEK_STR',
  DateNumHourInDay = 'DATE_NUM_HOUR_IN_DAY',
  DateNumMonthInQuarter = 'DATE_NUM_MONTH_IN_QUARTER',
  DateNumMonthInYear = 'DATE_NUM_MONTH_IN_YEAR',
  DateNumQuarterInYear = 'DATE_NUM_QUARTER_IN_YEAR',
  DateNumSecInDay = 'DATE_NUM_SEC_IN_DAY',
  DateNumWeekInMonth = 'DATE_NUM_WEEK_IN_MONTH',
  DateNumWeekInQuarter = 'DATE_NUM_WEEK_IN_QUARTER',
  DateNumWeekInYear = 'DATE_NUM_WEEK_IN_YEAR',
  DateTime = 'DATE_TIME',
  Double = 'DOUBLE',
  Float = 'FLOAT',
  Int32 = 'INT32',
  Int64 = 'INT64',
  Time = 'TIME',
  Unknown = 'UNKNOWN',
  Varchar = 'VARCHAR'
}

/** Information about an individual data column (eg Revenue in LINEORDER) */
export type ColumnInfo = {
  __typename?: 'ColumnInfo';
  columnGuid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ColumnLineage = {
  __typename?: 'ColumnLineage';
  columnId?: Maybe<SageEntityHeader>;
  tableId?: Maybe<SageEntityHeader>;
};

export type ColumnMap = {
  __typename?: 'ColumnMap';
  /** Column data types */
  columnType: ColumnType;
  /** Column values */
  columnValues: Array<Maybe<Metadata>>;
};

export enum ColumnProperty {
  GrowthDimension = 'GROWTH_DIMENSION',
  IsFormula = 'IS_FORMULA',
  IsGrouping = 'IS_GROUPING',
  IsOutput = 'IS_OUTPUT',
  SortAscending = 'SORT_ASCENDING',
  SortDescending = 'SORT_DESCENDING'
}

export type ColumnRepresentation = {
  __typename?: 'ColumnRepresentation';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  table?: Maybe<TableRepresentation>;
};

export type ColumnSampleValues = {
  __typename?: 'ColumnSampleValues';
  columnSampleValue?: Maybe<Array<SampleValue>>;
};

/**  Generated from tsProto.callosum.VizPropProto.ColumnSortConfigOptions  */
export enum ColumnSortConfigOptions {
  Custom = 'CUSTOM',
  Default = 'DEFAULT'
}

export type ColumnSortInfo = {
  __typename?: 'ColumnSortInfo';
  columnId?: Maybe<Scalars['String']>;
  isUserSorted?: Maybe<Scalars['Boolean']>;
  order?: Maybe<Scalars['Int']>;
  sortAscending?: Maybe<Scalars['Boolean']>;
};

export type ColumnSortInfoInput = {
  key?: InputMaybe<Scalars['String']>;
  sortDescending?: InputMaybe<Scalars['Boolean']>;
};

/**
 * Details about the underlying data source of the column. i.e. Source table name, Source column name
 * (Source column name in the table may be different from
 * the column name in worksheet, view which are usually cleaned up for consumption)
 */
export type ColumnSourceInfo = {
  __typename?: 'ColumnSourceInfo';
  columnId?: Maybe<Scalars['String']>;
  columnName?: Maybe<Scalars['String']>;
  tableId?: Maybe<Scalars['String']>;
  tableName?: Maybe<Scalars['String']>;
};

export type ColumnTable = {
  databaseName?: InputMaybe<Scalars['String']>;
  schemaName?: InputMaybe<Scalars['String']>;
  tableName?: InputMaybe<Scalars['String']>;
};

export enum ColumnTimeBucket {
  Auto = 'AUTO',
  Daily = 'DAILY',
  DayOfMonth = 'DAY_OF_MONTH',
  DayOfQuarter = 'DAY_OF_QUARTER',
  DayOfWeek = 'DAY_OF_WEEK',
  DayOfYear = 'DAY_OF_YEAR',
  Hourly = 'HOURLY',
  HourOfDay = 'HOUR_OF_DAY',
  Monthly = 'MONTHLY',
  MonthOfQuarter = 'MONTH_OF_QUARTER',
  MonthOfYear = 'MONTH_OF_YEAR',
  NoBucket = 'NO_BUCKET',
  Quarterly = 'QUARTERLY',
  QuarterOfYear = 'QUARTER_OF_YEAR',
  Weekly = 'WEEKLY',
  WeekOfMonth = 'WEEK_OF_MONTH',
  WeekOfQuarter = 'WEEK_OF_QUARTER',
  WeekOfYear = 'WEEK_OF_YEAR',
  Yearly = 'YEARLY'
}

export enum ColumnType {
  Attribute = 'ATTRIBUTE',
  Date = 'DATE',
  Measure = 'MEASURE'
}

/** -------------- DateFilterConfig -------------- */
export enum ColumnValueType {
  Bool = 'BOOL',
  Char = 'CHAR',
  Date = 'DATE',
  Double = 'DOUBLE',
  Int = 'INT',
  Unknown = 'UNKNOWN'
}

export type ColumnsInput = {
  /** Datatype of the column */
  dataType: Scalars['String'];
  /** Name of the column */
  name: Scalars['String'];
};

export type CommunicationConnectionResponse = {
  __typename?: 'CommunicationConnectionResponse';
  createdAt: Scalars['Long'];
  id?: Maybe<Scalars['String']>;
  redirectUrl?: Maybe<Scalars['String']>;
  type: CommunicationConnectionType;
};

export enum CommunicationConnectionType {
  Slack = 'slack'
}

export type Comparator = {
  __typename?: 'Comparator';
  percent?: Maybe<ThresholdPercentageChangeComparator>;
  simple?: Maybe<ThresholdComparator>;
};

export type ComparatorInput = {
  percent?: InputMaybe<ThresholdPercentageChangeComparator>;
  simple?: InputMaybe<ThresholdComparator>;
};

export type Completion = {
  __typename?: 'Completion';
  completesCurrentPhrase: Scalars['Boolean'];
  isHistory: Scalars['Boolean'];
  isSynonym: Scalars['Boolean'];
  nPrefixTokens: Scalars['Int'];
  nSuffixTokens: Scalars['Int'];
  startsNewPhrase: Scalars['Boolean'];
  tokens: Array<RecognizedToken>;
  type: QueryCompletionType;
};

export type CompletionInfo = {
  __typename?: 'CompletionInfo';
  completions?: Maybe<Array<Completion>>;
};

export type ComponentsFilterParamsInput = {
  /** Sets the number of records to fetch for pagination */
  batchSize?: InputMaybe<Scalars['Float']>;
  /** Sets the next page to fetch */
  offset?: InputMaybe<Scalars['Float']>;
  /**
   * Takes the column name in which you want to sort
   * Valid values - NAME, TYPE
   */
  sort?: InputMaybe<Scalars['String']>;
  /** Sets the components list sorting order */
  sortAscending?: InputMaybe<Scalars['Boolean']>;
  /** Takes array of Tag Names */
  tagName?: InputMaybe<Array<Scalars['String']>>;
  /**
   * Takes the component type to filter
   * Valid values - ALL, TABLE, WORKSHEET, PINBOARD, CONNECTION
   */
  type?: InputMaybe<Scalars['String']>;
};

export type Condition = {
  __typename?: 'Condition';
  operandOne?: Maybe<Array<Maybe<Scalars['Float']>>>;
  operator?: Maybe<Comparator>;
};

export type ConditionSpecInput = {
  operandOne?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  operator?: InputMaybe<ComparatorInput>;
};

export type ConditionalFormatRow = {
  __typename?: 'ConditionalFormatRow';
  color?: Maybe<Scalars['String']>;
  plotAsBand?: Maybe<Scalars['Boolean']>;
  range?: Maybe<ConditionalFormatRowRange>;
};

export type ConditionalFormatRowRange = {
  __typename?: 'ConditionalFormatRowRange';
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
};

export type ConditionalFormatting = {
  __typename?: 'ConditionalFormatting';
  rows?: Maybe<Array<Maybe<ConditionalMetric>>>;
};

export type ConditionalMetric = {
  __typename?: 'ConditionalMetric';
  backgroundFormatType?: Maybe<BackgroundFormatTypes>;
  fontProperties?: Maybe<FontAttrs>;
  gradientBackgroundAttrs?: Maybe<GradientBackgroundAttrs>;
  operator?: Maybe<Operators>;
  plotAsBand?: Maybe<Scalars['Boolean']>;
  rangeValues?: Maybe<Range>;
  solidBackgroundAttrs?: Maybe<SolidBackgroundAttrs>;
  value?: Maybe<Scalars['String']>;
};

export type Config_Data = {
  __typename?: 'Config_Data';
  clientId?: Maybe<Scalars['String']>;
  externalAuth?: Maybe<Scalars['Boolean']>;
};

export type Config_Response = {
  __typename?: 'Config_Response';
  Data?: Maybe<Config_Data>;
  Status?: Maybe<Scalars['String']>;
};

export type ConfigureDataUploadInputType = {
  database: Scalars['String'];
  enableDataUpload: Scalars['Boolean'];
  id: Scalars['GUID'];
  isDefaultDataSource: Scalars['Boolean'];
  schema: Scalars['String'];
};

export type ConnectionColumn = {
  __typename?: 'ConnectionColumn';
  /** List of columns in the table */
  column?: Maybe<Array<Maybe<TableColumns>>>;
  /** Name of the table */
  name?: Maybe<Scalars['String']>;
  /** Type of the Table */
  type?: Maybe<Scalars['String']>;
};

export type ConnectionColumnsShema = {
  __typename?: 'ConnectionColumnsShema';
  /** List of columns in the table */
  columns?: Maybe<Array<Maybe<TableColumns>>>;
  /** Name of the database */
  dbName?: Maybe<Scalars['String']>;
  /** Name of the table */
  name?: Maybe<Scalars['String']>;
  /** Name of the schema */
  schemaName?: Maybe<Scalars['String']>;
};

export enum ConnectionConfigType {
  RdbmsAmazonAthena = 'RDBMS_AMAZON_ATHENA',
  RdbmsAmazonAuroraMysql = 'RDBMS_AMAZON_AURORA_MYSQL',
  RdbmsAmazonAuroraPostgresql = 'RDBMS_AMAZON_AURORA_POSTGRESQL',
  RdbmsAmazonRdsMysql = 'RDBMS_AMAZON_RDS_MYSQL',
  RdbmsAmazonRdsPostgresql = 'RDBMS_AMAZON_RDS_POSTGRESQL',
  RdbmsAzureSqlDatawarehouse = 'RDBMS_AZURE_SQL_DATAWAREHOUSE',
  RdbmsDatabricks = 'RDBMS_DATABRICKS',
  RdbmsDenodo = 'RDBMS_DENODO',
  RdbmsDremio = 'RDBMS_DREMIO',
  RdbmsDrSum = 'RDBMS_DR_SUM',
  RdbmsFalcon = 'RDBMS_FALCON',
  RdbmsGcpBigquery = 'RDBMS_GCP_BIGQUERY',
  RdbmsGenericJdbc = 'RDBMS_GENERIC_JDBC',
  RdbmsLooker = 'RDBMS_LOOKER',
  RdbmsLookerMl = 'RDBMS_LOOKER_ML',
  RdbmsMysql = 'RDBMS_MYSQL',
  RdbmsOracleAdw = 'RDBMS_ORACLE_ADW',
  RdbmsPostgres = 'RDBMS_POSTGRES',
  RdbmsPresto = 'RDBMS_PRESTO',
  RdbmsPrestoJdbc = 'RDBMS_PRESTO_JDBC',
  RdbmsRedshift = 'RDBMS_REDSHIFT',
  RdbmsSapHana = 'RDBMS_SAP_HANA',
  RdbmsSinglestore = 'RDBMS_SINGLESTORE',
  RdbmsSnowflake = 'RDBMS_SNOWFLAKE',
  RdbmsSqlserver = 'RDBMS_SQLSERVER',
  RdbmsTeradata = 'RDBMS_TERADATA',
  RdbmsTrino = 'RDBMS_TRINO'
}

export type ConnectionDatabaseType = {
  __typename?: 'ConnectionDatabaseType';
  /** Name of the database */
  name?: Maybe<Scalars['String']>;
  /** List of schemas */
  schema?: Maybe<Array<Maybe<ConnectionTableSchema>>>;
};

export type ConnectionMetadata = {
  __typename?: 'ConnectionMetadata';
  authenticationType?: Maybe<Scalars['String']>;
  canUserEdit?: Maybe<Scalars['Boolean']>;
  connectionMetaData?: Maybe<Metadata>;
  tables: Array<Maybe<EmbraceTable>>;
  type?: Maybe<Scalars['String']>;
};

export enum ConnectionRelationType {
  /** User who can view any connection */
  Administrator = 'ADMINISTRATOR',
  /** User who created the connection */
  ConnectionOwner = 'CONNECTION_OWNER',
  /** User with whom connection was shared */
  SharedWithCurrentUser = 'SHARED_WITH_CURRENT_USER'
}

export type ConnectionResponse = {
  __typename?: 'ConnectionResponse';
  /** Author of the connection */
  author?: Maybe<UserNameAndId>;
  /** Indicates if the all the properties of connection is provided */
  complete?: Maybe<Scalars['Boolean']>;
  /** Configuration properties of the connection */
  configuration?: Maybe<Scalars['String']>;
  connectionType?: Maybe<Scalars['String']>;
  /** Date and time when the connection was created */
  created?: Maybe<Scalars['String']>;
  /** Description associated with the connection */
  description?: Maybe<Scalars['String']>;
  generationNum?: Maybe<Scalars['Float']>;
  /** GUID of the connection */
  id?: Maybe<Scalars['String']>;
  indexVersion?: Maybe<Scalars['Float']>;
  /** Indicates if the connection is deleted */
  isDeleted?: Maybe<Scalars['Boolean']>;
  /** Indicates if the connection is deprecated */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  isExternal?: Maybe<Scalars['Boolean']>;
  /** Indicates if the connection is hideen */
  isHidden?: Maybe<Scalars['Boolean']>;
  /** Date and time of last modification of the connection */
  modified?: Maybe<Scalars['String']>;
  /** The user which last modified the connection details */
  modifiedBy?: Maybe<UserNameAndId>;
  /** Name of the connection */
  name?: Maybe<Scalars['String']>;
  /** The owner of the connection */
  owner?: Maybe<UserNameAndId>;
  /** Indicates if the data sync is scheduled for this connection */
  scheduled?: Maybe<Scalars['Boolean']>;
  /** List of tables linked to this connection */
  tables?: Maybe<Array<Maybe<TableList>>>;
  /** List of tags assigned to the connection */
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Type of the connection. The database associated with this type can be obtained from the response returned by the /tspublic/rest/v2/connection/types API endpoint. */
  type?: Maybe<Scalars['String']>;
};

export type ConnectionTableColumnsInput = {
  /** Name of the database */
  dbName: Scalars['String'];
  /** Name of the table */
  name: Scalars['String'];
  /** Name of the schema */
  schemaName: Scalars['String'];
};

export type ConnectionTableColumnsResponse = {
  __typename?: 'ConnectionTableColumnsResponse';
  /** Connection id */
  id?: Maybe<Scalars['String']>;
  /** List of table details */
  table?: Maybe<Array<Maybe<ConnectionColumnsShema>>>;
};

export type ConnectionTableDetails = {
  __typename?: 'ConnectionTableDetails';
  count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['GUID']>;
};

export type ConnectionTableResponse = {
  __typename?: 'ConnectionTableResponse';
  /** List of databases */
  database?: Maybe<Array<Maybe<ConnectionDatabaseType>>>;
  /** Connection id */
  id?: Maybe<Scalars['String']>;
};

export type ConnectionTableSchema = {
  __typename?: 'ConnectionTableSchema';
  /** Name of the schema */
  name?: Maybe<Scalars['String']>;
  /** List of table details */
  table?: Maybe<Array<Maybe<ConnectionColumn>>>;
};

export type ConnectionType = {
  __typename?: 'ConnectionType';
  beta?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  mode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export enum ConnectionTypeEnum {
  DataSource = 'DATA_SOURCE',
  LogicalColumn = 'LOGICAL_COLUMN',
  LogicalTable = 'LOGICAL_TABLE'
}

export type ConnectorBlock = {
  __typename?: 'ConnectorBlock';
  app_guid: Scalars['String'];
  connector_type: ConnectorType;
  description?: Maybe<Scalars['String']>;
  documentation_link?: Maybe<Scalars['String']>;
  enabled_flag: Scalars['String'];
  icon_path?: Maybe<Array<Maybe<Scalars['Int']>>>;
  name: Scalars['String'];
  service_type: Scalars['String'];
  source_tables?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  user_guid?: Maybe<Scalars['GUID']>;
};

export type ConnectorDestination = {
  __typename?: 'ConnectorDestination';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ConnectorTableMappingInput = {
  apiKey: Scalars['String'];
  apiSecret: Scalars['String'];
  appGuid: Scalars['String'];
  connectorId: Scalars['String'];
  connectorType: ConnectorType;
  destination: Scalars['String'];
  redirectURI: Scalars['String'];
  schema: Scalars['String'];
  serviceType: Scalars['String'];
  status: Scalars['String'];
  syncFrequency: Scalars['Int'];
  userGuid: Scalars['String'];
};

export enum ConnectorType {
  Airbyte = 'AIRBYTE',
  Fivetran = 'FIVETRAN',
  Matillion = 'MATILLION'
}

export type ConstrainedContext = {
  /** ColumnIds to ignore in search completions */
  avoidTokens?: InputMaybe<Array<AvoidTokens>>;
  /** Used to only fetch suggestion of the type as this column */
  columnGuid?: InputMaybe<Scalars['String']>;
  explorationType: ExplorationType;
  /** Is aggregation applied to selected column */
  isAggregated?: InputMaybe<Scalars['Boolean']>;
  /** Is selected column a dateBucket column */
  isDateBucket?: InputMaybe<Scalars['Boolean']>;
};

export type ConstrainedSearchResponse = {
  __typename?: 'ConstrainedSearchResponse';
  /** List of phrases in the query */
  completions: CompletionInfo;
  /** Does more completions exist for the query */
  hasMore?: Maybe<Scalars['Boolean']>;
  /** Autocomplete session information */
  id: AcSession;
};

export type Container = {
  __typename?: 'Container';
  dataSourceIds?: Maybe<Array<Maybe<Scalars['GUID']>>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['GUID'];
  name?: Maybe<Scalars['String']>;
  noteTile?: Maybe<PinboardNoteTileContent>;
  refVizId?: Maybe<Scalars['GUID']>;
  referencedVizType?: Maybe<Scalars['Int']>;
  type?: Maybe<PinboardContainerType>;
};

export type ContainerLayout = {
  __typename?: 'ContainerLayout';
  height: Scalars['Int'];
  id: Scalars['GUID'];
  width: Scalars['Int'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type ContainerLayoutInput = {
  height: Scalars['Int'];
  id: Scalars['GUID'];
  width: Scalars['Int'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type Content = {
  script: Scalars['String'];
};

export type ContextBook = {
  __typename?: 'ContextBook';
  answerEditSession: AnswerEditSession;
  contextBookId: Scalars['GUID'];
};

export type ContextBookResponse = {
  __typename?: 'ContextBookResponse';
  contextBook?: Maybe<ContextBook>;
  id: BachPinboardSession;
};

export type ContextBookSession = {
  __typename?: 'ContextBookSession';
  contextBookId: Scalars['GUID'];
  sessionId?: Maybe<BachSessionId>;
};

export type ContextBookSessionInput = {
  contextBookId: Scalars['GUID'];
  sessionId?: InputMaybe<BachSessionIdInput>;
};

export type CopiedPinboard = {
  __typename?: 'CopiedPinboard';
  id?: Maybe<Scalars['GUID']>;
};

export type CortexCacheRequest = {
  cacheToken: CortexCacheToken;
};

export type CortexCacheResponse = {
  __typename?: 'CortexCacheResponse';
  cacheHit: Scalars['Boolean'];
  tokenValid: Scalars['Boolean'];
};

export type CortexCacheToken = {
  datasetHash: Scalars['String'];
  deadlineEpochSec: Scalars['String'];
};

export type CreateCatalogConnectionInput = {
  credentials?: InputMaybe<AuthCredentials>;
  metadata?: InputMaybe<Array<CatalogMetaData>>;
  schedule: ScheduleOption;
  type: Scalars['String'];
};

export type CreateCatalogConnectionResult = {
  __typename?: 'CreateCatalogConnectionResult';
  connection_id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type CreateConfigInput = {
  /** Access token corresponding to the user to authenticate connection to remote repository */
  accessToken: Scalars['String'];
  /** List the remote branches to configure. Example:[development, production] */
  branchNames?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Name of the default remote branch */
  defaultBranchName?: InputMaybe<Scalars['String']>;
  /** Maintain mapping of guid for the deployment to an instance */
  enableGuidMapping?: InputMaybe<Scalars['Boolean']>;
  /** Name of the branch where file containing guid mapping should be maintained */
  guidMappingBranchName?: InputMaybe<Scalars['String']>;
  /** Unique identifier of the organization. If no value is provided then user will be created in the organization associated with the login session. Provide value -1 for cluster level. Example : OrgID1-or-Name1 */
  orgIdentifier?: InputMaybe<Scalars['String']>;
  /** URL for connecting to remote repository */
  repositoryUrl: Scalars['String'];
  /** Username to authenticate connection to remote repository */
  username: Scalars['String'];
};

export type CreateConnectionMetadata = {
  authenticationType?: InputMaybe<Scalars['String']>;
  configuration?: InputMaybe<Scalars['JSON']>;
  externalDatabases?: InputMaybe<Array<InputMaybe<ExternalDatabases>>>;
  selectedColumns?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  selectedTables?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tables?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CreateConnectionResponse = {
  __typename?: 'CreateConnectionResponse';
  /** Author of user account */
  author?: Maybe<UserNameAndId>;
  /** Indicates if the all the properties of connection is provided */
  complete?: Maybe<Scalars['Boolean']>;
  /** Configuration properties of the connection */
  configuration?: Maybe<Scalars['String']>;
  connectionType?: Maybe<Scalars['String']>;
  /** Date and time when user account was created */
  created?: Maybe<Scalars['String']>;
  /** Description associated with the connection */
  description?: Maybe<Scalars['String']>;
  generationNum?: Maybe<Scalars['Float']>;
  /** GUID of the connection */
  id?: Maybe<Scalars['String']>;
  indexVersion?: Maybe<Scalars['Float']>;
  /** Indicates if the connection is deleted */
  isDeleted?: Maybe<Scalars['Boolean']>;
  /** Indicates if the connection is deprecated */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  isExternal?: Maybe<Scalars['Boolean']>;
  /** Indicates if the connection is hideen */
  isHidden?: Maybe<Scalars['Boolean']>;
  /** Date and time of last modification of user account */
  modified?: Maybe<Scalars['String']>;
  /** The user which last modified the user account details */
  modifiedBy?: Maybe<UserNameAndId>;
  /** Name of the connection */
  name?: Maybe<Scalars['String']>;
  /** The owner of the user account */
  owner?: Maybe<UserNameAndId>;
  /** Indicates if the data sync is scheduled for this connection */
  scheduled?: Maybe<Scalars['Boolean']>;
  /** List of tables linked to this connection and details of the columns in the table */
  tables?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** List of tags assigned to the connection */
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Type of the connection. The database associated with this type can be obtained from the response returned by the /tspublic/rest/v2/connection/types API endpoint. */
  type?: Maybe<Scalars['String']>;
};

export type CreateConnectorInput = {
  apiKey: Scalars['String'];
  apiSecret: Scalars['String'];
  appGuid: Scalars['String'];
  connectorType: ConnectorType;
  destination: Scalars['String'];
  redirectURI: Scalars['String'];
  schema: Scalars['String'];
  serviceType: Scalars['String'];
  syncFrequency: Scalars['Int'];
  userGuid: Scalars['String'];
};

export type CreateConnectorResponse = {
  __typename?: 'CreateConnectorResponse';
  authURL: Scalars['String'];
};

/** Create Group Input */
export type CreateGroupInput = {
  description?: InputMaybe<Scalars['String']>;
  displayname: Scalars['String'];
  name: Scalars['String'];
  privileges?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  visibility?: InputMaybe<PrincipalVisibilityType>;
};

export type CreatePipelineAndRunActionInfoInput = {
  actionId: Scalars['String'];
  objectId: Scalars['String'];
};

export type CreateRole_DataInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  privileges?: InputMaybe<Scalars['String']>;
};

export type CreateScheduleInput = {
  clientMessage?: InputMaybe<Scalars['String']>;
  cronExpression: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  scheduleType?: InputMaybe<ScheduleType>;
  targetType?: InputMaybe<ScheduleTargetType>;
  timeZone: Scalars['String'];
};

export type CreateScheduleResult = {
  __typename?: 'CreateScheduleResult';
  scheduleId?: Maybe<Scalars['String']>;
};

export type CreateSchemaJoinTransform = {
  join?: InputMaybe<JoinContent>;
  joinHeader?: InputMaybe<JoinHeader>;
};

export type CreateTableResponse = {
  __typename?: 'CreateTableResponse';
  logicalTableHeader?: Maybe<LogicalTableHeader>;
  physicalTableId?: Maybe<Scalars['String']>;
};

export type CreateUserDetails = {
  __typename?: 'CreateUserDetails';
  displayName?: Maybe<Scalars['String']>;
  error?: Maybe<CreateUserError>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CreateUserError = {
  __typename?: 'CreateUserError';
  code?: Maybe<Scalars['Int']>;
  debug?: Maybe<Array<Maybe<Scalars['String']>>>;
  errorMessage?: Maybe<Scalars['String']>;
};

/** Create User Input */
export type CreateUserInput = {
  displayname: Scalars['String'];
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name: Scalars['String'];
  password: Scalars['String'];
  properties: UserPropertiesInput;
  visibility: PrincipalVisibilityType;
};

export type CreateUserOrGroupDetails = {
  __typename?: 'CreateUserOrGroupDetails';
  displayName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CreateWorksheetTransform = {
  dataSourceId?: InputMaybe<Scalars['String']>;
};

export type CronFrequencySpec = {
  __typename?: 'CronFrequencySpec';
  dayOfMonth?: Maybe<Scalars['String']>;
  dayOfWeek?: Maybe<Scalars['String']>;
  hour?: Maybe<Scalars['String']>;
  minute?: Maybe<Scalars['String']>;
  month?: Maybe<Scalars['String']>;
  second?: Maybe<Scalars['String']>;
};

export type CronFrequencySpecInput = {
  dayOfMonth?: InputMaybe<Scalars['String']>;
  dayOfWeek?: InputMaybe<Scalars['String']>;
  hour?: InputMaybe<Scalars['String']>;
  minute?: InputMaybe<Scalars['String']>;
  month?: InputMaybe<Scalars['String']>;
  second?: InputMaybe<Scalars['String']>;
};

export type CronSchedule = {
  __typename?: 'CronSchedule';
  dayOfMonth: Scalars['String'];
  dayOfWeek: Scalars['String'];
  hour: Scalars['String'];
  minute: Scalars['String'];
  month: Scalars['String'];
  second: Scalars['String'];
};

export type CrossCorrelation = {
  algorithm?: InputMaybe<AnalysisAlgorithm>;
};

export type Csv_AccessibleTables = {
  __typename?: 'Csv_AccessibleTables';
  AGGR_WORKSHEET?: Maybe<Array<Csv_SourceDetails>>;
  ONE_TO_ONE_LOGICAL?: Maybe<Array<Csv_SourceDetails>>;
  USER_DEFINED?: Maybe<Array<Csv_SourceDetails>>;
  WORKSHEET?: Maybe<Array<Csv_SourceDetails>>;
};

export type Csv_ColumnInput = {
  dataType?: InputMaybe<Scalars['String']>;
  dateFormatStr?: InputMaybe<Scalars['String']>;
  logicalName?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
};

export type Csv_Columns = {
  __typename?: 'Csv_Columns';
  dataType?: Maybe<Scalars['String']>;
  dateFormatStr?: Maybe<Scalars['String']>;
  logicalName?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
};

export type Csv_CreateTablePayload = {
  forceload?: InputMaybe<Scalars['Boolean']>;
  schema: Csv_SchemaInput;
};

/** Response Format for CreateTable */
export type Csv_CreateTableResponse = {
  __typename?: 'Csv_CreateTableResponse';
  errors: Array<Maybe<Csv_FileErrors>>;
  schema?: Maybe<Csv_CreateTableSchema>;
  status?: Maybe<Scalars['Boolean']>;
};

/** A Type that describes the schema object received in response of CreateTable */
export type Csv_CreateTableSchema = {
  __typename?: 'Csv_CreateTableSchema';
  cacheToken: Scalars['String'];
  columns: Array<Maybe<Csv_Columns>>;
  userData?: Maybe<Csv_Header>;
};

export type Csv_FileErrors = {
  __typename?: 'Csv_FileErrors';
  errorCode: Scalars['String'];
  errorColumns?: Maybe<Array<Maybe<Scalars['Int']>>>;
  indexOrCount?: Maybe<Scalars['Int']>;
  message: Scalars['String'];
  row?: Maybe<Array<Maybe<Scalars['String']>>>;
  type: Scalars['String'];
};

/** Response Format for GetAccessibleTables */
export type Csv_GetAccessibleTablesResponse = {
  __typename?: 'Csv_GetAccessibleTablesResponse';
  tableDetailMapByType: Csv_AccessibleTables;
};

export type Csv_Header = {
  __typename?: 'Csv_Header';
  header?: Maybe<Csv_HeaderObject>;
};

export type Csv_HeaderObject = {
  __typename?: 'Csv_HeaderObject';
  id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
};

export type Csv_LoadDataPayload = {
  cacheguid: Scalars['String'];
  dropExistingData?: InputMaybe<Scalars['Boolean']>;
  forceload?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
};

export type Csv_LoadDataResponse = {
  __typename?: 'Csv_LoadDataResponse';
  errors: Array<Maybe<Csv_FileErrors>>;
  schema?: Maybe<Csv_LoadTableSchema>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Csv_LoadTableSchema = {
  __typename?: 'Csv_LoadTableSchema';
  columns: Array<Maybe<Csv_Columns>>;
  userData?: Maybe<Csv_Header>;
};

export type Csv_Metadata = {
  __typename?: 'Csv_Metadata';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['GUID']>;
  name: Scalars['String'];
};

/** Response Format for ReadKeys and ReadTableColumns */
export type Csv_ReadKeysAndColumnsResponse = {
  __typename?: 'Csv_ReadKeysAndColumnsResponse';
  errors: Array<Maybe<Csv_FileErrors>>;
  schema?: Maybe<Csv_Schema>;
  status?: Maybe<Scalars['Boolean']>;
};

/** A Type that describes the schema object */
export type Csv_Schema = {
  __typename?: 'Csv_Schema';
  cacheToken: Scalars['String'];
  columns: Array<Maybe<Csv_Columns>>;
  deduceDestination: Scalars['Boolean'];
  selectedDataSourceId?: Maybe<Scalars['String']>;
  tableName: Scalars['String'];
};

export type Csv_SchemaInput = {
  cacheToken: Scalars['String'];
  columns: Array<Csv_ColumnInput>;
  deduceDestination: Scalars['Boolean'];
  selectedDataSourceId?: InputMaybe<Scalars['String']>;
  tableName: Scalars['String'];
};

/** A type that describes a Source along with its metadata */
export type Csv_SourceDetails = {
  __typename?: 'Csv_SourceDetails';
  connectionGuid: Scalars['String'];
  connectionName: Scalars['String'];
  dataUploadEnabled: Scalars['Boolean'];
  databaseName?: Maybe<Scalars['String']>;
  header?: Maybe<Csv_Metadata>;
  schemaName: Scalars['String'];
};

export type CurrencyFormat = {
  __typename?: 'CurrencyFormat';
  column?: Maybe<Scalars['ID']>;
  isoCode?: Maybe<Scalars['String']>;
  type?: Maybe<CurrencyFormatType>;
};

export type CurrencyFormatConfig = {
  __typename?: 'CurrencyFormatConfig';
  /** default to 2 */
  decimals?: Maybe<Scalars['Float']>;
  locale?: Maybe<Scalars['String']>;
  /** default to false */
  removeTrailingZeroes?: Maybe<Scalars['Boolean']>;
  /** default to true */
  toSeparateThousands?: Maybe<Scalars['Boolean']>;
  /** default is MILLION */
  unit?: Maybe<Unit>;
};

export enum CurrencyFormatType {
  Column = 'COLUMN',
  IsoCode = 'ISO_CODE',
  UserLocale = 'USER_LOCALE'
}

export enum CurrentDataOptionsEnum {
  CurrentOnly = 'CURRENT_ONLY',
  Exclude = 'EXCLUDE',
  Include = 'INCLUDE'
}

export type CustomAnalysisConfigResponse = {
  __typename?: 'CustomAnalysisConfigResponse';
  a3Columns?: Maybe<Array<Maybe<A3Column>>>;
  encodedA3Request: Scalars['String'];
  id: Scalars['String'];
  originalAnalysisConfig?: Maybe<OriginalAnalysisConfig>;
};

export type CustomAnalysisParameters = {
  __typename?: 'CustomAnalysisParameters';
  corrCoeff?: Maybe<Scalars['Float']>;
  maxCorrCoeff?: Maybe<Scalars['Float']>;
  maxDiffElements?: Maybe<Scalars['Float']>;
  maxFraction?: Maybe<Scalars['Float']>;
  maxLag?: Maybe<Scalars['Float']>;
  minAbsChangeRatio?: Maybe<Scalars['Float']>;
  minChangeRatio?: Maybe<Scalars['Float']>;
  minRelativeDifference?: Maybe<Scalars['Float']>;
  minRows?: Maybe<Scalars['Float']>;
  multiplier?: Maybe<Scalars['Float']>;
  pValueThreshold?: Maybe<Scalars['Float']>;
};

export type CustomCalendarDetail = {
  __typename?: 'CustomCalendarDetail';
  authorName: Scalars['String'];
  calendarName: Scalars['String'];
  connectionName: Scalars['String'];
  dsId: Scalars['GUID'];
  modified: Scalars['Long'];
  tableId: Scalars['GUID'];
  type: Scalars['String'];
};

export type CustomCalendarDetailResponse = {
  __typename?: 'CustomCalendarDetailResponse';
  customCalendarDetailList: Array<CustomCalendarDetail>;
  isLastBatch: Scalars['Boolean'];
};

/** Params to be used to create calendar */
export type CustomCalendarParams = {
  calendarName: Scalars['String'];
  datasourceId?: InputMaybe<Scalars['String']>;
  endDate: Scalars['String'];
  externalTable: Scalars['String'];
  monthOffset?: InputMaybe<Scalars['Int']>;
  quarterNamePrefix?: InputMaybe<Scalars['String']>;
  shouldCreate: Scalars['Boolean'];
  startDate: Scalars['String'];
  startDayOfWeek?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
  yearNamePrefix?: InputMaybe<Scalars['String']>;
};

export type CustomChartConfig = {
  __typename?: 'CustomChartConfig';
  dimensions?: Maybe<Array<CustomChartDimension>>;
  key: Scalars['String'];
};

export type CustomChartConfigInput = {
  dimensions?: InputMaybe<Array<CustomChartDimensionInput>>;
  key: Scalars['String'];
};

export type CustomChartDimension = {
  __typename?: 'CustomChartDimension';
  columns?: Maybe<Array<Maybe<Scalars['String']>>>;
  key: Scalars['String'];
};

export type CustomChartDimensionInput = {
  columns?: InputMaybe<Array<Scalars['String']>>;
  key: Scalars['String'];
};

export type CustomChartManifest = {
  __typename?: 'CustomChartManifest';
  author?: Maybe<ChartAuthor>;
  created: Scalars['Long'];
  description?: Maybe<Scalars['String']>;
  iconUrl?: Maybe<Scalars['String']>;
  id: Scalars['GUID'];
  modified: Scalars['Long'];
  modifiedBy: Scalars['GUID'];
  modifiedByName: Scalars['String'];
  name: Scalars['String'];
  orgIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
  sourceUrl: Scalars['String'];
};

/** Color Sections */
export type CustomColors = {
  __typename?: 'CustomColors';
  appBackground?: Maybe<Scalars['String']>;
  appPanelColor?: Maybe<Scalars['String']>;
  disableColorRotation?: Maybe<Scalars['Boolean']>;
  primaryColors?: Maybe<Array<Maybe<Scalars['String']>>>;
  secondaryColors?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CustomFormatConfig = {
  __typename?: 'CustomFormatConfig';
  format?: Maybe<Scalars['String']>;
};

export type CustomRAnalysis = {
  columnBinding?: InputMaybe<Array<InputMaybe<ColumnBinding>>>;
  rOutputType?: InputMaybe<ROutputTypeEnum>;
  rScript?: InputMaybe<Scalars['String']>;
  rTemplateId?: InputMaybe<Scalars['String']>;
  unselectedSageOutputColumnId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type DsGoogleSheetObjectDetail = {
  __typename?: 'DSGoogleSheetObjectDetail';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type DsPipelineLogResult = {
  __typename?: 'DSPipelineLogResult';
  pipelineInstId: Scalars['String'];
  pipelineInstLogs: Scalars['String'];
};

export type Ds_CreatePipelineGainsightInput = {
  externalId?: InputMaybe<Scalars['String']>;
  mapToExternalId?: InputMaybe<Scalars['String']>;
  object?: InputMaybe<Ds_ObjectInput>;
  operation?: InputMaybe<DestinationOperationTypes>;
};

export type Ds_CreatePipelineHubspotInput = {
  externalId?: InputMaybe<Scalars['String']>;
  mapToExternalId?: InputMaybe<Scalars['String']>;
  object?: InputMaybe<Ds_ObjectInput>;
  operation?: InputMaybe<DestinationOperationTypes>;
};

export type Ds_CreatePipelineMailchimpInput = {
  externalId?: InputMaybe<Scalars['String']>;
  listId?: InputMaybe<Scalars['String']>;
  mapToExternalId?: InputMaybe<Scalars['String']>;
  object?: InputMaybe<Ds_ObjectInput>;
  operation?: InputMaybe<DestinationOperationTypes>;
};

export type Ds_CreatePipelineMsTeamsInput = {
  channel?: InputMaybe<Scalars['String']>;
  includeCSV?: InputMaybe<Scalars['Boolean']>;
  includePng?: InputMaybe<Scalars['Boolean']>;
  message?: InputMaybe<Scalars['String']>;
  team?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Ds_CreatePipelineSalesforceInput = {
  externalId?: InputMaybe<Scalars['String']>;
  mapToExternalId?: InputMaybe<Scalars['String']>;
  object?: InputMaybe<Ds_SalesforceObjectInput>;
  operation?: InputMaybe<SfdcOperationTypes>;
};

export type Ds_CreatePipelineServiceNowInput = {
  externalId?: InputMaybe<Scalars['String']>;
  mapToExternalId?: InputMaybe<Scalars['String']>;
  object?: InputMaybe<Ds_ObjectInput>;
  operation?: InputMaybe<DestinationOperationTypes>;
};

export type Ds_CreatePipelineSheetsInput = {
  cell?: InputMaybe<Scalars['String']>;
  sheet?: InputMaybe<Scalars['String']>;
  sheetId?: InputMaybe<Scalars['String']>;
  ssId?: InputMaybe<Scalars['String']>;
};

export type Ds_CreatePipelineSlackInput = {
  channel?: InputMaybe<Scalars['String']>;
  includeCSV?: InputMaybe<Scalars['Boolean']>;
  includePng?: InputMaybe<Scalars['Boolean']>;
  message?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Ds_CreatePipelineWebexInput = {
  includeCSV: Scalars['Boolean'];
  includePng: Scalars['Boolean'];
  message?: InputMaybe<Scalars['String']>;
  space: Scalars['String'];
  spaceName?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Ds_CreatePipelineZendeskInput = {
  externalId?: InputMaybe<Scalars['String']>;
  mapToExternalId?: InputMaybe<Scalars['String']>;
  object?: InputMaybe<Ds_ObjectInput>;
  operation?: InputMaybe<DestinationOperationTypes>;
};

export type Ds_CreatePipelineZohoInput = {
  externalId?: InputMaybe<Scalars['String']>;
  mapToExternalId?: InputMaybe<Scalars['String']>;
  object?: InputMaybe<Ds_ObjectInput>;
  operation?: InputMaybe<DestinationOperationTypes>;
};

export type Ds_MappingColumnsColumnInput = {
  dtype?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type Ds_MappingColumnsDestinationInput = {
  customField?: InputMaybe<Scalars['Boolean']>;
  digits?: InputMaybe<Scalars['Int']>;
  dtype?: InputMaybe<Scalars['String']>;
  length?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  scale?: InputMaybe<Scalars['Int']>;
};

export type Ds_MappingColumnsInput = {
  column?: InputMaybe<Ds_MappingColumnsColumnInput>;
  destination?: InputMaybe<Ds_MappingColumnsDestinationInput>;
};

export type Ds_MappingInput = {
  columns?: InputMaybe<Array<InputMaybe<Ds_MappingColumnsInput>>>;
};

export type Ds_ObjectInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type Ds_PipelineFilterListItem = {
  __typename?: 'DS_PipelineFilterListItem';
  id?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type Ds_PipelineFilterListResult = {
  __typename?: 'DS_PipelineFilterListResult';
  pipelines?: Maybe<Array<Maybe<Ds_PipelineFilterListItem>>>;
};

export type Ds_SalesforceObjectInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type Ds_ScheduleInput = {
  cronExpression?: InputMaybe<Scalars['String']>;
  scheduleFrequency?: InputMaybe<Scalars['String']>;
  scheduleId?: InputMaybe<Scalars['String']>;
  scheduleType?: InputMaybe<ScheduleType>;
  timezone?: InputMaybe<Scalars['String']>;
};

export type Ds__CreateDestinationInput = {
  /** Destination app type */
  destinationType?: InputMaybe<DestinationTypes>;
  details?: InputMaybe<Ds__RegistrationDetails>;
  /** Destination app name */
  name?: InputMaybe<Scalars['String']>;
  /** Callback url after the completion of Auth */
  redirectUrl?: InputMaybe<Scalars['String']>;
};

export type Ds__CreateDestinationResult = {
  __typename?: 'DS__CreateDestinationResult';
  /** Destination app auth url */
  destinationAuthUrl?: Maybe<Scalars['String']>;
};

export type Ds__DeleteDestinationInput = {
  /** destination Id */
  destinationId: Scalars['String'];
  /** type  of the destination */
  destinationType: Scalars['String'];
};

export type Ds__DeletePipelineResult = {
  __typename?: 'DS__DeletePipelineResult';
  code?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Ds__DestinationItemCompleteResult = {
  __typename?: 'DS__DestinationItemCompleteResult';
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  error_code?: Maybe<Scalars['String']>;
  error_msg?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedDate?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  pipelineCount?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<DestinationTypes>;
};

export type Ds__DestinationListCompleteInput = {
  batchSize?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  searchText?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Ds__DestinationListCompleteResult = {
  __typename?: 'DS__DestinationListCompleteResult';
  destinations?: Maybe<Array<Maybe<Ds__DestinationItemCompleteResult>>>;
  isLastBatch?: Maybe<Scalars['Boolean']>;
};

export type Ds__DestinationPropertiesInput = {
  destinationId?: InputMaybe<Scalars['String']>;
  destinationType?: InputMaybe<DestinationTypes>;
  gainsight?: InputMaybe<Ds_CreatePipelineGainsightInput>;
  hubspot?: InputMaybe<Ds_CreatePipelineHubspotInput>;
  mailchimp?: InputMaybe<Ds_CreatePipelineMailchimpInput>;
  mapping?: InputMaybe<Ds_MappingInput>;
  msteams?: InputMaybe<Ds_CreatePipelineMsTeamsInput>;
  salesforce?: InputMaybe<Ds_CreatePipelineSalesforceInput>;
  servicenow?: InputMaybe<Ds_CreatePipelineServiceNowInput>;
  sheets?: InputMaybe<Ds_CreatePipelineSheetsInput>;
  slack?: InputMaybe<Ds_CreatePipelineSlackInput>;
  webex?: InputMaybe<Ds_CreatePipelineWebexInput>;
  zendesk?: InputMaybe<Ds_CreatePipelineZendeskInput>;
  zoho?: InputMaybe<Ds_CreatePipelineZohoInput>;
};

export type Ds__DestinationSyncInput = {
  destinationProperties?: InputMaybe<Ds__DestinationPropertiesInput>;
  mapping?: InputMaybe<Ds_MappingInput>;
  pipeline?: InputMaybe<Ds__PipelineInput>;
  schedule?: InputMaybe<Ds_ScheduleInput>;
};

export type Ds__DestinationSyncPipelineAndRunResult = {
  __typename?: 'DS__DestinationSyncPipelineAndRunResult';
  message?: Maybe<Scalars['String']>;
  pipelineId?: Maybe<Scalars['String']>;
  scheduleId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Ds__GetOrCreateDestinationResult = {
  __typename?: 'DS__GetOrCreateDestinationResult';
  /** Destination auth url if destination doesn't exist */
  destinationAuthUrl?: Maybe<Scalars['String']>;
  /** Destination Id if exists */
  destinationId?: Maybe<Scalars['String']>;
};

export type Ds__PipelineInput = {
  pipelineId?: InputMaybe<Scalars['String']>;
  pipelineName?: InputMaybe<Scalars['String']>;
  scheduleId?: InputMaybe<Scalars['String']>;
  scheduleOps?: InputMaybe<ScheduleOps>;
  scheduledFlag?: InputMaybe<Scalars['String']>;
  sourceId?: InputMaybe<Scalars['String']>;
  sourceType?: InputMaybe<SyncSourceTypes>;
};

export type Ds__PipelineInstanceItemResult = {
  __typename?: 'DS__PipelineInstanceItemResult';
  endTime?: Maybe<Scalars['String']>;
  errorCode?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  failedRecords?: Maybe<Scalars['String']>;
  pipelineId?: Maybe<Scalars['String']>;
  pipelineInstId?: Maybe<Scalars['String']>;
  pipelineName?: Maybe<Scalars['String']>;
  runType?: Maybe<Scalars['String']>;
  scheduleId?: Maybe<Scalars['String']>;
  scheduleRunId?: Maybe<Scalars['String']>;
  sourceRecords?: Maybe<Scalars['String']>;
  sourceType?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  targetRecords?: Maybe<Scalars['String']>;
};

export type Ds__PipelineItemResult = {
  __typename?: 'DS__PipelineItemResult';
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['String']>;
  destinationId?: Maybe<Scalars['String']>;
  destinationName?: Maybe<Scalars['String']>;
  destinationType?: Maybe<DestinationTypes>;
  frequency?: Maybe<Scalars['String']>;
  lastSent?: Maybe<Scalars['String']>;
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedDate?: Maybe<Scalars['String']>;
  pipelineId?: Maybe<Scalars['String']>;
  pipelineInstStatus?: Maybe<Scalars['String']>;
  pipelineName?: Maybe<Scalars['String']>;
  runType?: Maybe<Scalars['String']>;
  scheduleId?: Maybe<Scalars['String']>;
  scheduledFlag?: Maybe<Scalars['String']>;
  sourceId?: Maybe<Scalars['String']>;
  sourceType?: Maybe<Scalars['String']>;
};

export type Ds__PipelineListBySourceIdInput = {
  batchSize?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  scheduledFlag?: InputMaybe<Scalars['Boolean']>;
  searchTxt?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sourceId?: InputMaybe<Scalars['String']>;
};

export type Ds__PipelineListInput = {
  batchSize?: InputMaybe<Scalars['Float']>;
  destinationId?: InputMaybe<Scalars['String']>;
  hasInstance?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Float']>;
  searchText?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sourceId?: InputMaybe<Scalars['String']>;
  userGuid?: InputMaybe<Scalars['String']>;
};

export type Ds__ReauthenticateDestinationInput = {
  details?: InputMaybe<Ds__RegistrationDetails>;
  name?: InputMaybe<Scalars['String']>;
  reauth_dest_id?: InputMaybe<Scalars['String']>;
  redirect_url?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<DestinationTypes>;
};

export type Ds__ReauthenticateDestinationResult = {
  __typename?: 'DS__ReauthenticateDestinationResult';
  destinationAuthUrl?: Maybe<Scalars['String']>;
};

export type Ds__RegistrationDetails = {
  apiKey?: InputMaybe<Scalars['String']>;
  clientId?: InputMaybe<Scalars['String']>;
  clientSecret?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  instanceUrl?: InputMaybe<Scalars['String']>;
};

export type Ds__TargetIntegrationItemResult = {
  __typename?: 'DS__TargetIntegrationItemResult';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<DestinationTypes>;
};

export type Ds__TargetIntegrationListResult = {
  __typename?: 'DS__TargetIntegrationListResult';
  destinations?: Maybe<Array<Maybe<Ds__TargetIntegrationItemResult>>>;
};

export type Ds__UpdateDestinationResult = {
  __typename?: 'DS__UpdateDestinationResult';
  code?: Maybe<Scalars['String']>;
  destination_id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Ds__GetDestinationTypesResult = {
  __typename?: 'DS__getDestinationTypesResult';
  code?: Maybe<Scalars['String']>;
  destination_type?: Maybe<Array<Maybe<DestinationType>>>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Ds__GetDestinationUsersTypeResult = {
  __typename?: 'DS__getDestinationUsersTypeResult';
  code?: Maybe<Scalars['String']>;
  destinations?: Maybe<Scalars['JSON']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Ds__PipelineInstanceListInput = {
  batchSize?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  pattern?: InputMaybe<Scalars['String']>;
  pipelineId?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
};

export type Ds_PipelineInstanceListResult = {
  __typename?: 'DS_pipelineInstanceListResult';
  isLastBatch?: Maybe<Scalars['Boolean']>;
  pipelineInstance?: Maybe<Array<Maybe<Ds__PipelineInstanceItemResult>>>;
};

export type Ds_PipelineListResult = {
  __typename?: 'DS_pipelineListResult';
  isLastBatch?: Maybe<Scalars['Boolean']>;
  pipelines?: Maybe<Array<Maybe<Ds__PipelineItemResult>>>;
};

export enum DataConnection {
  AmazonRedshift = 'AMAZON_REDSHIFT',
  AzureSynapse = 'AZURE_SYNAPSE',
  Databricks = 'DATABRICKS',
  Denodo = 'DENODO',
  Dremio = 'DREMIO',
  GoogleBigquery = 'GOOGLE_BIGQUERY',
  OracleAdw = 'ORACLE_ADW',
  SapHana = 'SAP_HANA',
  Snowflake = 'SNOWFLAKE',
  Starburst = 'STARBURST',
  Teradata = 'TERADATA'
}

export type DataObjectInfo = {
  __typename?: 'DataObjectInfo';
  connectionAuthor?: Maybe<Scalars['String']>;
  connectionName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  rowCount?: Maybe<Scalars['Int']>;
};

export type DataPaginationParamsInput = {
  /** Default batch size for data */
  defaultBatchSize?: InputMaybe<Scalars['Int']>;
  /** Default data size for high cardinality charts */
  defaultHighCardinalityDataSize?: InputMaybe<Scalars['Int']>;
  /** Default batch size for geo map charts */
  geoMapDataSize?: InputMaybe<Scalars['Int']>;
  isClientPaginated?: InputMaybe<Scalars['Boolean']>;
  offset?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  totalRowCount?: InputMaybe<Scalars['Int']>;
};

export type DataPoint = {
  anomalyDirection?: InputMaybe<AnomalyDirectionEnum>;
  attributeValue?: InputMaybe<FalconConstantValue>;
  measureValue?: InputMaybe<Scalars['Float']>;
};

export type DataQueryInput = {
  queries: Array<QueryInput>;
};

export type DataUploadConfiguration = {
  __typename?: 'DataUploadConfiguration';
  isDefaultDataSource?: Maybe<Scalars['Boolean']>;
  targetDatabase?: Maybe<Scalars['String']>;
  targetSchema?: Maybe<Scalars['String']>;
};

export type DataUploadDetails = {
  __typename?: 'DataUploadDetails';
  dataSourceId?: Maybe<Scalars['GUID']>;
  dataUploadConfiguration?: Maybe<DataUploadConfiguration>;
  defaultDataSourceName?: Maybe<Scalars['String']>;
  isDataUploadEnabled?: Maybe<Scalars['Boolean']>;
  isDefaultDataSourceSelected?: Maybe<Scalars['Boolean']>;
};

export type DataValue = {
  epochRange?: InputMaybe<EpochRange>;
  value?: InputMaybe<Scalars['String']>;
};

export type DateFilterContent = {
  __typename?: 'DateFilterContent';
  dateFilter?: Maybe<DateFilterValue>;
  /** true if negation of the filter operator should be applied */
  negate?: Maybe<Scalars['Boolean']>;
};

export enum DateFilterType {
  ExactDate = 'EXACT_DATE',
  ExactDateRange = 'EXACT_DATE_RANGE',
  ExactDateTime = 'EXACT_DATE_TIME',
  ExactTime = 'EXACT_TIME',
  LastNPeriod = 'LAST_N_PERIOD',
  LastPeriod = 'LAST_PERIOD',
  MonthOnly = 'MONTH_ONLY',
  MonthYear = 'MONTH_YEAR',
  NextNPeriod = 'NEXT_N_PERIOD',
  NextPeriod = 'NEXT_PERIOD',
  Now = 'NOW',
  NumDateFilters = 'NUM_DATE_FILTERS',
  NPeriodAgo = 'N_PERIOD_AGO',
  PeriodOnly = 'PERIOD_ONLY',
  PeriodToDate = 'PERIOD_TO_DATE',
  QuarterOnly = 'QUARTER_ONLY',
  QuarterYear = 'QUARTER_YEAR',
  ThisPeriod = 'THIS_PERIOD',
  Today = 'TODAY',
  Tomorrow = 'TOMORROW',
  WeekdayOnly = 'WEEKDAY_ONLY',
  YearOnly = 'YEAR_ONLY',
  Yesterday = 'YESTERDAY'
}

export type DateFilterValue = {
  __typename?: 'DateFilterValue';
  datePeriod?: Maybe<DatePeriod>;
  /** used in exact date range queries such as 'between 10/10/2010 and 10/11/2011' */
  dateRange?: Maybe<FilterDateRange>;
  /** epoch in server time (in seconds) for EXACT_DATE or EXACT_TIME */
  epoch?: Maybe<Scalars['String']>;
  /**
   * Last/First period filters may also be applied for each of the higher level
   * time period. e.g. last month for each year.
   * This field indicates the higher level time period over which the the filter
   * is to be applied.
   * default = NUM_DATE_PERIODS
   */
  forEachPeriod?: Maybe<DatePeriod>;
  monthName?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  /** used in inequality filters such as after Q1 2014 */
  op?: Maybe<FilterTypes>;
  quarterName?: Maybe<Scalars['String']>;
  type?: Maybe<DateFilterType>;
  weekDayName?: Maybe<Scalars['String']>;
  yearName?: Maybe<Scalars['String']>;
};

export type DateFilterValueInput = {
  datePeriod?: InputMaybe<DatePeriod>;
  /** used in exact date range queries such as 'between 10/10/2010 and 10/11/2011' */
  dateRange?: InputMaybe<FilterDateRangeInput>;
  /** epoch in server time (in seconds) for EXACT_DATE or EXACT_TIME */
  epoch?: InputMaybe<Scalars['Float']>;
  /**
   * Last/First period filters may also be applied for each of the higher level
   * time period. e.g. last month for each year.
   * This field indicates the higher level time period over which the the filter
   * is to be applied.
   * default = NUM_DATE_PERIODS
   */
  forEachPeriod?: InputMaybe<DatePeriod>;
  /** default = NUM_MONTHS */
  month?: InputMaybe<Month>;
  monthName?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
  /** used in inequality filters such as after Q1 2014 */
  op?: InputMaybe<FilterTypes>;
  /** default = NUM_QUARTERS */
  quarter?: InputMaybe<Quarter>;
  quarterName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<DateFilterType>;
  /** default = NUM_WEEK_DAYS */
  weekDay?: InputMaybe<WeekDay>;
  weekDayName?: InputMaybe<Scalars['String']>;
  /** default = -1 */
  year?: InputMaybe<Scalars['Int']>;
  yearName?: InputMaybe<Scalars['String']>;
};

export enum DatePeriod {
  Day = 'DAY',
  Hour = 'HOUR',
  Minute = 'MINUTE',
  Month = 'MONTH',
  NumDatePeriods = 'NUM_DATE_PERIODS',
  Quarter = 'QUARTER',
  Second = 'SECOND',
  Week = 'WEEK',
  Year = 'YEAR'
}

/** Get DBT connection response */
export type DbtConnection = {
  __typename?: 'DbtConnection';
  accountId?: Maybe<Scalars['String']>;
  apiKey?: Maybe<Scalars['String']>;
  authorName: Scalars['String'];
  cdwDatabase: Scalars['String'];
  connectionId?: Maybe<Scalars['String']>;
  connectionName?: Maybe<Scalars['String']>;
  dbtConnectionId: Scalars['String'];
  dbtUrl?: Maybe<Scalars['String']>;
  importType?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
  projectName: Scalars['String'];
  updatedTime: Scalars['Float'];
};

export type DbtConnectionList = {
  __typename?: 'DbtConnectionList';
  dbtConnections?: Maybe<Array<Maybe<DbtConnection>>>;
  isLastBatch: Scalars['Boolean'];
};

export type DbtConnectionListParamsInput = {
  batchSize?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  pattern?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  sortAscending?: InputMaybe<Scalars['Boolean']>;
  tagName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type DbtGenerateTmlParamsInput = {
  worksheetId?: InputMaybe<Scalars['String']>;
  worksheetName?: InputMaybe<Scalars['String']>;
};

export type DbtGenerateWorksheetsParamsInput = {
  modelName: Scalars['String'];
  tables: Array<DbtTableInput>;
};

export type DbtImportEPackObjectInput = {
  action?: InputMaybe<Scalars['String']>;
  edoc: Scalars['String'];
  filename?: InputMaybe<Scalars['String']>;
  guid?: InputMaybe<Scalars['GUID']>;
  type: ValidEdocMetadataType;
  zipFileName?: InputMaybe<Scalars['String']>;
};

export type DbtProject = {
  __typename?: 'DbtProject';
  count: Scalars['String'];
  id: Scalars['String'];
  label: Scalars['String'];
};

export type DbtProjectList = {
  __typename?: 'DbtProjectList';
  dbtConnections?: Maybe<Array<Maybe<DbtProject>>>;
  isLastBatch: Scalars['Boolean'];
};

export type DbtTableInput = {
  cloudTableName: Scalars['String'];
  dbtTableName: Scalars['String'];
  matched?: InputMaybe<Scalars['Boolean']>;
  schema: Scalars['String'];
};

/** Generate worksheets response */
export type DbtWorksheet = {
  __typename?: 'DbtWorksheet';
  dwTable?: Maybe<Scalars['String']>;
  metricsAvailable?: Maybe<Scalars['Boolean']>;
  model?: Maybe<Scalars['String']>;
  relationships?: Maybe<Scalars['String']>;
  sync?: Maybe<Scalars['String']>;
  worksheetId?: Maybe<Scalars['String']>;
  worksheetName?: Maybe<Scalars['String']>;
};

export type DefaultHeaders = {
  accessToken?: InputMaybe<Scalars['String']>;
  xTsIdpDomain?: InputMaybe<Scalars['String']>;
  xTsPrivileges?: InputMaybe<Scalars['String']>;
};

export type DeleteColumnTransform = {
  columnIds: Array<Scalars['String']>;
  generateResponse: Scalars['Boolean'];
};

export type DeleteParameterTransform = {
  generateResponse: Scalars['Boolean'];
  parameterId: Scalars['GUID'];
};

export type DeleteScheduleInput = {
  scheduleId: Scalars['String'];
};

export type DeleteScheduleResult = {
  __typename?: 'DeleteScheduleResult';
  message?: Maybe<Scalars['String']>;
};

export type DependenciesResponse = IBachResponse & {
  __typename?: 'DependenciesResponse';
  dependencies?: Maybe<Array<Maybe<Dependency>>>;
  id: BachSessionId;
};

export type Dependency = {
  __typename?: 'Dependency';
  header: Array<EntityHeader>;
  metaDataType: Scalars['String'];
};

export type DependencyModel = {
  __typename?: 'DependencyModel';
  dependent?: Maybe<Array<Maybe<DependentObject>>>;
  header?: Maybe<EntityHeader>;
};

export type DependencyObject = {
  __typename?: 'DependencyObject';
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** Dependent inside a permission */
export type Dependent = {
  __typename?: 'Dependent';
  /** Author of the dependent */
  author?: Maybe<Scalars['String']>;
  /** ID of the dependent */
  id?: Maybe<Scalars['GUID']>;
  /** Check flag for hidden */
  isHidden?: Maybe<Scalars['Boolean']>;
  /** Name of the dependent */
  name?: Maybe<Scalars['String']>;
  /** Owner ID of the dependent */
  owner?: Maybe<Scalars['GUID']>;
  /** Owner name of the dependent */
  ownerName?: Maybe<Scalars['String']>;
  /** Specifies share mode for the dependent */
  shareMode?: Maybe<Scalars['String']>;
  /** Type of the dependent */
  type?: Maybe<Scalars['String']>;
};

export type DependentObject = {
  __typename?: 'DependentObject';
  header?: Maybe<Array<Maybe<EntityHeader>>>;
  type?: Maybe<ObjectType>;
};

export type DependentPermission = {
  __typename?: 'DependentPermission';
  /** An array of object with details of permission on the user groups to which the user or user group belongs */
  groupPermission?: Maybe<Array<Maybe<GroupPermission>>>;
  /** GUID of the object */
  id?: Maybe<Scalars['String']>;
  /** Name of the object */
  name?: Maybe<Scalars['String']>;
  /** Indicates the permission which user or user group has on the object */
  permission?: Maybe<Scalars['String']>;
  /** Indicates the permission which user or user group has on the object through sharing of the object with this user or user group */
  sharedPermission?: Maybe<Scalars['String']>;
  /** Indicates the type of the object */
  type?: Maybe<Scalars['String']>;
};

export type Dependents = {
  __typename?: 'Dependents';
  USER_GROUP?: Maybe<Array<Maybe<DependencyObject>>>;
};

export enum DestinationOperationTypes {
  Archive = 'ARCHIVE',
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
  Upsert = 'UPSERT'
}

/** values for enum is defined in seekwell-resolver */
export enum DestinationTypes {
  Gainsight = 'GAINSIGHT',
  Googlesheets = 'GOOGLESHEETS',
  Hubspot = 'HUBSPOT',
  Mailchimp = 'MAILCHIMP',
  Msteams = 'MSTEAMS',
  Salesforce = 'SALESFORCE',
  Servicenow = 'SERVICENOW',
  Slack = 'SLACK',
  Webex = 'WEBEX',
  Zendesk = 'ZENDESK',
  Zoho = 'ZOHO'
}

/** A type that describes detailed pinboard info */
export type DetailedPinboard = {
  __typename?: 'DetailedPinboard';
  container?: Maybe<Array<PinboardContainer>>;
  container_layout?: Maybe<Array<ContainerLayout>>;
  header?: Maybe<PinboardEntityMetadata>;
  tabs?: Maybe<PinboardTabInfo>;
};

export type DiffExplanation = {
  algorithm?: InputMaybe<AnalysisAlgorithm>;
};

export type DisconnectCatalogConnectionResult = {
  __typename?: 'DisconnectCatalogConnectionResult';
  connection_id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

/** type which defines the discount offer details */
export type DiscountDetail = {
  __typename?: 'DiscountDetail';
  /** user discount end Time */
  discountEndTime?: Maybe<Scalars['Long']>;
  /** user discount month duration */
  discountOfferDuration?: Maybe<Scalars['Int']>;
  /** user discount Percentage */
  discountPercentage?: Maybe<Scalars['Int']>;
  /** user discount start Time */
  discountStartTime?: Maybe<Scalars['Long']>;
};

export enum DisplayMode {
  ChartMode = 'CHART_MODE',
  HeadlineMode = 'HEADLINE_MODE',
  RAnalysisMode = 'R_ANALYSIS_MODE',
  TableMode = 'TABLE_MODE',
  Undefined = 'UNDEFINED'
}

export type DrillDownColumn = {
  __typename?: 'DrillDownColumn';
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  source: DrillDownColumnSource;
};

/** -------------- DrillDown Inputs -------------- */
export type DrillDownColumnInfo = {
  joinPath?: InputMaybe<Array<JoinPathInput>>;
  logicalColumnId: Scalars['String'];
};

/** TODO: Check if this can be replaces with Metadata SourceDetail */
export type DrillDownColumnSource = {
  __typename?: 'DrillDownColumnSource';
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type DrillInfo = {
  __typename?: 'DrillInfo';
  attribute: TableToken;
  insightsGenerated: Scalars['Int'];
  insightsShown: Scalars['Int'];
  measure: TableToken;
};

export type DsGoogleSheetObjectDetailInput = {
  /** Destination app name */
  appName: DestinationTypes;
  /** DestinationId for action */
  destinationId: Scalars['String'];
  /** Object id for details */
  objectId: Scalars['String'];
};

export type DsGoogleSheetObjectDetailResult = {
  __typename?: 'DsGoogleSheetObjectDetailResult';
  sheets: Array<DsGoogleSheetObjectDetail>;
};

export type DsMsTeamsObjectDetail = {
  __typename?: 'DsMsTeamsObjectDetail';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type DsMsTeamsObjectDetailInput = {
  /** Destination app name */
  appName: DestinationTypes;
  /** DestinationId for action */
  destinationId: Scalars['String'];
  /** Object id for details */
  objectId: Scalars['String'];
};

export type DsMsTeamsObjectDetailResult = {
  __typename?: 'DsMsTeamsObjectDetailResult';
  channels: Array<DsMsTeamsObjectDetail>;
};

export type DsObjectDetailsInput = {
  /** Destination app name */
  appName: DestinationTypes;
  /** DestinationId for action */
  destinationId: Scalars['String'];
  /** Object id for details */
  objectId: Scalars['String'];
};

export type DsSfdcObjectDetailInput = {
  /** Destination app name */
  appName: DestinationTypes;
  /** DestinationId for action */
  destinationId: Scalars['String'];
  /** Object id for details */
  objectId: Scalars['String'];
};

export type DsSfdcObjectDetailResult = {
  __typename?: 'DsSfdcObjectDetailResult';
  fields: Array<DsSfdcObjectField>;
  name: Scalars['String'];
};

export type DsSfdcObjectField = {
  __typename?: 'DsSfdcObjectField';
  createable?: Maybe<Scalars['Boolean']>;
  digits: Scalars['Int'];
  idLookup?: Maybe<Scalars['Boolean']>;
  length: Scalars['Int'];
  name: Scalars['String'];
  precision: Scalars['Int'];
  scale: Scalars['Int'];
  type: Scalars['String'];
};

/** edoc (entity doc) formats */
export enum EDocFormatType {
  Json = 'JSON',
  Proto = 'PROTO',
  Yaml = 'YAML'
}

/** edoc generation types */
export enum EDocGenerationType {
  Autogenerated = 'AUTOGENERATED',
  Default = 'DEFAULT'
}

export type EDocGuidInfo = {
  __typename?: 'EDocGuidInfo';
  /**
   * Guid of the object present inside the edoc/TSL file.
   * If no guid is present inside edoc file, this field will be empty.
   */
  guid?: Maybe<Scalars['GUID']>;
  /**
   * True if an object corresponding to the guid in
   * TSL file is found in the system. False otherwise.
   */
  isMatchingObjectFound?: Maybe<Scalars['Boolean']>;
  /**
   * Type of object already present in the system corresponding to guid.
   * Note that this may be different from the object type present in the
   * edoc file.
   */
  matchingObjectType?: Maybe<Scalars['String']>;
};

export type EPackInfoRequestObject = {
  /** Entity doc representation of metadata object. i.e. Content of TSL file */
  edoc?: InputMaybe<Scalars['String']>;
  /** Filename of the TSL file */
  filename?: InputMaybe<Scalars['String']>;
  /** Zip file name */
  zipFileName?: InputMaybe<Scalars['String']>;
};

export type EPackInfoRequestZipFile = {
  /** Base64 encoded content of zip file */
  zipFileContent?: InputMaybe<Scalars['String']>;
  /** Zip file name */
  zipFileName?: InputMaybe<Scalars['String']>;
};

/** The getEPackInfo query will return an array of these objects */
export type EPackInfoResponse = {
  __typename?: 'EPackInfoResponse';
  edoc?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  guidInfo?: Maybe<EDocGuidInfo>;
  metadataType?: Maybe<Scalars['String']>;
  metadataTypeEnum?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<EPackStatusInfo>;
  zipFileName?: Maybe<Scalars['String']>;
};

export type EPackStatusInfo = {
  __typename?: 'EPackStatusInfo';
  errorMessage?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['String']>;
};

export type EditJoinHeader = {
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  guid?: InputMaybe<Scalars['String']>;
};

export type EditSchemaJoinTransform = {
  join?: InputMaybe<JoinContent>;
  joinHeader?: InputMaybe<EditJoinHeader>;
};

export enum EditType {
  Editable = 'EDITABLE',
  Hidden = 'HIDDEN',
  MultiSelection = 'MULTI_SELECTION',
  NonEditable = 'NON_EDITABLE',
  Text = 'TEXT'
}

export type EditWorksheetBaseRequest = {
  addColumnTransform?: InputMaybe<AddColumnsTransform>;
  addSchemaTableTransform?: InputMaybe<AddSchemaTableTransform>;
  createSchemaJoinTransform?: InputMaybe<CreateSchemaJoinTransform>;
  createWorksheetTransform?: InputMaybe<CreateWorksheetTransform>;
  deleteColumnTransform?: InputMaybe<DeleteColumnTransform>;
  editSchemaJoinTransform?: InputMaybe<EditSchemaJoinTransform>;
  loadWorksheetRequest?: InputMaybe<LoadWorksheetRequest>;
  parameterDependenciesRequest?: InputMaybe<ParameterDependenciesRequest>;
  removeParameterTransform?: InputMaybe<DeleteParameterTransform>;
  requestType: WorksheetRequestType;
  saveAsTransform?: InputMaybe<SaveAsTransform>;
  saveParameterTransform?: InputMaybe<SaveParameterTransform>;
  selectSchemaJoinTransform?: InputMaybe<SelectSchemaJoinTransform>;
  setScopeTransform?: InputMaybe<SetScopeTransform>;
  updateColumnPropertiesTransform?: InputMaybe<UpdateColumnPropertiesTransform>;
};

export type EditWorksheetRequest = {
  baseRequests: Array<EditWorksheetBaseRequest>;
  id: BachSessionIdInput;
};

/** Information required to export as edoc */
export type EdocObjectInfo = {
  id: Scalars['GUID'];
  type: ValidEdocMetadataType;
};

/** Get embed action config */
export type EmbedActionConfig = {
  __typename?: 'EmbedActionConfig';
  availability?: Maybe<Array<Maybe<ActionAvailability>>>;
  context?: Maybe<ActionContext>;
  detail?: Maybe<ActionDetail>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type: ActionTypes;
  userGroupList?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type EmbedActionConfigInput = {
  availability?: InputMaybe<Array<InputMaybe<ActionAvailability>>>;
  context: ActionContext;
  detail: ActionDetailInput;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  type: ActionTypes;
  userGroupList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  version: Scalars['String'];
};

export type EmbedUrlConfigPerOrg = {
  __typename?: 'EmbedUrlConfigPerOrg';
  answer_share_url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  generic_url?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  liveboard_share_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  org?: Maybe<OrgInfo>;
  spotiq_analysis_url?: Maybe<Scalars['String']>;
  unsubscribe_url?: Maybe<Scalars['String']>;
  visualization_share_url?: Maybe<Scalars['String']>;
};

export type EmbedUrlKeys = {
  ANSWER_URL?: InputMaybe<Scalars['String']>;
  GENERIC_URL?: InputMaybe<Scalars['String']>;
  INSIGHT_URL?: InputMaybe<Scalars['String']>;
  PINBOARD_URL?: InputMaybe<Scalars['String']>;
  PINBOARD_VIZ_URL?: InputMaybe<Scalars['String']>;
  UNSUBSCRIBE_URL?: InputMaybe<Scalars['String']>;
};

/** Get embed urls */
export type EmbedUrls = {
  __typename?: 'EmbedUrls';
  ANSWER_URL?: Maybe<Scalars['String']>;
  GENERIC_URL?: Maybe<Scalars['String']>;
  INSIGHT_URL?: Maybe<Scalars['String']>;
  PINBOARD_URL?: Maybe<Scalars['String']>;
  PINBOARD_VIZ_URL?: Maybe<Scalars['String']>;
  UNSUBSCRIBE_URL?: Maybe<Scalars['String']>;
};

export type EmbedUrlsConfigInfo = {
  __typename?: 'EmbedUrlsConfigInfo';
  answer_share_url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  generic_url?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  liveboard_share_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  org?: Maybe<OrgInformation>;
  spotiq_analysis_url?: Maybe<Scalars['String']>;
  unsubscribe_url?: Maybe<Scalars['String']>;
  visualization_share_url?: Maybe<Scalars['String']>;
};

export type EmbedUrlsConfigInput = {
  embedUrls: EmbedUrlKeys;
  useCustomEmbedUrls: Scalars['Boolean'];
};

export type EmbraceTable = {
  __typename?: 'EmbraceTable';
  cachingInfo?: Maybe<CachingInfo>;
  header: Metadata;
  relationships?: Maybe<Scalars['Long']>;
  relationshipsWithin?: Maybe<Scalars['Long']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type EmptyAnswer = {
  __typename?: 'EmptyAnswer';
  /** Auto Select Datasource Metric */
  autoSelectDatasourceInfo?: Maybe<Scalars['JSON']>;
  /** empty page enum */
  emptyAnswerEnum: EmptyAnswerStateEnum;
  /** data source id which will be used for empty state */
  searchAssistSourceId: Array<Scalars['GUID']>;
};

export enum EmptyAnswerStateEnum {
  AutogenAnswer = 'AUTOGEN_ANSWER',
  Default = 'DEFAULT',
  StartAaq = 'START_AAQ',
  StartSearchAssist = 'START_SEARCH_ASSIST'
}

export type EncodedAnalysisInfo = {
  __typename?: 'EncodedAnalysisInfo';
  encodedA3Request: Scalars['String'];
  encodedAnalysisFacts: Scalars['String'];
};

/** edoc data from getEdoc query */
export type EntityDoc = {
  __typename?: 'EntityDoc';
  edoc?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['GUID']>;
  name?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** edoc response object from getEdoc query */
export type EntityDocResponse = {
  __typename?: 'EntityDocResponse';
  object: Array<EntityDoc>;
  zipFile: Scalars['String'];
};

export type EntityHeader = {
  __typename?: 'EntityHeader';
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  guid?: Maybe<Scalars['GUID']>;
};

/** Permissions Input for Entity */
export type EntityPermissionInput = {
  /** GUID of the User / Group */
  entityId: Scalars['GUID'];
  /** Share mode to assign to entity */
  shareMode: AccessMode;
};

export type EpochRange = {
  endEpoch?: InputMaybe<Scalars['Float']>;
  startEpoch: Scalars['Float'];
};

/** type that defines Eureka viz Snapshot response */
export type EurekaVizSnapshot = {
  __typename?: 'EurekaVizSnapshot';
  createdMs?: Maybe<Scalars['Float']>;
  /** TODO add ID field */
  id?: Maybe<Scalars['String']>;
  snapshotType?: Maybe<SnapshotType>;
  vizContent?: Maybe<Scalars['String']>;
};

/** type that defines Eureka viz Snapshot response */
export type EurekaVizSnapshotStatus = {
  __typename?: 'EurekaVizSnapshotStatus';
  id?: Maybe<Scalars['String']>;
};

export type Eureka_AddVizSnapshotResponse = {
  __typename?: 'Eureka_addVizSnapshotResponse';
  statusCode?: Maybe<Scalars['Int']>;
  statusMessage?: Maybe<Scalars['String']>;
};

export type Eureka_WorkSheetDataSource = {
  __typename?: 'Eureka_workSheetDataSource';
  id?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  tooltip?: Maybe<Scalars['String']>;
};

/**  Generated from tsProto.a3.metric_monitor.EventSchemaType  */
export enum EventSchemaType {
  Monitor = 'MONITOR'
}

export type ExcludedViz = {
  __typename?: 'ExcludedViz';
  excludedContainerIds?: Maybe<Array<Maybe<Scalars['GUID']>>>;
  filterColumn?: Maybe<FilterGroupId>;
};

/**  Generated from tsProto.sage.auto_complete.v2.ConstrainedSearchContext.ExplorationType  */
export enum ExplorationType {
  Add = 'ADD',
  Compare = 'COMPARE',
  Filter = 'FILTER',
  Replace = 'REPLACE'
}

export type ExploreResponse = {
  __typename?: 'ExploreResponse';
  answer?: Maybe<AnswerEditSession>;
  isChart?: Maybe<Scalars['Boolean']>;
  oldToNewVisualizationMap?: Maybe<Array<Maybe<OldToNewVizTuple>>>;
  suggestions?: Maybe<Array<TabTypeSuggestion>>;
};

export type ExportRequest = {
  answerParams?: InputMaybe<AnswerParams>;
  exportFileName?: InputMaybe<Scalars['String']>;
  objectType?: InputMaybe<ObjectType>;
  outputType?: InputMaybe<OutputType>;
  pdfParams?: InputMaybe<PdfParams>;
  pinboardParams?: InputMaybe<PinboardParams>;
  pngParams?: InputMaybe<PngParams>;
  screenParams?: InputMaybe<ScreenParams>;
  shortLivedAuthParams?: InputMaybe<ShortLivedAuthParams>;
  urlParameters?: InputMaybe<Array<InputMaybe<UrlParam>>>;
  userLocale?: InputMaybe<Scalars['String']>;
};

export type ExportResponse = {
  __typename?: 'ExportResponse';
  objectType?: Maybe<ObjectType>;
  pdfParams?: Maybe<PdfParamsResponse>;
  pinboardParams?: Maybe<PinboardParamsResponse>;
};

export type ExternalDatabases = {
  isAutoCreated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  schemas?: InputMaybe<Array<InputMaybe<Schemas>>>;
};

export type FalconConstantValue = {
  boolVal?: InputMaybe<Scalars['Boolean']>;
  doubleVal?: InputMaybe<Scalars['Int']>;
  floatVal?: InputMaybe<Scalars['Float']>;
  int32Val?: InputMaybe<Scalars['Int']>;
  int64Val?: InputMaybe<Scalars['Int']>;
  normalize?: InputMaybe<Scalars['Boolean']>;
  nullType?: InputMaybe<FalconValueTypeEnum>;
  nullVal?: InputMaybe<Scalars['Boolean']>;
  stringVal?: InputMaybe<Scalars['String']>;
};

export enum FalconDataType {
  Bool = 'BOOL',
  Char = 'CHAR',
  Date = 'DATE',
  DateTime = 'DATE_TIME',
  Double = 'DOUBLE',
  Float = 'FLOAT',
  Int32 = 'INT32',
  Int64 = 'INT64',
  MaxType = 'MAX_TYPE',
  Time = 'TIME',
  Unknown = 'UNKNOWN'
}

export enum FalconValueTypeEnum {
  TypeBool = 'TYPE_BOOL',
  TypeDouble = 'TYPE_DOUBLE',
  TypeInt64 = 'TYPE_INT64',
  TypeNull = 'TYPE_NULL',
  TypeString = 'TYPE_STRING',
  TypeStringCase = 'TYPE_STRING_CASE'
}

export type FeedbackAnswerOption = {
  __typename?: 'FeedbackAnswerOption';
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum FeedbackReason {
  NotInterested = 'NOT_INTERESTED',
  QuestionAnswerMismatch = 'QUESTION_ANSWER_MISMATCH'
}

export enum FeedbackType {
  AllAnomaliesObvious = 'ALL_ANOMALIES_OBVIOUS',
  AllChangesExpected = 'ALL_CHANGES_EXPECTED',
  AnomalousPointUninteresting = 'ANOMALOUS_POINT_UNINTERESTING',
  AttributeColumnUninteresting = 'ATTRIBUTE_COLUMN_UNINTERESTING',
  AttributeFilterCombinationUninteresting = 'ATTRIBUTE_FILTER_COMBINATION_UNINTERESTING',
  BetterDateBucket = 'BETTER_DATE_BUCKET',
  CorrelationObvious = 'CORRELATION_OBVIOUS',
  DataSourceUninteresting = 'DATA_SOURCE_UNINTERESTING',
  DiffExpected = 'DIFF_EXPECTED',
  DiffValueUninteresting = 'DIFF_VALUE_UNINTERESTING',
  FilterColumnUninteresting = 'FILTER_COLUMN_UNINTERESTING',
  MeasureColumnUninteresting = 'MEASURE_COLUMN_UNINTERESTING',
  MeasureFilterCombinationObvious = 'MEASURE_FILTER_COMBINATION_OBVIOUS',
  TrendBetterDateAttribute = 'TREND_BETTER_DATE_ATTRIBUTE',
  TrendObvious = 'TREND_OBVIOUS'
}

export type FileHeader = {
  __typename?: 'FileHeader';
  author?: Maybe<Scalars['GUID']>;
  belongToAllOrgs?: Maybe<Scalars['Boolean']>;
  created?: Maybe<Scalars['Long']>;
  id: Scalars['GUID'];
  modified?: Maybe<Scalars['Long']>;
  modifiedBy?: Maybe<Scalars['GUID']>;
  modifiedByName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orgIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type Filter = {
  __typename?: 'Filter';
  dateFilterContent?: Maybe<Array<DateFilterContent>>;
  filterContent?: Maybe<Array<FilterContent>>;
  filterId?: Maybe<Scalars['GUID']>;
};

export type FilterColumn = {
  __typename?: 'FilterColumn';
  /** aggregation type can be present even if isAggregateApplied is true */
  aggregationType?: Maybe<ColumnAggregationType>;
  /** custom calendar guid */
  calendarGuid?: Maybe<Scalars['GUID']>;
  /** fields required to identify filter type */
  dataType?: Maybe<FalconDataType>;
  /** for formula we return column name */
  formulaId?: Maybe<Scalars['GUID']>;
  /**
   * to check if filter is added from left panel or from header
   * for left panel we don't show aggregation type
   */
  isAggregateApplied?: Maybe<Scalars['Boolean']>;
  /** fields required for localization of filter text */
  name?: Maybe<Scalars['String']>;
  referencedColumns?: Maybe<Array<EntityHeader>>;
  referencedTables?: Maybe<Array<EntityHeader>>;
  timeBucket?: Maybe<ColumnTimeBucket>;
  type?: Maybe<AnswerColumnEffectiveType>;
};

export type FilterColumnValueInput = {
  boolValue?: InputMaybe<Scalars['Boolean']>;
  doubleValue?: InputMaybe<Scalars['Float']>;
  /**
   * intValue type has to be Float. Type Int is not able to
   * handle 64bit integers
   */
  intValue?: InputMaybe<Scalars['Float']>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  stringValue?: InputMaybe<Scalars['String']>;
  type: ColumnValueType;
};

export type FilterContent = {
  __typename?: 'FilterContent';
  /** Filter type */
  filterType: FilterTypes;
  /** true if negation of the filter operator should be applied */
  negate?: Maybe<Scalars['Boolean']>;
  /** Filter Values. */
  value?: Maybe<Array<FilterContentValue>>;
};

export type FilterContentInput = {
  /**
   * null in case of attribute and measure filter
   * This object is consumed only in case of Date filter
   */
  dateFilterContent?: InputMaybe<DateFilterValueInput>;
  /**
   * optional field, if passed then filter would be updated
   * otherwise new filter would be added
   */
  filterId?: InputMaybe<Scalars['GUID']>;
  /** Filter type */
  filterType?: InputMaybe<FilterTypes>;
  /** true if negation of the filter operator should be applied */
  negate?: InputMaybe<Scalars['Boolean']>;
  /** Filter Values. */
  value?: InputMaybe<Array<FilterColumnValueInput>>;
};

export type FilterContentValue = {
  __typename?: 'FilterContentValue';
  key?: Maybe<Scalars['String']>;
};

/** FilterDateRange is used to associate date bounds with BETWEEN_DATES filter. */
export type FilterDateRange = {
  __typename?: 'FilterDateRange';
  /** epoch in server time (in seconds) for the upper bound */
  highEpoch?: Maybe<Scalars['String']>;
  /** epoch in server time (in seconds) for the lower bound */
  lowEpoch?: Maybe<Scalars['String']>;
};

/** -------------- Filter Inputs -------------- */
export type FilterDateRangeInput = {
  /** epoch in server time (in seconds) for the upper bound */
  highEpoch?: InputMaybe<Scalars['Float']>;
  /** epoch in server time (in seconds) for the lower bound */
  lowEpoch?: InputMaybe<Scalars['Float']>;
};

/**
 * Filter group represent filters that are applied to a particular column
 * means each filter group might be visible as a filter chip
 * (i.e. if isAutoGenerated is false and isEditable is true for that column )
 */
export type FilterGroup = {
  __typename?: 'FilterGroup';
  /** filter column info */
  columnInfo?: Maybe<FilterColumn>;
  /** filter display name */
  displayName?: Maybe<Scalars['String']>;
  /** filter rows */
  filters?: Maybe<Array<Maybe<Filter>>>;
  /** group Id : combination of logical column id, answer column Id and datasourse id */
  groupId?: Maybe<FilterGroupId>;
  /** If there is inline sage filter like IN (sage query), then isEditable=false */
  isEditable?: Maybe<Scalars['Boolean']>;
  /** check if a filter is mandatory */
  isMandatory?: Maybe<Scalars['Boolean']>;
  /** whether the filter is single value select */
  isSingleValue?: Maybe<Scalars['Boolean']>;
  /** Container id from which cross filter is applied. */
  sourceContainerId?: Maybe<Scalars['GUID']>;
};

export type FilterGroupId = {
  __typename?: 'FilterGroupId';
  /**
   * Either output_id or logical_column_id and dataSourceId is set
   * Output id of the answer column on which filter is applied.
   */
  answerColumnId?: Maybe<Scalars['GUID']>;
  /** Owner logical table of the logical column. */
  dataSourceId?: Maybe<Scalars['GUID']>;
  /** Logical column on which filter is applied. */
  logicalColumnId?: Maybe<Scalars['GUID']>;
};

export type FilterGroupIdInput = {
  /**
   * Either output_id or logical_column_id and dataSourceId is set
   * Output id of the answer column on which filter is applied.
   */
  answerColumnId?: InputMaybe<Scalars['GUID']>;
  /** Owner logical table of the logical column. */
  dataSourceId?: InputMaybe<Scalars['GUID']>;
  /** Logical column on which filter is applied. */
  logicalColumnId?: InputMaybe<Scalars['GUID']>;
};

export enum FilterProperty {
  IncludeNull = 'INCLUDE_NULL',
  IsDateFilter = 'IS_DATE_FILTER',
  IsFormula = 'IS_FORMULA',
  IsInSubquery = 'IS_IN_SUBQUERY'
}

export type FilterRepresentation = {
  __typename?: 'FilterRepresentation';
  filterColumn?: Maybe<OutputColumnRepresentation>;
  isHavingFilter?: Maybe<Scalars['Boolean']>;
  multiOperatorsValues?: Maybe<Array<Maybe<OperatorAndValues>>>;
};

export type FilterRepresentationList = {
  __typename?: 'FilterRepresentationList';
  filterRepresentation?: Maybe<Array<Maybe<FilterRepresentation>>>;
};

export enum FilterTypes {
  BeginsWith = 'BEGINS_WITH',
  Bw = 'BW',
  BwInc = 'BW_INC',
  BwIncMax = 'BW_INC_MAX',
  BwIncMin = 'BW_INC_MIN',
  Contains = 'CONTAINS',
  EndsWith = 'ENDS_WITH',
  Eq = 'EQ',
  Ge = 'GE',
  Gt = 'GT',
  In = 'IN',
  Le = 'LE',
  Like = 'LIKE',
  Lt = 'LT',
  Ne = 'NE'
}

export type FilterValue = {
  __typename?: 'FilterValue';
  display?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  keyNull?: Maybe<Scalars['Boolean']>;
  selected?: Maybe<Scalars['Boolean']>;
};

export type FilterValuesInput = {
  /** columnId and data source id */
  filterGroupId: FilterGroupIdInput;
  /**
   * Whether to see all possible values or just the set of values
   * possible with existing filters. Defaults to true
   */
  getAllValues?: InputMaybe<Scalars['Boolean']>;
  /** values search query string */
  valuesFilterString?: InputMaybe<Scalars['String']>;
};

export type FilterValuesResponse = {
  __typename?: 'FilterValuesResponse';
  /** JSON encoded array of values */
  values: Scalars['String'];
};

export type FontAttrs = {
  __typename?: 'FontAttrs';
  bold?: Maybe<Scalars['Boolean']>;
  color?: Maybe<Scalars['String']>;
  italic?: Maybe<Scalars['Boolean']>;
  strikeThrough?: Maybe<Scalars['Boolean']>;
  underline?: Maybe<Scalars['Boolean']>;
};

export type FontFace = {
  __typename?: 'FontFace';
  color?: Maybe<Scalars['String']>;
  family?: Maybe<Scalars['String']>;
  format?: Maybe<Scalars['Int']>;
  guid?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  stretch?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['Int']>;
  unicodeRange?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  variant?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

/** Font Face */
export type FontFaceInput = {
  color?: InputMaybe<Scalars['String']>;
  family?: InputMaybe<Scalars['String']>;
  format?: InputMaybe<Scalars['Int']>;
  guid?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
  stretch?: InputMaybe<Scalars['String']>;
  style?: InputMaybe<Scalars['Int']>;
  unicodeRange?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  variant?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Int']>;
};

export type FormatConfig = {
  __typename?: 'FormatConfig';
  category?: Maybe<CategoryType>;
  currencyFormatConfig?: Maybe<CurrencyFormatConfig>;
  customFormatConfig?: Maybe<CustomFormatConfig>;
  isCategoryEditable?: Maybe<Scalars['Boolean']>;
  numberFormatConfig?: Maybe<NumberFormatConfig>;
  percentageFormatConfig?: Maybe<PercentageFormatConfig>;
};

export enum FormatData {
  Compact = 'COMPACT',
  Full = 'FULL'
}

export enum FormatType {
  Json = 'JSON',
  Yaml = 'YAML'
}

export type FormulaCompletion = {
  __typename?: 'FormulaCompletion';
  nPrefixTokens: Scalars['Int'];
  nSuffixTokens: Scalars['Int'];
  tokens: Array<SageToken>;
};

export type FormulaMetadataResponse = {
  __typename?: 'FormulaMetadataResponse';
  aggregationType?: Maybe<ColumnAggregationType>;
  columnType?: Maybe<SageColumnType>;
  dataType?: Maybe<FalconDataType>;
};

/** Response object for all formula-related requests */
export type FormulaSearchResponse = {
  __typename?: 'FormulaSearchResponse';
  /** Information about completions for the current caret position */
  completions?: Maybe<Array<FormulaCompletion>>;
  /** Information about the current formula state */
  formula: AnswerFormula;
  /** Autocomplete session information */
  id: AcSession;
};

/**  Generated from tsProto.a3.metric_monitor.FrequencySpec.FrequencyGranularity  */
export enum FrequencyGranularity {
  Daily = 'DAILY',
  EveryMinute = 'EVERY_MINUTE',
  Hourly = 'HOURLY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type FrequencySpec = {
  __typename?: 'FrequencySpec';
  cron: CronFrequencySpec;
  endTime: Scalars['Long'];
  frequencyGranularity: FrequencyGranularity;
  startTime: Scalars['Long'];
  timeZone: Scalars['String'];
};

export type FrequencySpecInput = {
  cron: CronFrequencySpecInput;
  endTime: Scalars['Long'];
  frequencyGranularity: FrequencyGranularity;
  startTime: Scalars['Long'];
  timeZone: Scalars['String'];
};

/** A JSON object of name or GUIDs of the current owner of the objects. When both are given then id is considered. \n\n If a list of object ids are provided as input for TsObjectId, then only for those ids that have owner as the value provided in fromUser, the owner will be changed. \n\n Provide either name or id as input. When both are given user id will be considered. */
export type FromUserNameAndIdInput = {
  /** GUID of the user */
  id?: InputMaybe<Scalars['String']>;
  /** Username of the user */
  name?: InputMaybe<Scalars['String']>;
};

export type GatingConditionInput = {
  answerSession: BachSessionIdInput;
  isNew: Scalars['Boolean'];
};

export type GeneralSettings = {
  __typename?: 'GeneralSettings';
  isAnalysisRestrictedToCurrentResultSet: Scalars['Boolean'];
  isDateBoundaryAutoTuned: Scalars['Boolean'];
  isNullExcluded: Scalars['Boolean'];
  isZeroMeasureExclude: Scalars['Boolean'];
};

/** Generic request response */
export type GenericRequestResponse = {
  __typename?: 'GenericRequestResponse';
  Data?: Maybe<Scalars['JSON']>;
  Error?: Maybe<Scalars['String']>;
};

export type GeoConfig = {
  __typename?: 'GeoConfig';
  columnGuid: Scalars['ID'];
  customFileGuid: Scalars['ID'];
  fixedValue: Scalars['String'];
  geometryType?: Maybe<GeometryType>;
  parent?: Maybe<GeoConfig>;
  type: GeoConfigType;
};

export enum GeoConfigType {
  /** Country */
  AdminDiv_0 = 'ADMIN_DIV_0',
  /** First level sub-division of a country, like state. */
  AdminDiv_1 = 'ADMIN_DIV_1',
  /** Second level subdivision of a country, like county/district. */
  AdminDiv_2 = 'ADMIN_DIV_2',
  /** Custom region defined by a region definition file. */
  CustomRegion = 'CUSTOM_REGION',
  Latitude = 'LATITUDE',
  Longitude = 'LONGITUDE',
  ZipCode = 'ZIP_CODE'
}

export enum GeometryType {
  Circle = 'CIRCLE',
  GeometryCollection = 'GEOMETRY_COLLECTION',
  LinearRing = 'LINEAR_RING',
  LineString = 'LINE_STRING',
  MultiLineString = 'MULTI_LINE_STRING',
  MultiPoint = 'MULTI_POINT',
  MultiPolygon = 'MULTI_POLYGON',
  Point = 'POINT',
  Polygon = 'POLYGON'
}

export type GetCatalogDataSourcesInput = {
  connectionId?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type GetCatalogDataSourcesResult = {
  __typename?: 'GetCatalogDataSourcesResult';
  catalog?: Maybe<Scalars['String']>;
  connectionId?: Maybe<Scalars['String']>;
  metadata?: Maybe<Array<Maybe<CatalogMetaDataResult>>>;
  status?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

export type GetCatalogMetaDataInput = {
  connection_id?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type GetCatalogMetaDataResult = {
  __typename?: 'GetCatalogMetaDataResult';
  catalog?: Maybe<Scalars['String']>;
  connection_id?: Maybe<Scalars['String']>;
  metadata?: Maybe<Array<Maybe<CatalogMetaDataResult>>>;
  status?: Maybe<Scalars['Boolean']>;
};

export type GetCatalogViewLogsResult = {
  __typename?: 'GetCatalogViewLogsResult';
  connection_id?: Maybe<Scalars['String']>;
  logs?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type GetCsvUploadLimitInfoResponse = {
  __typename?: 'GetCsvUploadLimitInfoResponse';
  currentUploadCount?: Maybe<Scalars['Float']>;
  isUploadLimitConsumed?: Maybe<Scalars['Boolean']>;
  uploadLimit?: Maybe<Scalars['Float']>;
};

export type GetDsDestinationMetadataInput = {
  /** Destination app name */
  appName: DestinationTypes;
  /** DestinationId for action */
  destinationId: Scalars['String'];
};

export type GetDsDestinationMetadataResult = {
  __typename?: 'GetDSDestinationMetadataResult';
  destinationMetadata?: Maybe<Scalars['JSON']>;
};

export type GetDateFilterPreviewInput = {
  dateFilterContent: DateFilterValueInput;
  logicalColumnId: Scalars['GUID'];
};

export type GetDrillDownColumnResponse = {
  __typename?: 'GetDrillDownColumnResponse';
  drillDownColumns?: Maybe<Array<DrillDownColumn>>;
  id: BachSessionId;
};

export type GetGroupDetailsByIdOutput = {
  __typename?: 'GetGroupDetailsByIdOutput';
  assignedPinboards?: Maybe<Array<Maybe<Scalars['String']>>>;
  assignedRoles?: Maybe<Array<Maybe<Scalars['String']>>>;
  created?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  visibility?: Maybe<PrincipalVisibilityType>;
};

export type GetMonitorRuleResponse = {
  __typename?: 'GetMonitorRuleResponse';
  allowedFrequencies: Array<Maybe<FrequencyGranularity>>;
  metricData?: Maybe<MetricData>;
  monitorRule: MonitorRule;
};

export type GetPermissionForUserResponse = {
  __typename?: 'GetPermissionForUserResponse';
  permissions: PrincipalPermissionLevel;
};

export type GetRequestStatusResponse = {
  __typename?: 'GetRequestStatusResponse';
  cdwType?: Maybe<Scalars['String']>;
  status?: Maybe<VisualizationQueryStatus>;
};

export type GetRolesResponse = {
  __typename?: 'GetRolesResponse';
  Data?: Maybe<RoleListData>;
  Error?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['Int']>;
};

export type GetSampleDataParamsInput = {
  /** Number of records to fetch for pagination purposes */
  batchSize: Scalars['Int'];
  /** Connection Id */
  connectionId?: InputMaybe<Scalars['GUID']>;
  /** Connecion metadata */
  metadata: CreateConnectionMetadata;
  /** Request Id in case of OAUTH */
  state?: InputMaybe<Scalars['String']>;
  /** List of tables */
  tables: Array<InputMaybe<ColumnTable>>;
  /** Connection type */
  type: ConnectionConfigType;
};

export type GetScheduleInput = {
  scheduleId?: InputMaybe<Scalars['String']>;
};

export type GetScheduleResult = {
  __typename?: 'GetScheduleResult';
  clientMessage: Scalars['String'];
  cronExpression: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  scheduleId: Scalars['String'];
  scheduleType?: Maybe<ScheduleType>;
  timeZone: Scalars['String'];
};

export type GetSpotIqNotification = {
  __typename?: 'GetSpotIQNotification';
  attachContent: Scalars['Boolean'];
  notifiy: Scalars['Boolean'];
  onFailure: Scalars['Boolean'];
  onSuccess: Scalars['Boolean'];
};

export type GetSpotIqPreferences = {
  __typename?: 'GetSpotIQPreferences';
  autotuneDateBoundary: Scalars['Boolean'];
  emailNotification: GetSpotIqNotification;
  excludeNull: Scalars['Boolean'];
  excludeZeroMeasure: Scalars['Boolean'];
  maxCorrCoeff: Scalars['Float'];
  maxLag: Scalars['Float'];
  minCorrCoeff: Scalars['Float'];
  minRelativeDiff: Scalars['Float'];
  pValueThreshold: Scalars['Float'];
};

export type GetSubscriberSuggestionsResponseForMonitorRule = {
  __typename?: 'GetSubscriberSuggestionsResponseForMonitorRule';
  subscribers: Array<Maybe<Subscriber>>;
};

export type GetVizDataResponse = {
  __typename?: 'GetVizDataResponse';
  id: BachSessionId;
  vizData?: Maybe<Array<VizDataRes>>;
};

export type GetWebhookListResponse = {
  __typename?: 'GetWebhookListResponse';
  webhookConfigs: Array<Maybe<WebhookConfig>>;
};

export type GetWebhookResponse = {
  __typename?: 'GetWebhookResponse';
  webhookConfig: WebhookConfig;
};

export type GradientBackgroundAttrs = {
  __typename?: 'GradientBackgroundAttrs';
  backgroundFormatMidpoint?: Maybe<Scalars['Float']>;
  colors?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GridLineProperties = {
  __typename?: 'GridLineProperties';
  xGridlineEnabled?: Maybe<Scalars['Boolean']>;
  yGridlineEnabled?: Maybe<Scalars['Boolean']>;
};

export type GroupNameAndId = {
  __typename?: 'GroupNameAndID';
  /** GUID of the group */
  id?: Maybe<Scalars['String']>;
  /** Name of the group */
  name?: Maybe<Scalars['String']>;
};

export type GroupNameAndIdInput = {
  /** GUID of the group */
  id?: InputMaybe<Scalars['String']>;
  /** Name of the group */
  name?: InputMaybe<Scalars['String']>;
};

export type GroupPermission = {
  __typename?: 'GroupPermission';
  /** GUID of the user group */
  id?: Maybe<Scalars['String']>;
  /** Name of the user group */
  name?: Maybe<Scalars['String']>;
  /** Indicates the permission which user group has on the object */
  permission?: Maybe<Scalars['String']>;
};

export type GroupResponse = {
  __typename?: 'GroupResponse';
  /** Liveboards assigned to the group */
  assignedLiveboards?: Maybe<Array<Maybe<LiveboardNameAndId>>>;
  /** Author of user group */
  author?: Maybe<UserNameAndId>;
  /** Indicates if the all the properties of group is provided */
  complete?: Maybe<Scalars['Boolean']>;
  /** Date and time when group was created */
  created?: Maybe<Scalars['Float']>;
  /** Description of the group */
  description?: Maybe<Scalars['String']>;
  /** A unique display name string for the user group */
  displayName?: Maybe<Scalars['String']>;
  generationNum?: Maybe<Scalars['Float']>;
  groupIdx?: Maybe<Scalars['Int']>;
  /** Name of the group to which is added */
  groups?: Maybe<Array<Maybe<GroupNameAndId>>>;
  /** GUID of the group */
  id?: Maybe<Scalars['String']>;
  indexVersion?: Maybe<Scalars['Float']>;
  /** Indicates if the group is deleted */
  isDeleted?: Maybe<Scalars['Boolean']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** Indicates if the group is from external system */
  isExternal?: Maybe<Scalars['Boolean']>;
  /** Indicates if the group is hidden */
  isHidden?: Maybe<Scalars['Boolean']>;
  /** Indicates if the group is system principal */
  isSystemPrincipal?: Maybe<Scalars['Boolean']>;
  metadataVersion?: Maybe<Scalars['Int']>;
  /** Date and time of last modification of the group */
  modified?: Maybe<Scalars['Float']>;
  /** The user which last modified the user group details */
  modifiedBy?: Maybe<UserNameAndId>;
  /** Name of the group */
  name?: Maybe<Scalars['String']>;
  /** The organizations that user belongs to */
  orgs?: Maybe<Array<Maybe<OrgType>>>;
  /** The owner of the user group */
  owner?: Maybe<UserNameAndId>;
  /** Indicates the type of parent object */
  parenttype?: Maybe<Scalars['String']>;
  /** Privileges assigned to the group */
  privileges?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Tags assigned to the group */
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Tenant id associated with the group */
  tenantId?: Maybe<Scalars['String']>;
  /** Indicates the type of group */
  type?: Maybe<Scalars['String']>;
  userGroupContent?: Maybe<Scalars['JSON']>;
  /** User Group Information by Id or Name. */
  users?: Maybe<Array<Maybe<UserNameAndId>>>;
  /** Visibility of the group */
  visibility?: Maybe<Scalars['String']>;
};

export enum Groups__GroupType {
  LdapGroup = 'LDAP_GROUP',
  LocalGroup = 'LOCAL_GROUP'
}

export enum Groups__ParentType {
  Group = 'GROUP',
  User = 'USER'
}

export type GrowthRepresentation = {
  __typename?: 'GrowthRepresentation';
  growthBucket?: Maybe<Scalars['String']>;
  isYOY?: Maybe<Scalars['Boolean']>;
};

export type HeaderDetails = {
  __typename?: 'HeaderDetails';
  duration?: Maybe<Scalars['Int']>;
  insightExpiry: Scalars['String'];
  isUnSaved: Scalars['Boolean'];
  numOfInsights?: Maybe<Scalars['Int']>;
  numOfRows?: Maybe<Scalars['Int']>;
  phrasedTokens?: Maybe<Array<PhrasedToken>>;
  title: Scalars['String'];
};

export type Header_CertData = {
  x5c?: InputMaybe<Scalars['String']>;
};

export type HeadlineVisibility = {
  __typename?: 'HeadlineVisibility';
  columnId: Scalars['GUID'];
  isVisible?: Maybe<Scalars['Boolean']>;
};

export type HeadlineViz = Visualization & {
  __typename?: 'HeadlineViz';
  aggregationType?: Maybe<Array<ColumnAggregationType>>;
  data?: Maybe<Scalars['JSON']>;
  /** ----------- Headline Specific Fields ----------- */
  headlineColumn?: Maybe<AnswerColumn>;
  /** ----------- Visualization Common Fields ----------- */
  id: Scalars['ID'];
  isCustomTitle?: Maybe<Scalars['Boolean']>;
  possibleAggregations?: Maybe<Array<ColumnAggregationType>>;
  showPossibleAggregates?: Maybe<Scalars['Boolean']>;
  sortInfo?: Maybe<Array<Maybe<ColumnSortInfo>>>;
  title?: Maybe<Scalars['String']>;
  vizProp?: Maybe<HeadlineVizProps>;
};


export type HeadlineVizDataArgs = {
  canceId?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['Int']>;
  pagination?: InputMaybe<DataPaginationParamsInput>;
};

export enum HeadlineVizPropVersion {
  PreV1 = 'PRE_V1',
  V1 = 'V1'
}

export type HeadlineVizProperties = {
  __typename?: 'HeadlineVizProperties';
  conditionalFormatting?: Maybe<ConditionalFormatting>;
  summariesNumberFormatConfig?: Maybe<FormatConfig>;
};

export type HeadlineVizProps = {
  __typename?: 'HeadlineVizProps';
  columnProperty?: Maybe<HeadlineVizProperties>;
  headlineVizPropVersion?: Maybe<HeadlineVizPropVersion>;
};

export type HelpConfig = {
  __typename?: 'HelpConfig';
  enabled: Scalars['Boolean'];
  iconFilePath?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type HelpConfigInfoInput = {
  enabled: Scalars['Boolean'];
  fileName?: InputMaybe<Scalars['String']>;
  iconBase64String?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type HomeLiveboardResponse = {
  __typename?: 'HomeLiveboardResponse';
  /** The GUID of the liveboard */
  liveboardId?: Maybe<Scalars['String']>;
  /** Name of the liveboard */
  liveboardName?: Maybe<Scalars['String']>;
  /** The GUID of the user */
  userId?: Maybe<Scalars['String']>;
  /** Name of the user */
  userName?: Maybe<Scalars['String']>;
};

/** Interface for all BachResponses */
export type IBachResponse = {
  id: BachSessionId;
};

/** The object representation with ID and Name. */
export type IdAndNameObject = {
  __typename?: 'IdAndNameObject';
  /** The unique identifier of the object. */
  id?: Maybe<Scalars['String']>;
  /** Name of the object. */
  name?: Maybe<Scalars['String']>;
};

/** Create or update a metadata entity */
export enum ImportEPackAction {
  /** Create a new metadata entity */
  Create = 'CREATE',
  /** Update existing metadata entity */
  Update = 'UPDATE'
}

/** Information about each metadata object to be created/updated */
export type ImportEPackObjectInfo = {
  action?: InputMaybe<ImportEPackAction>;
  edoc: Scalars['String'];
  filename?: InputMaybe<Scalars['String']>;
  guid?: InputMaybe<Scalars['GUID']>;
  type: ValidEdocMetadataType;
  zipFileName?: InputMaybe<Scalars['String']>;
};

/**
 * Information about each metadata object to be created/updated
 * This duplicates the above code as importEdoc fails without this and if we use above ImportEpackRequest fails
 */
export type ImportEPackObjectInfoOutputType = {
  __typename?: 'ImportEPackObjectInfoOutputType';
  action?: Maybe<ImportEPackAction>;
  edoc: Scalars['String'];
  filename?: Maybe<Scalars['String']>;
  guid?: Maybe<Scalars['GUID']>;
  type: ValidEdocMetadataType;
  zipFileName?: Maybe<Scalars['String']>;
};

export enum ImportEPackPolicy {
  /**
   * If ALL_OR_NONE, either all or no object will be imported. i.e. If one
   * object fails to import, no other object will be imported.
   */
  AllOrNone = 'ALL_OR_NONE',
  /**
   * If PARTIAL, import of some objects might fail and some might succeed. In
   * case of failure of a object their dependent objects will also be skipped. (default)
   */
  Partial = 'PARTIAL',
  /**
   * If PARTIAL_OBJECT, the object are validated and can be imported with warnings
   * like: pinboard import if a viz could not be imported.
   * table import if a join or rls rule could not be imported
   */
  PartialObject = 'PARTIAL_OBJECT',
  /**
   * If VALIDATE_ONLY, all the objects will be validated and error(s) will be
   * returned if they cannot lead to successful import. Note that objects won't
   * actually be imported in this case.
   */
  ValidateOnly = 'VALIDATE_ONLY'
}

export type ImportEPackRequest = {
  __typename?: 'ImportEPackRequest';
  /** Edoc Format (default = YAML) */
  formatType?: Maybe<EDocFormatType>;
  /** Import policy that the user wants (default = PARTIAL) */
  importPolicy?: Maybe<ImportEPackPolicy>;
  /** Array of objects to import */
  object: Array<ImportEPackObjectInfoOutputType>;
};

/** Header object in importEPack response status */
export type ImportEPackResponseHeader = {
  __typename?: 'ImportEPackResponseHeader';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['GUID']>;
  metadataType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  subType?: Maybe<Scalars['String']>;
};

/** ImportEPack status */
export type ImportEPackStatus = {
  __typename?: 'ImportEPackStatus';
  filename?: Maybe<Scalars['String']>;
  header?: Maybe<ImportEPackResponseHeader>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<CallosumStatus>;
  zipFileName?: Maybe<Scalars['String']>;
};

export enum ImportPolicy {
  AllOrNone = 'ALL_OR_NONE',
  Partial = 'PARTIAL',
  ValidateOnly = 'VALIDATE_ONLY'
}

export type IncompleteDetail = {
  __typename?: 'IncompleteDetail';
  code?: Maybe<Scalars['String']>;
  header?: Maybe<EntityHeader>;
  message?: Maybe<Scalars['String']>;
};

export type Input_PinboardNoteTileContent = {
  htmlParsedString?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_AggregateFunctionTypeEnumProto = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_ClientPlatformType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_ClientStateProto = {
  state?: InputMaybe<Array<InputMaybe<Input_Callosum_KeyValueProto>>>;
};

export type Input_Callosum_ClientType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_ColumnDataTypeEnumProto = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_ColumnSpotiqPreferenceProto = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_DisplayNameLastUpdatedBy = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_ExpressionProto = {
  aggregation?: InputMaybe<Falcon_AggregateOp_E>;
  child?: InputMaybe<Array<InputMaybe<Input_Callosum_ExpressionProto>>>;
  columnType?: InputMaybe<Callosum_ExpressionProto_ColumnType>;
  id?: InputMaybe<Scalars['String']>;
  joinPaths?: InputMaybe<Array<InputMaybe<Input_Sage_JoinPathProto>>>;
  name?: InputMaybe<Scalars['String']>;
  operator?: InputMaybe<Falcon_ExpressionOp_E>;
  schemaTableId?: InputMaybe<Scalars['Int']>;
  value?: InputMaybe<Array<InputMaybe<Input_Falcon_ConstantValue>>>;
};

export type Input_Callosum_GeoConfigProto = {
  columnGuid?: InputMaybe<Scalars['String']>;
  customFileGuid?: InputMaybe<Scalars['String']>;
  fixedValue?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Input_Callosum_GeoConfigProto>;
  type?: InputMaybe<Callosum_GeoConfigProto_Type>;
};

export type Input_Callosum_GeoTypeEnumProto = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_InsightsInfo = {
  insightDetails?: InputMaybe<Array<InputMaybe<Input_Callosum_InsightsInfo_InsightDetailsProto>>>;
};

export type Input_Callosum_InsightsInfo_InsightDetailsProto = {
  computeTime?: InputMaybe<Scalars['Long']>;
  sourceId?: InputMaybe<Scalars['String']>;
  sourceType?: InputMaybe<Scalars['String']>;
  visualizationQuery?: InputMaybe<Input_Callosum_VisualizationQueryProto>;
};

export type Input_Callosum_KeyValueProto = {
  key?: InputMaybe<Input_Falcon_ConstantValue>;
  value?: InputMaybe<Input_Falcon_ConstantValue>;
};

export type Input_Callosum_LogicalColumnProto = {
  content?: InputMaybe<Input_Callosum_LogicalColumnProto_LogicalColumnContentProto>;
  derivationExpression?: InputMaybe<Input_Callosum_ExpressionProto>;
  derived?: InputMaybe<Scalars['Boolean']>;
  header?: InputMaybe<Input_Callosum_MetadataHeaderProto>;
  physicalColumnGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_LogicalColumnProto_LogicalColumnContentProto = {
  additive?: InputMaybe<Scalars['Boolean']>;
  attributionDimension?: InputMaybe<Scalars['Boolean']>;
  customOrder?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  dataType?: InputMaybe<Callosum_ColumnDataTypeEnumProto_E>;
  defaultAggrType?: InputMaybe<Callosum_AggregateFunctionTypeEnumProto_E>;
  defaultFormatPattern?: InputMaybe<Scalars['String']>;
  entityCategory?: InputMaybe<Sage_EntityCategory_E>;
  foreignKey?: InputMaybe<Scalars['Boolean']>;
  geoConfig?: InputMaybe<Input_Callosum_GeoConfigProto>;
  geoType?: InputMaybe<Callosum_GeoTypeEnumProto_E>;
  indexPriority?: InputMaybe<Scalars['Float']>;
  indexType?: InputMaybe<Sage_ColumnIndexType_E>;
  metricDefinition?: InputMaybe<Input_Callosum_MetricDefinitionProto>;
  physicalColumnName?: InputMaybe<Scalars['String']>;
  primaryKey?: InputMaybe<Scalars['Boolean']>;
  sageFormulaId?: InputMaybe<Scalars['String']>;
  sageOutputColumnGuid?: InputMaybe<Scalars['String']>;
  spotiqPreference?: InputMaybe<Callosum_ColumnSpotiqPreferenceProto_E>;
  synonym?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type?: InputMaybe<Callosum_LogicalColumnProto_ColumnTypeEnumProto>;
};

export type Input_Callosum_LogicalRelationshipJoinTypeEnumProto = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_LogicalRelationshipProto = {
  content?: InputMaybe<Input_Callosum_LogicalRelationshipProto_LogicalRelationshipContentProto>;
  destinationTableGuid?: InputMaybe<Scalars['String']>;
  header?: InputMaybe<Input_Callosum_MetadataHeaderProto>;
  joinType?: InputMaybe<Callosum_LogicalRelationshipJoinTypeEnumProto_E>;
  sourceTableGuid?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Callosum_LogicalRelationshipProto_LogicalRelationshipTypeEnumProto>;
};

export type Input_Callosum_LogicalRelationshipProto_LogicalRelationshipContentProto = {
  genericJoin?: InputMaybe<Input_Callosum_ExpressionProto>;
  relationship?: InputMaybe<Array<InputMaybe<Input_Callosum_LogicalRelationshipProto_LogicalRelationshipContentProto_SingleColumnLogicalRelationshipProto>>>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type Input_Callosum_LogicalRelationshipProto_LogicalRelationshipContentProto_SingleColumnLogicalRelationshipProto = {
  destinationColumnGuid?: InputMaybe<Scalars['String']>;
  sourceColumnGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_LogicalTableProto = {
  column?: InputMaybe<Array<InputMaybe<Input_Callosum_LogicalColumnProto>>>;
  content?: InputMaybe<Input_Callosum_LogicalTableProto_LogicalTableContentProto>;
  dataSourceGuid?: InputMaybe<Scalars['String']>;
  header?: InputMaybe<Input_Callosum_MetadataHeaderProto>;
  physicalTableGuid?: InputMaybe<Scalars['String']>;
  physicalTableVersion?: InputMaybe<Scalars['Long']>;
  relationship?: InputMaybe<Array<InputMaybe<Input_Callosum_LogicalRelationshipProto>>>;
  type?: InputMaybe<Callosum_LogicalTableTypeEnumProto_E>;
};

export type Input_Callosum_LogicalTableProto_LogicalTableContentProto = {
  aggregatedWorksheet?: InputMaybe<Scalars['Boolean']>;
  joinType?: InputMaybe<Callosum_LogicalRelationshipJoinTypeEnumProto_E>;
  physicalTableName?: InputMaybe<Scalars['String']>;
  worksheetType?: InputMaybe<Callosum_WorksheetTypeEnumProto_E>;
};

export type Input_Callosum_LogicalTableTypeEnumProto = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_MetadataHeaderProto = {
  authorDisplayName?: InputMaybe<Scalars['String']>;
  authorGuid?: InputMaybe<Scalars['String']>;
  authorName?: InputMaybe<Scalars['String']>;
  clientState?: InputMaybe<Input_Callosum_ClientStateProto>;
  created?: InputMaybe<Scalars['Long']>;
  databaseStripe?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  generationNum?: InputMaybe<Scalars['Long']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  idGuid?: InputMaybe<Scalars['String']>;
  lenientDiscoverability?: InputMaybe<Scalars['Boolean']>;
  metadataType?: InputMaybe<Scalars['String']>;
  modified?: InputMaybe<Scalars['Long']>;
  modifiedBy?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  ownerGuid?: InputMaybe<Scalars['String']>;
  schemaStripe?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Array<InputMaybe<Input_Callosum_MetadataHeaderProto>>>;
  type?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_MetricDefinitionProto = {
  name?: InputMaybe<Scalars['String']>;
  row?: InputMaybe<Array<InputMaybe<Input_Callosum_MetricDefinitionProto_Row>>>;
};

export type Input_Callosum_MetricDefinitionProto_Range = {
  max?: InputMaybe<Scalars['Float']>;
  min?: InputMaybe<Scalars['Float']>;
};

export type Input_Callosum_MetricDefinitionProto_Row = {
  action?: InputMaybe<Callosum_MetricDefinitionProto_Action>;
  color?: InputMaybe<Scalars['String']>;
  iconPath?: InputMaybe<Scalars['String']>;
  plotAsBand?: InputMaybe<Scalars['Boolean']>;
  range?: InputMaybe<Input_Callosum_MetricDefinitionProto_Range>;
};

export type Input_Callosum_ObjectType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_PurchaseOption = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_RequestType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_SchemaViewerProto = {
  table?: InputMaybe<Array<InputMaybe<Input_Callosum_LogicalTableProto>>>;
};

export type Input_Callosum_SearchFilterProto = {
  autoCreated?: InputMaybe<Callosum_SearchFilterProto_BoolFilterValue_E>;
  expertRequest?: InputMaybe<Callosum_SearchFilterProto_BoolFilterValue_E>;
  favorite?: InputMaybe<Callosum_SearchFilterProto_BoolFilterValue_E>;
  fetchId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  isAuthor?: InputMaybe<Callosum_SearchFilterProto_BoolFilterValue_E>;
  namePattern?: InputMaybe<Scalars['String']>;
  ownerType?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skipId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status?: InputMaybe<Callosum_SearchFilterProto_RequestStatus_E>;
  subType?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tagName?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Input_Callosum_SearchFilterProto_BoolFilterValue = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_SearchFilterProto_RequestStatus = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_SubscriptionStatus = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_SubscriptionTier = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_SubscriptionType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_UserAccountSource = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_UserPersona = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_UserPropertiesProto = {
  companyName?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  partner?: InputMaybe<Scalars['String']>;
  persona?: InputMaybe<Callosum_UserPersona_E>;
};

export type Input_Callosum_VisualizationColumnProto = {
  aggrApplied?: InputMaybe<Scalars['Boolean']>;
  aggrTypeOverride?: InputMaybe<Callosum_AggregateFunctionTypeEnumProto_E>;
  column?: InputMaybe<Input_Callosum_LogicalColumnProto>;
  dataTypeOverrde?: InputMaybe<Callosum_ColumnDataTypeEnumProto_E>;
  formatPatternOverride?: InputMaybe<Scalars['String']>;
  groupBy?: InputMaybe<Scalars['Boolean']>;
  metricDefinition?: InputMaybe<Input_Callosum_MetricDefinitionProto>;
  sageColumnId?: InputMaybe<Scalars['String']>;
  sageOutputColumnGuid?: InputMaybe<Scalars['String']>;
  sortAscending?: InputMaybe<Scalars['Boolean']>;
  sortIndex?: InputMaybe<Scalars['Int']>;
  typeOverride?: InputMaybe<Callosum_LogicalColumnProto_ColumnTypeEnumProto>;
  userSorted?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Callosum_VisualizationProto = {
  chartContent?: InputMaybe<Input_Callosum_VisualizationProto_ChartVisualizationContentProto>;
  description?: InputMaybe<Scalars['String']>;
  header?: InputMaybe<Input_Callosum_MetadataHeaderProto>;
  imageContent?: InputMaybe<Input_Callosum_VisualizationProto_ImageVisualizationContentProto>;
  markersEnabled?: InputMaybe<Scalars['Boolean']>;
  ranalysisContent?: InputMaybe<Input_Callosum_VisualizationProto_RanalysisVisualizationContentProto>;
  shareYAxis?: InputMaybe<Scalars['Boolean']>;
  tableContent?: InputMaybe<Input_Callosum_VisualizationProto_TableVisualizationContentProto>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Callosum_VisualizationProto_VisualizationTypeEnumProto>;
};

export type Input_Callosum_VisualizationProto_ChartVisualizationContentProto = {
  axisConfig?: InputMaybe<Input_Callosum_VisualizationProto_ChartVisualizationContentProto_AxisConfig>;
  chartType?: InputMaybe<Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto>;
  column?: InputMaybe<Array<InputMaybe<Input_Callosum_VisualizationColumnProto>>>;
  content?: InputMaybe<Input_Callosum_VisualizationProto_VisualizationContentProto>;
  customChartGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_VisualizationProto_ChartVisualizationContentProto_Axis = {
  guid?: InputMaybe<Scalars['String']>;
  metricDefinition?: InputMaybe<Input_Callosum_MetricDefinitionProto>;
  name?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_VisualizationProto_ChartVisualizationContentProto_AxisConfig = {
  color?: InputMaybe<Array<InputMaybe<Input_Callosum_VisualizationProto_ChartVisualizationContentProto_Axis>>>;
  legend?: InputMaybe<Array<InputMaybe<Input_Callosum_VisualizationProto_ChartVisualizationContentProto_Axis>>>;
  radial?: InputMaybe<Array<InputMaybe<Input_Callosum_VisualizationProto_ChartVisualizationContentProto_Axis>>>;
  x?: InputMaybe<Array<InputMaybe<Input_Callosum_VisualizationProto_ChartVisualizationContentProto_Axis>>>;
  y?: InputMaybe<Array<InputMaybe<Input_Callosum_VisualizationProto_ChartVisualizationContentProto_Axis>>>;
};

export type Input_Callosum_VisualizationProto_ImageVisualizationContentProto = {
  content?: InputMaybe<Input_Callosum_VisualizationProto_VisualizationContentProto>;
  rScript?: InputMaybe<Scalars['String']>;
};

export type Input_Callosum_VisualizationProto_RanalysisVisualizationContentProto = {
  content?: InputMaybe<Input_Callosum_VisualizationProto_VisualizationContentProto>;
  dataVizType?: InputMaybe<Callosum_VisualizationProto_VisualizationTypeEnumProto>;
};

export type Input_Callosum_VisualizationProto_TableVisualizationContentProto = {
  column?: InputMaybe<Array<InputMaybe<Input_Callosum_VisualizationColumnProto>>>;
  content?: InputMaybe<Input_Callosum_VisualizationProto_VisualizationContentProto>;
};

export type Input_Callosum_VisualizationProto_VisualizationContentProto = {
  dataOnDemand?: InputMaybe<Scalars['Boolean']>;
  locked?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Callosum_VisualizationQueryProto = {
  context?: InputMaybe<Input_Sage_Auto_Complete_V2_AcContext>;
  customRAnalysis?: InputMaybe<Input_Sage_AnalysisDescriptor_CustomRAnalysis>;
  descriptionSummary?: InputMaybe<Scalars['String']>;
  explanation?: InputMaybe<Input_Sage_A3InsightExplanation>;
  sageProgram?: InputMaybe<Input_Sage_Auto_Complete_V2_SageProgram>;
  serializedSageProgram?: InputMaybe<Scalars['String']>;
  tableIndex?: InputMaybe<Scalars['Int']>;
  visualization?: InputMaybe<Input_Callosum_VisualizationProto>;
};

export type Input_Callosum_WorksheetTypeEnumProto = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Common_EntityHeader = {
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  guid?: InputMaybe<Scalars['String']>;
};

export type Input_Common_FeatureFlag = {
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Input_Common_FormatingType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Common_GeometryTypeEnumProto = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Common_KeyValue = {
  deprecatedValue?: InputMaybe<Input_Common_KeyValue_DeprecatedValue>;
  description?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Input_Common_ValueProto>;
};

export type Input_Common_KeyValueList = {
  description?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Array<InputMaybe<Input_Common_ValueProto>>>;
};

export type Input_Common_KeyValueStr = {
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Input_Common_KeyValue_DeprecatedValue = {
  d?: InputMaybe<Scalars['Float']>;
  i64?: InputMaybe<Scalars['Long']>;
  s?: InputMaybe<Scalars['String']>;
};

export type Input_Common_MetaDataUpdateReqProto = {
  filePaths?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Input_Common_OnlineDistributionProto = {
  max?: InputMaybe<Scalars['String']>;
  maxSubSampleSize?: InputMaybe<Scalars['Long']>;
  mean?: InputMaybe<Scalars['Float']>;
  min?: InputMaybe<Scalars['String']>;
  sampleSize?: InputMaybe<Scalars['Long']>;
  seed?: InputMaybe<Scalars['Long']>;
  subSamples?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  varianceFactor?: InputMaybe<Scalars['Float']>;
};

export type Input_Common_SeedQuestionsKey = {
  sourceGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Common_StateKey = {
  generationNumber?: InputMaybe<Scalars['Int']>;
  transactionId?: InputMaybe<Scalars['String']>;
};

export type Input_Common_StatefulRequestInfo = {
  pinnedClientGenerationNumber?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  seedKey?: InputMaybe<Input_Common_SeedQuestionsKey>;
  stateKey?: InputMaybe<Input_Common_StateKey>;
};

export type Input_Common_StatefulResponseInfo = {
  stateKey?: InputMaybe<Input_Common_StateKey>;
};

export type Input_Common_StatusProto = {
  code?: InputMaybe<Common_ErrorCode>;
  message?: InputMaybe<Scalars['String']>;
};

export type Input_Common_UsageStatsDistributionProto = {
  onlineDistributionProto?: InputMaybe<Input_Common_OnlineDistributionProto>;
};

export type Input_Common_ValueProto = {
  b?: InputMaybe<Scalars['Boolean']>;
  d?: InputMaybe<Scalars['Float']>;
  i64?: InputMaybe<Scalars['Long']>;
  s?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Common_ValueProto_Type>;
  u64?: InputMaybe<Scalars['Long']>;
};

export type Input_Eureka_AnswerResult = {
  formatted?: InputMaybe<Input_Sage_Auto_Complete_V2_FormattedTokens>;
  header?: InputMaybe<Input_Eureka_Header>;
  preferredViz?: InputMaybe<Input_Eureka_VisualizationMetadata>;
  usageInfo?: InputMaybe<Input_Eureka_UsageInfo>;
  worksheetInfo?: InputMaybe<Array<InputMaybe<Input_Eureka_WorksheetInfo>>>;
};

export type Input_Eureka_ColumnResult = {
  name?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_ColumnValueResult = {
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_CompleteInfo = {
  requiredCompletions?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Eureka_CompleteInfo_Type>;
};

export type Input_Eureka_CompleteObjectResult = {
  authorGuid?: InputMaybe<Scalars['String']>;
  authorName?: InputMaybe<Scalars['String']>;
  guid?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parentGuid?: InputMaybe<Scalars['String']>;
  possibleObjectFilters?: InputMaybe<Array<InputMaybe<Input_Eureka_ModifyFilterGroup>>>;
  type?: InputMaybe<Eureka_CompleteObjectResult_Type>;
};

export type Input_Eureka_CompleteQueryResult = {
  fieldName?: InputMaybe<Scalars['String']>;
  fieldType?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Eureka_CompleteQueryResult_Type>;
};

export type Input_Eureka_CompleteRequest = {
  autoCompleteVersion?: InputMaybe<Eureka_CompleteRequest_AutoCompleteVersion>;
  completeInfo?: InputMaybe<Array<InputMaybe<Input_Eureka_CompleteInfo>>>;
  cursorTokenIdx?: InputMaybe<Scalars['Int']>;
  filterSelections?: InputMaybe<Array<InputMaybe<Input_Eureka_Facet>>>;
  maxCompletions?: InputMaybe<Scalars['Int']>;
  nlHandlerVersion?: InputMaybe<Eureka_NlHandlerVersion>;
  nonSharable?: InputMaybe<Scalars['Boolean']>;
  permissionGuids?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  permissionType?: InputMaybe<Eureka_Common_PermissionsType>;
  requestIdentifiers?: InputMaybe<Input_Eureka_Common_HttpClientRequestIdentifiers>;
  searchOption?: InputMaybe<Eureka_SearchRequest_SearchResultOption>;
  tokens?: InputMaybe<Array<InputMaybe<Input_Eureka_EurekaSearchToken>>>;
};

export type Input_Eureka_CompleteResponse = {
  queryResult?: InputMaybe<Array<InputMaybe<Input_Eureka_CompleteQueryResult>>>;
  requestIdentifiers?: InputMaybe<Input_Eureka_Common_HttpClientRequestIdentifiers>;
  result?: InputMaybe<Array<InputMaybe<Input_Eureka_CompleteResult>>>;
  tokens?: InputMaybe<Array<InputMaybe<Input_Eureka_EurekaSearchToken>>>;
};

export type Input_Eureka_CompleteResult = {
  columnResult?: InputMaybe<Input_Eureka_ColumnResult>;
  columnValueResult?: InputMaybe<Input_Eureka_ColumnValueResult>;
  debugInfo?: InputMaybe<Scalars['String']>;
  isRecentlyViewed?: InputMaybe<Scalars['Boolean']>;
  numPrefixTokens?: InputMaybe<Scalars['Int']>;
  numSuffixTokens?: InputMaybe<Scalars['Int']>;
  objectResult?: InputMaybe<Input_Eureka_CompleteObjectResult>;
  objectSecurityInfo?: InputMaybe<Input_Eureka_CompleteResult_ObjectSecurityInfo>;
  score?: InputMaybe<Scalars['Float']>;
  token?: InputMaybe<Input_Eureka_EurekaSearchToken>;
  type?: InputMaybe<Eureka_CompleteInfo_Type>;
  userResult?: InputMaybe<Input_Eureka_UserResult>;
  viewCount?: InputMaybe<Scalars['Int']>;
};

export type Input_Eureka_CompleteResult_ObjectSecurityInfo = {
  isD13ySourced?: InputMaybe<Scalars['Boolean']>;
  objectId?: InputMaybe<Scalars['String']>;
  objectIdForDeletionCheck?: InputMaybe<Scalars['String']>;
  objectType?: InputMaybe<Scalars['String']>;
  objectTypeForDeletionCheck?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_EurekaSearchToken = {
  guid?: InputMaybe<Scalars['String']>;
  highlights?: InputMaybe<Array<InputMaybe<Input_Eureka_EurekaSearchToken_Range>>>;
  type?: InputMaybe<Eureka_EurekaSearchToken_Type>;
  value?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_EurekaSearchToken_Range = {
  end?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Input_Eureka_Facet = {
  facetType?: InputMaybe<Eureka_FacetType>;
  facetValue?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  facetValues?: InputMaybe<Array<InputMaybe<Input_Eureka_FacetValue>>>;
};

export type Input_Eureka_FacetValue = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resultCount?: InputMaybe<Scalars['Int']>;
};

export type Input_Eureka_FeedbackMetadata = {
  columnsUsedInQuery?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  genNo?: InputMaybe<Scalars['Int']>;
  isOrgAdminUser?: InputMaybe<Scalars['Boolean']>;
  isWorksheetAuthor?: InputMaybe<Scalars['Boolean']>;
  sessionId?: InputMaybe<Scalars['String']>;
  worksheetId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_FragmentPayload = {
  genNo?: InputMaybe<Scalars['Int']>;
  isSubmitted?: InputMaybe<Scalars['Boolean']>;
  nlQueryFragment?: InputMaybe<Scalars['String']>;
  phrase?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_PhraseDefinition>>>;
  rating?: InputMaybe<Eureka_SearchResultRelevanceFeedback_Rating>;
  sessionId?: InputMaybe<Scalars['String']>;
  sqlQuery?: InputMaybe<Scalars['String']>;
  stateKey?: InputMaybe<Input_Sage_Auto_Complete_V2_AcStateKey>;
  token?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
};

export type Input_Eureka_GetNlQueryFeedbackRequest = {
  groupBy?: InputMaybe<Eureka_GetNlQueryFeedbackRequest_GroupBy>;
  nlQuery?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Eureka_FeedbackScope>;
  type?: InputMaybe<Eureka_GetNlQueryFeedbackRequest_Type>;
  userId?: InputMaybe<Scalars['String']>;
  worksheetId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_GetNlQueryFeedbackResponse = {
  nlQueryInfo?: InputMaybe<Array<InputMaybe<Input_Eureka_NlQueryInfo>>>;
};

export type Input_Eureka_GetQuestionFragmentsRequest = {
  acContext?: InputMaybe<Scalars['String']>;
  genNo?: InputMaybe<Scalars['Int']>;
  nlHandlerVersion?: InputMaybe<Eureka_NlHandlerVersion>;
  nlQuery?: InputMaybe<Scalars['String']>;
  requestId?: InputMaybe<Scalars['String']>;
  sessionId?: InputMaybe<Scalars['String']>;
  sqlQuery?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_GetQuestionFragmentsResponse = {
  errorMessage?: InputMaybe<Scalars['String']>;
  fragmentPayload?: InputMaybe<Array<InputMaybe<Input_Eureka_FragmentPayload>>>;
  worksheetId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_Header = {
  authorGuid?: InputMaybe<Scalars['String']>;
  authorName?: InputMaybe<Scalars['String']>;
  createdOn?: InputMaybe<Scalars['Long']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_ImpressionSearchRequest = {
  endEpochMs?: InputMaybe<Scalars['Long']>;
  event?: InputMaybe<Array<InputMaybe<Eureka_ImpressionSearchRequest_EventType>>>;
  objectId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startEpochMs?: InputMaybe<Scalars['Long']>;
};

export type Input_Eureka_ImpressionSearchResponse = {
  impressionCount?: InputMaybe<Scalars['Int']>;
};

export type Input_Eureka_MatchCriteria = {
  columnId?: InputMaybe<Scalars['String']>;
  keywordMatchCriterion?: InputMaybe<Input_Eureka_MatchCriteria_KeywordMatchCriterion>;
  objectTypeCriterion?: InputMaybe<Input_Eureka_MatchCriteria_ObjectTypeCriterion>;
  phraseCountMatchCriterion?: InputMaybe<Input_Eureka_MatchCriteria_PhraseCountCriterion>;
  phraseMatchCriterion?: InputMaybe<Input_Eureka_MatchCriteria_PhraseMatchCriterion>;
  worksheetId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_MatchCriteria_KeywordMatchCriterion = {
  keyword?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Input_Eureka_MatchCriteria_ObjectTypeCriterion = {
  objectType?: InputMaybe<Array<InputMaybe<Eureka_MatchCriteria_ObjectTypeCriterion_ObjectType>>>;
};

export type Input_Eureka_MatchCriteria_PhraseCountCriterion = {
  maxPhraseCount?: InputMaybe<Scalars['Int']>;
  minPhraseCount?: InputMaybe<Scalars['Int']>;
};

export type Input_Eureka_MatchCriteria_PhraseMatchCriterion = {
  phraseType?: InputMaybe<Array<InputMaybe<Sage_PhraseType_E>>>;
};

export type Input_Eureka_ModifyFilterGroup = {
  columnGuid?: InputMaybe<Scalars['String']>;
  op?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_NlQueryInfo = {
  downvoteCount?: InputMaybe<Scalars['Long']>;
  fixedPhrase?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_PhraseDefinition>>>;
  fixedToken?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
  id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  modifiedAt?: InputMaybe<Scalars['Long']>;
  nlQuery?: InputMaybe<Scalars['String']>;
  originalPhrase?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_PhraseDefinition>>>;
  originalToken?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
  parentQuery?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  reviewerId?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Eureka_FeedbackScope>;
  tmlTokensUsed?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  upvoteCount?: InputMaybe<Scalars['Long']>;
  useCount?: InputMaybe<Scalars['Long']>;
  user?: InputMaybe<Input_Sage_EntityHeader>;
  worksheet?: InputMaybe<Input_Sage_EntityHeader>;
};

export type Input_Eureka_OverviewRequest = {
  exclude?: InputMaybe<Array<InputMaybe<Input_Eureka_MatchCriteria>>>;
  include?: InputMaybe<Array<InputMaybe<Input_Eureka_MatchCriteria>>>;
};

export type Input_Eureka_PinboardResult = {
  answers?: InputMaybe<Array<InputMaybe<Input_Eureka_AnswerResult>>>;
  header?: InputMaybe<Input_Eureka_Header>;
  usageInfo?: InputMaybe<Input_Eureka_UsageInfo>;
  vizCount?: InputMaybe<Input_Eureka_VizCount>;
};

export type Input_Eureka_PinboardVizResult = {
  answer?: InputMaybe<Input_Eureka_AnswerResult>;
  pinboardHeader?: InputMaybe<Input_Eureka_Header>;
};

export type Input_Eureka_PutNlQueryFeedbackRequest = {
  delete?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  scope?: InputMaybe<Eureka_FeedbackScope>;
};

export type Input_Eureka_PutNlQueryFeedbackResponse = {
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  isUpdated?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Eureka_RelevanceFeedbackRequest = {
  appliedFacets?: InputMaybe<Array<InputMaybe<Input_Eureka_Facet>>>;
  fixedPhrase?: InputMaybe<Array<InputMaybe<Input_Eureka_RelevanceFeedbackRequest_EurekaPhrase>>>;
  metadata?: InputMaybe<Input_Eureka_FeedbackMetadata>;
  parentQuery?: InputMaybe<Scalars['String']>;
  permissionGuids?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  query?: InputMaybe<Scalars['String']>;
  requestId?: InputMaybe<Scalars['String']>;
  resultRelevanceFeedback?: InputMaybe<Input_Eureka_SearchResultRelevanceFeedback>;
  sageTokensSuggested?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sageTokensUsed?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  searchOption?: InputMaybe<Eureka_SearchRequest_SearchResultOption>;
  searcherVersion?: InputMaybe<Eureka_SearchRequest_SearcherVersion>;
  selectedResult?: InputMaybe<Input_Eureka_Header>;
  sqlQuery?: InputMaybe<Scalars['String']>;
  tmlTokensUsed?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Input_Eureka_RelevanceFeedbackRequest_EurekaPhrase = {
  isCompletePhrase?: InputMaybe<Scalars['Boolean']>;
  numTokens?: InputMaybe<Scalars['Int']>;
  phraseType?: InputMaybe<Sage_PhraseType_E>;
  startIndex?: InputMaybe<Scalars['Int']>;
};

export type Input_Eureka_RelevanceFeedbackResponse = {
  status?: InputMaybe<Input_Common_StatusProto>;
};

export type Input_Eureka_Result = {
  debugInfo?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  objectSecurityInfo?: InputMaybe<Input_Eureka_Result_ObjectSecurityInfo>;
  resultType?: InputMaybe<Eureka_Result_ResultType>;
  sageQuery?: InputMaybe<Scalars['String']>;
  score?: InputMaybe<Scalars['Float']>;
  searchAnswer?: InputMaybe<Input_Eureka_AnswerResult>;
  searchPinboard?: InputMaybe<Input_Eureka_PinboardResult>;
  searchPinboardViz?: InputMaybe<Input_Eureka_PinboardVizResult>;
  snippetInfo?: InputMaybe<Input_Eureka_SnippetInfo>;
};

export type Input_Eureka_Result_ObjectSecurityInfo = {
  isD13ySourced?: InputMaybe<Scalars['Boolean']>;
  objectId?: InputMaybe<Scalars['String']>;
  objectIdForDeletionCheck?: InputMaybe<Scalars['String']>;
  objectType?: InputMaybe<Scalars['String']>;
  objectTypeForDeletionCheck?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Input_Eureka_SageQuerySuggestion = {
  cached?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  genNo?: InputMaybe<Scalars['Int']>;
  sessionId?: InputMaybe<Scalars['String']>;
  sqlQuery?: InputMaybe<Scalars['String']>;
  stateKey?: InputMaybe<Input_Sage_Auto_Complete_V2_AcStateKey>;
  title?: InputMaybe<Scalars['String']>;
  tmlTokens?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tokens?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  worksheetId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_SearchRequest = {
  batchSize?: InputMaybe<Scalars['Int']>;
  currentPageNumber?: InputMaybe<Scalars['Int']>;
  desiredFacets?: InputMaybe<Array<InputMaybe<Input_Eureka_Facet>>>;
  facetSelections?: InputMaybe<Array<InputMaybe<Input_Eureka_Facet>>>;
  filterSelections?: InputMaybe<Array<InputMaybe<Input_Eureka_Facet>>>;
  maxPinboardVizCount?: InputMaybe<Scalars['Int']>;
  nlHandlerVersion?: InputMaybe<Eureka_NlHandlerVersion>;
  nonSharable?: InputMaybe<Scalars['Boolean']>;
  numRewrittenQueries?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  overviewRequest?: InputMaybe<Input_Eureka_OverviewRequest>;
  permissionGuids?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  permissionType?: InputMaybe<Eureka_Common_PermissionsType>;
  query?: InputMaybe<Scalars['String']>;
  removeDuplicates?: InputMaybe<Scalars['Boolean']>;
  requestIdentifiers?: InputMaybe<Input_Eureka_Common_HttpClientRequestIdentifiers>;
  searchOption?: InputMaybe<Eureka_SearchRequest_SearchResultOption>;
  searcherVersion?: InputMaybe<Eureka_SearchRequest_SearcherVersion>;
  sortBy?: InputMaybe<Array<InputMaybe<Input_Eureka_SearchRequest_SortBy>>>;
  source?: InputMaybe<Eureka_SearchRequest_Source>;
  worksheetFacetPayload?: InputMaybe<Input_Eureka_WorksheetFacetPayload>;
};

export type Input_Eureka_SearchRequest_SortBy = {
  sortOnType?: InputMaybe<Eureka_SearchRequest_SortOnType>;
  sortOrder?: InputMaybe<Eureka_SearchRequest_SortOrder>;
};

export type Input_Eureka_SearchResponse = {
  aiAnswerState?: InputMaybe<Eureka_AiAnswerState>;
  batchSizeRequired?: InputMaybe<Scalars['Int']>;
  facets?: InputMaybe<Array<InputMaybe<Input_Eureka_Facet>>>;
  isFinalPage?: InputMaybe<Scalars['Boolean']>;
  nextPageOffset?: InputMaybe<Scalars['Int']>;
  nlToSqlMappingIds?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  requestIdentifiers?: InputMaybe<Input_Eureka_Common_HttpClientRequestIdentifiers>;
  results?: InputMaybe<Array<InputMaybe<Input_Eureka_Result>>>;
  rewrittenQueries?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sageQuerySuggestions?: InputMaybe<Array<InputMaybe<Input_Eureka_SageQuerySuggestion>>>;
  totalFacetResultCount?: InputMaybe<Scalars['Int']>;
  totalResults?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_SearchResultRelevanceFeedback = {
  comment?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<Eureka_SearchResultRelevanceFeedback_Rating>;
};

export type Input_Eureka_SnippetInfo = {
  descriptionSnippet?: InputMaybe<Input_Eureka_SnippetInfo_Snippet>;
  sageQuerySnippet?: InputMaybe<Input_Sage_Auto_Complete_V2_FormattedTokens>;
  sageQuerySnippetWithHighlights?: InputMaybe<Array<InputMaybe<Input_Eureka_SnippetInfo_SageSnippet>>>;
  titleSnippet?: InputMaybe<Input_Eureka_SnippetInfo_Snippet>;
};

export type Input_Eureka_SnippetInfo_Range = {
  end?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Input_Eureka_SnippetInfo_SageSnippet = {
  highlights?: InputMaybe<Array<InputMaybe<Input_Eureka_SnippetInfo_Range>>>;
  phraseType?: InputMaybe<Sage_PhraseType_E>;
  phraseValue?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_SnippetInfo_Snippet = {
  highlights?: InputMaybe<Array<InputMaybe<Input_Eureka_SnippetInfo_Range>>>;
  snippetString?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_TenantSearchIndexProbeRequest = {
  requestId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_TenantSearchIndexProbeResponse = {
  metadataIndexCreated?: InputMaybe<Scalars['Boolean']>;
  numPinboardsIndexed?: InputMaybe<Scalars['Int']>;
  numSavedAnswersIndexed?: InputMaybe<Scalars['Int']>;
  numUsersPermissionsIndexed?: InputMaybe<Scalars['Int']>;
  numVisualizationIndexed?: InputMaybe<Scalars['Int']>;
  searchHistoryIndexCreated?: InputMaybe<Scalars['Boolean']>;
  userPermissionsIndexCreated?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Eureka_UsageInfo = {
  favouriteCount?: InputMaybe<Scalars['Int']>;
  viewCount?: InputMaybe<Scalars['Int']>;
};

export type Input_Eureka_UserResult = {
  guid?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_VisualizationMetadata = {
  chartType?: InputMaybe<Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto>;
  vizSnapshotRequestData?: InputMaybe<Input_Eureka_VizSnapshotRequestData>;
  vizType?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_VizCount = {
  charts?: InputMaybe<Scalars['Int']>;
  metrics?: InputMaybe<Scalars['Int']>;
  tables?: InputMaybe<Scalars['Int']>;
};

export type Input_Eureka_VizSnapshotRequestData = {
  parentReportbookGuid?: InputMaybe<Scalars['String']>;
  parentType?: InputMaybe<Eureka_ParentType>;
  version?: InputMaybe<Scalars['Int']>;
  vizGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_WorksheetFacetPayload = {
  columnDetails?: InputMaybe<Array<InputMaybe<Input_Eureka_WorksheetFacetPayload_ColumnDetail>>>;
  metadataVersion?: InputMaybe<Scalars['String']>;
  worksheetId?: InputMaybe<Scalars['String']>;
  worksheetName?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_WorksheetFacetPayload_ColumnDetail = {
  colType?: InputMaybe<Sage_ColumnType_E>;
  columnDescription?: InputMaybe<Scalars['String']>;
  columnName?: InputMaybe<Scalars['String']>;
  dataType?: InputMaybe<Callosum_ColumnDataTypeEnumProto_E>;
  guid?: InputMaybe<Scalars['String']>;
  referencedByQueryHypothesis?: InputMaybe<Scalars['Boolean']>;
  sampleValueToRecognizedToken?: InputMaybe<Array<InputMaybe<Input_Eureka_WorksheetFacetPayload_ColumnDetail_SampleValueToRecognizedTokenEntry>>>;
  sampleValues?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sourceQueryTerm?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  synonyms?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Input_Eureka_WorksheetFacetPayload_ColumnDetail_SampleValueToRecognizedTokenEntry = {
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>;
};

export type Input_Eureka_WorksheetInfo = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_Agent_ColumnSynonymRequest = {
  description?: InputMaybe<Scalars['String']>;
  logicalColumnId?: InputMaybe<Scalars['String']>;
  synonyms?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Input_Eureka_Agent_DebugInfo = {
  requestId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_Agent_Query = {
  count?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_Agent_ResolveTokenRequest = {
  permissionGuids?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  permissionType?: InputMaybe<Eureka_Common_PermissionsType>;
  resolveType?: InputMaybe<Eureka_Agent_ResolveTokenRequest_ResolveType>;
  synonymRequest?: InputMaybe<Input_Eureka_Agent_SynonymRequest>;
  token?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_Agent_ResolveTokenResponse = {
  status?: InputMaybe<Eureka_Agent_ResolveTokenResponse_Status>;
};

export type Input_Eureka_Agent_SynonymInfo = {
  id?: InputMaybe<Scalars['String']>;
  resolutionType?: InputMaybe<Eureka_Agent_SynonymInfo_ResolutionType>;
  synonymPhrase?: InputMaybe<Scalars['String']>;
  tenantId?: InputMaybe<Scalars['String']>;
  transactionId?: InputMaybe<Scalars['String']>;
  worksheetId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_Agent_SynonymRequest = {
  apiTimestamp?: InputMaybe<Scalars['Long']>;
  clusterId?: InputMaybe<Scalars['String']>;
  columnSynonymRequests?: InputMaybe<Array<InputMaybe<Input_Eureka_Agent_ColumnSynonymRequest>>>;
  debugInfo?: InputMaybe<Input_Eureka_Agent_DebugInfo>;
  transactionDescription?: InputMaybe<Input_Eureka_Agent_TransactionDescription>;
  transactionId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  worksheetId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_Agent_SynonymRequestStatus = {
  clusterId?: InputMaybe<Scalars['String']>;
  debugInfo?: InputMaybe<Input_Eureka_Agent_DebugInfo>;
  status?: InputMaybe<Input_Common_StatusProto>;
  transactionId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_Agent_TokenInfo = {
  queries?: InputMaybe<Array<InputMaybe<Input_Eureka_Agent_Query>>>;
  queryCount?: InputMaybe<Scalars['Int']>;
  tokenValue?: InputMaybe<Scalars['String']>;
  userCount?: InputMaybe<Scalars['Int']>;
};

export type Input_Eureka_Agent_TokensRequest = {
  permissionGuids?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  permissionType?: InputMaybe<Eureka_Common_PermissionsType>;
  tokenType?: InputMaybe<Eureka_Agent_TokenType>;
  tokenValue?: InputMaybe<Scalars['String']>;
  worksheetId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_Agent_TokensResponse = {
  tokenType?: InputMaybe<Eureka_Agent_TokenType>;
  tokens?: InputMaybe<Array<InputMaybe<Input_Eureka_Agent_TokenInfo>>>;
};

export type Input_Eureka_Agent_Transaction = {
  actionType?: InputMaybe<Eureka_Agent_Transaction_ActionType>;
  status?: InputMaybe<Eureka_Agent_Transaction_Status>;
  synonymRequest?: InputMaybe<Input_Eureka_Agent_SynonymRequest>;
  tenantId?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Long']>;
  transactionId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_Agent_TransactionDescription = {
  ignoreTokenDescription?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_Agent_UnresolvedTokenInfo = {
  tenantId?: InputMaybe<Scalars['String']>;
  tokenInfo?: InputMaybe<Array<InputMaybe<Input_Eureka_Agent_TokenInfo>>>;
  worsheetId?: InputMaybe<Scalars['String']>;
};

export type Input_Eureka_Common_HttpClientRequestIdentifiers = {
  apiRequestId?: InputMaybe<Scalars['String']>;
  appActivityId?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_AggregateOp = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_ClientContext = {
  clientId?: InputMaybe<Scalars['String']>;
  isInternal?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_ColumnDefinition = {
  column?: InputMaybe<Input_Falcon_ColumnDefinition_Column>;
  displayName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  userAnnotation?: InputMaybe<Input_Falcon_DeprecatedUserAnnotation>;
};

export type Input_Falcon_ColumnDefinition_Column = {
  columnDisplayName?: InputMaybe<Scalars['String']>;
  columnName?: InputMaybe<Scalars['String']>;
  columnSchemaName?: InputMaybe<Scalars['String']>;
  tableDisplayName?: InputMaybe<Scalars['String']>;
  tableName?: InputMaybe<Scalars['String']>;
  userSchemaDisplayName?: InputMaybe<Scalars['String']>;
  userSchemaName?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_ColumnStatsProto = {
  cardinality?: InputMaybe<Input_Util_CardinalityEstimatorProto>;
  estimatedCardinality?: InputMaybe<Scalars['Long']>;
  max?: InputMaybe<Input_Falcon_ValueProto>;
  min?: InputMaybe<Input_Falcon_ValueProto>;
  numNulls?: InputMaybe<Scalars['Long']>;
  total?: InputMaybe<Scalars['Long']>;
};

export type Input_Falcon_CompressionScheme = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_ConstantValue = {
  boolVal?: InputMaybe<Scalars['Boolean']>;
  doubleVal?: InputMaybe<Scalars['Float']>;
  floatVal?: InputMaybe<Scalars['Float']>;
  int32Val?: InputMaybe<Scalars['Int']>;
  int64Val?: InputMaybe<Scalars['Long']>;
  normalize?: InputMaybe<Scalars['Boolean']>;
  nullType?: InputMaybe<Falcon_ValueProto_Type>;
  nullVal?: InputMaybe<Scalars['Boolean']>;
  stringVal?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_DataType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_DatepartDefinition = {
  calendarTable?: InputMaybe<Input_Falcon_TableHeaderProto>;
  lookupColumnTag?: InputMaybe<Scalars['String']>;
  partColumnTag?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_Definitions = {
  columns?: InputMaybe<Array<InputMaybe<Input_Falcon_ColumnDefinition>>>;
  expressions?: InputMaybe<Array<InputMaybe<Input_Falcon_ExpressionDefinition>>>;
  expressionsOld?: InputMaybe<Array<InputMaybe<Input_Falcon_ExpressionDefinitionList>>>;
  values?: InputMaybe<Array<InputMaybe<Input_Falcon_ValueDefinition>>>;
};

export type Input_Falcon_DeprecatedUserAnnotation = {
  type?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_EncodedFileNameProto = {
  dataVersion?: InputMaybe<Array<InputMaybe<Input_Falcon_EncodedFileNameProto_DataVersionRange>>>;
};

export type Input_Falcon_EncodedFileNameProto_DataVersionRange = {
  from?: InputMaybe<Scalars['Long']>;
  schemaVersion?: InputMaybe<Scalars['Long']>;
  to?: InputMaybe<Scalars['Long']>;
};

export type Input_Falcon_EncodedFileNameSharedProto = {
  dataDirPrefix?: InputMaybe<Scalars['String']>;
  dataFilePrefix?: InputMaybe<Scalars['String']>;
  db?: InputMaybe<Scalars['String']>;
  partition?: InputMaybe<Scalars['Long']>;
  schemaVersion?: InputMaybe<Scalars['Long']>;
  table?: InputMaybe<Scalars['String']>;
  userSchema?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_ExpressionDefinition = {
  dataType?: InputMaybe<Falcon_DataType_E>;
  datepart?: InputMaybe<Input_Falcon_DatepartDefinition>;
  displayName?: InputMaybe<Scalars['String']>;
  function?: InputMaybe<Falcon_AggregateOp_E>;
  leftNodeTag?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  op?: InputMaybe<Falcon_ExpressionOp_E>;
  operandTag?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  partitionOver?: InputMaybe<Input_Falcon_PartitionOverDefinition>;
  rightNodeTag?: InputMaybe<Scalars['String']>;
  subqueryRef?: InputMaybe<Input_Falcon_SubqueryRefDefinition>;
  userAnnotation?: InputMaybe<Input_Falcon_DeprecatedUserAnnotation>;
  withinGroup?: InputMaybe<Input_Falcon_WithinGroupDefinition>;
};

export type Input_Falcon_ExpressionDefinitionList = {
  nodes?: InputMaybe<Array<InputMaybe<Input_Falcon_ExpressionDefinition>>>;
};

export type Input_Falcon_ExpressionOp = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_FullyQualifiedNameProto = {
  databaseName?: InputMaybe<Scalars['String']>;
  tableName?: InputMaybe<Scalars['String']>;
  userSchemaName?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_MultiPartNameProto = {
  alias?: InputMaybe<Scalars['String']>;
  columnId?: InputMaybe<Input_Falcon_ObjectId>;
  dbId?: InputMaybe<Input_Falcon_ObjectId>;
  tableId?: InputMaybe<Input_Falcon_ObjectId>;
  userSchemaId?: InputMaybe<Input_Falcon_ObjectId>;
};

export type Input_Falcon_MultiPartTableNameProto = {
  alias?: InputMaybe<Scalars['String']>;
  dbId?: InputMaybe<Input_Falcon_ObjectId>;
  tableId?: InputMaybe<Input_Falcon_ObjectId>;
  userSchemaId?: InputMaybe<Input_Falcon_ObjectId>;
};

export type Input_Falcon_ObjectId = {
  guid?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_ObjectSummary = {
  createdBy?: InputMaybe<Scalars['String']>;
  createdOn?: InputMaybe<Scalars['Long']>;
  description?: InputMaybe<Scalars['String']>;
  lastModifiedBy?: InputMaybe<Scalars['String']>;
  lastModifiedOn?: InputMaybe<Scalars['Long']>;
  lastRefreshEnqueuedTime?: InputMaybe<Scalars['Long']>;
  lastRefreshStartTime?: InputMaybe<Scalars['Long']>;
  lastRefreshTime?: InputMaybe<Scalars['Long']>;
  lastRefreshTimeTaken?: InputMaybe<Scalars['Long']>;
};

export type Input_Falcon_PartitionOverDefinition = {
  orderBy?: InputMaybe<Array<InputMaybe<Input_Falcon_PartitionOverDefinition_OrderingColumn>>>;
  partitionBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  window?: InputMaybe<Input_Falcon_PartitionWindow>;
};

export type Input_Falcon_PartitionOverDefinition_OrderingColumn = {
  ascending?: InputMaybe<Scalars['Boolean']>;
  column?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_PartitionWindow = {
  end?: InputMaybe<Input_Falcon_PartitionWindow_Point>;
  start?: InputMaybe<Input_Falcon_PartitionWindow_Point>;
  windowType?: InputMaybe<Falcon_PartitionWindow_WindowType>;
};

export type Input_Falcon_PartitionWindow_Point = {
  n?: InputMaybe<Scalars['Long']>;
  type?: InputMaybe<Falcon_PartitionWindow_PointType>;
};

export type Input_Falcon_SubqueryRefDefinition = {
  subqueryColumnTag?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subqueryTableGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_TableHeaderProto = {
  dataVersion?: InputMaybe<Scalars['Long']>;
  guid?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  schemaVersion?: InputMaybe<Scalars['Long']>;
};

export type Input_Falcon_TableRowProto = {
  value?: InputMaybe<Array<InputMaybe<Input_Falcon_ValueProto>>>;
};

export type Input_Falcon_TableStatsProto = {
  column?: InputMaybe<Array<InputMaybe<Input_Falcon_TableStatsProto_Column>>>;
};

export type Input_Falcon_TableStatsProto_Column = {
  id?: InputMaybe<Input_Falcon_ObjectId>;
  stats?: InputMaybe<Input_Falcon_ColumnStatsProto>;
};

export type Input_Falcon_TableVersionInfo = {
  alias?: InputMaybe<Scalars['String']>;
  dataVersion?: InputMaybe<Scalars['Int']>;
  schemaVersion?: InputMaybe<Scalars['Int']>;
  table?: InputMaybe<Scalars['String']>;
};

export type Input_Falcon_UpdatePolicy = {
  mode?: InputMaybe<Falcon_UpdatePolicy_Mode>;
};

export type Input_Falcon_ValueDefinition = {
  displayName?: InputMaybe<Scalars['String']>;
  internal?: InputMaybe<Input_Falcon_ValueDefinition_Internal>;
  name?: InputMaybe<Scalars['String']>;
  userAnnotation?: InputMaybe<Input_Falcon_DeprecatedUserAnnotation>;
  value?: InputMaybe<Input_Falcon_ConstantValue>;
};

export type Input_Falcon_ValueDefinition_Internal = {
  vproto?: InputMaybe<Input_Falcon_ValueProto>;
};

export type Input_Falcon_ValueProto = {
  b?: InputMaybe<Scalars['Boolean']>;
  caseBytes?: InputMaybe<Scalars['String']>;
  d?: InputMaybe<Scalars['Float']>;
  i?: InputMaybe<Scalars['Long']>;
  null?: InputMaybe<Scalars['Boolean']>;
  s?: InputMaybe<Scalars['String']>;
  scaseStrlen?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Falcon_ValueProto_Type>;
};

export type Input_Falcon_WithinGroupDefinition = {
  orderBy?: InputMaybe<Array<InputMaybe<Input_Falcon_WithinGroupDefinition_OrderingColumn>>>;
};

export type Input_Falcon_WithinGroupDefinition_OrderingColumn = {
  ascending?: InputMaybe<Scalars['Boolean']>;
  column?: InputMaybe<Scalars['String']>;
};

export type Input_Google_Protobuf_DescriptorProto = {
  enumType?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_EnumDescriptorProto>>>;
  extension?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_FieldDescriptorProto>>>;
  extensionRange?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_DescriptorProto_ExtensionRange>>>;
  field?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_FieldDescriptorProto>>>;
  name?: InputMaybe<Scalars['String']>;
  nestedType?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_DescriptorProto>>>;
  oneofDecl?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_OneofDescriptorProto>>>;
  options?: InputMaybe<Input_Google_Protobuf_MessageOptions>;
  reservedName?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  reservedRange?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_DescriptorProto_ReservedRange>>>;
};

export type Input_Google_Protobuf_DescriptorProto_ExtensionRange = {
  end?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<Input_Google_Protobuf_ExtensionRangeOptions>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Input_Google_Protobuf_DescriptorProto_ReservedRange = {
  end?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Input_Google_Protobuf_EnumDescriptorProto = {
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Input_Google_Protobuf_EnumOptions>;
  reservedName?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  reservedRange?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_EnumDescriptorProto_EnumReservedRange>>>;
  value?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_EnumValueDescriptorProto>>>;
};

export type Input_Google_Protobuf_EnumDescriptorProto_EnumReservedRange = {
  end?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Input_Google_Protobuf_EnumOptions = {
  allowAlias?: InputMaybe<Scalars['Boolean']>;
  deprecated?: InputMaybe<Scalars['Boolean']>;
  uninterpretedOption?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_UninterpretedOption>>>;
};

export type Input_Google_Protobuf_EnumValueDescriptorProto = {
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<Input_Google_Protobuf_EnumValueOptions>;
};

export type Input_Google_Protobuf_EnumValueOptions = {
  deprecated?: InputMaybe<Scalars['Boolean']>;
  uninterpretedOption?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_UninterpretedOption>>>;
};

export type Input_Google_Protobuf_ExtensionRangeOptions = {
  uninterpretedOption?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_UninterpretedOption>>>;
};

export type Input_Google_Protobuf_FieldDescriptorProto = {
  defaultValue?: InputMaybe<Scalars['String']>;
  extendee?: InputMaybe<Scalars['String']>;
  jsonName?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Google_Protobuf_FieldDescriptorProto_Label>;
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
  oneofIndex?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<Input_Google_Protobuf_FieldOptions>;
  proto3Optional?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Google_Protobuf_FieldDescriptorProto_Type>;
  typeName?: InputMaybe<Scalars['String']>;
};

export type Input_Google_Protobuf_FieldOptions = {
  ctype?: InputMaybe<Google_Protobuf_FieldOptions_CType>;
  deprecated?: InputMaybe<Scalars['Boolean']>;
  jstype?: InputMaybe<Google_Protobuf_FieldOptions_JsType>;
  lazy?: InputMaybe<Scalars['Boolean']>;
  packed?: InputMaybe<Scalars['Boolean']>;
  uninterpretedOption?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_UninterpretedOption>>>;
  unverifiedLazy?: InputMaybe<Scalars['Boolean']>;
  weak?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Google_Protobuf_FileDescriptorProto = {
  dependency?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  enumType?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_EnumDescriptorProto>>>;
  extension?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_FieldDescriptorProto>>>;
  messageType?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_DescriptorProto>>>;
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Input_Google_Protobuf_FileOptions>;
  package?: InputMaybe<Scalars['String']>;
  publicDependency?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  service?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_ServiceDescriptorProto>>>;
  sourceCodeInfo?: InputMaybe<Input_Google_Protobuf_SourceCodeInfo>;
  syntax?: InputMaybe<Scalars['String']>;
  weakDependency?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type Input_Google_Protobuf_FileDescriptorSet = {
  file?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_FileDescriptorProto>>>;
};

export type Input_Google_Protobuf_FileOptions = {
  ccEnableArenas?: InputMaybe<Scalars['Boolean']>;
  ccGenericServices?: InputMaybe<Scalars['Boolean']>;
  csharpNamespace?: InputMaybe<Scalars['String']>;
  deprecated?: InputMaybe<Scalars['Boolean']>;
  goPackage?: InputMaybe<Scalars['String']>;
  javaGenerateEqualsAndHash?: InputMaybe<Scalars['Boolean']>;
  javaGenericServices?: InputMaybe<Scalars['Boolean']>;
  javaMultipleFiles?: InputMaybe<Scalars['Boolean']>;
  javaOuterClassname?: InputMaybe<Scalars['String']>;
  javaPackage?: InputMaybe<Scalars['String']>;
  javaStringCheckUtf8?: InputMaybe<Scalars['Boolean']>;
  objcClassPrefix?: InputMaybe<Scalars['String']>;
  optimizeFor?: InputMaybe<Google_Protobuf_FileOptions_OptimizeMode>;
  phpClassPrefix?: InputMaybe<Scalars['String']>;
  phpGenericServices?: InputMaybe<Scalars['Boolean']>;
  phpMetadataNamespace?: InputMaybe<Scalars['String']>;
  phpNamespace?: InputMaybe<Scalars['String']>;
  pyGenericServices?: InputMaybe<Scalars['Boolean']>;
  rubyPackage?: InputMaybe<Scalars['String']>;
  swiftPrefix?: InputMaybe<Scalars['String']>;
  uninterpretedOption?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_UninterpretedOption>>>;
};

export type Input_Google_Protobuf_GeneratedCodeInfo = {
  annotation?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_GeneratedCodeInfo_Annotation>>>;
};

export type Input_Google_Protobuf_GeneratedCodeInfo_Annotation = {
  begin?: InputMaybe<Scalars['Int']>;
  end?: InputMaybe<Scalars['Int']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sourceFile?: InputMaybe<Scalars['String']>;
};

export type Input_Google_Protobuf_MessageOptions = {
  deprecated?: InputMaybe<Scalars['Boolean']>;
  mapEntry?: InputMaybe<Scalars['Boolean']>;
  messageSetWireFormat?: InputMaybe<Scalars['Boolean']>;
  noStandardDescriptorAccessor?: InputMaybe<Scalars['Boolean']>;
  uninterpretedOption?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_UninterpretedOption>>>;
};

export type Input_Google_Protobuf_MethodDescriptorProto = {
  clientStreaming?: InputMaybe<Scalars['Boolean']>;
  inputType?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Input_Google_Protobuf_MethodOptions>;
  outputType?: InputMaybe<Scalars['String']>;
  serverStreaming?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Google_Protobuf_MethodOptions = {
  deprecated?: InputMaybe<Scalars['Boolean']>;
  idempotencyLevel?: InputMaybe<Google_Protobuf_MethodOptions_IdempotencyLevel>;
  uninterpretedOption?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_UninterpretedOption>>>;
};

export type Input_Google_Protobuf_OneofDescriptorProto = {
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Input_Google_Protobuf_OneofOptions>;
};

export type Input_Google_Protobuf_OneofOptions = {
  uninterpretedOption?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_UninterpretedOption>>>;
};

export type Input_Google_Protobuf_ServiceDescriptorProto = {
  method?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_MethodDescriptorProto>>>;
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Input_Google_Protobuf_ServiceOptions>;
};

export type Input_Google_Protobuf_ServiceOptions = {
  deprecated?: InputMaybe<Scalars['Boolean']>;
  uninterpretedOption?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_UninterpretedOption>>>;
};

export type Input_Google_Protobuf_SourceCodeInfo = {
  location?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_SourceCodeInfo_Location>>>;
};

export type Input_Google_Protobuf_SourceCodeInfo_Location = {
  leadingComments?: InputMaybe<Scalars['String']>;
  leadingDetachedComments?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  path?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  span?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  trailingComments?: InputMaybe<Scalars['String']>;
};

export type Input_Google_Protobuf_UninterpretedOption = {
  aggregateValue?: InputMaybe<Scalars['String']>;
  doubleValue?: InputMaybe<Scalars['Float']>;
  identifierValue?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Array<InputMaybe<Input_Google_Protobuf_UninterpretedOption_NamePart>>>;
  negativeIntValue?: InputMaybe<Scalars['Long']>;
  positiveIntValue?: InputMaybe<Scalars['Long']>;
  stringValue?: InputMaybe<Scalars['String']>;
};

export type Input_Google_Protobuf_UninterpretedOption_NamePart = {
  isExtension?: InputMaybe<Scalars['Boolean']>;
  namePart?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_A3AnalysisExplanation = {
  drillExplanation?: InputMaybe<Array<InputMaybe<Input_Sage_DrillExplanation>>>;
  totalInsightsShown?: InputMaybe<Scalars['Long']>;
};

export type Input_Sage_A3InsightExplanation = {
  analysisDescriptor?: InputMaybe<Input_Sage_AnalysisDescriptor>;
  drillAttributes?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
  explanation?: InputMaybe<Scalars['String']>;
  insightFeatures?: InputMaybe<Array<InputMaybe<Input_Sage_InsightFeature>>>;
  measures?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
  rating?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['Float']>;
  signature?: InputMaybe<Scalars['String']>;
  vizId?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_AggregationLevel = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_AggregationType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_AnalysisAlgorithm = {
  absDiffMajority?: InputMaybe<Input_Sage_AnalysisAlgorithm_AbsDiffMajority>;
  anomalyExplanation?: InputMaybe<Input_Sage_AnalysisAlgorithm_AnomalyExplanation>;
  crossCorrelation?: InputMaybe<Input_Sage_AnalysisAlgorithm_CrossCorrelation>;
  dataPoint?: InputMaybe<Array<InputMaybe<Input_Sage_AnalysisAlgorithm_DataPoint>>>;
  linearRegression?: InputMaybe<Input_Sage_AnalysisAlgorithm_LinearRegression>;
  madMedian?: InputMaybe<Input_Sage_AnalysisAlgorithm_MadMedian>;
  shesd?: InputMaybe<Input_Sage_AnalysisAlgorithm_SeasonalHybridEsd>;
  stdevMean?: InputMaybe<Input_Sage_AnalysisAlgorithm_StdevMean>;
  trendAnalysis?: InputMaybe<Input_Sage_AnalysisAlgorithm_TrendAnalysis>;
  type?: InputMaybe<Sage_AnalysisAlgorithm_Type>;
};

export type Input_Sage_AnalysisAlgorithm_AbsDiffMajority = {
  maxDiffElements?: InputMaybe<Scalars['Long']>;
  maxFraction?: InputMaybe<Scalars['Float']>;
  minAbsChangeRatio?: InputMaybe<Scalars['Float']>;
  minChangeRatio?: InputMaybe<Scalars['Float']>;
};

export type Input_Sage_AnalysisAlgorithm_AnomalyExplanation = {
  decisionTree?: InputMaybe<Scalars['String']>;
  maxExplanationColumns?: InputMaybe<Scalars['Long']>;
  minRows?: InputMaybe<Scalars['Long']>;
};

export type Input_Sage_AnalysisAlgorithm_CrossCorrelation = {
  corrCoeff?: InputMaybe<Scalars['Float']>;
  maxCorrCoeff?: InputMaybe<Scalars['Float']>;
  maxLag?: InputMaybe<Scalars['Long']>;
  minRows?: InputMaybe<Scalars['Long']>;
};

export type Input_Sage_AnalysisAlgorithm_DataPoint = {
  anomalyDirection?: InputMaybe<Sage_AnalysisAlgorithm_DataPoint_AnomalyDirection>;
  attributeValue?: InputMaybe<Input_Falcon_ConstantValue>;
  measureValue?: InputMaybe<Scalars['Float']>;
};

export type Input_Sage_AnalysisAlgorithm_LinearRegression = {
  minRows?: InputMaybe<Scalars['Long']>;
  multiplier?: InputMaybe<Scalars['Float']>;
  pValueThreshold?: InputMaybe<Scalars['Float']>;
};

export type Input_Sage_AnalysisAlgorithm_MadMedian = {
  median?: InputMaybe<Scalars['Float']>;
  medianAbsDev?: InputMaybe<Scalars['Float']>;
  minRows?: InputMaybe<Scalars['Long']>;
  multiplier?: InputMaybe<Scalars['Float']>;
};

export type Input_Sage_AnalysisAlgorithm_SeasonalHybridEsd = {
  alpha?: InputMaybe<Scalars['Float']>;
  minRows?: InputMaybe<Scalars['Long']>;
  multiplier?: InputMaybe<Scalars['Float']>;
};

export type Input_Sage_AnalysisAlgorithm_StdevMean = {
  mean?: InputMaybe<Scalars['Float']>;
  minRows?: InputMaybe<Scalars['Long']>;
  multiplier?: InputMaybe<Scalars['Float']>;
  stdDev?: InputMaybe<Scalars['Float']>;
};

export type Input_Sage_AnalysisAlgorithm_TrendAnalysis = {
  linearRegression?: InputMaybe<Input_Sage_AnalysisAlgorithm_LinearRegression>;
  minAbsGradientRadThreshold?: InputMaybe<Scalars['Float']>;
  minRelativeDifference?: InputMaybe<Scalars['Float']>;
  minRows?: InputMaybe<Scalars['Long']>;
  pValue?: InputMaybe<Scalars['Float']>;
  percentPoints?: InputMaybe<Scalars['Float']>;
  relativeDifference?: InputMaybe<Scalars['Float']>;
  slope?: InputMaybe<Scalars['Float']>;
};

export type Input_Sage_AnalysisDescriptor = {
  analysisClass?: InputMaybe<Sage_AnalysisDescriptor_AnalysisClass>;
  anomalyExplanation?: InputMaybe<Input_Sage_AnalysisDescriptor_AnomalyExplanation>;
  crossCorrelation?: InputMaybe<Input_Sage_AnalysisDescriptor_CrossCorrelation>;
  customRAnalysis?: InputMaybe<Input_Sage_AnalysisDescriptor_CustomRAnalysis>;
  diffExplanation?: InputMaybe<Input_Sage_AnalysisDescriptor_DiffExplanation>;
  outlierDetection?: InputMaybe<Input_Sage_AnalysisDescriptor_OutlierDetection>;
  trendAnalysis?: InputMaybe<Input_Sage_AnalysisDescriptor_TrendAnalysis>;
};

export type Input_Sage_AnalysisDescriptor_AnomalyExplanation = {
  algorithm?: InputMaybe<Input_Sage_AnalysisAlgorithm>;
  columnBinding?: InputMaybe<Array<InputMaybe<Input_Sage_AnalysisDescriptor_CustomRAnalysis_ColumnBinding>>>;
};

export type Input_Sage_AnalysisDescriptor_CrossCorrelation = {
  algorithm?: InputMaybe<Input_Sage_AnalysisAlgorithm>;
};

export type Input_Sage_AnalysisDescriptor_CustomRAnalysis = {
  columnBinding?: InputMaybe<Array<InputMaybe<Input_Sage_AnalysisDescriptor_CustomRAnalysis_ColumnBinding>>>;
  rOutputType?: InputMaybe<Sage_AnalysisDescriptor_CustomRAnalysis_ROutputType>;
  rScript?: InputMaybe<Scalars['String']>;
  rTemplateId?: InputMaybe<Scalars['String']>;
  unselectedSageOutputColumnId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Input_Sage_AnalysisDescriptor_CustomRAnalysis_ColumnBinding = {
  columnName?: InputMaybe<Scalars['String']>;
  sageOutputColumnId?: InputMaybe<Scalars['String']>;
  variableName?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_AnalysisDescriptor_DiffExplanation = {
  algorithm?: InputMaybe<Input_Sage_AnalysisAlgorithm>;
};

export type Input_Sage_AnalysisDescriptor_OutlierDetection = {
  algorithm?: InputMaybe<Input_Sage_AnalysisAlgorithm>;
};

export type Input_Sage_AnalysisDescriptor_TrendAnalysis = {
  algorithm?: InputMaybe<Input_Sage_AnalysisAlgorithm>;
};

export type Input_Sage_AnalysisParam = {
  analysisDescriptor?: InputMaybe<Array<InputMaybe<Input_Sage_AnalysisDescriptor>>>;
  autotuneDateBoundary?: InputMaybe<Scalars['Boolean']>;
  excludeNull?: InputMaybe<Scalars['Boolean']>;
  excludeZeroMeasure?: InputMaybe<Scalars['Boolean']>;
  highlightBestValue?: InputMaybe<Scalars['Boolean']>;
  maxFalconQueries?: InputMaybe<Scalars['Long']>;
  maxFalconResponseRows?: InputMaybe<Scalars['Long']>;
  maxInsightsOpts?: InputMaybe<Input_Sage_MaxInsightOptions>;
  resourceOpts?: InputMaybe<Input_Sage_ResourceOptions>;
};

export type Input_Sage_BooleanTypeProto = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_BuildReason = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Column = {
  id?: InputMaybe<Input_Sage_EntityHeader>;
  joinPaths?: InputMaybe<Array<InputMaybe<Input_Sage_JoinPathProto>>>;
  schemaTableId?: InputMaybe<Scalars['Int']>;
  table?: InputMaybe<Input_Sage_EntityHeader>;
};

export type Input_Sage_ColumnIndexSkipReason = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_ColumnIndexSourceType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_ColumnIndexType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_ColumnIndexTypeReason = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_ColumnType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_CompareTypeProto = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_DateFilterProto = {
  datePeriod?: InputMaybe<Sage_DateFilterProto_DatePeriod>;
  dateRange?: InputMaybe<Input_Sage_DateFilterProto_DateRange>;
  epoch?: InputMaybe<Scalars['Long']>;
  forEachPeriod?: InputMaybe<Sage_DateFilterProto_DatePeriod>;
  month?: InputMaybe<Sage_DateFilterProto_Month>;
  monthName?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
  op?: InputMaybe<Sage_CompareTypeProto_E>;
  quarter?: InputMaybe<Sage_DateFilterProto_Quarter>;
  quarterName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Sage_DateFilterProto_DateFilterType>;
  weekDay?: InputMaybe<Sage_DateFilterProto_WeekDay>;
  weekDayName?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
  yearName?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_DateFilterProto_DateRange = {
  highEpoch?: InputMaybe<Scalars['Long']>;
  lowEpoch?: InputMaybe<Scalars['Long']>;
};

export type Input_Sage_DrillExplanation = {
  attribute?: InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>;
  measure?: InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>;
  totalGroupsAnalyzed?: InputMaybe<Scalars['Long']>;
  totalInsightsGenerated?: InputMaybe<Scalars['Long']>;
  totalInsightsShown?: InputMaybe<Scalars['Long']>;
};

export type Input_Sage_EntityCategory = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_EntityHeader = {
  created?: InputMaybe<Scalars['Long']>;
  description?: InputMaybe<Scalars['String']>;
  guid?: InputMaybe<Scalars['String']>;
  indexVersion?: InputMaybe<Scalars['Long']>;
  modified?: InputMaybe<Scalars['Long']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_FeatureScore = {
  contribution?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type Input_Sage_FeedbackScore = {
  negativeScore?: InputMaybe<Scalars['Float']>;
  positiveScore?: InputMaybe<Scalars['Float']>;
};

export type Input_Sage_FeedbackType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_I18nGroup = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_IndexCategory = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_IndexSourceType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_IndexType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_InsightFeature = {
  anomalousPoint?: InputMaybe<Scalars['String']>;
  dataSource?: InputMaybe<Input_Sage_EntityHeader>;
  id?: InputMaybe<Scalars['String']>;
  isPresentInOriginalQuery?: InputMaybe<Scalars['Boolean']>;
  sageProgram?: InputMaybe<Input_Sage_Auto_Complete_V2_SageProgram>;
  type?: InputMaybe<Sage_InsightFeature_Type>;
};

export type Input_Sage_JoinPathProto = {
  id?: InputMaybe<Input_Sage_EntityHeader>;
  isConnected?: InputMaybe<Scalars['Boolean']>;
  join?: InputMaybe<Array<InputMaybe<Input_Sage_JoinProto>>>;
  joins?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
  leafTable?: InputMaybe<Input_Sage_EntityHeader>;
  rootTable?: InputMaybe<Input_Sage_EntityHeader>;
};

export type Input_Sage_JoinProto = {
  destColumn?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
  destination?: InputMaybe<Input_Sage_EntityHeader>;
  id?: InputMaybe<Input_Sage_EntityHeader>;
  joinNulls?: InputMaybe<Scalars['Boolean']>;
  joinType?: InputMaybe<Sage_JoinProto_JoinType>;
  oneToOne?: InputMaybe<Scalars['Boolean']>;
  source?: InputMaybe<Input_Sage_EntityHeader>;
  sourceColumn?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
};

export type Input_Sage_KeyType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_LogicalTableType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_MatchScore = {
  featureScore?: InputMaybe<Array<InputMaybe<Input_Sage_FeatureScore>>>;
};

export type Input_Sage_MatchType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_MatchedToken = {
  autoGeneratedSynonym?: InputMaybe<Scalars['Boolean']>;
  cardinalityScore?: InputMaybe<Scalars['Float']>;
  debugString?: InputMaybe<Scalars['String']>;
  keyType?: InputMaybe<Sage_KeyType_E>;
  matchType?: InputMaybe<Sage_MatchType_E>;
  synonymSource?: InputMaybe<Sage_SynonymSource_E>;
  token?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  usageFrequency?: InputMaybe<Scalars['Int']>;
  usageScore?: InputMaybe<Scalars['Float']>;
  usageScoreDetail?: InputMaybe<Array<InputMaybe<Input_Sage_MatchedToken_UsageScoreDetail>>>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type Input_Sage_MatchedToken_UsageScoreDetail = {
  boost?: InputMaybe<Scalars['Float']>;
  columnGuid?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contextId?: InputMaybe<Scalars['String']>;
  feature?: InputMaybe<Scalars['String']>;
  featureType?: InputMaybe<Scalars['String']>;
  featureUsageFrequency?: InputMaybe<Scalars['Float']>;
  featureWeight?: InputMaybe<Scalars['Float']>;
  groupId?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['Float']>;
  userId?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_MaxInsightOptions = {
  boostDateColumns?: InputMaybe<Scalars['Boolean']>;
  crossCorrelationAllPairs?: InputMaybe<Scalars['Boolean']>;
  maxAnomalies?: InputMaybe<Scalars['Int']>;
  maxAnomalyExplanationInsights?: InputMaybe<Scalars['Int']>;
  maxCrossCorrelationDateColumns?: InputMaybe<Scalars['Int']>;
  maxCrossCorrelationInsights?: InputMaybe<Scalars['Int']>;
  maxDateColumns?: InputMaybe<Scalars['Int']>;
  maxDrillAttributes?: InputMaybe<Scalars['Int']>;
  maxLrAnomalies?: InputMaybe<Scalars['Int']>;
  maxMeasures?: InputMaybe<Scalars['Int']>;
  maxShesdAnomalies?: InputMaybe<Scalars['Int']>;
  maxTrends?: InputMaybe<Scalars['Int']>;
  simpleChangeDistribution?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Sage_NlPhraseTemplate = {
  token?: InputMaybe<Array<InputMaybe<Input_Sage_NlToken>>>;
};

export type Input_Sage_NlQueryClassificationInfo = {
  confidenceScore?: InputMaybe<Scalars['Float']>;
  queryComplexity?: InputMaybe<Sage_NlQueryComplexity_E>;
};

export type Input_Sage_NlQueryComplexity = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_NlTemplate = {
  description?: InputMaybe<Scalars['String']>;
  phraseTemplate?: InputMaybe<Array<InputMaybe<Input_Sage_NlPhraseTemplate>>>;
};

export type Input_Sage_NlTemplatePair = {
  name?: InputMaybe<Scalars['String']>;
  template?: InputMaybe<Input_Sage_NlTemplate>;
};

export type Input_Sage_NlTemplates = {
  templatePair?: InputMaybe<Array<InputMaybe<Input_Sage_NlTemplate>>>;
};

export type Input_Sage_NlToken = {
  metadata?: InputMaybe<Input_Sage_NlTokenMetadata>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Sage_NlTokenType_E>;
};

export type Input_Sage_NlTokenMetadata = {
  canonicalName?: InputMaybe<Scalars['String']>;
  table?: InputMaybe<Input_Sage_EntityHeader>;
};

export type Input_Sage_NlTokenType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_PhraseType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_PhysicalTableType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_ProviderType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_RequestType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_ResourceOptions = {
  queryTimeout?: InputMaybe<Scalars['Int']>;
};

export type Input_Sage_SageExpression = {
  column?: InputMaybe<Input_Sage_Column>;
  constant?: InputMaybe<Input_Sage_SageExpression_Constant>;
  dataType?: InputMaybe<Falcon_DataType_E>;
  exprClass?: InputMaybe<Sage_SageExpression_ExpressionClass>;
  exprRef?: InputMaybe<Input_Sage_SageExpression_ExpressionRef>;
  formatingType?: InputMaybe<Common_FormatingType_E>;
  function?: InputMaybe<Input_Sage_SageExpression_Function>;
  variable?: InputMaybe<Input_Sage_SageExpression_Variable>;
  variableName?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_SageExpressionInternal = {
  columnType?: InputMaybe<Sage_ColumnType_E>;
};

export type Input_Sage_SageExpression_Constant = {
  boolValue?: InputMaybe<Scalars['Boolean']>;
  dateEpochValue?: InputMaybe<Scalars['Long']>;
  doubleValue?: InputMaybe<Scalars['Float']>;
  intValue?: InputMaybe<Scalars['Long']>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  normalize?: InputMaybe<Scalars['Boolean']>;
  strValue?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_SageExpression_ExpressionRef = {
  refId?: InputMaybe<Input_Sage_EntityHeader>;
};

export type Input_Sage_SageExpression_Function = {
  arguments?: InputMaybe<Array<InputMaybe<Input_Sage_SageExpression>>>;
  hasVarargs?: InputMaybe<Scalars['Boolean']>;
  isAggregate?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_SageExpression_Variable = {
  id?: InputMaybe<Input_Sage_EntityHeader>;
  isDefault?: InputMaybe<Scalars['Boolean']>;
  value?: InputMaybe<Input_Sage_SageExpression>;
};

export type Input_Sage_SparseBitmapProto = {
  base?: InputMaybe<Scalars['Int']>;
  data?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Sage_SparseBitmapProto_Version>;
};

export type Input_Sage_SynonymProto = {
  name?: InputMaybe<Scalars['String']>;
  permittedUsers?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
};

export type Input_Sage_SynonymSource = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_TimeBucket = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_TimeBucketQualifierProto = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_TokenType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_AcChosenColumn = {
  chosenIdx?: InputMaybe<Scalars['Int']>;
  column?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startIdx?: InputMaybe<Scalars['Int']>;
};

export type Input_Sage_Auto_Complete_V2_AcChosenJoinPath = {
  chosenIdx?: InputMaybe<Scalars['Int']>;
  joinPath?: InputMaybe<Array<InputMaybe<Input_Sage_JoinPathProto>>>;
  startIdx?: InputMaybe<Scalars['Int']>;
};

export type Input_Sage_Auto_Complete_V2_AcColumn = {
  header?: InputMaybe<Input_Sage_EntityHeader>;
  table?: InputMaybe<Input_Sage_EntityHeader>;
};

export type Input_Sage_Auto_Complete_V2_AcContext = {
  constrainedSearchContext?: InputMaybe<Input_Sage_Auto_Complete_V2_ConstrainedSearchContext>;
  formula?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_AcFormula>>>;
  headerDef?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
  join?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_AcJoin>>>;
  nlContext?: InputMaybe<Input_Sage_Auto_Complete_V2_NlContext>;
  parameter?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_AcParameter>>>;
  pivotContexts?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_PivotContext>>>;
  queryRewrite?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_NlqRewrite>>>;
  schemaGraph?: InputMaybe<Input_Sage_Auto_Complete_V2_SchemaGraphProto>;
  searchAssistContext?: InputMaybe<Input_Sage_Auto_Complete_V2_SearchAssistContext>;
  table?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_AcTable>>>;
  tokenDisambiguation?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_AcTokenDisambiguation>>>;
  v?: InputMaybe<Sage_Auto_Complete_V2_AcVersion_E>;
  version?: InputMaybe<Sage_Auto_Complete_V2_AcContext_Version>;
};

export type Input_Sage_Auto_Complete_V2_AcFormula = {
  aggregationType?: InputMaybe<Sage_AggregationType_E>;
  columnType?: InputMaybe<Sage_ColumnType_E>;
  dataType?: InputMaybe<Falcon_DataType_E>;
  defaultCalendar?: InputMaybe<Input_Sage_EntityHeader>;
  deprecatedExpression?: InputMaybe<Scalars['String']>;
  error?: InputMaybe<Input_Sage_Auto_Complete_V2_AcFormulaError>;
  expression?: InputMaybe<Input_Sage_SageExpression>;
  header?: InputMaybe<Input_Sage_EntityHeader>;
  isAutoGenerated?: InputMaybe<Scalars['Boolean']>;
  token?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
  version?: InputMaybe<Sage_Auto_Complete_V2_AcVersion_E>;
  wasAutoGenerated?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Sage_Auto_Complete_V2_AcFormulaError = {
  errorCode?: InputMaybe<Sage_Auto_Complete_V2_ErrorCode_E>;
  errorMessage?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_AcJoin = {
  error?: InputMaybe<Input_Sage_Auto_Complete_V2_AcJoinError>;
  header?: InputMaybe<Input_Sage_EntityHeader>;
  left?: InputMaybe<Input_Sage_EntityHeader>;
  leftColumn?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
  right?: InputMaybe<Input_Sage_EntityHeader>;
  rightColumn?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
  version?: InputMaybe<Sage_Auto_Complete_V2_AcVersion_E>;
};

export type Input_Sage_Auto_Complete_V2_AcJoinError = {
  errorCode?: InputMaybe<Sage_Auto_Complete_V2_ErrorCode_E>;
  errorMessage?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_AcParameter = {
  dataType?: InputMaybe<Falcon_DataType_E>;
  header?: InputMaybe<Input_Sage_EntityHeader>;
};

export type Input_Sage_Auto_Complete_V2_AcRequestInfo = {
  authToken?: InputMaybe<Input_Sage_Auto_Complete_V2_AuthToken>;
  clientTimestampMs?: InputMaybe<Scalars['Long']>;
  deleteInvalidPhrases?: InputMaybe<Scalars['Boolean']>;
  downstreamRequestId?: InputMaybe<Scalars['String']>;
  featureFlag?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_FeatureFlag>>>;
  flag?: InputMaybe<Array<InputMaybe<Sage_Auto_Complete_V2_FeatureFlag_E>>>;
  incidentId?: InputMaybe<Scalars['String']>;
  isAnswerPage?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
  queryStreamId?: InputMaybe<Scalars['String']>;
  requestCallId?: InputMaybe<Scalars['Int']>;
  shouldCountViews?: InputMaybe<Scalars['Boolean']>;
  stateKey?: InputMaybe<Input_Sage_Auto_Complete_V2_AcStateKey>;
  statefulRequestInfo?: InputMaybe<Input_Common_StatefulRequestInfo>;
  timeBudgetMs?: InputMaybe<Scalars['Int']>;
  userFeedback?: InputMaybe<Input_Sage_Auto_Complete_V2_UserFeedback>;
  worksheetGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_AcResponseInfo = {
  incidentId?: InputMaybe<Scalars['String']>;
  latencyBreakUp?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  responseCallId?: InputMaybe<Scalars['Int']>;
  serverLatencyMs?: InputMaybe<Scalars['Int']>;
  stateKey?: InputMaybe<Input_Sage_Auto_Complete_V2_AcStateKey>;
  statefulResponseInfo?: InputMaybe<Input_Common_StatefulResponseInfo>;
};

export type Input_Sage_Auto_Complete_V2_AcStateKey = {
  generationNumber?: InputMaybe<Scalars['Int']>;
  transactionId?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_AcTable = {
  column?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
  deprecatedError?: InputMaybe<Input_Sage_Auto_Complete_V2_AcTableError>;
  deprecatedQuery?: InputMaybe<Scalars['String']>;
  error?: InputMaybe<Input_Sage_Auto_Complete_V2_ErrorCollection>;
  expression?: InputMaybe<Input_Sage_SageExpression>;
  formatted?: InputMaybe<Input_Sage_Auto_Complete_V2_FormattedTokens>;
  hashKey?: InputMaybe<Scalars['String']>;
  header?: InputMaybe<Input_Sage_EntityHeader>;
  isSkipToken?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
  nlToken?: InputMaybe<Array<InputMaybe<Input_Sage_NlToken>>>;
  query?: InputMaybe<Input_Sage_Auto_Complete_V2_SageProgram>;
  unmappedColumn?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
  version?: InputMaybe<Sage_Auto_Complete_V2_AcVersion_E>;
  wordRange?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_WordRange>>>;
};

export type Input_Sage_Auto_Complete_V2_AcTableError = {
  errorCode?: InputMaybe<Sage_Auto_Complete_V2_ErrorCode_E>;
  errorMessage?: InputMaybe<Scalars['String']>;
  errorMessagePosition?: InputMaybe<Scalars['Int']>;
  errorSpan?: InputMaybe<Scalars['Int']>;
  severity?: InputMaybe<Sage_Auto_Complete_V2_ErrorSeverity_E>;
};

export type Input_Sage_Auto_Complete_V2_AcTokenDisambiguation = {
  chosenColumn?: InputMaybe<Input_Sage_Auto_Complete_V2_AcChosenColumn>;
  chosenJoinPath?: InputMaybe<Input_Sage_Auto_Complete_V2_AcChosenJoinPath>;
  version?: InputMaybe<Sage_Auto_Complete_V2_AcVersion_E>;
};

export type Input_Sage_Auto_Complete_V2_AcVersion = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_AuthToken = {
  expirationTime?: InputMaybe<Scalars['Int']>;
  groupMask?: InputMaybe<Scalars['Long']>;
  logicalSchemaVersion?: InputMaybe<Scalars['Long']>;
  orgId?: InputMaybe<Scalars['Long']>;
  rlsGroups?: InputMaybe<Input_Sage_SparseBitmapProto>;
  user?: InputMaybe<Input_Sage_EntityHeader>;
  value?: InputMaybe<Scalars['Long']>;
};

export type Input_Sage_Auto_Complete_V2_AutoBucketCache = {
  cacheEntries?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_AutoBucketCache_AutoBucketCacheEntry>>>;
};

export type Input_Sage_Auto_Complete_V2_AutoBucketCache_AutoBucketCacheEntry = {
  bucket?: InputMaybe<Sage_TimeBucket_E>;
  outputGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_AutoBucketPolicy = {
  autoBucketCache?: InputMaybe<Input_Sage_Auto_Complete_V2_AutoBucketCache>;
  useData?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Sage_Auto_Complete_V2_ClientState = {
  deprecatedSerializedFormulaTokens?: InputMaybe<Scalars['String']>;
  deprecatedTokenColor?: InputMaybe<Scalars['String']>;
  originalToken?: InputMaybe<Scalars['String']>;
  truncated?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Sage_Auto_Complete_V2_ColumnMetadata = {
  estimatedUniqueCount?: InputMaybe<Scalars['Int']>;
  guid?: InputMaybe<Scalars['String']>;
  isIndexed?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Sage_Auto_Complete_V2_ConstrainedSearchContext = {
  avoidTokens?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_ConstrainedSearchContext_TokenProperties>>>;
  columnGuid?: InputMaybe<Scalars['String']>;
  explorationType?: InputMaybe<Sage_Auto_Complete_V2_ConstrainedSearchContext_ExplorationType>;
  isAggregated?: InputMaybe<Scalars['Boolean']>;
  isDateBucket?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Sage_Auto_Complete_V2_ConstrainedSearchContext_TokenProperties = {
  aggregated?: InputMaybe<Scalars['Boolean']>;
  columnGuid?: InputMaybe<Scalars['String']>;
  dataType?: InputMaybe<Falcon_DataType_E>;
  displayGuid?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  tokenType?: InputMaybe<Sage_TokenType_E>;
  versusGenerated?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Sage_Auto_Complete_V2_DataScope = {
  filterSageQuery?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
  forcedRoot?: InputMaybe<Scalars['String']>;
  logicalColumn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  logicalTable?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Input_Sage_Auto_Complete_V2_DataScopeTable = {
  column?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
  confidence?: InputMaybe<Scalars['Float']>;
  header?: InputMaybe<Input_Sage_EntityHeader>;
  type?: InputMaybe<Sage_Auto_Complete_V2_DataScopeTableType_E>;
};

export type Input_Sage_Auto_Complete_V2_DataScopeTableType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_EditInMiddleInfo = {
  prevPhrases?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_PhraseDefinition>>>;
  prevTokens?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
};

export type Input_Sage_Auto_Complete_V2_Error = {
  debugInfo?: InputMaybe<Input_Sage_Auto_Complete_V2_ErrorDebugInfo>;
  errorCode?: InputMaybe<Sage_Auto_Complete_V2_ErrorCode_E>;
  errorMessage?: InputMaybe<Scalars['String']>;
  errorMessagePosition?: InputMaybe<Scalars['Int']>;
  errorSpan?: InputMaybe<Scalars['Int']>;
  severity?: InputMaybe<Sage_Auto_Complete_V2_ErrorSeverity_E>;
};

export type Input_Sage_Auto_Complete_V2_ErrorCode = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_ErrorCollection = {
  error?: InputMaybe<Input_Sage_Auto_Complete_V2_Error>;
  errorDetail?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_Error>>>;
};

export type Input_Sage_Auto_Complete_V2_ErrorDebugInfo = {
  forbiddenType?: InputMaybe<Sage_Auto_Complete_V2_ErrorDebugInfo_ForbiddenType>;
  numFailedLookups?: InputMaybe<Scalars['Int']>;
};

export type Input_Sage_Auto_Complete_V2_ErrorSeverity = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_FeatureFlag = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_ForbiddenWordInfo = {
  forbiddenMessage?: InputMaybe<Scalars['String']>;
  forbiddenType?: InputMaybe<Sage_Auto_Complete_V2_ForbiddenWordInfo_ForbiddenType>;
};

export type Input_Sage_Auto_Complete_V2_FormattedTokens = {
  phrase?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_PhraseDefinition>>>;
  token?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
};

export type Input_Sage_Auto_Complete_V2_IncrementalRequest = {
  edit?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_TokenEdit>>>;
  prevResponseIncidentId?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_JoinPathChoice = {
  affectedToken?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  newRoot?: InputMaybe<Scalars['String']>;
  newTokenEditable?: InputMaybe<Scalars['Boolean']>;
  newTokenPath?: InputMaybe<Input_Sage_JoinPathProto>;
  oldRoot?: InputMaybe<Scalars['String']>;
  oldTokensEditable?: InputMaybe<Scalars['Boolean']>;
  preferredChoice?: InputMaybe<Scalars['Boolean']>;
  prependPath?: InputMaybe<Input_Sage_JoinPathProto>;
};

export type Input_Sage_Auto_Complete_V2_JoinPathCollection = {
  choice?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_JoinPathChoice>>>;
  newTokenIndex?: InputMaybe<Scalars['Int']>;
  newTokenIndices?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  oldColumnGuid?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  rootIndex?: InputMaybe<Scalars['Int']>;
};

export type Input_Sage_Auto_Complete_V2_LanguageType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_NlContext = {
  isNlQuerySourced?: InputMaybe<Scalars['Boolean']>;
  queryMappingInfo?: InputMaybe<Input_Sage_Auto_Complete_V2_NlQueryMappingInfo>;
  showNlQueryMapping?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Sage_Auto_Complete_V2_AcVersion_E>;
};

export type Input_Sage_Auto_Complete_V2_NlPhraseMappingInfo = {
  sortByPhraseMapping?: InputMaybe<Input_Sage_Auto_Complete_V2_SortByPhraseMapping>;
  type?: InputMaybe<Sage_Auto_Complete_V2_NlPhraseMappingInfo_Type>;
};

export type Input_Sage_Auto_Complete_V2_NlqRewrite = {
  disambiguationContext?: InputMaybe<Input_Sage_Auto_Complete_V2_NlqRewriteContext>;
  phrase?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_PhraseDefinition>>>;
  rewrittenToken?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
  score?: InputMaybe<Scalars['Float']>;
  sourceType?: InputMaybe<Sage_Auto_Complete_V2_NlqRewriteSourceType_E>;
  suggestionType?: InputMaybe<Sage_Auto_Complete_V2_NlqRewriteSuggestionType_E>;
  version?: InputMaybe<Sage_Auto_Complete_V2_AcVersion_E>;
};

export type Input_Sage_Auto_Complete_V2_NlqRewriteContext = {
  posTag?: InputMaybe<Sage_Nlp_PosTag_E>;
  query?: InputMaybe<Scalars['String']>;
  queryCtxToken?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_NlQueryContextToken>>>;
  relation?: InputMaybe<Scalars['String']>;
  tokens?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
  wordRange?: InputMaybe<Input_Sage_Auto_Complete_V2_WordRange>;
};

export type Input_Sage_Auto_Complete_V2_NlqRewriteSourceType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_NlqRewriteSuggestion = {
  disambiguationContext?: InputMaybe<Input_Sage_Auto_Complete_V2_NlqRewriteContext>;
  forbiddenWordInfo?: InputMaybe<Input_Sage_Auto_Complete_V2_ForbiddenWordInfo>;
  phrase?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_PhraseDefinition>>>;
  suggestion?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
  suggestionType?: InputMaybe<Sage_Auto_Complete_V2_NlqRewriteSuggestionType_E>;
};

export type Input_Sage_Auto_Complete_V2_NlqRewriteSuggestionType = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_NlQueryContextToken = {
  posTag?: InputMaybe<Sage_Nlp_PosTag_E>;
  relation?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
  type?: InputMaybe<Sage_Auto_Complete_V2_NlQueryContextToken_ContextRelationType>;
  wordRange?: InputMaybe<Input_Sage_Auto_Complete_V2_WordRange>;
};

export type Input_Sage_Auto_Complete_V2_NlQueryMappingInfo = {
  charAfter?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  phraseMappingInfo?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_NlPhraseMappingInfo>>>;
  queryToken?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tokenMappingInfo?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_NlTokenMappingInfo>>>;
};

export type Input_Sage_Auto_Complete_V2_NlTokenMappingInfo = {
  confidence?: InputMaybe<Sage_Auto_Complete_V2_NlTokenMappingInfo_SegmentMatchConfidenceBucket>;
  disambiguationType?: InputMaybe<Sage_Auto_Complete_V2_NlqRewriteSuggestionType_E>;
  isPartOfInterpretation?: InputMaybe<Scalars['Boolean']>;
  tokenList?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_TokenList>>>;
  wordRange?: InputMaybe<Input_Sage_Auto_Complete_V2_WordRange>;
};

export type Input_Sage_Auto_Complete_V2_Object = {
  action?: InputMaybe<Input_Sage_Auto_Complete_V2_Object_ActionProto>;
  authorDisplayName?: InputMaybe<Input_Sage_Auto_Complete_V2_Object_HighlightedString>;
  authorGuid?: InputMaybe<Scalars['String']>;
  authorName?: InputMaybe<Input_Sage_Auto_Complete_V2_Object_HighlightedString>;
  explanation?: InputMaybe<Scalars['String']>;
  generationNum?: InputMaybe<Scalars['Long']>;
  guid?: InputMaybe<Scalars['String']>;
  helpPage?: InputMaybe<Input_Sage_Auto_Complete_V2_Object_HelpPageProto>;
  modifiedEpochMs?: InputMaybe<Scalars['Long']>;
  name?: InputMaybe<Input_Sage_Auto_Complete_V2_Object_HighlightedString>;
  question?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_Object_Question>>>;
  score?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Sage_Auto_Complete_V2_Object_Type>;
  viz?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_Object_Viz>>>;
};

export type Input_Sage_Auto_Complete_V2_Object_ActionProto = {
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Sage_Auto_Complete_V2_Object_ActionProto_ActionType>;
};

export type Input_Sage_Auto_Complete_V2_Object_HelpPageProto = {
  URL?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_Object_Highlight = {
  size?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Input_Sage_Auto_Complete_V2_Object_HighlightedString = {
  highlight?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_Object_Highlight>>>;
  text?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_Object_Question = {
  acContext?: InputMaybe<Input_Sage_Auto_Complete_V2_AcContext>;
  text?: InputMaybe<Input_Sage_Auto_Complete_V2_Object_HighlightedString>;
};

export type Input_Sage_Auto_Complete_V2_Object_Viz = {
  chartType?: InputMaybe<Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto>;
  explanation?: InputMaybe<Scalars['String']>;
  guid?: InputMaybe<Scalars['String']>;
  modifiedEpochMs?: InputMaybe<Scalars['Long']>;
  question?: InputMaybe<Input_Sage_Auto_Complete_V2_Object_Question>;
  score?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Input_Sage_Auto_Complete_V2_Object_HighlightedString>;
  type?: InputMaybe<Sage_Auto_Complete_V2_Object_VizType>;
  vizTitle?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_OutputColumn = {
  aggregationType?: InputMaybe<Sage_AggregationType_E>;
  bucket?: InputMaybe<Sage_TimeBucket_E>;
  calendarGuid?: InputMaybe<Scalars['String']>;
  columnGuid?: InputMaybe<Scalars['String']>;
  joinPaths?: InputMaybe<Array<InputMaybe<Input_Sage_JoinPathProto>>>;
  showGrowth?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Sage_Auto_Complete_V2_OutputGuidCacheProto = {
  cacheEntries?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_OutputGuidCacheProto_OutputGuidCacheEntry>>>;
};

export type Input_Sage_Auto_Complete_V2_OutputGuidCacheProto_OutputGuidCacheEntry = {
  column?: InputMaybe<Input_Sage_Auto_Complete_V2_OutputColumn>;
  outputGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_PhraseDefinition = {
  isCompletePhrase?: InputMaybe<Scalars['Boolean']>;
  numTokens?: InputMaybe<Scalars['Int']>;
  phraseType?: InputMaybe<Sage_PhraseType_E>;
  startIndex?: InputMaybe<Scalars['Int']>;
};

export type Input_Sage_Auto_Complete_V2_PivotColumn = {
  formulaGuid?: InputMaybe<Scalars['String']>;
  outputGuid?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Input_Sage_Auto_Complete_V2_ValueList>;
};

export type Input_Sage_Auto_Complete_V2_PivotContext = {
  attributeOutputGuids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pivotGroups?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_PivotGroup>>>;
};

export type Input_Sage_Auto_Complete_V2_PivotGroup = {
  aggregation?: InputMaybe<Sage_AggregationType_E>;
  columns?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_PivotColumn>>>;
  measureOutputGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_RecognizedToken = {
  autoGeneratedSynonym?: InputMaybe<Scalars['Boolean']>;
  autoInsertedSpace?: InputMaybe<Scalars['Boolean']>;
  bulkFilterValue?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  canBeExtended?: InputMaybe<Scalars['Boolean']>;
  canEditJoinPath?: InputMaybe<Scalars['Boolean']>;
  canonicalForm?: InputMaybe<Scalars['String']>;
  clientState?: InputMaybe<Input_Sage_Auto_Complete_V2_ClientState>;
  dataType?: InputMaybe<Falcon_DataType_E>;
  dateFilter?: InputMaybe<Input_Sage_DateFilterProto>;
  deprecatedSageExpression?: InputMaybe<Scalars['String']>;
  deprecatedTokenIdx?: InputMaybe<Scalars['Int']>;
  entityCategory?: InputMaybe<Sage_EntityCategory_E>;
  explicitJoinPathEdit?: InputMaybe<Scalars['Boolean']>;
  formulaId?: InputMaybe<Scalars['String']>;
  guid?: InputMaybe<Scalars['String']>;
  hasSpaceAfter?: InputMaybe<Scalars['Boolean']>;
  idxInPrevQuery?: InputMaybe<Scalars['Int']>;
  inconsistentJoinPaths?: InputMaybe<Scalars['Boolean']>;
  isAutoDisambiguated?: InputMaybe<Scalars['Boolean']>;
  isCohort?: InputMaybe<Scalars['Boolean']>;
  isSkipped?: InputMaybe<Scalars['Boolean']>;
  joinPath?: InputMaybe<Array<InputMaybe<Input_Sage_JoinPathProto>>>;
  lightweightTokenId?: InputMaybe<Scalars['String']>;
  matchType?: InputMaybe<Sage_MatchType_E>;
  outputGuid?: InputMaybe<Scalars['String']>;
  placeholderText?: InputMaybe<Scalars['String']>;
  preserveQuotes?: InputMaybe<Scalars['Boolean']>;
  rankingScore?: InputMaybe<Scalars['Float']>;
  reResolve?: InputMaybe<Scalars['Boolean']>;
  requiresDelimiters?: InputMaybe<Scalars['Boolean']>;
  sageExpression?: InputMaybe<Input_Sage_SageExpression>;
  schemaTableId?: InputMaybe<Scalars['Int']>;
  synonymSource?: InputMaybe<Sage_SynonymSource_E>;
  token?: InputMaybe<Scalars['String']>;
  tokenMetadata?: InputMaybe<Input_Sage_Auto_Complete_V2_TokenMetadata>;
  twiddlerRank?: InputMaybe<Scalars['Int']>;
  typeEnum?: InputMaybe<Sage_TokenType_E>;
  valueMatch?: InputMaybe<Scalars['Boolean']>;
  whiteSpaceSuffix?: InputMaybe<Input_Sage_Auto_Complete_V2_WhiteSpaceInfo>;
  worksheetColumnGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_RequestStage = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_SageProgram = {
  displaySageQuery?: InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery>;
  programType?: InputMaybe<Sage_Auto_Complete_V2_SageProgram_ProgramType>;
  statements?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_Statement>>>;
};

export type Input_Sage_Auto_Complete_V2_SageQuery = {
  columns?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_Column>>>;
  defaultTimeDimensions?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_Column>>>;
  filters?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_Filter>>>;
  growthDimension?: InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_GrowthDimension>;
  header?: InputMaybe<Input_Sage_EntityHeader>;
  isPivotTable?: InputMaybe<Scalars['Boolean']>;
  isSubQuery?: InputMaybe<Scalars['Boolean']>;
  queryRootGuid?: InputMaybe<Scalars['String']>;
  relatedAttributes?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_Column>>>;
  relatedMeasures?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_Column>>>;
  resultForEachValue?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_Column>>>;
  sortColumns?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_ColumnSortInfo>>>;
  topCount?: InputMaybe<Scalars['Int']>;
  topInfo?: InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_TopInfo>;
};

export type Input_Sage_Auto_Complete_V2_SageQuery_Column = {
  aggregationType?: InputMaybe<Sage_AggregationType_E>;
  bucket?: InputMaybe<Sage_TimeBucket_E>;
  calendar?: InputMaybe<Input_Sage_EntityHeader>;
  column?: InputMaybe<Input_Sage_SageExpression>;
  columnType?: InputMaybe<Sage_ColumnType_E>;
  deprecatedDataType?: InputMaybe<Falcon_DataType_E>;
  deprecatedSerializedRecognizedToken?: InputMaybe<Scalars['String']>;
  formulaId?: InputMaybe<Scalars['String']>;
  groupBy?: InputMaybe<Scalars['Boolean']>;
  header?: InputMaybe<Input_Sage_EntityHeader>;
  id?: InputMaybe<Scalars['String']>;
  isUnmapped?: InputMaybe<Scalars['Boolean']>;
  joinPath?: InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_JoinPath>;
  markedForDisambiguation?: InputMaybe<Scalars['Boolean']>;
  mustHaveOnChart?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  pivotBy?: InputMaybe<Scalars['Boolean']>;
  recognizedToken?: InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>;
  showColumn?: InputMaybe<Scalars['Boolean']>;
  showGrowth?: InputMaybe<Scalars['Boolean']>;
  sortAscending?: InputMaybe<Scalars['Boolean']>;
  sortOrder?: InputMaybe<Scalars['Int']>;
  uniqueValues?: InputMaybe<Scalars['Long']>;
  versusGenerated?: InputMaybe<Scalars['Boolean']>;
  worksheetColumnGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_SageQuery_ColumnSortInfo = {
  guid?: InputMaybe<Scalars['String']>;
  sortAscending?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Sage_Auto_Complete_V2_SageQuery_Filter = {
  aggregationType?: InputMaybe<Sage_AggregationType_E>;
  booleanValue?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  calendar?: InputMaybe<Input_Sage_EntityHeader>;
  column?: InputMaybe<Input_Sage_SageExpression>;
  columnGuid?: InputMaybe<Scalars['String']>;
  columnName?: InputMaybe<Scalars['String']>;
  columnType?: InputMaybe<Sage_ColumnType_E>;
  dateFilter?: InputMaybe<Array<InputMaybe<Input_Sage_DateFilterProto>>>;
  doubleValue?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  filterId?: InputMaybe<Scalars['String']>;
  filterValueQuery?: InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_Filter_FilterValueQuery>;
  floatValue?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  formulaId?: InputMaybe<Scalars['String']>;
  geoInfo?: InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_Filter_GeoInfo>;
  header?: InputMaybe<Input_Sage_EntityHeader>;
  includeNull?: InputMaybe<Scalars['Boolean']>;
  int32Value?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  int64Value?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  isAutoGenerated?: InputMaybe<Scalars['Boolean']>;
  joinPath?: InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_JoinPath>;
  markedForDisambiguation?: InputMaybe<Scalars['Boolean']>;
  negateFilter?: InputMaybe<Scalars['Boolean']>;
  op?: InputMaybe<Sage_CompareTypeProto_E>;
  stringValue?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  timeBucket?: InputMaybe<Sage_TimeBucket_E>;
  type?: InputMaybe<Sage_Auto_Complete_V2_SageQuery_FilterType>;
  worksheetColumnGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_SageQuery_Filter_FilterValueQuery = {
  column?: InputMaybe<Input_Sage_EntityHeader>;
  query?: InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery>;
};

export type Input_Sage_Auto_Complete_V2_SageQuery_Filter_GeoInfo = {
  circle?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_Filter_GeoInfo_GeoCircle>>>;
};

export type Input_Sage_Auto_Complete_V2_SageQuery_Filter_GeoInfo_GeoCircle = {
  inclusive?: InputMaybe<Scalars['Boolean']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  radius?: InputMaybe<Scalars['Float']>;
};

export type Input_Sage_Auto_Complete_V2_SageQuery_GrowthDimension = {
  bucket?: InputMaybe<Sage_TimeBucket_E>;
  calendar?: InputMaybe<Input_Sage_EntityHeader>;
  column?: InputMaybe<Input_Sage_SageExpression>;
  header?: InputMaybe<Input_Sage_EntityHeader>;
  joinPath?: InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_JoinPath>;
  mustHaveOnChart?: InputMaybe<Scalars['Boolean']>;
  qualifier?: InputMaybe<Sage_TimeBucketQualifierProto_E>;
  timeColumn?: InputMaybe<Scalars['String']>;
  timeColumnGuid?: InputMaybe<Scalars['String']>;
  worksheetColumnGuid?: InputMaybe<Scalars['String']>;
  yearOverYear?: InputMaybe<Scalars['Boolean']>;
};

export type Input_Sage_Auto_Complete_V2_SageQuery_JoinPath = {
  joinGuid?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  rootTableGuid?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_SageQuery_TopInfo = {
  sortColumns?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery_ColumnSortInfo>>>;
  topCount?: InputMaybe<Scalars['Int']>;
};

export type Input_Sage_Auto_Complete_V2_SchemaGraphProto = {
  schemaTables?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_SchemaGraphProto_SchemaTable>>>;
};

export type Input_Sage_Auto_Complete_V2_SchemaGraphProto_SchemaJoin = {
  dstSchemaTableId?: InputMaybe<Scalars['Int']>;
  joinId?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_SchemaGraphProto_SchemaTable = {
  joins?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_SchemaGraphProto_SchemaJoin>>>;
  logicalTableId?: InputMaybe<Scalars['String']>;
  schemaTableId?: InputMaybe<Scalars['Int']>;
  userDefinedName?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_SearchAssistContext = {
  queryLessonId?: InputMaybe<Scalars['Int']>;
};

export type Input_Sage_Auto_Complete_V2_SortByPhraseMapping = {
  allowedAggregation?: InputMaybe<Array<InputMaybe<Sage_AggregationType_E>>>;
  allowedToken?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
};

export type Input_Sage_Auto_Complete_V2_Statement = {
  join?: InputMaybe<Input_Sage_Auto_Complete_V2_TableJoin>;
  query?: InputMaybe<Input_Sage_Auto_Complete_V2_SageQuery>;
};

export type Input_Sage_Auto_Complete_V2_TableJoin = {
  deprecatedTables?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
  header?: InputMaybe<Input_Sage_EntityHeader>;
  joinedColumns?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_TableJoin_JoinedColumn>>>;
  tables?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_TableJoin_JoinInputTable>>>;
};

export type Input_Sage_Auto_Complete_V2_TableJoin_JoinInputTable = {
  outerJoin?: InputMaybe<Scalars['Boolean']>;
  table?: InputMaybe<Input_Sage_EntityHeader>;
};

export type Input_Sage_Auto_Complete_V2_TableJoin_JoinedColumn = {
  input?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
  output?: InputMaybe<Input_Sage_EntityHeader>;
  serializedRecognizedToken?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_TokenEdit = {
  endOffset?: InputMaybe<Scalars['Int']>;
  op?: InputMaybe<Sage_Auto_Complete_V2_TokenEditOp_E>;
  startOffset?: InputMaybe<Scalars['Int']>;
  token?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
};

export type Input_Sage_Auto_Complete_V2_TokenEditOp = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_TokenList = {
  token?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_RecognizedToken>>>;
};

export type Input_Sage_Auto_Complete_V2_TokenMetadata = {
  deprecatedTableGuid?: InputMaybe<Scalars['String']>;
  deprecatedTableName?: InputMaybe<Scalars['String']>;
  isFormula?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  rootTables?: InputMaybe<Array<InputMaybe<Input_Sage_EntityHeader>>>;
  table?: InputMaybe<Input_Sage_EntityHeader>;
};

export type Input_Sage_Auto_Complete_V2_UserFeedback = {
  description?: InputMaybe<Scalars['String']>;
  userRating?: InputMaybe<Sage_Auto_Complete_V2_UserRating_E>;
};

export type Input_Sage_Auto_Complete_V2_UserRating = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Auto_Complete_V2_ValueList = {
  value?: InputMaybe<Array<InputMaybe<Input_Falcon_ConstantValue>>>;
};

export type Input_Sage_Auto_Complete_V2_WhiteSpaceElement = {
  count?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Sage_Auto_Complete_V2_WhiteSpaceElement_Type>;
};

export type Input_Sage_Auto_Complete_V2_WhiteSpaceInfo = {
  type?: InputMaybe<Sage_Auto_Complete_V2_WhiteSpaceInfo_Type>;
  whiteSpaceElement?: InputMaybe<Array<InputMaybe<Input_Sage_Auto_Complete_V2_WhiteSpaceElement>>>;
};

export type Input_Sage_Auto_Complete_V2_WordRange = {
  completeQuery?: InputMaybe<Scalars['Boolean']>;
  numWords?: InputMaybe<Scalars['Int']>;
  startIdx?: InputMaybe<Scalars['Int']>;
};

export type Input_Sage_Nlp_NlpText = {
  rawText?: InputMaybe<Scalars['String']>;
  sentence?: InputMaybe<Array<InputMaybe<Input_Sage_Nlp_SentenceProto>>>;
};

export type Input_Sage_Nlp_PosTag = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Nlp_ParseLabel = {
  /** NOT USED */
  _?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Nlp_SentenceProto = {
  rawText?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Array<InputMaybe<Input_Sage_Nlp_Token>>>;
};

export type Input_Sage_Nlp_SentenceTranslation = {
  sentenceProto?: InputMaybe<Input_Sage_Nlp_SentenceProto>;
  utterance?: InputMaybe<Scalars['String']>;
};

export type Input_Sage_Nlp_Token = {
  isBound?: InputMaybe<Scalars['Boolean']>;
  parentIndex?: InputMaybe<Scalars['Int']>;
  posTag?: InputMaybe<Sage_Nlp_PosTag_E>;
  rawPosTag?: InputMaybe<Scalars['String']>;
  rawText?: InputMaybe<Scalars['String']>;
  relation?: InputMaybe<Scalars['String']>;
  wordIndex?: InputMaybe<Scalars['Int']>;
};

export type Input_Sage_Nlp_TranslationCache = {
  translation?: InputMaybe<Array<InputMaybe<Input_Sage_Nlp_SentenceTranslation>>>;
};

export type Input_Util_CardinalityEstimatorProto = {
  maxTrailingZeroes?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type InsightAnalysisDetails = {
  __typename?: 'InsightAnalysisDetails';
  alpha?: Maybe<Scalars['Float']>;
  analysisClass?: Maybe<Scalars['String']>;
  mean?: Maybe<Scalars['Float']>;
  meanMultiplier?: Maybe<Scalars['Float']>;
  median?: Maybe<Scalars['Float']>;
  medianAbsDeviation?: Maybe<Scalars['Float']>;
  minAbsChangeRatio?: Maybe<Scalars['Float']>;
  minChangeRatio?: Maybe<Scalars['Float']>;
  pValue?: Maybe<Scalars['Float']>;
  pValueThresHold?: Maybe<Scalars['Float']>;
  relativeDiff?: Maybe<Scalars['Float']>;
  stdDev?: Maybe<Scalars['Float']>;
};

export type InsightAnswer = {
  __typename?: 'InsightAnswer';
  additionalInsights?: Maybe<Array<Maybe<Scalars['String']>>>;
  answer?: Maybe<AnswerEditSession>;
  descriptionAiGenerated?: Maybe<Scalars['Boolean']>;
  drillColumnId?: Maybe<Scalars['String']>;
  summaryDescription?: Maybe<Scalars['String']>;
};

export type InsightFeedBackResponse = {
  __typename?: 'InsightFeedBackResponse';
  Data?: Maybe<InsightFeedback>;
  Error?: Maybe<Scalars['String']>;
};

export type InsightFeedback = {
  __typename?: 'InsightFeedback';
  /** actual feedback Id */
  feedbackId?: Maybe<Scalars['String']>;
  /** insightId */
  id: Scalars['String'];
  isLiked?: Maybe<Scalars['Boolean']>;
};

export type InsightFeedbackQuestion = {
  __typename?: 'InsightFeedbackQuestion';
  feedbackAnswerOptions: Array<Maybe<FeedbackAnswerOption>>;
  feedbackQuestionParameters: Array<Maybe<Scalars['String']>>;
  /** if it is not a multiselect, it is radio */
  isMultiSelect: Scalars['Boolean'];
  type: FeedbackType;
};

/** Generic request response */
export type InstallCertificateResponse = {
  __typename?: 'InstallCertificateResponse';
  Data?: Maybe<Scalars['JSON']>;
  Error?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['Int']>;
};

/** Return type for invite users call */
export type InvitedUsersInfo = {
  __typename?: 'InvitedUsersInfo';
  /** activationUrls of the created users */
  activationUrls?: Maybe<Array<Scalars['String']>>;
  /** Id of the shared group to which the new users are assigned */
  sharedGroupId?: Maybe<Scalars['String']>;
  /** UserIds of the created users */
  userIds?: Maybe<Array<Scalars['String']>>;
};

export type JobExitStatus = {
  __typename?: 'JobExitStatus';
  detail: Scalars['String'];
};

export type JobRun = {
  __typename?: 'JobRun';
  endTime: Scalars['Long'];
  exitStatus: JobExitStatus;
  progress?: Maybe<ProgressReport>;
  runId: Scalars['String'];
  runState: JobRunState;
  startTime: Scalars['Long'];
};

export type JobRunState = {
  __typename?: 'JobRunState';
  state: ScheduleRunState;
};

export type JobRuns = {
  __typename?: 'JobRuns';
  analysisResultId?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  timeTaken?: Maybe<Scalars['Int']>;
};

export type JobRunsResponse = {
  __typename?: 'JobRunsResponse';
  jobRunsList: Array<JobRuns>;
  queryList: Array<PhrasedToken>;
};

export type JobSchedule = {
  dayOfMonth: Scalars['String'];
  dayOfWeek: Scalars['String'];
  hour: Scalars['String'];
  minute: Scalars['String'];
  month: Scalars['String'];
  second: Scalars['String'];
};

export enum JobStatusEnum {
  Cleanup = 'CLEANUP',
  Default = 'DEFAULT',
  Expired = 'EXPIRED',
  Paused = 'PAUSED',
  Scheduled = 'SCHEDULED',
  Stopped = 'STOPPED'
}

export type Join = {
  __typename?: 'Join';
  destColumn: Array<SageEntityHeader>;
  destination?: Maybe<SageEntityHeader>;
  id?: Maybe<SageEntityHeader>;
  joinNulls: Scalars['Boolean'];
  joinType: JoinType;
  oneToOne: Scalars['Boolean'];
  source?: Maybe<SageEntityHeader>;
  sourceColumn: Array<SageEntityHeader>;
};

export type JoinContent = {
  destination?: InputMaybe<Scalars['String']>;
  isOneToOne?: InputMaybe<Scalars['Boolean']>;
  joinType?: InputMaybe<Scalars['String']>;
  relatedColumns?: InputMaybe<Array<RelatedColumn>>;
  source?: InputMaybe<Scalars['String']>;
};

export type JoinHeader = {
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
};

export type JoinInput = {
  destColumn: Array<SageEntityHeaderInput>;
  destination?: InputMaybe<SageEntityHeaderInput>;
  id?: InputMaybe<SageEntityHeaderInput>;
  joinNulls: Scalars['Boolean'];
  joinType: JoinType;
  oneToOne: Scalars['Boolean'];
  source?: InputMaybe<SageEntityHeaderInput>;
  sourceColumn: Array<SageEntityHeaderInput>;
};

export type JoinPath = {
  __typename?: 'JoinPath';
  id?: Maybe<SageEntityHeader>;
  isConnected?: Maybe<Scalars['Boolean']>;
  join?: Maybe<Array<Join>>;
  leafTable?: Maybe<SageEntityHeader>;
  rootTable?: Maybe<SageEntityHeader>;
};

export type JoinPathAmbiguityInfo = {
  __typename?: 'JoinPathAmbiguityInfo';
  joinPathAmbiguity?: Maybe<Array<Maybe<JoinPathCollection>>>;
  newTokens?: Maybe<Array<SageToken>>;
  oldTokens?: Maybe<Array<SageToken>>;
};

export type JoinPathChoice = {
  __typename?: 'JoinPathChoice';
  affectedToken?: Maybe<Array<Maybe<Scalars['Int']>>>;
  newRoot?: Maybe<Scalars['String']>;
  newTokenEditable?: Maybe<Scalars['Boolean']>;
  newTokenPath?: Maybe<JoinPath>;
  oldRoot?: Maybe<Scalars['String']>;
  oldTokensEditable?: Maybe<Scalars['Boolean']>;
  prefferedChoice?: Maybe<Scalars['Boolean']>;
  prependPath?: Maybe<JoinPath>;
};

export type JoinPathCollection = {
  __typename?: 'JoinPathCollection';
  choice?: Maybe<Array<JoinPathChoice>>;
  newTokenIndex?: Maybe<Scalars['Int']>;
  newTokenIndices?: Maybe<Array<Scalars['Int']>>;
  oldColumnGuid?: Maybe<Array<Scalars['String']>>;
  rootIndex?: Maybe<Scalars['Int']>;
};

export type JoinPathInput = {
  id?: InputMaybe<SageEntityHeaderInput>;
  isConnected?: InputMaybe<Scalars['Boolean']>;
  join: Array<JoinInput>;
  /** Deprecated */
  joins?: InputMaybe<SageEntityHeaderInput>;
  leafTable?: InputMaybe<SageEntityHeaderInput>;
  rootTable?: InputMaybe<SageEntityHeaderInput>;
};

export type JoinRepresentation = {
  __typename?: 'JoinRepresentation';
  destination?: Maybe<TableRepresentation>;
  relationshipName?: Maybe<Scalars['String']>;
  source?: Maybe<TableRepresentation>;
};

export enum JoinType {
  Cross = 'CROSS',
  FullOuter = 'FULL_OUTER',
  Inner = 'INNER',
  LeftOuter = 'LEFT_OUTER',
  RightOuter = 'RIGHT_OUTER'
}

/**
 * The below types/enums is hardcoded till we find out how to get this imported by graphql
 * What we are seeing is that this is defined in types but not getting used in prism.
 * These types are only used in FE. We do not have a pretty solution for this usecase as of now.
 * So keeping it here till we figure this out to force codegen to pick these up.
 */
export type KpiTuple = {
  __typename?: 'KpiTuple';
  relativePercentChange: Scalars['Int'];
  time: Scalars['Long'];
  type: TupleType;
  value: Scalars['Int'];
};

export enum LayoutType {
  Pinboard = 'PINBOARD',
  Visualization = 'VISUALIZATION'
}

export enum LegendPositionOptions {
  BottomLegend = 'BOTTOM_LEGEND',
  LeftLegend = 'LEFT_LEGEND',
  RightLegend = 'RIGHT_LEGEND',
  TopLegend = 'TOP_LEGEND'
}

/** Generated from sage/public/learnbility.proto LessonAdviceType */
export enum LessonAdviceType {
  AttributeColumn = 'ATTRIBUTE_COLUMN',
  ColumnOpFilter = 'COLUMN_OP_FILTER',
  CustomCalendar = 'CUSTOM_CALENDAR',
  Done = 'DONE',
  ErrorRemove = 'ERROR_REMOVE',
  ForEach = 'FOR_EACH',
  Geofilter = 'GEOFILTER',
  GrowthOf = 'GROWTH_OF',
  Having = 'HAVING',
  InitialAttribute = 'INITIAL_ATTRIBUTE',
  InitialMeasure = 'INITIAL_MEASURE',
  InFilter = 'IN_FILTER',
  LessonNotPossible = 'LESSON_NOT_POSSIBLE',
  LessonNotStarted = 'LESSON_NOT_STARTED',
  MeasureColumn = 'MEASURE_COLUMN',
  PhraseDone = 'PHRASE_DONE',
  PositiveInt = 'POSITIVE_INT',
  SimpleOpAttributeFilter = 'SIMPLE_OP_ATTRIBUTE_FILTER',
  SimpleOpMeasureFilter = 'SIMPLE_OP_MEASURE_FILTER',
  SingleColumnVersus = 'SINGLE_COLUMN_VERSUS',
  SortBy = 'SORT_BY',
  TimeBucket = 'TIME_BUCKET',
  TimeFilters = 'TIME_FILTERS',
  TopBottom = 'TOP_BOTTOM',
  Value1VsValue2 = 'VALUE1_VS_VALUE2'
}

/** LessonPlan for the analystAuthoredQueries */
export type LessonPlan = {
  __typename?: 'LessonPlan';
  example?: Maybe<Scalars['String']>;
  isLessonFilled?: Maybe<Scalars['Boolean']>;
  lessonId: Scalars['Int'];
  placeholders: Array<Scalars['String']>;
  templateEntryList: Array<Maybe<TemplateEntries>>;
};

export type LessonPlanInput = {
  example?: InputMaybe<Scalars['String']>;
  isLessonFilled?: InputMaybe<Scalars['Boolean']>;
  lessonId: Scalars['Int'];
  templateEntryList: Array<TemplateEntriesInput>;
};

export type LinearRegression = {
  minRows?: InputMaybe<Scalars['Int']>;
  multiplier?: InputMaybe<Scalars['Float']>;
  pValueThreshold?: InputMaybe<Scalars['Float']>;
};

export type LinkedFilterColumn = {
  __typename?: 'LinkedFilterColumn';
  primaryFilterColumn?: Maybe<FilterGroupId>;
  secondaryFilterColumns?: Maybe<Array<Maybe<FilterGroupId>>>;
};

export type ListAnalysesRequest = {
  batchSize?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  searchPattern?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<AnalysisSortBy>;
  sortReversed?: InputMaybe<Scalars['Boolean']>;
  triggeredByCurrentUser?: InputMaybe<Scalars['Boolean']>;
};

export type ListAnalysesResponse = {
  __typename?: 'ListAnalysesResponse';
  analysisInfo: Array<AnalysisInfo>;
  guid: Scalars['GUID'];
  hasMore: Scalars['Boolean'];
  sortIgnored: Scalars['Boolean'];
};

export enum ListCategory {
  All = 'ALL',
  Favorite = 'FAVORITE',
  My = 'MY',
  Requested = 'REQUESTED'
}

/** A type that describes a Data Source */
export type ListMetadataHeader = {
  __typename?: 'ListMetadataHeader';
  /** Table's author id */
  author?: Maybe<Scalars['String']>;
  /** Table's display name for author */
  authorDisplayName?: Maybe<Scalars['String']>;
  /** Table's author name */
  authorName?: Maybe<Scalars['String']>;
  /** Table's time of creation */
  created: Scalars['Float'];
  /** Table's database */
  databaseStripe?: Maybe<Scalars['String']>;
  /** Table's id */
  id: Scalars['GUID'];
  /** Table's auto created status */
  isAutoCreated?: Maybe<Scalars['Boolean']>;
  /** Table's auto deleted status */
  isAutoDelete?: Maybe<Scalars['Boolean']>;
  /** Check if table is external or not */
  isExternal?: Maybe<Scalars['Boolean']>;
  /** Table's materialized status */
  isMaterialized?: Maybe<Scalars['Boolean']>;
  /** Table's time of modification */
  modified: Scalars['Float'];
  /** Table's modifier */
  modifiedBy?: Maybe<Scalars['String']>;
  /** Table's name */
  name: Scalars['String'];
  /** Table's owner */
  owner?: Maybe<Scalars['String']>;
  /** Table's row count */
  rowCount?: Maybe<Scalars['Int']>;
  /** Table's schema */
  schemaStripe?: Maybe<Scalars['String']>;
  /** Table's tags */
  tags?: Maybe<Array<Tag>>;
  /** Table's type */
  type?: Maybe<Scalars['String']>;
};

export type ListMetadataHeaderParams = {
  batchSize?: InputMaybe<Scalars['Float']>;
  connectionId?: InputMaybe<Scalars['String']>;
  fetchIds?: InputMaybe<Array<Scalars['String']>>;
  offset?: InputMaybe<Scalars['Float']>;
  pattern?: InputMaybe<Scalars['String']>;
  skipIds?: InputMaybe<Array<Scalars['String']>>;
  sort?: InputMaybe<Scalars['String']>;
  sortAscending: Scalars['Boolean'];
};

export type ListMonitorRulesForMetricResponse = {
  __typename?: 'ListMonitorRulesForMetricResponse';
  monitorRules: Array<Maybe<MonitorRuleInfoWithStatus>>;
};

export type ListMonitorRulesForUserResponse = {
  __typename?: 'ListMonitorRulesForUserResponse';
  currentOffset: Scalars['Long'];
  isFinalPage: Scalars['Boolean'];
  monitorRules: Array<Maybe<MonitorRuleInfoWithStatus>>;
  nextOffset: Scalars['Long'];
  totalResults: Scalars['Long'];
};

/** Specifies the List Type */
export enum ListType {
  DataSource = 'DATA_SOURCE',
  File = 'FILE',
  LogicalColumn = 'LOGICAL_COLUMN',
  LogicalRelationship = 'LOGICAL_RELATIONSHIP',
  LogicalTable = 'LOGICAL_TABLE',
  PinboardAnswerBook = 'PINBOARD_ANSWER_BOOK',
  PinboardAnswerSheet = 'PINBOARD_ANSWER_SHEET',
  QuestionAnswerBook = 'QUESTION_ANSWER_BOOK',
  QuestionAnswerSheet = 'QUESTION_ANSWER_SHEET',
  RTemplate = 'R_TEMPLATE',
  Tag = 'TAG',
  User = 'USER',
  UserGroup = 'USER_GROUP'
}

export type LiveboardNameAndId = {
  __typename?: 'LiveboardNameAndID';
  /** GUID of the liveboard */
  id?: Maybe<Scalars['String']>;
  /** Name of the liveboard */
  name?: Maybe<Scalars['String']>;
};

export type LiveboardQueryResponse = {
  __typename?: 'LiveboardQueryResponse';
  /** The GUID of the Liveboard */
  id?: Maybe<Scalars['String']>;
  /** The name of the Liveboard */
  name?: Maybe<Scalars['String']>;
  /** SQL query associated with the saved Answer */
  viz?: Maybe<Array<Maybe<VizType>>>;
};

export type LoadWorksheetRequest = {
  id?: InputMaybe<Scalars['String']>;
};

export type LogicalColumnPreview = {
  __typename?: 'LogicalColumnPreview';
  column?: Maybe<EntityHeader>;
  isHidden?: Maybe<Scalars['Boolean']>;
};

export type LogicalTableHeader = {
  __typename?: 'LogicalTableHeader';
  author?: Maybe<Scalars['String']>;
  authorDisplayName?: Maybe<Scalars['String']>;
  authorName?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['Float']>;
  database?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  generationNum?: Maybe<Scalars['Int']>;
  hidden?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  modified?: Maybe<Scalars['Float']>;
  modifiedBy?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  schema?: Maybe<Scalars['String']>;
  subType?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type LogicalTablePreview = {
  __typename?: 'LogicalTablePreview';
  author?: Maybe<EntityHeader>;
  column?: Maybe<Array<Maybe<EntityHeader>>>;
  createMS?: Maybe<Scalars['Int']>;
  database?: Maybe<EntityHeader>;
  header?: Maybe<EntityHeader>;
  lastUpdateMS?: Maybe<Scalars['Int']>;
  loicalColumn?: Maybe<Array<Maybe<LogicalColumnPreview>>>;
  schema?: Maybe<EntityHeader>;
};

export type LogicalTablePreviewRequest = {
  id: BachSessionIdInput;
  tableIds: Array<Scalars['String']>;
};

export type LogicalTablePreviewResponse = {
  __typename?: 'LogicalTablePreviewResponse';
  table?: Maybe<Array<Maybe<LogicalTablePreview>>>;
};

export enum LogicalTableTypeEnum {
  AggrWorksheet = 'AGGR_WORKSHEET',
  CalendarTable = 'CALENDAR_TABLE',
  DbView = 'DB_VIEW',
  MaterializedView = 'MATERIALIZED_VIEW',
  OneToOneLogical = 'ONE_TO_ONE_LOGICAL',
  PrivateWorksheet = 'PRIVATE_WORKSHEET',
  SqlView = 'SQL_VIEW',
  UserDefined = 'USER_DEFINED',
  Worksheet = 'WORKSHEET'
}

/** Login response */
export type LoginResponse = {
  __typename?: 'LoginResponse';
  Data?: Maybe<Scalars['JSON']>;
  Error?: Maybe<Scalars['String']>;
};

export type LogsResponse = {
  __typename?: 'LogsResponse';
  /** Date and time for the event in the log */
  date?: Maybe<Scalars['String']>;
  /** Logged event at the time specified in JSON format. This includes, Event ID, A unique description of the event, for example, User login failed, Timestamp, User ID of the person initiating the event and IP address of the ThoughtSpot instance. */
  log?: Maybe<Scalars['String']>;
};

export enum LogsValues {
  SecurityLogs = 'security_logs'
}

export type MadMedian = {
  median?: InputMaybe<Scalars['Float']>;
  medianAbsDev?: InputMaybe<Scalars['Float']>;
  minRows?: InputMaybe<Scalars['Int']>;
  multiplier?: InputMaybe<Scalars['Float']>;
};

export type MapAttributeData = {
  __typename?: 'MapAttributeData';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  roles?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type MapViewport = {
  __typename?: 'MapViewport';
  center?: Maybe<Array<Maybe<Scalars['Float']>>>;
  extent?: Maybe<Array<Maybe<Scalars['Float']>>>;
  zoomLevel?: Maybe<Scalars['Float']>;
};

export type MaxInsightOptions = {
  boostDateColumns?: InputMaybe<Scalars['Boolean']>;
  crossCorrelationAllPairs?: InputMaybe<Scalars['Boolean']>;
  maxAnomalies?: InputMaybe<Scalars['Float']>;
  maxAnomalyExplanationInsights?: InputMaybe<Scalars['Float']>;
  maxCrossCorrelationDateColumns?: InputMaybe<Scalars['Float']>;
  maxCrossCorrelationInsights?: InputMaybe<Scalars['Float']>;
  maxDateColumns?: InputMaybe<Scalars['Float']>;
  maxDrillAttributes?: InputMaybe<Scalars['Float']>;
  maxLrAnomalies?: InputMaybe<Scalars['Float']>;
  maxMeasures?: InputMaybe<Scalars['Float']>;
  maxShesdAnomalies?: InputMaybe<Scalars['Float']>;
  maxTrends?: InputMaybe<Scalars['Float']>;
  simpleChangeDistribution?: InputMaybe<Scalars['Boolean']>;
};

export type MaxInsightsOpts = {
  __typename?: 'MaxInsightsOpts';
  crossCorrelationAllPairs?: Maybe<Scalars['Boolean']>;
  maxAnomalies: Scalars['Float'];
  maxAnomalyExplanationInsights: Scalars['Float'];
  maxCrossCorrelationInsights: Scalars['Float'];
  maxDrillAttributes: Scalars['Float'];
  maxLrAnomalies?: Maybe<Scalars['Float']>;
  maxMeasures: Scalars['Float'];
  maxShesdAnomalies: Scalars['Float'];
  maxTrends: Scalars['Float'];
  simpleChangeDistribution?: Maybe<Scalars['Boolean']>;
};

/** A type that describes member details response. */
export type MembersDetailsResponse = {
  __typename?: 'MembersDetailsResponse';
  /** billing token for user */
  billingToken?: Maybe<Scalars['String']>;
  /** user creation timestamp */
  created?: Maybe<Scalars['Float']>;
  /** user discount offer details */
  discountDetail?: Maybe<DiscountDetail>;
  /** displayName of the user */
  displayName?: Maybe<Scalars['String']>;
  /** email of the user */
  email: Scalars['String'];
  /** id of the user */
  id: Scalars['GUID'];
  /** is user team owner ? */
  isOwner?: Maybe<Scalars['Boolean']>;
  /** iv random string for encryption */
  iv?: Maybe<Scalars['String']>;
  /** user modified timestamp */
  modified?: Maybe<Scalars['Float']>;
  /** purchase option type BUY_NOW CONTACT_SALES NONE or null */
  purchaseOption?: Maybe<Scalars['String']>;
  /** subscription type FREE_TRIAL TEAMS EDITION or null */
  subscriptionType?: Maybe<Scalars['String']>;
};

/** A type that describes a members list header. */
export type MembersListHeader = {
  __typename?: 'MembersListHeader';
  /** Member's created timestamp */
  created?: Maybe<Scalars['Float']>;
  /** Member's name */
  displayName?: Maybe<Scalars['String']>;
  /** Member's author id */
  email: Scalars['String'];
  /** Member's id */
  id: Scalars['GUID'];
  /** Member's author name */
  isOwner?: Maybe<Scalars['Boolean']>;
  /** Member's modified timestamp */
  modified?: Maybe<Scalars['Float']>;
};

export type MembersListHeaderParams = {
  batchSize?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  pattern?: InputMaybe<Scalars['String']>;
  pending?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['String']>;
  sortAscending: Scalars['Boolean'];
};

/** A type that describes member list response */
export type MembersListResponse = {
  __typename?: 'MembersListResponse';
  isLastBatch?: Maybe<Scalars['Boolean']>;
  membersListHeader?: Maybe<Array<Maybe<MembersListHeader>>>;
};

/** A type that describes a Data Source */
export type Metadata = {
  __typename?: 'Metadata';
  /** Flag if ai generated answer is disabled. */
  aiAnswerGenerationDisabled?: Maybe<Scalars['Boolean']>;
  /** The data source's author id */
  author?: Maybe<Scalars['String']>;
  /** The data source's display name for author */
  authorDisplayName?: Maybe<Scalars['String']>;
  /** The data source's author name */
  authorName?: Maybe<Scalars['String']>;
  catalogInfo?: Maybe<CatalogInfo>;
  clientState?: Maybe<ClientStateObject>;
  /** The data source's time of creation */
  created?: Maybe<Scalars['Float']>;
  /** Boolean representing whether data upload is enabled or not */
  dataUploadEnabled?: Maybe<Scalars['Boolean']>;
  /** The data source's database */
  database?: Maybe<Scalars['String']>;
  /** The data source's description */
  description?: Maybe<Scalars['String']>;
  /** display name for a USER */
  displayName?: Maybe<Scalars['String']>;
  /** The data source's id */
  id: Scalars['GUID'];
  /** Check if data source is deprecated or not */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** Check if data source is external or not */
  isExternal?: Maybe<Scalars['Boolean']>;
  /** Check if the view is Materialized or not */
  isMaterialized?: Maybe<Scalars['Boolean']>;
  /** The data source's time of modification */
  modified?: Maybe<Scalars['Float']>;
  /** The data source's modifier */
  modifiedBy?: Maybe<Scalars['String']>;
  /** The data source's user name of modification */
  modifiedByName?: Maybe<Scalars['String']>;
  /** The data source's name */
  name: Scalars['String'];
  numDefaultPinboards?: Maybe<Scalars['Int']>;
  /** Number of users in the group */
  numMemberUsers?: Maybe<Scalars['Int']>;
  /** The data source's orgIds */
  orgIds?: Maybe<Array<Scalars['Int']>>;
  /** The data source's owner */
  owner?: Maybe<Scalars['String']>;
  /** Represents why a connection is accessible to the user */
  relationWithUser?: Maybe<Scalars['String']>;
  /** The data source's schema */
  schema?: Maybe<Scalars['String']>;
  /** The data source's tags */
  tags?: Maybe<Array<Tag>>;
  /** The data source's type */
  type?: Maybe<Scalars['String']>;
};

export type MetadataDateFilterValue = {
  __typename?: 'MetadataDateFilterValue';
  datePeriod?: Maybe<Scalars['String']>;
  /** used in exact date range queries such as 'between 10/10/2010 and 10/11/2011' */
  dateRange?: Maybe<FilterDateRange>;
  /** epoch in server time (in seconds) for EXACT_DATE or EXACT_TIME */
  epoch?: Maybe<Scalars['String']>;
  /**
   * Last/First period filters may also be applied for each of the higher level
   * time period. e.g. last month for each year.
   * This field indicates the higher level time period over which the the filter
   * is to be applied.
   * default = NUM_DATE_PERIODS
   */
  forEachPeriod?: Maybe<Scalars['String']>;
  monthName?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  /** used in inequality filters such as after Q1 2014 */
  op?: Maybe<Scalars['String']>;
  quarterName?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  weekDayName?: Maybe<Scalars['String']>;
  yearName?: Maybe<Scalars['String']>;
};

export type MetadataDetailColumn = {
  __typename?: 'MetadataDetailColumn';
  dataType?: Maybe<Scalars['String']>;
  header?: Maybe<MetadataDetailColumnHeader>;
};

export type MetadataDetailColumnHeader = {
  __typename?: 'MetadataDetailColumnHeader';
  name?: Maybe<Scalars['String']>;
};

/** List of metadata items */
export type MetadataList = {
  __typename?: 'MetadataList';
  isLastBatch?: Maybe<Scalars['Boolean']>;
  objects?: Maybe<Array<Metadata>>;
};

export type MetadataListAsParamsInput = {
  batchSize?: InputMaybe<Scalars['Float']>;
  minimumAccessLevel?: InputMaybe<ShareType>;
  offset?: InputMaybe<Scalars['Float']>;
  pattern?: InputMaybe<Scalars['String']>;
  principalId?: InputMaybe<Scalars['String']>;
};

export type MetadataListParamsInput = {
  /** Author Id */
  authorId?: InputMaybe<Scalars['String']>;
  autoCreated?: InputMaybe<Scalars['Boolean']>;
  batchSize?: InputMaybe<Scalars['Float']>;
  category?: InputMaybe<ListCategory>;
  fetchIds?: InputMaybe<Array<Scalars['String']>>;
  fetchPermissions?: InputMaybe<Scalars['Boolean']>;
  offset?: InputMaybe<Scalars['Float']>;
  /** Pattern you want to search for */
  pattern?: InputMaybe<Scalars['String']>;
  showHidden?: InputMaybe<Scalars['Boolean']>;
  skipIds?: InputMaybe<Array<Scalars['String']>>;
  /**
   * Takes the column name in which you want to sort
   * Valid values - DEFAULT, NAME, DISPLAY_NAME, AUTHOR, CREATED, MODIFIED
   */
  sort?: InputMaybe<Scalars['String']>;
  sortAscending?: InputMaybe<Scalars['Boolean']>;
  subtypes?: InputMaybe<Array<InputMaybe<SubTypes>>>;
  /** Array of Tag Names */
  tagName?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<ListType>;
};

export type MetadataListWithStatsParamsInput = {
  authorguid?: InputMaybe<Scalars['GUID']>;
  batchSize?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<ListCategory>;
  offset?: InputMaybe<Scalars['Int']>;
  pattern?: InputMaybe<Scalars['String']>;
  showhidden?: InputMaybe<Scalars['Boolean']>;
  skipids?: InputMaybe<Array<Scalars['String']>>;
  /**
   * Takes the column name in which you want to sort
   * Valid values - DEFAULT, NAME, DISPLAY_NAME, AUTHOR, CREATED, MODIFIED, LAST_ACCESSED
   */
  sort?: InputMaybe<Scalars['String']>;
  sortascending?: InputMaybe<Scalars['Boolean']>;
  tagname?: InputMaybe<Array<Scalars['String']>>;
  /**
   * Takes a list of types and all of these will be returned
   * Valid values - any combination of the folowing: QUESTION_ANSWER_BOOK, PINBOARD_ANSWER_BOOK, QUESTION_ANSWER_SHEET, PINBOARD_ANSWER_SHEET, LOGICAL_COLUMN, LOGICAL_TABLE, LOGICAL_RELATIONSHIP, TAG, DATA_SOURCE
   * Example: [QUESTION_ANSWER_BOOK, PINBOARD_ANSWER_BOOK]
   */
  types?: InputMaybe<Array<ListType>>;
};

export type MetadataObjectIdWithTypeInput = {
  id: Scalars['String'];
  type: ListType;
};

export type MetadataPropertyWithCountList = {
  __typename?: 'MetadataPropertyWithCountList';
  objects?: Maybe<Array<Maybe<PropertyWithCount>>>;
  totalCountWithFilter?: Maybe<Scalars['Int']>;
};

export type MetadataPropertyWithCountParamsInput = {
  authorguid?: InputMaybe<Scalars['GUID']>;
  category?: InputMaybe<ListCategory>;
  filtertypes?: InputMaybe<Array<ListType>>;
  property?: InputMaybe<Scalars['String']>;
  subtypes?: InputMaybe<Array<InputMaybe<SubTypes>>>;
  tagname?: InputMaybe<Array<Scalars['String']>>;
};

export type MetadataTagResponse = {
  __typename?: 'MetadataTagResponse';
  /** Author of tag */
  author?: Maybe<TagNameAndId>;
  /** State associated with the tag */
  clientState?: Maybe<ClientState>;
  /** Date and time when group was created */
  created?: Maybe<Scalars['Float']>;
  generationNum?: Maybe<Scalars['Float']>;
  /** GUID of the tag */
  id?: Maybe<Scalars['String']>;
  indexVersion?: Maybe<Scalars['Float']>;
  /** Indicates if the tag is deleted */
  isDeleted?: Maybe<Scalars['Boolean']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** Indicates if the tag is from external system */
  isExternal?: Maybe<Scalars['Boolean']>;
  /** Indicates if the tag is hidden */
  isHidden?: Maybe<Scalars['Boolean']>;
  /** Date and time of last modification of the group */
  modified?: Maybe<Scalars['Float']>;
  /** The user which last modified the tag details */
  modifiedBy?: Maybe<TagNameAndId>;
  /** Name of the tag */
  name?: Maybe<Scalars['String']>;
  /** The owner of the tag */
  owner?: Maybe<TagNameAndId>;
};

/** List of all metadata types */
export enum MetadataType {
  AggrWorksheet = 'AGGR_WORKSHEET',
  DataSource = 'DATA_SOURCE',
  DbView = 'DB_VIEW',
  Filter = 'FILTER',
  LogicalColumn = 'LOGICAL_COLUMN',
  LogicalRelationship = 'LOGICAL_RELATIONSHIP',
  LogicalTable = 'LOGICAL_TABLE',
  OneToOneLogical = 'ONE_TO_ONE_LOGICAL',
  PinboardAnswerBook = 'PINBOARD_ANSWER_BOOK',
  PrivateWorksheet = 'PRIVATE_WORKSHEET',
  QuestionAnswerBook = 'QUESTION_ANSWER_BOOK',
  RelatedLink = 'RELATED_LINK',
  ReportBook = 'REPORT_BOOK',
  RTemplate = 'R_TEMPLATE',
  TableFilter = 'TABLE_FILTER',
  Tag = 'TAG',
  User = 'USER',
  UserData = 'USER_DATA',
  UserDefined = 'USER_DEFINED',
  UserGroup = 'USER_GROUP',
  UserQuestion = 'USER_QUESTION',
  UserRole = 'USER_ROLE',
  Visualization = 'VISUALIZATION',
  Worksheet = 'WORKSHEET'
}

/** A type that describes an item in metadata with stats */
export type MetadataWithStats = {
  __typename?: 'MetadataWithStats';
  /** The answer/pinboard author id */
  author?: Maybe<Scalars['String']>;
  /** The answer/pinboard display name for author */
  authorDisplayName?: Maybe<Scalars['String']>;
  /** The answer/pinboard author name */
  authorName?: Maybe<Scalars['String']>;
  /** The answer/pinboard time of creation */
  created?: Maybe<Scalars['Float']>;
  /** favorites */
  favorites?: Maybe<Scalars['Float']>;
  /** Whether the object is discoverable */
  hasLenientDiscoverability?: Maybe<Scalars['Boolean']>;
  /** The answer/pinboard id */
  id?: Maybe<Scalars['GUID']>;
  /** Check if data source is external or not */
  isExternal?: Maybe<Scalars['Boolean']>;
  /** isFavorite */
  isFavorite?: Maybe<Scalars['Boolean']>;
  /** Whether all mandatory filters are non-empty */
  isMandatoryFilterValueSelected?: Maybe<Scalars['Boolean']>;
  /** Last time of access */
  lastAccessed?: Maybe<Scalars['Float']>;
  metadataType?: Maybe<Scalars['String']>;
  /** The answer/pinboard time of modification */
  modified?: Maybe<Scalars['Float']>;
  /** The answer/pinboard modifier */
  modifiedBy?: Maybe<Scalars['String']>;
  /** The answer/pinboard name */
  name?: Maybe<Scalars['String']>;
  /** The answer/pinboard owner */
  owner?: Maybe<Scalars['String']>;
  /** The answer/pinboard tags */
  tags?: Maybe<Array<Maybe<Tag>>>;
  type?: Maybe<Scalars['String']>;
  /** The answer/pinboard number of views */
  views?: Maybe<Scalars['Float']>;
};

export type MetadataWithStatsList = {
  __typename?: 'MetadataWithStatsList';
  category?: Maybe<ListCategory>;
  isLastBatch?: Maybe<Scalars['Boolean']>;
  objects?: Maybe<Array<Maybe<MetadataWithStats>>>;
};

export type Metric = {
  __typename?: 'Metric';
  chartType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  metadataType: ListType;
  name: Scalars['String'];
  vizType: Scalars['String'];
};

export type MetricData = {
  __typename?: 'MetricData';
  chartVizData?: Maybe<ChartVizData>;
  metricId?: Maybe<MetricId>;
};

export type MetricId = {
  __typename?: 'MetricId';
  answerId?: Maybe<Scalars['String']>;
  personalisedViewId?: Maybe<Scalars['String']>;
  pinboardVizId?: Maybe<PinboardVizId>;
};

export type MetricIdInput = {
  answerId?: InputMaybe<Scalars['String']>;
  personalisedViewId?: InputMaybe<Scalars['String']>;
  pinboardVizId?: InputMaybe<PinboardVizIdInput>;
};

export type MetricMetaData = {
  __typename?: 'MetricMetaData';
  liveboardTitle?: Maybe<Scalars['String']>;
  metricName?: Maybe<Scalars['String']>;
};

export type MetricsList = {
  __typename?: 'MetricsList';
  objects?: Maybe<Array<Maybe<Metric>>>;
};

export type MetricsParamsInput = {
  id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ListType>;
};

/**  Generated from tsProto.a3.metric_monitor.MonitorAlertType  */
export enum MonitorAlertType {
  ScheduleBasedAlerts = 'SCHEDULE_BASED_ALERTS',
  ThresholdBasedAlerts = 'THRESHOLD_BASED_ALERTS',
  Unspecified = 'UNSPECIFIED'
}

export type MonitorRule = {
  __typename?: 'MonitorRule';
  condition?: Maybe<Condition>;
  customMessage?: Maybe<Scalars['String']>;
  frequency: FrequencySpec;
  metricId: MetricId;
  notificationChannels?: Maybe<Array<Maybe<NotificationChannel>>>;
  ruleId?: Maybe<Scalars['String']>;
  subscribers: Array<Maybe<Subscriber>>;
  title: Scalars['String'];
  webhookId?: Maybe<Scalars['String']>;
};

/**  Generated from tsProto.a3.metric_monitor.MonitorRuleAPIStatus.MonitorRuleAPICode  */
export enum MonitorRuleApiCode {
  StatusCodeDataFetchError = 'STATUS_CODE_DATA_FETCH_ERROR',
  StatusCodeError = 'STATUS_CODE_ERROR',
  StatusCodeInsufficientDataError = 'STATUS_CODE_INSUFFICIENT_DATA_ERROR',
  StatusCodeInvalidRequest = 'STATUS_CODE_INVALID_REQUEST',
  StatusCodeMetricNotMonitorable = 'STATUS_CODE_METRIC_NOT_MONITORABLE',
  StatusCodeMonitorableNotFound = 'STATUS_CODE_MONITORABLE_NOT_FOUND',
  StatusCodeOk = 'STATUS_CODE_OK',
  StatusCodePermissionsNotFound = 'STATUS_CODE_PERMISSIONS_NOT_FOUND',
  StatusCodeRuleNotFound = 'STATUS_CODE_RULE_NOT_FOUND',
  StatusCodeUnauthorized = 'STATUS_CODE_UNAUTHORIZED',
  StatusCodeUnspecified = 'STATUS_CODE_UNSPECIFIED',
  StatusCodeUnsupportedTimeBucket = 'STATUS_CODE_UNSUPPORTED_TIME_BUCKET',
  StatusCodeUserAlreadySubscribed = 'STATUS_CODE_USER_ALREADY_SUBSCRIBED',
  StatusCodeUserNotFound = 'STATUS_CODE_USER_NOT_FOUND',
  StatusCodeUserNotSubscribed = 'STATUS_CODE_USER_NOT_SUBSCRIBED'
}

export type MonitorRuleApiStatus = {
  __typename?: 'MonitorRuleAPIStatus';
  code: MonitorRuleApiCode;
  message?: Maybe<Scalars['String']>;
};

export type MonitorRuleInfo = {
  __typename?: 'MonitorRuleInfo';
  condition?: Maybe<Condition>;
  customMessage?: Maybe<Scalars['String']>;
  frequency: FrequencySpec;
  id: Scalars['String'];
  isOwnedByCurrentUser: Scalars['Boolean'];
  isSubscribedByCurrentUser: Scalars['Boolean'];
  metricId: MetricId;
  metricName: Scalars['String'];
  numberOfSubscribers: Scalars['Long'];
  owner: User;
  title: Scalars['String'];
};

export type MonitorRuleInfoWithStatus = {
  __typename?: 'MonitorRuleInfoWithStatus';
  monitorRuleInfo: MonitorRuleInfo;
  status: MonitorRuleApiStatus;
};

export type MonitorRuleInput = {
  condition?: InputMaybe<ConditionSpecInput>;
  customMessage?: InputMaybe<Scalars['String']>;
  frequency?: InputMaybe<FrequencySpecInput>;
  metricId?: InputMaybe<MetricIdInput>;
  notificationChannels?: InputMaybe<Array<InputMaybe<NotificationChannel>>>;
  ruleId?: InputMaybe<Scalars['String']>;
  subscribers: Array<InputMaybe<SubscriberInput>>;
  title?: InputMaybe<Scalars['String']>;
  webhookId?: InputMaybe<Scalars['String']>;
};

export enum Month {
  April = 'APRIL',
  August = 'AUGUST',
  December = 'DECEMBER',
  February = 'FEBRUARY',
  January = 'JANUARY',
  July = 'JULY',
  June = 'JUNE',
  March = 'MARCH',
  May = 'MAY',
  November = 'NOVEMBER',
  NumMonths = 'NUM_MONTHS',
  October = 'OCTOBER',
  September = 'SEPTEMBER'
}

export type MultiSeriesColorMap = {
  __typename?: 'MultiSeriesColorMap';
  colorMap?: Maybe<Array<Maybe<SeriesMultiColorMap>>>;
  serieName?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  Action_createEmbedUrlsConfigInfoPerOrg?: Maybe<EmbedUrlConfigPerOrg>;
  Action_deleteEmbedUrlConfigInfoPerOrg?: Maybe<Scalars['Boolean']>;
  ActionsAssociation_addUpdateCustomActionAssociation: MutationActionAssociationResponse;
  ActionsAssociation_deleteCustomActionAssociation: MutationActionAssociationResponse;
  Actions_addEmbedCustomAction?: Maybe<EmbedActionConfig>;
  Actions_addHelpConfig?: Maybe<Admin_GetHelpConfigResponse>;
  Actions_deleteEmbedCustomAction?: Maybe<EmbedActionConfig>;
  Actions_deleteHelpConfig?: Maybe<Admin_GetHelpConfigResponse>;
  Actions_editHelpConfig?: Maybe<Admin_GetHelpConfigResponse>;
  Actions_resetHelpConfig?: Maybe<Admin_GetHelpConfigResponse>;
  Actions_updateConfigInfo?: Maybe<Scalars['Boolean']>;
  Actions_updateEmbedCustomAction?: Maybe<EmbedActionConfig>;
  Actions_updateEmbedUrlsConfigInfo?: Maybe<Scalars['Boolean']>;
  Actions_updateEmbedUrlsConfigInfoPerOrg?: Maybe<Scalars['Boolean']>;
  Admin_createAuthToken?: Maybe<Admin__AuthTokenResponse>;
  Admin_deleteAuthToken?: Maybe<Admin__AuthTokenResponse>;
  Admin_deleteLdapAd?: Maybe<Admin__GetLdapAdResponse>;
  Admin_deleteNas?: Maybe<Admin__GetNasResponse>;
  Admin_deleteSmtp?: Maybe<Admin__GetSmtpResponse>;
  Admin_deleteSnapshot?: Maybe<Admin__GetSnapshotResponse>;
  Admin_deleteSsl?: Maybe<Admin__GetSslResponse>;
  Admin_setDevSpotAdminPrivileges?: Maybe<Admin_GetDevSpotEmbedSettingsResponse>;
  Admin_setDevSpotEmbedDevPrivileges?: Maybe<Admin_GetDevSpotEmbedSettingsResponse>;
  Admin_setLdapAd?: Maybe<Admin__GetLdapAdResponse>;
  Admin_setLocal?: Maybe<Admin__GetLocalResponse>;
  Admin_setNas?: Maybe<Admin__GetNasResponse>;
  Admin_setRevSsh?: Maybe<Admin__GetRevSshResponse>;
  Admin_setSmtp?: Maybe<Admin__GetSmtpResponse>;
  Admin_setSnapshot?: Maybe<Admin__GetSnapshotResponse>;
  Admin_setTscliCommand?: Maybe<Admin__SetTscliCommandResponse>;
  Admin_signEula?: Maybe<Admin__SignEulaResponse>;
  Admin_validateEmbedSettings?: Maybe<Admin__ValidateEmbedSettingsResponse>;
  /** Create copy of answer from Answer GUID */
  Answer__CopyFromId: AnswerEditSession;
  /** Initialise explore session and fetch the suggestions */
  Answer__InitializeExplore: ExploreResponse;
  /** Submit for A3 Analysis */
  Answer__a3AnalysisSubmission?: Maybe<TimelyJobId>;
  /** A3 Analysis Sync */
  Answer__a3AnalysisSync?: Maybe<A3AnalysisSyncResponse>;
  /** Add column(s) to Answer */
  Answer__addColumn: AnswerEditSession;
  /** Used to add a filter to an answer */
  Answer__addUpdateFilter: AnswerEditSession;
  /** Add Viz from answer to new / existing Pinboard */
  Answer__addVizToPinboard: AddVizToPinboardResponse;
  /** Apply suggestions */
  Answer__applySuggestions: ExploreResponse;
  Answer__bulkSave: Scalars['Boolean'];
  /** Clear answer state */
  Answer__clear: AnswerEditSession;
  /**
   * Create Copy of answer
   * NOTE: The created copy is not saved by default. The Answer__save API needs to be called
   */
  Answer__copy: BachSessionId;
  /** Create a new empty answer */
  Answer__create: AnswerEditSession;
  /** Create formula edit session, to begin editing a formula (new or existing) */
  Answer__createFormulaEditSession: FormulaSearchResponse;
  /** Delete answer */
  Answer__deleteAnswer: Answer__DeleteAnswerResponse;
  /** DrillDown a column in a answer */
  Answer__drillDown: AnswerEditSession;
  /**
   * Formula search (as used in the formula editor). Given some input tokens, makes a sage call and
   * binds the tokens to data columns, returning the resulting token data in the response.
   */
  Answer__formulaSearch: FormulaSearchResponse;
  /** Get eligible columns for A3 analysis */
  Answer__getA3AnalysisColumns: A3Columns;
  Answer__getDrillDownColumns: GetDrillDownColumnResponse;
  /** Used to get the valid filter values while creating a filter via UI */
  Answer__getFilterValues: FilterValuesResponse;
  /** Natural language query */
  Answer__getNaturalLanguageQuery: AnswerNaturalLanguageQuery;
  /** Query visualiser */
  Answer__getQuery: QvSpec;
  /** Get dropdown completions for assisted explore in Filter and Replace tabs */
  Answer__getQueryBuilderCompletionsForExplore?: Maybe<AnsQueryBuilderSearchResult>;
  /** Get templates to show dropdowns for Filter and Replace tabs */
  Answer__getQueryBuilderTemplatesForExplore?: Maybe<AnswerQueryBuilderTemplates>;
  /** Get Unaggregated Answer Session */
  Answer__getUnaggregatedAnswer: AnswerEditSession;
  /** Load Saved Answer */
  Answer__load: AnswerEditSession;
  /** Load existing answer session */
  Answer__loadSession: AnswerEditSession;
  /** QueryBuilderSearch */
  Answer__queryBuilderSearch?: Maybe<QueryBuilderSearchResult>;
  Answer__removeCohort: AnswerEditSession;
  /** Remove Column from answer */
  Answer__removeColumn: AnswerEditSession;
  /** Remove Multiple Columns from answer */
  Answer__removeColumns: AnswerEditSession;
  /** Used to remove an already created answer */
  Answer__removeFilter: AnswerEditSession;
  /** Remove a formula */
  Answer__removeFormula: AnswerEditSession;
  Answer__removeParameter: AnswerEditSession;
  Answer__removeParameterOverride: AnswerEditSession;
  /** Resolve ambiguity in a sage token (accept the auto-disambiguation choice) */
  Answer__resolveSageTokenAmbiguity: SageSearchResponse;
  /**
   * Sage search (as used in the sage bar). Given some input tokens, makes a sage call and binds the
   * tokens to data columns, returning the resulting phrase/token data in the response.
   */
  Answer__sageSearch: SageSearchResponse;
  /** Save current state of answer */
  Answer__save: AnswerEditSession;
  /** Save Answer as View */
  Answer__saveAsView: SaveAsViewResponse;
  Answer__saveCohort: SaveCohortResponse;
  /** Save a formula (either new or existing) */
  Answer__saveFormula: AnswerEditSession;
  Answer__saveParameter: AnswerEditSession;
  /** Set Data source for answer */
  Answer__setDataSources: AnswerEditSession;
  /** Set Headline Aggregation Type */
  Answer__setHeadlineAggregation: AnswerEditSession;
  /** Set Visible Headlines for Answer */
  Answer__setHeadlineColumns: AnswerEditSession;
  Answer__setParameterOverride: AnswerEditSession;
  Answer__setTMLString: AnswerEditSession;
  Answer__submitRAnalysis: AnswerEditSession;
  /** Update Client State for Answer */
  Answer__updateAnswerClientState: AnswerEditSession;
  /** Update Chart Config */
  Answer__updateChartConfig: AnswerEditSession;
  /** Update Attributes of a Column in answer */
  Answer__updateColumn: AnswerEditSession;
  /** Update Client State for Answer Column */
  Answer__updateColumnClientState: AnswerEditSession;
  /** Update Custom VisualProps for Custom Chart */
  Answer__updateCustomVisualProps: AnswerEditSession;
  /** Used to update filter order in answer */
  Answer__updateFilterLayout: AnswerEditSession;
  /** Update Answer properties (name, description etc.) */
  Answer__updateProperties: AnswerEditSession;
  /** Update Sort for Answer */
  Answer__updateSort: AnswerEditSession;
  /** Update the AutoComplete from the AC service */
  Answer__updateTokens: AnswerEditSession;
  /** Update view */
  Answer__updateView: SaveAsViewResponse;
  /** Update Client State for Viz */
  Answer__updateVizClientState: AnswerEditSession;
  ApplyStickers?: Maybe<Scalars['Boolean']>;
  AssignTag?: Maybe<Scalars['Boolean']>;
  /** create connection details */
  CreateCatalogConnection: CreateCatalogConnectionResult;
  CreateRelationship?: Maybe<Scalars['Boolean']>;
  CreateTag?: Maybe<Scalars['JSON']>;
  /** Clear cache if user aborts the CSV Upload flow */
  Csv_abortAndClearCache?: Maybe<Scalars['String']>;
  /** Create table with the input schema */
  Csv_createTable: Csv_CreateTableResponse;
  /** Read rows of the cached file */
  Csv_getCSVRows: Array<Array<Scalars['String']>>;
  /** Load data in the user data table */
  Csv_loadData: Csv_LoadDataResponse;
  /** Read keys of the cached file */
  Csv_readKeys: Csv_ReadKeysAndColumnsResponse;
  /** Read columns of the cached file */
  Csv_readTableColumns: Csv_ReadKeysAndColumnsResponse;
  /** Add custom chart */
  CustomChart_add?: Maybe<Scalars['String']>;
  /** Delete custom chart */
  CustomChart_delete?: Maybe<Scalars['String']>;
  /** Update custom chart */
  CustomChart_update?: Maybe<Scalars['String']>;
  /** Delete custom region */
  CustomRegion_delete?: Maybe<Scalars['String']>;
  /** Update custom region */
  CustomRegion_update?: Maybe<FileHeader>;
  /** Upload custom region */
  CustomRegion_upload?: Maybe<FileHeader>;
  /** Update custom style properties */
  CustomStyle_updateStyle?: Maybe<Scalars['Boolean']>;
  /**
   * Create Destination
   * creates a destination entry and returns back the destination's auth url,
   * which the client can use to authenticate
   */
  DS__createDestination?: Maybe<Ds__CreateDestinationResult>;
  /** Create a destination sync */
  DS__createDestinationSync: Ds__DestinationSyncPipelineAndRunResult;
  /** Delete a destination */
  DS__deleteDestination: Scalars['JSON'];
  /** Delete a destination sync */
  DS__deleteDestinationSync: Array<Maybe<Ds__DeletePipelineResult>>;
  /** Check if the destination exists, else create a destination */
  DS__getOrCreateDestination?: Maybe<Ds__GetOrCreateDestinationResult>;
  /** Get pipeline details */
  DS__getPipelineDetails: Scalars['JSON'];
  /**
   * Reaauthenticate Destination
   * updates a destination entry and returns back the destination's auth url,
   * which the client can use to authenticate
   */
  DS__reauthenticateDestination?: Maybe<Ds__ReauthenticateDestinationResult>;
  /**
   * Update Destination name and description
   * updates a destination entry and returns back the destination's id,
   * which the client can use to id
   */
  DS__updateDestination?: Maybe<Ds__UpdateDestinationResult>;
  /** Update a destination sync */
  DS__updateDestinationSync: Ds__DestinationSyncPipelineAndRunResult;
  /** Run a pipeline */
  DS_runPipeline: Array<Maybe<Ds__DestinationSyncPipelineAndRunResult>>;
  /** delete dbt lists while passing id */
  Dbt__deleteConnections: Scalars['JSON'];
  Dbt__generateTml: Scalars['JSON'];
  /** Gets list of worksheets associated with tables */
  Dbt__generateWorksheets: Array<DbtWorksheet>;
  /** get table lists associated with models */
  Dbt__getTableList: Scalars['JSON'];
  /** Create or Update metadata objects using edoc */
  Dbt__importEdoc?: Maybe<Array<ImportEPackStatus>>;
  Dependency__listDependents?: Maybe<Scalars['JSON']>;
  /** disconnect connection details */
  DisconnectCatalogConnection: DisconnectCatalogConnectionResult;
  /** Used to verify connection credential in create connection mode */
  Embrace__verifyConnection?: Maybe<Scalars['JSON']>;
  /** Used to verify connection credential in edit connection mode */
  Embrace__verifyConnectionById?: Maybe<Scalars['JSON']>;
  /** add viz snapshot data */
  Eureka__addVizSnapshot?: Maybe<Eureka_AddVizSnapshotResponse>;
  Eureka__setDataSource: Eureka_WorkSheetDataSource;
  Explore__ConstrainedSearch: ConstrainedSearchResponse;
  /** Get Viz data */
  GetVizData: GetVizDataResponse;
  /** Install the certificate */
  InstallCertificate: InstallCertificateResponse;
  License_updateTseLicenseInfo: TseLicenseDetail;
  /** Create or Update metadata objects using edoc */
  Metadata__importEdoc?: Maybe<Array<ImportEPackStatus>>;
  /** Validate edoc objects before importing */
  Metadata__validateEdoc?: Maybe<Array<ImportEPackStatus>>;
  /** add item to priority list */
  Metadata_addPriorityListItem: Scalars['Boolean'];
  Metadata_deleteMetadataObject?: Maybe<Scalars['JSON']>;
  /** delete item from priority list */
  Metadata_deletePriorityListItem: Scalars['Boolean'];
  Metadata_markAsFavorite?: Maybe<Scalars['Boolean']>;
  Metadata_removeFromFavorite?: Maybe<Scalars['Boolean']>;
  /** reorder priority list item */
  Metadata_reorderPriorityList: Scalars['Boolean'];
  /** Create monitor rule */
  MonitorRule__create: MonitorRuleInfo;
  /**
   * Delete current monitor rule"
   * keeping a nullable boolean response, since graphql doesnt support any null return type
   */
  MonitorRule__delete?: Maybe<Scalars['Boolean']>;
  /** subscribe current monitor rule */
  MonitorRule__subscribe: MonitorRuleInfo;
  /** Unsubscribe current monitor rule */
  MonitorRule__unsubscribe: MonitorRuleInfo;
  /** Edit/Update monitor rule */
  MonitorRule__update: MonitorRuleInfo;
  Onboarding__seedQuestionFeedback?: Maybe<Scalars['Boolean']>;
  Onboarding__updateSetupState: SetupState;
  /** org can be deleted */
  Org_canDelete: Org__CanDeleteResponse;
  /** create an org */
  Org_create: Org__DataResponse;
  /** delete an org */
  Org_delete?: Maybe<Scalars['Boolean']>;
  /** update an org */
  Org_update: Org__DataResponse;
  PartnerEng__updatePartnerConnectConfig: PartnerConnectConfig;
  PartnerEng__updateRedshiftConnectionStatus?: Maybe<Scalars['JSON']>;
  /** Add container Mutation */
  Pinboard__addContainer: PinboardEditSession;
  /** -------------- Note Tile APIs -------------- */
  Pinboard__addNoteTile: PinboardNoteTileEditSession;
  /**
   * -------------- TAB APIs --------------
   * Add tab Mutation
   */
  Pinboard__addTab: PinboardEditSession;
  /** Used to add/update cross filter on pinboard */
  Pinboard__addUpdateCrossFilter: PinboardCrossFilterEditSession;
  /** Used to add/update a filter to an answer */
  Pinboard__addUpdateFilter: PinboardEditSession;
  /** Cancel Bach Session */
  Pinboard__cancelPinboardSession: Pinboard__CancelPinboardSession;
  /** Copy Pinboard Mutation */
  Pinboard__copyPinboard: CopiedPinboard;
  /** Copy tab Mutation */
  Pinboard__copyTab: PinboardEditSession;
  /** Create Pinboard By Name */
  Pinboard__createByName: PinboardInfo;
  /** Create empty tab in pinboard */
  Pinboard__createTabByName: TabInfo;
  /** Delete Pinboard Viz Mutation */
  Pinboard__deletePinboardViz: PinboardEditSession;
  /** Used to get the valid filter values while creating a filter via UI */
  Pinboard__getFilterValues: FilterValuesResponse;
  /** Load Pinboard */
  Pinboard__load: PinboardEditSession;
  Pinboard__loadContextBook: ContextBookResponse;
  /** Move container Mutation */
  Pinboard__moveContainerToTab: PinboardEditSession;
  /** Pin note tile to new/existing Pinboard */
  Pinboard__pinNoteTileToPinboard: PinNoteTileToPinboardResponse;
  /** Used to remove all cross filters */
  Pinboard__removeAllCrossFilter: PinboardCrossFilterEditSession;
  /** Used to remove cross filter */
  Pinboard__removeCrossFilter: PinboardCrossFilterEditSession;
  /** Used to remove an already created answer */
  Pinboard__removeFilter: PinboardEditSession;
  Pinboard__removeParameterOverride: PinboardEditSession;
  /** Remove tab Mutation */
  Pinboard__removeTab: PinboardEditSession;
  /** Save contextBook Mutation */
  Pinboard__saveContextBook: PinboardEditSession;
  /** Save personalised view */
  Pinboard__savePersonalisedView: SavePersonalisedViewResponse;
  /** Save Pinboard Mutation */
  Pinboard__savePinboard: PinboardEditSession;
  /** Mark as Favorite Mutation */
  Pinboard__setFavoriteStatus: PinboardEditSession;
  Pinboard__setParameterOverride: PinboardEditSession;
  /** update filter group */
  Pinboard__updateFilterGroup: PinboardEditSession;
  /** Update Layout Mutation */
  Pinboard__updateLayout: PinboardEditSession;
  /** Update note tile mutation */
  Pinboard__updateNoteTile: PinboardNoteTileEditSession;
  /** Update Pinboard properties (name, description) */
  Pinboard__updateProperties: PinboardEditSession;
  /** Update tab Mutation */
  Pinboard__updateTab: PinboardEditSession;
  /** Add container Mutation */
  Pinboard__updateTabFromStore: PinboardEditSession;
  /** Update viz title and description */
  Pinboard__updateVizProperties: PinboardEditSession;
  /** Upload note tile image */
  Pinboard__uploadNoteTileImage: PinboardNoteTileUploadImageResponse;
  /** Send Request Access for Datasources */
  RequestAccessDataSource?: Maybe<Scalars['Boolean']>;
  /** Send Request Access for Objects */
  RequestAccessObject?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Creates a Role */
  Role_create: Role_DataResponse;
  /** Deletes a Role */
  Role_delete: Scalars['Boolean'];
  /** Updates a Role */
  Role_update: Role_DataResponse;
  /** Create SAML Connection */
  Saml_createConnection?: Maybe<Admin__SamlConnectionResponse>;
  /** Delete SAML Connection */
  Saml_deleteConnection?: Maybe<Saml_StatusResponse>;
  /** Map Attribute post data */
  Saml_updateAttributeMapping?: Maybe<Saml__MapAttributeGetResponse>;
  /** Update SAML Connection */
  Saml_updateConnection?: Maybe<Admin__SamlConnectionResponse>;
  /** Update SAML Connection Status */
  Saml_updateConnectionStatus?: Maybe<Saml_StatusResponse>;
  /** Upload SAML Metadata */
  Saml_uploadMetaData?: Maybe<Admin__UploadMetaDataResponse>;
  /** Share objects with Users and Groups along with notification */
  Save?: Maybe<Scalars['Boolean']>;
  /** Create Schedule */
  Scheduler__createSchedule?: Maybe<CreateScheduleResult>;
  /** Delete Schedule */
  Scheduler__deleteSchedule?: Maybe<DeleteScheduleResult>;
  /** Update Schedule */
  Scheduler__updateSchedule?: Maybe<UpdateScheduleResult>;
  Scheduler_addJob: Scalars['Boolean'];
  Scheduler_deleteJobs: Scalars['Boolean'];
  Scheduler_pauseJobs: Scalars['Boolean'];
  Scheduler_resumeJobs: Scalars['Boolean'];
  Scheduler_updateJob: Scalars['Boolean'];
  /** Create refresh schedule for a materialized view */
  SearchCache__createSchedule: Scalars['JSON'];
  /** Delete refresh schedule for a materialized view */
  SearchCache__deleteSchedule: Scalars['JSON'];
  /** Deletes the existing materialized view */
  SearchCache__dematerializeView: Scalars['String'];
  /** Create materialized view of a external view */
  SearchCache__materializeView: Scalars['String'];
  /** Refreshes the existing materialized view */
  SearchCache__refreshView: Scalars['JSON'];
  /** Update refresh schedule for a materialized view */
  SearchCache__updateSchedule: Scalars['JSON'];
  /**
   * Create Destination
   * creates a destination entry and returns back the destination's auth url,
   * which the client can use to authenticate
   */
  Seekwell__createDestination?: Maybe<Seekwell__CreateDestinationResult>;
  /** Create a seekwell pipeline */
  Seekwell__createPipeline?: Maybe<Seekwell__CreatePipelineResult>;
  /** Check if the destination exists, else create a destination */
  Seekwell__getOrCreateDestination?: Maybe<Seekwell__GetOrCreateDestinationResult>;
  /** Delete existing Seekwell pipeline by pipelineId */
  Seekwell_deleteDestinationByDestinationId?: Maybe<SeekwellDeleteDestinationByDestinationIdResponse>;
  /** Delete existing Seekwell pipeline by pipelineId */
  Seekwell_deletePipelineByPipelineId?: Maybe<SeekwellDeletePipelineByPipelineIdResponse>;
  /** Update existing Seekwell pipeline metatdata */
  Seekwell_updatePipelineByPipelineId?: Maybe<SeekwellUpdatePipelineByPipelineIdResponse>;
  /** Associate users to org */
  Session__addUsersToOrg?: Maybe<Scalars['Boolean']>;
  /** Update default pinboards in group */
  Session__assignPinboardsToGroup: Scalars['Boolean'];
  Session__buildConnection: CommunicationConnectionResponse;
  Session__createGroup: CreateUserOrGroupDetails;
  Session__createUser: CreateUserDetails;
  /** Delete groups by ids */
  Session__deleteGroups: Scalars['Boolean'];
  /**
   * Delete the pofile picture of current user
   * Returns generic response success when operation is successful
   */
  Session__deleteProfilePic: GenericRequestResponse;
  Session__deleteUsers: Scalars['Boolean'];
  /**
   * Logout current user
   * Returns generic response success when operation is successful
   */
  Session__doLogout: GenericRequestResponse;
  /**
   * Logs the user in
   * Returns session-info
   */
  Session__login: LoginResponse;
  /**
   * Reset password
   * Returns generic response success when operation is successful
   */
  Session__resetPassword: GenericRequestResponse;
  /**
   * Update the exposed user preferences proto for current user
   * Returns true as generic response success when operation is successful, false otherwise
   */
  Session__setSpotIQPreferences: Scalars['Boolean'];
  /**
   * Update the org value for current session
   * Returns true as generic response success when operation is successful, false otherwise
   */
  Session__switchOrg?: Maybe<Scalars['Boolean']>;
  /** Update the displayName for the current user */
  Session__updateDisplayName?: Maybe<Scalars['Boolean']>;
  /** Update group */
  Session__updateGroup: Scalars['Boolean'];
  Session__updateGroupsInGroup: Scalars['Boolean'];
  /**
   * Update isFirstTimeSpotIQUser preference on client state
   * Returns true when operation is successful
   */
  Session__updateIsFirstTimeSpotIQUser: Scalars['Boolean'];
  /**
   * Update the password for current user
   * Returns generic response success when operation is successful
   */
  Session__updatePassword: GenericRequestResponse;
  /** Updates pinsFlow backend flag */
  Session__updatePinsFlowFlags: Scalars['Boolean'];
  /**
   * Update the exposed user preferences for current user
   * Returns generic response success when operation is successful
   */
  Session__updatePreference: GenericRequestResponse;
  /**
   * Update user information
   * Returns generic response success when operation is successful
   */
  Session__updateUser: GenericRequestResponse;
  /**
   * Update the user email
   * Returns generic response success when operation is successful
   */
  Session__updateUserEmail: GenericRequestResponse;
  Session__updateUsers: Scalars['Boolean'];
  Session__updateUsersInGroup: Scalars['Boolean'];
  /**
   * Updates answerV2 and spotIQV2 preferences in configInfo.clientState.preferences
   * Returns true when operation is successful
   */
  Session__updateVersionPreference: Scalars['Boolean'];
  /**
   * Update the pofile picture of current user
   * Returns generic response success when operation is successful
   */
  Session__uploadProfilePic: GenericRequestResponse;
  /** Share objects with Users and Groups along with notification */
  Share?: Maybe<Scalars['Boolean']>;
  SpotApps__savePublMasterRecord: GenericRequestResponse;
  SpotIQ__actionOnAnalysis: SpotIqActionStatusResponse;
  SpotIQ__addFeedback: InsightFeedBackResponse;
  SpotIQ__addJobSchedule: Scalars['Boolean'];
  SpotIQ__deleteFeedback: InsightFeedBackResponse;
  SpotIQ__getAnalysisResult: SpotIqAnalysisResultResponse;
  SpotIQ__getJobRuns: JobRunsResponse;
  SpotIQ__loadA3AnalysisColumns: A3Columns;
  SpotIQ__loadCustomAnalysisConfig?: Maybe<CustomAnalysisConfigResponse>;
  SpotIQ__pauseJobSchedule: Scalars['Boolean'];
  SpotIQ__resumeJobSchedule: Scalars['Boolean'];
  SpotIQ__submitCustomAnalysis?: Maybe<Scalars['GUID']>;
  SpotIQ__updateFeedback: InsightFeedBackResponse;
  SpotIQ__updateJobSchedule: Scalars['Boolean'];
  SpotappsAdmin__saveApplicationReview: GenericRequestResponse;
  Spotapps__connectorTableMapping: GenericRequestResponse;
  Spotapps__createConnector: CreateConnectorResponse;
  Spotapps__deletePublishingData: GenericRequestResponse;
  Spotapps__getAppPublishDetails: SpotAppPublishDetails;
  Spotapps__removeConnectionFromTML: Scalars['String'];
  Spotapps__resetConnection: ResetConnectionResponse;
  Spotapps__saveAppConnection: GenericRequestResponse;
  Spotapps__saveColumnsMapping: GenericRequestResponse;
  Spotapps__savePublishingInfo: GenericRequestResponse;
  Spotapps__saveTables: GenericRequestResponse;
  Spotapps__updateConnectorStatus: GenericRequestResponse;
  /** Create a new empty Sql Answer */
  SqlAnswer__create: SqlAnswerEditSession;
  /** To get Sql Answer data */
  SqlAnswer__getQuery: SqlAnswerResponse;
  /** Load saved Sql Answer */
  SqlAnswer__load: SqlAnswerEditSession;
  /** Save Sql Answer as View */
  SqlAnswer__saveAsView: SaveAsSqlViewResponse;
  /** Update Sql Answer properties (name, description etc.) */
  SqlAnswer__updateProperties: SqlAnswerEditSession;
  /** Update Sql View */
  SqlAnswer__updateView: UpdateSqlViewResponse;
  /** sync connection details */
  SyncCatalogConnection: SyncCatalogConnectionResult;
  /** Create schedule for seekwell app actions */
  TSEAppActions__CreateSchedulePipeline: SeekwellCreatePipelineAndSchedulerIdResponse;
  /** Update schedule and pipeline metadata for seekwell */
  TSEAppActions__UpdateSchedulePipeline?: Maybe<SeekwellUpdatedScheduledPipelineMetadataResult>;
  /** Create a seekwell pipeline and trigger run from callosum */
  TSEAppActions__createPipelineAndRun?: Maybe<TseAppActions__CreatePipelineAndRunResult>;
  /** Add scheduleIds and Seekwell pipelineId for given Object and App action */
  TSEAppActions__createPipelineAndSchedulerId?: Maybe<SeekwellCreatePipelineAndSchedulerIdResponse>;
  /** Delete scheduleIds and Seekwell pipelineId for given Object and App action */
  TSEAppActions__deletePipelineAndSchedulerId?: Maybe<SeekwellDeleteScheduledPipelineResult>;
  /** Delete schedule and pipeline for seekwell */
  TSEAppActions__deleteScheduledPipeline?: Maybe<SeekwellDeleteScheduledPipelineResult>;
  Teams_activateUser: Scalars['Boolean'];
  Teams_deleteMember: Scalars['Boolean'];
  Teams_reInviteMember: Scalars['Boolean'];
  Trial__inviteUsers: InvitedUsersInfo;
  /** Export request */
  Type__exportRequest?: Maybe<Scalars['Boolean']>;
  UnAssignTag?: Maybe<Scalars['Boolean']>;
  /** GET TML of unsaved Answer. */
  UnsavedAnswer_getTML: EntityDocResponse;
  /** Update MetaData */
  UpdateCatalogMetaData: UpdateCatalogMetaDataResult;
  /** update schedule */
  UpdateCatalogSchedule: UpdateCatalogScheduleResult;
  /** Update a Sql Answer */
  Update__sqlQuery: SqlAnswerEditSession;
  /** Update selected source for Sql Answer */
  Update_selectedSources: SqlAnswerEditSession;
  User__updateSeenState: Scalars['Boolean'];
  User__updateUserPreferences: Scalars['Boolean'];
  /** Verify connection details */
  VerifyConnection: VerifyAuthConnectionResult;
  /** Configure local repository to connect to remote repository */
  VersionControl__createConfig: RepoConfigResponse;
  /** reset the github configuration */
  VersionControl__resetConfig?: Maybe<Scalars['Boolean']>;
  /** Update existing repository configuration */
  VersionControl__updateConfig: RepoConfigResponse;
  Webhooks_addWebhook: WebhookConfig;
  Webhooks_deleteWebhook: WebhookConfig;
  Webhooks_updateWebhook: WebhookConfig;
  Worksheet__QueryBuilderSearch?: Maybe<QueryBuilderSearchResult>;
  Worksheet__autoSave?: Maybe<Array<ImportEPackStatus>>;
  Worksheet__clearLesson?: Maybe<WorksheetEditSession>;
  Worksheet__refreshTokenStore: BachSessionId;
  /** Save the lessonPlan to Atlas */
  Worksheet_lessonSave: WorksheetEditSession;
  /** Get the list of lesson plans for given worksheet Id */
  Worksheet_load: WorksheetEditSession;
  /** Cleaning the connection resources */
  cleanConnectionResources: Scalars['JSON'];
  /** Configure Data Upload for a connection for CSV Upload. */
  configureDataUpload?: Maybe<Scalars['String']>;
  /** To create a connection */
  createConnection?: Maybe<Scalars['JSON']>;
  /** Create new custom calendar */
  createCustomCalendar: Scalars['Boolean'];
  createRTemplate: RTemplateDetails;
  createStyleCustomizationPerOrg?: Maybe<StylesPerOrg>;
  /** To delete the list of connection */
  deleteConnections: Scalars['String'];
  /** Delete custom calendar */
  deleteCustomCalendar?: Maybe<Scalars['Boolean']>;
  deleteRTemplate: Scalars['Boolean'];
  deleteStyleCustomizationPerOrg?: Maybe<Scalars['Boolean']>;
  /** Get an AnswerEditSession from tokens */
  getAnswerFromTokens: AnswerEditSession;
  /** Get the relation of the connection with logged in user */
  getConnectionRelation: ConnectionRelationType;
  getTokenMutation?: Maybe<Eureka_Agent_TokensResponse>;
  /** Create calendar from existing external calendar table */
  importCustomCalendar?: Maybe<Scalars['Boolean']>;
  /** Invalidate OAuth tokens for Snowflake Connection */
  invalidateOauthTokens: Scalars['JSON'];
  mutationComplete?: Maybe<Eureka_CompleteResponse>;
  mutationGetNlQueryFeedback?: Maybe<Eureka_GetNlQueryFeedbackResponse>;
  mutationGetQuestionFragments?: Maybe<Eureka_GetQuestionFragmentsResponse>;
  mutationPutNlQueryFeedback?: Maybe<Eureka_PutNlQueryFeedbackResponse>;
  mutationRelevanceFeedback?: Maybe<Eureka_RelevanceFeedbackResponse>;
  mutationRequest?: Maybe<Eureka_SearchResponse>;
  mutationTenantProbe?: Maybe<Eureka_RelevanceFeedbackResponse>;
  overwriteRTemplate: RTemplateDetails;
  /** Request liveboard verification */
  requestVerification?: Maybe<Scalars['JSON']>;
  resolveTokenMutation?: Maybe<Eureka_Agent_ResolveTokenResponse>;
  /** To programmatically add existing groups to a group, use API endpoint. When you assign groups to a group, the group inherits the privileges assigned to those groups. At least one of id or name of group is required. When both are given user id will be considered. */
  restapiV2__addGroupsToGroup?: Maybe<Scalars['Boolean']>;
  /**
   * To programmatically add privileges to an existing group, use API endpoint.
   * When you assign privileges to a group,  all the users under to this group inherits the privileges assigned to that group.
   * At least one of id or name of group is required. When both are given user id will be considered.
   */
  restapiV2__addPrivilegesToGroup: Scalars['Boolean'];
  /**
   * To programmatically add table to an existing connection use this endpoint.
   * When you assign groups to a connection, the connection inherits the privileges assigned to those groups.
   * At least one of Connection Id or connectionname is mandatory. When both are given, then connection id will be considered.
   */
  restapiV2__addTableToConnection?: Maybe<Scalars['Boolean']>;
  /**
   * To programmatically add groups to an existing ThoughtSpot user use this endpoint.
   * When you assign groups to a user, the user inherits the privileges assigned to those groups.
   * At least one of User Id or username is mandatory. When both are given, then user id will be considered.
   */
  restapiV2__addUserToGroups: Scalars['Boolean'];
  /** To programmatically add existing ThoughtSpot users to an organization, use this API endpoint. \n\n At least one of id or name of the organization is required. When both are given, then organization id will be considered. \n\n Requires Administration access for the organization to which users need to be added. */
  restapiV2__addUserToOrgs?: Maybe<Scalars['Boolean']>;
  /** To programmatically add existing ThoughtSpot users to a group, use this API endpoint. When you assign users to a group, the users inherits the privileges assigned to that group. At least one of id or name of the group is required. When both are given user id will be considered. */
  restapiV2__addUsersToGroup?: Maybe<Scalars['Boolean']>;
  /** To programmatically download Answer data as a file, use this endpoint. \n\n The PDF will download data in the tabular format even if Answer is saved as chart. */
  restapiV2__answerReport?: Maybe<Scalars['JSON']>;
  /** To programmatically assign an author to one or several objects, use this endpoint. \n\n Provide either user name or id as input. When both are given user id will be considered. \n\n Requires administration privilege. */
  restapiV2__assignAuthorToObjects: Scalars['Boolean'];
  /** To programmatically assign objects to favorites for a given user account, use this endpoint. At least one of user id or username is required. When both are given, then id will be considered. */
  restapiV2__assignFavorite: Scalars['Boolean'];
  /** To assign a specific liveboard as a home liveboard for a user, use this endpoint. At least one of user id or username is required. When both are given, then id will be considered. */
  restapiV2__assignHomeLiveboard: Scalars['Boolean'];
  /** To programmatically assign tags to a metadata object, such as a liveboard, search answer, table, worksheet, or view, use this endpoint.  At least one of id or name of tag is required. When both are given, then id will be considered. */
  restapiV2__assignTag: Scalars['Boolean'];
  /** To programmatically change the owner of one or several objects from one user account to another, use this endpoint. \n\n You might want to transfer ownership of objects owned by a user to another active user, when the account is removed from the ThoughtSpot application. */
  restapiV2__changeAuthorOfObjects: Scalars['Boolean'];
  /** To change the password of a ThoughtSpot user account, use this endpoint. \n\n At least one of id or name of user is required. When both are given user id will be considered. */
  restapiV2__changePasswordOfUser: Scalars['Boolean'];
  /**
   * To programmatically create a connection in the ThoughtSpot system use this API endpoint.
   * Using this API, you can create a connection and assign groups.
   * To create a connection, you require admin connection privileges.
   * All connections created in the ThoughtSpot system are added to ALL_GROUP
   */
  restapiV2__createConnection: CreateConnectionResponse;
  /** To programmatically create custom actions on ThoughtSpot clusters that support embedding configuration, use this endpoint */
  restapiV2__createCustomAction?: Maybe<Scalars['JSON']>;
  /** To programmatically create a group in the ThoughtSpot system, use this API endpoint. Using this API, you can create a group and assign privileges and users. For ease of user management and access control, ThoughtSpot administrators can create groups and assign privileges to these groups. The privileges determine the actions that the users belonging to a group are allowed to do. ThoughtSpot also has a default group called ALL_GROUP. When you create new group in ThoughtSpot, they are automatically added to ALL_GROUP. You cannot delete the ALL_GROUP or remove members from it. */
  restapiV2__createGroup: GroupResponse;
  /** To programmatically create an organization in the ThoughtSpot system, use this API endpoint. \n\n Requires Administration privilege for tenant. */
  restapiV2__createOrg?: Maybe<OrgsResponse>;
  /** To create a table in Falcon, use this endpoint. */
  restapiV2__createTable: CreateTableResponse;
  /** To programmatically create tags, use this endpoint */
  restapiV2__createTag: MetadataTagResponse;
  /**
   * To programmatically create a user account in the ThoughtSpot system use this API endpoint. Using this API, you can create a user and assign groups.
   * To create a user, you require admin user privileges.
   * All users created in the ThoughtSpot system are added to ALL_GROUP
   */
  restapiV2__createUser: UserResponse;
  /** To remove a connection from the ThoughtSpot system, use this endpoint. */
  restapiV2__deleteConnection: Scalars['Boolean'];
  /** To programmatically delete a custom action, use this endpoint */
  restapiV2__deleteCustomAction?: Maybe<Scalars['JSON']>;
  /** To remove custom action associations to ThoughtSpot objects, use this endpoint */
  restapiV2__deleteCustomActionAssociation?: Maybe<Scalars['JSON']>;
  /** To remove a group from the ThoughtSpot system, send a DELETE request to this endpoint. At Least one value needed.  When both are given user id will be considered to fetch user information. */
  restapiV2__deleteGroup: Scalars['Boolean'];
  /** Use this endpoint to delete the metadata objects */
  restapiV2__deleteObject: Scalars['Boolean'];
  /** To remove an organization from the ThoughtSpot system, send a DELETE request to this endpoint. \n\n At least one value is needed. When both id and name are given, then id will be considered. \n\n Requires Administration privilege for tenant. */
  restapiV2__deleteOrg: Scalars['Boolean'];
  /** To programmatically delete tags, use this endpoint. At least one of id or name of tag is required. When both are given, then id will be considered. */
  restapiV2__deleteTag: Scalars['Boolean'];
  /**
   * To remove a user from the ThoughtSpot system, use this endpoint.
   * At Least one value needed.  When both are given user id will be considered to delete user.
   */
  restapiV2__deleteUser: Scalars['Boolean'];
  /** To export ThoughtSpot objects represented in ThoughtSpot Modeling Language (TML), use this endpoint */
  restapiV2__exportObjectTML?: Maybe<Scalars['JSON']>;
  /** To logout one or more users from logged in session, use this endpoint. If no input is provided then all logged in users are force logged out. \n\n Requires administration privilege */
  restapiV2__forceLogoutUsers?: Maybe<Scalars['Boolean']>;
  /** To get the details of columns in a table associated to a connection, use this endpoint. \n\n You can get the columns of any table available in the data platform for the connection id provided. */
  restapiV2__getConnectionTableColumns?: Maybe<ConnectionTableColumnsResponse>;
  /** To get the details of tables from a connection, use this endpoint. \n\n You can get the details of tables in the data platform for the connection id provided. */
  restapiV2__getConnectionTables?: Maybe<ConnectionTableResponse>;
  /** To query the details of dependent objects and associate objects as dependents, you can use this API. Dependency is defined as relation between referenced and referencing objects. A referencing object is said to have a dependency on a referenced object, if the referenced object cannot be deleted without first deleting the referencing object. For example, consider a worksheet 'W1' that has a derived logical column 'C1' that has a reference to a base logical column 'C2'. This can be shown diagramatically as: W1-->C1-->C2. W1 has a dependency on C2 i.e. W1 is a referencing object and C2 is a referenced object. It is not possible to delete C2 without first deleting W1 because deletion of C2 will be prevented by the relationship between W1's column C1 and C2. Similarly C1 is said to have a dependency on C2 i.e. C1 is a referencing object and C2 is a referenced object. It is not possible to delete C2 without first deleting C1 */
  restapiV2__getObjectDependency?: Maybe<Scalars['JSON']>;
  /**
   * To programmatically create session token for a user in ThoughtSpot, use this endpoint. \n\n You can generate the token for a user by providing password or secret key from the cluster. \n\n You need to enable trusted authentication to generate secret key. To generate secret key, follow below steps. \n\n
   * 1. Click the Develop tab. \n\n
   * 2. Under Customizations, click Settings. \n\n
   * 3. To enable trusted authentication, turn on the toggle. \n\n
   * 4. A secret_key for trusted authentication is generated. \n\n
   * 5. Click the clipboard icon to copy the token. \n\n
   * \n\n Password is given precedence over secretKey input, when both are included in the request.
   */
  restapiV2__getToken: SessionLoginResponse;
  /** To import ThoughtSpot objects represented in ThoughtSpot Modeling Language (TML), use this endpoint */
  restapiV2__importObjectTML?: Maybe<Scalars['JSON']>;
  /** To programmatically download Liveboard data or specific Visualization data from Liveboard as a file, use this endpoint */
  restapiV2__liveboardReport?: Maybe<Scalars['JSON']>;
  /** You can programmatically create login session for a user in ThoughtSpot using this endpoint. \n\n You can create session by either providing userName and password as inputs in this request body or by including "Authorization" header with the token generated through the endpoint /tspublic/rest/v2/session/gettoken. \n\n userName and password input is given precedence over "Authorization" header, when both are included in the request. */
  restapiV2__login: SessionLoginResponse;
  /** To log a user out of the current session, use this endpoint */
  restapiV2__logout: Scalars['Boolean'];
  /** Use this endpoint to refresh data in the materialized view by running the query associated with it */
  restapiV2__refreshMaterializedView?: Maybe<Scalars['JSON']>;
  /** To programmatically remove groups from a group, use API endpoint.The API removes only the group association. It does not delete the group from the Thoughtspot system. At least one of id or name of group is required. When both are given user id will be considered. */
  restapiV2__removeGroupsFromGroup: Scalars['Boolean'];
  /** To programmatically remove privileges from a group, use API endpoint. The API removes only the privilege association. It does not delete the privilege or group from the Thoughtspot system. At least one of id or name of group is required. When both are given user id will be considered. */
  restapiV2__removePrivilegesFromGroup: Scalars['Boolean'];
  /**
   * To programmatically remove a table from a connection use API endpoint.
   * The API removes only the connection association. It does not delete the connection or group from the Thoughtspot system.
   *  At least one of id or name of connection is required. When both are given connection id will be considered.
   */
  restapiV2__removeTableFromConnection: Scalars['Boolean'];
  /**
   * To programmatically remove groups from an existing ThoughtSpot user, use this API endpoint.
   * The API removes only the user association. It does not delete the user or group from the Thoughtspot system
   * At least one of User Id or username is mandatory. When both are given, then user id will be considered.
   */
  restapiV2__removeUserFromGroups: Scalars['Boolean'];
  /** To programmatically remove users from a group, use API endpoint.The API removes only the user association. It does not delete the users or group from the Thoughtspot system. At least one of id or name of group is required. When both are given user id will be considered. */
  restapiV2__removeUsersFromGroup: Scalars['Boolean'];
  /** To reset the password of a ThoughtSpot user account, use this endpoint. \n\n It is mandatory to use Authorization header with token of a user with admin access to successfully run this endpoint. \n\n At least one of User Id or username is mandatory. When both are given, then user id will be considered. */
  restapiV2__resetUserPassword: Scalars['Boolean'];
  /** To expire or revoke a token for a user, use this endpoint */
  restapiV2__revokeToken: Scalars['Boolean'];
  /** To run a TQL statement in Falcon, use this endpoint. You can run only following type of statements - Table DDL alter and Table rows update and delete. */
  restapiV2__runQuery?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  /** To get the details of a specific connection or all connections in the ThoughtSpot system use this end point. */
  restapiV2__searchConnection?: Maybe<Array<Maybe<ConnectionResponse>>>;
  /** To get the details of a specific group account or all groups in the ThoughtSpot system, use this end point. */
  restapiV2__searchGroups?: Maybe<Scalars['JSON']>;
  /** To get the details of a specific organization or all organizations in the ThoughtSpot system use this end point. \n\n If no input is provided, then all organizations are included in the response. \n\n Requires Administration privilege for tenant. */
  restapiV2__searchOrgs?: Maybe<Array<Maybe<OrgsResponse>>>;
  /** To list the permissions for user and user groups on a list of objects, use this endpoint. The response will include only those users and groups with have either VIEW OR MODIFY permission. \n\n You can either provide list of object ids or type of objects to list the permissions for. One of these inputs is mandatory. If both are provided then only object ids will be considred. \n\n You can optionally provide users or user groups for which the persmission needs to be displayed. \n\n You can optionally see the permission on the dependent objects as well by enabling includeDependent field. \n\n Requires administration privilege */
  restapiV2__searchPermissionForPrincipals?: Maybe<Array<Maybe<PrincipalSearchResponse>>>;
  /** To list the permissions for user and user groups on a list of objects, use this endpoint. The response will include only those users and groups with have either VIEW OR MODIFY permission. \n\n You can either provide list of object ids or type of objects to list the permissions for. One of these inputs is mandatory. If both are provided then only object ids will be considred. \n\n You can optionally provide users or user groups for which the persmission needs to be displayed. \n\n You can optionally see the permission on the dependent objects as well by enabling includeDependent field. \n\n Requires administration privilege */
  restapiV2__searchPermissionOnObjects?: Maybe<Array<Maybe<SecurityPermissionResponse>>>;
  /** To get the details of a specific user account or all users in the ThoughtSpot system use this end point. */
  restapiV2__searchUsers?: Maybe<Scalars['JSON']>;
  /** To programmatically share ThoughtSpot objects with another user or user group, use this endpoint. \n\n When you share an object like a Liveboard or visualization, a notification with a live link is sent to the user. When the users access this object, they can view the last saved version of the object. */
  restapiV2__shareObject?: Maybe<Scalars['Boolean']>;
  /** If you want to share a specific visualization from a Liveboard with another user or user group, then use this endpoint. \n\n Requires privilege to share the visualization */
  restapiV2__shareVisualization?: Maybe<Scalars['Boolean']>;
  /** To programmatically synchronize user accounts and user groups from external system with ThoughtSpot, use this endpoint. \n\n The payload takes principals containing all users and groups present in the external system. \n\n The users and user groups in Thoughtspot get updated for any matching inputs. \n\n Any user and user group present in the input, but not present in the cluster, gets created in cluster. \nn You can optionally choose to delete the user and groups from the cluster, that are not present in the input. */
  restapiV2__syncPrincipal: AdminsyncPrincipalResponse;
  /** To programmatically unassign objects to favorites for a given user account, use this endpoint. At least one of user id or username is required. When both are given, then id will be considered. */
  restapiV2__unassignFavorite: Scalars['Boolean'];
  /** To unassign the home liveboard set for a user, use this endpoint. At least one of user id or username is required. When both are given, then id will be considered. */
  restapiV2__unassignHomeLiveboard: Scalars['Boolean'];
  /** To programmatically unassign tags to a metadata object, such as a liveboard, search answer, table, worksheet, or view, use this endpoint. At least one of id or name of tag is required. When both are given, then id will be considered. */
  restapiV2__unassignTag: Scalars['Boolean'];
  /** To update the Thoughtspot cluster configuration, use this endpoint. */
  restapiV2__updateClusterConfig: Scalars['Boolean'];
  /**
   * You can use this endpoint to programmatically modify an existing connection
   * To modify a connection, you require admin connection privileges.
   * At least one of Connection Id or connectionname is mandatory. When both are given, then connection id will be considered and connectionname will be updated
   */
  restapiV2__updateConnection: Scalars['Boolean'];
  /** To programmatically edit an existing custom action, use this endpoint */
  restapiV2__updateCustomAction?: Maybe<Scalars['JSON']>;
  /** To programmatically associate a custom action to a ThoughtSpot object, use this endpoint */
  restapiV2__updateCustomActionAssociation?: Maybe<Scalars['JSON']>;
  /**
   * You can use this endpoint to programmatically modify an existing user account.
   * To modify a user, you require admin user privileges.
   * At least one of User Id or username is mandatory. When both are given, then user id will be considered and username will be updated
   */
  restapiV2__updateGroup: Scalars['Boolean'];
  /** You can use this endpoint to programmatically modify an existing org. \n\n Provide name or id of the organization to update the properties. When both id and name are given, then id will be considered and name of the organization will be updated. \n\n Requires Administration privilege for tenant. */
  restapiV2__updateOrg?: Maybe<OrgsResponse>;
  /** To programmatically update tags, use this endpoint. At least one of id or name of tag is required. When both are given, then id will be considered. */
  restapiV2__updateTag: Scalars['Boolean'];
  /**
   * You can use this endpoint to programmatically modify an existing user account.  To modify a user, you require admin user privileges.
   * At least one of User Id or username is mandatory. When both are given, then user id will be considered and username will be updated
   */
  restapiV2__updateUser: Scalars['Boolean'];
  /** Update catalog data source */
  updateCatalogDataSource: UpdateCatalogDataSourcesResult;
  /** To update connection */
  updateConnection?: Maybe<Scalars['JSON']>;
  /** To Edit an existing connection header. */
  updateHeader?: Maybe<Scalars['JSON']>;
  updateStyleCustomizationPerOrg?: Maybe<Scalars['Boolean']>;
  /** Approve liveboard verification */
  verifyLiveboard?: Maybe<Scalars['JSON']>;
};


export type MutationAction_CreateEmbedUrlsConfigInfoPerOrgArgs = {
  answerURL?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  genericURL?: InputMaybe<Scalars['String']>;
  insightsURL?: InputMaybe<Scalars['String']>;
  liveboardURL?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orgIdentifier?: InputMaybe<Scalars['String']>;
  unsubscribeURL?: InputMaybe<Scalars['String']>;
  visualizationURL?: InputMaybe<Scalars['String']>;
};


export type MutationAction_DeleteEmbedUrlConfigInfoPerOrgArgs = {
  custom_link_identifier: Scalars['String'];
};


export type MutationActionsAssociation_AddUpdateCustomActionAssociationArgs = {
  actionAssociation: ActionAssociationInput;
};


export type MutationActionsAssociation_DeleteCustomActionAssociationArgs = {
  actionAssociation: ActionAssociationInput;
};


export type MutationActions_AddEmbedCustomActionArgs = {
  embedAction: EmbedActionConfigInput;
};


export type MutationActions_AddHelpConfigArgs = {
  inputData: HelpConfigInfoInput;
};


export type MutationActions_DeleteEmbedCustomActionArgs = {
  actionId: Scalars['String'];
};


export type MutationActions_DeleteHelpConfigArgs = {
  id: Scalars['String'];
};


export type MutationActions_EditHelpConfigArgs = {
  inputData: HelpConfigInfoInput;
};


export type MutationActions_UpdateConfigInfoArgs = {
  actions: Array<InputMaybe<EmbedActionConfigInput>>;
};


export type MutationActions_UpdateEmbedCustomActionArgs = {
  actionId: Scalars['String'];
  embedAction: EmbedActionConfigInput;
};


export type MutationActions_UpdateEmbedUrlsConfigInfoArgs = {
  embedUrlsConfig: EmbedUrlsConfigInput;
};


export type MutationActions_UpdateEmbedUrlsConfigInfoPerOrgArgs = {
  answerURL?: InputMaybe<Scalars['String']>;
  customLinkId: Scalars['String'];
  genericURL?: InputMaybe<Scalars['String']>;
  insightsURL?: InputMaybe<Scalars['String']>;
  liveboardURL?: InputMaybe<Scalars['String']>;
  unsubscribeURL?: InputMaybe<Scalars['String']>;
  visualizationURL?: InputMaybe<Scalars['String']>;
};


export type MutationAdmin_CreateAuthTokenArgs = {
  viewMode?: InputMaybe<Scalars['String']>;
};


export type MutationAdmin_DeleteAuthTokenArgs = {
  viewMode?: InputMaybe<Scalars['String']>;
};


export type MutationAdmin_DeleteNasArgs = {
  data: Admin__DeleteNasInput;
};


export type MutationAdmin_DeleteSnapshotArgs = {
  snapshotName: Scalars['String'];
};


export type MutationAdmin_SetDevSpotAdminPrivilegesArgs = {
  orgId?: InputMaybe<Scalars['String']>;
  payload: Admin__SetDevSpotAdminPrivilegesInput;
  viewMode?: InputMaybe<Scalars['String']>;
};


export type MutationAdmin_SetDevSpotEmbedDevPrivilegesArgs = {
  orgId?: InputMaybe<Scalars['String']>;
  payload: Admin__SetDevSpotEmbedDevPrivilegesInput;
  viewMode?: InputMaybe<Scalars['String']>;
};


export type MutationAdmin_SetLdapAdArgs = {
  data: Admin__SetLdapAdInput;
};


export type MutationAdmin_SetLocalArgs = {
  data: Admin__SetLocalInput;
};


export type MutationAdmin_SetNasArgs = {
  data: Admin__SetNasInput;
};


export type MutationAdmin_SetRevSshArgs = {
  data: Admin__SetRevSshInput;
};


export type MutationAdmin_SetSmtpArgs = {
  data: Admin__SetSmtpInput;
};


export type MutationAdmin_SetSnapshotArgs = {
  data: Admin__SetSnapshotInput;
};


export type MutationAdmin_SetTscliCommandArgs = {
  featureName: Scalars['String'];
  params: Params;
};


export type MutationAdmin_SignEulaArgs = {
  emailId: Scalars['String'];
};


export type MutationAdmin_ValidateEmbedSettingsArgs = {
  payload: Admin__ValidateEmbedSettingsInput;
};


export type MutationAnswer__CopyFromIdArgs = {
  id: Scalars['GUID'];
};


export type MutationAnswer__InitializeExploreArgs = {
  session: BachSessionIdInput;
  suggestionTabs: Array<Scalars['String']>;
  vizId: Scalars['GUID'];
};


export type MutationAnswer__A3AnalysisSubmissionArgs = {
  analysisType: A3AnalysisTypeEnum;
  analyzeCurrentData?: InputMaybe<CurrentDataOptionsEnum>;
  dataRows?: InputMaybe<Array<UserPointSelectionInput>>;
  locale?: InputMaybe<Scalars['String']>;
  measureColumnId?: InputMaybe<Scalars['String']>;
  param?: InputMaybe<AnalysisParam>;
  selectedColumnsIds?: InputMaybe<Array<Scalars['String']>>;
  session: BachSessionIdInput;
  title?: InputMaybe<Scalars['String']>;
  vizId?: InputMaybe<Scalars['String']>;
};


export type MutationAnswer__A3AnalysisSyncArgs = {
  analysisType: A3AnalysisTypeEnum;
  dataRows?: InputMaybe<Array<UserPointSelectionInput>>;
  measureColumnId?: InputMaybe<Scalars['String']>;
  param?: InputMaybe<AnalysisParam>;
  selectedColumnsIds?: InputMaybe<Array<Scalars['String']>>;
  session: BachSessionIdInput;
};


export type MutationAnswer__AddColumnArgs = {
  columns: Array<AnswerColumnInfo>;
  session: BachSessionIdInput;
};


export type MutationAnswer__AddUpdateFilterArgs = {
  params: AddUpdateFilterInput;
  session: BachSessionIdInput;
};


export type MutationAnswer__AddVizToPinboardArgs = {
  newPinboardName?: InputMaybe<Scalars['String']>;
  newTabName?: InputMaybe<Scalars['String']>;
  newVizDescription?: InputMaybe<Scalars['String']>;
  newVizName?: InputMaybe<Scalars['String']>;
  pinFromStore?: InputMaybe<Scalars['Boolean']>;
  pinboardId?: InputMaybe<Scalars['GUID']>;
  session: BachSessionIdInput;
  tabId?: InputMaybe<Scalars['GUID']>;
  vizId: Scalars['GUID'];
};


export type MutationAnswer__ApplySuggestionsArgs = {
  phraseTokens?: InputMaybe<Array<RecognizedTokenInput>>;
  phraseType?: InputMaybe<PhraseType>;
  session: BachSessionIdInput;
  suggestions?: InputMaybe<Array<QueryTransformInput>>;
  vizId?: InputMaybe<Scalars['String']>;
};


export type MutationAnswer__BulkSaveArgs = {
  answerObjects: Array<AutoAnswerRequest>;
};


export type MutationAnswer__ClearArgs = {
  session: BachSessionIdInput;
};


export type MutationAnswer__CopyArgs = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  session: BachSessionIdInput;
};


export type MutationAnswer__CreateArgs = {
  answerContext?: InputMaybe<AnswerContextType>;
  runtimeFilter?: InputMaybe<Array<RuntimeFilterInput>>;
  runtimeParameter?: InputMaybe<Array<RuntimeParameterInput>>;
  runtimeSort?: InputMaybe<Array<RuntimeSortInput>>;
  sources?: InputMaybe<Array<Scalars['GUID']>>;
  useLastSelectedSources?: InputMaybe<Scalars['Boolean']>;
};


export type MutationAnswer__CreateFormulaEditSessionArgs = {
  acSession: AcSessionInput;
  formulaId?: InputMaybe<Scalars['String']>;
};


export type MutationAnswer__DeleteAnswerArgs = {
  id: Scalars['GUID'];
};


export type MutationAnswer__DrillDownArgs = {
  additionalFilters?: InputMaybe<Array<UserPointSelectionInput>>;
  autoDrillDown?: InputMaybe<Scalars['Boolean']>;
  drillDownColumn?: InputMaybe<DrillDownColumnInfo>;
  nonFilteredColumns: Array<Scalars['GUID']>;
  session: BachSessionIdInput;
};


export type MutationAnswer__FormulaSearchArgs = {
  acSession: AcSessionInput;
  charOffsetInEditedToken: Scalars['Int'];
  editedTokenIdx: Scalars['Int'];
  selectedSourceGuids: Array<Scalars['GUID']>;
  tokens: Array<SageTokenInput>;
};


export type MutationAnswer__GetA3AnalysisColumnsArgs = {
  analysisType?: InputMaybe<A3AnalysisTypeEnum>;
  session: BachSessionIdInput;
};


export type MutationAnswer__GetDrillDownColumnsArgs = {
  session: BachSessionIdInput;
};


export type MutationAnswer__GetFilterValuesArgs = {
  params: FilterValuesInput;
  session: BachSessionIdInput;
};


export type MutationAnswer__GetNaturalLanguageQueryArgs = {
  session: BachSessionIdInput;
};


export type MutationAnswer__GetQueryArgs = {
  session: BachSessionIdInput;
};


export type MutationAnswer__GetQueryBuilderCompletionsForExploreArgs = {
  currentTemplateEntryIdx: Scalars['Int'];
  currentTemplateIdx: Scalars['Int'];
  maxCompletions?: InputMaybe<Scalars['Int']>;
  queryTemplate: QueryTemplateInput;
  queryTemplateBoundStateType: QueryTemplateBoundStateType;
  queryTemplateType: QueryTemplateType;
  searchTokenList?: InputMaybe<Array<InputMaybe<RecognizedTokenInput>>>;
  selectedSourceGuids?: InputMaybe<Array<Scalars['String']>>;
  session: AcSessionInput;
  token: RecognizedTokenInput;
  visualizedColumns?: InputMaybe<Array<InputMaybe<Scalars['GUID']>>>;
};


export type MutationAnswer__GetQueryBuilderTemplatesForExploreArgs = {
  queryTemplateBoundStateType: QueryTemplateBoundStateType;
  queryTemplateType: QueryTemplateType;
  selectedSourceGuids?: InputMaybe<Array<Scalars['String']>>;
  session: AcSessionInput;
  token: RecognizedTokenInput;
};


export type MutationAnswer__GetUnaggregatedAnswerArgs = {
  columns: Array<UserPointSelectionInput>;
  session: BachSessionIdInput;
};


export type MutationAnswer__LoadArgs = {
  answerContext?: InputMaybe<AnswerContextType>;
  id: Scalars['GUID'];
  isSavedView?: InputMaybe<Scalars['Boolean']>;
  runtimeFilter?: InputMaybe<Array<RuntimeFilterInput>>;
  runtimeParameter?: InputMaybe<Array<RuntimeParameterInput>>;
  runtimeSort?: InputMaybe<Array<RuntimeSortInput>>;
};


export type MutationAnswer__LoadSessionArgs = {
  session: BachSessionIdInput;
};


export type MutationAnswer__QueryBuilderSearchArgs = {
  currentTemplateEntryIdx: Scalars['Int'];
  currentTemplateIdx: Scalars['Int'];
  lessonId: Scalars['Int'];
  maxCompletions?: InputMaybe<Scalars['Int']>;
  queryBuilderTokens: Array<RecognizedTokenInput>;
  selectedSourceId: Scalars['String'];
  session: AcSessionInput;
};


export type MutationAnswer__RemoveCohortArgs = {
  cohortColumnId: Scalars['String'];
  session: BachSessionIdInput;
};


export type MutationAnswer__RemoveColumnArgs = {
  columnId?: InputMaybe<Scalars['GUID']>;
  logicalColumnId?: InputMaybe<Scalars['GUID']>;
  session: BachSessionIdInput;
};


export type MutationAnswer__RemoveColumnsArgs = {
  columnIds?: InputMaybe<Array<Scalars['GUID']>>;
  logicalColumnIds?: InputMaybe<Array<Scalars['GUID']>>;
  session: BachSessionIdInput;
};


export type MutationAnswer__RemoveFilterArgs = {
  filterIds: Array<Scalars['GUID']>;
  session: BachSessionIdInput;
};


export type MutationAnswer__RemoveFormulaArgs = {
  formulaId: Scalars['GUID'];
  session: BachSessionIdInput;
};


export type MutationAnswer__RemoveParameterArgs = {
  parameterId: Scalars['String'];
  session: BachSessionIdInput;
};


export type MutationAnswer__RemoveParameterOverrideArgs = {
  parameterId: Scalars['String'];
  session: BachSessionIdInput;
};


export type MutationAnswer__ResolveSageTokenAmbiguityArgs = {
  acSession: AcSessionInput;
  resolveTokenIdx: Scalars['Int'];
  selectedSourceGuids: Array<Scalars['GUID']>;
  tokens: Array<SageTokenInput>;
};


export type MutationAnswer__SageSearchArgs = {
  acSession: AcSessionInput;
  charOffsetInEditedToken: Scalars['Int'];
  editedTokenIdx: Scalars['Int'];
  nDesiredCompletions: Scalars['Int'];
  sageFeatureFlags?: InputMaybe<Array<SageFeatureFlag>>;
  sageRequestFlags?: InputMaybe<Array<SageRequestFlag>>;
  searchAssistPayload?: InputMaybe<SearchAssistPayloadInput>;
  selectedSourceGuids: Array<Scalars['GUID']>;
  tokens: Array<SageTokenInput>;
};


export type MutationAnswer__SaveArgs = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  session: BachSessionIdInput;
};


export type MutationAnswer__SaveAsViewArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  session: BachSessionIdInput;
};


export type MutationAnswer__SaveCohortArgs = {
  anchorColumnId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  otherGroupName?: InputMaybe<Scalars['String']>;
  returnColumnId: Scalars['String'];
  session: BachSessionIdInput;
};


export type MutationAnswer__SaveFormulaArgs = {
  aggregationType: ColumnAggregationType;
  columnType: SageColumnType;
  dataType: FalconDataType;
  isNew: Scalars['Boolean'];
  name: Scalars['String'];
  session: BachSessionIdInput;
};


export type MutationAnswer__SaveParameterArgs = {
  answerId: Scalars['GUID'];
  parameter: ParameterInput;
  session: BachSessionIdInput;
};


export type MutationAnswer__SetDataSourcesArgs = {
  session: BachSessionIdInput;
  sources: Array<Scalars['GUID']>;
  updateLastSelectedSource: Scalars['Boolean'];
};


export type MutationAnswer__SetHeadlineAggregationArgs = {
  aggregationType: Array<ColumnAggregationType>;
  session: BachSessionIdInput;
  vizId: Scalars['GUID'];
};


export type MutationAnswer__SetHeadlineColumnsArgs = {
  columnIds: Array<Scalars['GUID']>;
  session: BachSessionIdInput;
};


export type MutationAnswer__SetParameterOverrideArgs = {
  dataType: FalconDataType;
  parameterId: Scalars['String'];
  session: BachSessionIdInput;
  value: Scalars['String'];
};


export type MutationAnswer__SetTmlStringArgs = {
  dataSourceId?: InputMaybe<Scalars['String']>;
  session: BachSessionIdInput;
  tmlString: Scalars['String'];
};


export type MutationAnswer__SubmitRAnalysisArgs = {
  customRScript: CustomRAnalysis;
  session: BachSessionIdInput;
};


export type MutationAnswer__UpdateAnswerClientStateArgs = {
  clientState: Scalars['JSON'];
  session: BachSessionIdInput;
};


export type MutationAnswer__UpdateChartConfigArgs = {
  axisConfig?: InputMaybe<Array<AxisConfigInput>>;
  chartType?: InputMaybe<ChartType>;
  customChartConfig?: InputMaybe<Array<CustomChartConfigInput>>;
  customChartGuid?: InputMaybe<Scalars['String']>;
  isLocked?: InputMaybe<Scalars['Boolean']>;
  session: BachSessionIdInput;
};


export type MutationAnswer__UpdateColumnArgs = {
  columnConfig?: InputMaybe<AnswerColumnConfigInput>;
  columnId: Scalars['GUID'];
  name?: InputMaybe<Scalars['String']>;
  session: BachSessionIdInput;
};


export type MutationAnswer__UpdateColumnClientStateArgs = {
  clientState: Scalars['JSON'];
  columnId: Scalars['GUID'];
  session: BachSessionIdInput;
};


export type MutationAnswer__UpdateCustomVisualPropsArgs = {
  customVisualProps: Scalars['JSON'];
  session: BachSessionIdInput;
  vizId: Scalars['GUID'];
};


export type MutationAnswer__UpdateFilterLayoutArgs = {
  reorderedFilterOutputIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  session: BachSessionIdInput;
};


export type MutationAnswer__UpdatePropertiesArgs = {
  clearPathAnalysis?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  displayMode?: InputMaybe<DisplayMode>;
  name?: InputMaybe<Scalars['String']>;
  pathAnalysisConfig?: InputMaybe<PathAnalysisConfigInput>;
  session: BachSessionIdInput;
};


export type MutationAnswer__UpdateSortArgs = {
  session: BachSessionIdInput;
  sortOrder: Array<AnswerColumnSortInput>;
};


export type MutationAnswer__UpdateTokensArgs = {
  session: BachSessionIdInput;
};


export type MutationAnswer__UpdateViewArgs = {
  session: BachSessionIdInput;
  updatedViewDescription?: InputMaybe<Scalars['String']>;
  updatedViewName: Scalars['String'];
  viewId: Scalars['GUID'];
};


export type MutationAnswer__UpdateVizClientStateArgs = {
  clientState: Scalars['JSON'];
  isPinboardRequest?: InputMaybe<Scalars['Boolean']>;
  session: BachSessionIdInput;
  vizId: Scalars['GUID'];
};


export type MutationApplyStickersArgs = {
  ids: Array<Scalars['String']>;
  tagId: Array<Scalars['String']>;
  type: ListType;
};


export type MutationAssignTagArgs = {
  ids: Array<Scalars['String']>;
  tagId: Array<Scalars['String']>;
  type: Array<ListType>;
};


export type MutationCreateCatalogConnectionArgs = {
  params: CreateCatalogConnectionInput;
};


export type MutationCreateRelationshipArgs = {
  description: Scalars['String'];
  destColumnIds: Array<Scalars['String']>;
  destTableId: Scalars['String'];
  isOneToOneJoin: Scalars['Boolean'];
  joinType: Scalars['String'];
  name: Scalars['String'];
  saveRelationship?: InputMaybe<Scalars['Boolean']>;
  sourceColumnIds: Array<Scalars['String']>;
  sourceTableId: Scalars['String'];
};


export type MutationCreateTagArgs = {
  name: Scalars['String'];
  type: Scalars['String'];
};


export type MutationCsv_AbortAndClearCacheArgs = {
  cacheguid: Scalars['String'];
};


export type MutationCsv_CreateTableArgs = {
  payload: Csv_CreateTablePayload;
};


export type MutationCsv_GetCsvRowsArgs = {
  cacheguid: Scalars['String'];
};


export type MutationCsv_LoadDataArgs = {
  payload: Csv_LoadDataPayload;
};


export type MutationCsv_ReadKeysArgs = {
  schema: Csv_SchemaInput;
};


export type MutationCsv_ReadTableColumnsArgs = {
  cacheguid: Scalars['String'];
};


export type MutationCustomChart_AddArgs = {
  author?: InputMaybe<ChartAuthorInput>;
  description?: InputMaybe<Scalars['String']>;
  iconUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  orgId?: InputMaybe<Scalars['Int']>;
  sourceUrl: Scalars['String'];
};


export type MutationCustomChart_DeleteArgs = {
  guid: Scalars['GUID'];
  orgId?: InputMaybe<Scalars['Int']>;
};


export type MutationCustomChart_UpdateArgs = {
  author?: InputMaybe<ChartAuthorInput>;
  description?: InputMaybe<Scalars['String']>;
  guid: Scalars['GUID'];
  iconUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  orgId?: InputMaybe<Scalars['Int']>;
  sourceUrl: Scalars['String'];
};


export type MutationCustomRegion_DeleteArgs = {
  id: Scalars['String'];
  orgId?: InputMaybe<Scalars['Int']>;
};


export type MutationCustomRegion_UpdateArgs = {
  displayName: Scalars['String'];
  file: Scalars['String'];
  geometryType: Scalars['String'];
  id: Scalars['String'];
  mimeType: Scalars['String'];
  orgId?: InputMaybe<Scalars['Int']>;
};


export type MutationCustomRegion_UploadArgs = {
  displayName: Scalars['String'];
  file: Scalars['String'];
  geometryType: Scalars['String'];
  mimeType: Scalars['String'];
  orgId?: InputMaybe<Scalars['Int']>;
};


export type MutationCustomStyle_UpdateStyleArgs = {
  appBackground?: InputMaybe<Color>;
  appLogoTypeToImage?: InputMaybe<Scalars['JSON']>;
  appPanelColor?: InputMaybe<Color>;
  chartColorPalettes: Array<Scalars['String']>;
  chartFeatureToFontGuid?: InputMaybe<Scalars['JSON']>;
  customFontFaces: Array<FontFaceInput>;
  disableColorRotation?: InputMaybe<Scalars['Boolean']>;
  footerText?: InputMaybe<Scalars['String']>;
  pageTitle?: InputMaybe<Scalars['String']>;
  tableFeatureToFontGuid?: InputMaybe<Scalars['JSON']>;
};


export type MutationDs__CreateDestinationArgs = {
  params?: InputMaybe<Ds__CreateDestinationInput>;
};


export type MutationDs__CreateDestinationSyncArgs = {
  params?: InputMaybe<Ds__DestinationSyncInput>;
};


export type MutationDs__DeleteDestinationArgs = {
  destinations: Array<Ds__DeleteDestinationInput>;
};


export type MutationDs__DeleteDestinationSyncArgs = {
  pipelineIds: Array<Scalars['String']>;
};


export type MutationDs__GetOrCreateDestinationArgs = {
  params?: InputMaybe<Ds__CreateDestinationInput>;
};


export type MutationDs__GetPipelineDetailsArgs = {
  pipelineId: Scalars['String'];
};


export type MutationDs__ReauthenticateDestinationArgs = {
  params?: InputMaybe<Ds__ReauthenticateDestinationInput>;
};


export type MutationDs__UpdateDestinationArgs = {
  description: Scalars['String'];
  destination_id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDs__UpdateDestinationSyncArgs = {
  params?: InputMaybe<Ds__DestinationSyncInput>;
};


export type MutationDs_RunPipelineArgs = {
  pipelineIds: Array<Scalars['String']>;
};


export type MutationDbt__DeleteConnectionsArgs = {
  dbtConnectionIds: Array<Scalars['String']>;
};


export type MutationDbt__GenerateTmlArgs = {
  params: Array<DbtGenerateTmlParamsInput>;
};


export type MutationDbt__GenerateWorksheetsArgs = {
  params: Array<DbtGenerateWorksheetsParamsInput>;
};


export type MutationDbt__GetTableListArgs = {
  models: Array<Scalars['String']>;
};


export type MutationDbt__ImportEdocArgs = {
  formatType?: InputMaybe<EDocFormatType>;
  generationType?: InputMaybe<EDocGenerationType>;
  importPolicy?: InputMaybe<ImportEPackPolicy>;
  objects: Array<DbtImportEPackObjectInput>;
};


export type MutationDependency__ListDependentsArgs = {
  ids: Array<Scalars['String']>;
  type: ListType;
};


export type MutationDisconnectCatalogConnectionArgs = {
  connection_id: Scalars['String'];
};


export type MutationEmbrace__VerifyConnectionArgs = {
  authType?: InputMaybe<Scalars['String']>;
  config?: InputMaybe<Scalars['JSON']>;
  includeColumns?: InputMaybe<Scalars['Boolean']>;
  state?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MutationEmbrace__VerifyConnectionByIdArgs = {
  authType?: InputMaybe<Scalars['String']>;
  config: Scalars['JSON'];
  id?: InputMaybe<Scalars['GUID']>;
  includeColumns?: InputMaybe<Scalars['Boolean']>;
};


export type MutationEureka__AddVizSnapshotArgs = {
  reportBookId: Scalars['String'];
  reportBookType: Scalars['String'];
  version: Scalars['Int'];
  vizContent: Scalars['String'];
  vizId: Scalars['String'];
};


export type MutationEureka__SetDataSourceArgs = {
  sourceId: Scalars['String'];
  sourceName: Scalars['String'];
};


export type MutationExplore__ConstrainedSearchArgs = {
  acSession: AcSessionInput;
  allowedPhraseTypes?: InputMaybe<Array<PhraseType>>;
  charOffsetInEditedToken: Scalars['Int'];
  constrainedContext?: InputMaybe<ConstrainedContext>;
  contextId?: InputMaybe<Scalars['String']>;
  dontUpdateGenNoInCache?: InputMaybe<Scalars['Boolean']>;
  featureFlags?: InputMaybe<Array<SageFeatureFlag>>;
  nDesiredCompletions: Scalars['Int'];
  sageRequestFlags?: InputMaybe<Array<SageRequestFlag>>;
  selectedSourceGuids: Array<Scalars['GUID']>;
  tokens: Array<SageTokenInput>;
};


export type MutationGetVizDataArgs = {
  batchOffset: Scalars['Int'];
  batchSize: Scalars['Int'];
  queryTimeout: Scalars['Int'];
  session: BachSessionIdSqlAnswerInput;
  vizId: Scalars['GUID'];
};


export type MutationLicense_UpdateTseLicenseInfoArgs = {
  tsInfo: TseLicenseInput;
};


export type MutationMetadata__ImportEdocArgs = {
  formatType?: InputMaybe<EDocFormatType>;
  generationType?: InputMaybe<EDocGenerationType>;
  importPolicy?: InputMaybe<ImportEPackPolicy>;
  objects: Array<ImportEPackObjectInfo>;
};


export type MutationMetadata__ValidateEdocArgs = {
  objects: Array<ImportEPackObjectInfo>;
};


export type MutationMetadata_AddPriorityListItemArgs = {
  params: Array<PriorityListItemMutationInput>;
};


export type MutationMetadata_DeleteMetadataObjectArgs = {
  ids: Array<Scalars['String']>;
  type: MetadataType;
};


export type MutationMetadata_DeletePriorityListItemArgs = {
  params: Array<PriorityListItemMutationInput>;
};


export type MutationMetadata_MarkAsFavoriteArgs = {
  ids: Array<Scalars['String']>;
  type: ListType;
};


export type MutationMetadata_RemoveFromFavoriteArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationMetadata_ReorderPriorityListArgs = {
  params: Array<PriorityListItemMetricMutationInput>;
};


export type MutationMonitorRule__CreateArgs = {
  monitorRule: MonitorRuleInput;
};


export type MutationMonitorRule__DeleteArgs = {
  monitorRuleId: Scalars['String'];
};


export type MutationMonitorRule__SubscribeArgs = {
  monitorRuleId: Scalars['String'];
};


export type MutationMonitorRule__UnsubscribeArgs = {
  monitorRuleId: Scalars['String'];
};


export type MutationMonitorRule__UpdateArgs = {
  monitorRule: MonitorRuleInput;
  ruleId: Scalars['String'];
};


export type MutationOnboarding__SeedQuestionFeedbackArgs = {
  feedbackReason: Array<FeedbackReason>;
  feedbackText: Scalars['String'];
  nlText: Scalars['String'];
  questionId: Scalars['String'];
  sageQuery: Scalars['String'];
  sourceId: Scalars['String'];
};


export type MutationOnboarding__UpdateSetupStateArgs = {
  dataSourceId: Scalars['GUID'];
  type: MetadataType;
};


export type MutationOrg_CanDeleteArgs = {
  orgid: Scalars['String'];
};


export type MutationOrg_CreateArgs = {
  data: Org__DataInput;
};


export type MutationOrg_DeleteArgs = {
  orgid: Scalars['String'];
};


export type MutationOrg_UpdateArgs = {
  data: Org__UpdateInput;
};


export type MutationPartnerEng__UpdatePartnerConnectConfigArgs = {
  connSuccessful: Scalars['Boolean'];
  lastCreatedConnId: Scalars['GUID'];
  partner: Partner;
};


export type MutationPartnerEng__UpdateRedshiftConnectionStatusArgs = {
  connectionId: Scalars['GUID'];
  status: RedshiftConnectionStatus;
};


export type MutationPinboard__AddContainerArgs = {
  containerId?: InputMaybe<Scalars['String']>;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__AddNoteTileArgs = {
  session: BachPinboardSessionInput;
  tabId?: InputMaybe<Scalars['String']>;
};


export type MutationPinboard__AddTabArgs = {
  name: Scalars['String'];
  session: BachPinboardSessionInput;
};


export type MutationPinboard__AddUpdateCrossFilterArgs = {
  params: Array<AddUpdateFilterInput>;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__AddUpdateFilterArgs = {
  params: AddUpdateFilterInput;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__CancelPinboardSessionArgs = {
  session: BachPinboardSessionInput;
};


export type MutationPinboard__CopyPinboardArgs = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__CopyTabArgs = {
  id: Scalars['GUID'];
  session: BachPinboardSessionInput;
};


export type MutationPinboard__CreateByNameArgs = {
  description?: InputMaybe<Scalars['String']>;
  discoverable?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};


export type MutationPinboard__CreateTabByNameArgs = {
  id: Scalars['GUID'];
  name: Scalars['String'];
};


export type MutationPinboard__DeletePinboardVizArgs = {
  containerId?: InputMaybe<Scalars['String']>;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__GetFilterValuesArgs = {
  params: FilterValuesInput;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__LoadArgs = {
  applyRuntimeParams?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['GUID'];
  personalisedViewId?: InputMaybe<Scalars['String']>;
  pinboardContext?: InputMaybe<PinboardContextType>;
  runtimeFilter?: InputMaybe<Array<RuntimeFilterInput>>;
  runtimeParameter?: InputMaybe<Array<RuntimeParameterInput>>;
};


export type MutationPinboard__LoadContextBookArgs = {
  contextBookId?: InputMaybe<Scalars['GUID']>;
  runtimeFilter?: InputMaybe<Array<RuntimeFilterInput>>;
  session: BachPinboardSessionInput;
  vizId?: InputMaybe<Scalars['GUID']>;
};


export type MutationPinboard__MoveContainerToTabArgs = {
  containerId: Scalars['GUID'];
  newTabId: Scalars['GUID'];
  oldTabId: Scalars['GUID'];
  session: BachPinboardSessionInput;
};


export type MutationPinboard__PinNoteTileToPinboardArgs = {
  containerId: Scalars['GUID'];
  newPinboardName?: InputMaybe<Scalars['String']>;
  newTabName?: InputMaybe<Scalars['String']>;
  savedPinboardId?: InputMaybe<Scalars['GUID']>;
  session: BachPinboardSessionInput;
  sourcePinboardId?: InputMaybe<Scalars['GUID']>;
  tabId?: InputMaybe<Scalars['GUID']>;
};


export type MutationPinboard__RemoveAllCrossFilterArgs = {
  session: BachPinboardSessionInput;
};


export type MutationPinboard__RemoveCrossFilterArgs = {
  filterIds: Array<Scalars['GUID']>;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__RemoveFilterArgs = {
  filterIds: Array<Scalars['GUID']>;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__RemoveParameterOverrideArgs = {
  parameterId: Scalars['String'];
  session: BachPinboardSessionInput;
};


export type MutationPinboard__RemoveTabArgs = {
  id: Scalars['GUID'];
  session: BachPinboardSessionInput;
};


export type MutationPinboard__SaveContextBookArgs = {
  containerId: Scalars['String'];
  contextBookSession: BachSessionIdInput;
  refVizId?: InputMaybe<Scalars['String']>;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__SavePersonalisedViewArgs = {
  autoCreated?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  session: BachPinboardSessionInput;
};


export type MutationPinboard__SavePinboardArgs = {
  session: BachPinboardSessionInput;
};


export type MutationPinboard__SetFavoriteStatusArgs = {
  isFavorite: Scalars['Boolean'];
  pinboardId: Scalars['String'];
  session: BachPinboardSessionInput;
};


export type MutationPinboard__SetParameterOverrideArgs = {
  dataType?: InputMaybe<FalconDataType>;
  parameterId: Scalars['String'];
  session: BachPinboardSessionInput;
  value?: InputMaybe<Scalars['String']>;
};


export type MutationPinboard__UpdateFilterGroupArgs = {
  param?: InputMaybe<UpdateFilterGroup>;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__UpdateLayoutArgs = {
  containerLayout?: InputMaybe<Array<ContainerLayoutInput>>;
  reorderedTabIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  session: BachPinboardSessionInput;
  updatedFilterGroupLayout?: InputMaybe<Array<FilterGroupIdInput>>;
};


export type MutationPinboard__UpdateNoteTileArgs = {
  containerId: Scalars['GUID'];
  noteTileContent: Input_PinboardNoteTileContent;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__UpdatePropertiesArgs = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  persistPinboardHeader?: InputMaybe<Scalars['Boolean']>;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__UpdateTabArgs = {
  id: Scalars['GUID'];
  name: Scalars['String'];
  session: BachPinboardSessionInput;
};


export type MutationPinboard__UpdateTabFromStoreArgs = {
  session: BachPinboardSessionInput;
  tabId?: InputMaybe<Scalars['String']>;
};


export type MutationPinboard__UpdateVizPropertiesArgs = {
  containerId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  persistAnswerHeader?: InputMaybe<Scalars['Boolean']>;
  session: BachPinboardSessionInput;
};


export type MutationPinboard__UploadNoteTileImageArgs = {
  mimeType?: InputMaybe<Scalars['String']>;
  noteTileBase64String?: InputMaybe<Scalars['String']>;
};


export type MutationRequestAccessDataSourceArgs = {
  message?: InputMaybe<Scalars['String']>;
  objectId: Scalars['String'];
  objectType: ListType;
  userId: Scalars['String'];
};


export type MutationRequestAccessObjectArgs = {
  accessType: AccessMode;
  message?: InputMaybe<Scalars['String']>;
  objectId: Scalars['String'];
  objectType: ListType;
  userId: Scalars['String'];
};


export type MutationRole_CreateArgs = {
  inputData: CreateRole_DataInput;
};


export type MutationRole_DeleteArgs = {
  id: Scalars['String'];
};


export type MutationRole_UpdateArgs = {
  inputData: UpdateRole_DataInput;
};


export type MutationSaml_CreateConnectionArgs = {
  data: Admin__SamlConnection;
};


export type MutationSaml_DeleteConnectionArgs = {
  data: Saml_DeleteConnData;
};


export type MutationSaml_UpdateAttributeMappingArgs = {
  data: Saml_UpdateAttributeMapping;
};


export type MutationSaml_UpdateConnectionArgs = {
  data: Admin_SamlUpdate;
};


export type MutationSaml_UpdateConnectionStatusArgs = {
  data: Saml_StateUpdate;
};


export type MutationSaml_UploadMetaDataArgs = {
  data: Admin__MetaDataFile;
};


export type MutationSaveArgs = {
  content: Scalars['String'];
  forcesave?: InputMaybe<Scalars['Boolean']>;
  type: ListType;
};


export type MutationScheduler__CreateScheduleArgs = {
  params: CreateScheduleInput;
};


export type MutationScheduler__DeleteScheduleArgs = {
  params: DeleteScheduleInput;
};


export type MutationScheduler__UpdateScheduleArgs = {
  params: UpdateScheduleInput;
};


export type MutationScheduler_AddJobArgs = {
  job: AddJobPayload;
};


export type MutationScheduler_DeleteJobsArgs = {
  jobIds: Array<Scalars['GUID']>;
};


export type MutationScheduler_PauseJobsArgs = {
  jobIds: Array<Scalars['GUID']>;
};


export type MutationScheduler_ResumeJobsArgs = {
  jobIds: Array<Scalars['GUID']>;
};


export type MutationScheduler_UpdateJobArgs = {
  job: AddJobPayload;
  jobId: Scalars['String'];
};


export type MutationSearchCache__CreateScheduleArgs = {
  params: SearchCacheScheduleInput;
};


export type MutationSearchCache__DeleteScheduleArgs = {
  viewId: Scalars['GUID'];
};


export type MutationSearchCache__DematerializeViewArgs = {
  id: Scalars['GUID'];
};


export type MutationSearchCache__MaterializeViewArgs = {
  params: SearchCacheMaterializeInput;
};


export type MutationSearchCache__RefreshViewArgs = {
  ids: Array<InputMaybe<Scalars['GUID']>>;
};


export type MutationSearchCache__UpdateScheduleArgs = {
  params: SearchCacheScheduleInput;
};


export type MutationSeekwell__CreateDestinationArgs = {
  params?: InputMaybe<Seekwell__CreateDestinationInput>;
};


export type MutationSeekwell__CreatePipelineArgs = {
  params?: InputMaybe<Seekwell__CreatePipelineInput>;
};


export type MutationSeekwell__GetOrCreateDestinationArgs = {
  params?: InputMaybe<Seekwell__CreateDestinationInput>;
};


export type MutationSeekwell_DeleteDestinationByDestinationIdArgs = {
  params?: InputMaybe<SeekwellDeleteDestinationByDestinationIdInput>;
};


export type MutationSeekwell_DeletePipelineByPipelineIdArgs = {
  params?: InputMaybe<SeekwellDeletePipelineByPipelineIdInput>;
};


export type MutationSeekwell_UpdatePipelineByPipelineIdArgs = {
  params?: InputMaybe<SeekwellUpdatePipelineByPipelineIdInput>;
};


export type MutationSession__AddUsersToOrgArgs = {
  inputData: AddUsersToOrgInput;
};


export type MutationSession__AssignPinboardsToGroupArgs = {
  groupId: Scalars['String'];
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type MutationSession__BuildConnectionArgs = {
  state?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<CommunicationConnectionType>;
};


export type MutationSession__CreateGroupArgs = {
  params: CreateGroupInput;
};


export type MutationSession__CreateUserArgs = {
  params: CreateUserInput;
};


export type MutationSession__DeleteGroupsArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationSession__DeleteUsersArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationSession__LoginArgs = {
  password: Scalars['String'];
  rememberMe?: InputMaybe<Scalars['Boolean']>;
  userName: Scalars['String'];
};


export type MutationSession__ResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationSession__SetSpotIqPreferencesArgs = {
  inputData: SetSpotIqPreferencesInput;
};


export type MutationSession__SwitchOrgArgs = {
  orgid: Scalars['String'];
};


export type MutationSession__UpdateDisplayNameArgs = {
  displayName: Scalars['String'];
};


export type MutationSession__UpdateGroupArgs = {
  params: UpdateGroupInput;
};


export type MutationSession__UpdateGroupsInGroupArgs = {
  groupId: Scalars['String'];
  principalGroupIds: Array<InputMaybe<Scalars['String']>>;
};


export type MutationSession__UpdateIsFirstTimeSpotIqUserArgs = {
  isFirstTimeSpotIQUser: Scalars['Boolean'];
};


export type MutationSession__UpdatePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSession__UpdatePinsFlowFlagsArgs = {
  params: PinsFlowFlagsInput;
};


export type MutationSession__UpdatePreferenceArgs = {
  preferences: Scalars['JSON'];
};


export type MutationSession__UpdateUserArgs = {
  content: Scalars['String'];
  password: Scalars['String'];
  triggeredByAdmin: Scalars['Boolean'];
  userId: Scalars['String'];
};


export type MutationSession__UpdateUserEmailArgs = {
  emailId: Scalars['String'];
};


export type MutationSession__UpdateUsersArgs = {
  params: Array<UpdateUserInput>;
};


export type MutationSession__UpdateUsersInGroupArgs = {
  groupId: Scalars['String'];
  userIds: Array<InputMaybe<Scalars['String']>>;
};


export type MutationSession__UpdateVersionPreferenceArgs = {
  isAnswerV2Preferred?: InputMaybe<Scalars['Boolean']>;
  isDataPanelV2Preferred?: InputMaybe<Scalars['Boolean']>;
  isSpotIQV2Preferred?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSession__UploadProfilePicArgs = {
  inputData: UploadProfilePicInput;
};


export type MutationShareArgs = {
  emailSharees?: InputMaybe<Array<Scalars['String']>>;
  hasLenientDiscoverability?: InputMaybe<Scalars['Boolean']>;
  messsage?: InputMaybe<Scalars['String']>;
  notify?: InputMaybe<Scalars['Boolean']>;
  objects: Array<MetadataObjectIdWithTypeInput>;
  permissionMapByUserByObject?: InputMaybe<Array<Scalars['JSON']>>;
  permissions: Array<EntityPermissionInput>;
  shouldSendRequestAccess?: InputMaybe<Scalars['Boolean']>;
  shouldShareUnderlyingDataSources?: InputMaybe<Scalars['Boolean']>;
  underlyingDataSourceIds?: InputMaybe<Array<Scalars['String']>>;
  useCustomEmbedUrls?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSpotApps__SavePublMasterRecordArgs = {
  appGuid: Scalars['String'];
  reviewStatus: SpotAppReviewStatus;
  userGuid: Scalars['String'];
};


export type MutationSpotIq__ActionOnAnalysisArgs = {
  actionType: AnalysisActionType;
  analysisIds: Array<AnalysisActionIdInput>;
};


export type MutationSpotIq__AddFeedbackArgs = {
  feedbackInput: AddInsightFeedbackInput;
};


export type MutationSpotIq__AddJobScheduleArgs = {
  analysisResultId: Scalars['GUID'];
  jobSchedule: JobSchedule;
};


export type MutationSpotIq__DeleteFeedbackArgs = {
  feedbackId: Scalars['String'];
};


export type MutationSpotIq__GetAnalysisResultArgs = {
  id: Scalars['String'];
};


export type MutationSpotIq__GetJobRunsArgs = {
  analysisId: AnalysisActionIdInput;
};


export type MutationSpotIq__LoadA3AnalysisColumnsArgs = {
  encodedA3Request: Scalars['String'];
};


export type MutationSpotIq__LoadCustomAnalysisConfigArgs = {
  analysisResultId: Scalars['GUID'];
  schedulerJobId?: InputMaybe<Scalars['GUID']>;
};


export type MutationSpotIq__PauseJobScheduleArgs = {
  jobId: Scalars['GUID'];
};


export type MutationSpotIq__ResumeJobScheduleArgs = {
  jobId: Scalars['GUID'];
};


export type MutationSpotIq__SubmitCustomAnalysisArgs = {
  customAnalysisInput: SubmitCustomAnalysisInput;
  encodedA3Request: Scalars['String'];
  schedulerJobId?: InputMaybe<Scalars['GUID']>;
};


export type MutationSpotIq__UpdateFeedbackArgs = {
  feedbackInput: AddInsightFeedbackInput;
};


export type MutationSpotIq__UpdateJobScheduleArgs = {
  jobId: Scalars['GUID'];
  jobSchedule: JobSchedule;
};


export type MutationSpotappsAdmin__SaveApplicationReviewArgs = {
  request: SpotAppReviewDetailsInput;
};


export type MutationSpotapps__ConnectorTableMappingArgs = {
  request: ConnectorTableMappingInput;
};


export type MutationSpotapps__CreateConnectorArgs = {
  request: CreateConnectorInput;
};


export type MutationSpotapps__DeletePublishingDataArgs = {
  app_guid: Scalars['String'];
  userid: Scalars['String'];
};


export type MutationSpotapps__GetAppPublishDetailsArgs = {
  request: Scalars['String'];
};


export type MutationSpotapps__RemoveConnectionFromTmlArgs = {
  request: Scalars['String'];
};


export type MutationSpotapps__ResetConnectionArgs = {
  app_guid: Scalars['String'];
  userid: Scalars['String'];
};


export type MutationSpotapps__SaveAppConnectionArgs = {
  app_guid: Scalars['String'];
  conn_guid: Scalars['String'];
  review_status: SpotAppReviewStatus;
  userid: Scalars['String'];
};


export type MutationSpotapps__SaveColumnsMappingArgs = {
  review_status: SpotAppReviewStatus;
  tables?: InputMaybe<Array<InputMaybe<SpotAppsColumnInput>>>;
};


export type MutationSpotapps__SavePublishingInfoArgs = {
  request: SpotAppPublishDetailsInput;
};


export type MutationSpotapps__SaveTablesArgs = {
  review_status: SpotAppReviewStatus;
  tables?: InputMaybe<Array<InputMaybe<SpotAppsTablesInput>>>;
};


export type MutationSpotapps__UpdateConnectorStatusArgs = {
  request: UpdateConnectorStatusInput;
};


export type MutationSqlAnswer__GetQueryArgs = {
  session: BachSessionIdSqlAnswerInput;
};


export type MutationSqlAnswer__LoadArgs = {
  viewId?: InputMaybe<Scalars['String']>;
};


export type MutationSqlAnswer__SaveAsViewArgs = {
  session: BachSessionIdSqlAnswerInput;
  viewDescription: Scalars['String'];
  viewName: Scalars['String'];
};


export type MutationSqlAnswer__UpdatePropertiesArgs = {
  newDescription: Scalars['String'];
  newName: Scalars['String'];
  session: BachSessionIdSqlAnswerInput;
};


export type MutationSqlAnswer__UpdateViewArgs = {
  session: BachSessionIdSqlAnswerInput;
  viewDescription: Scalars['String'];
  viewId: Scalars['String'];
  viewName: Scalars['String'];
};


export type MutationSyncCatalogConnectionArgs = {
  params?: InputMaybe<SyncCatalogConnectionInput>;
};


export type MutationTseAppActions__CreateSchedulePipelineArgs = {
  params: SeekwellCreateScheduledPipelineInput;
};


export type MutationTseAppActions__UpdateSchedulePipelineArgs = {
  params: SeekwellUpdatedScheduledPipelineMetadataInput;
};


export type MutationTseAppActions__CreatePipelineAndRunArgs = {
  params: TseAppActions__CreatePipelineAndRunInput;
};


export type MutationTseAppActions__CreatePipelineAndSchedulerIdArgs = {
  params: SeekwellCreatePipelineAndSchedulerIdInput;
};


export type MutationTseAppActions__DeletePipelineAndSchedulerIdArgs = {
  params: SeekwellDeletePipelineAndSchedulerIdInput;
};


export type MutationTseAppActions__DeleteScheduledPipelineArgs = {
  params: SeekwellDeleteScheduledPipelineInput;
};


export type MutationTeams_ActivateUserArgs = {
  authToken: Scalars['String'];
  userId: Scalars['GUID'];
};


export type MutationTeams_DeleteMemberArgs = {
  updatedAuthorId?: InputMaybe<Scalars['GUID']>;
  userId: Scalars['GUID'];
};


export type MutationTeams_ReInviteMemberArgs = {
  inviteeId: Scalars['GUID'];
};


export type MutationTrial__InviteUsersArgs = {
  emailIds: Array<Scalars['String']>;
  isInviteV2: Scalars['Boolean'];
  optionalMsg?: InputMaybe<Scalars['String']>;
  sharables?: InputMaybe<SharableListInput>;
};


export type MutationType__ExportRequestArgs = {
  exportRequest?: InputMaybe<ExportRequest>;
};


export type MutationUnAssignTagArgs = {
  ids: Array<Scalars['String']>;
  tagId: Array<Scalars['String']>;
  type: Array<ListType>;
};


export type MutationUnsavedAnswer_GetTmlArgs = {
  exportDependencies?: InputMaybe<Scalars['Boolean']>;
  exportFqn?: InputMaybe<Scalars['Boolean']>;
  exportPermissions?: InputMaybe<Scalars['Boolean']>;
  formatType?: InputMaybe<EDocFormatType>;
  session: BachSessionIdInput;
};


export type MutationUpdateCatalogMetaDataArgs = {
  params: UpdateCatalogMetaDataInput;
};


export type MutationUpdateCatalogScheduleArgs = {
  params: UpdateCatalogScheduleInput;
};


export type MutationUpdate__SqlQueryArgs = {
  session: BachSessionIdSqlAnswerInput;
  sqlQuery: Scalars['String'];
};


export type MutationUpdate_SelectedSourcesArgs = {
  newConnectionId: Scalars['String'];
  session: BachSessionIdSqlAnswerInput;
};


export type MutationUser__UpdateSeenStateArgs = {
  hasSeenAutoAnswerTour?: InputMaybe<Scalars['Boolean']>;
  hasSeenOnboarding?: InputMaybe<Scalars['Boolean']>;
  hasSeenWorksheetTour?: InputMaybe<Scalars['Boolean']>;
};


export type MutationUser__UpdateUserPreferencesArgs = {
  userId: Scalars['String'];
  userPreferences: Scalars['String'];
};


export type MutationVerifyConnectionArgs = {
  params: VerifyAuthConnectionInput;
};


export type MutationVersionControl__CreateConfigArgs = {
  inputData: CreateConfigInput;
};


export type MutationVersionControl__ResetConfigArgs = {
  clusterLevel?: InputMaybe<Scalars['Boolean']>;
};


export type MutationVersionControl__UpdateConfigArgs = {
  inputData?: InputMaybe<UpdateConfigInput>;
};


export type MutationWebhooks_AddWebhookArgs = {
  webhook: WebhookConfigInput;
};


export type MutationWebhooks_DeleteWebhookArgs = {
  webhookId: Scalars['String'];
};


export type MutationWebhooks_UpdateWebhookArgs = {
  webhook: WebhookConfigInput;
  webhookId: Scalars['String'];
};


export type MutationWorksheet__QueryBuilderSearchArgs = {
  answerSessionId: BachSessionIdInput;
  currentTemplateEntryIdx: Scalars['Int'];
  currentTemplateIdx: Scalars['Int'];
  lessonId: Scalars['Int'];
  maxCompletions?: InputMaybe<Scalars['Int']>;
  queryBuilderTokens: Array<RecognizedTokenInput>;
  worksheetSessionId: BachSessionIdInput;
};


export type MutationWorksheet__AutoSaveArgs = {
  dataSourceId?: InputMaybe<Scalars['String']>;
  formatType?: InputMaybe<EDocFormatType>;
  generationType?: InputMaybe<EDocGenerationType>;
  importPolicy?: InputMaybe<ImportEPackPolicy>;
  objects: Array<ImportEPackObjectInfo>;
  updateSetupState?: InputMaybe<Scalars['Boolean']>;
};


export type MutationWorksheet__ClearLessonArgs = {
  id?: InputMaybe<Scalars['GUID']>;
  lessonId: Scalars['Int'];
  session: BachSessionIdInput;
};


export type MutationWorksheet__RefreshTokenStoreArgs = {
  answerSessionId: BachSessionIdInput;
  lessonId: Scalars['Int'];
  worksheetSessionId: BachSessionIdInput;
};


export type MutationWorksheet_LessonSaveArgs = {
  answerSessionId: BachSessionIdInput;
  id: Scalars['GUID'];
  lessonPlan: LessonPlanInput;
  session: BachSessionIdInput;
};


export type MutationWorksheet_LoadArgs = {
  worksheetId: Scalars['GUID'];
};


export type MutationCleanConnectionResourcesArgs = {
  config: Scalars['JSON'];
  type: ConnectionConfigType;
};


export type MutationConfigureDataUploadArgs = {
  payload: ConfigureDataUploadInputType;
};


export type MutationCreateConnectionArgs = {
  createEmpty?: InputMaybe<Scalars['Boolean']>;
  desc?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<CreateConnectionMetadata>;
  name?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MutationCreateCustomCalendarArgs = {
  params: CustomCalendarParams;
};


export type MutationCreateRTemplateArgs = {
  rTemplate: RTemplateCreateDetails;
};


export type MutationCreateStyleCustomizationPerOrgArgs = {
  color?: InputMaybe<Scalars['JSON']>;
  description?: InputMaybe<Scalars['String']>;
  font?: InputMaybe<Scalars['JSON']>;
  logo?: InputMaybe<Scalars['JSON']>;
  name?: InputMaybe<Scalars['String']>;
  org_identifier?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['JSON']>;
};


export type MutationDeleteConnectionsArgs = {
  ids?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationDeleteCustomCalendarArgs = {
  datasourceId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteRTemplateArgs = {
  id: Scalars['GUID'];
};


export type MutationDeleteStyleCustomizationPerOrgArgs = {
  custom_style_identifier?: InputMaybe<Scalars['String']>;
};


export type MutationGetAnswerFromTokensArgs = {
  curentlyEditedToken: Scalars['Int'];
  session: BachSessionIdInput;
  tokens: Array<RecognizedTokenInput>;
};


export type MutationGetConnectionRelationArgs = {
  id: Scalars['GUID'];
};


export type MutationGetTokenMutationArgs = {
  request?: InputMaybe<Input_Eureka_Agent_TokensRequest>;
};


export type MutationImportCustomCalendarArgs = {
  datasourceId: Scalars['String'];
  externalTable: Scalars['String'];
  name: Scalars['String'];
  shouldCreate: Scalars['Boolean'];
};


export type MutationInvalidateOauthTokensArgs = {
  connectionGuid: Scalars['GUID'];
};


export type MutationMutationCompleteArgs = {
  request?: InputMaybe<Input_Eureka_CompleteRequest>;
};


export type MutationMutationGetNlQueryFeedbackArgs = {
  request?: InputMaybe<Input_Eureka_GetNlQueryFeedbackRequest>;
};


export type MutationMutationGetQuestionFragmentsArgs = {
  request?: InputMaybe<Input_Eureka_GetQuestionFragmentsRequest>;
};


export type MutationMutationPutNlQueryFeedbackArgs = {
  request?: InputMaybe<Input_Eureka_PutNlQueryFeedbackRequest>;
};


export type MutationMutationRelevanceFeedbackArgs = {
  request?: InputMaybe<Input_Eureka_RelevanceFeedbackRequest>;
};


export type MutationMutationRequestArgs = {
  request?: InputMaybe<Input_Eureka_SearchRequest>;
};


export type MutationMutationTenantProbeArgs = {
  request?: InputMaybe<Input_Eureka_RelevanceFeedbackRequest>;
};


export type MutationOverwriteRTemplateArgs = {
  rTemplate: RTemplateOverwriteDetails;
};


export type MutationRequestVerificationArgs = {
  params?: InputMaybe<RequestVerificationInput>;
};


export type MutationResolveTokenMutationArgs = {
  request?: InputMaybe<Input_Eureka_Agent_ResolveTokenRequest>;
};


export type MutationRestapiV2__AddGroupsToGroupArgs = {
  groups: Array<InputMaybe<GroupNameAndIdInput>>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__AddPrivilegesToGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  privileges?: InputMaybe<Array<InputMaybe<Privilages>>>;
};


export type MutationRestapiV2__AddTableToConnectionArgs = {
  id: Scalars['String'];
  table: Array<InputMaybe<AddTableInput>>;
};


export type MutationRestapiV2__AddUserToGroupsArgs = {
  groups: Array<InputMaybe<GroupNameAndIdInput>>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__AddUserToOrgsArgs = {
  orgId?: InputMaybe<Scalars['Int']>;
  users: Array<InputMaybe<UserNameAndIdInput>>;
};


export type MutationRestapiV2__AddUsersToGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  users: Array<InputMaybe<UserNameAndIdInput>>;
};


export type MutationRestapiV2__AnswerReportArgs = {
  id: Scalars['String'];
  type: ReportFormat;
};


export type MutationRestapiV2__AssignAuthorToObjectsArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  tsObjectId: Array<InputMaybe<Scalars['String']>>;
};


export type MutationRestapiV2__AssignFavoriteArgs = {
  tsObject: Array<InputMaybe<TsObjectInput>>;
  userId?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__AssignHomeLiveboardArgs = {
  liveboardId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__AssignTagArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  tsObject: Array<InputMaybe<TsObjectInput>>;
};


export type MutationRestapiV2__ChangeAuthorOfObjectsArgs = {
  fromUser: FromUserNameAndIdInput;
  toUser: ToUserNameAndIdInput;
  tsObjectId: Array<InputMaybe<Scalars['String']>>;
};


export type MutationRestapiV2__ChangePasswordOfUserArgs = {
  currentPassword: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  newPassword: Scalars['String'];
};


export type MutationRestapiV2__CreateConnectionArgs = {
  configuration: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  type: DataConnection;
};


export type MutationRestapiV2__CreateCustomActionArgs = {
  configuration: Scalars['String'];
};


export type MutationRestapiV2__CreateGroupArgs = {
  description?: InputMaybe<Scalars['String']>;
  displayName: Scalars['String'];
  groups?: InputMaybe<Array<InputMaybe<GroupNameAndIdInput>>>;
  name: Scalars['String'];
  orgId?: InputMaybe<Scalars['Int']>;
  privileges?: InputMaybe<Array<InputMaybe<Privilages>>>;
  type?: InputMaybe<PrincipalGroupType>;
  users?: InputMaybe<Array<InputMaybe<UserNameAndIdInput>>>;
  visibility?: InputMaybe<PrincipalVisibilityType>;
};


export type MutationRestapiV2__CreateOrgArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationRestapiV2__CreateTableArgs = {
  createDatabase?: InputMaybe<Scalars['Boolean']>;
  schema?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__CreateTagArgs = {
  color?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationRestapiV2__CreateUserArgs = {
  analystOnboardingComplete?: InputMaybe<Scalars['Boolean']>;
  displayName: Scalars['String'];
  groups?: InputMaybe<Array<InputMaybe<GroupNameAndIdInput>>>;
  mail?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  notifyOnShare?: InputMaybe<Scalars['Boolean']>;
  orgIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  password: Scalars['String'];
  showWalkMe?: InputMaybe<Scalars['Boolean']>;
  state?: InputMaybe<StateType>;
  type?: InputMaybe<PrincipalType>;
  visibility?: InputMaybe<PrincipalVisibilityType>;
};


export type MutationRestapiV2__DeleteConnectionArgs = {
  id: Array<InputMaybe<Scalars['String']>>;
};


export type MutationRestapiV2__DeleteCustomActionArgs = {
  id: Scalars['String'];
};


export type MutationRestapiV2__DeleteCustomActionAssociationArgs = {
  association: Scalars['String'];
  id: Scalars['String'];
};


export type MutationRestapiV2__DeleteGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__DeleteObjectArgs = {
  id: Array<InputMaybe<Scalars['String']>>;
  type: TsObjectDetailGet;
};


export type MutationRestapiV2__DeleteOrgArgs = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__DeleteTagArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__DeleteUserArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orgId?: InputMaybe<Scalars['Int']>;
};


export type MutationRestapiV2__ExportObjectTmlArgs = {
  exportAssociated?: InputMaybe<Scalars['Boolean']>;
  formatType?: InputMaybe<FormatType>;
  id: Array<InputMaybe<Scalars['String']>>;
};


export type MutationRestapiV2__ForceLogoutUsersArgs = {
  user?: InputMaybe<Array<InputMaybe<NameAndIdInput>>>;
};


export type MutationRestapiV2__GetConnectionTableColumnsArgs = {
  configuration?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  table: Array<InputMaybe<ConnectionTableColumnsInput>>;
};


export type MutationRestapiV2__GetConnectionTablesArgs = {
  configuration?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  includeColumn?: InputMaybe<Scalars['Boolean']>;
};


export type MutationRestapiV2__GetObjectDependencyArgs = {
  batchSize?: InputMaybe<Scalars['Int']>;
  id: Array<InputMaybe<Scalars['String']>>;
  type: ObjectDependency;
};


export type MutationRestapiV2__GetTokenArgs = {
  accessLevel?: InputMaybe<AccessLevelEnum>;
  orgId?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  secretKey?: InputMaybe<Scalars['String']>;
  tokenExpiryDuration?: InputMaybe<Scalars['String']>;
  tsObjectId?: InputMaybe<Scalars['String']>;
  userName: Scalars['String'];
};


export type MutationRestapiV2__ImportObjectTmlArgs = {
  forceCreate?: InputMaybe<Scalars['Boolean']>;
  importPolicy?: InputMaybe<ImportPolicy>;
  objectTML: Array<InputMaybe<Scalars['String']>>;
};


export type MutationRestapiV2__LiveboardReportArgs = {
  id?: InputMaybe<Scalars['String']>;
  pdfOptions?: InputMaybe<PdfOptionsInput>;
  runtimeFilter?: InputMaybe<Scalars['String']>;
  runtimeSort?: InputMaybe<Scalars['String']>;
  transientContent?: InputMaybe<Scalars['String']>;
  type: ReportFormat;
  vizId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationRestapiV2__LoginArgs = {
  password?: InputMaybe<Scalars['String']>;
  rememberMe?: InputMaybe<Scalars['Boolean']>;
  userName?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__RefreshMaterializedViewArgs = {
  id: Scalars['String'];
};


export type MutationRestapiV2__RemoveGroupsFromGroupArgs = {
  groups: Array<InputMaybe<GroupNameAndIdInput>>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__RemovePrivilegesFromGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  privileges?: InputMaybe<Array<InputMaybe<Privilages>>>;
};


export type MutationRestapiV2__RemoveTableFromConnectionArgs = {
  id: Scalars['String'];
  table: Array<InputMaybe<TableInput>>;
};


export type MutationRestapiV2__RemoveUserFromGroupsArgs = {
  groups: Array<InputMaybe<GroupNameAndIdInput>>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__RemoveUsersFromGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  users: Array<InputMaybe<UserNameAndIdInput>>;
};


export type MutationRestapiV2__ResetUserPasswordArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  newPassword: Scalars['String'];
};


export type MutationRestapiV2__RunQueryArgs = {
  statement: Array<InputMaybe<Scalars['String']>>;
};


export type MutationRestapiV2__SearchConnectionArgs = {
  batchNumber?: InputMaybe<Scalars['Int']>;
  batchSize?: InputMaybe<Scalars['Int']>;
  fetchId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  namePattern?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  skipId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  tag?: InputMaybe<Array<InputMaybe<TagNameAndIdInput>>>;
  type: DataConnection;
};


export type MutationRestapiV2__SearchGroupsArgs = {
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<InputMaybe<GroupNameAndIdInput>>>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  outputFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  privileges?: InputMaybe<Array<InputMaybe<Privilages>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserNameAndIdInput>>>;
  visibility?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__SearchOrgsArgs = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  showDeleted?: InputMaybe<Scalars['Boolean']>;
};


export type MutationRestapiV2__SearchPermissionForPrincipalsArgs = {
  principal: Array<InputMaybe<UserNameAndIdInput>>;
  tsObject?: InputMaybe<Array<InputMaybe<TsObjectSearchInput>>>;
};


export type MutationRestapiV2__SearchPermissionOnObjectsArgs = {
  includeDependent?: InputMaybe<Scalars['Boolean']>;
  principal?: InputMaybe<Array<InputMaybe<UserNameAndIdInput>>>;
  tsObject: Array<InputMaybe<TsObjectSearchInput>>;
};


export type MutationRestapiV2__SearchUsersArgs = {
  analystOnboardingComplete?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<InputMaybe<GroupNameAndIdInput>>>;
  id?: InputMaybe<Scalars['String']>;
  mail?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notifyOnShare?: InputMaybe<Scalars['Boolean']>;
  outputFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  privileges?: InputMaybe<Array<InputMaybe<Privilages>>>;
  showWalkMe?: InputMaybe<Scalars['Boolean']>;
  state?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__ShareObjectArgs = {
  emailId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id: Array<InputMaybe<Scalars['String']>>;
  includeCustomEmbedUrl?: InputMaybe<Scalars['Boolean']>;
  message?: InputMaybe<Scalars['String']>;
  notify?: InputMaybe<Scalars['Boolean']>;
  permission: Scalars['String'];
  type: SecurityType;
};


export type MutationRestapiV2__ShareVisualizationArgs = {
  emailId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id: Scalars['String'];
  includeCustomEmbedUrl?: InputMaybe<Scalars['Boolean']>;
  message?: InputMaybe<Scalars['String']>;
  notify?: InputMaybe<Scalars['Boolean']>;
  principalId: Array<InputMaybe<Scalars['String']>>;
  vizId: Scalars['String'];
};


export type MutationRestapiV2__SyncPrincipalArgs = {
  deleteRemoved?: InputMaybe<Scalars['Boolean']>;
  newUserPassword?: InputMaybe<Scalars['String']>;
  principalObject: Array<InputMaybe<Scalars['JSON']>>;
  updateModified?: InputMaybe<Scalars['Boolean']>;
};


export type MutationRestapiV2__UnassignFavoriteArgs = {
  tsObject: Array<InputMaybe<TsObjectInput>>;
  userId?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__UnassignHomeLiveboardArgs = {
  userId?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__UnassignTagArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  tsObject: Array<InputMaybe<TsObjectInput>>;
};


export type MutationRestapiV2__UpdateClusterConfigArgs = {
  configuration?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__UpdateConnectionArgs = {
  configuration: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__UpdateCustomActionArgs = {
  configuration: Scalars['String'];
  id: Scalars['String'];
};


export type MutationRestapiV2__UpdateCustomActionAssociationArgs = {
  association: Scalars['String'];
  id: Scalars['String'];
};


export type MutationRestapiV2__UpdateGroupArgs = {
  assignedLiveboards?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<InputMaybe<GroupNameAndIdInput>>>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  privileges?: InputMaybe<Array<InputMaybe<Privilages>>>;
  type?: InputMaybe<PrincipalGroupType>;
  users?: InputMaybe<Array<InputMaybe<UserNameAndIdInput>>>;
  visibility?: InputMaybe<PrincipalVisibilityType>;
};


export type MutationRestapiV2__UpdateOrgArgs = {
  active?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__UpdateTagArgs = {
  color?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationRestapiV2__UpdateUserArgs = {
  analystOnboardingComplete?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<InputMaybe<GroupNameAndIdInput>>>;
  id?: InputMaybe<Scalars['String']>;
  mail?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notifyOnShare?: InputMaybe<Scalars['Boolean']>;
  showWalkMe?: InputMaybe<Scalars['Boolean']>;
  state?: InputMaybe<StateType>;
  type?: InputMaybe<PrincipalType>;
  visibility?: InputMaybe<PrincipalVisibilityType>;
};


export type MutationUpdateCatalogDataSourceArgs = {
  params: UpdateCatalogDataSourcesInput;
};


export type MutationUpdateConnectionArgs = {
  createEmpty?: InputMaybe<Scalars['Boolean']>;
  desc?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<CreateConnectionMetadata>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateHeaderArgs = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateStyleCustomizationPerOrgArgs = {
  color?: InputMaybe<Scalars['JSON']>;
  custom_style_identifier: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  font?: InputMaybe<Scalars['JSON']>;
  logo?: InputMaybe<Scalars['JSON']>;
  name?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['JSON']>;
};


export type MutationVerifyLiveboardArgs = {
  params?: InputMaybe<VerifyLiveboardInput>;
};

export type MutationActionAssociationResponse = {
  __typename?: 'MutationActionAssociationResponse';
  Data?: Maybe<Scalars['JSON']>;
  Error?: Maybe<Scalars['String']>;
};

export type NameAndIdInput = {
  /** GUID of the user */
  id?: InputMaybe<Scalars['String']>;
  /** Name of the user */
  name?: InputMaybe<Scalars['String']>;
};

export enum NasStatus {
  Configured = 'CONFIGURED',
  Empty = 'EMPTY',
  NotConfigured = 'NOT_CONFIGURED'
}

export enum NegativeValueFormat {
  BracesNodash = 'BRACES_NODASH',
  PrefixDash = 'PREFIX_DASH',
  SuffixDash = 'SUFFIX_DASH'
}

/** NoteTile type and input */
export type NoteTile = {
  __typename?: 'NoteTile';
  containerId: Scalars['GUID'];
};

/**  Generated from tsProto.a3.metric_monitor.NotificationChannel  */
export enum NotificationChannel {
  Email = 'EMAIL',
  Webhook = 'WEBHOOK'
}

export type NumberFormatConfig = {
  __typename?: 'NumberFormatConfig';
  /** default to 2 */
  decimals?: Maybe<Scalars['Float']>;
  /** default to PREFIX_DASH */
  negativeValueFormat?: Maybe<NegativeValueFormat>;
  /** default to false */
  removeTrailingZeroes?: Maybe<Scalars['Boolean']>;
  /** default to true */
  toSeparateThousands?: Maybe<Scalars['Boolean']>;
  /** default is Auto */
  unit?: Maybe<Unit>;
};

export enum ObjectDependency {
  Column = 'COLUMN',
  Dataobject = 'DATAOBJECT',
  Join = 'JOIN',
  Liveboard = 'LIVEBOARD'
}

export type ObjectMetadataDetailPayload = {
  id: Scalars['String'];
  type: Scalars['String'];
};

export type ObjectMetadataDetailResponse = {
  __typename?: 'ObjectMetadataDetailResponse';
  columns: Array<MetadataDetailColumn>;
};

export type ObjectPermission = {
  __typename?: 'ObjectPermission';
  dataSourceAccessLevel?: Maybe<AccessMode>;
  dataSourceNamesWithNoAccess: Array<Maybe<Scalars['String']>>;
  hasLenientDiscoverability?: Maybe<Scalars['Boolean']>;
  objectAccessLevel?: Maybe<AccessMode>;
};

/** Effective Permission response with metadata */
export type ObjectPermissionWithMetadata = {
  __typename?: 'ObjectPermissionWithMetadata';
  entityMetadata?: Maybe<Metadata>;
  id: Scalars['String'];
  objectPermission: AccessMode;
};

export enum ObjectType {
  Answer = 'ANSWER',
  Pinboard = 'PINBOARD'
}

export type OperatorAndValues = {
  __typename?: 'OperatorAndValues';
  operator?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<FilterValue>>>;
};

export enum Operators {
  Contains = 'CONTAINS',
  DoesNotContain = 'DOES_NOT_CONTAIN',
  EndsWith = 'ENDS_WITH',
  EqualTo = 'EQUAL_TO',
  GreaterThan = 'GREATER_THAN',
  GreaterThanEqualTo = 'GREATER_THAN_EQUAL_TO',
  Is = 'IS',
  IsBetween = 'IS_BETWEEN',
  IsEmpty = 'IS_EMPTY',
  IsNot = 'IS_NOT',
  IsNotEmpty = 'IS_NOT_EMPTY',
  LessThan = 'LESS_THAN',
  LessThanEqualTo = 'LESS_THAN_EQUAL_TO',
  NotEqualTo = 'NOT_EQUAL_TO',
  StartsWith = 'STARTS_WITH'
}

export type Option = {
  optionKey: Scalars['String'];
  optionValue: Scalars['String'];
};

export type Org = {
  __typename?: 'Org';
  /** The ID of the object. */
  id: Scalars['Int'];
  /** Name of the object. */
  name: Scalars['String'];
};

export type OrgCanDeleteResponse = {
  __typename?: 'OrgCanDeleteResponse';
  /** org can be deleted */
  allowDelete: Scalars['Boolean'];
  /** reason of the org deletion failure */
  reason?: Maybe<Scalars['String']>;
};

export type OrgInfo = {
  __typename?: 'OrgInfo';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type OrgMetadata = {
  __typename?: 'OrgMetadata';
  /** allUserGroupId for org */
  allUserGroupId?: Maybe<Scalars['GUID']>;
  /** defaultAdminUserGroupId for org */
  defaultAdminUserGroupId?: Maybe<Scalars['GUID']>;
  /** description for org */
  description?: Maybe<Scalars['String']>;
  /** flag to validate if the org is active */
  isActive?: Maybe<Scalars['Boolean']>;
  /** id of the org */
  orgId: Scalars['String'];
  /** name for org */
  orgName: Scalars['String'];
  /** privileges for org */
  privileges?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type OrgResponse = {
  __typename?: 'OrgResponse';
  /** is org present ? */
  active?: Maybe<Scalars['Boolean']>;
  /** displayName of the user */
  allGroupUserId: Scalars['GUID'];
  /** id of the user */
  author?: Maybe<Scalars['String']>;
  /** Org's created timestamp */
  created?: Maybe<Scalars['Float']>;
  /** email of the user */
  defaultAdminUserGroupId: Scalars['GUID'];
  /** is org present ? */
  deleted?: Maybe<Scalars['Boolean']>;
  /** subscription type FREE_TRIAL TEAMS EDITION or null */
  description: Scalars['String'];
  /** Org's modified timestamp */
  modified?: Maybe<Scalars['Float']>;
  /** id of the org */
  orgId: Scalars['String'];
  /** name for org */
  orgName: Scalars['String'];
};

export type OrgType = {
  __typename?: 'OrgType';
  /** Id of the organization */
  id?: Maybe<Scalars['Int']>;
  /** Name of the organization */
  name?: Maybe<Scalars['String']>;
};

export type Org__CanDeleteResponse = {
  __typename?: 'Org__CanDeleteResponse';
  Data?: Maybe<OrgCanDeleteResponse>;
  Error?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['String']>;
};

export type Org__DataInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Org__DataResponse = {
  __typename?: 'Org__DataResponse';
  Data?: Maybe<OrgResponse>;
  Error?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['String']>;
};

export type Org__ListInput = {
  batchsize?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  pattern?: InputMaybe<Scalars['String']>;
  showinactive?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['String']>;
  sortascending?: InputMaybe<Scalars['Boolean']>;
};

export type Org__ListResponse = {
  __typename?: 'Org__ListResponse';
  Data?: Maybe<AllOrgListResponse>;
  Error?: Maybe<Scalars['String']>;
};

export type Org__UpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orgid: Scalars['String'];
};

export type OrgsResponse = {
  __typename?: 'OrgsResponse';
  /** Indicates if the organization is active or not */
  active?: Maybe<Scalars['Boolean']>;
  /** GUID of the ALL group in the organization */
  allGroupUserId?: Maybe<Scalars['String']>;
  /** GUID of the admin group in the organization */
  defaultAdminUserGroupId?: Maybe<Scalars['String']>;
  /** Description associated with the organization */
  description?: Maybe<Scalars['String']>;
  /** ID of the organization searched for */
  orgId?: Maybe<Scalars['Int']>;
  /** Name of the organization searched for */
  orgName?: Maybe<Scalars['String']>;
};

export enum Orientation {
  Landscape = 'LANDSCAPE',
  Portrait = 'PORTRAIT'
}

export type OriginalAnalysisConfig = {
  __typename?: 'OriginalAnalysisConfig';
  analysisType: A3AnalysisTypeEnum;
  generalSettings: GeneralSettings;
  isChangeAnalysis: Scalars['Boolean'];
  maxInsightsOpts?: Maybe<MaxInsightsOpts>;
  parameterValues: CustomAnalysisParameters;
  selectedAlgorithmTypes: Array<Maybe<AnalysisAlgorithmTypeEnum>>;
  selectedAnalysisClasses: Array<Maybe<AnalysisClassEnum>>;
  selectedTokensGuids: Array<Maybe<Scalars['GUID']>>;
};

export type OutlierDetection = {
  algorithm?: InputMaybe<AnalysisAlgorithm>;
};

export type OutputColumnRepresentation = {
  __typename?: 'OutputColumnRepresentation';
  aggregation?: Maybe<AggregateFunctionTypeEnum>;
  column?: Maybe<ColumnRepresentation>;
  effectiveDataType?: Maybe<ColumnDataTypeEnum>;
  formatPattern?: Maybe<Scalars['String']>;
  isGrowth?: Maybe<Scalars['Boolean']>;
};

export enum OutputType {
  Csv = 'CSV',
  Pdf = 'PDF',
  Png = 'PNG',
  Xls = 'XLS'
}

export type PaColumnSortInfo = {
  __typename?: 'PAColumnSortInfo';
  key?: Maybe<Scalars['String']>;
  sortDescending?: Maybe<Scalars['Boolean']>;
};

export type PageFooterParams = {
  includeLogo?: InputMaybe<Scalars['Boolean']>;
  includePageNumber?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
};

export type PageFooterResponse = {
  __typename?: 'PageFooterResponse';
  includeLogo?: Maybe<Scalars['Boolean']>;
  includePageNumber?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
};

export enum PageSize {
  A4 = 'A4'
}

export type Parameter = {
  __typename?: 'Parameter';
  dataType: FalconDataType;
  defaultValue: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['GUID'];
  name: Scalars['String'];
  /** If not present, the parameter has not been overridden */
  overrideValue?: Maybe<Scalars['String']>;
  owner: ParameterOwnerInfo;
  valueList?: Maybe<Array<ParameterValueListItem>>;
  valueRange?: Maybe<ParameterValueRange>;
  valueType: ParameterValueType;
};

export type ParameterDependenciesRequest = {
  parameterId: Scalars['GUID'];
};

export type ParameterInput = {
  dataType: FalconDataType;
  defaultValue: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  valueList?: InputMaybe<Array<ParameterValueListItemInput>>;
  valueRange?: InputMaybe<ParameterValueRangeInput>;
  valueType: ParameterValueType;
};

export type ParameterOwnerInfo = {
  __typename?: 'ParameterOwnerInfo';
  id: Scalars['GUID'];
  name: Scalars['String'];
  type: ParameterOwnerType;
};

export enum ParameterOwnerType {
  Answer = 'ANSWER',
  Worksheet = 'WORKSHEET'
}

export type ParameterValueListItem = {
  __typename?: 'ParameterValueListItem';
  displayAs?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type ParameterValueListItemInput = {
  displayAs?: InputMaybe<Scalars['String']>;
  value: Scalars['String'];
};

export type ParameterValueRange = {
  __typename?: 'ParameterValueRange';
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
};

export type ParameterValueRangeInput = {
  max?: InputMaybe<Scalars['Float']>;
  min?: InputMaybe<Scalars['Float']>;
};

export enum ParameterValueType {
  Any = 'ANY',
  List = 'LIST',
  Range = 'RANGE'
}

export type Params = {
  configOperation: Scalars['String'];
  configOptions: Array<InputMaybe<Option>>;
};

export enum Partner {
  Redshift = 'REDSHIFT'
}

/** Return type for getPartnerConnectConfig api call */
export type PartnerConnectConfig = {
  __typename?: 'PartnerConnectConfig';
  /** Is connection successful */
  connSuccessful?: Maybe<Scalars['Boolean']>;
  /** Connection GUID created at the time of signup */
  lastCreatedConnId?: Maybe<Scalars['GUID']>;
  /** Partner type Ex - redshift */
  partner?: Maybe<Partner>;
};

export type PathAnalysisConfig = {
  __typename?: 'PathAnalysisConfig';
  contains?: Maybe<Array<Scalars['String']>>;
  endsWith?: Maybe<Scalars['String']>;
  groupKeys: Array<Scalars['String']>;
  maxDuration?: Maybe<Scalars['Int']>;
  maxPathLength?: Maybe<Scalars['Int']>;
  maxRank?: Maybe<Scalars['Int']>;
  minPathLength?: Maybe<Scalars['Int']>;
  mrType?: Maybe<Scalars['String']>;
  partitionKeys: Array<Scalars['String']>;
  pathExpression?: Maybe<Scalars['String']>;
  pathKey?: Maybe<Scalars['String']>;
  sortKeys: Array<PaColumnSortInfo>;
  startsWith?: Maybe<Scalars['String']>;
  timeKey?: Maybe<Scalars['String']>;
  toExcludeNodes?: Maybe<Array<PathNodeInfo>>;
  toIncludeNodes?: Maybe<Array<PathNodeInfo>>;
};

export type PathAnalysisConfigInput = {
  contains?: InputMaybe<Array<Scalars['String']>>;
  endsWith?: InputMaybe<Scalars['String']>;
  groupKeys: Array<Scalars['String']>;
  maxDuration?: InputMaybe<Scalars['Int']>;
  maxPathLength?: InputMaybe<Scalars['Int']>;
  maxRank?: InputMaybe<Scalars['Int']>;
  minPathLength?: InputMaybe<Scalars['Int']>;
  mrType?: InputMaybe<Scalars['String']>;
  partitionKeys: Array<Scalars['String']>;
  pathExpression?: InputMaybe<Scalars['String']>;
  pathKey?: InputMaybe<Scalars['String']>;
  sortKeys: Array<ColumnSortInfoInput>;
  startsWith?: InputMaybe<Scalars['String']>;
  timeKey?: InputMaybe<Scalars['String']>;
  toExcludeNodes?: InputMaybe<Array<PathNodeInfoInput>>;
  toIncludeNodes?: InputMaybe<Array<PathNodeInfoInput>>;
};

export type PathNodeInfo = {
  __typename?: 'PathNodeInfo';
  data?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  rank?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
};

export type PathNodeInfoInput = {
  data?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['Int']>;
  rank?: InputMaybe<Scalars['Int']>;
  weight?: InputMaybe<Scalars['Int']>;
};

export type PbContextBook = {
  __typename?: 'PbContextBook';
  answer_info?: Maybe<AnswerInfo>;
  viz_id?: Maybe<Scalars['GUID']>;
};

export type PdfParams = {
  orientation?: InputMaybe<Orientation>;
  pageSize?: InputMaybe<PageSize>;
};

export type PdfParamsResponse = {
  __typename?: 'PdfParamsResponse';
  orientation?: Maybe<Orientation>;
  pageSize?: Maybe<PageSize>;
};

export type PercentageFormatConfig = {
  __typename?: 'PercentageFormatConfig';
  /** default to 2 */
  decimals?: Maybe<Scalars['Float']>;
  /** default to false */
  removeTrailingZeroes?: Maybe<Scalars['Boolean']>;
};

export type PeriodicSchedule = {
  __typename?: 'PeriodicSchedule';
  cronSchedule?: Maybe<CronSchedule>;
  endTime?: Maybe<Scalars['Long']>;
  startTime?: Maybe<Scalars['Long']>;
  type?: Maybe<PeriodicScheduleType>;
};

export enum PeriodicScheduleType {
  Cron = 'CRON',
  Default = 'DEFAULT'
}

export enum Periodicity {
  Default = 'DEFAULT',
  OneTime = 'ONE_TIME',
  Periodic = 'PERIODIC'
}

/** A permssion for a user */
export type Permission = {
  __typename?: 'Permission';
  /** Flag for editable query */
  answerBookQueryEditable?: Maybe<Scalars['Boolean']>;
  /** Specifies dependents */
  dependents?: Maybe<Array<Maybe<Dependent>>>;
  /** Specifies the share mode */
  shareMode: AccessMode;
  /** ID of the user */
  topLevelObjectId: Scalars['String'];
};

/**  Generated from tsProto.a3.metric_monitor.GetPermissionForUserResponse.PermissionLevel  */
export enum PermissionLevel {
  PermissionLevelCannotSubscribe = 'PERMISSION_LEVEL_CANNOT_SUBSCRIBE',
  PermissionLevelCanSubscribe = 'PERMISSION_LEVEL_CAN_SUBSCRIBE',
  PermissionLevelPermissionsNeeded = 'PERMISSION_LEVEL_PERMISSIONS_NEEDED',
  PermissionLevelUnspecified = 'PERMISSION_LEVEL_UNSPECIFIED'
}

/** Object Permissions with Ids */
export type PermissionMap = {
  __typename?: 'PermissionMap';
  /** Id of the Object */
  id: Scalars['GUID'];
  /** Object Permission on object */
  objectPermission?: Maybe<ObjectPermission>;
};

export type PermissionsTypeSearch = {
  __typename?: 'PermissionsTypeSearch';
  /** An array of objects of type mentioned in type field */
  tsObject?: Maybe<Array<Maybe<TsObjectTypeSerach>>>;
  /** Indicates the type of the object */
  type?: Maybe<Scalars['String']>;
};

/**  Generated from tsProto.sage.PhraseType.E  */
export enum PhraseType {
  AggregatedAttributeValuePhrase = 'AGGREGATED_ATTRIBUTE_VALUE_PHRASE',
  AggregatedColumnPhrase = 'AGGREGATED_COLUMN_PHRASE',
  Begin = 'BEGIN',
  CalendarPhrase = 'CALENDAR_PHRASE',
  DelimiterPhrase = 'DELIMITER_PHRASE',
  End = 'END',
  FilteredCountPhrase = 'FILTERED_COUNT_PHRASE',
  FilterPhrase = 'FILTER_PHRASE',
  FormulaPhrase = 'FORMULA_PHRASE',
  ForEachPhrase = 'FOR_EACH_PHRASE',
  GeofilterPhrase = 'GEOFILTER_PHRASE',
  GroupByColumnPhrase = 'GROUP_BY_COLUMN_PHRASE',
  GrowthPhrase = 'GROWTH_PHRASE',
  HavingPhrase = 'HAVING_PHRASE',
  InFilterPhrase = 'IN_FILTER_PHRASE',
  InFilterSubqueryPhrase = 'IN_FILTER_SUBQUERY_PHRASE',
  OfPhrase = 'OF_PHRASE',
  PercentageOfPhrase = 'PERCENTAGE_OF_PHRASE',
  PivotPhrase = 'PIVOT_PHRASE',
  ShowColumnPhrase = 'SHOW_COLUMN_PHRASE',
  SkipTokenPhrase = 'SKIP_TOKEN_PHRASE',
  SortByPhrase = 'SORT_BY_PHRASE',
  StopWordPhrase = 'STOP_WORD_PHRASE',
  TopBottomFilterPhrase = 'TOP_BOTTOM_FILTER_PHRASE',
  TopBottomPhrase = 'TOP_BOTTOM_PHRASE',
  UndefinedPhrase = 'UNDEFINED_PHRASE',
  VersusPhrase = 'VERSUS_PHRASE',
  VersusSubqueryPhrase = 'VERSUS_SUBQUERY_PHRASE'
}

export type PhrasedToken = {
  __typename?: 'PhrasedToken';
  token: Scalars['String'];
  tokenType: Scalars['String'];
};

export type PinNoteTileToPinboardResponse = {
  __typename?: 'PinNoteTileToPinboardResponse';
  /** ID of new note tile created inside the pinboard */
  containerId: Scalars['GUID'];
  /**
   * ID of pinboard to which viz is pinned.
   * This would be the ID of the new pinboard if newPinboardName was set
   */
  pinboardId: Scalars['GUID'];
  /**
   * ID of tabId to which viz is pinned.
   * This would be the ID of the new tabId if newTabName was set
   */
  tabId?: Maybe<Scalars['GUID']>;
};

export type Pinboard = {
  __typename?: 'Pinboard';
  authorDisplayName?: Maybe<Scalars['String']>;
  authorGuid?: Maybe<Scalars['String']>;
  containers?: Maybe<Array<Maybe<Container>>>;
  dateCreated?: Maybe<Scalars['Long']>;
  dateModified?: Maybe<Scalars['Long']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['GUID'];
  /** Parameters available to be used in this liveboard */
  inScopeParameters?: Maybe<Array<Parameter>>;
  isDiscoverable?: Maybe<Scalars['Boolean']>;
  isFavorite?: Maybe<Scalars['Boolean']>;
  layout?: Maybe<Array<Maybe<ContainerLayout>>>;
  modifiedBy?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  orderedTabIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Parameter chips present on this liveboard (override may or may not be applied) */
  parameters?: Maybe<Array<Parameter>>;
  permission?: Maybe<ObjectPermission>;
  pinboardFilter?: Maybe<PinboardFilter>;
  tabs?: Maybe<Array<Maybe<Tab>>>;
};

export type PinboardContainer = {
  __typename?: 'PinboardContainer';
  context_book?: Maybe<PbContextBook>;
  header: EntityHeader;
};

/**  Generated from tsProto.entitylib.ContainerSpecProto.Type  */
export enum PinboardContainerType {
  ClusterViz = 'CLUSTER_VIZ',
  GenericViz = 'GENERIC_VIZ',
  NoteTile = 'NOTE_TILE',
  PinnedAnswer = 'PINNED_ANSWER'
}

/**  Generated from tsProto.bach.pinboard.PinboardContext.E  */
export enum PinboardContextType {
  AdminPinboard = 'ADMIN_PINBOARD',
  DownloadPinboard = 'DOWNLOAD_PINBOARD',
  EmbedPinboard = 'EMBED_PINBOARD',
  HomePinboard = 'HOME_PINBOARD',
  InsightPinboard = 'INSIGHT_PINBOARD',
  LearnPinboard = 'LEARN_PINBOARD',
  SavedPinboard = 'SAVED_PINBOARD'
}

export type PinboardCrossFilterEditSession = {
  __typename?: 'PinboardCrossFilterEditSession';
  /** Impacted book ids for all cross filters */
  crossFilterAppliedContextBookIds?: Maybe<Array<Maybe<Scalars['GUID']>>>;
  pinboardEditSession?: Maybe<PinboardEditSession>;
};

export type PinboardDetails = {
  __typename?: 'PinboardDetails';
  /** pinboard id of recently pinned pinboard */
  pinboardId?: Maybe<Scalars['String']>;
  /** pinboard name of recently pinned pinboard */
  pinboardName?: Maybe<Scalars['String']>;
  /** tab id of recently pinned tab */
  tabId?: Maybe<Scalars['String']>;
  /** tab name of recently pinned tab */
  tabName?: Maybe<Scalars['String']>;
};

export type PinboardEditSession = {
  __typename?: 'PinboardEditSession';
  id: BachPinboardSession;
  /** context book ids that needs to be reloaded as part of a mutation */
  impactedContextBookId?: Maybe<Array<Maybe<Scalars['GUID']>>>;
  pinboard: Pinboard;
};

/** A type that describes the pinboard info */
export type PinboardEntityMetadata = {
  __typename?: 'PinboardEntityMetadata';
  author?: Maybe<Scalars['String']>;
  authorDisplayName?: Maybe<Scalars['String']>;
  authorName?: Maybe<Scalars['String']>;
  clientState?: Maybe<Scalars['JSON']>;
  created?: Maybe<Scalars['Int']>;
  databaseStripe?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  generationNum?: Maybe<Scalars['Int']>;
  hasTabs?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  indexVersion?: Maybe<Scalars['Int']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isExternal?: Maybe<Scalars['Boolean']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  metadataType?: Maybe<Scalars['String']>;
  modified?: Maybe<Scalars['Int']>;
  modifiedBy?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  permission?: Maybe<Permission>;
  schemaStripe?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Tag>>;
  type?: Maybe<Scalars['String']>;
};

export type PinboardFilter = {
  __typename?: 'PinboardFilter';
  crossFilterGroups?: Maybe<Array<Maybe<FilterGroup>>>;
  excludedVizs?: Maybe<Array<Maybe<ExcludedViz>>>;
  filterGroups?: Maybe<Array<Maybe<FilterGroup>>>;
  linkedFilters?: Maybe<Array<Maybe<LinkedFilterColumn>>>;
};

export type PinboardInfo = {
  __typename?: 'PinboardInfo';
  id: Scalars['GUID'];
  name: Scalars['String'];
};

export type PinboardNoteTileContent = {
  __typename?: 'PinboardNoteTileContent';
  htmlParsedString?: Maybe<Scalars['String']>;
};

export type PinboardNoteTileEditSession = {
  __typename?: 'PinboardNoteTileEditSession';
  id: BachPinboardSession;
  noteTile?: Maybe<NoteTile>;
  pinboard: Pinboard;
};

export type PinboardNoteTileUploadImageResponse = {
  __typename?: 'PinboardNoteTileUploadImageResponse';
  base64String?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type PinboardParams = {
  layoutType?: InputMaybe<LayoutType>;
  pinboardGuid?: InputMaybe<Scalars['String']>;
  pinboardVizSelection?: InputMaybe<PinboardVizSelection>;
  printDocumentParams?: InputMaybe<PrintDocumentParams>;
  visualizationFormatOptions?: InputMaybe<VisualizationFormatOptions>;
  vizIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PinboardParamsResponse = {
  __typename?: 'PinboardParamsResponse';
  layoutType?: Maybe<LayoutType>;
  pinboardGuid?: Maybe<Scalars['String']>;
  pinboardVizSelection?: Maybe<PinboardVizSelectionResponse>;
  printDocumentParams?: Maybe<PrintDocumentResponse>;
  visualizationFormatOptions?: Maybe<VisualizationFormatOptionsResponse>;
  vizIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/**
 * we have different type for datatype and type
 * therefore not able to reuse Column in metadata.graphql
 */
export type PinboardSourceColumn = {
  __typename?: 'PinboardSourceColumn';
  /** The column's data type */
  dataType?: Maybe<FalconDataType>;
  /** Description for Column */
  description?: Maybe<Scalars['String']>;
  /** The column's id */
  id: Scalars['GUID'];
  /** The column's name */
  name?: Maybe<Scalars['String']>;
  /** The column's type */
  type?: Maybe<AnswerColumnEffectiveType>;
};

export type PinboardSourceDetail = {
  __typename?: 'PinboardSourceDetail';
  /** The data source author's id */
  author?: Maybe<Scalars['String']>;
  /** The data source's display name for author */
  authorDisplayName?: Maybe<Scalars['String']>;
  /** Columns inside  the data source */
  columns?: Maybe<Array<PinboardSourceColumn>>;
  /** The data source's creation time */
  created: Scalars['Float'];
  /** The data source's database name */
  databaseStripe?: Maybe<Scalars['String']>;
  /** The data source's description */
  description?: Maybe<Scalars['String']>;
  /** The data source's id */
  id: Scalars['GUID'];
  /** The data source's modification time */
  modified?: Maybe<Scalars['Float']>;
  /** The data source's name */
  name: Scalars['String'];
  /** The data source's schema */
  schemaStripe?: Maybe<Scalars['String']>;
  /** Type of data source */
  type?: Maybe<LogicalTableTypeEnum>;
};

export type PinboardTab = {
  __typename?: 'PinboardTab';
  container_id?: Maybe<Array<Scalars['String']>>;
  header: TabHeader;
};

export type PinboardTabInfo = {
  __typename?: 'PinboardTabInfo';
  ordered_tab_id?: Maybe<Array<Scalars['String']>>;
  tab?: Maybe<Array<PinboardTab>>;
};

export type PinboardV1AnswerResponse = {
  __typename?: 'PinboardV1AnswerResponse';
  /** answer in answer v2 format */
  answer: Answer;
  /** report book api call response */
  data?: Maybe<Scalars['JSON']>;
  /** transformed viz data */
  vizData?: Maybe<Scalars['JSON']>;
};

export type PinboardVizId = {
  __typename?: 'PinboardVizId';
  pinboardId: Scalars['String'];
  vizId: Scalars['String'];
};

export type PinboardVizIdInput = {
  pinboardId: Scalars['String'];
  vizId: Scalars['String'];
};

export type PinboardVizSelection = {
  completePinboard?: InputMaybe<Scalars['Boolean']>;
  includedTabId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  includedVizId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PinboardVizSelectionResponse = {
  __typename?: 'PinboardVizSelectionResponse';
  completePinboard?: Maybe<Scalars['Boolean']>;
  includedTabId?: Maybe<Array<Maybe<Scalars['String']>>>;
  includedVizId?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Pinboard__CancelPinboardSession = {
  __typename?: 'Pinboard__cancelPinboardSession';
  /** Response from cancel session API */
  data?: Maybe<Scalars['JSON']>;
};

/** Update User pins flow flags */
export type PinsFlowFlagsInput = {
  /** Updates pinsFlowSeen backend flag */
  pinsFlowSeen?: InputMaybe<Scalars['Boolean']>;
  /** Updates pinsSpotlightSeen backend flag */
  pinsSpotlightSeen?: InputMaybe<Scalars['Boolean']>;
};

export type PivotField = {
  __typename?: 'PivotField';
  area?: Maybe<Scalars['String']>;
  dataField?: Maybe<Scalars['String']>;
  expanded?: Maybe<Scalars['Boolean']>;
  sortBy?: Maybe<Scalars['String']>;
  sortBySummaryField?: Maybe<Scalars['String']>;
  sortBySummaryPath?: Maybe<Array<Maybe<Scalars['String']>>>;
  sortOrder?: Maybe<Scalars['String']>;
};

export type PivotPaths = {
  __typename?: 'PivotPaths';
  paths?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PivotState = {
  __typename?: 'PivotState';
  columnExpandedPaths?: Maybe<Array<Maybe<PivotPaths>>>;
  fields?: Maybe<Array<Maybe<PivotField>>>;
  rowExpandedPaths?: Maybe<Array<Maybe<PivotPaths>>>;
};

export type PivotSummariesState = {
  __typename?: 'PivotSummariesState';
  showColumnGrandTotals?: Maybe<Scalars['Boolean']>;
  showColumnTotals?: Maybe<Scalars['Boolean']>;
  showRowGrandTotals?: Maybe<Scalars['Boolean']>;
  showRowTotals?: Maybe<Scalars['Boolean']>;
};

export type PngParams = {
  omitBackground?: InputMaybe<Scalars['Boolean']>;
};

export enum PrincipalGroupType {
  LocalGroup = 'LOCAL_GROUP',
  TenantGroup = 'TENANT_GROUP'
}

export type PrincipalPermissionLevel = {
  __typename?: 'PrincipalPermissionLevel';
  permissionLevel?: Maybe<PermissionLevel>;
  principalId?: Maybe<Scalars['String']>;
};

export type PrincipalSearchResponse = {
  __typename?: 'PrincipalSearchResponse';
  /** GUID of the user or user group */
  id?: Maybe<Scalars['String']>;
  /** Name of the user or user group */
  name?: Maybe<Scalars['String']>;
  /** Indicates the permission which user or user group has on the object */
  permissions?: Maybe<Array<Maybe<PermissionsTypeSearch>>>;
  /** Indicates the type of principal */
  type?: Maybe<Scalars['String']>;
};

export enum PrincipalType {
  LdapUser = 'LDAP_USER',
  LocalUser = 'LOCAL_USER',
  OidcUser = 'OIDC_USER',
  SamlUser = 'SAML_USER',
  Unknown = 'UNKNOWN'
}

export enum PrincipalVisibilityType {
  Default = 'DEFAULT',
  NonSharable = 'NON_SHARABLE',
  Sharable = 'SHARABLE'
}

export type PrintDocumentParams = {
  includeCoverPage?: InputMaybe<Scalars['Boolean']>;
  includeFilterPage?: InputMaybe<Scalars['Boolean']>;
  pageFooterParams?: InputMaybe<PageFooterParams>;
};

export type PrintDocumentResponse = {
  __typename?: 'PrintDocumentResponse';
  includeCoverPage?: Maybe<Scalars['Boolean']>;
  includeFilterPage?: Maybe<Scalars['Boolean']>;
  pageFooterParams?: Maybe<PageFooterResponse>;
};

export type PriorityListItemMetricMutationInput = {
  objectId: Scalars['String'];
  objectType: ListType;
  visualizationId: Scalars['String'];
  visualizationType: Scalars['String'];
};

export type PriorityListItemMutationInput = {
  id: Scalars['String'];
  type: ListType;
};

export type PriorityMetricObject = {
  __typename?: 'PriorityMetricObject';
  authorGuid?: Maybe<Scalars['JSON']>;
  authorName?: Maybe<Scalars['String']>;
  isMandatoryFilterValueSelected?: Maybe<Scalars['Boolean']>;
  manuallyAdded?: Maybe<Scalars['Boolean']>;
  objectDisplayName?: Maybe<Scalars['String']>;
  objectGuid?: Maybe<Scalars['JSON']>;
  objectType?: Maybe<Scalars['String']>;
  pinboardDisplayName?: Maybe<Scalars['String']>;
  visualizationGuid?: Maybe<Scalars['JSON']>;
  visualizationName?: Maybe<Scalars['String']>;
  visualizationType?: Maybe<Scalars['String']>;
};

export enum Privilages {
  A3Analysis = 'A3ANALYSIS',
  Administration = 'ADMINISTRATION',
  ApplicationAdministration = 'APPLICATION_ADMINISTRATION',
  Authoring = 'AUTHORING',
  BackupAdministration = 'BACKUP_ADMINISTRATION',
  Bypassrls = 'BYPASSRLS',
  Datadownloading = 'DATADOWNLOADING',
  Datamanagement = 'DATAMANAGEMENT',
  Developer = 'DEVELOPER',
  DisablePinboardCreation = 'DISABLE_PINBOARD_CREATION',
  Experimentalfeatureprivilege = 'EXPERIMENTALFEATUREPRIVILEGE',
  GroupAdministration = 'GROUP_ADMINISTRATION',
  Jobscheduling = 'JOBSCHEDULING',
  Ranalysis = 'RANALYSIS',
  Sharewithall = 'SHAREWITHALL',
  Systemmanagement = 'SYSTEMMANAGEMENT',
  SystemInfoAdministration = 'SYSTEM_INFO_ADMINISTRATION',
  Userdatauploading = 'USERDATAUPLOADING',
  UserAdministration = 'USER_ADMINISTRATION'
}

export type PrivilegeGroupsData = {
  __typename?: 'PrivilegeGroupsData';
  groupName?: Maybe<Scalars['String']>;
  privileges?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PrivilegeGroupsResponse = {
  __typename?: 'PrivilegeGroupsResponse';
  Data: Array<PrivilegeGroupsData>;
  Error?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['Int']>;
};

export enum Privileges {
  A3Analysis = 'A3ANALYSIS',
  Administration = 'ADMINISTRATION',
  Authoring = 'AUTHORING',
  Bypassrls = 'BYPASSRLS',
  Datadownloading = 'DATADOWNLOADING',
  Datamanagement = 'DATAMANAGEMENT',
  Developer = 'DEVELOPER',
  Experimentalfeatureprivilege = 'EXPERIMENTALFEATUREPRIVILEGE',
  GroupAdministration = 'GROUP_ADMINISTRATION',
  Jobscheduling = 'JOBSCHEDULING',
  Ranalysis = 'RANALYSIS',
  Sharewithall = 'SHAREWITHALL',
  Syncmanagement = 'SYNCMANAGEMENT',
  Userdatauploading = 'USERDATAUPLOADING',
  Usermanagement = 'USERMANAGEMENT',
  UserAdministration = 'USER_ADMINISTRATION'
}

export type ProgressReport = {
  __typename?: 'ProgressReport';
  step: Array<Maybe<Step>>;
};

/** A type that describes an item in metadata object with count */
export type PropertyWithCount = {
  __typename?: 'PropertyWithCount';
  count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type PublisherResponse = {
  __typename?: 'PublisherResponse';
  isLastBatch?: Maybe<Scalars['Boolean']>;
  publishers: Array<SpotAppsPublisher>;
};

export type Put_CertData = {
  kid?: InputMaybe<Scalars['String']>;
  x5c?: InputMaybe<Scalars['String']>;
};

export type QvColumn = {
  __typename?: 'QVColumn';
  dataType?: Maybe<FalconDataType>;
  id?: Maybe<SageEntityHeader>;
  lineage?: Maybe<Array<Maybe<ColumnLineage>>>;
  property?: Maybe<Array<Maybe<ColumnProperty>>>;
  type?: Maybe<SageColumnType>;
};

export type QvFilter = {
  __typename?: 'QVFilter';
  id?: Maybe<SageEntityHeader>;
  inSubquery?: Maybe<QvInClause>;
  lineage?: Maybe<Array<Maybe<ColumnLineage>>>;
  property?: Maybe<Array<Maybe<FilterProperty>>>;
};

export type QvInClause = {
  __typename?: 'QVInClause';
  negateFilter?: Maybe<Scalars['Boolean']>;
  subqueryColumn?: Maybe<SageEntityHeader>;
  subqueryTable?: Maybe<SageEntityHeader>;
};

export type QvSpec = {
  __typename?: 'QVSpec';
  sql: Scalars['String'];
  table?: Maybe<Array<Maybe<QvTable>>>;
  terminalQuery?: Maybe<Array<Maybe<SageEntityHeader>>>;
};

export type QvTable = {
  __typename?: 'QVTable';
  column?: Maybe<Array<Maybe<QvColumn>>>;
  filter?: Maybe<Array<Maybe<QvFilter>>>;
  id?: Maybe<SageEntityHeader>;
  join?: Maybe<Array<Maybe<Join>>>;
  rowLimit?: Maybe<Scalars['Int']>;
  type?: Maybe<TableType>;
};

export enum Quarter {
  NumQuarters = 'NUM_QUARTERS',
  Q1 = 'Q1',
  Q2 = 'Q2',
  Q3 = 'Q3',
  Q4 = 'Q4'
}

export enum QuerableDataSourceType {
  Default = 'DEFAULT',
  FileCsv = 'FILE_CSV',
  Informatica = 'INFORMATICA',
  IpaasInformatica = 'IPAAS_INFORMATICA',
  RdbmsAmazonAthena = 'RDBMS_AMAZON_ATHENA',
  RdbmsAmazonAuroraMysql = 'RDBMS_AMAZON_AURORA_MYSQL',
  RdbmsAmazonAuroraPostgresql = 'RDBMS_AMAZON_AURORA_POSTGRESQL',
  RdbmsAmazonRdsMysql = 'RDBMS_AMAZON_RDS_MYSQL',
  RdbmsAmazonRdsPostgresql = 'RDBMS_AMAZON_RDS_POSTGRESQL',
  RdbmsAzureSqlDatawarehouse = 'RDBMS_AZURE_SQL_DATAWAREHOUSE',
  RdbmsDatabricks = 'RDBMS_DATABRICKS',
  RdbmsDenodo = 'RDBMS_DENODO',
  RdbmsDremio = 'RDBMS_DREMIO',
  RdbmsDrSum = 'RDBMS_DR_SUM',
  RdbmsFalcon = 'RDBMS_FALCON',
  RdbmsGcpBigquery = 'RDBMS_GCP_BIGQUERY',
  RdbmsGenericJdbc = 'RDBMS_GENERIC_JDBC',
  RdbmsLooker = 'RDBMS_LOOKER',
  RdbmsLookerMl = 'RDBMS_LOOKER_ML',
  RdbmsMarketo = 'RDBMS_MARKETO',
  RdbmsMockDatabase = 'RDBMS_MOCK_DATABASE',
  RdbmsMysql = 'RDBMS_MYSQL',
  RdbmsOracle = 'RDBMS_ORACLE',
  RdbmsOracleAdw = 'RDBMS_ORACLE_ADW',
  RdbmsPostgres = 'RDBMS_POSTGRES',
  RdbmsPresto = 'RDBMS_PRESTO',
  RdbmsPrestoJdbc = 'RDBMS_PRESTO_JDBC',
  RdbmsRedshift = 'RDBMS_REDSHIFT',
  RdbmsSalesforce = 'RDBMS_SALESFORCE',
  RdbmsSapHana = 'RDBMS_SAP_HANA',
  RdbmsServiceNow = 'RDBMS_SERVICE_NOW',
  RdbmsSinglestore = 'RDBMS_SINGLESTORE',
  RdbmsSnowflake = 'RDBMS_SNOWFLAKE',
  RdbmsSqlserver = 'RDBMS_SQLSERVER',
  RdbmsTeradata = 'RDBMS_TERADATA',
  RdbmsTrino = 'RDBMS_TRINO',
  SaasSalesforce = 'SAAS_SALESFORCE'
}

export type Query = {
  __typename?: 'Query';
  /** Get action association list" */
  ActionsAssociation_getCustomActionsAssociation: Array<Maybe<ActionAssociationDetails>>;
  Actions_getEmbedActions: Array<Maybe<EmbedActionConfig>>;
  Actions_getHelpConfig?: Maybe<Admin_GetHelpConfigResponse>;
  Actions_getReleaseVersion?: Maybe<Admin_GetReleaseVersion>;
  /** Get Auth Token for an All / Primary Org */
  Admin_getAuthToken?: Maybe<Admin__AuthTokenResponse>;
  /** Get current EULA */
  Admin_getCurrentEula: Admin_GetEulaResponse;
  /** Get settings for tscli */
  Admin_getDevspotEmbedSettings?: Maybe<Admin_GetDevSpotEmbedSettingsResponse>;
  /** Get tscli configuration for an embedded feature */
  Admin_getEmbedFeature?: Maybe<Admin__GetEmbedTscliCommandResponse>;
  /** Get tscli configuration for a specific feature */
  Admin_getFeature?: Maybe<Admin__GetTscliCommandResponse>;
  /** Get latest EULA (fetch EULA list and return last item) */
  Admin_getLatestEula: Admin_GetEulaResponse;
  /** Get LDAP/AD data */
  Admin_getLdapAd?: Maybe<Admin__GetLdapAdResponse>;
  /** Get Local data */
  Admin_getLocal?: Maybe<Admin__GetLocalResponse>;
  /** Get NAS data */
  Admin_getNas?: Maybe<Admin__GetNasResponse>;
  /** Get settings for tscli */
  Admin_getNginxCors?: Maybe<Admin_GetNginxCors>;
  /** Get reverse SSH data */
  Admin_getRevSsh?: Maybe<Admin__GetRevSshResponse>;
  /** Get SMTP data */
  Admin_getSmtp?: Maybe<Admin__GetSmtpResponse>;
  /** Get Snapshot data */
  Admin_getSnapshot?: Maybe<Admin__GetSnapshotResponse>;
  /** Get SSL data */
  Admin_getSsl?: Maybe<Admin__GetSslResponse>;
  /** Get status configuration for sidebar */
  Admin_getStatus?: Maybe<Admin__StatusResponse>;
  Config_Query?: Maybe<Config_Response>;
  /** Gets a list of all accessible tables */
  Csv_getAccessibleTables: Csv_GetAccessibleTablesResponse;
  CustomChart_get?: Maybe<CustomChartManifest>;
  /** Get all custom chart manifest configurations */
  CustomChart_getAll?: Maybe<Array<Maybe<CustomChartManifest>>>;
  /** Get all destinations */
  DS__getAllDestinations?: Maybe<Ds__DestinationListCompleteResult>;
  /** Get list of destinations */
  DS__getDestinationList?: Maybe<Ds__DestinationListCompleteResult>;
  /** Get details of the destination */
  DS__getDestinationMetadata?: Maybe<GetDsDestinationMetadataResult>;
  DS__getDestinationObjectDetails?: Maybe<Scalars['JSON']>;
  /** Get all destinations types */
  DS__getDestinationTypes?: Maybe<Ds__GetDestinationTypesResult>;
  /** Get all destinations types */
  DS__getDestinationUsersTypeList?: Maybe<Ds__GetDestinationUsersTypeResult>;
  /** Get details of the google sheet object */
  DS__getGoogleSheetObjectDetail?: Maybe<DsGoogleSheetObjectDetailResult>;
  /** Get details of the microsoft teams object */
  DS__getMsTeamsObjectDetail?: Maybe<DsMsTeamsObjectDetailResult>;
  /** Get list of pipelines for filter */
  DS__getPipelineFilterList?: Maybe<Ds_PipelineFilterListResult>;
  /** Get list of pipelines */
  DS__getPipelineInstancesList?: Maybe<Ds_PipelineInstanceListResult>;
  /** Get list of pipelines */
  DS__getPipelineList?: Maybe<Ds_PipelineListResult>;
  /** Get list of pipelines by source id */
  DS__getPipelineListBySourceId?: Maybe<Ds_PipelineListResult>;
  /** Get pipeline logs */
  DS__getPipelineLogs: DsPipelineLogResult;
  DS__getSfdcObjectDetail?: Maybe<DsSfdcObjectDetailResult>;
  /** Get list of destinations */
  DS__getTargetIntegrationList?: Maybe<Ds__TargetIntegrationListResult>;
  /** Get Timezones list */
  DS__getTimezonesList: Array<Maybe<Scalars['String']>>;
  /** Get users list */
  DS__getUsersList: Scalars['JSON'];
  /** Gets DBT connection details */
  Dbt__getConnectionDetails?: Maybe<DbtConnection>;
  /** Gets all the dbt connections */
  Dbt__getConnectionList: DbtConnectionList;
  /** Gets all the dbt project names */
  Dbt__getProjects: DbtProjectList;
  /** To search a specific group account or all groups in the ThoughtSpot system */
  Groups__searchGroups?: Maybe<SearchGroupsResponse>;
  /**
   * .
   * Gets Tse license Info which belong to the datsource.
   */
  License_getTseLicenseInfo: TseLicenseDetail;
  /** Get entity pack information of zip files and TSL files uploaded by the user */
  Metadata__getEPackInfo?: Maybe<Array<EPackInfoResponse>>;
  /** Get edoc (entity doc) representation of metadata objects */
  Metadata__getEdoc: EntityDocResponse;
  Metadata__getObjectMetadataDetail: ObjectMetadataDetailResponse;
  Metadata__recentlyViewed?: Maybe<Scalars['JSON']>;
  /** Get monitor rule details for a given monitorRuleId */
  MonitorRule__get: GetMonitorRuleResponse;
  /** Get permission for subscribers for current monitor rule */
  MonitorRule__getSubscriberPermissions: GetPermissionForUserResponse;
  /** Get suggestions for subscribers for current monitor rule */
  MonitorRule__getSubscriberSuggestions: GetSubscriberSuggestionsResponseForMonitorRule;
  /** Get suggested monitor rule for a metric */
  MonitorRule__getSuggestedMonitorRule: GetMonitorRuleResponse;
  /** List all monitor rules for metric */
  MonitorRule__listForMetric: ListMonitorRulesForMetricResponse;
  /** List all monitor rules for user */
  MonitorRule__listForUser: ListMonitorRulesForUserResponse;
  /** Get Okta Status */
  Okta_getStatus?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Gets the partner connect config for setup */
  PartnerEng__getPartnerConnectConfig: PartnerConnectConfig;
  /** Download SAML Metadata */
  Saml_downloadMetadata?: Maybe<Saml_StatusResponse>;
  /** Get Map Attribute Info */
  Saml_getAttributeMapping?: Maybe<Saml__MapAttributeGetResponse>;
  /** Get SAML Connection */
  Saml_getConnection?: Maybe<Admin__SamlConnectionResponse>;
  /** Get SAML Connections List */
  Saml_getConnectionList?: Maybe<Saml_ConnectionListResponse>;
  /** Get SAML Metadata Info */
  Saml_metadataInfo?: Maybe<Saml__MetaDataInfoResponse>;
  /** Get Schedule metatdata */
  Scheduler__getSchedule?: Maybe<GetScheduleResult>;
  Scheduler__initGatingCondition?: Maybe<BachSessionId>;
  /** Get schedule list for a pinboard */
  Scheduler_getJobList?: Maybe<Array<Maybe<ScheduledJob>>>;
  /** Get run history of a job */
  Scheduler_getJobRun?: Maybe<Array<Maybe<JobRun>>>;
  /** Gets the refresh or scheduled run history for search cache */
  SearchCache__getRefreshHistory: SearchCacheHistoryDetails;
  /** Gets the search cache status of materialized view */
  SearchCache__getViewStatus: Array<SearchCacheViewStatus>;
  /** Refreshes materialized view cache */
  SearchCache__refreshCache: Scalars['JSON'];
  /** Get list of destinations */
  Seekwell__getDestinationList?: Maybe<Seekwell__DestinationListResult>;
  /** Get details of the destination */
  Seekwell__getDestinationMetadata?: Maybe<SeekweellGetDestinationMetadataResult>;
  /** Get details of the googlesheets destination sheets. */
  Seekwell__getGoogleSheetsObjectDetail?: Maybe<SeekwellGetGoogleSheetsObjectDetailResult>;
  /** Get Seekwell pipeline metadata */
  Seekwell__getPipelineByPipelineId?: Maybe<SeekwellGetPipelineByPipelineIdResponse>;
  /** Get details of the sfdc destination object */
  Seekwell__getSfdcObjectDetail?: Maybe<SeekwellGetSfdcObjectDetailResult>;
  SpotIQ__getCortexCacheStatus: CortexCacheResponse;
  SpotIQ__getList: ListAnalysesResponse;
  SpotappsAdmin__getApplicationList?: Maybe<PublisherResponse>;
  SpotappsAdmin__getPublisherIdsWithCount?: Maybe<Array<Maybe<AuthorsInfo>>>;
  Spotapps__downloadApp: Scalars['String'];
  Spotapps__generateTML: GenericRequestResponse;
  Spotapps__getApplication?: Maybe<Application>;
  Spotapps__getApplicationBlocksInfo?: Maybe<Array<Maybe<ApplicationBlock>>>;
  Spotapps__getApplicationColumns?: Maybe<ApplicationColumn>;
  Spotapps__getApplicationComponentsInfo?: Maybe<ApplicationComponentsInfo>;
  Spotapps__getApplicationSchema?: Maybe<Array<Maybe<ApplicationSchema>>>;
  Spotapps__getApplicationTables?: Maybe<ApplicationTable>;
  Spotapps__getApplications?: Maybe<Array<Maybe<Application>>>;
  Spotapps__getConnectorBlocks?: Maybe<Array<Maybe<ConnectorBlock>>>;
  Spotapps__getConnectorDestinations?: Maybe<Array<Maybe<ConnectorDestination>>>;
  /** Get list of all scheduleIds and Seekwell pipelineId for given Object and App action */
  TSEAppActions__getPipelineAndSchedulerId?: Maybe<Array<Maybe<SeekwellGetPipelineAndSchedulerIdResponse>>>;
  /** Get all seekwell schedules with schedule metadata and action detinationMetadata */
  TSEAppActions__getSeekwellMetadataAndSchedule?: Maybe<Array<Maybe<SeekwellGetMetadataAndScheduleResult>>>;
  /** Get Configured Datasources for CSV Upload */
  UserDataGetCSVDataSources: Array<Maybe<Scalars['String']>>;
  UserDataGetCsvUploadLimitInfo: GetCsvUploadLimitInfoResponse;
  /** Get delete tables */
  UserDataGetTableDeletedById: Scalars['JSON'];
  /** To search a specific user account or all users in the ThoughtSpot system */
  Users__searchUsers?: Maybe<SearchUsersResponse>;
  /** Get list of branches in the remote repository. */
  VersionControl__fetchBranches?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Search existing Git configurations in the current cluster */
  VersionControl__getConfig?: Maybe<Array<Maybe<RepoConfigResponse>>>;
  Webhooks_getWebhookItem: GetWebhookResponse;
  Webhooks_getWebhookList: GetWebhookListResponse;
  /** Bach Worksheet Edit Request */
  Worksheet__edit?: Maybe<WorksheetEditResponse>;
  /** Get Lesson Plans */
  Worksheet__getLessonPlans?: Maybe<WorksheetEditSession>;
  /** Bach request for fetching logical tables used in worksheet */
  Worksheet__getLogicalTable?: Maybe<LogicalTablePreviewResponse>;
  accessTree?: Maybe<Array<Maybe<AccessTreeResponse>>>;
  /** Connect and get metadata details */
  connectAndFetchMetadata?: Maybe<Scalars['JSON']>;
  /** To retrieve geocoding information in geoJSON format */
  data_geocoding: Scalars['String'];
  /** Get the list of column */
  fetchColumns?: Maybe<Scalars['JSON']>;
  /** Get the connection */
  fetchConnection?: Maybe<Scalars['JSON']>;
  /** Get the dependencies */
  fetchDependencies?: Maybe<Scalars['JSON']>;
  /** Get the live columns */
  fetchLiveColumns?: Maybe<Scalars['JSON']>;
  /** Get action config list */
  getActionConfigList: Array<Maybe<ActionConfig>>;
  /** Get an existing AnswerEditSession */
  getAnswer: AnswerEditSession;
  /**
   * GetAnswerDataByQuery
   * returns the data for the answer irrespective of the viz
   */
  getAnswerDataByQuery: AnswerDataResponse;
  /** Get List of answers */
  getAnswerList: AnswerEntityList;
  getAnswerV2: PinboardV1AnswerResponse;
  getAnswerV2WithDecodedViz: AnswerV2WithDecodedVizResponse;
  /** Get authentication URL in case of OAuth flow while authenticationg/creating connection */
  getAuthUrl: AuthenticationUrlResponse;
  /** Get calendar types */
  getCalendarTypes: Array<Scalars['String']>;
  /** get catalog data source */
  getCatalogDataSources: GetCatalogDataSourcesResult;
  /** get list of catalogs */
  getCatalogDetails: CatalogDeatailsResult;
  /** get catalog metadata */
  getCatalogMetaData: GetCatalogMetaDataResult;
  /** get catalog view logs */
  getCatalogViewLogs: GetCatalogViewLogsResult;
  /** Get certificate status */
  getCertificateStatus: Scalars['Boolean'];
  getCohortDependencies: DependenciesResponse;
  /** Get the list of connection config */
  getConnectionConfigs?: Maybe<Scalars['JSON']>;
  /** Checks the connection dependencies */
  getConnectionDependents: Scalars['JSON'];
  /** Get list of tables for a connection */
  getConnectionDetailById: ConnectionMetadata;
  /** Get Connection diagnose message */
  getConnectionDiagnose: Scalars['JSON'];
  /** Get list of tables for a connection */
  getConnectionTableDetailById: ConnectionMetadata;
  /** Get the list ofconnection type */
  getConnectionTypes: Array<Maybe<ConnectionType>>;
  /** Get list of all connections */
  getConnectionsList: MetadataList;
  getCordClientAuthToken: Scalars['String'];
  /** Gets the sample data for selected calendar */
  getCustomCalendarSampleData: Array<Array<Scalars['String']>>;
  /** Gets all the custom calendars which belong to the datsource. If no datasource is given, all calendars are fetched */
  getCustomCalendars: CustomCalendarDetailResponse;
  /** Get all custom-region files */
  getCustomRegionList?: Maybe<Array<Maybe<FileHeader>>>;
  /** Get Data Upload configuration for a connection */
  getDataUploadDetails: DataUploadDetails;
  /** get the list of databases for a given datasource */
  getDatabaseList: Array<Maybe<Scalars['String']>>;
  /** Get date filter preview */
  getDateFilterPreview?: Maybe<MetadataDateFilterValue>;
  /** Get detailed pinboard data by id */
  getDetailedPinboardInfo: DetailedPinboard;
  /** Get permission for objects for current user supporting multiple types */
  getEffectivePermissionOnObjects: Array<PermissionMap>;
  getEmbedActionConfigList: Array<Maybe<EmbedActionConfig>>;
  getEmbedUrls?: Maybe<EmbedUrls>;
  getEmbedUrlsPerOrg?: Maybe<Array<Maybe<EmbedUrlsConfigInfo>>>;
  getEncodedTransientPinboard?: Maybe<Scalars['String']>;
  /** Get viz snapshot data */
  getEurekaVizSnapshot?: Maybe<EurekaVizSnapshot>;
  /** Get viz snapshot metadata */
  getEurekaVizSnapshotStatus?: Maybe<Array<Maybe<EurekaVizSnapshotStatus>>>;
  /** Get metadata about the currently-edited formula */
  getFormulaMetadata: FormulaMetadataResponse;
  /** Get Group details by Ids */
  getGroupDetailsById: Array<GetGroupDetailsByIdOutput>;
  /** Get members of a group */
  getGroupMembers: MetadataList;
  /** Get list of  groups */
  getGroupsList: MetadataList;
  getMembersDetails: MembersDetailsResponse;
  /** Get members list */
  getMembersList: MembersListResponse;
  /** Get the metadata detail for a connection */
  getMetadataDetailsById: Scalars['JSON'];
  /** Get list of objects */
  getMetadataList: MetadataList;
  /** Get list as objects */
  getMetadataListAs: MetadataList;
  /** List of metadata objects in the repository with count */
  getMetadataPropertyWithCount: MetadataPropertyWithCountList;
  /** List of metadata objects in the repository with count */
  getMetadataPropertyWithCountOfAllObjects: MetadataPropertyWithCountList;
  /** Get list of pinboards/answers/pinboards & answers with stats */
  getMetadataWithStats: MetadataWithStatsList;
  /** Get metrics from a specific answer/pinboard */
  getMetrics: MetricsList;
  /** Get non deleted Pinboard dependents */
  getNonDeletedPinboardDependents?: Maybe<Dependents>;
  /** Get org by id */
  getOrgById: Org__DataResponse;
  /** Get orgs list */
  getOrgsList: Org__ListResponse;
  getParameterDependencies: DependenciesResponse;
  getPinboard: PinboardEditSession;
  getPinboardDataSources: Array<PinboardSourceDetail>;
  /** Get pinboard by id */
  getPinboardInfo: PinboardEntityMetadata;
  /** Get List of pinboards */
  getPinboardList: AnswerEntityList;
  getPinboardNoteTileImage?: Maybe<Array<Maybe<PinboardNoteTileUploadImageResponse>>>;
  /** Get List of pinboard tabs by pinboardId */
  getPinboardTabList: Array<Maybe<TabInfo>>;
  /** Get Pinboard top users */
  getPinboardTopUsersById: Array<UserDetails>;
  getPopularColumns?: Maybe<Array<Maybe<Scalars['String']>>>;
  getPreference?: Maybe<GetSpotIqPreferences>;
  /** Get permissions and metadata for entities(users/groups) on objects */
  getPreviouslySharedEntities: Array<Maybe<ObjectPermissionWithMetadata>>;
  /** Get permissions and metadata for entities(users/groups) on objects for share modal */
  getPreviouslySharedEntitiesForShareModal: Scalars['JSON'];
  /** Get priority items list */
  getPriorityList?: Maybe<Array<Maybe<PriorityMetricObject>>>;
  /** Get all privilege groups */
  getPrivilegeGroups: PrivilegeGroupsResponse;
  /** Lists All Privileges */
  getPrivileges: Array<Scalars['String']>;
  getQvSpec?: Maybe<Scalars['String']>;
  /** Get an already created R template by id, used for R analysis */
  getRTemplateById?: Maybe<RTemplateDetails>;
  /** Gets the list of already created R templates used for R analysis */
  getRTemplateList?: Maybe<Array<Maybe<RTemplateSummary>>>;
  getRecentlyPinnedPinboard?: Maybe<PinboardDetails>;
  /** Get recently selected Data Sources */
  getRecentlySelectedSources: Array<Metadata>;
  /** Get Relationship details by Ids */
  getRelationshipDetailsById?: Maybe<Array<RelationshipDetails>>;
  /** Returns the status of the request by Request GUID */
  getRequestStatus?: Maybe<GetRequestStatusResponse>;
  /** Get params required to in create calendar flow */
  getRequiredParams: Scalars['JSON'];
  /** Get role by id */
  getRoleById: Role_DataResponse;
  /** List of roles metaData */
  getRoles: GetRolesResponse;
  /** Get sample data for columns */
  getSampleData: Scalars['JSON'];
  getSampleValues?: Maybe<ColumnSampleValues>;
  /** get schedule Details */
  getScheduleDetails: ScheduleDetailsResult;
  /** Get the list of schemas for a given datasource id and database name */
  getSchemaList: Array<Maybe<Scalars['String']>>;
  /** Gets the search assist worksheets for onboarding */
  getSearchAssistContent?: Maybe<SearchAssistContent>;
  getSeedQuestions?: Maybe<SeedQuestionsResponse>;
  /** Gets the state of setup page */
  getSetupState?: Maybe<SetupState>;
  getSharables: Array<Sharable>;
  /** Get Source details for given ids */
  getSourceDetailById: Array<SourceDetail>;
  /** Get Source details for given ids */
  getSourceDetailByIdForAnswer: Array<SourceDetail>;
  /** Get all Data Sources */
  getSourcesList: SourceByType;
  /** Get all Data Sources */
  getSourcesListForAnswer: SourceByType;
  /** Get all custom-styles */
  getStyleCustomization: Styles;
  getStyleCustomizationPerOrg?: Maybe<Array<Maybe<StylesPerOrg>>>;
  getSuggestedAnswers: Array<Maybe<AnswerEditSession>>;
  getSuggestedColumns: AutogenColumnSuggestionResponse;
  /** Get list of suggested relationships */
  getSuggestedRelationships?: Maybe<AutogenRelationshipResponse>;
  /** Get the list of suggested shares for given user */
  getSuggestedShareesList?: Maybe<Array<Metadata>>;
  /** Get Suggestions */
  getSuggestionsForExplore: ExploreResponse;
  getSuggestionsForExploreReplace: Array<Maybe<Suggestion>>;
  getTableCountByConnectionId: Array<Maybe<ConnectionTableDetails>>;
  /** Get the list of tables for the given configuration */
  getTableList: Array<Maybe<Scalars['String']>>;
  /** Get tables list */
  getTablesList: TablesListReponse;
  /** Get all tags (stickers) */
  getTagsList: Tags;
  getTeamsRowUsageStats: RowUsageStats;
  getTokenQuery?: Maybe<Eureka_Agent_TokensResponse>;
  /** Get all trending items */
  getTrendingList: Trending;
  getUserAccessibleOrgs?: Maybe<AccessibleOrgsResponse>;
  getUserAccessibleOrgsByParams?: Maybe<AccessibleOrgsResponse>;
  /** Get User details by Ids */
  getUserDetailsById?: Maybe<Array<UserDetails>>;
  /** Get list of uesr groups */
  getUserGroupsList: MetadataList;
  /** Get list of uesr groups for org -1 or 0 context */
  getUserGroupsListForOrg: MetadataList;
  getUserOrgsByUserId?: Maybe<AccessibleOrgsResponse>;
  /** Get list of users */
  getUsersList: MetadataList;
  /** Get list of users for org -1 or 0 context */
  getUsersListForOrg: MetadataList;
  /** Get verification Status */
  getVerificationStatus: VerificationStatusResponse;
  /** Get verifiers Liveboards */
  getVerifierLiveboards: VerifierLiveboardsResponse;
  /** Get verifiers list */
  getVerifiersList: VerifiersListResponse;
  /** Get data for the vizes given vizId */
  getVizData: VizDataResponse;
  getWorksheetData: ImportEPackRequest;
  hasProfilePic?: Maybe<Scalars['Boolean']>;
  /** Check if the email is valid and whitelisted */
  isEmailValid: Scalars['Boolean'];
  isSessionActive?: Maybe<SessionStatus>;
  listGroupsInGroupById: Array<Maybe<CreateUserOrGroupDetails>>;
  listUserGroupById: Array<Maybe<CreateUserOrGroupDetails>>;
  listUsersInGroupById: Array<Maybe<CreateUserOrGroupDetails>>;
  queryComplete?: Maybe<Eureka_CompleteResponse>;
  queryGetNlQueryFeedback?: Maybe<Eureka_GetNlQueryFeedbackResponse>;
  queryGetQuestionFragments?: Maybe<Eureka_GetQuestionFragmentsResponse>;
  queryPutNlQueryFeedback?: Maybe<Eureka_PutNlQueryFeedbackResponse>;
  queryRelevanceFeedback?: Maybe<Eureka_RelevanceFeedbackResponse>;
  queryRequest?: Maybe<Eureka_SearchResponse>;
  queryTenantProbe?: Maybe<Eureka_RelevanceFeedbackResponse>;
  /** Report Event when there is some error */
  reportEvent?: Maybe<Scalars['JSON']>;
  resolveTokenQuery?: Maybe<Eureka_Agent_ResolveTokenResponse>;
  /** To retrieve data related to a Answer from the ThoughtSpot system, you can use this endpoint */
  restapiV2__answerData?: Maybe<Scalars['JSON']>;
  /** To retrieve the query SQL related to an Answer that is run on the data platform, you can use this endpoint */
  restapiV2__answerQuerySql?: Maybe<AnswerQueryResponse>;
  /** To get details of the current configuration of a Thoughtspot cluster, use this endpoint. */
  restapiV2__getClusterConfig?: Maybe<Scalars['JSON']>;
  /** To get the details of overrides to the Thoughtspot cluster configuration, use this endpoint. */
  restapiV2__getClusterConfigOverrides?: Maybe<Scalars['JSON']>;
  /** To get the details of a specific connection use this endpoint */
  restapiV2__getConnection: ConnectionResponse;
  /** To get the list of databases for a connection, use this endpoint. \n\n The response will include databases from the data platform corresponding to the connection id provided. */
  restapiV2__getConnectionDatabase?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** To get details of a specific custom action configured in the ThoughtSpot system, use this endpoint */
  restapiV2__getCustomAction?: Maybe<Scalars['JSON']>;
  /** ThoughtSpot supports associating custom actions to Liveboards, answers, and worksheets. To get the details of the ThoughtSpot objects associated with a custom action, use this endpoint. */
  restapiV2__getCustomActionAssociation?: Maybe<Scalars['JSON']>;
  /** To list all the databases in Falcon, use this endpoint. */
  restapiV2__getDatabases: Array<Maybe<Scalars['String']>>;
  /**
   * To get the details of a specific group by name or id, use this endpoint.
   * At Least one value needed.  When both are given id will be considered to fetch user information.
   */
  restapiV2__getGroup?: Maybe<GroupResponse>;
  /** To get the name and id of liveboard that is set as a home liveboard for a user, use this endpoint. At least one of user id or username is required. When both are given, then id will be considered. */
  restapiV2__getHomeLiveboard: HomeLiveboardResponse;
  /** To get a list of objects with incomplete metadata, use this endpoint */
  restapiV2__getIncompleteObjects: Scalars['JSON'];
  /** Note: This endpoint is applicable only for SAAS deployments. \n\n The ThoughtSpot log streaming service API allows you to programmatically get a security audit event log from the ThoughtSpot system. \n\n To use this API, make sure you have admin user privileges. \n\n ThoughtSpot cloud deployments allow you to collect security audit events and send them to your Security information and event management (SIEM) application in real-time. \n\n These events can help your security operations personnel to detect potential security threats or compromised user accounts in your organization. */
  restapiV2__getLogEvents?: Maybe<LogsResponse>;
  /** Use this endpoint to get full details of metadata objects */
  restapiV2__getObjectDetail?: Maybe<Scalars['JSON']>;
  /** To get header detail of a metadata object, use this endpoint. You can provide as input selective fields to get the data for. */
  restapiV2__getObjectHeader?: Maybe<Scalars['JSON']>;
  /** Use this endpoint to get header details of visualization charts for a given liveboard or answer. At least one of id or name of liveboard or answer is required. When both are given, then id will be considered. */
  restapiV2__getObjectVisualizationHeader: Array<Maybe<Scalars['JSON']>>;
  /** To get the details of a specific organization by name or id, use this endpoint. \n\n At least one value needed. When both are given,then id will be considered to fetch organization information. \n\n Requires Administration privilege for tenant. */
  restapiV2__getOrg?: Maybe<OrgsResponse>;
  /** Use this endpoint to list the objects on which a user or user group has permission. The response will include only those objects on which the user or user group has either VIEW OR MODIFY permission. \n\n Requires administration privilege */
  restapiV2__getPermissionForPrincipal?: Maybe<PrincipalSearchResponse>;
  /** To list the permissions for user and user groups on an object, use this endpoint. The response will include only those users and groups with have either VIEW OR MODIFY permission. \n\n You can optionally see the permission on the dependent objects as well by enabling includeDependent field. */
  restapiV2__getPermissionOnObject?: Maybe<SecurityPermissionResponse>;
  /** To list all the schemas in a database in Falcon, use this endpoint. */
  restapiV2__getSchemas: Array<Maybe<Scalars['String']>>;
  /** Get Session object information */
  restapiV2__getSessionInfo?: Maybe<Scalars['JSON']>;
  /** Get authentication token of current user */
  restapiV2__getSessionToken: SessionTokenResponse;
  /** Note: This endpoint is applicable only for on-prem deployments. \n\n To provide details of a table in a schema of a database in Falcon, use this endpoint. */
  restapiV2__getTableDetails?: Maybe<Scalars['JSON']>;
  /** To list all the tables in a schema of a database in Falcon, use this endpoint. */
  restapiV2__getTables: Array<Maybe<Scalars['String']>>;
  /** To get details of a specific tag, use this endpoint. At least one of id or name of tag is required. When both are given, then id will be considered. */
  restapiV2__getTag: MetadataTagResponse;
  /** To get the details of a specific user account by username or user id, use this endpoint. At Least one value is needed.  When both are given, user id will be considered to fetch user information */
  restapiV2__getUser?: Maybe<UserResponse>;
  /** To retrieve data related to a Liveboard or visualization from the ThoughtSpot system, you can use this endpoint */
  restapiV2__liveboardData?: Maybe<Scalars['JSON']>;
  /** To retrieve the query SQL related to a Visualization in a Liveboard that is run on the data platform, you can use this endpoint */
  restapiV2__liveboardQuerySql?: Maybe<LiveboardQueryResponse>;
  /** To search custom actions available on a ThoughtSpot instance, use this endpoint */
  restapiV2__searchCustomAction?: Maybe<Scalars['JSON']>;
  /** Use this endpoint to get full details of metadata objects */
  restapiV2__searchObjectDetail?: Maybe<Scalars['JSON']>;
  /** To get header details for metadata objects, use this endpoint. You can provide as input selective fields to get the data for. */
  restapiV2__searchObjectHeader?: Maybe<Scalars['JSON']>;
  /** To programmatically retrieve data from ThoughtSpot using search query string, use this endpoint */
  restapiV2__searchQueryData?: Maybe<Scalars['JSON']>;
  /** Send the welcome email */
  sendWelcomeEmail: Scalars['Boolean'];
  /** Show the Liveboard Details */
  showLbDetails: ShowLbDetailsResponse;
  validateAutoWorksheetJoins?: Maybe<RelationshipResponse>;
  validateEmail: Scalars['Boolean'];
};


export type QueryActionsAssociation_GetCustomActionsAssociationArgs = {
  id?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  worksheetsIds: Array<Scalars['String']>;
};


export type QueryAdmin_GetAuthTokenArgs = {
  viewMode: Scalars['String'];
};


export type QueryAdmin_GetDevspotEmbedSettingsArgs = {
  orgId?: InputMaybe<Scalars['String']>;
  viewMode?: InputMaybe<Scalars['String']>;
};


export type QueryAdmin_GetEmbedFeatureArgs = {
  featureName: Scalars['String'];
};


export type QueryAdmin_GetFeatureArgs = {
  featureName: Scalars['String'];
};


export type QueryAdmin_GetNginxCorsArgs = {
  viewMode?: InputMaybe<Scalars['String']>;
};


export type QueryAdmin_GetStatusArgs = {
  orgsRolesEnabled?: InputMaybe<Scalars['Boolean']>;
  viewMode?: InputMaybe<Scalars['String']>;
};


export type QueryCsv_GetAccessibleTablesArgs = {
  batchSize?: InputMaybe<Scalars['Int']>;
};


export type QueryCustomChart_GetArgs = {
  guid: Scalars['GUID'];
  orgId?: InputMaybe<Scalars['Int']>;
};


export type QueryCustomChart_GetAllArgs = {
  orgId?: InputMaybe<Scalars['Int']>;
};


export type QueryDs__GetAllDestinationsArgs = {
  params?: InputMaybe<Ds__DestinationListCompleteInput>;
};


export type QueryDs__GetDestinationMetadataArgs = {
  params: GetDsDestinationMetadataInput;
};


export type QueryDs__GetDestinationObjectDetailsArgs = {
  params: DsObjectDetailsInput;
};


export type QueryDs__GetGoogleSheetObjectDetailArgs = {
  params: DsGoogleSheetObjectDetailInput;
};


export type QueryDs__GetMsTeamsObjectDetailArgs = {
  params: DsMsTeamsObjectDetailInput;
};


export type QueryDs__GetPipelineFilterListArgs = {
  params?: InputMaybe<Ds__PipelineListInput>;
};


export type QueryDs__GetPipelineInstancesListArgs = {
  params: Ds__PipelineInstanceListInput;
};


export type QueryDs__GetPipelineListArgs = {
  params?: InputMaybe<Ds__PipelineListInput>;
};


export type QueryDs__GetPipelineListBySourceIdArgs = {
  params?: InputMaybe<Ds__PipelineListBySourceIdInput>;
};


export type QueryDs__GetPipelineLogsArgs = {
  id: Scalars['String'];
};


export type QueryDs__GetSfdcObjectDetailArgs = {
  params: DsSfdcObjectDetailInput;
};


export type QueryDbt__GetConnectionDetailsArgs = {
  id: Scalars['String'];
};


export type QueryDbt__GetConnectionListArgs = {
  params?: InputMaybe<DbtConnectionListParamsInput>;
};


export type QueryGroups__SearchGroupsArgs = {
  default_liveboard_identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description?: InputMaybe<Scalars['String']>;
  display_name?: InputMaybe<Scalars['String']>;
  group_identifier?: InputMaybe<Scalars['String']>;
  org_identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  privileges?: InputMaybe<Array<InputMaybe<Privileges>>>;
  sub_group_identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type?: InputMaybe<Groups__GroupType>;
  user_identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  visibility?: InputMaybe<Visibility>;
};


export type QueryMetadata__GetEPackInfoArgs = {
  objects?: InputMaybe<Array<EPackInfoRequestObject>>;
  zipFiles?: InputMaybe<Array<EPackInfoRequestZipFile>>;
};


export type QueryMetadata__GetEdocArgs = {
  exportFQN: Scalars['Boolean'];
  objectsToExport: Array<EdocObjectInfo>;
  shouldExportDependencies: Scalars['Boolean'];
};


export type QueryMetadata__GetObjectMetadataDetailArgs = {
  payload: ObjectMetadataDetailPayload;
};


export type QueryMetadata__RecentlyViewedArgs = {
  params: MetadataListParamsInput;
  types: Array<Scalars['String']>;
};


export type QueryMonitorRule__GetArgs = {
  monitorRuleId: Scalars['String'];
};


export type QueryMonitorRule__GetSubscriberPermissionsArgs = {
  metricId: MetricIdInput;
  userId: Scalars['String'];
};


export type QueryMonitorRule__GetSubscriberSuggestionsArgs = {
  pattern: Scalars['String'];
  ruleId?: InputMaybe<Scalars['String']>;
};


export type QueryMonitorRule__GetSuggestedMonitorRuleArgs = {
  alertType?: InputMaybe<MonitorAlertType>;
  metricId: MetricIdInput;
};


export type QueryMonitorRule__ListForMetricArgs = {
  alertType?: InputMaybe<MonitorAlertType>;
  metricId: MetricIdInput;
};


export type QueryMonitorRule__ListForUserArgs = {
  alertType?: InputMaybe<MonitorAlertType>;
  batchSize: Scalars['Int'];
  offset: Scalars['Int'];
  showCreated: Scalars['Boolean'];
};


export type QuerySaml_DownloadMetadataArgs = {
  data: Saml_DeleteConnData;
};


export type QuerySaml_GetAttributeMappingArgs = {
  data: Saml_MapAttributeProperties;
};


export type QuerySaml_GetConnectionArgs = {
  data: Saml_DeleteConnData;
};


export type QuerySaml_GetConnectionListArgs = {
  data: Admin__ListConnection;
};


export type QuerySaml_MetadataInfoArgs = {
  data: Saml_MetadataProperties;
};


export type QueryScheduler__GetScheduleArgs = {
  params: GetScheduleInput;
};


export type QueryScheduler__InitGatingConditionArgs = {
  initialContext?: InputMaybe<Scalars['String']>;
};


export type QueryScheduler_GetJobListArgs = {
  jobNameFilter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  pinboardId: Scalars['String'];
  sortAscending?: InputMaybe<Scalars['Boolean']>;
  sortColumn?: InputMaybe<Scalars['String']>;
};


export type QueryScheduler_GetJobRunArgs = {
  jobId: Scalars['String'];
};


export type QuerySearchCache__GetRefreshHistoryArgs = {
  viewId: Scalars['GUID'];
};


export type QuerySearchCache__GetViewStatusArgs = {
  ids: Array<Scalars['GUID']>;
};


export type QuerySearchCache__RefreshCacheArgs = {
  authorId: Scalars['GUID'];
  viewId: Scalars['GUID'];
};


export type QuerySeekwell__GetDestinationListArgs = {
  params?: InputMaybe<Seekwell__DestinationListInput>;
};


export type QuerySeekwell__GetDestinationMetadataArgs = {
  params: SeekwellGetDestinationMetadataInput;
};


export type QuerySeekwell__GetGoogleSheetsObjectDetailArgs = {
  params: SeekwellGetGoogleSheetsObjectDetailInput;
};


export type QuerySeekwell__GetPipelineByPipelineIdArgs = {
  params?: InputMaybe<SeekwellGetPipelineByPipelineIdInput>;
};


export type QuerySeekwell__GetSfdcObjectDetailArgs = {
  params: SeekwellGetSfdcObjectDetailInput;
};


export type QuerySpotIq__GetCortexCacheStatusArgs = {
  cacheRequest: CortexCacheRequest;
};


export type QuerySpotIq__GetListArgs = {
  input: ListAnalysesRequest;
};


export type QuerySpotappsAdmin__GetApplicationListArgs = {
  filterParams?: InputMaybe<AppsFilterParamsInput>;
};


export type QuerySpotapps__DownloadAppArgs = {
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  review_status: SpotAppReviewStatus;
  status: Scalars['String'];
  userid: Scalars['String'];
};


export type QuerySpotapps__GenerateTmlArgs = {
  id: Scalars['String'];
  review_status: SpotAppReviewStatus;
  userid: Scalars['String'];
};


export type QuerySpotapps__GetApplicationArgs = {
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  review_status: SpotAppReviewStatus;
  userid: Scalars['String'];
};


export type QuerySpotapps__GetApplicationBlocksInfoArgs = {
  id: Scalars['String'];
  userid: Scalars['String'];
};


export type QuerySpotapps__GetApplicationColumnsArgs = {
  id: Scalars['String'];
  review_status: SpotAppReviewStatus;
  userid: Scalars['String'];
};


export type QuerySpotapps__GetApplicationComponentsInfoArgs = {
  filterParams?: InputMaybe<ComponentsFilterParamsInput>;
  id: Scalars['String'];
  review_status: SpotAppReviewStatus;
  userid: Scalars['String'];
};


export type QuerySpotapps__GetApplicationSchemaArgs = {
  id: Scalars['String'];
  review_status: SpotAppReviewStatus;
  userid: Scalars['String'];
};


export type QuerySpotapps__GetApplicationTablesArgs = {
  id: Scalars['String'];
  review_status: SpotAppReviewStatus;
  userid: Scalars['String'];
};


export type QuerySpotapps__GetApplicationsArgs = {
  id: Scalars['String'];
};


export type QuerySpotapps__GetConnectorBlocksArgs = {
  id: Scalars['String'];
  userid: Scalars['String'];
};


export type QuerySpotapps__GetConnectorDestinationsArgs = {
  apiKey: Scalars['String'];
  apiSecret: Scalars['String'];
  connectorType: ConnectorType;
};


export type QueryTseAppActions__GetPipelineAndSchedulerIdArgs = {
  params?: InputMaybe<SeekwellGetPipelineAndSchedulerIdInput>;
};


export type QueryTseAppActions__GetSeekwellMetadataAndScheduleArgs = {
  params: SeekwellGetPipelineAndSchedulerIdInput;
};


export type QueryUserDataGetTableDeletedByIdArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryUsers__SearchUsersArgs = {
  account_status?: InputMaybe<Users__AccountStatus>;
  account_type?: InputMaybe<Users__AccountType>;
  display_name?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  favourite_metadata?: InputMaybe<Array<InputMaybe<Users__FavoriteMetadataInput>>>;
  group_identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  home_liveboard_identifier?: InputMaybe<Scalars['String']>;
  notify_on_share?: InputMaybe<Scalars['Boolean']>;
  onboarding_experience_completed?: InputMaybe<Scalars['Boolean']>;
  org_identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  privileges?: InputMaybe<Array<InputMaybe<Privileges>>>;
  record_offset?: InputMaybe<Scalars['Int']>;
  record_size?: InputMaybe<Scalars['Int']>;
  show_onboarding_experience?: InputMaybe<Scalars['Boolean']>;
  sort_options?: InputMaybe<Users__SortOptions>;
  user_identifier?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<Visibility>;
};


export type QueryVersionControl__FetchBranchesArgs = {
  accessToken: Scalars['String'];
  repositoryUrl: Scalars['String'];
  username: Scalars['String'];
};


export type QueryVersionControl__GetConfigArgs = {
  org_identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryWebhooks_GetWebhookItemArgs = {
  webhookId: Scalars['String'];
};


export type QueryWorksheet__EditArgs = {
  worksheetEditRequest: EditWorksheetRequest;
};


export type QueryWorksheet__GetLessonPlansArgs = {
  id: Scalars['GUID'];
  session: BachSessionIdInput;
};


export type QueryWorksheet__GetLogicalTableArgs = {
  tablePreviewRequest: LogicalTablePreviewRequest;
};


export type QueryAccessTreeArgs = {
  objects: Array<MetadataObjectIdWithTypeInput>;
  principalId: Scalars['String'];
};


export type QueryConnectAndFetchMetadataArgs = {
  authType?: InputMaybe<Scalars['String']>;
  config?: InputMaybe<Scalars['JSON']>;
  includeColumns?: InputMaybe<Scalars['Boolean']>;
  state?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type QueryData_GeocodingArgs = {
  chartType: ChartType;
  regionList: Scalars['String'];
};


export type QueryFetchColumnsArgs = {
  authType?: InputMaybe<Scalars['String']>;
  config?: InputMaybe<Scalars['JSON']>;
  state?: InputMaybe<Scalars['String']>;
  tables?: InputMaybe<Array<InputMaybe<ColumnTable>>>;
  type?: InputMaybe<Scalars['String']>;
};


export type QueryFetchConnectionArgs = {
  authType?: InputMaybe<Scalars['String']>;
  config: Scalars['JSON'];
  id?: InputMaybe<Scalars['GUID']>;
  includeColumns?: InputMaybe<Scalars['Boolean']>;
};


export type QueryFetchDependenciesArgs = {
  ids?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryFetchLiveColumnsArgs = {
  authType?: InputMaybe<Scalars['String']>;
  config?: InputMaybe<Scalars['JSON']>;
  connectionId?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  tables?: InputMaybe<Array<InputMaybe<ColumnTable>>>;
};


export type QueryGetAnswerArgs = {
  session: BachSessionIdInput;
};


export type QueryGetAnswerDataByQueryArgs = {
  dataQueries: DataQueryInput;
  session: BachSessionIdInput;
  vizId: Scalars['ID'];
};


export type QueryGetAnswerListArgs = {
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetAnswerV2Args = {
  requestConfig?: InputMaybe<Scalars['JSON']>;
};


export type QueryGetAnswerV2WithDecodedVizArgs = {
  requestConfig?: InputMaybe<Scalars['JSON']>;
};


export type QueryGetAuthUrlArgs = {
  params: AuthenticationUrlParam;
};


export type QueryGetCatalogDataSourcesArgs = {
  params: GetCatalogDataSourcesInput;
};


export type QueryGetCatalogMetaDataArgs = {
  params: GetCatalogMetaDataInput;
};


export type QueryGetCatalogViewLogsArgs = {
  connection_id: Scalars['String'];
};


export type QueryGetCohortDependenciesArgs = {
  cohortColumnId: Scalars['String'];
  session: BachSessionIdInput;
};


export type QueryGetConnectionConfigsArgs = {
  type: ConnectionConfigType;
};


export type QueryGetConnectionDependentsArgs = {
  id: Scalars['GUID'];
  metadata: CreateConnectionMetadata;
};


export type QueryGetConnectionDetailByIdArgs = {
  id: Scalars['GUID'];
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetConnectionDiagnoseArgs = {
  id: Scalars['String'];
};


export type QueryGetConnectionTableDetailByIdArgs = {
  id: Scalars['GUID'];
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetConnectionsListArgs = {
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetCordClientAuthTokenArgs = {
  host: Scalars['String'];
};


export type QueryGetCustomCalendarSampleDataArgs = {
  id: Scalars['GUID'];
  name: Scalars['String'];
};


export type QueryGetCustomCalendarsArgs = {
  datasourceId?: InputMaybe<Scalars['GUID']>;
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetCustomRegionListArgs = {
  orgId?: InputMaybe<Scalars['Int']>;
};


export type QueryGetDataUploadDetailsArgs = {
  id: Scalars['String'];
};


export type QueryGetDatabaseListArgs = {
  id: Scalars['GUID'];
};


export type QueryGetDateFilterPreviewArgs = {
  params: GetDateFilterPreviewInput;
};


export type QueryGetDetailedPinboardInfoArgs = {
  id: Scalars['GUID'];
};


export type QueryGetEffectivePermissionOnObjectsArgs = {
  dependentShare: Scalars['Boolean'];
  objects: Array<MetadataObjectIdWithTypeInput>;
};


export type QueryGetEmbedUrlsPerOrgArgs = {
  custom_link_identifier?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  org_identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGetEncodedTransientPinboardArgs = {
  session: BachPinboardSessionInput;
};


export type QueryGetEurekaVizSnapshotArgs = {
  id: Scalars['String'];
  reportBookId: Scalars['String'];
  reportBookType: Scalars['String'];
  version: Scalars['Int'];
};


export type QueryGetEurekaVizSnapshotStatusArgs = {
  snapshotStatusRequests: Array<SnapshotStatusRequestData>;
};


export type QueryGetFormulaMetadataArgs = {
  session: BachSessionIdInput;
};


export type QueryGetGroupDetailsByIdArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryGetGroupMembersArgs = {
  batchSize?: InputMaybe<Scalars['Int']>;
  id: Scalars['GUID'];
  offset?: InputMaybe<Scalars['Int']>;
  pattern?: InputMaybe<Scalars['String']>;
};


export type QueryGetGroupsListArgs = {
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetMembersListArgs = {
  params?: InputMaybe<MembersListHeaderParams>;
};


export type QueryGetMetadataDetailsByIdArgs = {
  id: Scalars['GUID'];
  showhidden?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<ConnectionTypeEnum>;
};


export type QueryGetMetadataListArgs = {
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetMetadataListAsArgs = {
  params?: InputMaybe<MetadataListAsParamsInput>;
};


export type QueryGetMetadataPropertyWithCountArgs = {
  params?: InputMaybe<MetadataPropertyWithCountParamsInput>;
};


export type QueryGetMetadataPropertyWithCountOfAllObjectsArgs = {
  params?: InputMaybe<MetadataPropertyWithCountParamsInput>;
};


export type QueryGetMetadataWithStatsArgs = {
  params?: InputMaybe<MetadataListWithStatsParamsInput>;
};


export type QueryGetMetricsArgs = {
  params?: InputMaybe<MetricsParamsInput>;
};


export type QueryGetNonDeletedPinboardDependentsArgs = {
  id: Scalars['String'];
};


export type QueryGetOrgByIdArgs = {
  orgid: Scalars['String'];
};


export type QueryGetOrgsListArgs = {
  data: Org__ListInput;
};


export type QueryGetParameterDependenciesArgs = {
  parameterId: Scalars['String'];
  session: BachSessionIdInput;
};


export type QueryGetPinboardArgs = {
  session: BachPinboardSessionInput;
};


export type QueryGetPinboardDataSourcesArgs = {
  accessibleDataSourcesOnly?: InputMaybe<Scalars['Boolean']>;
  filterableDataSourcesOnly: Scalars['Boolean'];
  session: BachPinboardSessionInput;
};


export type QueryGetPinboardInfoArgs = {
  id: Scalars['GUID'];
};


export type QueryGetPinboardListArgs = {
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetPinboardNoteTileImageArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryGetPinboardTabListArgs = {
  id: Scalars['GUID'];
};


export type QueryGetPinboardTopUsersByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetPopularColumnsArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryGetPreviouslySharedEntitiesArgs = {
  objects: Array<MetadataObjectIdWithTypeInput>;
};


export type QueryGetPreviouslySharedEntitiesForShareModalArgs = {
  objects: Array<MetadataObjectIdWithTypeInput>;
};


export type QueryGetQvSpecArgs = {
  content: QueryVisualizerSpecRequestContent;
  sourceType: Scalars['String'];
};


export type QueryGetRTemplateByIdArgs = {
  id?: InputMaybe<Scalars['GUID']>;
};


export type QueryGetRelationshipDetailsByIdArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryGetRequestStatusArgs = {
  requestId: Scalars['GUID'];
};


export type QueryGetRoleByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetRolesArgs = {
  data: Role__ListInput;
};


export type QueryGetSampleDataArgs = {
  params: GetSampleDataParamsInput;
};


export type QueryGetSampleValuesArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryGetScheduleDetailsArgs = {
  connection_id: Scalars['String'];
};


export type QueryGetSchemaListArgs = {
  database: Scalars['String'];
  id: Scalars['GUID'];
};


export type QueryGetSeedQuestionsArgs = {
  aiQuestionCount: Scalars['Int'];
  dataSourceId: Scalars['String'];
  regenerate?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetSharablesArgs = {
  batchSize?: InputMaybe<Scalars['Int']>;
  sortAscending?: InputMaybe<Scalars['Boolean']>;
  type: ListType;
};


export type QueryGetSourceDetailByIdArgs = {
  ids: Array<Scalars['GUID']>;
  type: MetadataType;
};


export type QueryGetSourceDetailByIdForAnswerArgs = {
  ids: Array<Scalars['GUID']>;
  type: MetadataType;
};


export type QueryGetStyleCustomizationPerOrgArgs = {
  custom_style_identifier?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  org_identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGetSuggestedAnswersArgs = {
  columnIds: Array<Scalars['String']>;
};


export type QueryGetSuggestedColumnsArgs = {
  worksheetId: Scalars['String'];
};


export type QueryGetSuggestedRelationshipsArgs = {
  destTableIds: Array<Scalars['String']>;
  sourceTableIds: Array<Scalars['String']>;
};


export type QueryGetSuggestedShareesListArgs = {
  skipIds?: InputMaybe<Array<Scalars['String']>>;
  type: ListType;
  userId: Scalars['String'];
};


export type QueryGetSuggestionsForExploreArgs = {
  session: BachSessionIdInput;
  vizId?: InputMaybe<Scalars['String']>;
};


export type QueryGetSuggestionsForExploreReplaceArgs = {
  selectedColumnProperties?: InputMaybe<SelectedColumnPropertiesInput>;
  session: BachSessionIdInput;
  vizId?: InputMaybe<Scalars['String']>;
};


export type QueryGetTableCountByConnectionIdArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetTableListArgs = {
  database: Scalars['String'];
  id: Scalars['GUID'];
  schema?: InputMaybe<Scalars['String']>;
};


export type QueryGetTablesListArgs = {
  params?: InputMaybe<ListMetadataHeaderParams>;
};


export type QueryGetTeamsRowUsageStatsArgs = {
  batchSize: Scalars['Int'];
  offset: Scalars['Int'];
  sortAscending: Scalars['Boolean'];
  sortBy?: InputMaybe<Scalars['String']>;
};


export type QueryGetTokenQueryArgs = {
  request?: InputMaybe<Input_Eureka_Agent_TokensRequest>;
};


export type QueryGetUserAccessibleOrgsByParamsArgs = {
  inputData: AccessibleOrgsInput;
};


export type QueryGetUserDetailsByIdArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryGetUserGroupsListArgs = {
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetUserGroupsListForOrgArgs = {
  isAllOrg: Scalars['Boolean'];
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetUserOrgsByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetUsersListArgs = {
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetUsersListForOrgArgs = {
  isAllOrg: Scalars['Boolean'];
  params?: InputMaybe<MetadataListParamsInput>;
};


export type QueryGetVerificationStatusArgs = {
  pinboardId: Scalars['String'];
};


export type QueryGetVerifierLiveboardsArgs = {
  params?: InputMaybe<VerifierLiveboardsInput>;
};


export type QueryGetVerifiersListArgs = {
  pinboardId: Scalars['String'];
};


export type QueryGetVizDataArgs = {
  session: BachSessionIdInput;
  vizIds?: InputMaybe<Array<Scalars['ID']>>;
};


export type QueryGetWorksheetDataArgs = {
  relationships?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tableIds: Array<Scalars['String']>;
};


export type QueryIsEmailValidArgs = {
  email: Scalars['String'];
};


export type QueryListGroupsInGroupByIdArgs = {
  id: Scalars['String'];
};


export type QueryListUserGroupByIdArgs = {
  id: Scalars['String'];
};


export type QueryListUsersInGroupByIdArgs = {
  id: Scalars['String'];
};


export type QueryQueryCompleteArgs = {
  request?: InputMaybe<Input_Eureka_CompleteRequest>;
};


export type QueryQueryGetNlQueryFeedbackArgs = {
  request?: InputMaybe<Input_Eureka_GetNlQueryFeedbackRequest>;
};


export type QueryQueryGetQuestionFragmentsArgs = {
  request?: InputMaybe<Input_Eureka_GetQuestionFragmentsRequest>;
};


export type QueryQueryPutNlQueryFeedbackArgs = {
  request?: InputMaybe<Input_Eureka_PutNlQueryFeedbackRequest>;
};


export type QueryQueryRelevanceFeedbackArgs = {
  request?: InputMaybe<Input_Eureka_RelevanceFeedbackRequest>;
};


export type QueryQueryRequestArgs = {
  request?: InputMaybe<Input_Eureka_SearchRequest>;
};


export type QueryQueryTenantProbeArgs = {
  request?: InputMaybe<Input_Eureka_RelevanceFeedbackRequest>;
};


export type QueryReportEventArgs = {
  id: Scalars['GUID'];
  userMessage?: InputMaybe<Scalars['String']>;
};


export type QueryResolveTokenQueryArgs = {
  request?: InputMaybe<Input_Eureka_Agent_ResolveTokenRequest>;
};


export type QueryRestapiV2__AnswerDataArgs = {
  batchNumber?: InputMaybe<Scalars['Int']>;
  batchSize?: InputMaybe<Scalars['Int']>;
  formatType?: InputMaybe<FormatData>;
  id: Scalars['String'];
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryRestapiV2__AnswerQuerySqlArgs = {
  id: Scalars['String'];
};


export type QueryRestapiV2__GetConnectionArgs = {
  id: Scalars['String'];
};


export type QueryRestapiV2__GetConnectionDatabaseArgs = {
  id: Scalars['String'];
};


export type QueryRestapiV2__GetCustomActionArgs = {
  id: Scalars['String'];
};


export type QueryRestapiV2__GetCustomActionAssociationArgs = {
  id: Scalars['String'];
};


export type QueryRestapiV2__GetGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryRestapiV2__GetHomeLiveboardArgs = {
  userId?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};


export type QueryRestapiV2__GetLogEventsArgs = {
  fromEpoch?: InputMaybe<Scalars['String']>;
  toEpoch?: InputMaybe<Scalars['String']>;
  topic: LogsValues;
};


export type QueryRestapiV2__GetObjectDetailArgs = {
  id: Array<InputMaybe<Scalars['String']>>;
  type: TsObjectDetailGet;
};


export type QueryRestapiV2__GetObjectHeaderArgs = {
  id: Scalars['String'];
  outputFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type: TsObjectGet;
};


export type QueryRestapiV2__GetObjectVisualizationHeaderArgs = {
  id: Scalars['String'];
};


export type QueryRestapiV2__GetOrgArgs = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryRestapiV2__GetPermissionForPrincipalArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryRestapiV2__GetPermissionOnObjectArgs = {
  id: Scalars['String'];
  includeDependent?: InputMaybe<Scalars['Boolean']>;
  type: SecurityType;
};


export type QueryRestapiV2__GetSchemasArgs = {
  database: Scalars['String'];
};


export type QueryRestapiV2__GetTableDetailsArgs = {
  database: Scalars['String'];
  schema?: InputMaybe<Scalars['String']>;
  table: Scalars['String'];
};


export type QueryRestapiV2__GetTablesArgs = {
  database: Scalars['String'];
  schema: Scalars['String'];
};


export type QueryRestapiV2__GetTagArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryRestapiV2__GetUserArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryRestapiV2__LiveboardDataArgs = {
  batchNumber?: InputMaybe<Scalars['Int']>;
  batchSize?: InputMaybe<Scalars['Int']>;
  formatType?: InputMaybe<FormatData>;
  id?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  runtimeFilter?: InputMaybe<Scalars['String']>;
  runtimeSort?: InputMaybe<Scalars['String']>;
  transientContent?: InputMaybe<Scalars['String']>;
  vizId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryRestapiV2__LiveboardQuerySqlArgs = {
  id: Scalars['String'];
  vizId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryRestapiV2__SearchCustomActionArgs = {
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryRestapiV2__SearchObjectDetailArgs = {
  dropQuestionDetails?: InputMaybe<Scalars['Boolean']>;
  id: Array<InputMaybe<Scalars['String']>>;
  showHidden?: InputMaybe<Scalars['Boolean']>;
  type: TsObjectDetailGet;
  version?: InputMaybe<Scalars['String']>;
};


export type QueryRestapiV2__SearchObjectHeaderArgs = {
  accessLevel?: InputMaybe<Array<InputMaybe<AccessLevelInput>>>;
  author?: InputMaybe<Array<InputMaybe<NameAndIdInput>>>;
  autoCreated?: InputMaybe<Scalars['Boolean']>;
  batchNumber?: InputMaybe<Scalars['Int']>;
  batchSize?: InputMaybe<Scalars['Int']>;
  favoriteFor?: InputMaybe<Array<InputMaybe<NameAndIdInput>>>;
  fetchId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lastModifiedBy?: InputMaybe<Array<InputMaybe<NameAndIdInput>>>;
  namePattern?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  outputFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  showHidden?: InputMaybe<Scalars['Boolean']>;
  skipId?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
  tag?: InputMaybe<Array<InputMaybe<TagNameAndIdInput>>>;
  type: TsObjectGet;
};


export type QueryRestapiV2__SearchQueryDataArgs = {
  batchNumber?: InputMaybe<Scalars['Int']>;
  batchSize?: InputMaybe<Scalars['Int']>;
  dataObjectId: Scalars['String'];
  formatType?: InputMaybe<FormatData>;
  offset?: InputMaybe<Scalars['Int']>;
  queryString: Scalars['String'];
};


export type QuerySendWelcomeEmailArgs = {
  id: Scalars['String'];
  message: Scalars['String'];
  resend: Scalars['Boolean'];
};


export type QueryShowLbDetailsArgs = {
  pinboardId: Scalars['String'];
};


export type QueryValidateAutoWorksheetJoinsArgs = {
  newRelationships?: InputMaybe<Array<RelationshipParams>>;
  suggestedRelationships?: InputMaybe<Array<Scalars['String']>>;
  tableIds: Array<Scalars['String']>;
};


export type QueryValidateEmailArgs = {
  emailId: Scalars['String'];
};

export type QueryBuilderSearchResult = IBachResponse & {
  __typename?: 'QueryBuilderSearchResult';
  id: BachSessionId;
  tokens?: Maybe<Array<RecognizedToken>>;
};

/**  Generated from tsProto.sage.auto_complete.v2.QueryCompletionType.E  */
export enum QueryCompletionType {
  NlCompletion = 'NL_COMPLETION',
  NlPrimingCompletion = 'NL_PRIMING_COMPLETION',
  PhraseHistoryOthers = 'PHRASE_HISTORY_OTHERS',
  PhraseHistorySelf = 'PHRASE_HISTORY_SELF',
  Rewrite = 'REWRITE',
  SearchHistoryOthers = 'SEARCH_HISTORY_OTHERS',
  SearchHistorySelf = 'SEARCH_HISTORY_SELF',
  Synonym = 'SYNONYM',
  Undefined = 'UNDEFINED'
}

export type QueryEntry = {
  __typename?: 'QueryEntry';
  constraints?: Maybe<Array<Maybe<TokenConstraint>>>;
};

export type QueryEntryInput = {
  constraints?: InputMaybe<Array<InputMaybe<TokenConstraintInput>>>;
};

export type QueryInput = {
  /** Array of answer column ids which form the part of query */
  query: Array<AnswerColumnInput>;
  queryParam?: InputMaybe<QueryParamInput>;
};

export type QueryParamInput = {
  /**
   * Client generate Cancel ID, that will be used to
   * cancel the data fetch request if required
   */
  cancelId?: InputMaybe<Scalars['String']>;
  /** Deadline in ms for data fetching */
  deadline?: InputMaybe<Scalars['Int']>;
  /** Pagination Param */
  pagination?: InputMaybe<DataPaginationParamsInput>;
};

export enum QueryTemplateBoundStateType {
  FilterColumn = 'FILTER_COLUMN',
  FilterValue = 'FILTER_VALUE'
}

/**
 * todo query templates also consist of queryEntry in addition to constraints
 * queryEntry is not used on frontend. Figure out if it is needed while making completions call
 */
export type QueryTemplateInput = {
  constraints: Array<InputMaybe<TokenConstraintInput>>;
  queryEntries: Array<InputMaybe<QueryEntryInput>>;
};

export enum QueryTemplateType {
  Attribute = 'ATTRIBUTE',
  AttributeColumn = 'ATTRIBUTE_COLUMN',
  ColumnOpFilter = 'COLUMN_OP_FILTER',
  CustomCalendar = 'CUSTOM_CALENDAR',
  ForEach = 'FOR_EACH',
  Geofilter = 'GEOFILTER',
  GrowthOf = 'GROWTH_OF',
  Having = 'HAVING',
  InFilter = 'IN_FILTER',
  Measure = 'MEASURE',
  MeasureColumn = 'MEASURE_COLUMN',
  NoSkill = 'NO_SKILL',
  SimpleOpAttributeFilter = 'SIMPLE_OP_ATTRIBUTE_FILTER',
  SimpleOpMeasureFilter = 'SIMPLE_OP_MEASURE_FILTER',
  SingleColumnVersus = 'SINGLE_COLUMN_VERSUS',
  SortBy = 'SORT_BY',
  TimeBucket = 'TIME_BUCKET',
  TimeFilters = 'TIME_FILTERS',
  TopBottom = 'TOP_BOTTOM',
  Undefined = 'UNDEFINED',
  Value1VsValue2 = 'VALUE1_VS_VALUE2'
}

/** This is the transform that is send as input to applySuggestion API as well defined as QueryTransformInput */
export type QueryTransform = {
  __typename?: 'QueryTransform';
  addEnclosingParenthesis?: Maybe<Scalars['Boolean']>;
  columnGuid?: Maybe<Scalars['GUID']>;
  /** Predicate operator to be applied by the transform. */
  op?: Maybe<FilterTypes>;
  /** New time bucket transformation */
  timeBucket?: Maybe<ColumnTimeBucket>;
  /** Token out column guid - used in replace tab to remove a column */
  tokenOutputGuid?: Maybe<Scalars['GUID']>;
  type: QueryTransformType;
  /**
   * Argument to the predicate @op.
   * Must be specified with transforms that apply an operator.
   */
  value?: Maybe<Scalars['String']>;
  /**
   * Additional argument to binary operator like "between".
   * @constraints: Must be specified with transforms that apply a binary operator.
   */
  value2?: Maybe<Scalars['String']>;
};

export type QueryTransformInput = {
  addEnclosingParenthesis?: InputMaybe<Scalars['Boolean']>;
  columnGuid?: InputMaybe<Scalars['String']>;
  op?: InputMaybe<FilterTypes>;
  timeBucket?: InputMaybe<ColumnTimeBucket>;
  tokenOutputGuid?: InputMaybe<Scalars['String']>;
  type: QueryTransformType;
  value?: InputMaybe<Scalars['String']>;
  value2?: InputMaybe<Scalars['String']>;
};

/**
 * we need all values in enum, otherwise we'll get errors like:
 * [Error: QueryTransformType.ADD_SORT_COLUMN was defined in resolvers, but enum is not in schema]
 */
export enum QueryTransformType {
  AddAttribute = 'ADD_ATTRIBUTE',
  AddAutoResolvedDateBucketsToTokens = 'ADD_AUTO_RESOLVED_DATE_BUCKETS_TO_TOKENS',
  AddColumn = 'ADD_COLUMN',
  AddEmptyGroupBy = 'ADD_EMPTY_GROUP_BY',
  AddFilter = 'ADD_FILTER',
  AddHavingFilter = 'ADD_HAVING_FILTER',
  AddInFilter = 'ADD_IN_FILTER',
  AddMeasure = 'ADD_MEASURE',
  AddPredicateFilter = 'ADD_PREDICATE_FILTER',
  AddSortColumn = 'ADD_SORT_COLUMN',
  AddTimeBucketQualifier = 'ADD_TIME_BUCKET_QUALIFIER',
  AddVersus = 'ADD_VERSUS',
  ChangeAggregation = 'CHANGE_AGGREGATION',
  ChangeTimeBucket = 'CHANGE_TIME_BUCKET',
  DeprecatedAddFormula = 'DEPRECATED_ADD_FORMULA',
  DeprecatedAddTimeBucket = 'DEPRECATED_ADD_TIME_BUCKET',
  DeprecatedRemoveFormula = 'DEPRECATED_REMOVE_FORMULA',
  DeprecatedRemoveTimeBucket = 'DEPRECATED_REMOVE_TIME_BUCKET',
  DrillDown = 'DRILL_DOWN',
  EditFilter = 'EDIT_FILTER',
  NumTransforms = 'NUM_TRANSFORMS',
  RemoveAllDateRangeFiltersForColumn = 'REMOVE_ALL_DATE_RANGE_FILTERS_FOR_COLUMN',
  RemoveAllFiltersForColumn = 'REMOVE_ALL_FILTERS_FOR_COLUMN',
  RemoveAllHavingFilters = 'REMOVE_ALL_HAVING_FILTERS',
  RemoveAllHavingFiltersByAggregate = 'REMOVE_ALL_HAVING_FILTERS_BY_AGGREGATE',
  RemoveAllHavingFiltersByColumn = 'REMOVE_ALL_HAVING_FILTERS_BY_COLUMN',
  RemoveAllPhrasesByColumn = 'REMOVE_ALL_PHRASES_BY_COLUMN',
  RemoveAllSortPhrases = 'REMOVE_ALL_SORT_PHRASES',
  RemoveColumn = 'REMOVE_COLUMN',
  RemoveFilter = 'REMOVE_FILTER',
  RemoveHavingFilter = 'REMOVE_HAVING_FILTER',
  RemoveInFilter = 'REMOVE_IN_FILTER',
  RemoveNonFilterPhrases = 'REMOVE_NON_FILTER_PHRASES',
  RemovePredicateFilter = 'REMOVE_PREDICATE_FILTER',
  RemoveTimeBucketQualifier = 'REMOVE_TIME_BUCKET_QUALIFIER',
  RemoveVersus = 'REMOVE_VERSUS'
}

export type QueryVisualizerSpecRequestContent = {
  complete?: InputMaybe<Scalars['Boolean']>;
  header?: InputMaybe<Scalars['JSON']>;
  incompleteDetail?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  reportContent?: InputMaybe<QueryVizReportContent>;
  type?: InputMaybe<Scalars['String']>;
};

export type QueryVizReportContent = {
  sheets: Array<Sheet>;
};

export type RAnalysisViz = Visualization & {
  __typename?: 'RAnalysisViz';
  columnBinding?: Maybe<Array<Maybe<ColumnBindingOutput>>>;
  data?: Maybe<Scalars['JSON']>;
  /** ----------- Visualization Common Fields ----------- */
  id: Scalars['ID'];
  isCustomTitle?: Maybe<Scalars['Boolean']>;
  rOutputType?: Maybe<ROutputTypeEnum>;
  /** ----------- RAnalysis Specific Fields ----------- */
  rScript?: Maybe<Scalars['String']>;
  rTemplateId?: Maybe<Scalars['String']>;
  sortInfo?: Maybe<Array<Maybe<ColumnSortInfo>>>;
  title?: Maybe<Scalars['String']>;
  vizProp?: Maybe<RAnalysisVizProps>;
};


export type RAnalysisVizDataArgs = {
  canceId?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['Int']>;
  pagination?: InputMaybe<DataPaginationParamsInput>;
};

export type RAnalysisVizProps = {
  __typename?: 'RAnalysisVizProps';
  rOutputType?: Maybe<Scalars['String']>;
};

export enum ROutputTypeEnum {
  Csv = 'CSV',
  Png = 'PNG'
}

export type RTemplateCreateDetails = {
  /** R template for  */
  content: Content;
  /** description of R template */
  description?: InputMaybe<Scalars['String']>;
  /** name of R template */
  name: Scalars['String'];
};

/** Return type for getRTemplateById api call */
export type RTemplateDetails = {
  __typename?: 'RTemplateDetails';
  /** description of R template */
  description?: Maybe<Scalars['String']>;
  /** Id of R template */
  id?: Maybe<Scalars['GUID']>;
  /** name of R template */
  name?: Maybe<Scalars['String']>;
  /** R template for  */
  script?: Maybe<Scalars['String']>;
};

export type RTemplateOverwriteDetails = {
  /** R template for  */
  content: Content;
  /** description of R template */
  description?: InputMaybe<Scalars['String']>;
  /** Id of R template */
  id: Scalars['GUID'];
  /** name of R template */
  name: Scalars['String'];
};

/** Return type for getRTemplateList api call */
export type RTemplateSummary = {
  __typename?: 'RTemplateSummary';
  /** description of R template */
  description?: Maybe<Scalars['String']>;
  /** Id of R template */
  id?: Maybe<Scalars['GUID']>;
  /** name of R template */
  name?: Maybe<Scalars['String']>;
};

export type Range = {
  __typename?: 'Range';
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
};

export type RangeParam = {
  __typename?: 'RangeParam';
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
};

export type Receiver = {
  displayName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  principalType?: InputMaybe<ReceiverType>;
};

export enum ReceiverType {
  Email = 'EMAIL',
  Group = 'GROUP',
  User = 'USER'
}

export type RecognizedToken = {
  __typename?: 'RecognizedToken';
  autoGeneratedSynonym?: Maybe<Scalars['Boolean']>;
  autoInsertedSpace?: Maybe<Scalars['Boolean']>;
  canBeExtended?: Maybe<Scalars['Boolean']>;
  canEditJoinPath?: Maybe<Scalars['Boolean']>;
  canonicalForm?: Maybe<Scalars['String']>;
  dataType?: Maybe<FalconDataType>;
  deprecatedTokenIdx?: Maybe<Scalars['Int']>;
  explicitJoinPathEdit?: Maybe<Scalars['Boolean']>;
  formulaId?: Maybe<Scalars['String']>;
  guid?: Maybe<Scalars['GUID']>;
  hasSpaceAfter?: Maybe<Scalars['Boolean']>;
  idxInPrevQuery?: Maybe<Scalars['Int']>;
  inconsistentJoinPaths?: Maybe<Scalars['Boolean']>;
  isAutoDisambiguated?: Maybe<Scalars['Boolean']>;
  isSkipped?: Maybe<Scalars['Boolean']>;
  placeholderText?: Maybe<Scalars['String']>;
  rankingScore?: Maybe<Scalars['Long']>;
  reResolve?: Maybe<Scalars['Boolean']>;
  requiresDelimiters?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  tokenMetadata?: Maybe<RecognizedTokenMetadata>;
  twiddlerRank?: Maybe<Scalars['Int']>;
  typeEnum?: Maybe<RecognizedTokenType>;
  valueMatch?: Maybe<Scalars['Boolean']>;
  worksheetColumnGuid?: Maybe<Scalars['GUID']>;
};

export type RecognizedTokenInput = {
  autoGeneratedSynonym?: InputMaybe<Scalars['Boolean']>;
  autoInsertedSpace?: InputMaybe<Scalars['Boolean']>;
  canBeExtended?: InputMaybe<Scalars['Boolean']>;
  canEditJoinPath?: InputMaybe<Scalars['Boolean']>;
  canonicalForm?: InputMaybe<Scalars['String']>;
  dataType?: InputMaybe<FalconDataType>;
  deprecatedTokenIdx?: InputMaybe<Scalars['Int']>;
  explicitJoinPathEdit?: InputMaybe<Scalars['Boolean']>;
  formulaId?: InputMaybe<Scalars['String']>;
  guid?: InputMaybe<Scalars['GUID']>;
  hasSpaceAfter?: InputMaybe<Scalars['Boolean']>;
  idxInPrevQuery?: InputMaybe<Scalars['Int']>;
  inconsistentJoinPaths?: InputMaybe<Scalars['Boolean']>;
  isAutoDisambiguated?: InputMaybe<Scalars['Boolean']>;
  isSkipped?: InputMaybe<Scalars['Boolean']>;
  placeholderText?: InputMaybe<Scalars['String']>;
  rankingScore?: InputMaybe<Scalars['Long']>;
  reResolve?: InputMaybe<Scalars['Boolean']>;
  requiresDelimiters?: InputMaybe<Scalars['Boolean']>;
  token?: InputMaybe<Scalars['String']>;
  tokenMetadata?: InputMaybe<RecognizedTokenMetadataInput>;
  twiddlerRank?: InputMaybe<Scalars['Int']>;
  typeEnum?: InputMaybe<RecognizedTokenType>;
  valueMatch?: InputMaybe<Scalars['Boolean']>;
  worksheetColumnGuid?: InputMaybe<Scalars['GUID']>;
};

export type RecognizedTokenMetadata = {
  __typename?: 'RecognizedTokenMetadata';
  deprecatedTableGuid?: Maybe<Scalars['GUID']>;
  deprecatedTableName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  rootTables?: Maybe<Array<Maybe<SageEntityHeader>>>;
  table?: Maybe<SageEntityHeader>;
};

export type RecognizedTokenMetadataInput = {
  deprecatedTableGuid?: InputMaybe<Scalars['GUID']>;
  deprecatedTableName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  rootTables?: InputMaybe<Array<InputMaybe<SageEntityHeaderInput>>>;
  table?: InputMaybe<SageEntityHeaderInput>;
};

/**  Generated from tsProto.sage.TokenType.E  */
export enum RecognizedTokenType {
  Any = 'ANY',
  Attribute = 'ATTRIBUTE',
  Bool = 'BOOL',
  Calendar = 'CALENDAR',
  Constant = 'CONSTANT',
  Date = 'DATE',
  DateBucket = 'DATE_BUCKET',
  Delimiter = 'DELIMITER',
  Double = 'DOUBLE',
  EndFsm = 'END_FSM',
  Formula = 'FORMULA',
  FunctionName = 'FUNCTION_NAME',
  IncludeFsm = 'INCLUDE_FSM',
  Integer = 'INTEGER',
  Keyword = 'KEYWORD',
  MaxType = 'MAX_TYPE',
  Measure = 'MEASURE',
  NamedPhrase = 'NAMED_PHRASE',
  Operator = 'OPERATOR',
  Parameter = 'PARAMETER',
  PositiveInt = 'POSITIVE_INT',
  PrefixValue = 'PREFIX_VALUE',
  SkipToken = 'SKIP_TOKEN',
  StopWord = 'STOP_WORD',
  String = 'STRING',
  SubstringValue = 'SUBSTRING_VALUE',
  SuffixValue = 'SUFFIX_VALUE',
  TemplateArg = 'TEMPLATE_ARG',
  Time = 'TIME',
  Unrecognized = 'UNRECOGNIZED',
  Value = 'VALUE',
  Year = 'YEAR'
}

export enum RedshiftConnectionStatus {
  Active = 'Active',
  ConnectionFailure = 'ConnectionFailure',
  Inactive = 'Inactive',
  RuntimeFailure = 'RuntimeFailure'
}

export type RelatedColumn = {
  destinationColumnGuid?: InputMaybe<Scalars['String']>;
  sourceColumnGuid?: InputMaybe<Scalars['String']>;
};

export type RelationshipDetails = {
  __typename?: 'RelationshipDetails';
  dataSourceInfo?: Maybe<Metadata>;
  destinationColumnsInfo?: Maybe<Array<Maybe<Column>>>;
  destinationTable?: Maybe<Scalars['String']>;
  destinationTableInfo?: Maybe<RelationshipSourceDetails>;
  isEmbraceMode?: Maybe<Scalars['Boolean']>;
  isOneToOneJoin?: Maybe<Scalars['Boolean']>;
  joinType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  relationshipJson?: Maybe<Scalars['JSON']>;
  sourceColumns?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceColumnsInfo?: Maybe<Array<Maybe<Column>>>;
  sourceTable?: Maybe<Scalars['String']>;
  sourceTableInfo?: Maybe<RelationshipSourceDetails>;
  targetColumns?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type RelationshipParams = {
  /** Relationship description */
  description?: InputMaybe<Scalars['String']>;
  /** Select destination columns ids */
  destColumnIds: Array<Scalars['String']>;
  /** Destination table ID */
  destTableId: Scalars['String'];
  /** Cardinality */
  isOneToOneJoin?: InputMaybe<Scalars['Boolean']>;
  /** Join type */
  joinType: Scalars['String'];
  /** Relationship name */
  name: Scalars['String'];
  /** Boolean to save relationship */
  saveRelationship?: InputMaybe<Scalars['Boolean']>;
  /** Select source columns ids */
  sourceColumnIds: Array<Scalars['String']>;
  /** Source table ID */
  sourceTableId: Scalars['String'];
};

export type RelationshipResponse = {
  __typename?: 'RelationshipResponse';
  relationshipJson?: Maybe<Array<Maybe<Scalars['String']>>>;
  validRelationship?: Maybe<Scalars['Boolean']>;
};

export type RelationshipSourceDetails = {
  __typename?: 'RelationshipSourceDetails';
  database: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type ReplaceableColPropertiesList = {
  __typename?: 'ReplaceableColPropertiesList';
  replaceableColProperties?: Maybe<Array<SelectedColumnProperties>>;
  type: ReplaceableColumnType;
};

export enum ReplaceableColumnType {
  Attribute = 'ATTRIBUTE',
  DateBucket = 'DATE_BUCKET',
  DateColumn = 'DATE_COLUMN',
  Measure = 'MEASURE'
}

export type RepoConfigResponse = {
  __typename?: 'RepoConfigResponse';
  /** Branches that have been pulled in local repository */
  branches?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Name of the default remote branch */
  default_branch?: Maybe<Scalars['String']>;
  /** Maintain mapping of guid for the deployment to an instance */
  enable_guid_mapping?: Maybe<Scalars['Boolean']>;
  /** Name of the branch where file containing guid mapping should be maintained */
  guid_mapping_branch_name?: Maybe<Scalars['String']>;
  /** Details of the organization */
  org?: Maybe<Org>;
  /** Alias name associated with the remote repository */
  remote_alias?: Maybe<Scalars['String']>;
  /** Remote repository URL configured */
  repository_url?: Maybe<Scalars['String']>;
  /** Username to authenticate connection to vcs */
  username?: Maybe<Scalars['String']>;
};

export enum ReportFormat {
  Csv = 'CSV',
  Pdf = 'PDF',
  Png = 'PNG',
  Xlsx = 'XLSX'
}

export type RequestVerificationInput = {
  grantAccess?: InputMaybe<Scalars['Boolean']>;
  message?: InputMaybe<Scalars['String']>;
  pinboardId: Scalars['String'];
  requesterGuid: Scalars['String'];
  selectedVerifiers?: InputMaybe<Array<InputMaybe<VerifierTypeInput>>>;
};

/** Reset connection request response */
export type ResetConnectionResponse = {
  __typename?: 'ResetConnectionResponse';
  message?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['String']>;
};

export type ResourceOptions = {
  queryTimeout?: InputMaybe<Scalars['Float']>;
};

export type RoleData = {
  __typename?: 'RoleData';
  /** description of the role */
  description?: Maybe<Scalars['String']>;
  /** id of the role */
  id?: Maybe<Scalars['String']>;
  /** name of the role */
  name?: Maybe<Scalars['String']>;
  /** privileges of the role */
  privileges?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** if role is readOnly */
  readOnly?: Maybe<Scalars['Boolean']>;
};

export type RoleListData = {
  __typename?: 'RoleListData';
  isLastBatch?: Maybe<Scalars['Boolean']>;
  roles?: Maybe<Array<Maybe<AllRoleData>>>;
};

export type Role_DataResponse = {
  __typename?: 'Role_DataResponse';
  Data?: Maybe<RoleData>;
  Error?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['Int']>;
};

export type Role__ListInput = {
  batchsize?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  pattern?: InputMaybe<Scalars['String']>;
  sortascending?: InputMaybe<Scalars['Boolean']>;
};

/** types for usage of row data are defined */
export type RowUsageStats = {
  __typename?: 'RowUsageStats';
  dataObjects?: Maybe<Array<Maybe<DataObjectInfo>>>;
  isLastBatch: Scalars['Boolean'];
  lastUpdated?: Maybe<Scalars['Long']>;
  rowLimit: Scalars['Long'];
  totalRowCount: Scalars['Long'];
};

export type RuntimeFilterInput = {
  columnName: Scalars['String'];
  filterType: FilterTypes;
  value: Array<Scalars['String']>;
};

export type RuntimeParameterInput = {
  overrideValue: Scalars['String'];
  parameterName: Scalars['String'];
};

export type RuntimeSortInput = {
  columnName: Scalars['String'];
  isAscending: Scalars['Boolean'];
};

export enum SfdcOperationTypes {
  Insert = 'INSERT',
  Upsert = 'UPSERT'
}

export type SqlAnswerEditSession = IBachResponse & {
  __typename?: 'SQLAnswerEditSession';
  id: BachSessionId;
};

export enum SageColumnAggTypes {
  AggregateDistinct = 'AGGREGATE_DISTINCT',
  Average = 'AVERAGE',
  Count = 'COUNT',
  Max = 'MAX',
  Median = 'MEDIAN',
  Min = 'MIN',
  None = 'NONE',
  Percentile = 'PERCENTILE',
  Rank = 'RANK',
  RankPercentile = 'RANK_PERCENTILE',
  StdDeviation = 'STD_DEVIATION',
  Sum = 'SUM',
  UniqueCount = 'UNIQUE_COUNT',
  Variance = 'VARIANCE'
}

/** Column type (sage.columnType.E) */
export enum SageColumnType {
  Attribute = 'ATTRIBUTE',
  Measure = 'MEASURE',
  Unknown = 'UNKNOWN'
}

export type SageCompletion = {
  __typename?: 'SageCompletion';
  /**
   * Whether the completion completions the current phrase. If not, we will continue editing the
   * current phrase even after selecting this completion, because it would still be incomplete.
   */
  completesCurrentPhrase: Scalars['Boolean'];
  /** Whether the completion should be disabled and non-selectable (used in Search Assist) */
  isDisabled: Scalars['Boolean'];
  /** Whether the completion is a history completion */
  isHistory: Scalars['Boolean'];
  /** Whether the completion is a synonym completion */
  isSynonym: Scalars['Boolean'];
  /**
   * Number of tokens from the start of the query to include when rebuilding the query after selecting
   * this completion. We rebuild the query by taking nPrefixTokens tokens from the start of the query,
   * inserting the completion tokens after that, and taking nSuffixTokens tokens from the end of the
   * query, to give us the final new query.
   */
  nPrefixTokens: Scalars['Int'];
  /**
   * Number of tokens from the end of the query to include when rebuilding the query after selecting
   * this completion. Refer to the comment on nPrefixTokens for more information.
   */
  nSuffixTokens: Scalars['Int'];
  /**
   * Whether the completion starts a new phrase. If not, it will extend the current or previous phrase
   * (if one exists).
   */
  startsNewPhrase: Scalars['Boolean'];
  /**
   * Token contents of the completion. Upon selection, these are the tokens that are inserted into the
   * sage query.
   */
  tokens: Array<SageToken>;
  /** Type of completion */
  type: QueryCompletionType;
};

/** Information about completions */
export type SageCompletionInfo = {
  __typename?: 'SageCompletionInfo';
  /** Index of the token in the response for which these completions were generated */
  completionTokenIdx: Scalars['Int'];
  /** List of completions */
  completions?: Maybe<Array<SageCompletion>>;
  /** Whether it is not possible to generate completions at the given caret position */
  completionsNotPossible: Scalars['Boolean'];
  /** Whether more completions are available beyond what is returned in this data */
  hasMore: Scalars['Boolean'];
};

export type SageEntityHeader = {
  __typename?: 'SageEntityHeader';
  created?: Maybe<Scalars['Long']>;
  description?: Maybe<Scalars['String']>;
  guid?: Maybe<Scalars['GUID']>;
  indexVersion?: Maybe<Scalars['Long']>;
  modified?: Maybe<Scalars['Long']>;
  name?: Maybe<Scalars['String']>;
};

export type SageEntityHeaderInput = {
  created?: InputMaybe<Scalars['Long']>;
  description?: InputMaybe<Scalars['String']>;
  guid?: InputMaybe<Scalars['GUID']>;
  indexVersion?: InputMaybe<Scalars['Long']>;
  modified?: InputMaybe<Scalars['Long']>;
  name?: InputMaybe<Scalars['String']>;
};

/**  Generated from tsProto.sage.auto_complete.v2.ErrorCode.E  */
export enum SageErrorCodeType {
  AmbiguousToken = 'AMBIGUOUS_TOKEN',
  BadRecognizedTokens = 'BAD_RECOGNIZED_TOKENS',
  BadTokenSequence = 'BAD_TOKEN_SEQUENCE',
  Cancelled = 'CANCELLED',
  Failure = 'FAILURE',
  ForbiddenWord = 'FORBIDDEN_WORD',
  InconsistentJoinPath = 'INCONSISTENT_JOIN_PATH',
  IncrementalRequestNotApplicable = 'INCREMENTAL_REQUEST_NOT_APPLICABLE',
  InvalidColumn = 'INVALID_COLUMN',
  InvalidJoinPath = 'INVALID_JOIN_PATH',
  InvalidRequest = 'INVALID_REQUEST',
  InvalidTable = 'INVALID_TABLE',
  InvalidTransform = 'INVALID_TRANSFORM',
  JoinPathAmbiguity = 'JOIN_PATH_AMBIGUITY',
  LessonPlanUpgraded = 'LESSON_PLAN_UPGRADED',
  LessonPlanUpgradeFailed = 'LESSON_PLAN_UPGRADE_FAILED',
  LlmDisabled = 'LLM_DISABLED',
  LlmFormat = 'LLM_FORMAT',
  LlmNotEnoughQuestions = 'LLM_NOT_ENOUGH_QUESTIONS',
  LlmNotFoundInPensieve = 'LLM_NOT_FOUND_IN_PENSIEVE',
  LlmPensieveWriteError = 'LLM_PENSIEVE_WRITE_ERROR',
  LlmUnavailable = 'LLM_UNAVAILABLE',
  NotFound = 'NOT_FOUND',
  NotReady = 'NOT_READY',
  NoJoinPath = 'NO_JOIN_PATH',
  NoMatch = 'NO_MATCH',
  PermissionDenied = 'PERMISSION_DENIED',
  QueryTemplateToTemplateEntryMismatch = 'QUERY_TEMPLATE_TO_TEMPLATE_ENTRY_MISMATCH',
  RelationshipGraphHasCycles = 'RELATIONSHIP_GRAPH_HAS_CYCLES',
  Success = 'SUCCESS',
  TimeOutError = 'TIME_OUT_ERROR',
  UnsupportedLanguage = 'UNSUPPORTED_LANGUAGE',
  UserGroupMaskNotSet = 'USER_GROUP_MASK_NOT_SET'
}

export enum SageFeatureFlag {
  AutoResolveJoinAmbiguity = 'AUTO_RESOLVE_JOIN_AMBIGUITY',
  DisableApproximateMatches = 'DISABLE_APPROXIMATE_MATCHES',
  DisableDataBasedAutoBucketing = 'DISABLE_DATA_BASED_AUTO_BUCKETING',
  DisableFollowUpSuggestions = 'DISABLE_FOLLOW_UP_SUGGESTIONS',
  DisableObjectSearch = 'DISABLE_OBJECT_SEARCH',
  DisableSearchHistoryLookup = 'DISABLE_SEARCH_HISTORY_LOOKUP',
  DisableTokenization = 'DISABLE_TOKENIZATION',
  DisableUbr = 'DISABLE_UBR',
  DisableUbrFeedbackLookup = 'DISABLE_UBR_FEEDBACK_LOOKUP',
  EnableDataBasedAutoBucketing = 'ENABLE_DATA_BASED_AUTO_BUCKETING',
  EnableNlpTokenizer = 'ENABLE_NLP_TOKENIZER',
  EnableOutOfScopeMatches = 'ENABLE_OUT_OF_SCOPE_MATCHES',
  EnableRequestProfiling = 'ENABLE_REQUEST_PROFILING',
  EnableSearchHistory = 'ENABLE_SEARCH_HISTORY',
  LookupEnlitePreferredColumns = 'LOOKUP_ENLITE_PREFERRED_COLUMNS',
  LookupOnlyColumns = 'LOOKUP_ONLY_COLUMNS',
  NumFeatureFlags = 'NUM_FEATURE_FLAGS',
  ShowDebugInfo = 'SHOW_DEBUG_INFO',
  SingleTokenCompletionsOnly = 'SINGLE_TOKEN_COMPLETIONS_ONLY',
  UseWhiteSpaceInfo = 'USE_WHITE_SPACE_INFO',
  WriteRequestSnapshot = 'WRITE_REQUEST_SNAPSHOT'
}

/**  Generated from tsProto.sage.JoinProto.JoinType  */
export enum SageJoinType {
  Cross = 'CROSS',
  FullOuter = 'FULL_OUTER',
  Inner = 'INNER',
  LeftOuter = 'LEFT_OUTER',
  RightOuter = 'RIGHT_OUTER'
}

/** Information about an individual sage phrase */
export type SagePhrase = {
  __typename?: 'SagePhrase';
  /**
   * Whether the phrase contains any ambiguous tokens (such as auto-disambiguations, or join path
   * ambiguities)
   */
  isAmbiguous: Scalars['Boolean'];
  /** Whether the phrase is complete */
  isComplete: Scalars['Boolean'];
  /** List of tokens contained within this phrase */
  tokens?: Maybe<Array<SageToken>>;
  /** Type of phrase */
  type: PhraseType;
};

/** Information about an issue in the sage query (typically stemming from an individual problem token). */
export type SageQueryIssue = {
  __typename?: 'SageQueryIssue';
  /** Errorcode denoting the type of error occurred. It is an error code from the backend */
  errorCode?: Maybe<SageErrorCodeType>;
  /**
   * User-facing string describing the issue (pre-translated for locale). Only present if type is
   * OTHER_BACKEND_ISSUE, otherwise we construct the message on blink side.
   */
  message?: Maybe<Scalars['String']>;
  /** Severity of the issue */
  severity: SageQueryIssueSeverity;
  /** Index of the token in the query which contains the issue */
  tokenIdx: Scalars['Int'];
  /** Type of issue */
  type: SageQueryIssueType;
};

/** Different severity levels of a query issue */
export enum SageQueryIssueSeverity {
  Error = 'ERROR',
  Warning = 'WARNING'
}

/** Different types of query issues which can arise */
export enum SageQueryIssueType {
  /**
   * Sage backend auto-disambiguated a token, and we want to warn the user about that. This type of
   * issue is generated purely on our end; sage backend does not consider this an issue.
   */
  AutoDisambiguation = 'AUTO_DISAMBIGUATION',
  /**
   * There is a join path ambiguity which requires manual resolution. At this time we are not
   * supporting join path resolution in the sage bar, so we will display this as an error state.
   */
  JoinPathResolutionRequired = 'JOIN_PATH_RESOLUTION_REQUIRED',
  /** Any other type of issue that sage backend reported */
  OtherBackendIssue = 'OTHER_BACKEND_ISSUE'
}

/** Flags which can be passed to sage backend during a sage request */
export enum SageRequestFlag {
  DoBestEffortTokenization = 'DoBestEffortTokenization',
  ExactMatchCompletionsOnly = 'ExactMatchCompletionsOnly'
}

/** Response object for all sage-search-related requests */
export type SageSearchResponse = {
  __typename?: 'SageSearchResponse';
  /** Information about completions for the current caret position */
  completions?: Maybe<SageCompletionInfo>;
  /** A hash string which uniquely indentifies the current state of the query tokens */
  hashKey: Scalars['String'];
  /** Autocomplete session information */
  id: AcSession;
  /** List of phrases in the query */
  phrases: Array<SagePhrase>;
  /**
   * Information about a problematic token in the sage query. If there are multiple issues, this will
   * contain only the most prominent one, and upon resolving it, we will send the next issue.
   */
  queryIssue?: Maybe<SageQueryIssue>;
  /** Search Assist information */
  searchAssistResponse?: Maybe<SearchAssistResponse>;
};

/** Information about an individual sage/formula token */
export type SageToken = {
  __typename?: 'SageToken';
  /** Information about the data column which this token is derived from */
  column?: Maybe<ColumnInfo>;
  /** Data type of the token (eg char, date) */
  dataType: FalconDataType;
  /**
   * Whether the token has a space after it. Only one of this or trailingWhitespace should be
   * populated.
   */
  hasSpaceAfter: Scalars['Boolean'];
  /** Whether this token can be extended beyond its current form (eg numeric constants) */
  isExtensible?: Maybe<Scalars['Boolean']>;
  /** Whether this token is derived from a cohort column */
  isFromCohort: Scalars['Boolean'];
  /** Whether this token is derived from a formula */
  isFromFormula: Scalars['Boolean'];
  /** The JSON-serialized full RecognizedToken proto structure */
  recognizedTokenJson: Scalars['JSON'];
  /** Information about the data source which this token is derived from */
  source?: Maybe<SourceInfo>;
  /** Text of the token */
  text: Scalars['String'];
  /**
   * The string of all whitespace characters at the end of the token. Only one of this or
   * hasSpaceAfter should be populated.
   */
  trailingWhitespace?: Maybe<Scalars['String']>;
  /** Type of the token (eg measure, attribute) */
  type: RecognizedTokenType;
};

/** Information about an individual sage/formula token in a request */
export type SageTokenInput = {
  /**
   * Whether the token has a space after it. Only one of this or trailingWhitespace should be
   * populated.
   */
  hasSpaceAfter?: InputMaybe<Scalars['Boolean']>;
  /** Token idx in previous query */
  previousQueryIdx?: InputMaybe<Scalars['Int']>;
  /**
   * The JSON-serialized full RecognizedToken proto structure. This is not expected to be updated as
   * per the other fields in the request - prism will apply any updates as needed.
   */
  recognizedTokenJson?: InputMaybe<Scalars['JSON']>;
  /** Text of the token */
  text: Scalars['String'];
  /**
   * The string of all whitespace characters at the end of the token. Only one of this or
   * hasSpaceAfter should be populated.
   */
  trailingWhitespace?: InputMaybe<Scalars['String']>;
};

export type Saml_ConnectionListResponse = {
  __typename?: 'Saml_ConnectionListResponse';
  Data?: Maybe<Saml_ListResponse>;
  Status?: Maybe<Scalars['String']>;
};

export type Saml_DeleteConnData = {
  clientId?: InputMaybe<Scalars['String']>;
  defaultHeaders: DefaultHeaders;
  id?: InputMaybe<Scalars['String']>;
};

export type Saml_ListResponse = {
  __typename?: 'Saml_ListResponse';
  samlList?: Maybe<Array<Maybe<Admin__SamlResponse>>>;
};

export type Saml_MapAttributeProperties = {
  clientId?: InputMaybe<Scalars['String']>;
  defaultHeaders: DefaultHeaders;
  id?: InputMaybe<Scalars['String']>;
};

export type Saml_MetadataProperties = {
  clientId?: InputMaybe<Scalars['String']>;
  defaultHeaders: DefaultHeaders;
  id?: InputMaybe<Scalars['String']>;
};

export type Saml_StateUpdate = {
  clientId?: InputMaybe<Scalars['String']>;
  defaultHeaders: DefaultHeaders;
  id?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
};

export type Saml_StatusResponse = {
  __typename?: 'Saml_StatusResponse';
  Status?: Maybe<Scalars['String']>;
};

export type Saml_UpdateAttributeMapping = {
  clientId?: InputMaybe<Scalars['String']>;
  defaultHeaders: DefaultHeaders;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Saml__MapAttributeGetResponse = {
  __typename?: 'Saml__MapAttributeGetResponse';
  Data?: Maybe<MapAttributeData>;
  Error?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['String']>;
};

export type Saml__MetaDataInfo = {
  __typename?: 'Saml__MetaDataInfo';
  acsUrl?: Maybe<Scalars['String']>;
  audienceUri?: Maybe<Scalars['String']>;
};

export type Saml__MetaDataInfoResponse = {
  __typename?: 'Saml__MetaDataInfoResponse';
  Data?: Maybe<Saml__MetaDataInfo>;
  Error?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['String']>;
};

export type SampleValue = {
  __typename?: 'SampleValue';
  columnId?: Maybe<Scalars['String']>;
  status?: Maybe<SampleValueErrorStatus>;
  values?: Maybe<SampleValues>;
};

export type SampleValueDateRange = {
  __typename?: 'SampleValueDateRange';
  highEpoch?: Maybe<Scalars['Float']>;
  lowEpoch?: Maybe<Scalars['Float']>;
};

export type SampleValueErrorStatus = {
  __typename?: 'SampleValueErrorStatus';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type SampleValues = {
  __typename?: 'SampleValues';
  dateRange?: Maybe<SampleValueDateRange>;
  stringValue?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SaveAsSqlViewResponse = {
  __typename?: 'SaveAsSqlViewResponse';
  /** ID of view created inside the Sql view */
  id: BachSessionId;
  viewId: Scalars['GUID'];
};

export type SaveAsTransform = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type SaveAsViewResponse = {
  __typename?: 'SaveAsViewResponse';
  viewId: Scalars['GUID'];
};

export type SaveCohortResponse = {
  __typename?: 'SaveCohortResponse';
  cohortAnswerId: Scalars['GUID'];
  id: BachSessionId;
};

export type SaveParameterTransform = {
  generateResponse: Scalars['Boolean'];
  parameter: ParameterInput;
  worksheetId: Scalars['GUID'];
};

export type SavePersonalisedViewResponse = {
  __typename?: 'SavePersonalisedViewResponse';
  /**
   * ID of personalised view.
   * This would be the ID of the new personalised view.
   */
  personalisedViewId: Scalars['GUID'];
};

export type ScheduleDetailsResult = {
  __typename?: 'ScheduleDetailsResult';
  connection_id?: Maybe<Scalars['String']>;
  schedule?: Maybe<ScheduleOptionResult>;
  status?: Maybe<Scalars['Boolean']>;
};

export type ScheduleExportRequest = {
  objectType?: InputMaybe<ObjectType>;
  pdfParams?: InputMaybe<SchedulePdfParams>;
  pinboardParams?: InputMaybe<SchedulePinboardParams>;
};

export enum ScheduleOps {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export type SchedulePageFooterParams = {
  includeLogo?: InputMaybe<Scalars['Boolean']>;
  includePageNumber?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
};

export type SchedulePdfParams = {
  orientation?: InputMaybe<Orientation>;
  pageSize?: InputMaybe<PageSize>;
};

export type SchedulePinboardParams = {
  layoutType?: InputMaybe<LayoutType>;
  pinboardGuid?: InputMaybe<Scalars['String']>;
  pinboardVizSelection?: InputMaybe<SchedulePinboardVizSelection>;
  printDocumentParams?: InputMaybe<SchedulePrintDocumentParams>;
  visualizationFormatOptions?: InputMaybe<ScheduleVisualizationFormatOptions>;
  vizIds?: InputMaybe<Array<Scalars['String']>>;
};

export type SchedulePinboardVizSelection = {
  completePinboard?: InputMaybe<Scalars['Boolean']>;
  includedTabId?: InputMaybe<Array<Scalars['String']>>;
  includedVizId?: InputMaybe<Array<Scalars['String']>>;
};

export type SchedulePrintDocumentParams = {
  pageFooterParams?: InputMaybe<SchedulePageFooterParams>;
};

export enum ScheduleRunState {
  Deadline = 'DEADLINE',
  Default = 'DEFAULT',
  DoesNotExist = 'DOES_NOT_EXIST',
  Failed = 'FAILED',
  Running = 'RUNNING',
  Success = 'SUCCESS'
}

export enum ScheduleTargetType {
  Http = 'HTTP',
  Queue = 'QUEUE'
}

export enum ScheduleType {
  OnetimeSchedule = 'ONETIME_SCHEDULE',
  RecurringSchedule = 'RECURRING_SCHEDULE'
}

export type ScheduleVisualizationFormatOptions = {
  truncateTables?: InputMaybe<Scalars['Boolean']>;
};

export type ScheduledJob = {
  __typename?: 'ScheduledJob';
  creationTimeS: Scalars['String'];
  creatorGUID: Scalars['String'];
  creatorName: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  emailRecipients: Array<Maybe<Scalars['String']>>;
  exportSettings?: Maybe<ExportResponse>;
  format: Scalars['String'];
  frequency: FrequencyGranularity;
  gatingCondition?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  recipientsCount: Scalars['Int'];
  schedule: TimeSchedule;
  scheduleName: Scalars['String'];
  status: JobStatusEnum;
  timezone?: Maybe<Scalars['String']>;
  userAndGroupsRecipients: Array<Maybe<Scalars['String']>>;
};

export type SchemaGraph = {
  __typename?: 'SchemaGraph';
  schemaTables?: Maybe<Array<Maybe<SchemaTable>>>;
};

export type SchemaJoin = {
  __typename?: 'SchemaJoin';
  dstSchemaTableId?: Maybe<Scalars['Int']>;
  joinId?: Maybe<Scalars['String']>;
};

export type SchemaJoinResponse = {
  __typename?: 'SchemaJoinResponse';
  joinId?: Maybe<Scalars['String']>;
};

export type SchemaTable = {
  __typename?: 'SchemaTable';
  joins?: Maybe<Array<Maybe<SchemaJoin>>>;
  logicalTableId?: Maybe<Scalars['String']>;
  schemaTableId?: Maybe<Scalars['Int']>;
  userDefinedName?: Maybe<Scalars['String']>;
};

export type SchemaTableResponse = {
  __typename?: 'SchemaTableResponse';
  deleteColumnDependents?: Maybe<Array<Maybe<DependencyModel>>>;
  schemaTableId?: Maybe<Scalars['Int']>;
};

/**  Generated from tsProto.a3.metric_monitor.SchemaVersion  */
export enum SchemaVersion {
  V1 = 'v1'
}

export type Schemas = {
  name?: InputMaybe<Scalars['String']>;
  tables?: InputMaybe<Array<InputMaybe<Table>>>;
};

export type ScreenParams = {
  deviceScaleFactor?: InputMaybe<Scalars['Int']>;
};

/** Return type for getSearchAssistWorksheets api call */
export type SearchAssistContent = {
  __typename?: 'SearchAssistContent';
  /** Group names to be sent for mixpanel */
  groupNames: Array<Maybe<Scalars['String']>>;
  /** Gets the search assist worksheets for onboarding */
  worksheetIds: Array<Maybe<Scalars['GUID']>>;
};

export type SearchAssistPayloadInput = {
  /** Current Step of the lesson */
  currentStep?: InputMaybe<Scalars['Int']>;
  /** data source guids */
  guids: Array<Scalars['String']>;
  /** Flag for spotlight actions completion */
  isClientActionCompleted?: InputMaybe<Scalars['Boolean']>;
  /** flag for instant search  */
  isInstantSearchOn: Scalars['Boolean'];
  /** Has Search Assist Lesson Started */
  isLessonStarted: Scalars['Boolean'];
  /** Is search Assist enabled */
  isSearchAssistOn: Scalars['Boolean'];
  /** Current Lesson Number */
  lessonNumber?: InputMaybe<Scalars['Int']>;
  /** Version of Search Assist. Default is v1 */
  version: SearchAssistVersion;
};

export type SearchAssistResponse = {
  __typename?: 'SearchAssistResponse';
  accessibleLessonIndex?: Maybe<Scalars['Int']>;
  /** Client Actions for UI to run */
  clientActions?: Maybe<Array<Maybe<ClientActionList>>>;
  /** Current Lesson Step */
  currentStep: Scalars['Int'];
  /** Lesson Question */
  description?: Maybe<Scalars['String']>;
  /** Current Advice Text for User */
  lessonAdvice?: Maybe<Scalars['String']>;
  /** Lesson Advice Enum */
  lessonAdviceType: LessonAdviceType;
  /** Current Lesson Number */
  lessonNumber: Scalars['Int'];
  /** Token placeholders for step */
  placeHolders?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Current Step token string */
  tokenText?: Maybe<Scalars['String']>;
  totalAccessibleLessons?: Maybe<Scalars['Int']>;
  /** Total Steps in lesson */
  totalSteps?: Maybe<Scalars['Int']>;
};

export enum SearchAssistVersion {
  V1 = 'V1',
  V2 = 'V2'
}

/** Search cache view status data object */
export type SearchCacheDetails = {
  __typename?: 'SearchCacheDetails';
  /** Cron expression used for scheduling */
  cronExpression?: Maybe<Scalars['String']>;
  /** Materialization or caching flag */
  isMaterialized: Scalars['Boolean'];
  /** Last cache refresh time, and can be for scheduled or manual refresh */
  lastRefreshTime?: Maybe<Scalars['Long']>;
  /** Next cache refresh time, and can be only for scheduled refresh */
  nextRefreshTime?: Maybe<Scalars['Long']>;
  /** Number of records in the cached view */
  numRecords?: Maybe<Scalars['Long']>;
  /** Scheduler frequency */
  scheduleFrequency?: Maybe<Scalars['String']>;
  /** Scheduler Id */
  scheduleId?: Maybe<Scalars['GUID']>;
  /** Size of the cached view */
  size?: Maybe<Scalars['Long']>;
  /** Scheduler timezone */
  timeZone?: Maybe<Scalars['String']>;
  /** Cached view id */
  viewId?: Maybe<Scalars['GUID']>;
  /** Cached view name */
  viewName?: Maybe<Scalars['String']>;
  /** Cached view status */
  viewState?: Maybe<SearchCacheStatus>;
};

/** Search cache history details response */
export type SearchCacheHistoryDetails = {
  __typename?: 'SearchCacheHistoryDetails';
  errorMessage?: Maybe<Scalars['String']>;
  history: Array<Maybe<SearchCacheHistoryItem>>;
  statusCode?: Maybe<Scalars['Int']>;
};

/** Search cache history item for each search cache refresh */
export type SearchCacheHistoryItem = {
  __typename?: 'SearchCacheHistoryItem';
  /** Time when the cache refresh ends */
  endTime?: Maybe<Scalars['Long']>;
  /** Number of records in the view */
  records?: Maybe<Scalars['Long']>;
  runId?: Maybe<Scalars['String']>;
  /** Shows whether the run was scheduled or ad-hoc */
  runType?: Maybe<SearchCacheSchedulerRunType>;
  /** Size of the view */
  size?: Maybe<Scalars['Long']>;
  /** Time when the cache refresh starts */
  startTime?: Maybe<Scalars['Long']>;
  /** Status of the run */
  status?: Maybe<SearchCacheStatus>;
};

/** Input params for enabling search cache and setting scheduler */
export type SearchCacheMaterializeInput = {
  /** Id of the view to be cached */
  id: Scalars['GUID'];
  numShards?: InputMaybe<Scalars['Int']>;
  primaryKeyColumnGuids: Array<InputMaybe<Scalars['GUID']>>;
  shardingKeyColumnGuids: Array<InputMaybe<Scalars['GUID']>>;
};

/** Input params for creating or updating search cache scheduler */
export type SearchCacheScheduleInput = {
  /** Cron expression of the schedule */
  cronExpression: Scalars['String'];
  /** Schedule frequency - DAILY, HOURLY, WEEKLY, MONTHLY */
  scheduleFrequency: Scalars['String'];
  /** Type of scheduler - Recurring or One-time */
  scheduleType: ScheduleType;
  /** Timezone which can be optional if its an hourly schedule */
  timeZone?: InputMaybe<Scalars['String']>;
  /** GUID of the view */
  viewId: Scalars['GUID'];
};

export enum SearchCacheSchedulerRunType {
  /** To show that the run was from manual refresh */
  AdHoc = 'AD_HOC',
  /** To show that the run was scheduled */
  Scheduled = 'SCHEDULED'
}

/** Search cache status enum */
export enum SearchCacheStatus {
  /**
   * When the view is not cached.
   * This status will never be returned from response. Only used for frontend purpose.
   */
  Empty = 'EMPTY',
  /** When the view caching failed */
  Error = 'ERROR',
  /** When the view caching is in progress */
  Inprogress = 'INPROGRESS',
  /** When the view waiting to be cached */
  Queued = 'QUEUED',
  /** When the view is cached successfully */
  Ready = 'READY',
  /** When the cached view has outdated data and can be refreshed */
  Stale = 'STALE',
  /** In case of any other unknown error. This status will not used often. */
  Unknown = 'UNKNOWN'
}

/** Response for search cache view status API */
export type SearchCacheViewStatus = {
  __typename?: 'SearchCacheViewStatus';
  /** Response from the view status API */
  data: SearchCacheDetails;
  /** Id of the external view */
  id: Scalars['GUID'];
};

export type SearchGroupsResponse = {
  __typename?: 'SearchGroupsResponse';
  data?: Maybe<Array<Maybe<SearchGroupsResponseData>>>;
};

export type SearchGroupsResponseData = {
  __typename?: 'SearchGroupsResponseData';
  /** The unique identifier of the object */
  author_id?: Maybe<Scalars['String']>;
  /** Indicates whether the response has complete detail of the user group. */
  complete_detail?: Maybe<Scalars['Boolean']>;
  /** Creation time of the user group in milliseconds. */
  creation_time_in_millis?: Maybe<Scalars['Float']>;
  /** Liveboards which are assigned as default liveboards to the user group. */
  default_liveboards?: Maybe<Array<Maybe<IdAndNameObject>>>;
  /** Indicates whether the user group is deleted. */
  deleted?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the user group is deprecated. */
  deprecated?: Maybe<Scalars['Boolean']>;
  /** Display name of the user group. */
  display_name: Scalars['String'];
  /** Indicates whether the user group is external. */
  external?: Maybe<Scalars['Boolean']>;
  /** Generation number of the user group. */
  generation_number?: Maybe<Scalars['Int']>;
  /** Indicates whether the user group is hidden. */
  hidden?: Maybe<Scalars['Boolean']>;
  /** The unique identifier of the object */
  id: Scalars['String'];
  /** Index number of the user group. */
  index?: Maybe<Scalars['Int']>;
  /** Index version number of the user group. */
  index_version?: Maybe<Scalars['Int']>;
  /** Metadata version number of the user group. */
  metadata_version?: Maybe<Scalars['Int']>;
  /** Last modified time of the user group in milliseconds. */
  modification_time_in_millis?: Maybe<Scalars['Float']>;
  /** The unique identifier of the object */
  modifier_id?: Maybe<Scalars['String']>;
  /** Name of the user group. */
  name: Scalars['String'];
  /** The unique identifier of the object */
  owner_id?: Maybe<Scalars['String']>;
  /** Parent type of the user group. */
  parent_type?: Maybe<Groups__ParentType>;
  /** Privileges which are assigned to the user group. */
  privileges?: Maybe<Array<Maybe<Privileges>>>;
  /** User Groups who are part of the user group. */
  sub_groups?: Maybe<Array<Maybe<IdAndNameObject>>>;
  /** Indicates whether the user group is a system group */
  system_group?: Maybe<Scalars['Boolean']>;
  /** Tags associated with the user group */
  tags?: Maybe<Array<Maybe<IdAndNameObject>>>;
  /** Type of the user group */
  type?: Maybe<Groups__GroupType>;
  /** Users who are part of the user group */
  users?: Maybe<Array<Maybe<IdAndNameObject>>>;
  /** Visibility of the user group */
  visibility: Visibility;
};

export type SearchUsersResponse = {
  __typename?: 'SearchUsersResponse';
  data?: Maybe<Array<Maybe<UserObjectType>>>;
};

export type SeasonalHybridEsd = {
  alpha?: InputMaybe<Scalars['Float']>;
  minRows?: InputMaybe<Scalars['Float']>;
  multiplier?: InputMaybe<Scalars['Float']>;
};

export type SecuirityDependents = {
  __typename?: 'SecuirityDependents';
  /** Author of the object */
  author?: Maybe<UserNameAndId>;
  /** GUID of the object */
  id?: Maybe<Scalars['String']>;
  /** Name of the object */
  name?: Maybe<Scalars['String']>;
  /** Owner of the object */
  owner?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<DependentPermission>>>;
  /** Indicates the type of the object */
  type?: Maybe<Scalars['String']>;
};

export type SecurityPermission = {
  __typename?: 'SecurityPermission';
  /** An array of object with details of permission on the user groups to which the user or user group belongs */
  groupPermission?: Maybe<Array<Maybe<GroupPermission>>>;
  /** GUID of the user or user group */
  id?: Maybe<Scalars['String']>;
  /** Name of the user or user group */
  name?: Maybe<Scalars['String']>;
  /** Indicates the permission which user or user group has on the object */
  permission?: Maybe<Scalars['String']>;
  /** Indicates the permission which user or user group has on the object through sharing of the object with this user or user group */
  sharedPermission?: Maybe<Scalars['String']>;
  /** Indicates the type of principal */
  type?: Maybe<Scalars['String']>;
};

export type SecurityPermissionResponse = {
  __typename?: 'SecurityPermissionResponse';
  /** Author of the object */
  author?: Maybe<UserNameAndId>;
  /** The objects on which the primary object is dependent on */
  dependents?: Maybe<Array<Maybe<SecuirityDependents>>>;
  /** GUID of the object */
  id?: Maybe<Scalars['String']>;
  /** Name of the object */
  name?: Maybe<Scalars['String']>;
  /** GUID of the owner of the object */
  owner?: Maybe<Scalars['String']>;
  /** An array of object with details of permission on users and user groups */
  permissions?: Maybe<Array<Maybe<SecurityPermission>>>;
  /** Indicates the type of the object */
  type?: Maybe<Scalars['String']>;
};

export enum SecurityType {
  Answer = 'ANSWER',
  Column = 'COLUMN',
  Dataobject = 'DATAOBJECT',
  Liveboard = 'LIVEBOARD'
}

export type SeedQuestion = {
  __typename?: 'SeedQuestion';
  questionId?: Maybe<Scalars['String']>;
  questionText?: Maybe<Scalars['String']>;
  sageQuery?: Maybe<Scalars['String']>;
};

export type SeedQuestionsResponse = {
  __typename?: 'SeedQuestionsResponse';
  questions: Array<Maybe<SeedQuestion>>;
  status?: Maybe<SeedQuestionsResponseStatus>;
};

export type SeedQuestionsResponseStatus = {
  __typename?: 'SeedQuestionsResponseStatus';
  code?: Maybe<Scalars['String']>;
};

export type SeekweellGetDestinationMetadataResult = {
  __typename?: 'SeekweellGetDestinationMetadataResult';
  destinationMetadata: Array<SeekwellDestinationMetadata>;
};

export type SeekwellCreatePipelineAndSchedulerIdInput = {
  actionId?: InputMaybe<Scalars['String']>;
  objectId?: InputMaybe<Scalars['String']>;
  pipelineId?: InputMaybe<Scalars['String']>;
  scheduleId?: InputMaybe<Scalars['String']>;
};

export type SeekwellCreatePipelineAndSchedulerIdResponse = {
  __typename?: 'SeekwellCreatePipelineAndSchedulerIdResponse';
  pipelineId?: Maybe<Scalars['String']>;
  scheduleId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type SeekwellCreateScheduledPipelineInput = {
  ActionInfo: SeekwellGetPipelineAndSchedulerIdInput;
  frequencyGranularity: Scalars['String'];
  pipelineInfo: Seekwell__CreatePipelineInput;
  scheduleInfo: CreateScheduleInput;
};

export type SeekwellDeleteDestinationByDestinationIdInput = {
  destinationId?: InputMaybe<Scalars['String']>;
  destinationType?: InputMaybe<DestinationTypes>;
};

export type SeekwellDeleteDestinationByDestinationIdResponse = {
  __typename?: 'SeekwellDeleteDestinationByDestinationIdResponse';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type SeekwellDeletePipelineAndSchedulerIdInput = {
  pipelineId?: InputMaybe<Scalars['String']>;
};

export type SeekwellDeletePipelineByPipelineIdInput = {
  pipelineId: Scalars['String'];
};

export type SeekwellDeletePipelineByPipelineIdResponse = {
  __typename?: 'SeekwellDeletePipelineByPipelineIdResponse';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type SeekwellDeleteScheduleInput = {
  scheduleId: Scalars['String'];
};

export type SeekwellDeleteScheduledPipelineInput = {
  pipelineDeleteInfo: SeekwellDeletePipelineByPipelineIdInput;
  scheduleDeleteInfo: SeekwellDeleteScheduleInput;
};

export type SeekwellDeleteScheduledPipelineResult = {
  __typename?: 'SeekwellDeleteScheduledPipelineResult';
  pipelineId?: Maybe<Scalars['String']>;
  scheduleId?: Maybe<Scalars['String']>;
};

export type SeekwellDestinationMetadata = {
  __typename?: 'SeekwellDestinationMetadata';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type SeekwellGetDestinationMetadataInput = {
  /** Destination app name */
  appName: DestinationTypes;
  /** DestinationId for action */
  destinationId: Scalars['String'];
};

export type SeekwellGetGoogleSheetsObjectDetailInput = {
  /** Destination app name */
  appName: DestinationTypes;
  /** DestinationId for action */
  destinationId: Scalars['String'];
  /** Object id for details */
  objectId: Scalars['String'];
};

/** Creating a clone type of SeekwellGetDestinationMetadataResult. */
export type SeekwellGetGoogleSheetsObjectDetailResult = {
  __typename?: 'SeekwellGetGoogleSheetsObjectDetailResult';
  destinationObjectMetadata: Array<SeekwellGoogleSheetsObjectMetadata>;
};

export type SeekwellGetMetadataAndScheduleResult = {
  __typename?: 'SeekwellGetMetadataAndScheduleResult';
  destinationMetadata: SeekwellGetPipelineByPipelineIdResponse;
  scheduleInfo: GetScheduleResult;
};

export type SeekwellGetPipelineAndSchedulerIdInput = {
  actionId?: InputMaybe<Scalars['String']>;
  objectId?: InputMaybe<Scalars['String']>;
};

export type SeekwellGetPipelineAndSchedulerIdResponse = {
  __typename?: 'SeekwellGetPipelineAndSchedulerIdResponse';
  pipelineId: Scalars['String'];
  scheduleId: Scalars['String'];
};

export type SeekwellGetPipelineByPipelineIdInput = {
  pipelineId: Scalars['String'];
};

export type SeekwellGetPipelineByPipelineIdResponse = {
  __typename?: 'SeekwellGetPipelineByPipelineIdResponse';
  destinationProperties: SeekwellPipelineDestinationPropertiesResponse;
  pipeline: SeekwellPipelineInfoResponse;
  status?: Maybe<Scalars['String']>;
};

export type SeekwellGetPipelineColumnMappingResponse = {
  __typename?: 'SeekwellGetPipelineColumnMappingResponse';
  destination?: Maybe<SeekwellGetPipelineDestinationColumnResponse>;
  source?: Maybe<SeekwellGetPipelineSourceColumnResponse>;
};

export type SeekwellGetPipelineDestinationColumnResponse = {
  __typename?: 'SeekwellGetPipelineDestinationColumnResponse';
  dataType?: Maybe<Scalars['String']>;
  digits?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  scale?: Maybe<Scalars['Int']>;
};

export type SeekwellGetPipelineGoogleSheetsInput = {
  selectedCellId?: InputMaybe<Scalars['String']>;
  selectedSheetId?: InputMaybe<Scalars['String']>;
  selectedSpreadSheetId?: InputMaybe<Scalars['String']>;
};

export type SeekwellGetPipelineGoogleSheetsResponse = {
  __typename?: 'SeekwellGetPipelineGoogleSheetsResponse';
  selectedCellId?: Maybe<Scalars['String']>;
  selectedSheetId?: Maybe<Scalars['String']>;
  selectedSpreadSheetId?: Maybe<Scalars['String']>;
};

export type SeekwellGetPipelineSalesforceResponse = {
  __typename?: 'SeekwellGetPipelineSalesforceResponse';
  externalId?: Maybe<Scalars['String']>;
  lead?: Maybe<Scalars['String']>;
  mapToExternalId?: Maybe<Scalars['String']>;
  operation?: Maybe<SfdcOperationTypes>;
};

export type SeekwellGetPipelineSlackInput = {
  channel?: InputMaybe<Scalars['String']>;
  includeCSV?: InputMaybe<Scalars['Boolean']>;
  includePng?: InputMaybe<Scalars['Boolean']>;
  message?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type SeekwellGetPipelineSlackResponse = {
  __typename?: 'SeekwellGetPipelineSlackResponse';
  channel?: Maybe<Scalars['String']>;
  includeCSV?: Maybe<Scalars['Boolean']>;
  includePng?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type SeekwellGetPipelineSourceColumnResponse = {
  __typename?: 'SeekwellGetPipelineSourceColumnResponse';
  dataType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SeekwellGetSfdcObjectDetailInput = {
  /** Destination app name */
  appName: DestinationTypes;
  /** DestinationId for action */
  destinationId: Scalars['String'];
  /** Object id for details */
  objectId: Scalars['String'];
};

export type SeekwellGetSfdcObjectDetailResult = {
  __typename?: 'SeekwellGetSfdcObjectDetailResult';
  fields: Array<SeekwellSfdcObjectField>;
  name: Scalars['String'];
};

export type SeekwellGoogleSheetsObjectMetadata = {
  __typename?: 'SeekwellGoogleSheetsObjectMetadata';
  sheetId: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type SeekwellPipelineDestinationPropertiesInput = {
  destinationId?: InputMaybe<Scalars['String']>;
  destinationType?: InputMaybe<Scalars['String']>;
  googleSheets?: InputMaybe<SeekwellGetPipelineGoogleSheetsInput>;
  mapping?: InputMaybe<Array<InputMaybe<Seekwell_CreatePipelineColumnMappingInput>>>;
  salesforce?: InputMaybe<Seekwell_CreatePipelineSalesforceInput>;
  slack?: InputMaybe<SeekwellGetPipelineSlackInput>;
};

export type SeekwellPipelineDestinationPropertiesResponse = {
  __typename?: 'SeekwellPipelineDestinationPropertiesResponse';
  destinationId: Scalars['String'];
  destinationtype: Scalars['String'];
  mapping?: Maybe<Array<Maybe<SeekwellGetPipelineColumnMappingResponse>>>;
  salesforce?: Maybe<SeekwellGetPipelineSalesforceResponse>;
  sheets?: Maybe<SeekwellGetPipelineGoogleSheetsResponse>;
  slack?: Maybe<SeekwellGetPipelineSlackResponse>;
};

export type SeekwellPipelineInfoInput = {
  pipelineId?: InputMaybe<Scalars['String']>;
  pipelineName?: InputMaybe<Scalars['String']>;
  sourceId?: InputMaybe<Scalars['String']>;
  sourceType?: InputMaybe<Scalars['String']>;
};

export type SeekwellPipelineInfoResponse = {
  __typename?: 'SeekwellPipelineInfoResponse';
  pipelineId: Scalars['String'];
  pipelineName: Scalars['String'];
  sourceId: Scalars['String'];
  sourceType: Scalars['String'];
};

export type SeekwellSfdcObjectField = {
  __typename?: 'SeekwellSfdcObjectField';
  customField?: Maybe<Scalars['Boolean']>;
  digits: Scalars['Int'];
  idLookup?: Maybe<Scalars['Boolean']>;
  length: Scalars['Int'];
  name: Scalars['String'];
  precision: Scalars['Int'];
  scale: Scalars['Int'];
  type: Scalars['String'];
};

export type SeekwellUpdatePipelineByPipelineIdInput = {
  destinationProperties: SeekwellPipelineDestinationPropertiesInput;
  pipeline: SeekwellPipelineInfoInput;
};

export type SeekwellUpdatePipelineByPipelineIdResponse = {
  __typename?: 'SeekwellUpdatePipelineByPipelineIdResponse';
  message?: Maybe<Scalars['String']>;
  pipelineId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type SeekwellUpdateScheduleInput = {
  scheduleId: Scalars['String'];
  scheduleInfo: UpdatedScheduleInfoInput;
};

export type SeekwellUpdatedScheduledPipelineMetadataInput = {
  pipelineMetadata: SeekwellUpdatePipelineByPipelineIdInput;
  scheduleMetadata: SeekwellUpdateScheduleInput;
};

export type SeekwellUpdatedScheduledPipelineMetadataResult = {
  __typename?: 'SeekwellUpdatedScheduledPipelineMetadataResult';
  pipelineId?: Maybe<Scalars['String']>;
  scheduleId?: Maybe<Scalars['String']>;
};

export type Seekwell_CreatePipelineColumnMappingInput = {
  destination?: InputMaybe<Seekwell_CreatePipelineDestinationColumnInput>;
  source?: InputMaybe<Seekwell_CreatePipelineSourceColumnInput>;
};

export type Seekwell_CreatePipelineDestinationColumnInput = {
  dataType?: InputMaybe<Scalars['String']>;
  digits?: InputMaybe<Scalars['Int']>;
  length?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  scale?: InputMaybe<Scalars['Int']>;
};

export type Seekwell_CreatePipelineSalesforceInput = {
  externalId?: InputMaybe<Scalars['String']>;
  lead?: InputMaybe<Scalars['String']>;
  mapToExternalId?: InputMaybe<Scalars['String']>;
  operation?: InputMaybe<SfdcOperationTypes>;
};

export type Seekwell_CreatePipelineSlackInput = {
  channel?: InputMaybe<Scalars['String']>;
  includeCSV?: InputMaybe<Scalars['Boolean']>;
  includePng?: InputMaybe<Scalars['Boolean']>;
  message?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Seekwell_CreatePipelineSourceColumnInput = {
  dataType?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Seekwell__CreateDestinationInput = {
  /** Destination app name */
  destinationType?: InputMaybe<DestinationTypes>;
  /** Callback url after the completion of Auth */
  redirectUrl?: InputMaybe<Scalars['String']>;
};

export type Seekwell__CreateDestinationResult = {
  __typename?: 'Seekwell__CreateDestinationResult';
  /** Destination app auth url */
  destinationAuthUrl?: Maybe<Scalars['String']>;
};

export type Seekwell__CreatePipelineInput = {
  destinationId?: InputMaybe<Scalars['String']>;
  destinationType?: InputMaybe<DestinationTypes>;
  googleSheets?: InputMaybe<SeekwellGetPipelineGoogleSheetsInput>;
  mapping?: InputMaybe<Array<InputMaybe<Seekwell_CreatePipelineColumnMappingInput>>>;
  salesforce?: InputMaybe<Seekwell_CreatePipelineSalesforceInput>;
  slack?: InputMaybe<Seekwell_CreatePipelineSlackInput>;
  sourceId?: InputMaybe<Scalars['String']>;
  sourceType?: InputMaybe<SourceTypes>;
};

export type Seekwell__CreatePipelineResult = {
  __typename?: 'Seekwell__CreatePipelineResult';
  message?: Maybe<Scalars['String']>;
  pipelineId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Seekwell__DestinationItemResult = {
  __typename?: 'Seekwell__DestinationItemResult';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<DestinationTypes>;
};

export type Seekwell__DestinationListInput = {
  /** Destination app name */
  destinationType?: InputMaybe<DestinationTypes>;
};

export type Seekwell__DestinationListResult = {
  __typename?: 'Seekwell__DestinationListResult';
  destinations?: Maybe<Array<Maybe<Seekwell__DestinationItemResult>>>;
};

export type Seekwell__GetOrCreateDestinationResult = {
  __typename?: 'Seekwell__GetOrCreateDestinationResult';
  /** Destination auth url if destination doesn't exist */
  destinationAuthUrl?: Maybe<Scalars['String']>;
  /** Destination Id if exists */
  destinationId?: Maybe<Scalars['String']>;
};

export type SelectSchemaJoinTransform = {
  destSchemaTableId?: InputMaybe<Scalars['Int']>;
  joinId?: InputMaybe<Scalars['String']>;
  srcSchemaTableId?: InputMaybe<Scalars['Int']>;
};

export type SelectedColumn = {
  __typename?: 'SelectedColumn';
  guid?: Maybe<Scalars['GUID']>;
  name?: Maybe<Scalars['String']>;
  outputColumnId?: Maybe<Scalars['GUID']>;
};

export type SelectedColumnProperties = {
  __typename?: 'SelectedColumnProperties';
  columnGuid?: Maybe<Scalars['GUID']>;
  displayName?: Maybe<Scalars['String']>;
  hasAggregationApplied?: Maybe<Scalars['Boolean']>;
  isDateBucket?: Maybe<Scalars['Boolean']>;
};

export type SelectedColumnPropertiesInput = {
  columnGuid?: InputMaybe<Scalars['GUID']>;
  hasAggregationApplied?: InputMaybe<Scalars['Boolean']>;
  isDateBucket?: InputMaybe<Scalars['Boolean']>;
};

export type SelectedFormula = {
  __typename?: 'SelectedFormula';
  formulaId?: Maybe<Scalars['GUID']>;
  name?: Maybe<Scalars['String']>;
  outputColumnId?: Maybe<Scalars['GUID']>;
};

export type SeriesColor = {
  __typename?: 'SeriesColor';
  color?: Maybe<Scalars['String']>;
  serieName?: Maybe<Scalars['String']>;
};

export type SeriesMultiColorMap = {
  __typename?: 'SeriesMultiColorMap';
  color?: Maybe<Array<Maybe<Scalars['String']>>>;
  serieName?: Maybe<Scalars['String']>;
};

/** Login response */
export type SessionLoginResponse = {
  __typename?: 'SessionLoginResponse';
  /** Bearer token generated. This will be blank when token type is Cookie */
  token?: Maybe<Scalars['String']>;
  /** Date and time at which the token is generated */
  tokenCreatedTime?: Maybe<Scalars['String']>;
  /** Duration in seconds after which the token expires */
  tokenExpiryDuration?: Maybe<Scalars['String']>;
  /** Type of token generated */
  tokenType?: Maybe<Scalars['String']>;
  /** Username of the user account for which token is generated */
  userName?: Maybe<Scalars['String']>;
};

/** Get session active status */
export type SessionStatus = {
  __typename?: 'SessionStatus';
  status?: Maybe<Scalars['Int']>;
  statusText?: Maybe<Scalars['String']>;
};

/** Session Token response */
export type SessionTokenResponse = {
  __typename?: 'SessionTokenResponse';
  /** Bearer token generated. This will be blank when token type is Cookie */
  token?: Maybe<Scalars['String']>;
  /** Date and time at which the token is generated */
  tokenCreatedTime?: Maybe<Scalars['String']>;
  /** Duration in seconds after which the token expires */
  tokenExpiryDuration?: Maybe<Scalars['String']>;
  /** Username of the user account for which token is generated */
  userName?: Maybe<Scalars['String']>;
};

export type SetScopeTransform = {
  tableId?: InputMaybe<Array<Scalars['String']>>;
};

export type SetSpotIqNotificationInput = {
  attachContent: Scalars['Boolean'];
  notifiy: Scalars['Boolean'];
  onFailure: Scalars['Boolean'];
  onSuccess: Scalars['Boolean'];
};

/** Update User Preference Proto input */
export type SetSpotIqPreferencesInput = {
  autotuneDateBoundary: Scalars['Boolean'];
  emailNotification: SetSpotIqNotificationInput;
  excludeNull: Scalars['Boolean'];
  excludeZeroMeasure: Scalars['Boolean'];
  maxCorrCoeff: Scalars['Float'];
  maxLag: Scalars['Float'];
  minCorrCoeff: Scalars['Float'];
  minRelativeDiff: Scalars['Float'];
  pValueThreshold: Scalars['Float'];
};

/** Return type for getSetupState api call */
export type SetupState = {
  __typename?: 'SetupState';
  /** answer header objects */
  answerHeaders: Array<Maybe<Metadata>>;
  /** Flag to communicate if user has access to some non demo tables */
  hasAccessibleTables: Scalars['Boolean'];
  /** Id of selected data source */
  selectedDataSourceId?: Maybe<Scalars['GUID']>;
  /** selected worksheet header object */
  selectedWorksheetHeader?: Maybe<Metadata>;
};

export type Sharable = {
  __typename?: 'Sharable';
  /** List of datasource ids to share with. */
  datasourceIds?: Maybe<Array<Maybe<Scalars['GUID']>>>;
  /** Id of the object to share. */
  id?: Maybe<Scalars['GUID']>;
  /** Name of the object to share. */
  name?: Maybe<Scalars['String']>;
  /** Access mode to be provided. */
  shareMode?: Maybe<AccessMode>;
  /** Object type. */
  type?: Maybe<ListType>;
  /** user or group id to share the object with. */
  userOrGroupId?: Maybe<Scalars['GUID']>;
};

export type SharableInput = {
  /** List of datasource ids to share with. */
  datasourceIds?: InputMaybe<Array<InputMaybe<Scalars['GUID']>>>;
  /** Id of the object to share. */
  id?: InputMaybe<Scalars['GUID']>;
  /** Name of the object to share. */
  name?: InputMaybe<Scalars['String']>;
  /** Access mode to be provided. */
  shareMode?: InputMaybe<AccessMode>;
  /** Object type. */
  type?: InputMaybe<ListType>;
  /** user or group id to share the object with. */
  userOrGroupId?: InputMaybe<Scalars['GUID']>;
};

export type SharableListInput = {
  /** List of sharables. */
  sharableItems?: InputMaybe<Array<InputMaybe<SharableInput>>>;
};

export enum ShareType {
  ReadOnly = 'READ_ONLY'
}

export type Sheet = {
  complete?: InputMaybe<Scalars['Boolean']>;
  header?: InputMaybe<Scalars['JSON']>;
  incompleteDetail?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sheetContent?: InputMaybe<Scalars['JSON']>;
  sheetType?: InputMaybe<Scalars['String']>;
};

export type ShortCertData = {
  __typename?: 'ShortCertData';
  kid?: Maybe<Scalars['String']>;
  x5c?: Maybe<Scalars['String']>;
};

export type ShortLivedAuthParams = {
  authToken?: InputMaybe<Scalars['String']>;
  userGuid?: InputMaybe<Scalars['String']>;
};

export enum ShowPivotSummaryPrior {
  Both = 'BOTH',
  Columns = 'COLUMNS',
  None = 'NONE',
  Rows = 'ROWS'
}

export type SingleTile = {
  __typename?: 'SingleTile';
  answerId: Scalars['String'];
  feedbackId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  insightAnalysisDetails?: Maybe<InsightAnalysisDetails>;
  insightFeedbackQuestionnaire?: Maybe<Array<Maybe<InsightFeedbackQuestion>>>;
  isFullWidth: Scalars['Boolean'];
  isLiked?: Maybe<Scalars['Boolean']>;
};

export enum SnapshotStatus {
  SnapshotCreateFailed = 'SNAPSHOT_CREATE_FAILED',
  SnapshotCreateFinished = 'SNAPSHOT_CREATE_FINISHED',
  SnapshotCreateStarted = 'SNAPSHOT_CREATE_STARTED',
  SnapshotDeleteFailed = 'SNAPSHOT_DELETE_FAILED',
  SnapshotDeleteScheduled = 'SNAPSHOT_DELETE_SCHEDULED',
  SnapshotNotFound = 'SNAPSHOT_NOT_FOUND'
}

/** input that defines Eureka viz Snapshot request data */
export type SnapshotStatusRequestData = {
  id: Scalars['String'];
  reportBookId: Scalars['String'];
  reportBookType: Scalars['String'];
  version: Scalars['Int'];
};

export enum SnapshotType {
  Html = 'HTML',
  Jpeg = 'JPEG',
  Svg = 'SVG'
}

export type SolidBackgroundAttrs = {
  __typename?: 'SolidBackgroundAttrs';
  color?: Maybe<Scalars['String']>;
};

export enum SortBy {
  Author = 'AUTHOR',
  Created = 'CREATED',
  Default = 'DEFAULT',
  DisplayName = 'DISPLAY_NAME',
  LastAccessed = 'LAST_ACCESSED',
  Modified = 'MODIFIED',
  Name = 'NAME',
  None = 'NONE',
  RowCount = 'ROW_COUNT',
  Synced = 'SYNCED',
  UserState = 'USER_STATE',
  Views = 'VIEWS'
}

export type SortColumnRepresentation = {
  __typename?: 'SortColumnRepresentation';
  aggregation?: Maybe<AggregateFunctionTypeEnum>;
  ascending?: Maybe<Scalars['Boolean']>;
  column?: Maybe<ColumnRepresentation>;
};

export enum SortOptionFieldName {
  Author = 'AUTHOR',
  Created = 'CREATED',
  DisplayName = 'DISPLAY_NAME',
  Modified = 'MODIFIED',
  Name = 'NAME'
}

export enum SortOptionOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum SortOrder {
  Asc = 'ASC',
  Default = 'DEFAULT',
  Desc = 'DESC'
}

export type Source = {
  __typename?: 'Source';
  author?: Maybe<EntityHeader>;
  column?: Maybe<Array<EntityHeader>>;
  createMs?: Maybe<Scalars['Float']>;
  database?: Maybe<EntityHeader>;
  header?: Maybe<EntityHeader>;
  isAccessible?: Maybe<Scalars['Boolean']>;
  lastUpdateMs?: Maybe<Scalars['Float']>;
  schema?: Maybe<EntityHeader>;
};

/** Get all the sources */
export type SourceByType = {
  __typename?: 'SourceByType';
  desc_show?: Maybe<Scalars['Boolean']>;
  imported?: Maybe<Array<Metadata>>;
  sqlViews?: Maybe<Array<Metadata>>;
  tables?: Maybe<Array<Metadata>>;
  tc_show?: Maybe<Scalars['Boolean']>;
  views?: Maybe<Array<Metadata>>;
  worksheets?: Maybe<Array<Metadata>>;
};

/** A type that describes already selected source */
export type SourceDetail = {
  __typename?: 'SourceDetail';
  /** The data source author's id */
  author?: Maybe<Scalars['String']>;
  /** The data source's display name for author */
  authorDisplayName?: Maybe<Scalars['String']>;
  /** The data source author's name */
  authorName?: Maybe<Scalars['String']>;
  /** Columns inside  the data source */
  columns?: Maybe<Array<Column>>;
  /** The data source's creation time */
  created: Scalars['Float'];
  /** The data source's id */
  dataSourceId?: Maybe<Scalars['GUID']>;
  /** The data source's type */
  dataSourceTypeEnum?: Maybe<Scalars['String']>;
  /** The data source's database name */
  databaseStripe?: Maybe<Scalars['String']>;
  /** Data catalog description flag */
  desc_show?: Maybe<Scalars['Boolean']>;
  /**  The data source's description */
  description?: Maybe<Scalars['String']>;
  /** Destination relationship data */
  destinationRelationships?: Maybe<Array<Scalars['String']>>;
  /** The data source's id */
  id: Scalars['GUID'];
  /** check if the data source info is cached or not */
  isCached?: Maybe<Scalars['Boolean']>;
  /** Check for if the data source is deleted */
  isDeleted?: Maybe<Scalars['Boolean']>;
  /** Check if data source is external */
  isExternal?: Maybe<Scalars['Boolean']>;
  /** Check if the data source is hidden */
  isHidden?: Maybe<Scalars['Boolean']>;
  /** The data source's modification time */
  modified?: Maybe<Scalars['Float']>;
  /** The data source's modifier */
  modifiedBy?: Maybe<Scalars['String']>;
  /** The data source's name */
  name: Scalars['String'];
  /** The data source owner's id */
  owner?: Maybe<Scalars['String']>;
  /** Relationship data */
  relationships?: Maybe<Array<Scalars['String']>>;
  /** The data source's schema */
  schemaStripe?: Maybe<Scalars['String']>;
  /** The data source's tags */
  tags?: Maybe<Array<Tag>>;
  /** Data catalog trustcheck flag */
  tc_show?: Maybe<Scalars['Boolean']>;
  /** The data source's type */
  type: Scalars['String'];
};

/** Information about an individual data source (eg LINEORDER) */
export type SourceInfo = {
  __typename?: 'SourceInfo';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export enum SourceTypes {
  Answer = 'ANSWER',
  Viz = 'VIZ'
}

export type SpotAppPublishColumn = {
  __typename?: 'SpotAppPublishColumn';
  colDesc?: Maybe<Scalars['String']>;
  colName: Scalars['String'];
  count?: Maybe<Scalars['Float']>;
  dataType: Scalars['String'];
  isDisabled?: Maybe<Scalars['Boolean']>;
  isMandatory?: Maybe<Scalars['Boolean']>;
  isSelected?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  tableName: Scalars['String'];
};

export type SpotAppPublishColumnInput = {
  colDesc?: InputMaybe<Scalars['String']>;
  colName: Scalars['String'];
  count?: InputMaybe<Scalars['Float']>;
  dataType: Scalars['String'];
  isDisabled?: InputMaybe<Scalars['Boolean']>;
  isMandatory?: InputMaybe<Scalars['Boolean']>;
  isSelected?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  tableName: Scalars['String'];
};

export type SpotAppPublishDetails = {
  __typename?: 'SpotAppPublishDetails';
  iconString?: Maybe<Scalars['String']>;
  joinsListInfo?: Maybe<Array<SpotAppPublishJoins>>;
  longDescription?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  shortDescription?: Maybe<Scalars['String']>;
  tablesListInfo?: Maybe<Array<SpotAppPublishTable>>;
  userGuid?: Maybe<Scalars['String']>;
  zipString?: Maybe<Scalars['String']>;
};

export type SpotAppPublishDetailsInput = {
  documentationLink?: InputMaybe<Scalars['String']>;
  iconString: Scalars['String'];
  joinsListInfo?: InputMaybe<Array<SpotAppPublishJoinsInput>>;
  longDescription: Scalars['String'];
  name: Scalars['String'];
  publisherName?: InputMaybe<Scalars['String']>;
  shortDescription: Scalars['String'];
  tablesListInfo?: InputMaybe<Array<SpotAppPublishTableInput>>;
  userGuid: Scalars['String'];
  zipString: Scalars['String'];
};

export type SpotAppPublishJoins = {
  __typename?: 'SpotAppPublishJoins';
  multi_join?: Maybe<Scalars['String']>;
  repeat_column?: Maybe<Scalars['String']>;
  template_column?: Maybe<Scalars['String']>;
  template_join_column?: Maybe<Scalars['String']>;
  template_join_filter?: Maybe<Scalars['String']>;
  template_join_table?: Maybe<Scalars['String']>;
  template_join_type?: Maybe<Scalars['String']>;
  template_table?: Maybe<Scalars['String']>;
};

export type SpotAppPublishJoinsInput = {
  multi_join?: InputMaybe<Scalars['String']>;
  repeat_column?: InputMaybe<Scalars['String']>;
  template_column?: InputMaybe<Scalars['String']>;
  template_join_column?: InputMaybe<Scalars['String']>;
  template_join_filter?: InputMaybe<Scalars['String']>;
  template_join_table?: InputMaybe<Scalars['String']>;
  template_join_type?: InputMaybe<Scalars['String']>;
  template_table?: InputMaybe<Scalars['String']>;
};

export type SpotAppPublishTable = {
  __typename?: 'SpotAppPublishTable';
  columnListInfo?: Maybe<Array<SpotAppPublishColumn>>;
  isDisabled?: Maybe<Scalars['Boolean']>;
  isMandatory?: Maybe<Scalars['Boolean']>;
  isSelected?: Maybe<Scalars['Boolean']>;
  tableName: Scalars['String'];
};

export type SpotAppPublishTableInput = {
  columnListInfo?: InputMaybe<Array<SpotAppPublishColumnInput>>;
  isDisabled?: InputMaybe<Scalars['Boolean']>;
  isMandatory?: InputMaybe<Scalars['Boolean']>;
  isSelected?: InputMaybe<Scalars['Boolean']>;
  tableName: Scalars['String'];
};

export type SpotAppReviewDetailsInput = {
  appGuid: Scalars['String'];
  comments?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  publisherGuid: Scalars['String'];
  reviewStatus: SpotAppReviewStatus;
  userGuid: Scalars['String'];
};

export enum SpotAppReviewStatus {
  Published = 'PUBLISHED',
  Rejected = 'REJECTED',
  UnderReview = 'UNDER_REVIEW'
}

export type SpotAppsBlock = {
  __typename?: 'SpotAppsBlock';
  app_guid?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  enabled_flag?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  user_guid?: Maybe<Scalars['String']>;
};

export type SpotAppsColumn = {
  __typename?: 'SpotAppsColumn';
  app_guid?: Maybe<Scalars['String']>;
  auto_map_column?: Maybe<Scalars['String']>;
  auto_map_column_flag?: Maybe<Scalars['String']>;
  cdw_column?: Maybe<Scalars['String']>;
  cdw_column_datatype?: Maybe<Scalars['String']>;
  cdw_table?: Maybe<Scalars['String']>;
  mandatory_flag?: Maybe<Scalars['String']>;
  template_column?: Maybe<Scalars['String']>;
  template_column_datatype?: Maybe<Scalars['String']>;
  template_column_desc?: Maybe<Scalars['String']>;
  template_table?: Maybe<Scalars['String']>;
  user_guid?: Maybe<Scalars['String']>;
};

export type SpotAppsColumnInput = {
  app_guid?: InputMaybe<Scalars['String']>;
  auto_map_column?: InputMaybe<Scalars['String']>;
  auto_map_column_flag?: InputMaybe<Scalars['String']>;
  cdw_column?: InputMaybe<Scalars['String']>;
  cdw_column_datatype?: InputMaybe<Scalars['String']>;
  cdw_table?: InputMaybe<Scalars['String']>;
  mandatory_flag?: InputMaybe<Scalars['String']>;
  template_column?: InputMaybe<Scalars['String']>;
  template_column_datatype?: InputMaybe<Scalars['String']>;
  template_column_desc?: InputMaybe<Scalars['String']>;
  template_table?: InputMaybe<Scalars['String']>;
  user_guid?: InputMaybe<Scalars['String']>;
};

export type SpotAppsComponent = {
  __typename?: 'SpotAppsComponent';
  app_guid?: Maybe<Scalars['String']>;
  approval_flag?: Maybe<Scalars['String']>;
  approved_date?: Maybe<Scalars['Long']>;
  approver_guid?: Maybe<Scalars['String']>;
  block_type?: Maybe<Scalars['String']>;
  component_guid?: Maybe<Scalars['String']>;
  component_type?: Maybe<Scalars['String']>;
  created_date?: Maybe<Scalars['Long']>;
  name?: Maybe<Scalars['String']>;
  review_flag?: Maybe<Scalars['String']>;
  reviewer_guid?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<SpotAppsTag>>;
  user_guid?: Maybe<Scalars['String']>;
};

export type SpotAppsPublisher = {
  __typename?: 'SpotAppsPublisher';
  app_guid?: Maybe<Scalars['String']>;
  created_date?: Maybe<Scalars['Long']>;
  name?: Maybe<Scalars['String']>;
  publish_date?: Maybe<Scalars['Long']>;
  publisher_guid?: Maybe<Scalars['String']>;
  publisher_name?: Maybe<Scalars['String']>;
  review_status?: Maybe<SpotAppReviewStatus>;
  submitter_name?: Maybe<Scalars['String']>;
  user_guid?: Maybe<Scalars['String']>;
};

export type SpotAppsTable = {
  __typename?: 'SpotAppsTable';
  app_guid?: Maybe<Scalars['String']>;
  auto_map_table?: Maybe<Scalars['String']>;
  auto_map_table_flag?: Maybe<Scalars['String']>;
  cdw_database?: Maybe<Scalars['String']>;
  cdw_schema?: Maybe<Scalars['String']>;
  cdw_table?: Maybe<Scalars['String']>;
  last_modified_by?: Maybe<Scalars['String']>;
  mandatory_flag?: Maybe<Scalars['String']>;
  template_table?: Maybe<Scalars['String']>;
  template_table_desc?: Maybe<Scalars['String']>;
  user_guid?: Maybe<Scalars['String']>;
};

export type SpotAppsTablesInput = {
  app_guid?: InputMaybe<Scalars['String']>;
  auto_map_table?: InputMaybe<Scalars['String']>;
  auto_map_table_flag?: InputMaybe<Scalars['String']>;
  cdw_database?: InputMaybe<Scalars['String']>;
  cdw_schema?: InputMaybe<Scalars['String']>;
  cdw_table?: InputMaybe<Scalars['String']>;
  last_modified_by?: InputMaybe<Scalars['String']>;
  mandatory_flag?: InputMaybe<Scalars['String']>;
  template_table?: InputMaybe<Scalars['String']>;
  template_table_desc?: InputMaybe<Scalars['String']>;
  user_guid?: InputMaybe<Scalars['String']>;
};

/** A type that describes a tag. */
export type SpotAppsTag = {
  __typename?: 'SpotAppsTag';
  /** Tag's author */
  author: Scalars['String'];
  /** Time when the tag was created */
  created?: Maybe<Scalars['Long']>;
  /** Tag's ID */
  id: Scalars['GUID'];
  /** Time when the tag was modified */
  modified?: Maybe<Scalars['Long']>;
  /** Tag's name */
  name: Scalars['String'];
  /** Owner of the tag */
  owner?: Maybe<Scalars['String']>;
};

export type SpotIqActionStatusResponse = {
  __typename?: 'SpotIQActionStatusResponse';
  Data?: Maybe<AnalysisActionResponse>;
  Error?: Maybe<Scalars['String']>;
};

export type SpotIqAnalysisResult = {
  __typename?: 'SpotIQAnalysisResult';
  analysisDetails?: Maybe<AnalysisDetails>;
  changeSummary?: Maybe<ChangeAnalysisSummary>;
  encodedAnalysisInfo: EncodedAnalysisInfo;
  headerDetails?: Maybe<HeaderDetails>;
  id: Scalars['String'];
  insightTiles: Array<ClusterOrSingleTile>;
  originalAnalysisConfig?: Maybe<OriginalAnalysisConfig>;
};

export type SpotIqAnalysisResultResponse = {
  __typename?: 'SpotIQAnalysisResultResponse';
  Data?: Maybe<SpotIqAnalysisResult>;
  Error?: Maybe<Scalars['String']>;
};

export type SqlAnswer = {
  __typename?: 'SqlAnswer';
  connectionId?: Maybe<Scalars['String']>;
  sqlProgram?: Maybe<SqlProgram>;
  visualization?: Maybe<Array<SqlVisualization>>;
};

export type SqlAnswerResponse = {
  __typename?: 'SqlAnswerResponse';
  id: BachSessionId;
  sqlAnswer?: Maybe<SqlAnswer>;
};

export type SqlColumnDependent = {
  __typename?: 'SqlColumnDependent';
  dependent?: Maybe<Array<Maybe<SqlDependent>>>;
  header: SqlColumnHeader;
};

export type SqlColumnDependentHeader = {
  __typename?: 'SqlColumnDependentHeader';
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  guid?: Maybe<Scalars['String']>;
};

export type SqlColumnHeader = {
  __typename?: 'SqlColumnHeader';
  guid?: Maybe<Scalars['String']>;
};

export type SqlDependencyModel = {
  __typename?: 'SqlDependencyModel';
  deletedColumnDependents?: Maybe<Array<Maybe<SqlColumnDependent>>>;
};

export type SqlDependent = {
  __typename?: 'SqlDependent';
  header?: Maybe<Array<Maybe<SqlColumnDependentHeader>>>;
  type: Scalars['String'];
};

export type SqlProgram = {
  __typename?: 'SqlProgram';
  column?: Maybe<Array<Maybe<SqlProgramColumn>>>;
  sqlQuery?: Maybe<Scalars['String']>;
};

export type SqlProgramColumn = {
  __typename?: 'SqlProgramColumn';
  alias?: Maybe<Scalars['String']>;
  dataType?: Maybe<FalconDataType>;
  name?: Maybe<Scalars['String']>;
  sqlDataType?: Maybe<Scalars['String']>;
};

export type SqlTableColumnObj = {
  __typename?: 'SqlTableColumnObj';
  answerColumnId: Scalars['String'];
};

export type SqlVisualization = {
  __typename?: 'SqlVisualization';
  customTitle?: Maybe<Scalars['Boolean']>;
  header?: Maybe<VisualHeader>;
  table?: Maybe<VisTable>;
  title?: Maybe<VisTitle>;
  type?: Maybe<Scalars['String']>;
};

export type SsoInputService = {
  binding?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type SsoService = {
  __typename?: 'SsoService';
  binding?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export enum StateType {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Inactive = 'INACTIVE',
  Locked = 'LOCKED',
  Pending = 'PENDING'
}

export type StdevMean = {
  mean?: InputMaybe<Scalars['Float']>;
  minRows?: InputMaybe<Scalars['Int']>;
  multiplier?: InputMaybe<Scalars['Float']>;
  stdDev?: InputMaybe<Scalars['Float']>;
};

export type Step = {
  __typename?: 'Step';
  description: Scalars['String'];
};

/** All Styles */
export type Styles = {
  __typename?: 'Styles';
  appLogoTypeToImage?: Maybe<Scalars['JSON']>;
  chartFeatureToFontGuid?: Maybe<Scalars['JSON']>;
  customColors?: Maybe<CustomColors>;
  customFontFaces?: Maybe<Array<Maybe<FontFace>>>;
  footerText?: Maybe<Scalars['String']>;
  pageTitle?: Maybe<Scalars['String']>;
  tableFeatureToFontGuid?: Maybe<Scalars['JSON']>;
};

export type StylesPerOrg = {
  __typename?: 'StylesPerOrg';
  color?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  font?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  org?: Maybe<OrgDetails>;
  text?: Maybe<Scalars['JSON']>;
};

export enum SubTypes {
  AggrWorksheet = 'AGGR_WORKSHEET',
  OneToOneLogical = 'ONE_TO_ONE_LOGICAL',
  SqlView = 'SQL_VIEW',
  UserDefined = 'USER_DEFINED',
  Worksheet = 'WORKSHEET'
}

export type SubmitCustomAnalysisInput = {
  analysisType: A3AnalysisTypeEnum;
  analyzeCurrentData?: InputMaybe<CurrentDataOptionsEnum>;
  locale?: InputMaybe<Scalars['String']>;
  param?: InputMaybe<AnalysisParam>;
  selectedColumnsIds?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type Subscriber = {
  __typename?: 'Subscriber';
  user?: Maybe<User>;
  userGroup?: Maybe<UserGroup>;
};

export type SubscriberInput = {
  user?: InputMaybe<UserInput>;
  userGroup?: InputMaybe<UserGroupInput>;
};

export type Suggestion = {
  __typename?: 'Suggestion';
  /** Grouping key used for Filter tab */
  groupingKey?: Maybe<Scalars['String']>;
  /** Title of the suggestion */
  title: Scalars['String'];
  /** Transform to be used when the chip is clicked */
  transform?: Maybe<Array<Maybe<QueryTransform>>>;
  /** In case of Add tab typeEnum will serve as groupingKey */
  typeEnum?: Maybe<RecognizedTokenType>;
};

export type SyncCatalogConnectionInput = {
  connection_id: Scalars['String'];
  type: Scalars['String'];
};

export type SyncCatalogConnectionResult = {
  __typename?: 'SyncCatalogConnectionResult';
  connection_id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export enum SyncSourceTypes {
  Answers = 'Answers',
  Pinboard = 'Pinboard',
  SqlView = 'SqlView',
  View = 'View'
}

export type TseAppActions__CreatePipelineAndRunInput = {
  ActionInfo: CreatePipelineAndRunActionInfoInput;
  pipelineInfo: Seekwell__CreatePipelineInput;
};

export type TseAppActions__CreatePipelineAndRunResult = {
  __typename?: 'TSEAppActions__createPipelineAndRunResult';
  message?: Maybe<Scalars['String']>;
  pipelineId?: Maybe<Scalars['String']>;
  pipelineInstId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Tab = {
  __typename?: 'Tab';
  containerIds?: Maybe<Array<Maybe<Scalars['GUID']>>>;
  id: Scalars['GUID'];
  name?: Maybe<Scalars['String']>;
};

export type TabHeader = {
  __typename?: 'TabHeader';
  display_name: Scalars['String'];
  guid: Scalars['GUID'];
};

export type TabInfo = {
  __typename?: 'TabInfo';
  containers?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['GUID'];
  name?: Maybe<Scalars['String']>;
};

export type TabTypeSuggestion = {
  __typename?: 'TabTypeSuggestion';
  queryTemplateType?: Maybe<Array<Maybe<QueryTemplateType>>>;
  replaceableColPropertiesList?: Maybe<Array<Maybe<ReplaceableColPropertiesList>>>;
  suggestions: Array<Maybe<Suggestion>>;
  tabType: Scalars['String'];
};

export type Table = {
  columns?: InputMaybe<Array<InputMaybe<TableColumn>>>;
  description?: InputMaybe<Scalars['String']>;
  linked?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  relationships?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  selected?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
};

export type TableColumn = {
  canImport?: InputMaybe<Scalars['Boolean']>;
  dbName?: InputMaybe<Scalars['String']>;
  isAggregate?: InputMaybe<Scalars['Boolean']>;
  isImported?: InputMaybe<Scalars['Boolean']>;
  isLinkedActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  schemaName?: InputMaybe<Scalars['String']>;
  selected?: InputMaybe<Scalars['Boolean']>;
  tableName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type TableColumnPropertyMap = {
  __typename?: 'TableColumnPropertyMap';
  columnId?: Maybe<Scalars['String']>;
  columnProperty?: Maybe<TableVizColumnProperties>;
};

export type TableColumns = {
  __typename?: 'TableColumns';
  /** Datatype of the column */
  dataType?: Maybe<Scalars['String']>;
  /** Name of the column */
  name?: Maybe<Scalars['String']>;
};

export enum TableContentDensity {
  Compact = 'COMPACT',
  Regular = 'REGULAR'
}

export type TableInput = {
  /** GUID of the Table */
  id?: InputMaybe<Scalars['String']>;
  /** Name of the table */
  name?: InputMaybe<Scalars['String']>;
};

export type TableRepresentation = {
  __typename?: 'TableRepresentation';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<LogicalTableTypeEnum>;
};

export enum TableTheme {
  Outline = 'OUTLINE',
  Row = 'ROW',
  Zebra = 'ZEBRA'
}

export type TableToken = {
  __typename?: 'TableToken';
  tableName: Scalars['String'];
  token: Scalars['String'];
};

export enum TableType {
  AggWorksheet = 'AGG_WORKSHEET',
  BaseTable = 'BASE_TABLE',
  QueryTable = 'QUERY_TABLE',
  Unknown = 'UNKNOWN',
  Worksheet = 'WORKSHEET'
}

export type TableViz = Visualization & {
  __typename?: 'TableViz';
  clientState?: Maybe<Scalars['JSON']>;
  /** ----------- Table Specific Fields ----------- */
  columns?: Maybe<Array<VizColumn>>;
  data?: Maybe<Scalars['JSON']>;
  /** ----------- Visualization Common Fields ----------- */
  id: Scalars['ID'];
  isCustomTitle?: Maybe<Scalars['Boolean']>;
  sortInfo?: Maybe<Array<Maybe<ColumnSortInfo>>>;
  title?: Maybe<Scalars['String']>;
  topInfo?: Maybe<Array<Maybe<ColumnSortInfo>>>;
  vizProp?: Maybe<TableVizProps>;
};


export type TableVizDataArgs = {
  canceId?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['Int']>;
  pagination?: InputMaybe<DataPaginationParamsInput>;
};

export type TableVizColumnProperties = {
  __typename?: 'TableVizColumnProperties';
  conditionalFormatting?: Maybe<ConditionalFormatting>;
  wrapColumnText?: Maybe<Scalars['Boolean']>;
};

export enum TableVizPropVersion {
  PreV1 = 'PRE_V1',
  V1 = 'V1'
}

export type TableVizProps = {
  __typename?: 'TableVizProps';
  columnProperties?: Maybe<Array<Maybe<TableColumnPropertyMap>>>;
  density?: Maybe<TableContentDensity>;
  orderedColumnIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  showGridSummary?: Maybe<Scalars['Boolean']>;
  showTableFooter?: Maybe<Scalars['Boolean']>;
  tableVizPropVersion?: Maybe<TableVizPropVersion>;
  theme?: Maybe<TableTheme>;
  widthState?: Maybe<Array<Maybe<WidthStateMap>>>;
  wrapTableHeader?: Maybe<Scalars['Boolean']>;
};

/** A type that describes table list response */
export type TablesListReponse = {
  __typename?: 'TablesListReponse';
  hasRowCounts?: Maybe<Scalars['Boolean']>;
  listMetadataHeader: Array<Maybe<ListMetadataHeader>>;
};

/** A type that describes a tag. */
export type Tag = {
  __typename?: 'Tag';
  /** Tag's author */
  author: Scalars['String'];
  /** Tag's color */
  color?: Maybe<Scalars['String']>;
  /** Time when the tag was created */
  created?: Maybe<Scalars['Long']>;
  /** Tag's ID */
  id: Scalars['GUID'];
  /** Time when the tag was modified */
  modified?: Maybe<Scalars['Long']>;
  /** Tag's name */
  name: Scalars['String'];
  /** Owner of the tag */
  owner?: Maybe<Scalars['String']>;
};

export type TagNameAndId = {
  __typename?: 'TagNameAndID';
  /** GUID of the group to which group  is added */
  id?: Maybe<Scalars['String']>;
  /** Name of the group to which group  is added */
  name?: Maybe<Scalars['String']>;
};

export type TagNameAndIdInput = {
  /** GUID of the tags */
  id?: InputMaybe<Scalars['String']>;
  /** Name of the tags */
  name?: InputMaybe<Scalars['String']>;
};

/** List of Tags */
export type Tags = {
  __typename?: 'Tags';
  isLastBatch: Scalars['Boolean'];
  tags?: Maybe<Array<Tag>>;
};

export type TemplateEntries = {
  __typename?: 'TemplateEntries';
  templateEntries: Array<TemplateEntry>;
  templateType?: Maybe<QueryTemplateType>;
};

export type TemplateEntriesInput = {
  templateEntries: Array<TemplateEntryInput>;
  templateType?: InputMaybe<QueryTemplateType>;
};

export type TemplateEntry = {
  __typename?: 'TemplateEntry';
  constraints?: Maybe<TokenConstraint>;
  textPlaceholder?: Maybe<Scalars['String']>;
  token?: Maybe<RecognizedToken>;
  type: TemplateEntryType;
};

export type TemplateEntryInput = {
  constraints?: InputMaybe<TokenConstraintInput>;
  textPlaceholder?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<RecognizedTokenInput>;
  type: TemplateEntryType;
};

export enum TemplateEntryType {
  Text = 'TEXT',
  Token = 'TOKEN'
}

/**  Generated from tsProto.a3.metric_monitor.Comparator  */
export enum ThresholdComparator {
  ComparatorEq = 'COMPARATOR_EQ',
  ComparatorGeq = 'COMPARATOR_GEQ',
  ComparatorGt = 'COMPARATOR_GT',
  ComparatorLeq = 'COMPARATOR_LEQ',
  ComparatorLt = 'COMPARATOR_LT',
  ComparatorNeq = 'COMPARATOR_NEQ',
  ComparatorUnspecified = 'COMPARATOR_UNSPECIFIED'
}

/**  Generated from tsProto.a3.metric_monitor.PercentageChangeComparator  */
export enum ThresholdPercentageChangeComparator {
  PercentageChangeComparatorChangesBy = 'PERCENTAGE_CHANGE_COMPARATOR_CHANGES_BY',
  PercentageChangeComparatorDecreasesBy = 'PERCENTAGE_CHANGE_COMPARATOR_DECREASES_BY',
  PercentageChangeComparatorIncreasesBy = 'PERCENTAGE_CHANGE_COMPARATOR_INCREASES_BY',
  PercentageChangeComparatorUnspecified = 'PERCENTAGE_CHANGE_COMPARATOR_UNSPECIFIED'
}

export type TimeSchedule = {
  __typename?: 'TimeSchedule';
  periodicSchedule?: Maybe<PeriodicSchedule>;
  periodicity?: Maybe<Periodicity>;
};

export type TimelyJobId = {
  __typename?: 'TimelyJobId';
  timelyJobId?: Maybe<Scalars['GUID']>;
};

/** A JSON object of name or GUIDs of the new owner for the objects. When both are given then id is considered. */
export type ToUserNameAndIdInput = {
  /** GUID of the user */
  id?: InputMaybe<Scalars['String']>;
  /** Username of the user */
  name?: InputMaybe<Scalars['String']>;
};

export type TokenConstraint = {
  __typename?: 'TokenConstraint';
  editType?: Maybe<EditType>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  negativeRestrictedTypes?: Maybe<Array<Maybe<FalconDataType>>>;
  tokenString?: Maybe<Scalars['String']>;
  typeEnum?: Maybe<RecognizedTokenType>;
};

export type TokenConstraintInput = {
  editType?: InputMaybe<EditType>;
  keywords?: InputMaybe<Array<Scalars['String']>>;
  negativeRestrictedTypes?: InputMaybe<Array<FalconDataType>>;
  tokenString?: InputMaybe<Scalars['String']>;
  typeEnum?: InputMaybe<RecognizedTokenType>;
};

export type TooltipConfig = {
  __typename?: 'TooltipConfig';
  columnIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type TopRepresentation = {
  __typename?: 'TopRepresentation';
  groupLimitColumns?: Maybe<Array<Maybe<ColumnRepresentation>>>;
  rankedByColumns?: Maybe<Array<Maybe<SortColumnRepresentation>>>;
  topColumns?: Maybe<Array<Maybe<ColumnRepresentation>>>;
  topCount?: Maybe<Scalars['Int']>;
};

export type TrendAnalysis = {
  algorithm?: InputMaybe<AnalysisAlgorithm>;
};

/** List of Trending */
export type Trending = {
  __typename?: 'Trending';
  answers?: Maybe<Array<TrendingItem>>;
  pinboards?: Maybe<Array<TrendingItem>>;
};

/** A type that describes a trending item. */
export type TrendingItem = {
  __typename?: 'TrendingItem';
  author?: Maybe<Scalars['String']>;
  authorDisplayName?: Maybe<Scalars['String']>;
  authorName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  stats?: Maybe<TrendingStats>;
  type?: Maybe<Scalars['String']>;
};

/** Type describing a trending item's statistics */
export type TrendingStats = {
  __typename?: 'TrendingStats';
  favorites?: Maybe<Scalars['Float']>;
  lastAccessed?: Maybe<Scalars['Long']>;
  views?: Maybe<Scalars['Float']>;
};

export enum TrueFalse {
  False = 'False',
  True = 'True'
}

export enum TsObject {
  Answer = 'ANSWER',
  Connection = 'CONNECTION',
  Dataobject = 'DATAOBJECT',
  Liveboard = 'LIVEBOARD'
}

export enum TsObjectDetailGet {
  Answer = 'ANSWER',
  Column = 'COLUMN',
  Connection = 'CONNECTION',
  Dataobject = 'DATAOBJECT',
  Join = 'JOIN',
  Liveboard = 'LIVEBOARD',
  Tag = 'TAG',
  User = 'USER',
  UserGroup = 'USER_GROUP'
}

export enum TsObjectGet {
  Answer = 'ANSWER',
  ColumnAll = 'COLUMN_ALL',
  ColumnCalendarTable = 'COLUMN_CALENDAR_TABLE',
  ColumnTable = 'COLUMN_TABLE',
  ColumnUserDefined = 'COLUMN_USER_DEFINED',
  ColumnView = 'COLUMN_VIEW',
  ColumnWorksheet = 'COLUMN_WORKSHEET',
  Connection = 'CONNECTION',
  DataobjectAll = 'DATAOBJECT_ALL',
  DataobjectCalendarTable = 'DATAOBJECT_CALENDAR_TABLE',
  DataobjectTable = 'DATAOBJECT_TABLE',
  DataobjectUserDefined = 'DATAOBJECT_USER_DEFINED',
  DataobjectView = 'DATAOBJECT_VIEW',
  DataobjectWorksheet = 'DATAOBJECT_WORKSHEET',
  Join = 'JOIN',
  Liveboard = 'LIVEBOARD',
  Tag = 'TAG',
  User = 'USER',
  UserGroup = 'USER_GROUP'
}

export type TsObjectInput = {
  /** GUID of the metadata object */
  id: Scalars['String'];
  /** Type of the metadata object */
  type: TsObject;
};

export type TsObjectSearchInput = {
  /** A JSON Array of GUIDs of the metadata object */
  id: Array<InputMaybe<Scalars['String']>>;
  /** Type of the metadata objec */
  type: SecurityType;
};

export type TsObjectTypeSerach = {
  __typename?: 'TsObjectTypeSerach';
  /** Author of the object */
  author?: Maybe<UserNameAndId>;
  /** An array of object with details of permission on the user groups to which the user or user group belongs */
  groupPermission?: Maybe<Array<Maybe<GroupPermission>>>;
  /** GUID of the object */
  id?: Maybe<Scalars['String']>;
  /** Name of the object */
  name?: Maybe<Scalars['String']>;
  /** Owner of the object */
  owner?: Maybe<Scalars['String']>;
  /** Indicates the permission which user or user group has on the object */
  permission?: Maybe<Scalars['String']>;
  /** Indicates the permission which user or user group has on the object through sharing of the object with the user or user group */
  sharedPermission?: Maybe<Scalars['String']>;
};

export type TseLicenseConfigInput = {
  daysLeft?: InputMaybe<Scalars['Long']>;
  freeTrialEnabled?: InputMaybe<Scalars['Boolean']>;
  freeTrialExpired?: InputMaybe<Scalars['Boolean']>;
  freeTrialStartDate?: InputMaybe<Scalars['Long']>;
  licenseEnabled?: InputMaybe<Scalars['Boolean']>;
  licenseEnforcementDisabled?: InputMaybe<Scalars['Boolean']>;
};

export type TseLicenseDetail = {
  __typename?: 'TseLicenseDetail';
  daysLeft?: Maybe<Scalars['Long']>;
  freeTrialEnabled?: Maybe<Scalars['Boolean']>;
  freeTrialExpired?: Maybe<Scalars['Boolean']>;
  freeTrialStartDate?: Maybe<Scalars['Long']>;
  licenseEnabled?: Maybe<Scalars['Boolean']>;
  licenseEnforcementDisabled?: Maybe<Scalars['Boolean']>;
};

export type TseLicenseInput = {
  tseLicenseConfig?: InputMaybe<TseLicenseConfigInput>;
};

/**  Generated from tsProto.bach.answer.KPITuple.TupleType  */
export enum TupleType {
  Current = 'CURRENT',
  LastAvailable = 'LAST_AVAILABLE',
  PrevAvailable = 'PREV_AVAILABLE',
  PrevDay = 'PREV_DAY',
  PrevHour = 'PREV_HOUR',
  PrevMonth = 'PREV_MONTH',
  PrevQuarter = 'PREV_QUARTER',
  PrevWeek = 'PREV_WEEK',
  PrevYear = 'PREV_YEAR'
}

export type UrlParam = {
  key?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export enum Unit {
  Auto = 'AUTO',
  Billion = 'BILLION',
  Million = 'MILLION',
  None = 'NONE',
  Thousands = 'THOUSANDS',
  Trillion = 'TRILLION'
}

export type UpdateCatalogDataSourcesInput = {
  connectionId?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Array<InputMaybe<CatalogMetaData>>>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateCatalogDataSourcesResult = {
  __typename?: 'UpdateCatalogDataSourcesResult';
  connectionId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type UpdateCatalogMetaDataInput = {
  connection_id?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Array<InputMaybe<CatalogMetaData>>>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateCatalogMetaDataResult = {
  __typename?: 'UpdateCatalogMetaDataResult';
  connection_id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type UpdateCatalogScheduleInput = {
  connection_id?: InputMaybe<Scalars['String']>;
  schedule?: InputMaybe<ScheduleOption>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateCatalogScheduleResult = {
  __typename?: 'UpdateCatalogScheduleResult';
  connection_id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type UpdateColumnPropertiesTransform = {
  columnProperties?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateConfigInput = {
  accessToken?: InputMaybe<Scalars['String']>;
  branchNames?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  defaultBranchName?: InputMaybe<Scalars['String']>;
  enableGuidMapping?: InputMaybe<Scalars['Boolean']>;
  guidMappingBranchName?: InputMaybe<Scalars['String']>;
  orgIdentifier?: InputMaybe<Scalars['String']>;
  repositoryUrl?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateConnectorStatusInput = {
  appGuid: Scalars['String'];
  connectorType: ConnectorType;
  serviceType?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
  userGuid: Scalars['String'];
};

export type UpdateFilterGroup = {
  addExcludedContainerIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  addLinkedFilters?: InputMaybe<Array<InputMaybe<FilterGroupIdInput>>>;
  filterGroupId?: InputMaybe<FilterGroupIdInput>;
  newFilterGroupDisplayName?: InputMaybe<Scalars['String']>;
  removeExcludedContainerIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  removeLinkedFilters?: InputMaybe<Array<InputMaybe<FilterGroupIdInput>>>;
  updatedIsMandatory?: InputMaybe<Scalars['Boolean']>;
  updatedIsSingleValue?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateGroupInput = {
  description?: InputMaybe<Scalars['String']>;
  displayName: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  privileges?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  visibility?: InputMaybe<PrincipalVisibilityType>;
};

export type UpdateRole_DataInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  privileges?: InputMaybe<Scalars['String']>;
};

export type UpdateScheduleInput = {
  scheduleId: Scalars['String'];
  scheduleInfo: UpdatedScheduleInfoInput;
};

export type UpdateScheduleResult = {
  __typename?: 'UpdateScheduleResult';
  scheduleId?: Maybe<Scalars['String']>;
};

export type UpdateSqlViewResponse = {
  __typename?: 'UpdateSqlViewResponse';
  dependencyModel?: Maybe<SqlDependencyModel>;
  id: BachSessionId;
};

export type UpdateUserInput = {
  displayName: Scalars['String'];
  groups?: InputMaybe<Array<InputMaybe<GroupNameAndIdInput>>>;
  id: Scalars['String'];
  mail?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  visibility?: InputMaybe<PrincipalVisibilityType>;
};

export type UpdatedScheduleInfoInput = {
  clientMessage?: InputMaybe<Scalars['String']>;
  cronExpression?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  scheduleType?: InputMaybe<ScheduleType>;
  timeZone?: InputMaybe<Scalars['String']>;
};

/** Upload profile picture input */
export type UploadProfilePicInput = {
  fileName: Scalars['String'];
  iconBase64String: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type UserDetails = {
  __typename?: 'UserDetails';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  visibility?: Maybe<PrincipalVisibilityType>;
};

export type UserGroup = {
  __typename?: 'UserGroup';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  users?: Maybe<Array<User>>;
};

export type UserGroupInput = {
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<UserInput>>;
};

export type UserInput = {
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type UserNameAndId = {
  __typename?: 'UserNameAndID';
  /** GUID of the user */
  id?: Maybe<Scalars['String']>;
  /** Username of the user */
  name?: Maybe<Scalars['String']>;
};

export type UserNameAndIdInput = {
  /** GUID of the user */
  id?: InputMaybe<Scalars['String']>;
  /** Username of the user */
  name?: InputMaybe<Scalars['String']>;
};

export type UserObjectType = {
  __typename?: 'UserObjectType';
  /** Status of the user account. */
  account_status?: Maybe<Users__AccountStatus>;
  /** Type of the user account. */
  account_type?: Maybe<Users__AccountType>;
  /** Unique identifier of author of the user. */
  author_id?: Maybe<Scalars['String']>;
  /** Indicates whether the user can change their password. */
  can_change_password?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the response has complete detail of the user. */
  complete_detail?: Maybe<Scalars['Boolean']>;
  /** Creation time of the user in milliseconds. */
  creation_time_in_millis?: Maybe<Scalars['Float']>;
  /** Current logged in Organizations of the user. */
  current_org?: Maybe<Org>;
  /** Indicates whether the user is deleted. */
  deleted?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the user is deprecated. */
  deprecated?: Maybe<Scalars['Boolean']>;
  /** Display name of the user. */
  display_name: Scalars['String'];
  /** Email of the user. */
  email?: Maybe<Scalars['String']>;
  /** Expiration time of the user in milliseconds. */
  expiration_time_in_millis?: Maybe<Scalars['Float']>;
  /** Indicates whether the user is external. */
  external?: Maybe<Scalars['Boolean']>;
  /** Metadata objects to be assigned as favorites for the imported user. */
  favorite_metadata?: Maybe<Array<Maybe<Users__FavoriteMetadataItem>>>;
  /** First login time of the user in milliseconds. */
  first_login_time_in_millis?: Maybe<Scalars['Float']>;
  /** Group mask of the user. */
  group_mask?: Maybe<Scalars['Int']>;
  /** Indicates whether the user is hidden. */
  hidden?: Maybe<Scalars['Boolean']>;
  /** Unique ID or name of the users home liveboard. */
  home_liveboard?: Maybe<IdAndNameObject>;
  /** Unique identifier of the user. */
  id: Scalars['String'];
  /** Incomplete details of user if any present. */
  incomplete_details?: Maybe<Scalars['JSON']>;
  /** Indicates whether it is first login of the user. */
  is_first_login?: Maybe<Scalars['Boolean']>;
  /** Last modified time of the user in milliseconds. */
  modification_time_in_millis?: Maybe<Scalars['Float']>;
  /** Unique identifier of modifier of the user. */
  modifier_id?: Maybe<Scalars['String']>;
  /** Name of the user. */
  name: Scalars['String'];
  /** User preference for receiving email notifications on shared answers or liveboard. */
  notify_on_share?: Maybe<Scalars['Boolean']>;
  /** The user preference for turning off the onboarding experience. */
  onboarding_experience_completed?: Maybe<Scalars['Boolean']>;
  /** Organizations in which user exists. */
  orgs?: Maybe<Array<Maybe<Org>>>;
  /** Unique identifier of owner of the user. */
  owner_id?: Maybe<Scalars['String']>;
  /** Parent type of the user. */
  parent_type?: Maybe<Groups__ParentType>;
  /** Privileges which are assigned to the user. */
  privileges?: Maybe<Array<Maybe<Privileges>>>;
  /** The user preference for revisiting the onboarding experience. */
  show_onboarding_experience?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the user is a super user. */
  super_user?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the user is a system user. */
  system_user?: Maybe<Scalars['Boolean']>;
  /** Tags associated with the user. */
  tags?: Maybe<Array<Maybe<IdAndNameObject>>>;
  /** Unique identifier of tenant of the user. */
  tenant_id?: Maybe<Scalars['String']>;
  /** User Groups which the user is part of. */
  user_groups?: Maybe<Array<Maybe<IdAndNameObject>>>;
  /** Inherited User Groups which the user is part of. */
  user_inherited_groups?: Maybe<Array<Maybe<IdAndNameObject>>>;
  /** Visibility of the users. The SHARABLE makes a users visible to other users and user groups, and thus allows them to share objects. */
  visibility: Visibility;
  /** Indicates whether welcome email is sent for the user. */
  welcome_email_sent?: Maybe<Scalars['Boolean']>;
};

export type UserPointSelectionInput = {
  columnId: Scalars['String'];
  dataValue?: InputMaybe<Array<DataValue>>;
};

export type UserPreview = {
  __typename?: 'UserPreview';
  header?: Maybe<EntityHeader>;
};

export type UserPropertiesInput = {
  mail?: InputMaybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  /** Indicates if the onboarding is completed for the user */
  analystOnboardingComplete?: Maybe<Scalars['Boolean']>;
  /** Author of the user account */
  author?: Maybe<UserNameAndId>;
  /** Indicates if the all the properties of user account is provided */
  complete?: Maybe<Scalars['Boolean']>;
  /** Date and time when user account was created */
  created?: Maybe<Scalars['Float']>;
  /** Display name of the user account */
  displayName?: Maybe<Scalars['String']>;
  /** Indicates if the use is logging in for the first time */
  firstLogin?: Maybe<Scalars['Int']>;
  generationNum?: Maybe<Scalars['Float']>;
  /** Name of the group to which user account is added */
  groups?: Maybe<Array<Maybe<GroupNameAndId>>>;
  /** GUID of the user account */
  id?: Maybe<Scalars['String']>;
  indexVersion?: Maybe<Scalars['Float']>;
  /** Indicates if the user account is deleted */
  isDeleted?: Maybe<Scalars['Boolean']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /**
   * Indicates if the user account is from external system
   * isDeprecated
   */
  isExternal?: Maybe<Scalars['Boolean']>;
  /** Indicates if the user account is hidden */
  isHidden?: Maybe<Scalars['Boolean']>;
  /** Indicates if the user account is super user */
  isSuperUser?: Maybe<Scalars['Boolean']>;
  /** Indicates if the user account is system principal */
  isSystemPrincipal?: Maybe<Scalars['Boolean']>;
  /** Email of the user account */
  mail?: Maybe<Scalars['String']>;
  /** Date and time of last modification of user account */
  modified?: Maybe<Scalars['Float']>;
  /** The user which last modified the user account details */
  modifiedBy?: Maybe<UserNameAndId>;
  /** Username of the user account */
  name?: Maybe<Scalars['String']>;
  /** Indicates if the email should be sent when object is shared with the user */
  notifyOnShare?: Maybe<Scalars['Boolean']>;
  /** The organizations that user belongs to */
  orgs?: Maybe<Array<Maybe<OrgType>>>;
  /** Owner of the user account */
  owner?: Maybe<UserNameAndId>;
  /** Indicates the type of parent object */
  parenttype?: Maybe<Scalars['String']>;
  /** Privileges assigned to user account */
  privileges?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Indicates if the walk me should be shown when logging in */
  showWalkMe?: Maybe<Scalars['Boolean']>;
  /** Indicates if the user account is active or inactive */
  state?: Maybe<Scalars['String']>;
  /** Tags assigned to the user */
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Tenant id associated with the user account */
  tenantId?: Maybe<Scalars['String']>;
  /** Indicates the type of user account */
  type?: Maybe<Scalars['String']>;
  /** Visibility of the user account */
  visibility?: Maybe<Scalars['String']>;
  /** Indicates if the welcome email is sent to email associated with the user account */
  welcomeEmailSent?: Maybe<Scalars['Boolean']>;
};

export enum Users__AccountStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Inactive = 'INACTIVE',
  Locked = 'LOCKED',
  Pending = 'PENDING'
}

export enum Users__AccountType {
  LdapUser = 'LDAP_USER',
  LocalUser = 'LOCAL_USER',
  OidcUser = 'OIDC_USER',
  RemoteUser = 'REMOTE_USER',
  SamlUser = 'SAML_USER'
}

export enum Users__FavoriteMetadata {
  Answer = 'ANSWER',
  Connection = 'CONNECTION',
  Liveboard = 'LIVEBOARD',
  LogicalTable = 'LOGICAL_TABLE'
}

export type Users__FavoriteMetadataInput = {
  /** Unique ID or name of the metadata. */
  identifier?: InputMaybe<Scalars['String']>;
  /** Type of metadata. */
  type?: InputMaybe<Users__FavoriteMetadata>;
};

export type Users__FavoriteMetadataItem = {
  __typename?: 'Users__FavoriteMetadataItem';
  /** Unique ID of the metadata. */
  id: Scalars['String'];
  /** name of the metadata. */
  name: Scalars['String'];
  /** Type of metadata. */
  type: MetadataType;
};

export type Users__SortOptions = {
  field_name?: InputMaybe<SortOptionFieldName>;
  order?: InputMaybe<SortOptionOrder>;
};

/**
 * Valid metadata types accepted by Callosum exportEPack API
 * The first three will be deprecated soon
 */
export enum ValidEdocMetadataType {
  /** answer */
  Answer = 'ANSWER',
  /** cohort */
  Cohort = 'COHORT',
  /** worksheet */
  LogicalTable = 'LOGICAL_TABLE',
  /** monitor_alerts */
  MonitorAlerts = 'MONITOR_ALERTS',
  /** pinboard */
  Pinboard = 'PINBOARD',
  /** pinboard */
  PinboardAnswerBook = 'PINBOARD_ANSWER_BOOK',
  /** answer */
  QuestionAnswerBook = 'QUESTION_ANSWER_BOOK',
  /** sqlview */
  SqlView = 'SQL_VIEW',
  /** table */
  Table = 'TABLE',
  /** view */
  View = 'VIEW',
  /** worksheet */
  Worksheet = 'WORKSHEET'
}

export type ValidateA3QueryResponse = {
  __typename?: 'ValidateA3QueryResponse';
  reason?: Maybe<Scalars['String']>;
  supported?: Maybe<Scalars['Boolean']>;
};

export type VerificationStatusResponse = {
  __typename?: 'VerificationStatusResponse';
  isLBModified?: Maybe<Scalars['Boolean']>;
  isLBVerificationRequested?: Maybe<Scalars['Boolean']>;
  isLBVerified?: Maybe<Scalars['Boolean']>;
  isValidVerifier?: Maybe<Scalars['Boolean']>;
  requesterName?: Maybe<Scalars['String']>;
  verificationStatus?: Maybe<Scalars['String']>;
};

export type VerifierLiveboard = {
  __typename?: 'VerifierLiveboard';
  liveboardName?: Maybe<Scalars['String']>;
  pinboardId?: Maybe<Scalars['String']>;
  requestedDate?: Maybe<Scalars['Float']>;
  requesterGuid?: Maybe<Scalars['String']>;
  requesterName?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  verifiedDate?: Maybe<Scalars['Float']>;
  verifierGuid?: Maybe<Scalars['String']>;
  verifierName?: Maybe<Scalars['String']>;
};

export type VerifierLiveboardsInput = {
  batchsize?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  pattern?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  sortascending?: InputMaybe<Scalars['Boolean']>;
  subtype?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type VerifierLiveboardsResponse = {
  __typename?: 'VerifierLiveboardsResponse';
  isLastBatch?: Maybe<Scalars['Boolean']>;
  verifierLiveboards?: Maybe<Array<Maybe<VerifierLiveboard>>>;
};

export type VerifierType = {
  __typename?: 'VerifierType';
  isSelected?: Maybe<Scalars['Boolean']>;
  mailId?: Maybe<Scalars['String']>;
  sharePrivilege?: Maybe<Scalars['String']>;
  userGuid?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type VerifierTypeInput = {
  isSelected?: InputMaybe<Scalars['Boolean']>;
  sharePrivilege?: InputMaybe<Scalars['String']>;
  userGuid?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type VerifiersListResponse = {
  __typename?: 'VerifiersListResponse';
  isLBSharedVerifiers?: Maybe<Scalars['Boolean']>;
  isRequested?: Maybe<Scalars['Boolean']>;
  lbVerifiers?: Maybe<Array<Maybe<VerifierType>>>;
  requesterGuid?: Maybe<Scalars['String']>;
};

export type VerifyAuthConnectionInput = {
  credentials?: InputMaybe<AuthCredentials>;
  type: Scalars['String'];
};

export type VerifyAuthConnectionResult = {
  __typename?: 'VerifyAuthConnectionResult';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  valid_connection?: Maybe<Scalars['Boolean']>;
};

export type VerifyLiveboardInput = {
  message?: InputMaybe<Scalars['String']>;
  pinboardId: Scalars['String'];
  status: Scalars['String'];
};

export type VisConfig = {
  __typename?: 'VisConfig';
  columnOrdering?: Maybe<Array<Scalars['String']>>;
};

export type VisTable = {
  __typename?: 'VisTable';
  config?: Maybe<VisConfig>;
  tableColumn?: Maybe<Array<Maybe<SqlTableColumnObj>>>;
};

export type VisText = {
  __typename?: 'VisText';
  text?: Maybe<Scalars['String']>;
};

export type VisTitle = {
  __typename?: 'VisTitle';
  text?: Maybe<VisText>;
};

export enum Visibility {
  NonSharable = 'NON_SHARABLE',
  Sharable = 'SHARABLE'
}

export type VisualHeader = {
  __typename?: 'VisualHeader';
  displayName?: Maybe<Scalars['String']>;
  guid: Scalars['GUID'];
};

export type Visualization = {
  data?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  isCustomTitle?: Maybe<Scalars['Boolean']>;
  sortInfo?: Maybe<Array<Maybe<ColumnSortInfo>>>;
  title?: Maybe<Scalars['String']>;
};


export type VisualizationDataArgs = {
  canceId?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['Int']>;
  pagination?: InputMaybe<DataPaginationParamsInput>;
};

export type VisualizationFormatOptions = {
  truncateTables?: InputMaybe<Scalars['Boolean']>;
};

export type VisualizationFormatOptionsResponse = {
  __typename?: 'VisualizationFormatOptionsResponse';
  truncateTables?: Maybe<Scalars['Boolean']>;
};

export enum VisualizationQueryStatus {
  /** Executing query on CDW */
  ExecutingQuery = 'EXECUTING_QUERY',
  /** Represents if the query is in TS priority queue */
  InPriorityQueue = 'IN_PRIORITY_QUEUE',
  /** Query Execution is done and ThoughtSpot is processing the result of the query */
  ProcessingResults = 'PROCESSING_RESULTS',
  /** Unknown State */
  Unknown = 'UNKNOWN',
  /** Waiting for database connection to get established */
  WaitingForConnection = 'WAITING_FOR_CONNECTION'
}

export type VizColumn = {
  __typename?: 'VizColumn';
  column?: Maybe<AnswerColumn>;
  legacyMetricDefinition?: Maybe<ColumnConditionalFormatConfig>;
};

export type VizData = {
  __typename?: 'VizData';
  data?: Maybe<Scalars['JSON']>;
  vizId: Scalars['ID'];
};


export type VizDataDataArgs = {
  canceId?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['Int']>;
  pagination?: InputMaybe<DataPaginationParamsInput>;
};

export type VizDataColumnDataLite = {
  __typename?: 'VizDataColumnDataLite';
  columnDataType?: Maybe<FalconDataType>;
  columnId?: Maybe<Scalars['String']>;
  dataValue?: Maybe<Scalars['String']>;
};

export type VizDataRes = {
  __typename?: 'VizDataRes';
  table?: Maybe<VizDataTable>;
  type?: Maybe<Scalars['String']>;
};

export type VizDataResponse = IBachResponse & {
  __typename?: 'VizDataResponse';
  id: BachSessionId;
  vizData: Array<VizData>;
};

export type VizDataTable = {
  __typename?: 'VizDataTable';
  data?: Maybe<VizDataTableData>;
};

export type VizDataTableData = {
  __typename?: 'VizDataTableData';
  columnDataLite?: Maybe<Array<VizDataColumnDataLite>>;
};

export type VizType = {
  __typename?: 'VizType';
  /** The GUID of the visualization */
  id?: Maybe<Scalars['String']>;
  /** The name of the visualization */
  name?: Maybe<Scalars['String']>;
  /** SQL query associated with the visualization */
  querySql?: Maybe<Scalars['String']>;
};

/**  Generated from tsProto.a3.metric_monitor.WebhookAuthType  */
export enum WebhookAuthType {
  ApiKeyType = 'API_KEY_TYPE',
  NoAuthType = 'NO_AUTH_TYPE',
  OAuth2Type = 'O_AUTH2_TYPE'
}

export type WebhookConfig = {
  __typename?: 'WebhookConfig';
  apiKey?: Maybe<Scalars['String']>;
  authType?: Maybe<WebhookAuthType>;
  clientId?: Maybe<Scalars['String']>;
  clientSecret?: Maybe<Scalars['String']>;
  eventSchemaType?: Maybe<EventSchemaType>;
  id: Scalars['String'];
  name: Scalars['String'];
  orgId?: Maybe<Scalars['Int']>;
  schemaVersion?: Maybe<SchemaVersion>;
  tokenServiceUrl?: Maybe<Scalars['String']>;
  updatedByUser?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  urlParams?: Maybe<Scalars['String']>;
};

export type WebhookConfigInput = {
  apiKey?: InputMaybe<Scalars['String']>;
  authType?: InputMaybe<WebhookAuthType>;
  clientId?: InputMaybe<Scalars['String']>;
  clientSecret?: InputMaybe<Scalars['String']>;
  eventSchemaType?: InputMaybe<EventSchemaType>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  orgId?: InputMaybe<Scalars['Int']>;
  schemaVersion?: InputMaybe<SchemaVersion>;
  tokenServiceUrl?: InputMaybe<Scalars['String']>;
  updatedByUser?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
  urlParams?: InputMaybe<Scalars['String']>;
};

export enum WeekDay {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  NumWeekDays = 'NUM_WEEK_DAYS',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type WidthStateMap = {
  __typename?: 'WidthStateMap';
  columnId?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
};

export type Worksheet = {
  __typename?: 'Worksheet';
  id?: Maybe<Scalars['String']>;
  lessonPlans?: Maybe<Array<Maybe<LessonPlan>>>;
};

export type WorksheetColumn = {
  __typename?: 'WorksheetColumn';
  canEditJoinPath?: Maybe<Scalars['Boolean']>;
  columnDependents?: Maybe<Array<Maybe<WorksheetColumnDependents>>>;
  dataType?: Maybe<Scalars['String']>;
  formatPattern?: Maybe<Scalars['String']>;
  header?: Maybe<EntityHeader>;
  incompleteDetail?: Maybe<Array<Maybe<IncompleteDetail>>>;
};

export type WorksheetColumnDependents = {
  __typename?: 'WorksheetColumnDependents';
  columnHeader?: Maybe<Array<Maybe<EntityHeader>>>;
  tableHeader?: Maybe<EntityHeader>;
};

export type WorksheetColumnsGroup = {
  __typename?: 'WorksheetColumnsGroup';
  header?: Maybe<EntityHeader>;
  schemaTableId?: Maybe<Scalars['Int']>;
  worksheetColumn?: Maybe<Array<Maybe<WorksheetColumn>>>;
};

export type WorksheetEditResponse = {
  __typename?: 'WorksheetEditResponse';
  accessibleTable?: Maybe<Array<Maybe<EntityHeader>>>;
  cloneWorksheetModel?: Maybe<WorksheetModel>;
  deleteColumnDependents?: Maybe<Array<Maybe<DependencyModel>>>;
  id?: Maybe<BachSessionId>;
  parameterDependencies?: Maybe<Array<Maybe<Dependency>>>;
  schemaJoinResponse?: Maybe<SchemaJoinResponse>;
  schemaTableResponse?: Maybe<SchemaTableResponse>;
  worksheetModel?: Maybe<WorksheetModel>;
};

export type WorksheetEditSession = IBachResponse & {
  __typename?: 'WorksheetEditSession';
  id: BachSessionId;
  worksheet: Worksheet;
};

export type WorksheetFormulaPreview = {
  __typename?: 'WorksheetFormulaPreview';
  header?: Maybe<EntityHeader>;
};

export type WorksheetModel = {
  __typename?: 'WorksheetModel';
  author?: Maybe<UserPreview>;
  columnGroup?: Maybe<Array<Maybe<WorksheetColumnsGroup>>>;
  dataSourceId?: Maybe<Scalars['String']>;
  formula?: Maybe<Array<Maybe<WorksheetFormulaPreview>>>;
  header?: Maybe<EntityHeader>;
  isCorrupt?: Maybe<Scalars['Boolean']>;
  jsonColumnProps?: Maybe<Scalars['String']>;
  parameter?: Maybe<Array<Maybe<Parameter>>>;
  properties?: Maybe<WorksheetProperties>;
  schemaGraphProto?: Maybe<SchemaGraph>;
  schemaJoins: Array<Maybe<WorksheetSchemaJoin>>;
};

export type WorksheetProperties = {
  __typename?: 'WorksheetProperties';
  disableRls?: Maybe<Scalars['Boolean']>;
  joinType?: Maybe<SageJoinType>;
};

export enum WorksheetRequestType {
  AddColumnsTransformRequest = 'ADD_COLUMNS_TRANSFORM_REQUEST',
  AddSchemaTableTransformRequest = 'ADD_SCHEMA_TABLE_TRANSFORM_REQUEST',
  CreateSchemaJoinRequest = 'CREATE_SCHEMA_JOIN_REQUEST',
  CreateWorksheetRequest = 'CREATE_WORKSHEET_REQUEST',
  DeleteColumnsTransformRequest = 'DELETE_COLUMNS_TRANSFORM_REQUEST',
  DeleteParameterTransformRequest = 'DELETE_PARAMETER_TRANSFORM_REQUEST',
  EditSchemaJoinRequest = 'EDIT_SCHEMA_JOIN_REQUEST',
  LoadWorksheetRequest = 'LOAD_WORKSHEET_REQUEST',
  ParameterDependenciesRequest = 'PARAMETER_DEPENDENCIES_REQUEST',
  SaveAsRequest = 'SAVE_AS_REQUEST',
  SaveParameterTransformRequest = 'SAVE_PARAMETER_TRANSFORM_REQUEST',
  SaveWorksheetRequest = 'SAVE_WORKSHEET_REQUEST',
  SelectSchemaJoinTransform = 'SELECT_SCHEMA_JOIN_TRANSFORM',
  SetScopeTransformRequest = 'SET_SCOPE_TRANSFORM_REQUEST',
  UpdateColumnPropertiesTransform = 'UPDATE_COLUMN_PROPERTIES_TRANSFORM'
}

export type WorksheetSchemaJoin = {
  __typename?: 'WorksheetSchemaJoin';
  destSchemaTableId?: Maybe<Scalars['Int']>;
  isOneToOneJoin?: Maybe<Scalars['Boolean']>;
  joinHeader?: Maybe<EntityHeader>;
  joinType?: Maybe<AtlasJoinType>;
  srcSchemaTableId?: Maybe<Scalars['Int']>;
};

export type Callosum_AggregateFunctionTypeEnumProto = {
  __typename?: 'callosum_AggregateFunctionTypeEnumProto';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_AggregateFunctionTypeEnumProto_E {
  Aggregate = 'AGGREGATE',
  AggrDistinct = 'AGGR_DISTINCT',
  ApproxAggrDistinct = 'APPROX_AGGR_DISTINCT',
  ApproxAggrDistinctMerge = 'APPROX_AGGR_DISTINCT_MERGE',
  ApproxCountDistinct = 'APPROX_COUNT_DISTINCT',
  Average = 'AVERAGE',
  Count = 'COUNT',
  CountDistinct = 'COUNT_DISTINCT',
  Growth = 'GROWTH',
  Max = 'MAX',
  Median = 'MEDIAN',
  Min = 'MIN',
  None = 'NONE',
  Percentile = 'PERCENTILE',
  Rank = 'RANK',
  RankPercentile = 'RANK_PERCENTILE',
  SqlBoolAggregateOp = 'SQL_BOOL_AGGREGATE_OP',
  SqlDateAggregateOp = 'SQL_DATE_AGGREGATE_OP',
  SqlDateTimeAggregateOp = 'SQL_DATE_TIME_AGGREGATE_OP',
  SqlDoubleAggregateOp = 'SQL_DOUBLE_AGGREGATE_OP',
  SqlIntAggregateOp = 'SQL_INT_AGGREGATE_OP',
  SqlStringAggregateOp = 'SQL_STRING_AGGREGATE_OP',
  SqlTimeAggregateOp = 'SQL_TIME_AGGREGATE_OP',
  StdDeviation = 'STD_DEVIATION',
  Sum = 'SUM',
  TableAggr = 'TABLE_AGGR',
  Variance = 'VARIANCE'
}

export type Callosum_ClientPlatformType = {
  __typename?: 'callosum_ClientPlatformType';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_ClientPlatformType_E {
  Android = 'ANDROID',
  BrowserChrome = 'BROWSER_CHROME',
  BrowserEdge = 'BROWSER_EDGE',
  BrowserSafari = 'BROWSER_SAFARI',
  Ios = 'IOS',
  Macos = 'MACOS',
  Windows = 'WINDOWS'
}

export type Callosum_ClientStateProto = {
  __typename?: 'callosum_ClientStateProto';
  state?: Maybe<Array<Maybe<Callosum_KeyValueProto>>>;
};

export type Callosum_ClientType = {
  __typename?: 'callosum_ClientType';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_ClientType_E {
  Blink = 'BLINK',
  BlinkV2 = 'BLINK_V2',
  FullEmbed = 'FULL_EMBED',
  Mobile = 'MOBILE',
  PublicApiDirect = 'PUBLIC_API_DIRECT'
}

export type Callosum_ColumnDataTypeEnumProto = {
  __typename?: 'callosum_ColumnDataTypeEnumProto';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_ColumnDataTypeEnumProto_E {
  Bool = 'BOOL',
  Char = 'CHAR',
  Date = 'DATE',
  DateNum = 'DATE_NUM',
  DateNumAbsDay = 'DATE_NUM_ABS_DAY',
  DateNumAbsHour = 'DATE_NUM_ABS_HOUR',
  DateNumAbsMonth = 'DATE_NUM_ABS_MONTH',
  DateNumAbsQuarter = 'DATE_NUM_ABS_QUARTER',
  DateNumAbsWeek = 'DATE_NUM_ABS_WEEK',
  DateNumAbsYear = 'DATE_NUM_ABS_YEAR',
  DateNumDayInMonth = 'DATE_NUM_DAY_IN_MONTH',
  DateNumDayInQuarter = 'DATE_NUM_DAY_IN_QUARTER',
  DateNumDayInYear = 'DATE_NUM_DAY_IN_YEAR',
  DateNumDayOfWeek = 'DATE_NUM_DAY_OF_WEEK',
  DateNumDayOfWeekStr = 'DATE_NUM_DAY_OF_WEEK_STR',
  DateNumHourInDay = 'DATE_NUM_HOUR_IN_DAY',
  DateNumMonthInQuarter = 'DATE_NUM_MONTH_IN_QUARTER',
  DateNumMonthInYear = 'DATE_NUM_MONTH_IN_YEAR',
  DateNumQuarterInYear = 'DATE_NUM_QUARTER_IN_YEAR',
  DateNumSecInDay = 'DATE_NUM_SEC_IN_DAY',
  DateNumWeekInMonth = 'DATE_NUM_WEEK_IN_MONTH',
  DateNumWeekInQuarter = 'DATE_NUM_WEEK_IN_QUARTER',
  DateNumWeekInYear = 'DATE_NUM_WEEK_IN_YEAR',
  DateTime = 'DATE_TIME',
  Double = 'DOUBLE',
  Float = 'FLOAT',
  Int32 = 'INT32',
  Int64 = 'INT64',
  Time = 'TIME',
  Unknown = 'UNKNOWN',
  Varchar = 'VARCHAR'
}

export type Callosum_ColumnSpotiqPreferenceProto = {
  __typename?: 'callosum_ColumnSpotiqPreferenceProto';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_ColumnSpotiqPreferenceProto_E {
  Default = 'DEFAULT',
  Exclude = 'EXCLUDE'
}

export type Callosum_DisplayNameLastUpdatedBy = {
  __typename?: 'callosum_DisplayNameLastUpdatedBy';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_DisplayNameLastUpdatedBy_E {
  Admin = 'ADMIN',
  Auto = 'AUTO',
  User = 'USER'
}

export type Callosum_ExpressionProto = {
  __typename?: 'callosum_ExpressionProto';
  aggregation?: Maybe<Falcon_AggregateOp_E>;
  child?: Maybe<Array<Maybe<Callosum_ExpressionProto>>>;
  columnType?: Maybe<Callosum_ExpressionProto_ColumnType>;
  id?: Maybe<Scalars['String']>;
  joinPaths?: Maybe<Array<Maybe<Sage_JoinPathProto>>>;
  name?: Maybe<Scalars['String']>;
  operator?: Maybe<Falcon_ExpressionOp_E>;
  schemaTableId?: Maybe<Scalars['Int']>;
  value?: Maybe<Array<Maybe<Falcon_ConstantValue>>>;
};

export enum Callosum_ExpressionProto_ColumnType {
  LogicalColumn = 'LOGICAL_COLUMN',
  None = 'NONE',
  VizColumn = 'VIZ_COLUMN'
}

export type Callosum_GeoConfigProto = {
  __typename?: 'callosum_GeoConfigProto';
  columnGuid?: Maybe<Scalars['String']>;
  customFileGuid?: Maybe<Scalars['String']>;
  fixedValue?: Maybe<Scalars['String']>;
  parent?: Maybe<Callosum_GeoConfigProto>;
  type?: Maybe<Callosum_GeoConfigProto_Type>;
};

export enum Callosum_GeoConfigProto_Type {
  AdminDiv_0 = 'ADMIN_DIV_0',
  AdminDiv_1 = 'ADMIN_DIV_1',
  AdminDiv_2 = 'ADMIN_DIV_2',
  CustomRegion = 'CUSTOM_REGION',
  Latitude = 'LATITUDE',
  Longitude = 'LONGITUDE',
  ZipCode = 'ZIP_CODE'
}

export type Callosum_GeoTypeEnumProto = {
  __typename?: 'callosum_GeoTypeEnumProto';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_GeoTypeEnumProto_E {
  AreaCode = 'AREA_CODE',
  CbsaMsa = 'CBSA_MSA',
  City = 'CITY',
  CongressionalDistrict = 'CONGRESSIONAL_DISTRICT',
  CountryRegion = 'COUNTRY_REGION',
  County = 'COUNTY',
  Latitude = 'LATITUDE',
  Longitude = 'LONGITUDE',
  None = 'NONE',
  StateProvince = 'STATE_PROVINCE',
  ZipCode = 'ZIP_CODE'
}

export type Callosum_InsightsInfo = {
  __typename?: 'callosum_InsightsInfo';
  insightDetails?: Maybe<Array<Maybe<Callosum_InsightsInfo_InsightDetailsProto>>>;
};

export type Callosum_InsightsInfo_InsightDetailsProto = {
  __typename?: 'callosum_InsightsInfo_InsightDetailsProto';
  computeTime?: Maybe<Scalars['Long']>;
  sourceId?: Maybe<Scalars['String']>;
  sourceType?: Maybe<Scalars['String']>;
  visualizationQuery?: Maybe<Callosum_VisualizationQueryProto>;
};

export type Callosum_KeyValueProto = {
  __typename?: 'callosum_KeyValueProto';
  key?: Maybe<Falcon_ConstantValue>;
  value?: Maybe<Falcon_ConstantValue>;
};

export type Callosum_LogicalColumnProto = {
  __typename?: 'callosum_LogicalColumnProto';
  content?: Maybe<Callosum_LogicalColumnProto_LogicalColumnContentProto>;
  derivationExpression?: Maybe<Callosum_ExpressionProto>;
  derived?: Maybe<Scalars['Boolean']>;
  header?: Maybe<Callosum_MetadataHeaderProto>;
  physicalColumnGuid?: Maybe<Scalars['String']>;
};

export enum Callosum_LogicalColumnProto_ColumnTypeEnumProto {
  Attribute = 'ATTRIBUTE',
  Measure = 'MEASURE',
  Unknown = 'UNKNOWN'
}

export type Callosum_LogicalColumnProto_LogicalColumnContentProto = {
  __typename?: 'callosum_LogicalColumnProto_LogicalColumnContentProto';
  additive?: Maybe<Scalars['Boolean']>;
  attributionDimension?: Maybe<Scalars['Boolean']>;
  customOrder?: Maybe<Array<Maybe<Scalars['String']>>>;
  dataType?: Maybe<Callosum_ColumnDataTypeEnumProto_E>;
  defaultAggrType?: Maybe<Callosum_AggregateFunctionTypeEnumProto_E>;
  defaultFormatPattern?: Maybe<Scalars['String']>;
  entityCategory?: Maybe<Sage_EntityCategory_E>;
  foreignKey?: Maybe<Scalars['Boolean']>;
  geoConfig?: Maybe<Callosum_GeoConfigProto>;
  /** @deprecated Field no longer supported */
  geoType?: Maybe<Callosum_GeoTypeEnumProto_E>;
  indexPriority?: Maybe<Scalars['Float']>;
  indexType?: Maybe<Sage_ColumnIndexType_E>;
  metricDefinition?: Maybe<Callosum_MetricDefinitionProto>;
  physicalColumnName?: Maybe<Scalars['String']>;
  primaryKey?: Maybe<Scalars['Boolean']>;
  sageFormulaId?: Maybe<Scalars['String']>;
  sageOutputColumnGuid?: Maybe<Scalars['String']>;
  spotiqPreference?: Maybe<Callosum_ColumnSpotiqPreferenceProto_E>;
  synonym?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Callosum_LogicalColumnProto_ColumnTypeEnumProto>;
};

export type Callosum_LogicalRelationshipJoinTypeEnumProto = {
  __typename?: 'callosum_LogicalRelationshipJoinTypeEnumProto';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_LogicalRelationshipJoinTypeEnumProto_E {
  Inner = 'INNER',
  LeftOuter = 'LEFT_OUTER',
  Outer = 'OUTER',
  RightOuter = 'RIGHT_OUTER'
}

export type Callosum_LogicalRelationshipProto = {
  __typename?: 'callosum_LogicalRelationshipProto';
  content?: Maybe<Callosum_LogicalRelationshipProto_LogicalRelationshipContentProto>;
  destinationTableGuid?: Maybe<Scalars['String']>;
  header?: Maybe<Callosum_MetadataHeaderProto>;
  joinType?: Maybe<Callosum_LogicalRelationshipJoinTypeEnumProto_E>;
  sourceTableGuid?: Maybe<Scalars['String']>;
  type?: Maybe<Callosum_LogicalRelationshipProto_LogicalRelationshipTypeEnumProto>;
};

export type Callosum_LogicalRelationshipProto_LogicalRelationshipContentProto = {
  __typename?: 'callosum_LogicalRelationshipProto_LogicalRelationshipContentProto';
  genericJoin?: Maybe<Callosum_ExpressionProto>;
  relationship?: Maybe<Array<Maybe<Callosum_LogicalRelationshipProto_LogicalRelationshipContentProto_SingleColumnLogicalRelationshipProto>>>;
  weight?: Maybe<Scalars['Float']>;
};

export type Callosum_LogicalRelationshipProto_LogicalRelationshipContentProto_SingleColumnLogicalRelationshipProto = {
  __typename?: 'callosum_LogicalRelationshipProto_LogicalRelationshipContentProto_SingleColumnLogicalRelationshipProto';
  destinationColumnGuid?: Maybe<Scalars['String']>;
  sourceColumnGuid?: Maybe<Scalars['String']>;
};

export enum Callosum_LogicalRelationshipProto_LogicalRelationshipTypeEnumProto {
  Generic = 'GENERIC',
  PkFk = 'PK_FK',
  UserDefined = 'USER_DEFINED'
}

export type Callosum_LogicalTableProto = {
  __typename?: 'callosum_LogicalTableProto';
  column?: Maybe<Array<Maybe<Callosum_LogicalColumnProto>>>;
  content?: Maybe<Callosum_LogicalTableProto_LogicalTableContentProto>;
  dataSourceGuid?: Maybe<Scalars['String']>;
  header?: Maybe<Callosum_MetadataHeaderProto>;
  physicalTableGuid?: Maybe<Scalars['String']>;
  physicalTableVersion?: Maybe<Scalars['Long']>;
  relationship?: Maybe<Array<Maybe<Callosum_LogicalRelationshipProto>>>;
  type?: Maybe<Callosum_LogicalTableTypeEnumProto_E>;
};

export type Callosum_LogicalTableProto_LogicalTableContentProto = {
  __typename?: 'callosum_LogicalTableProto_LogicalTableContentProto';
  aggregatedWorksheet?: Maybe<Scalars['Boolean']>;
  joinType?: Maybe<Callosum_LogicalRelationshipJoinTypeEnumProto_E>;
  physicalTableName?: Maybe<Scalars['String']>;
  worksheetType?: Maybe<Callosum_WorksheetTypeEnumProto_E>;
};

export type Callosum_LogicalTableTypeEnumProto = {
  __typename?: 'callosum_LogicalTableTypeEnumProto';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_LogicalTableTypeEnumProto_E {
  AggrWorksheet = 'AGGR_WORKSHEET',
  CalendarTable = 'CALENDAR_TABLE',
  DbView = 'DB_VIEW',
  MaterializedView = 'MATERIALIZED_VIEW',
  OneToOneLogical = 'ONE_TO_ONE_LOGICAL',
  PrivateWorksheet = 'PRIVATE_WORKSHEET',
  SqlView = 'SQL_VIEW',
  UserDefined = 'USER_DEFINED',
  Worksheet = 'WORKSHEET'
}

export type Callosum_MetadataHeaderProto = {
  __typename?: 'callosum_MetadataHeaderProto';
  authorDisplayName?: Maybe<Scalars['String']>;
  authorGuid?: Maybe<Scalars['String']>;
  authorName?: Maybe<Scalars['String']>;
  clientState?: Maybe<Callosum_ClientStateProto>;
  created?: Maybe<Scalars['Long']>;
  databaseStripe?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  generationNum?: Maybe<Scalars['Long']>;
  hidden?: Maybe<Scalars['Boolean']>;
  idGuid?: Maybe<Scalars['String']>;
  lenientDiscoverability?: Maybe<Scalars['Boolean']>;
  metadataType?: Maybe<Scalars['String']>;
  modified?: Maybe<Scalars['Long']>;
  modifiedBy?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerGuid?: Maybe<Scalars['String']>;
  schemaStripe?: Maybe<Scalars['String']>;
  tag?: Maybe<Array<Maybe<Callosum_MetadataHeaderProto>>>;
  type?: Maybe<Scalars['String']>;
};

export type Callosum_MetricDefinitionProto = {
  __typename?: 'callosum_MetricDefinitionProto';
  name?: Maybe<Scalars['String']>;
  row?: Maybe<Array<Maybe<Callosum_MetricDefinitionProto_Row>>>;
};

export enum Callosum_MetricDefinitionProto_Action {
  Alert = 'ALERT',
  Email = 'EMAIL',
  None = 'NONE'
}

export type Callosum_MetricDefinitionProto_Range = {
  __typename?: 'callosum_MetricDefinitionProto_Range';
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
};

export type Callosum_MetricDefinitionProto_Row = {
  __typename?: 'callosum_MetricDefinitionProto_Row';
  action?: Maybe<Callosum_MetricDefinitionProto_Action>;
  color?: Maybe<Scalars['String']>;
  iconPath?: Maybe<Scalars['String']>;
  plotAsBand?: Maybe<Scalars['Boolean']>;
  range?: Maybe<Callosum_MetricDefinitionProto_Range>;
};

export type Callosum_ObjectType = {
  __typename?: 'callosum_ObjectType';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_ObjectType_E {
  Answer = 'ANSWER',
  Column = 'COLUMN',
  Filter = 'FILTER',
  Pinboard = 'PINBOARD',
  Relationship = 'RELATIONSHIP',
  Table = 'TABLE',
  User = 'USER',
  UserGroup = 'USER_GROUP'
}

export type Callosum_PurchaseOption = {
  __typename?: 'callosum_PurchaseOption';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_PurchaseOption_E {
  BuyNow = 'BUY_NOW',
  ContactSales = 'CONTACT_SALES',
  None = 'NONE'
}

export type Callosum_RequestType = {
  __typename?: 'callosum_RequestType';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_RequestType_E {
  AnswerAddNewFilter = 'ANSWER_ADD_NEW_FILTER',
  AnswerHelpRequested = 'ANSWER_HELP_REQUESTED',
  AnswerPinboardContext = 'ANSWER_PINBOARD_CONTEXT',
  AnswerSaved = 'ANSWER_SAVED',
  AnswerUnsaved = 'ANSWER_UNSAVED',
  AnswerUpgrade = 'ANSWER_UPGRADE',
  AnswerView = 'ANSWER_VIEW',
  AnswerViewList = 'ANSWER_VIEW_LIST',
  AnswerViewSave = 'ANSWER_VIEW_SAVE',
  AnswerVizContextView = 'ANSWER_VIZ_CONTEXT_VIEW',
  DataChartConfig = 'DATA_CHART_CONFIG',
  DataExport = 'DATA_EXPORT',
  DataShowUnderlyingRow = 'DATA_SHOW_UNDERLYING_ROW',
  DataShowUnderlyingViz = 'DATA_SHOW_UNDERLYING_VIZ',
  PinboardAdminView = 'PINBOARD_ADMIN_VIEW',
  PinboardAdHoc = 'PINBOARD_AD_HOC',
  PinboardEmbedView = 'PINBOARD_EMBED_VIEW',
  PinboardFilter = 'PINBOARD_FILTER',
  PinboardHomepageView = 'PINBOARD_HOMEPAGE_VIEW',
  PinboardInsightView = 'PINBOARD_INSIGHT_VIEW',
  PinboardLearnView = 'PINBOARD_LEARN_VIEW',
  PinboardPrintFilter = 'PINBOARD_PRINT_FILTER',
  PinboardPrintView = 'PINBOARD_PRINT_VIEW',
  PinboardTspublicNoRuntimeFilter = 'PINBOARD_TSPUBLIC_NO_RUNTIME_FILTER',
  PinboardTspublicRuntimeFilter = 'PINBOARD_TSPUBLIC_RUNTIME_FILTER',
  PinboardView = 'PINBOARD_VIEW',
  TspublicDataExport = 'TSPUBLIC_DATA_EXPORT',
  Unknown = 'UNKNOWN',
  ViewAnswerView = 'VIEW_ANSWER_VIEW'
}

export type Callosum_SchemaViewerProto = {
  __typename?: 'callosum_SchemaViewerProto';
  table?: Maybe<Array<Maybe<Callosum_LogicalTableProto>>>;
};

export type Callosum_SearchFilterProto = {
  __typename?: 'callosum_SearchFilterProto';
  autoCreated?: Maybe<Callosum_SearchFilterProto_BoolFilterValue_E>;
  expertRequest?: Maybe<Callosum_SearchFilterProto_BoolFilterValue_E>;
  favorite?: Maybe<Callosum_SearchFilterProto_BoolFilterValue_E>;
  fetchId?: Maybe<Array<Maybe<Scalars['String']>>>;
  isAuthor?: Maybe<Callosum_SearchFilterProto_BoolFilterValue_E>;
  namePattern?: Maybe<Scalars['String']>;
  ownerType?: Maybe<Array<Maybe<Scalars['String']>>>;
  skipId?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<Callosum_SearchFilterProto_RequestStatus_E>;
  subType?: Maybe<Array<Maybe<Scalars['String']>>>;
  tagName?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Callosum_SearchFilterProto_BoolFilterValue = {
  __typename?: 'callosum_SearchFilterProto_BoolFilterValue';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_SearchFilterProto_BoolFilterValue_E {
  FalseValue = 'FALSE_VALUE',
  Ignore = 'IGNORE',
  TrueValue = 'TRUE_VALUE'
}

export type Callosum_SearchFilterProto_RequestStatus = {
  __typename?: 'callosum_SearchFilterProto_RequestStatus';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_SearchFilterProto_RequestStatus_E {
  All = 'ALL',
  Resolved = 'RESOLVED',
  Unresolved = 'UNRESOLVED'
}

export type Callosum_SubscriptionStatus = {
  __typename?: 'callosum_SubscriptionStatus';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_SubscriptionStatus_E {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Incomplete = 'INCOMPLETE',
  IncompleteExpired = 'INCOMPLETE_EXPIRED',
  PastDue = 'PAST_DUE',
  Trialing = 'TRIALING',
  Unpaid = 'UNPAID'
}

export type Callosum_SubscriptionTier = {
  __typename?: 'callosum_SubscriptionTier';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_SubscriptionTier_E {
  PlanA = 'PLAN_A',
  PlanB = 'PLAN_B',
  PlanC = 'PLAN_C'
}

export type Callosum_SubscriptionType = {
  __typename?: 'callosum_SubscriptionType';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_SubscriptionType_E {
  FreeTrial = 'FREE_TRIAL',
  TeamsEdition = 'TEAMS_EDITION'
}

export type Callosum_UserAccountSource = {
  __typename?: 'callosum_UserAccountSource';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_UserAccountSource_E {
  AwsMarketplaceDatabricksConsumptionSpotapp = 'AWS_MARKETPLACE_DATABRICKS_CONSUMPTION_SPOTAPP',
  AwsMarketplaceRedshiftConsumptionSpotapp = 'AWS_MARKETPLACE_REDSHIFT_CONSUMPTION_SPOTAPP',
  AwsMarketplaceSnowflakeConsumptionSpotapp = 'AWS_MARKETPLACE_SNOWFLAKE_CONSUMPTION_SPOTAPP',
  DatabricksPartnerConnect = 'DATABRICKS_PARTNER_CONNECT',
  FreeTrial = 'FREE_TRIAL',
  Internal = 'INTERNAL',
  RedshiftPartnerConnect = 'REDSHIFT_PARTNER_CONNECT',
  SnowflakePartnerConnect = 'SNOWFLAKE_PARTNER_CONNECT'
}

export type Callosum_UserPersona = {
  __typename?: 'callosum_UserPersona';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_UserPersona_E {
  Analyst = 'ANALYST',
  BusinessUser = 'BUSINESS_USER'
}

export type Callosum_UserPropertiesProto = {
  __typename?: 'callosum_UserPropertiesProto';
  companyName?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  partner?: Maybe<Scalars['String']>;
  persona?: Maybe<Callosum_UserPersona_E>;
};

export type Callosum_VisualizationColumnProto = {
  __typename?: 'callosum_VisualizationColumnProto';
  aggrApplied?: Maybe<Scalars['Boolean']>;
  aggrTypeOverride?: Maybe<Callosum_AggregateFunctionTypeEnumProto_E>;
  column?: Maybe<Callosum_LogicalColumnProto>;
  dataTypeOverrde?: Maybe<Callosum_ColumnDataTypeEnumProto_E>;
  formatPatternOverride?: Maybe<Scalars['String']>;
  groupBy?: Maybe<Scalars['Boolean']>;
  metricDefinition?: Maybe<Callosum_MetricDefinitionProto>;
  sageColumnId?: Maybe<Scalars['String']>;
  sageOutputColumnGuid?: Maybe<Scalars['String']>;
  sortAscending?: Maybe<Scalars['Boolean']>;
  sortIndex?: Maybe<Scalars['Int']>;
  typeOverride?: Maybe<Callosum_LogicalColumnProto_ColumnTypeEnumProto>;
  userSorted?: Maybe<Scalars['Boolean']>;
};

export type Callosum_VisualizationProto = {
  __typename?: 'callosum_VisualizationProto';
  chartContent?: Maybe<Callosum_VisualizationProto_ChartVisualizationContentProto>;
  description?: Maybe<Scalars['String']>;
  header?: Maybe<Callosum_MetadataHeaderProto>;
  imageContent?: Maybe<Callosum_VisualizationProto_ImageVisualizationContentProto>;
  markersEnabled?: Maybe<Scalars['Boolean']>;
  ranalysisContent?: Maybe<Callosum_VisualizationProto_RanalysisVisualizationContentProto>;
  shareYAxis?: Maybe<Scalars['Boolean']>;
  tableContent?: Maybe<Callosum_VisualizationProto_TableVisualizationContentProto>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Callosum_VisualizationProto_VisualizationTypeEnumProto>;
};

export type Callosum_VisualizationProto_ChartVisualizationContentProto = {
  __typename?: 'callosum_VisualizationProto_ChartVisualizationContentProto';
  axisConfig?: Maybe<Callosum_VisualizationProto_ChartVisualizationContentProto_AxisConfig>;
  chartType?: Maybe<Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto>;
  column?: Maybe<Array<Maybe<Callosum_VisualizationColumnProto>>>;
  content?: Maybe<Callosum_VisualizationProto_VisualizationContentProto>;
  customChartGuid?: Maybe<Scalars['String']>;
};

export type Callosum_VisualizationProto_ChartVisualizationContentProto_Axis = {
  __typename?: 'callosum_VisualizationProto_ChartVisualizationContentProto_Axis';
  guid?: Maybe<Scalars['String']>;
  metricDefinition?: Maybe<Callosum_MetricDefinitionProto>;
  name?: Maybe<Scalars['String']>;
};

export type Callosum_VisualizationProto_ChartVisualizationContentProto_AxisConfig = {
  __typename?: 'callosum_VisualizationProto_ChartVisualizationContentProto_AxisConfig';
  color?: Maybe<Array<Maybe<Callosum_VisualizationProto_ChartVisualizationContentProto_Axis>>>;
  legend?: Maybe<Array<Maybe<Callosum_VisualizationProto_ChartVisualizationContentProto_Axis>>>;
  radial?: Maybe<Array<Maybe<Callosum_VisualizationProto_ChartVisualizationContentProto_Axis>>>;
  x?: Maybe<Array<Maybe<Callosum_VisualizationProto_ChartVisualizationContentProto_Axis>>>;
  y?: Maybe<Array<Maybe<Callosum_VisualizationProto_ChartVisualizationContentProto_Axis>>>;
};

export enum Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto {
  Area = 'AREA',
  Bar = 'BAR',
  Bubble = 'BUBBLE',
  Candlestick = 'CANDLESTICK',
  Column = 'COLUMN',
  CustomChart = 'CUSTOM_CHART',
  Funnel = 'FUNNEL',
  GeoArea = 'GEO_AREA',
  GeoBubble = 'GEO_BUBBLE',
  GeoEarthArea = 'GEO_EARTH_AREA',
  GeoEarthBar = 'GEO_EARTH_BAR',
  GeoEarthBubble = 'GEO_EARTH_BUBBLE',
  GeoEarthGraph = 'GEO_EARTH_GRAPH',
  GeoEarthHeatmap = 'GEO_EARTH_HEATMAP',
  GeoHeatmap = 'GEO_HEATMAP',
  GridTable = 'GRID_TABLE',
  Heatmap = 'HEATMAP',
  Kpi = 'KPI',
  Line = 'LINE',
  LineColumn = 'LINE_COLUMN',
  LineStackedColumn = 'LINE_STACKED_COLUMN',
  None = 'NONE',
  Pareto = 'PARETO',
  Pie = 'PIE',
  PivotTable = 'PIVOT_TABLE',
  Sankey = 'SANKEY',
  Scatter = 'SCATTER',
  SpiderWeb = 'SPIDER_WEB',
  StackedArea = 'STACKED_AREA',
  StackedBar = 'STACKED_BAR',
  StackedColumn = 'STACKED_COLUMN',
  Treemap = 'TREEMAP',
  Waterfall = 'WATERFALL',
  WhiskerScatter = 'WHISKER_SCATTER'
}

export type Callosum_VisualizationProto_ImageVisualizationContentProto = {
  __typename?: 'callosum_VisualizationProto_ImageVisualizationContentProto';
  content?: Maybe<Callosum_VisualizationProto_VisualizationContentProto>;
  rScript?: Maybe<Scalars['String']>;
};

export type Callosum_VisualizationProto_RanalysisVisualizationContentProto = {
  __typename?: 'callosum_VisualizationProto_RanalysisVisualizationContentProto';
  content?: Maybe<Callosum_VisualizationProto_VisualizationContentProto>;
  dataVizType?: Maybe<Callosum_VisualizationProto_VisualizationTypeEnumProto>;
};

export type Callosum_VisualizationProto_TableVisualizationContentProto = {
  __typename?: 'callosum_VisualizationProto_TableVisualizationContentProto';
  column?: Maybe<Array<Maybe<Callosum_VisualizationColumnProto>>>;
  content?: Maybe<Callosum_VisualizationProto_VisualizationContentProto>;
};

export type Callosum_VisualizationProto_VisualizationContentProto = {
  __typename?: 'callosum_VisualizationProto_VisualizationContentProto';
  dataOnDemand?: Maybe<Scalars['Boolean']>;
  locked?: Maybe<Scalars['Boolean']>;
};

export enum Callosum_VisualizationProto_VisualizationTypeEnumProto {
  Chart = 'CHART',
  Headline = 'HEADLINE',
  Image = 'IMAGE',
  RAnalysis = 'R_ANALYSIS',
  Table = 'TABLE'
}

export type Callosum_VisualizationQueryProto = {
  __typename?: 'callosum_VisualizationQueryProto';
  context?: Maybe<Sage_Auto_Complete_V2_AcContext>;
  customRAnalysis?: Maybe<Sage_AnalysisDescriptor_CustomRAnalysis>;
  descriptionSummary?: Maybe<Scalars['String']>;
  explanation?: Maybe<Sage_A3InsightExplanation>;
  sageProgram?: Maybe<Sage_Auto_Complete_V2_SageProgram>;
  /** @deprecated Field no longer supported */
  serializedSageProgram?: Maybe<Scalars['String']>;
  tableIndex?: Maybe<Scalars['Int']>;
  visualization?: Maybe<Callosum_VisualizationProto>;
};

export type Callosum_WorksheetTypeEnumProto = {
  __typename?: 'callosum_WorksheetTypeEnumProto';
  _?: Maybe<Scalars['String']>;
};

export enum Callosum_WorksheetTypeEnumProto_E {
  Container = 'CONTAINER',
  View = 'VIEW'
}

export type ClientStateObject = {
  __typename?: 'clientStateObject';
  queryState?: Maybe<Scalars['String']>;
};

export type Common_EntityHeader = {
  __typename?: 'common_EntityHeader';
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  guid?: Maybe<Scalars['String']>;
};

export enum Common_ErrorCode {
  Aborted = 'ABORTED',
  AdmissionControlCancelled = 'ADMISSION_CONTROL_CANCELLED',
  AdmissionControlRejected = 'ADMISSION_CONTROL_REJECTED',
  AlreadyExists = 'ALREADY_EXISTS',
  AlterTableFailed = 'ALTER_TABLE_FAILED',
  AuthenticationFailed = 'AUTHENTICATION_FAILED',
  Busy = 'BUSY',
  Cancelled = 'CANCELLED',
  CmdNotFound = 'CMD_NOT_FOUND',
  ConnectionFailed = 'CONNECTION_FAILED',
  DataNotFound = 'DATA_NOT_FOUND',
  DataNotIndexed = 'DATA_NOT_INDEXED',
  DbQueryFlagOff = 'DB_QUERY_FLAG_OFF',
  DmEmptyResponse = 'DM_EMPTY_RESPONSE',
  FalconResponseError = 'FALCON_RESPONSE_ERROR',
  FetchAcContextFailed = 'FETCH_AC_CONTEXT_FAILED',
  GetA3CallosumConfigFailed = 'GET_A3_CALLOSUM_CONFIG_FAILED',
  GetDataManagerQueryFailed = 'GET_DATA_MANAGER_QUERY_FAILED',
  GetDbqueryFalconRequestFailed = 'GET_DBQUERY_FALCON_REQUEST_FAILED',
  GetFrmtDateBucketFailed = 'GET_FRMT_DATE_BUCKET_FAILED',
  GetMonitorConfigFailed = 'GET_MONITOR_CONFIG_FAILED',
  GetRelatedColumnsFailed = 'GET_RELATED_COLUMNS_FAILED',
  HdfsError = 'HDFS_ERROR',
  Internal = 'INTERNAL',
  InvalidArgument = 'INVALID_ARGUMENT',
  InvalidJoinPath = 'INVALID_JOIN_PATH',
  InvalidResponse = 'INVALID_RESPONSE',
  InvalidTableGraph = 'INVALID_TABLE_GRAPH',
  LessonPlanUpgraded = 'LESSON_PLAN_UPGRADED',
  LessonPlanUpgradeFailed = 'LESSON_PLAN_UPGRADE_FAILED',
  LoadFailed = 'LOAD_FAILED',
  LoadFailedExistsLoadCycleConflicts = 'LOAD_FAILED_EXISTS_LOAD_CYCLE_CONFLICTS',
  MaterializationCheckpointError = 'MATERIALIZATION_CHECKPOINT_ERROR',
  MaterializationConfigError = 'MATERIALIZATION_CONFIG_ERROR',
  MaterializationInternalError = 'MATERIALIZATION_INTERNAL_ERROR',
  MaterializationWorkerConnectionFailure = 'MATERIALIZATION_WORKER_CONNECTION_FAILURE',
  NonAttributeColumnType = 'NON_ATTRIBUTE_COLUMN_TYPE',
  NotFound = 'NOT_FOUND',
  NotImplemented = 'NOT_IMPLEMENTED',
  NotReady = 'NOT_READY',
  Ok = 'OK',
  OneOffFailed = 'ONE_OFF_FAILED',
  OrionError = 'ORION_ERROR',
  PercentileQueryExceedsMaxInputRows = 'PERCENTILE_QUERY_EXCEEDS_MAX_INPUT_ROWS',
  PermissionDenied = 'PERMISSION_DENIED',
  PermissionDeniedInaccessibleToOrg = 'PERMISSION_DENIED_INACCESSIBLE_TO_ORG',
  PersistentFsError = 'PERSISTENT_FS_ERROR',
  ResourceExceeded = 'RESOURCE_EXCEEDED',
  RpcFailed = 'RPC_FAILED',
  SageAcUtilFailed = 'SAGE_AC_UTIL_FAILED',
  SerializationError = 'SERIALIZATION_ERROR',
  TableNotReady = 'TABLE_NOT_READY',
  TableOffline = 'TABLE_OFFLINE',
  Timeout = 'TIMEOUT',
  Unknown = 'UNKNOWN',
  Unreachable = 'UNREACHABLE',
  ZookeeperError = 'ZOOKEEPER_ERROR'
}

export type Common_FeatureFlag = {
  __typename?: 'common_FeatureFlag';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Common_FormatingType = {
  __typename?: 'common_FormatingType';
  _?: Maybe<Scalars['String']>;
};

export enum Common_FormatingType_E {
  DateFormatPattern = 'DATE_FORMAT_PATTERN',
  DateTimeFormatPattern = 'DATE_TIME_FORMAT_PATTERN',
  DayInMonthFormatPattern = 'DAY_IN_MONTH_FORMAT_PATTERN',
  DayInQtrFormatPattern = 'DAY_IN_QTR_FORMAT_PATTERN',
  DayInYearFormatPattern = 'DAY_IN_YEAR_FORMAT_PATTERN',
  DayOfWeekFormatPattern = 'DAY_OF_WEEK_FORMAT_PATTERN',
  HourDateFormatPattern = 'HOUR_DATE_FORMAT_PATTERN',
  HourTimeFormatPattern = 'HOUR_TIME_FORMAT_PATTERN',
  MonthInQtrFormatPattern = 'MONTH_IN_QTR_FORMAT_PATTERN',
  MonthInYearFormatPattern = 'MONTH_IN_YEAR_FORMAT_PATTERN',
  MonthYearFormatPattern = 'MONTH_YEAR_FORMAT_PATTERN',
  NoFormating = 'NO_FORMATING',
  NumberFormatPattern = 'NUMBER_FORMAT_PATTERN',
  QtrInYearFormatPattern = 'QTR_IN_YEAR_FORMAT_PATTERN',
  QtrYearFormatPattern = 'QTR_YEAR_FORMAT_PATTERN',
  TimeFormatPattern = 'TIME_FORMAT_PATTERN',
  WeekYearFormatPattern = 'WEEK_YEAR_FORMAT_PATTERN',
  YearFormatPattern = 'YEAR_FORMAT_PATTERN'
}

export type Common_GeometryTypeEnumProto = {
  __typename?: 'common_GeometryTypeEnumProto';
  _?: Maybe<Scalars['String']>;
};

export enum Common_GeometryTypeEnumProto_E {
  Circle = 'CIRCLE',
  GeometryCollection = 'GEOMETRY_COLLECTION',
  LinearRing = 'LINEAR_RING',
  LineString = 'LINE_STRING',
  MultiLineString = 'MULTI_LINE_STRING',
  MultiPoint = 'MULTI_POINT',
  MultiPolygon = 'MULTI_POLYGON',
  Point = 'POINT',
  Polygon = 'POLYGON'
}

export type Common_KeyValue = {
  __typename?: 'common_KeyValue';
  /** @deprecated Field no longer supported */
  deprecatedValue?: Maybe<Common_KeyValue_DeprecatedValue>;
  description?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Common_ValueProto>;
};

export type Common_KeyValueList = {
  __typename?: 'common_KeyValueList';
  description?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<Common_ValueProto>>>;
};

export type Common_KeyValueStr = {
  __typename?: 'common_KeyValueStr';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Common_KeyValue_DeprecatedValue = {
  __typename?: 'common_KeyValue_DeprecatedValue';
  d?: Maybe<Scalars['Float']>;
  i64?: Maybe<Scalars['Long']>;
  s?: Maybe<Scalars['String']>;
};

export type Common_MetaDataUpdateReqProto = {
  __typename?: 'common_MetaDataUpdateReqProto';
  filePaths?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Common_OnlineDistributionProto = {
  __typename?: 'common_OnlineDistributionProto';
  max?: Maybe<Scalars['String']>;
  maxSubSampleSize?: Maybe<Scalars['Long']>;
  mean?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['String']>;
  sampleSize?: Maybe<Scalars['Long']>;
  seed?: Maybe<Scalars['Long']>;
  subSamples?: Maybe<Array<Maybe<Scalars['String']>>>;
  varianceFactor?: Maybe<Scalars['Float']>;
};

export type Common_SeedQuestionsKey = {
  __typename?: 'common_SeedQuestionsKey';
  sourceGuid?: Maybe<Scalars['String']>;
};

export type Common_StateKey = {
  __typename?: 'common_StateKey';
  generationNumber?: Maybe<Scalars['Int']>;
  transactionId?: Maybe<Scalars['String']>;
};

export type Common_StatefulRequestInfo = {
  __typename?: 'common_StatefulRequestInfo';
  pinnedClientGenerationNumber?: Maybe<Array<Maybe<Scalars['Int']>>>;
  seedKey?: Maybe<Common_SeedQuestionsKey>;
  stateKey?: Maybe<Common_StateKey>;
};

export type Common_StatefulResponseInfo = {
  __typename?: 'common_StatefulResponseInfo';
  stateKey?: Maybe<Common_StateKey>;
};

export type Common_StatusProto = {
  __typename?: 'common_StatusProto';
  code?: Maybe<Common_ErrorCode>;
  message?: Maybe<Scalars['String']>;
};

export type Common_UsageStatsDistributionProto = {
  __typename?: 'common_UsageStatsDistributionProto';
  onlineDistributionProto?: Maybe<Common_OnlineDistributionProto>;
};

export type Common_ValueProto = {
  __typename?: 'common_ValueProto';
  b?: Maybe<Scalars['Boolean']>;
  d?: Maybe<Scalars['Float']>;
  i64?: Maybe<Scalars['Long']>;
  s?: Maybe<Scalars['String']>;
  type?: Maybe<Common_ValueProto_Type>;
  u64?: Maybe<Scalars['Long']>;
};

export enum Common_ValueProto_Type {
  TypeBool = 'TYPE_BOOL',
  TypeDouble = 'TYPE_DOUBLE',
  TypeInt64 = 'TYPE_INT64',
  TypeNull = 'TYPE_NULL',
  TypeString = 'TYPE_STRING',
  TypeUint64 = 'TYPE_UINT64'
}

export enum Core__Purpose {
  /** `EXECUTION` features provide metadata necessary to for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}

export type DestinationType = {
  __typename?: 'destinationType';
  active_system?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export enum Eureka_AiAnswerState {
  Error = 'ERROR',
  Expanded = 'EXPANDED',
  Minimized = 'MINIMIZED',
  Warning = 'WARNING'
}

export type Eureka_AnswerResult = {
  __typename?: 'eureka_AnswerResult';
  formatted?: Maybe<Sage_Auto_Complete_V2_FormattedTokens>;
  header?: Maybe<Eureka_Header>;
  preferredViz?: Maybe<Eureka_VisualizationMetadata>;
  usageInfo?: Maybe<Eureka_UsageInfo>;
  worksheetInfo?: Maybe<Array<Maybe<Eureka_WorksheetInfo>>>;
};

export type Eureka_ColumnResult = {
  __typename?: 'eureka_ColumnResult';
  name?: Maybe<Scalars['String']>;
};

export type Eureka_ColumnValueResult = {
  __typename?: 'eureka_ColumnValueResult';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Eureka_CompleteInfo = {
  __typename?: 'eureka_CompleteInfo';
  requiredCompletions?: Maybe<Scalars['Int']>;
  type?: Maybe<Eureka_CompleteInfo_Type>;
};

export enum Eureka_CompleteInfo_Type {
  Any = 'ANY',
  Column = 'COLUMN',
  Object = 'OBJECT',
  Query = 'QUERY',
  Sticker = 'STICKER',
  User = 'USER',
  Value = 'VALUE'
}

export type Eureka_CompleteObjectResult = {
  __typename?: 'eureka_CompleteObjectResult';
  authorGuid?: Maybe<Scalars['String']>;
  authorName?: Maybe<Scalars['String']>;
  guid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parentGuid?: Maybe<Scalars['String']>;
  possibleObjectFilters?: Maybe<Array<Maybe<Eureka_ModifyFilterGroup>>>;
  type?: Maybe<Eureka_CompleteObjectResult_Type>;
};

export enum Eureka_CompleteObjectResult_Type {
  Answer = 'ANSWER',
  Pinboard = 'PINBOARD',
  Visualization = 'VISUALIZATION'
}

export type Eureka_CompleteQueryResult = {
  __typename?: 'eureka_CompleteQueryResult';
  fieldName?: Maybe<Scalars['String']>;
  fieldType?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['String']>;
  type?: Maybe<Eureka_CompleteQueryResult_Type>;
};

export enum Eureka_CompleteQueryResult_Type {
  Content = 'CONTENT',
  Popular = 'POPULAR',
  Recent = 'RECENT'
}

export type Eureka_CompleteRequest = {
  __typename?: 'eureka_CompleteRequest';
  autoCompleteVersion?: Maybe<Eureka_CompleteRequest_AutoCompleteVersion>;
  completeInfo?: Maybe<Array<Maybe<Eureka_CompleteInfo>>>;
  cursorTokenIdx?: Maybe<Scalars['Int']>;
  filterSelections?: Maybe<Array<Maybe<Eureka_Facet>>>;
  maxCompletions?: Maybe<Scalars['Int']>;
  nlHandlerVersion?: Maybe<Eureka_NlHandlerVersion>;
  nonSharable?: Maybe<Scalars['Boolean']>;
  permissionGuids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  permissionType?: Maybe<Eureka_Common_PermissionsType>;
  requestIdentifiers?: Maybe<Eureka_Common_HttpClientRequestIdentifiers>;
  searchOption?: Maybe<Eureka_SearchRequest_SearchResultOption>;
  tokens?: Maybe<Array<Maybe<Eureka_EurekaSearchToken>>>;
};

export enum Eureka_CompleteRequest_AutoCompleteVersion {
  AutocompleteVersionAbsent = 'AUTOCOMPLETE_VERSION_ABSENT',
  ObjectSuggestions = 'OBJECT_SUGGESTIONS',
  Production = 'PRODUCTION',
  QuerySuggestionsV1 = 'QUERY_SUGGESTIONS_V1',
  QuerySuggestionsV2 = 'QUERY_SUGGESTIONS_V2'
}

export type Eureka_CompleteResponse = {
  __typename?: 'eureka_CompleteResponse';
  queryResult?: Maybe<Array<Maybe<Eureka_CompleteQueryResult>>>;
  requestIdentifiers?: Maybe<Eureka_Common_HttpClientRequestIdentifiers>;
  result?: Maybe<Array<Maybe<Eureka_CompleteResult>>>;
  tokens?: Maybe<Array<Maybe<Eureka_EurekaSearchToken>>>;
};

export type Eureka_CompleteResult = {
  __typename?: 'eureka_CompleteResult';
  columnResult?: Maybe<Eureka_ColumnResult>;
  columnValueResult?: Maybe<Eureka_ColumnValueResult>;
  debugInfo?: Maybe<Scalars['String']>;
  isRecentlyViewed?: Maybe<Scalars['Boolean']>;
  numPrefixTokens?: Maybe<Scalars['Int']>;
  numSuffixTokens?: Maybe<Scalars['Int']>;
  objectResult?: Maybe<Eureka_CompleteObjectResult>;
  objectSecurityInfo?: Maybe<Eureka_CompleteResult_ObjectSecurityInfo>;
  score?: Maybe<Scalars['Float']>;
  token?: Maybe<Eureka_EurekaSearchToken>;
  type?: Maybe<Eureka_CompleteInfo_Type>;
  userResult?: Maybe<Eureka_UserResult>;
  viewCount?: Maybe<Scalars['Int']>;
};

export type Eureka_CompleteResult_ObjectSecurityInfo = {
  __typename?: 'eureka_CompleteResult_ObjectSecurityInfo';
  isD13ySourced?: Maybe<Scalars['Boolean']>;
  objectId?: Maybe<Scalars['String']>;
  objectIdForDeletionCheck?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  objectTypeForDeletionCheck?: Maybe<Scalars['String']>;
};

export type Eureka_EurekaSearchToken = {
  __typename?: 'eureka_EurekaSearchToken';
  guid?: Maybe<Scalars['String']>;
  highlights?: Maybe<Array<Maybe<Eureka_EurekaSearchToken_Range>>>;
  type?: Maybe<Eureka_EurekaSearchToken_Type>;
  value?: Maybe<Scalars['String']>;
};

export type Eureka_EurekaSearchToken_Range = {
  __typename?: 'eureka_EurekaSearchToken_Range';
  end?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export enum Eureka_EurekaSearchToken_Type {
  Column = 'COLUMN',
  Object = 'OBJECT',
  Sticker = 'STICKER',
  Unrecognized = 'UNRECOGNIZED',
  User = 'USER',
  Value = 'VALUE'
}

export type Eureka_Facet = {
  __typename?: 'eureka_Facet';
  facetType?: Maybe<Eureka_FacetType>;
  facetValue?: Maybe<Array<Maybe<Scalars['String']>>>;
  facetValues?: Maybe<Array<Maybe<Eureka_FacetValue>>>;
};

export enum Eureka_FacetType {
  /** @deprecated Field no longer supported */
  AuthorGuid = 'AUTHOR_GUID',
  AuthorInfo = 'AUTHOR_INFO',
  ObjectTypeFacet = 'OBJECT_TYPE_FACET',
  Stickers = 'STICKERS',
  /** @deprecated Field no longer supported */
  StickerGuid = 'STICKER_GUID',
  Worksheets = 'WORKSHEETS',
  WorksheetName = 'WORKSHEET_NAME'
}

export type Eureka_FacetValue = {
  __typename?: 'eureka_FacetValue';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resultCount?: Maybe<Scalars['Int']>;
};

export type Eureka_FeedbackMetadata = {
  __typename?: 'eureka_FeedbackMetadata';
  columnsUsedInQuery?: Maybe<Array<Maybe<Scalars['String']>>>;
  genNo?: Maybe<Scalars['Int']>;
  isOrgAdminUser?: Maybe<Scalars['Boolean']>;
  isWorksheetAuthor?: Maybe<Scalars['Boolean']>;
  sessionId?: Maybe<Scalars['String']>;
  worksheetId?: Maybe<Scalars['String']>;
};

export enum Eureka_FeedbackScope {
  Global = 'GLOBAL',
  WorksheetUser = 'WORKSHEET_USER'
}

export type Eureka_FragmentPayload = {
  __typename?: 'eureka_FragmentPayload';
  genNo?: Maybe<Scalars['Int']>;
  isSubmitted?: Maybe<Scalars['Boolean']>;
  nlQueryFragment?: Maybe<Scalars['String']>;
  phrase?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_PhraseDefinition>>>;
  rating?: Maybe<Eureka_SearchResultRelevanceFeedback_Rating>;
  sessionId?: Maybe<Scalars['String']>;
  sqlQuery?: Maybe<Scalars['String']>;
  stateKey?: Maybe<Sage_Auto_Complete_V2_AcStateKey>;
  token?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
};

export type Eureka_GetNlQueryFeedbackRequest = {
  __typename?: 'eureka_GetNlQueryFeedbackRequest';
  groupBy?: Maybe<Eureka_GetNlQueryFeedbackRequest_GroupBy>;
  nlQuery?: Maybe<Scalars['String']>;
  scope?: Maybe<Eureka_FeedbackScope>;
  type?: Maybe<Eureka_GetNlQueryFeedbackRequest_Type>;
  userId?: Maybe<Scalars['String']>;
  worksheetId?: Maybe<Scalars['String']>;
};

export enum Eureka_GetNlQueryFeedbackRequest_GroupBy {
  ByFragment = 'BY_FRAGMENT',
  None = 'NONE'
}

export enum Eureka_GetNlQueryFeedbackRequest_Type {
  Both = 'BOTH',
  Fragment = 'FRAGMENT',
  Query = 'QUERY'
}

export type Eureka_GetNlQueryFeedbackResponse = {
  __typename?: 'eureka_GetNlQueryFeedbackResponse';
  nlQueryInfo?: Maybe<Array<Maybe<Eureka_NlQueryInfo>>>;
};

export type Eureka_GetQuestionFragmentsRequest = {
  __typename?: 'eureka_GetQuestionFragmentsRequest';
  acContext?: Maybe<Scalars['String']>;
  genNo?: Maybe<Scalars['Int']>;
  nlHandlerVersion?: Maybe<Eureka_NlHandlerVersion>;
  nlQuery?: Maybe<Scalars['String']>;
  requestId?: Maybe<Scalars['String']>;
  sessionId?: Maybe<Scalars['String']>;
  sqlQuery?: Maybe<Scalars['String']>;
};

export type Eureka_GetQuestionFragmentsResponse = {
  __typename?: 'eureka_GetQuestionFragmentsResponse';
  errorMessage?: Maybe<Scalars['String']>;
  fragmentPayload?: Maybe<Array<Maybe<Eureka_FragmentPayload>>>;
  worksheetId?: Maybe<Scalars['String']>;
};

export type Eureka_Header = {
  __typename?: 'eureka_Header';
  authorGuid?: Maybe<Scalars['String']>;
  authorName?: Maybe<Scalars['String']>;
  createdOn?: Maybe<Scalars['Long']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  tagIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type Eureka_ImpressionSearchRequest = {
  __typename?: 'eureka_ImpressionSearchRequest';
  endEpochMs?: Maybe<Scalars['Long']>;
  event?: Maybe<Array<Maybe<Eureka_ImpressionSearchRequest_EventType>>>;
  objectId?: Maybe<Array<Maybe<Scalars['String']>>>;
  startEpochMs?: Maybe<Scalars['Long']>;
};

export enum Eureka_ImpressionSearchRequest_EventType {
  OpenAnswer = 'OPEN_ANSWER',
  OpenPinboard = 'OPEN_PINBOARD'
}

export type Eureka_ImpressionSearchResponse = {
  __typename?: 'eureka_ImpressionSearchResponse';
  impressionCount?: Maybe<Scalars['Int']>;
};

export type Eureka_MatchCriteria = {
  __typename?: 'eureka_MatchCriteria';
  columnId?: Maybe<Scalars['String']>;
  keywordMatchCriterion?: Maybe<Eureka_MatchCriteria_KeywordMatchCriterion>;
  objectTypeCriterion?: Maybe<Eureka_MatchCriteria_ObjectTypeCriterion>;
  phraseCountMatchCriterion?: Maybe<Eureka_MatchCriteria_PhraseCountCriterion>;
  phraseMatchCriterion?: Maybe<Eureka_MatchCriteria_PhraseMatchCriterion>;
  worksheetId?: Maybe<Scalars['String']>;
};

export type Eureka_MatchCriteria_KeywordMatchCriterion = {
  __typename?: 'eureka_MatchCriteria_KeywordMatchCriterion';
  keyword?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Eureka_MatchCriteria_ObjectTypeCriterion = {
  __typename?: 'eureka_MatchCriteria_ObjectTypeCriterion';
  objectType?: Maybe<Array<Maybe<Eureka_MatchCriteria_ObjectTypeCriterion_ObjectType>>>;
};

export enum Eureka_MatchCriteria_ObjectTypeCriterion_ObjectType {
  Answer = 'ANSWER',
  Pinboard = 'PINBOARD',
  Visualization = 'VISUALIZATION'
}

export type Eureka_MatchCriteria_PhraseCountCriterion = {
  __typename?: 'eureka_MatchCriteria_PhraseCountCriterion';
  maxPhraseCount?: Maybe<Scalars['Int']>;
  minPhraseCount?: Maybe<Scalars['Int']>;
};

export type Eureka_MatchCriteria_PhraseMatchCriterion = {
  __typename?: 'eureka_MatchCriteria_PhraseMatchCriterion';
  phraseType?: Maybe<Array<Maybe<Sage_PhraseType_E>>>;
};

export type Eureka_ModifyFilterGroup = {
  __typename?: 'eureka_ModifyFilterGroup';
  columnGuid?: Maybe<Scalars['String']>;
  op?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export enum Eureka_NlHandlerVersion {
  Latest = 'LATEST',
  Stable = 'STABLE'
}

export type Eureka_NlQueryInfo = {
  __typename?: 'eureka_NlQueryInfo';
  downvoteCount?: Maybe<Scalars['Long']>;
  fixedPhrase?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_PhraseDefinition>>>;
  fixedToken?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
  id?: Maybe<Array<Maybe<Scalars['String']>>>;
  modifiedAt?: Maybe<Scalars['Long']>;
  nlQuery?: Maybe<Scalars['String']>;
  originalPhrase?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_PhraseDefinition>>>;
  originalToken?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
  parentQuery?: Maybe<Array<Maybe<Scalars['String']>>>;
  reviewerId?: Maybe<Scalars['String']>;
  scope?: Maybe<Eureka_FeedbackScope>;
  tmlTokensUsed?: Maybe<Array<Maybe<Scalars['String']>>>;
  upvoteCount?: Maybe<Scalars['Long']>;
  useCount?: Maybe<Scalars['Long']>;
  user?: Maybe<Sage_EntityHeader>;
  worksheet?: Maybe<Sage_EntityHeader>;
};

export type Eureka_OverviewRequest = {
  __typename?: 'eureka_OverviewRequest';
  exclude?: Maybe<Array<Maybe<Eureka_MatchCriteria>>>;
  include?: Maybe<Array<Maybe<Eureka_MatchCriteria>>>;
};

export enum Eureka_ParentType {
  Answer = 'ANSWER',
  Pinboard = 'PINBOARD'
}

export type Eureka_PinboardResult = {
  __typename?: 'eureka_PinboardResult';
  answers?: Maybe<Array<Maybe<Eureka_AnswerResult>>>;
  header?: Maybe<Eureka_Header>;
  usageInfo?: Maybe<Eureka_UsageInfo>;
  vizCount?: Maybe<Eureka_VizCount>;
};

export type Eureka_PinboardVizResult = {
  __typename?: 'eureka_PinboardVizResult';
  answer?: Maybe<Eureka_AnswerResult>;
  pinboardHeader?: Maybe<Eureka_Header>;
};

export type Eureka_PutNlQueryFeedbackRequest = {
  __typename?: 'eureka_PutNlQueryFeedbackRequest';
  delete?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Array<Maybe<Scalars['String']>>>;
  scope?: Maybe<Eureka_FeedbackScope>;
};

export type Eureka_PutNlQueryFeedbackResponse = {
  __typename?: 'eureka_PutNlQueryFeedbackResponse';
  isDeleted?: Maybe<Scalars['Boolean']>;
  isUpdated?: Maybe<Scalars['Boolean']>;
};

export type Eureka_RelevanceFeedbackRequest = {
  __typename?: 'eureka_RelevanceFeedbackRequest';
  appliedFacets?: Maybe<Array<Maybe<Eureka_Facet>>>;
  fixedPhrase?: Maybe<Array<Maybe<Eureka_RelevanceFeedbackRequest_EurekaPhrase>>>;
  metadata?: Maybe<Eureka_FeedbackMetadata>;
  parentQuery?: Maybe<Scalars['String']>;
  permissionGuids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  query?: Maybe<Scalars['String']>;
  requestId?: Maybe<Scalars['String']>;
  resultRelevanceFeedback?: Maybe<Eureka_SearchResultRelevanceFeedback>;
  sageTokensSuggested?: Maybe<Array<Maybe<Scalars['String']>>>;
  sageTokensUsed?: Maybe<Array<Maybe<Scalars['String']>>>;
  searchOption?: Maybe<Eureka_SearchRequest_SearchResultOption>;
  searcherVersion?: Maybe<Eureka_SearchRequest_SearcherVersion>;
  selectedResult?: Maybe<Eureka_Header>;
  sqlQuery?: Maybe<Scalars['String']>;
  tmlTokensUsed?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Eureka_RelevanceFeedbackRequest_EurekaPhrase = {
  __typename?: 'eureka_RelevanceFeedbackRequest_EurekaPhrase';
  isCompletePhrase?: Maybe<Scalars['Boolean']>;
  numTokens?: Maybe<Scalars['Int']>;
  phraseType?: Maybe<Sage_PhraseType_E>;
  startIndex?: Maybe<Scalars['Int']>;
};

export type Eureka_RelevanceFeedbackResponse = {
  __typename?: 'eureka_RelevanceFeedbackResponse';
  status?: Maybe<Common_StatusProto>;
};

export type Eureka_Result = {
  __typename?: 'eureka_Result';
  debugInfo?: Maybe<Array<Maybe<Scalars['String']>>>;
  objectSecurityInfo?: Maybe<Eureka_Result_ObjectSecurityInfo>;
  resultType?: Maybe<Eureka_Result_ResultType>;
  sageQuery?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  searchAnswer?: Maybe<Eureka_AnswerResult>;
  searchPinboard?: Maybe<Eureka_PinboardResult>;
  searchPinboardViz?: Maybe<Eureka_PinboardVizResult>;
  snippetInfo?: Maybe<Eureka_SnippetInfo>;
};

export type Eureka_Result_ObjectSecurityInfo = {
  __typename?: 'eureka_Result_ObjectSecurityInfo';
  isD13ySourced?: Maybe<Scalars['Boolean']>;
  objectId?: Maybe<Scalars['String']>;
  objectIdForDeletionCheck?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  objectTypeForDeletionCheck?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum Eureka_Result_ResultType {
  AnswerResult = 'ANSWER_RESULT',
  PinboardResult = 'PINBOARD_RESULT',
  PinboardVizResult = 'PINBOARD_VIZ_RESULT'
}

export type Eureka_SageQuerySuggestion = {
  __typename?: 'eureka_SageQuerySuggestion';
  cached?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  genNo?: Maybe<Scalars['Int']>;
  sessionId?: Maybe<Scalars['String']>;
  sqlQuery?: Maybe<Scalars['String']>;
  stateKey?: Maybe<Sage_Auto_Complete_V2_AcStateKey>;
  title?: Maybe<Scalars['String']>;
  tmlTokens?: Maybe<Array<Maybe<Scalars['String']>>>;
  tokens?: Maybe<Array<Maybe<Scalars['String']>>>;
  worksheetId?: Maybe<Scalars['String']>;
};

export type Eureka_SearchRequest = {
  __typename?: 'eureka_SearchRequest';
  batchSize?: Maybe<Scalars['Int']>;
  currentPageNumber?: Maybe<Scalars['Int']>;
  desiredFacets?: Maybe<Array<Maybe<Eureka_Facet>>>;
  facetSelections?: Maybe<Array<Maybe<Eureka_Facet>>>;
  filterSelections?: Maybe<Array<Maybe<Eureka_Facet>>>;
  maxPinboardVizCount?: Maybe<Scalars['Int']>;
  nlHandlerVersion?: Maybe<Eureka_NlHandlerVersion>;
  nonSharable?: Maybe<Scalars['Boolean']>;
  numRewrittenQueries?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  overviewRequest?: Maybe<Eureka_OverviewRequest>;
  permissionGuids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  permissionType?: Maybe<Eureka_Common_PermissionsType>;
  query?: Maybe<Scalars['String']>;
  removeDuplicates?: Maybe<Scalars['Boolean']>;
  requestIdentifiers?: Maybe<Eureka_Common_HttpClientRequestIdentifiers>;
  searchOption?: Maybe<Eureka_SearchRequest_SearchResultOption>;
  searcherVersion?: Maybe<Eureka_SearchRequest_SearcherVersion>;
  sortBy?: Maybe<Array<Maybe<Eureka_SearchRequest_SortBy>>>;
  source?: Maybe<Eureka_SearchRequest_Source>;
  worksheetFacetPayload?: Maybe<Eureka_WorksheetFacetPayload>;
};

export enum Eureka_SearchRequest_SearchResultOption {
  AiAnswer = 'AI_ANSWER',
  Both = 'BOTH',
  SearchResults = 'SEARCH_RESULTS'
}

export enum Eureka_SearchRequest_SearcherVersion {
  HierarchicalScore = 'HIERARCHICAL_SCORE',
  Production = 'PRODUCTION',
  QueryBuilderV2 = 'QUERY_BUILDER_V2',
  SearcherVersionAbsent = 'SEARCHER_VERSION_ABSENT',
  UseCaseBasedQueryBuilder = 'USE_CASE_BASED_QUERY_BUILDER'
}

export type Eureka_SearchRequest_SortBy = {
  __typename?: 'eureka_SearchRequest_SortBy';
  sortOnType?: Maybe<Eureka_SearchRequest_SortOnType>;
  sortOrder?: Maybe<Eureka_SearchRequest_SortOrder>;
};

export enum Eureka_SearchRequest_SortOnType {
  CreatedMs = 'CREATED_MS',
  ImpressionsOverall = 'IMPRESSIONS_OVERALL',
  ModifiedMs = 'MODIFIED_MS',
  Score = 'SCORE'
}

export enum Eureka_SearchRequest_SortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export enum Eureka_SearchRequest_Source {
  QuerySuggestion = 'QUERY_SUGGESTION',
  Typed = 'TYPED'
}

export type Eureka_SearchResponse = {
  __typename?: 'eureka_SearchResponse';
  aiAnswerState?: Maybe<Eureka_AiAnswerState>;
  batchSizeRequired?: Maybe<Scalars['Int']>;
  facets?: Maybe<Array<Maybe<Eureka_Facet>>>;
  isFinalPage?: Maybe<Scalars['Boolean']>;
  nextPageOffset?: Maybe<Scalars['Int']>;
  nlToSqlMappingIds?: Maybe<Array<Maybe<Scalars['Long']>>>;
  requestIdentifiers?: Maybe<Eureka_Common_HttpClientRequestIdentifiers>;
  results?: Maybe<Array<Maybe<Eureka_Result>>>;
  rewrittenQueries?: Maybe<Array<Maybe<Scalars['String']>>>;
  sageQuerySuggestions?: Maybe<Array<Maybe<Eureka_SageQuerySuggestion>>>;
  totalFacetResultCount?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['String']>;
};

export type Eureka_SearchResultRelevanceFeedback = {
  __typename?: 'eureka_SearchResultRelevanceFeedback';
  comment?: Maybe<Scalars['String']>;
  rating?: Maybe<Eureka_SearchResultRelevanceFeedback_Rating>;
};

export enum Eureka_SearchResultRelevanceFeedback_Rating {
  HighlyRelevant = 'HIGHLY_RELEVANT',
  Irrelevant = 'IRRELEVANT',
  SlightlyRelevant = 'SLIGHTLY_RELEVANT',
  Unspecified = 'UNSPECIFIED'
}

export type Eureka_SnippetInfo = {
  __typename?: 'eureka_SnippetInfo';
  descriptionSnippet?: Maybe<Eureka_SnippetInfo_Snippet>;
  sageQuerySnippet?: Maybe<Sage_Auto_Complete_V2_FormattedTokens>;
  sageQuerySnippetWithHighlights?: Maybe<Array<Maybe<Eureka_SnippetInfo_SageSnippet>>>;
  titleSnippet?: Maybe<Eureka_SnippetInfo_Snippet>;
};

export type Eureka_SnippetInfo_Range = {
  __typename?: 'eureka_SnippetInfo_Range';
  end?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type Eureka_SnippetInfo_SageSnippet = {
  __typename?: 'eureka_SnippetInfo_SageSnippet';
  highlights?: Maybe<Array<Maybe<Eureka_SnippetInfo_Range>>>;
  phraseType?: Maybe<Sage_PhraseType_E>;
  phraseValue?: Maybe<Scalars['String']>;
};

export type Eureka_SnippetInfo_Snippet = {
  __typename?: 'eureka_SnippetInfo_Snippet';
  highlights?: Maybe<Array<Maybe<Eureka_SnippetInfo_Range>>>;
  snippetString?: Maybe<Scalars['String']>;
};

export type Eureka_TenantSearchIndexProbeRequest = {
  __typename?: 'eureka_TenantSearchIndexProbeRequest';
  requestId?: Maybe<Scalars['String']>;
};

export type Eureka_TenantSearchIndexProbeResponse = {
  __typename?: 'eureka_TenantSearchIndexProbeResponse';
  metadataIndexCreated?: Maybe<Scalars['Boolean']>;
  numPinboardsIndexed?: Maybe<Scalars['Int']>;
  numSavedAnswersIndexed?: Maybe<Scalars['Int']>;
  numUsersPermissionsIndexed?: Maybe<Scalars['Int']>;
  numVisualizationIndexed?: Maybe<Scalars['Int']>;
  searchHistoryIndexCreated?: Maybe<Scalars['Boolean']>;
  userPermissionsIndexCreated?: Maybe<Scalars['Boolean']>;
};

export type Eureka_UsageInfo = {
  __typename?: 'eureka_UsageInfo';
  favouriteCount?: Maybe<Scalars['Int']>;
  viewCount?: Maybe<Scalars['Int']>;
};

export type Eureka_UserResult = {
  __typename?: 'eureka_UserResult';
  guid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Eureka_VisualizationMetadata = {
  __typename?: 'eureka_VisualizationMetadata';
  chartType?: Maybe<Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto>;
  vizSnapshotRequestData?: Maybe<Eureka_VizSnapshotRequestData>;
  vizType?: Maybe<Scalars['String']>;
};

export type Eureka_VizCount = {
  __typename?: 'eureka_VizCount';
  charts?: Maybe<Scalars['Int']>;
  metrics?: Maybe<Scalars['Int']>;
  tables?: Maybe<Scalars['Int']>;
};

export type Eureka_VizSnapshotRequestData = {
  __typename?: 'eureka_VizSnapshotRequestData';
  parentReportbookGuid?: Maybe<Scalars['String']>;
  parentType?: Maybe<Eureka_ParentType>;
  version?: Maybe<Scalars['Int']>;
  vizGuid?: Maybe<Scalars['String']>;
};

export type Eureka_WorksheetFacetPayload = {
  __typename?: 'eureka_WorksheetFacetPayload';
  columnDetails?: Maybe<Array<Maybe<Eureka_WorksheetFacetPayload_ColumnDetail>>>;
  metadataVersion?: Maybe<Scalars['String']>;
  worksheetId?: Maybe<Scalars['String']>;
  worksheetName?: Maybe<Scalars['String']>;
};

export type Eureka_WorksheetFacetPayload_ColumnDetail = {
  __typename?: 'eureka_WorksheetFacetPayload_ColumnDetail';
  colType?: Maybe<Sage_ColumnType_E>;
  columnDescription?: Maybe<Scalars['String']>;
  columnName?: Maybe<Scalars['String']>;
  dataType?: Maybe<Callosum_ColumnDataTypeEnumProto_E>;
  guid?: Maybe<Scalars['String']>;
  referencedByQueryHypothesis?: Maybe<Scalars['Boolean']>;
  sampleValueToRecognizedToken?: Maybe<Array<Maybe<Eureka_WorksheetFacetPayload_ColumnDetail_SampleValueToRecognizedTokenEntry>>>;
  sampleValues?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceQueryTerm?: Maybe<Array<Maybe<Scalars['String']>>>;
  synonyms?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Eureka_WorksheetFacetPayload_ColumnDetail_SampleValueToRecognizedTokenEntry = {
  __typename?: 'eureka_WorksheetFacetPayload_ColumnDetail_SampleValueToRecognizedTokenEntry';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Sage_Auto_Complete_V2_RecognizedToken>;
};

export type Eureka_WorksheetInfo = {
  __typename?: 'eureka_WorksheetInfo';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Eureka_Agent_ColumnSynonymRequest = {
  __typename?: 'eureka_agent_ColumnSynonymRequest';
  description?: Maybe<Scalars['String']>;
  logicalColumnId?: Maybe<Scalars['String']>;
  synonyms?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Eureka_Agent_DebugInfo = {
  __typename?: 'eureka_agent_DebugInfo';
  requestId?: Maybe<Scalars['String']>;
};

export type Eureka_Agent_Query = {
  __typename?: 'eureka_agent_Query';
  count?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
};

export type Eureka_Agent_ResolveTokenRequest = {
  __typename?: 'eureka_agent_ResolveTokenRequest';
  permissionGuids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  permissionType?: Maybe<Eureka_Common_PermissionsType>;
  resolveType?: Maybe<Eureka_Agent_ResolveTokenRequest_ResolveType>;
  synonymRequest?: Maybe<Eureka_Agent_SynonymRequest>;
  token?: Maybe<Scalars['String']>;
};

export enum Eureka_Agent_ResolveTokenRequest_ResolveType {
  AddSynonym = 'ADD_SYNONYM',
  Ignore = 'IGNORE'
}

export type Eureka_Agent_ResolveTokenResponse = {
  __typename?: 'eureka_agent_ResolveTokenResponse';
  status?: Maybe<Eureka_Agent_ResolveTokenResponse_Status>;
};

export enum Eureka_Agent_ResolveTokenResponse_Status {
  Failed = 'FAILED',
  Received = 'RECEIVED'
}

export type Eureka_Agent_SynonymInfo = {
  __typename?: 'eureka_agent_SynonymInfo';
  id?: Maybe<Scalars['String']>;
  resolutionType?: Maybe<Eureka_Agent_SynonymInfo_ResolutionType>;
  synonymPhrase?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
  worksheetId?: Maybe<Scalars['String']>;
};

export enum Eureka_Agent_SynonymInfo_ResolutionType {
  Ignored = 'IGNORED',
  Queued = 'QUEUED',
  Resolved = 'RESOLVED',
  Unresolved = 'UNRESOLVED'
}

export type Eureka_Agent_SynonymRequest = {
  __typename?: 'eureka_agent_SynonymRequest';
  apiTimestamp?: Maybe<Scalars['Long']>;
  clusterId?: Maybe<Scalars['String']>;
  columnSynonymRequests?: Maybe<Array<Maybe<Eureka_Agent_ColumnSynonymRequest>>>;
  debugInfo?: Maybe<Eureka_Agent_DebugInfo>;
  transactionDescription?: Maybe<Eureka_Agent_TransactionDescription>;
  transactionId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  worksheetId?: Maybe<Scalars['String']>;
};

export type Eureka_Agent_SynonymRequestStatus = {
  __typename?: 'eureka_agent_SynonymRequestStatus';
  clusterId?: Maybe<Scalars['String']>;
  debugInfo?: Maybe<Eureka_Agent_DebugInfo>;
  status?: Maybe<Common_StatusProto>;
  transactionId?: Maybe<Scalars['String']>;
};

export type Eureka_Agent_TokenInfo = {
  __typename?: 'eureka_agent_TokenInfo';
  queries?: Maybe<Array<Maybe<Eureka_Agent_Query>>>;
  queryCount?: Maybe<Scalars['Int']>;
  tokenValue?: Maybe<Scalars['String']>;
  userCount?: Maybe<Scalars['Int']>;
};

export enum Eureka_Agent_TokenType {
  Resolved = 'RESOLVED',
  Unresolved = 'UNRESOLVED'
}

export type Eureka_Agent_TokensRequest = {
  __typename?: 'eureka_agent_TokensRequest';
  permissionGuids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  permissionType?: Maybe<Eureka_Common_PermissionsType>;
  tokenType?: Maybe<Eureka_Agent_TokenType>;
  tokenValue?: Maybe<Scalars['String']>;
  worksheetId?: Maybe<Scalars['String']>;
};

export type Eureka_Agent_TokensResponse = {
  __typename?: 'eureka_agent_TokensResponse';
  tokenType?: Maybe<Eureka_Agent_TokenType>;
  tokens?: Maybe<Array<Maybe<Eureka_Agent_TokenInfo>>>;
};

export type Eureka_Agent_Transaction = {
  __typename?: 'eureka_agent_Transaction';
  actionType?: Maybe<Eureka_Agent_Transaction_ActionType>;
  status?: Maybe<Eureka_Agent_Transaction_Status>;
  synonymRequest?: Maybe<Eureka_Agent_SynonymRequest>;
  tenantId?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Long']>;
  transactionId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type Eureka_Agent_TransactionDescription = {
  __typename?: 'eureka_agent_TransactionDescription';
  ignoreTokenDescription?: Maybe<Scalars['String']>;
};

export enum Eureka_Agent_Transaction_ActionType {
  ResolveToken = 'RESOLVE_TOKEN'
}

export enum Eureka_Agent_Transaction_Status {
  Done = 'DONE',
  Failed = 'FAILED',
  NotQueued = 'NOT_QUEUED',
  Queued = 'QUEUED'
}

export type Eureka_Agent_UnresolvedTokenInfo = {
  __typename?: 'eureka_agent_UnresolvedTokenInfo';
  tenantId?: Maybe<Scalars['String']>;
  tokenInfo?: Maybe<Array<Maybe<Eureka_Agent_TokenInfo>>>;
  worsheetId?: Maybe<Scalars['String']>;
};

export type Eureka_Common_HttpClientRequestIdentifiers = {
  __typename?: 'eureka_common_HttpClientRequestIdentifiers';
  apiRequestId?: Maybe<Scalars['String']>;
  appActivityId?: Maybe<Scalars['String']>;
};

export enum Eureka_Common_PermissionsType {
  D13YPermissionsExplicit = 'D13Y_PERMISSIONS_EXPLICIT',
  PermissionExplicit = 'PERMISSION_EXPLICIT',
  PermissionFlattened = 'PERMISSION_FLATTENED',
  PermissionUnspecified = 'PERMISSION_UNSPECIFIED'
}

export type Falcon_AggregateOp = {
  __typename?: 'falcon_AggregateOp';
  _?: Maybe<Scalars['String']>;
};

export enum Falcon_AggregateOp_E {
  AggrApproxCountDistinct = 'AGGR_APPROX_COUNT_DISTINCT',
  AggrApproxDistinct = 'AGGR_APPROX_DISTINCT',
  AggrApproxDistinctMerge = 'AGGR_APPROX_DISTINCT_MERGE',
  AggrAverage = 'AGGR_AVERAGE',
  AggrCountDistinct = 'AGGR_COUNT_DISTINCT',
  AggrCountDistinctNonNull = 'AGGR_COUNT_DISTINCT_NON_NULL',
  AggrCountDistinctV1 = 'AGGR_COUNT_DISTINCT_V1',
  AggrCountNonNull = 'AGGR_COUNT_NON_NULL',
  AggrCountWithNull = 'AGGR_COUNT_WITH_NULL',
  AggrDenseRank = 'AGGR_DENSE_RANK',
  AggrDistinct = 'AGGR_DISTINCT',
  AggrDistinctNonNull = 'AGGR_DISTINCT_NON_NULL',
  AggrGrowth = 'AGGR_GROWTH',
  AggrMax = 'AGGR_MAX',
  AggrMedian = 'AGGR_MEDIAN',
  AggrMin = 'AGGR_MIN',
  AggrNone = 'AGGR_NONE',
  AggrNtile = 'AGGR_NTILE',
  AggrPercentileContWithinGroup = 'AGGR_PERCENTILE_CONT_WITHIN_GROUP',
  AggrPercentileDiscWithinGroup = 'AGGR_PERCENTILE_DISC_WITHIN_GROUP',
  AggrPercentRank = 'AGGR_PERCENT_RANK',
  AggrRank = 'AGGR_RANK',
  AggrRankPercentile = 'AGGR_RANK_PERCENTILE',
  AggrRowNumber = 'AGGR_ROW_NUMBER',
  AggrStdev = 'AGGR_STDEV',
  AggrSum = 'AGGR_SUM',
  AggrValueBreak = 'AGGR_VALUE_BREAK',
  AggrVariance = 'AGGR_VARIANCE',
  Avg = 'AVG',
  Count = 'COUNT',
  CountDistinct = 'COUNT_DISTINCT',
  CountNonNull = 'COUNT_NON_NULL',
  CountWithNull = 'COUNT_WITH_NULL',
  Growth = 'GROWTH',
  Max = 'MAX',
  Median = 'MEDIAN',
  Min = 'MIN',
  None = 'NONE',
  SqlBoolAggregate = 'SQL_BOOL_AGGREGATE',
  SqlDateAggregate = 'SQL_DATE_AGGREGATE',
  SqlDateTimeAggregate = 'SQL_DATE_TIME_AGGREGATE',
  SqlDoubleAggregate = 'SQL_DOUBLE_AGGREGATE',
  SqlIntAggregate = 'SQL_INT_AGGREGATE',
  SqlStringAggregate = 'SQL_STRING_AGGREGATE',
  SqlTimeAggregate = 'SQL_TIME_AGGREGATE',
  Stdev = 'STDEV',
  Sum = 'SUM',
  Variance = 'VARIANCE'
}

export type Falcon_ClientContext = {
  __typename?: 'falcon_ClientContext';
  clientId?: Maybe<Scalars['String']>;
  isInternal?: Maybe<Scalars['Boolean']>;
  username?: Maybe<Scalars['String']>;
};

export type Falcon_ColumnDefinition = {
  __typename?: 'falcon_ColumnDefinition';
  column?: Maybe<Falcon_ColumnDefinition_Column>;
  displayName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** @deprecated Field no longer supported */
  userAnnotation?: Maybe<Falcon_DeprecatedUserAnnotation>;
};

export type Falcon_ColumnDefinition_Column = {
  __typename?: 'falcon_ColumnDefinition_Column';
  columnDisplayName?: Maybe<Scalars['String']>;
  columnName?: Maybe<Scalars['String']>;
  columnSchemaName?: Maybe<Scalars['String']>;
  tableDisplayName?: Maybe<Scalars['String']>;
  tableName?: Maybe<Scalars['String']>;
  userSchemaDisplayName?: Maybe<Scalars['String']>;
  userSchemaName?: Maybe<Scalars['String']>;
};

export type Falcon_ColumnStatsProto = {
  __typename?: 'falcon_ColumnStatsProto';
  cardinality?: Maybe<Util_CardinalityEstimatorProto>;
  estimatedCardinality?: Maybe<Scalars['Long']>;
  max?: Maybe<Falcon_ValueProto>;
  min?: Maybe<Falcon_ValueProto>;
  numNulls?: Maybe<Scalars['Long']>;
  total?: Maybe<Scalars['Long']>;
};

export type Falcon_CompressionScheme = {
  __typename?: 'falcon_CompressionScheme';
  _?: Maybe<Scalars['String']>;
};

export enum Falcon_CompressionScheme_E {
  Auto = 'AUTO',
  Disabled = 'DISABLED',
  Lz4 = 'LZ4',
  None = 'NONE',
  Rle = 'RLE'
}

export type Falcon_ConstantValue = {
  __typename?: 'falcon_ConstantValue';
  boolVal?: Maybe<Scalars['Boolean']>;
  doubleVal?: Maybe<Scalars['Float']>;
  floatVal?: Maybe<Scalars['Float']>;
  int32Val?: Maybe<Scalars['Int']>;
  int64Val?: Maybe<Scalars['Long']>;
  normalize?: Maybe<Scalars['Boolean']>;
  nullType?: Maybe<Falcon_ValueProto_Type>;
  nullVal?: Maybe<Scalars['Boolean']>;
  stringVal?: Maybe<Scalars['String']>;
};

export type Falcon_DataType = {
  __typename?: 'falcon_DataType';
  _?: Maybe<Scalars['String']>;
};

export enum Falcon_DataType_E {
  Bool = 'BOOL',
  Char = 'CHAR',
  Date = 'DATE',
  DateTime = 'DATE_TIME',
  Double = 'DOUBLE',
  Float = 'FLOAT',
  Int32 = 'INT32',
  Int64 = 'INT64',
  MaxType = 'MAX_TYPE',
  Time = 'TIME',
  Unknown = 'UNKNOWN'
}

export type Falcon_DatepartDefinition = {
  __typename?: 'falcon_DatepartDefinition';
  calendarTable?: Maybe<Falcon_TableHeaderProto>;
  lookupColumnTag?: Maybe<Scalars['String']>;
  partColumnTag?: Maybe<Scalars['String']>;
};

export type Falcon_Definitions = {
  __typename?: 'falcon_Definitions';
  columns?: Maybe<Array<Maybe<Falcon_ColumnDefinition>>>;
  expressions?: Maybe<Array<Maybe<Falcon_ExpressionDefinition>>>;
  /** @deprecated Field no longer supported */
  expressionsOld?: Maybe<Array<Maybe<Falcon_ExpressionDefinitionList>>>;
  values?: Maybe<Array<Maybe<Falcon_ValueDefinition>>>;
};

export type Falcon_DeprecatedUserAnnotation = {
  __typename?: 'falcon_DeprecatedUserAnnotation';
  type?: Maybe<Scalars['String']>;
};

export type Falcon_EncodedFileNameProto = {
  __typename?: 'falcon_EncodedFileNameProto';
  dataVersion?: Maybe<Array<Maybe<Falcon_EncodedFileNameProto_DataVersionRange>>>;
};

export type Falcon_EncodedFileNameProto_DataVersionRange = {
  __typename?: 'falcon_EncodedFileNameProto_DataVersionRange';
  from?: Maybe<Scalars['Long']>;
  schemaVersion?: Maybe<Scalars['Long']>;
  to?: Maybe<Scalars['Long']>;
};

export type Falcon_EncodedFileNameSharedProto = {
  __typename?: 'falcon_EncodedFileNameSharedProto';
  dataDirPrefix?: Maybe<Scalars['String']>;
  /** @deprecated Field no longer supported */
  dataFilePrefix?: Maybe<Scalars['String']>;
  db?: Maybe<Scalars['String']>;
  partition?: Maybe<Scalars['Long']>;
  schemaVersion?: Maybe<Scalars['Long']>;
  table?: Maybe<Scalars['String']>;
  userSchema?: Maybe<Scalars['String']>;
};

export type Falcon_ExpressionDefinition = {
  __typename?: 'falcon_ExpressionDefinition';
  dataType?: Maybe<Falcon_DataType_E>;
  datepart?: Maybe<Falcon_DatepartDefinition>;
  displayName?: Maybe<Scalars['String']>;
  function?: Maybe<Falcon_AggregateOp_E>;
  /** @deprecated Field no longer supported */
  leftNodeTag?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  op?: Maybe<Falcon_ExpressionOp_E>;
  operandTag?: Maybe<Array<Maybe<Scalars['String']>>>;
  partitionOver?: Maybe<Falcon_PartitionOverDefinition>;
  /** @deprecated Field no longer supported */
  rightNodeTag?: Maybe<Scalars['String']>;
  subqueryRef?: Maybe<Falcon_SubqueryRefDefinition>;
  /** @deprecated Field no longer supported */
  userAnnotation?: Maybe<Falcon_DeprecatedUserAnnotation>;
  withinGroup?: Maybe<Falcon_WithinGroupDefinition>;
};

export type Falcon_ExpressionDefinitionList = {
  __typename?: 'falcon_ExpressionDefinitionList';
  nodes?: Maybe<Array<Maybe<Falcon_ExpressionDefinition>>>;
};

export type Falcon_ExpressionOp = {
  __typename?: 'falcon_ExpressionOp';
  _?: Maybe<Scalars['String']>;
};

export enum Falcon_ExpressionOp_E {
  AbsDay = 'ABS_DAY',
  AbsDayAsEpoch = 'ABS_DAY_AS_EPOCH',
  AbsHour = 'ABS_HOUR',
  AbsHourAsEpoch = 'ABS_HOUR_AS_EPOCH',
  AbsMonth = 'ABS_MONTH',
  AbsMonthAsEpoch = 'ABS_MONTH_AS_EPOCH',
  AbsQuarter = 'ABS_QUARTER',
  AbsQuarterAsEpoch = 'ABS_QUARTER_AS_EPOCH',
  AbsWeek = 'ABS_WEEK',
  AbsYear = 'ABS_YEAR',
  AbsYearAsEpoch = 'ABS_YEAR_AS_EPOCH',
  DayInMonth = 'DAY_IN_MONTH',
  DayInQuarter = 'DAY_IN_QUARTER',
  DayInYear = 'DAY_IN_YEAR',
  DayOfWeek = 'DAY_OF_WEEK',
  DayStartEpoch = 'DAY_START_EPOCH',
  Diff = 'DIFF',
  Div = 'DIV',
  Exp = 'EXP',
  HourStartEpoch = 'HOUR_START_EPOCH',
  Mod = 'MOD',
  MonthInQuarter = 'MONTH_IN_QUARTER',
  MonthInYear = 'MONTH_IN_YEAR',
  MonthStartEpoch = 'MONTH_START_EPOCH',
  Mult = 'MULT',
  None = 'NONE',
  OpAbs = 'OP_ABS',
  OpAbsDay = 'OP_ABS_DAY',
  OpAbsHour = 'OP_ABS_HOUR',
  OpAbsMinute = 'OP_ABS_MINUTE',
  OpAbsMonth = 'OP_ABS_MONTH',
  OpAbsQuarter = 'OP_ABS_QUARTER',
  OpAbsWeek = 'OP_ABS_WEEK',
  OpAbsYear = 'OP_ABS_YEAR',
  OpAcos = 'OP_ACOS',
  OpAnd = 'OP_AND',
  OpApproxSetCardinality = 'OP_APPROX_SET_CARDINALITY',
  OpAsin = 'OP_ASIN',
  OpAtan = 'OP_ATAN',
  OpAtan2 = 'OP_ATAN2',
  OpBeginsWith = 'OP_BEGINS_WITH',
  OpBeginsWithNocase = 'OP_BEGINS_WITH_NOCASE',
  OpCeil = 'OP_CEIL',
  OpCombineHash = 'OP_COMBINE_HASH',
  OpContainerSize = 'OP_CONTAINER_SIZE',
  OpContains = 'OP_CONTAINS',
  OpContainsNocase = 'OP_CONTAINS_NOCASE',
  OpConvertBoolNumeric = 'OP_CONVERT_BOOL_NUMERIC',
  OpConvertBoolString = 'OP_CONVERT_BOOL_STRING',
  OpConvertDateString = 'OP_CONVERT_DATE_STRING',
  OpConvertDoubleString = 'OP_CONVERT_DOUBLE_STRING',
  OpConvertFloatInteger = 'OP_CONVERT_FLOAT_INTEGER',
  OpConvertInt64String = 'OP_CONVERT_INT64_STRING',
  OpConvertIntegerDouble = 'OP_CONVERT_INTEGER_DOUBLE',
  OpConvertNumericBool = 'OP_CONVERT_NUMERIC_BOOL',
  OpConvertStringBool = 'OP_CONVERT_STRING_BOOL',
  OpConvertStringDouble = 'OP_CONVERT_STRING_DOUBLE',
  OpConvertStringFloat = 'OP_CONVERT_STRING_FLOAT',
  OpConvertStringInt64 = 'OP_CONVERT_STRING_INT64',
  OpCos = 'OP_COS',
  OpCube = 'OP_CUBE',
  OpCuberoot = 'OP_CUBEROOT',
  OpDateAddDays = 'OP_DATE_ADD_DAYS',
  OpDateAddMonths = 'OP_DATE_ADD_MONTHS',
  OpDateAddWeeks = 'OP_DATE_ADD_WEEKS',
  OpDateAddYears = 'OP_DATE_ADD_YEARS',
  OpDateDiffDays = 'OP_DATE_DIFF_DAYS',
  OpDateParse = 'OP_DATE_PARSE',
  OpDateTimeAddMinutes = 'OP_DATE_TIME_ADD_MINUTES',
  OpDateTimeAddSeconds = 'OP_DATE_TIME_ADD_SECONDS',
  OpDayInMonth = 'OP_DAY_IN_MONTH',
  OpDayInQuarter = 'OP_DAY_IN_QUARTER',
  OpDayInYear = 'OP_DAY_IN_YEAR',
  OpDayOfWeek = 'OP_DAY_OF_WEEK',
  OpDayOfWeekStr = 'OP_DAY_OF_WEEK_STR',
  OpDayStartEpoch = 'OP_DAY_START_EPOCH',
  OpDivide = 'OP_DIVIDE',
  OpEditDistance = 'OP_EDIT_DISTANCE',
  OpEditDistanceWithCap = 'OP_EDIT_DISTANCE_WITH_CAP',
  OpEndsWith = 'OP_ENDS_WITH',
  OpEndsWithNocase = 'OP_ENDS_WITH_NOCASE',
  OpEquals = 'OP_EQUALS',
  OpEqualsNocase = 'OP_EQUALS_NOCASE',
  OpExp = 'OP_EXP',
  OpExp2 = 'OP_EXP2',
  OpFloor = 'OP_FLOOR',
  OpGreaterEquals = 'OP_GREATER_EQUALS',
  OpGreaterEqualsNocase = 'OP_GREATER_EQUALS_NOCASE',
  OpGreaterThan = 'OP_GREATER_THAN',
  OpGreaterThanNocase = 'OP_GREATER_THAN_NOCASE',
  OpGreatest = 'OP_GREATEST',
  OpHash = 'OP_HASH',
  OpHourInDay = 'OP_HOUR_IN_DAY',
  OpHourStartEpoch = 'OP_HOUR_START_EPOCH',
  OpIdentity = 'OP_IDENTITY',
  OpIf = 'OP_IF',
  OpIfNull = 'OP_IF_NULL',
  OpIn = 'OP_IN',
  OpIsNull = 'OP_IS_NULL',
  OpIsWeekend = 'OP_IS_WEEKEND',
  OpLeast = 'OP_LEAST',
  OpLeft = 'OP_LEFT',
  OpLesserEquals = 'OP_LESSER_EQUALS',
  OpLesserEqualsNocase = 'OP_LESSER_EQUALS_NOCASE',
  OpLessThan = 'OP_LESS_THAN',
  OpLessThanNocase = 'OP_LESS_THAN_NOCASE',
  OpLike = 'OP_LIKE',
  OpLn = 'OP_LN',
  OpLog2 = 'OP_LOG2',
  OpLog10 = 'OP_LOG10',
  OpMinus = 'OP_MINUS',
  OpMinuteStartEpoch = 'OP_MINUTE_START_EPOCH',
  OpMod = 'OP_MOD',
  OpMonthInQuarter = 'OP_MONTH_IN_QUARTER',
  OpMonthInYear = 'OP_MONTH_IN_YEAR',
  OpMonthInYearStr = 'OP_MONTH_IN_YEAR_STR',
  OpMonthStartEpoch = 'OP_MONTH_START_EPOCH',
  OpMultiply = 'OP_MULTIPLY',
  OpNegate = 'OP_NEGATE',
  OpNone = 'OP_NONE',
  OpNormalizeString = 'OP_NORMALIZE_STRING',
  OpNormalizeStringPreserveCase = 'OP_NORMALIZE_STRING_PRESERVE_CASE',
  OpNot = 'OP_NOT',
  OpNotEquals = 'OP_NOT_EQUALS',
  OpNotEqualsNocase = 'OP_NOT_EQUALS_NOCASE',
  OpNow = 'OP_NOW',
  OpNumOps = 'OP_NUM_OPS',
  OpOr = 'OP_OR',
  OpPlus = 'OP_PLUS',
  OpPow = 'OP_POW',
  OpQuarterInYear = 'OP_QUARTER_IN_YEAR',
  OpQuarterStartEpoch = 'OP_QUARTER_START_EPOCH',
  OpRandom = 'OP_RANDOM',
  OpRight = 'OP_RIGHT',
  OpRound = 'OP_ROUND',
  OpSecondInDay = 'OP_SECOND_IN_DAY',
  OpSign = 'OP_SIGN',
  OpSin = 'OP_SIN',
  OpSoundsLike = 'OP_SOUNDS_LIKE',
  OpSpellsLike = 'OP_SPELLS_LIKE',
  OpSphericalDistance = 'OP_SPHERICAL_DISTANCE',
  OpSqrt = 'OP_SQRT',
  OpSquare = 'OP_SQUARE',
  OpStrcat = 'OP_STRCAT',
  OpStringMatchScore = 'OP_STRING_MATCH_SCORE',
  OpStrlen = 'OP_STRLEN',
  OpStrpos = 'OP_STRPOS',
  OpSubstr = 'OP_SUBSTR',
  OpTan = 'OP_TAN',
  OpTimePart = 'OP_TIME_PART',
  OpToday = 'OP_TODAY',
  OpUtf8Left = 'OP_UTF8_LEFT',
  OpUtf8Right = 'OP_UTF8_RIGHT',
  OpUtf8Strlen = 'OP_UTF8_STRLEN',
  OpUtf8Strpos = 'OP_UTF8_STRPOS',
  OpUtf8Substr = 'OP_UTF8_SUBSTR',
  OpWeekInMonth = 'OP_WEEK_IN_MONTH',
  OpWeekInMonthAsEpoch = 'OP_WEEK_IN_MONTH_AS_EPOCH',
  OpWeekInQuarter = 'OP_WEEK_IN_QUARTER',
  OpWeekInQuarterAsEpoch = 'OP_WEEK_IN_QUARTER_AS_EPOCH',
  OpWeekInYear = 'OP_WEEK_IN_YEAR',
  OpWeekInYearAsEpoch = 'OP_WEEK_IN_YEAR_AS_EPOCH',
  OpWeekInYearIso = 'OP_WEEK_IN_YEAR_ISO',
  OpWeekStartEpoch = 'OP_WEEK_START_EPOCH',
  OpYearStartEpoch = 'OP_YEAR_START_EPOCH',
  QuarterInYear = 'QUARTER_IN_YEAR',
  QuarterStartEpoch = 'QUARTER_START_EPOCH',
  Sum = 'SUM',
  WeekInMonth = 'WEEK_IN_MONTH',
  WeekInMonthAsEpoch = 'WEEK_IN_MONTH_AS_EPOCH',
  WeekInQuarter = 'WEEK_IN_QUARTER',
  WeekInQuarterAsEpoch = 'WEEK_IN_QUARTER_AS_EPOCH',
  WeekInYear = 'WEEK_IN_YEAR',
  WeekInYearAsEpoch = 'WEEK_IN_YEAR_AS_EPOCH',
  WeekStartEpoch = 'WEEK_START_EPOCH',
  YearStartEpoch = 'YEAR_START_EPOCH'
}

export type Falcon_FullyQualifiedNameProto = {
  __typename?: 'falcon_FullyQualifiedNameProto';
  databaseName?: Maybe<Scalars['String']>;
  tableName?: Maybe<Scalars['String']>;
  userSchemaName?: Maybe<Scalars['String']>;
};

export type Falcon_MultiPartNameProto = {
  __typename?: 'falcon_MultiPartNameProto';
  alias?: Maybe<Scalars['String']>;
  columnId?: Maybe<Falcon_ObjectId>;
  dbId?: Maybe<Falcon_ObjectId>;
  tableId?: Maybe<Falcon_ObjectId>;
  userSchemaId?: Maybe<Falcon_ObjectId>;
};

export type Falcon_MultiPartTableNameProto = {
  __typename?: 'falcon_MultiPartTableNameProto';
  alias?: Maybe<Scalars['String']>;
  dbId?: Maybe<Falcon_ObjectId>;
  tableId?: Maybe<Falcon_ObjectId>;
  userSchemaId?: Maybe<Falcon_ObjectId>;
};

export type Falcon_ObjectId = {
  __typename?: 'falcon_ObjectId';
  guid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Falcon_ObjectSummary = {
  __typename?: 'falcon_ObjectSummary';
  createdBy?: Maybe<Scalars['String']>;
  createdOn?: Maybe<Scalars['Long']>;
  description?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedOn?: Maybe<Scalars['Long']>;
  lastRefreshEnqueuedTime?: Maybe<Scalars['Long']>;
  lastRefreshStartTime?: Maybe<Scalars['Long']>;
  lastRefreshTime?: Maybe<Scalars['Long']>;
  lastRefreshTimeTaken?: Maybe<Scalars['Long']>;
};

export type Falcon_PartitionOverDefinition = {
  __typename?: 'falcon_PartitionOverDefinition';
  orderBy?: Maybe<Array<Maybe<Falcon_PartitionOverDefinition_OrderingColumn>>>;
  partitionBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  window?: Maybe<Falcon_PartitionWindow>;
};

export type Falcon_PartitionOverDefinition_OrderingColumn = {
  __typename?: 'falcon_PartitionOverDefinition_OrderingColumn';
  ascending?: Maybe<Scalars['Boolean']>;
  column?: Maybe<Scalars['String']>;
};

export type Falcon_PartitionWindow = {
  __typename?: 'falcon_PartitionWindow';
  end?: Maybe<Falcon_PartitionWindow_Point>;
  start?: Maybe<Falcon_PartitionWindow_Point>;
  windowType?: Maybe<Falcon_PartitionWindow_WindowType>;
};

export type Falcon_PartitionWindow_Point = {
  __typename?: 'falcon_PartitionWindow_Point';
  n?: Maybe<Scalars['Long']>;
  type?: Maybe<Falcon_PartitionWindow_PointType>;
};

export enum Falcon_PartitionWindow_PointType {
  CurrentRow = 'CURRENT_ROW',
  Following = 'FOLLOWING',
  Preceding = 'PRECEDING',
  UnboundedFollowing = 'UNBOUNDED_FOLLOWING',
  UnboundedPreceding = 'UNBOUNDED_PRECEDING'
}

export enum Falcon_PartitionWindow_WindowType {
  Range = 'RANGE',
  Row = 'ROW'
}

export type Falcon_SubqueryRefDefinition = {
  __typename?: 'falcon_SubqueryRefDefinition';
  subqueryColumnTag?: Maybe<Array<Maybe<Scalars['String']>>>;
  subqueryTableGuid?: Maybe<Scalars['String']>;
};

export type Falcon_TableHeaderProto = {
  __typename?: 'falcon_TableHeaderProto';
  dataVersion?: Maybe<Scalars['Long']>;
  guid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  schemaVersion?: Maybe<Scalars['Long']>;
};

export type Falcon_TableRowProto = {
  __typename?: 'falcon_TableRowProto';
  value?: Maybe<Array<Maybe<Falcon_ValueProto>>>;
};

export type Falcon_TableStatsProto = {
  __typename?: 'falcon_TableStatsProto';
  column?: Maybe<Array<Maybe<Falcon_TableStatsProto_Column>>>;
};

export type Falcon_TableStatsProto_Column = {
  __typename?: 'falcon_TableStatsProto_Column';
  id?: Maybe<Falcon_ObjectId>;
  stats?: Maybe<Falcon_ColumnStatsProto>;
};

export type Falcon_TableVersionInfo = {
  __typename?: 'falcon_TableVersionInfo';
  alias?: Maybe<Scalars['String']>;
  dataVersion?: Maybe<Scalars['Int']>;
  schemaVersion?: Maybe<Scalars['Int']>;
  table?: Maybe<Scalars['String']>;
};

export type Falcon_UpdatePolicy = {
  __typename?: 'falcon_UpdatePolicy';
  mode?: Maybe<Falcon_UpdatePolicy_Mode>;
};

export enum Falcon_UpdatePolicy_Mode {
  Manual = 'MANUAL',
  OnLoadAsync = 'ON_LOAD_ASYNC'
}

export type Falcon_ValueDefinition = {
  __typename?: 'falcon_ValueDefinition';
  displayName?: Maybe<Scalars['String']>;
  internal?: Maybe<Falcon_ValueDefinition_Internal>;
  name?: Maybe<Scalars['String']>;
  /** @deprecated Field no longer supported */
  userAnnotation?: Maybe<Falcon_DeprecatedUserAnnotation>;
  value?: Maybe<Falcon_ConstantValue>;
};

export type Falcon_ValueDefinition_Internal = {
  __typename?: 'falcon_ValueDefinition_Internal';
  vproto?: Maybe<Falcon_ValueProto>;
};

export type Falcon_ValueProto = {
  __typename?: 'falcon_ValueProto';
  b?: Maybe<Scalars['Boolean']>;
  caseBytes?: Maybe<Scalars['String']>;
  d?: Maybe<Scalars['Float']>;
  i?: Maybe<Scalars['Long']>;
  null?: Maybe<Scalars['Boolean']>;
  s?: Maybe<Scalars['String']>;
  scaseStrlen?: Maybe<Scalars['Int']>;
  type?: Maybe<Falcon_ValueProto_Type>;
};

export enum Falcon_ValueProto_Type {
  TypeBool = 'TYPE_BOOL',
  TypeDouble = 'TYPE_DOUBLE',
  TypeInt64 = 'TYPE_INT64',
  TypeNull = 'TYPE_NULL',
  TypeString = 'TYPE_STRING',
  TypeStringCase = 'TYPE_STRING_CASE'
}

export type Falcon_WithinGroupDefinition = {
  __typename?: 'falcon_WithinGroupDefinition';
  orderBy?: Maybe<Array<Maybe<Falcon_WithinGroupDefinition_OrderingColumn>>>;
};

export type Falcon_WithinGroupDefinition_OrderingColumn = {
  __typename?: 'falcon_WithinGroupDefinition_OrderingColumn';
  ascending?: Maybe<Scalars['Boolean']>;
  column?: Maybe<Scalars['String']>;
};

export type Google_Protobuf_DescriptorProto = {
  __typename?: 'google_protobuf_DescriptorProto';
  enumType?: Maybe<Array<Maybe<Google_Protobuf_EnumDescriptorProto>>>;
  extension?: Maybe<Array<Maybe<Google_Protobuf_FieldDescriptorProto>>>;
  extensionRange?: Maybe<Array<Maybe<Google_Protobuf_DescriptorProto_ExtensionRange>>>;
  field?: Maybe<Array<Maybe<Google_Protobuf_FieldDescriptorProto>>>;
  name?: Maybe<Scalars['String']>;
  nestedType?: Maybe<Array<Maybe<Google_Protobuf_DescriptorProto>>>;
  oneofDecl?: Maybe<Array<Maybe<Google_Protobuf_OneofDescriptorProto>>>;
  options?: Maybe<Google_Protobuf_MessageOptions>;
  reservedName?: Maybe<Array<Maybe<Scalars['String']>>>;
  reservedRange?: Maybe<Array<Maybe<Google_Protobuf_DescriptorProto_ReservedRange>>>;
};

export type Google_Protobuf_DescriptorProto_ExtensionRange = {
  __typename?: 'google_protobuf_DescriptorProto_ExtensionRange';
  end?: Maybe<Scalars['Int']>;
  options?: Maybe<Google_Protobuf_ExtensionRangeOptions>;
  start?: Maybe<Scalars['Int']>;
};

export type Google_Protobuf_DescriptorProto_ReservedRange = {
  __typename?: 'google_protobuf_DescriptorProto_ReservedRange';
  end?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type Google_Protobuf_EnumDescriptorProto = {
  __typename?: 'google_protobuf_EnumDescriptorProto';
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Google_Protobuf_EnumOptions>;
  reservedName?: Maybe<Array<Maybe<Scalars['String']>>>;
  reservedRange?: Maybe<Array<Maybe<Google_Protobuf_EnumDescriptorProto_EnumReservedRange>>>;
  value?: Maybe<Array<Maybe<Google_Protobuf_EnumValueDescriptorProto>>>;
};

export type Google_Protobuf_EnumDescriptorProto_EnumReservedRange = {
  __typename?: 'google_protobuf_EnumDescriptorProto_EnumReservedRange';
  end?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type Google_Protobuf_EnumOptions = {
  __typename?: 'google_protobuf_EnumOptions';
  allowAlias?: Maybe<Scalars['Boolean']>;
  deprecated?: Maybe<Scalars['Boolean']>;
  uninterpretedOption?: Maybe<Array<Maybe<Google_Protobuf_UninterpretedOption>>>;
};

export type Google_Protobuf_EnumValueDescriptorProto = {
  __typename?: 'google_protobuf_EnumValueDescriptorProto';
  name?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  options?: Maybe<Google_Protobuf_EnumValueOptions>;
};

export type Google_Protobuf_EnumValueOptions = {
  __typename?: 'google_protobuf_EnumValueOptions';
  deprecated?: Maybe<Scalars['Boolean']>;
  uninterpretedOption?: Maybe<Array<Maybe<Google_Protobuf_UninterpretedOption>>>;
};

export type Google_Protobuf_ExtensionRangeOptions = {
  __typename?: 'google_protobuf_ExtensionRangeOptions';
  uninterpretedOption?: Maybe<Array<Maybe<Google_Protobuf_UninterpretedOption>>>;
};

export type Google_Protobuf_FieldDescriptorProto = {
  __typename?: 'google_protobuf_FieldDescriptorProto';
  defaultValue?: Maybe<Scalars['String']>;
  extendee?: Maybe<Scalars['String']>;
  jsonName?: Maybe<Scalars['String']>;
  label?: Maybe<Google_Protobuf_FieldDescriptorProto_Label>;
  name?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  oneofIndex?: Maybe<Scalars['Int']>;
  options?: Maybe<Google_Protobuf_FieldOptions>;
  proto3Optional?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Google_Protobuf_FieldDescriptorProto_Type>;
  typeName?: Maybe<Scalars['String']>;
};

export enum Google_Protobuf_FieldDescriptorProto_Label {
  LabelOptional = 'LABEL_OPTIONAL',
  LabelRepeated = 'LABEL_REPEATED',
  LabelRequired = 'LABEL_REQUIRED'
}

export enum Google_Protobuf_FieldDescriptorProto_Type {
  TypeBool = 'TYPE_BOOL',
  TypeBytes = 'TYPE_BYTES',
  TypeDouble = 'TYPE_DOUBLE',
  TypeEnum = 'TYPE_ENUM',
  TypeFixed32 = 'TYPE_FIXED32',
  TypeFixed64 = 'TYPE_FIXED64',
  TypeFloat = 'TYPE_FLOAT',
  TypeGroup = 'TYPE_GROUP',
  TypeInt32 = 'TYPE_INT32',
  TypeInt64 = 'TYPE_INT64',
  TypeMessage = 'TYPE_MESSAGE',
  TypeSfixed32 = 'TYPE_SFIXED32',
  TypeSfixed64 = 'TYPE_SFIXED64',
  TypeSint32 = 'TYPE_SINT32',
  TypeSint64 = 'TYPE_SINT64',
  TypeString = 'TYPE_STRING',
  TypeUint32 = 'TYPE_UINT32',
  TypeUint64 = 'TYPE_UINT64'
}

export type Google_Protobuf_FieldOptions = {
  __typename?: 'google_protobuf_FieldOptions';
  ctype?: Maybe<Google_Protobuf_FieldOptions_CType>;
  deprecated?: Maybe<Scalars['Boolean']>;
  jstype?: Maybe<Google_Protobuf_FieldOptions_JsType>;
  lazy?: Maybe<Scalars['Boolean']>;
  packed?: Maybe<Scalars['Boolean']>;
  uninterpretedOption?: Maybe<Array<Maybe<Google_Protobuf_UninterpretedOption>>>;
  unverifiedLazy?: Maybe<Scalars['Boolean']>;
  weak?: Maybe<Scalars['Boolean']>;
};

export enum Google_Protobuf_FieldOptions_CType {
  Cord = 'CORD',
  String = 'STRING',
  StringPiece = 'STRING_PIECE'
}

export enum Google_Protobuf_FieldOptions_JsType {
  JsNormal = 'JS_NORMAL',
  JsNumber = 'JS_NUMBER',
  JsString = 'JS_STRING'
}

export type Google_Protobuf_FileDescriptorProto = {
  __typename?: 'google_protobuf_FileDescriptorProto';
  dependency?: Maybe<Array<Maybe<Scalars['String']>>>;
  enumType?: Maybe<Array<Maybe<Google_Protobuf_EnumDescriptorProto>>>;
  extension?: Maybe<Array<Maybe<Google_Protobuf_FieldDescriptorProto>>>;
  messageType?: Maybe<Array<Maybe<Google_Protobuf_DescriptorProto>>>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Google_Protobuf_FileOptions>;
  package?: Maybe<Scalars['String']>;
  publicDependency?: Maybe<Array<Maybe<Scalars['Int']>>>;
  service?: Maybe<Array<Maybe<Google_Protobuf_ServiceDescriptorProto>>>;
  sourceCodeInfo?: Maybe<Google_Protobuf_SourceCodeInfo>;
  syntax?: Maybe<Scalars['String']>;
  weakDependency?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type Google_Protobuf_FileDescriptorSet = {
  __typename?: 'google_protobuf_FileDescriptorSet';
  file?: Maybe<Array<Maybe<Google_Protobuf_FileDescriptorProto>>>;
};

export type Google_Protobuf_FileOptions = {
  __typename?: 'google_protobuf_FileOptions';
  ccEnableArenas?: Maybe<Scalars['Boolean']>;
  ccGenericServices?: Maybe<Scalars['Boolean']>;
  csharpNamespace?: Maybe<Scalars['String']>;
  deprecated?: Maybe<Scalars['Boolean']>;
  goPackage?: Maybe<Scalars['String']>;
  /** @deprecated Field no longer supported */
  javaGenerateEqualsAndHash?: Maybe<Scalars['Boolean']>;
  javaGenericServices?: Maybe<Scalars['Boolean']>;
  javaMultipleFiles?: Maybe<Scalars['Boolean']>;
  javaOuterClassname?: Maybe<Scalars['String']>;
  javaPackage?: Maybe<Scalars['String']>;
  javaStringCheckUtf8?: Maybe<Scalars['Boolean']>;
  objcClassPrefix?: Maybe<Scalars['String']>;
  optimizeFor?: Maybe<Google_Protobuf_FileOptions_OptimizeMode>;
  phpClassPrefix?: Maybe<Scalars['String']>;
  phpGenericServices?: Maybe<Scalars['Boolean']>;
  phpMetadataNamespace?: Maybe<Scalars['String']>;
  phpNamespace?: Maybe<Scalars['String']>;
  pyGenericServices?: Maybe<Scalars['Boolean']>;
  rubyPackage?: Maybe<Scalars['String']>;
  swiftPrefix?: Maybe<Scalars['String']>;
  uninterpretedOption?: Maybe<Array<Maybe<Google_Protobuf_UninterpretedOption>>>;
};

export enum Google_Protobuf_FileOptions_OptimizeMode {
  CodeSize = 'CODE_SIZE',
  LiteRuntime = 'LITE_RUNTIME',
  Speed = 'SPEED'
}

export type Google_Protobuf_GeneratedCodeInfo = {
  __typename?: 'google_protobuf_GeneratedCodeInfo';
  annotation?: Maybe<Array<Maybe<Google_Protobuf_GeneratedCodeInfo_Annotation>>>;
};

export type Google_Protobuf_GeneratedCodeInfo_Annotation = {
  __typename?: 'google_protobuf_GeneratedCodeInfo_Annotation';
  begin?: Maybe<Scalars['Int']>;
  end?: Maybe<Scalars['Int']>;
  path?: Maybe<Array<Maybe<Scalars['Int']>>>;
  sourceFile?: Maybe<Scalars['String']>;
};

export type Google_Protobuf_MessageOptions = {
  __typename?: 'google_protobuf_MessageOptions';
  deprecated?: Maybe<Scalars['Boolean']>;
  mapEntry?: Maybe<Scalars['Boolean']>;
  messageSetWireFormat?: Maybe<Scalars['Boolean']>;
  noStandardDescriptorAccessor?: Maybe<Scalars['Boolean']>;
  uninterpretedOption?: Maybe<Array<Maybe<Google_Protobuf_UninterpretedOption>>>;
};

export type Google_Protobuf_MethodDescriptorProto = {
  __typename?: 'google_protobuf_MethodDescriptorProto';
  clientStreaming?: Maybe<Scalars['Boolean']>;
  inputType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Google_Protobuf_MethodOptions>;
  outputType?: Maybe<Scalars['String']>;
  serverStreaming?: Maybe<Scalars['Boolean']>;
};

export type Google_Protobuf_MethodOptions = {
  __typename?: 'google_protobuf_MethodOptions';
  deprecated?: Maybe<Scalars['Boolean']>;
  idempotencyLevel?: Maybe<Google_Protobuf_MethodOptions_IdempotencyLevel>;
  uninterpretedOption?: Maybe<Array<Maybe<Google_Protobuf_UninterpretedOption>>>;
};

export enum Google_Protobuf_MethodOptions_IdempotencyLevel {
  IdempotencyUnknown = 'IDEMPOTENCY_UNKNOWN',
  Idempotent = 'IDEMPOTENT',
  NoSideEffects = 'NO_SIDE_EFFECTS'
}

export type Google_Protobuf_OneofDescriptorProto = {
  __typename?: 'google_protobuf_OneofDescriptorProto';
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Google_Protobuf_OneofOptions>;
};

export type Google_Protobuf_OneofOptions = {
  __typename?: 'google_protobuf_OneofOptions';
  uninterpretedOption?: Maybe<Array<Maybe<Google_Protobuf_UninterpretedOption>>>;
};

export type Google_Protobuf_ServiceDescriptorProto = {
  __typename?: 'google_protobuf_ServiceDescriptorProto';
  method?: Maybe<Array<Maybe<Google_Protobuf_MethodDescriptorProto>>>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Google_Protobuf_ServiceOptions>;
};

export type Google_Protobuf_ServiceOptions = {
  __typename?: 'google_protobuf_ServiceOptions';
  deprecated?: Maybe<Scalars['Boolean']>;
  uninterpretedOption?: Maybe<Array<Maybe<Google_Protobuf_UninterpretedOption>>>;
};

export type Google_Protobuf_SourceCodeInfo = {
  __typename?: 'google_protobuf_SourceCodeInfo';
  location?: Maybe<Array<Maybe<Google_Protobuf_SourceCodeInfo_Location>>>;
};

export type Google_Protobuf_SourceCodeInfo_Location = {
  __typename?: 'google_protobuf_SourceCodeInfo_Location';
  leadingComments?: Maybe<Scalars['String']>;
  leadingDetachedComments?: Maybe<Array<Maybe<Scalars['String']>>>;
  path?: Maybe<Array<Maybe<Scalars['Int']>>>;
  span?: Maybe<Array<Maybe<Scalars['Int']>>>;
  trailingComments?: Maybe<Scalars['String']>;
};

export type Google_Protobuf_UninterpretedOption = {
  __typename?: 'google_protobuf_UninterpretedOption';
  aggregateValue?: Maybe<Scalars['String']>;
  doubleValue?: Maybe<Scalars['Float']>;
  identifierValue?: Maybe<Scalars['String']>;
  name?: Maybe<Array<Maybe<Google_Protobuf_UninterpretedOption_NamePart>>>;
  negativeIntValue?: Maybe<Scalars['Long']>;
  positiveIntValue?: Maybe<Scalars['Long']>;
  stringValue?: Maybe<Scalars['String']>;
};

export type Google_Protobuf_UninterpretedOption_NamePart = {
  __typename?: 'google_protobuf_UninterpretedOption_NamePart';
  isExtension?: Maybe<Scalars['Boolean']>;
  namePart?: Maybe<Scalars['String']>;
};

export enum Join__Graph {
  Name_0 = 'NAME_0_',
  Name_1 = 'NAME_1_'
}

export type OldToNewVizTuple = {
  __typename?: 'oldToNewVizTuple';
  newVizId?: Maybe<Scalars['String']>;
  oldVizId?: Maybe<Scalars['String']>;
};

export type OrgDetails = {
  __typename?: 'orgDetails';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type OrgInformation = {
  __typename?: 'orgInformation';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export enum OrientationValues {
  Landscape = 'LANDSCAPE',
  Portrait = 'PORTRAIT'
}

export type PdfOptionsInput = {
  /** Footer text to include in the footer of each page of the PDF. */
  footerText?: InputMaybe<Scalars['String']>;
  /** When set to true, a cover page with the Liveboard title is added in the PDF. Default: true */
  includeCoverPage?: InputMaybe<Scalars['Boolean']>;
  /** When set to true, a second page with a list of all applied filters is added in the PDF. Default: true */
  includeFilterPage?: InputMaybe<Scalars['Boolean']>;
  /** Include customized wide logo if available in the footer. Default: true */
  includeLogo?: InputMaybe<Scalars['Boolean']>;
  /** When set to true, the page number is included in the footer of each page. Default: true */
  includePageNumber?: InputMaybe<Scalars['Boolean']>;
  /** Page orientation for the PDF. Default: PORTRAIT */
  orientation?: InputMaybe<OrientationValues>;
  /** When set to true, only the first page of the tables is displayed in the file. \n\n This setting is applicable only when generating report for specific visualization ids. Default: false */
  truncateTables?: InputMaybe<Scalars['Boolean']>;
};

export type Sage_A3AnalysisExplanation = {
  __typename?: 'sage_A3AnalysisExplanation';
  drillExplanation?: Maybe<Array<Maybe<Sage_DrillExplanation>>>;
  totalInsightsShown?: Maybe<Scalars['Long']>;
};

export type Sage_A3InsightExplanation = {
  __typename?: 'sage_A3InsightExplanation';
  analysisDescriptor?: Maybe<Sage_AnalysisDescriptor>;
  drillAttributes?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
  explanation?: Maybe<Scalars['String']>;
  insightFeatures?: Maybe<Array<Maybe<Sage_InsightFeature>>>;
  measures?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
  rating?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Float']>;
  signature?: Maybe<Scalars['String']>;
  vizId?: Maybe<Scalars['String']>;
};

export type Sage_AggregationLevel = {
  __typename?: 'sage_AggregationLevel';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_AggregationLevel_E {
  Aggregate = 'AGGREGATE',
  NonAggregate = 'NON_AGGREGATE'
}

export type Sage_AggregationType = {
  __typename?: 'sage_AggregationType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_AggregationType_E {
  AggregateDistinct = 'AGGREGATE_DISTINCT',
  Average = 'AVERAGE',
  Count = 'COUNT',
  Max = 'MAX',
  Median = 'MEDIAN',
  Min = 'MIN',
  None = 'NONE',
  Percentile = 'PERCENTILE',
  Rank = 'RANK',
  RankPercentile = 'RANK_PERCENTILE',
  StdDeviation = 'STD_DEVIATION',
  Sum = 'SUM',
  UniqueCount = 'UNIQUE_COUNT',
  Variance = 'VARIANCE'
}

export type Sage_AnalysisAlgorithm = {
  __typename?: 'sage_AnalysisAlgorithm';
  absDiffMajority?: Maybe<Sage_AnalysisAlgorithm_AbsDiffMajority>;
  anomalyExplanation?: Maybe<Sage_AnalysisAlgorithm_AnomalyExplanation>;
  crossCorrelation?: Maybe<Sage_AnalysisAlgorithm_CrossCorrelation>;
  dataPoint?: Maybe<Array<Maybe<Sage_AnalysisAlgorithm_DataPoint>>>;
  linearRegression?: Maybe<Sage_AnalysisAlgorithm_LinearRegression>;
  madMedian?: Maybe<Sage_AnalysisAlgorithm_MadMedian>;
  shesd?: Maybe<Sage_AnalysisAlgorithm_SeasonalHybridEsd>;
  stdevMean?: Maybe<Sage_AnalysisAlgorithm_StdevMean>;
  trendAnalysis?: Maybe<Sage_AnalysisAlgorithm_TrendAnalysis>;
  type?: Maybe<Sage_AnalysisAlgorithm_Type>;
};

export type Sage_AnalysisAlgorithm_AbsDiffMajority = {
  __typename?: 'sage_AnalysisAlgorithm_AbsDiffMajority';
  maxDiffElements?: Maybe<Scalars['Long']>;
  maxFraction?: Maybe<Scalars['Float']>;
  minAbsChangeRatio?: Maybe<Scalars['Float']>;
  minChangeRatio?: Maybe<Scalars['Float']>;
};

export type Sage_AnalysisAlgorithm_AnomalyExplanation = {
  __typename?: 'sage_AnalysisAlgorithm_AnomalyExplanation';
  decisionTree?: Maybe<Scalars['String']>;
  maxExplanationColumns?: Maybe<Scalars['Long']>;
  minRows?: Maybe<Scalars['Long']>;
};

export type Sage_AnalysisAlgorithm_CrossCorrelation = {
  __typename?: 'sage_AnalysisAlgorithm_CrossCorrelation';
  corrCoeff?: Maybe<Scalars['Float']>;
  maxCorrCoeff?: Maybe<Scalars['Float']>;
  maxLag?: Maybe<Scalars['Long']>;
  minRows?: Maybe<Scalars['Long']>;
};

export type Sage_AnalysisAlgorithm_DataPoint = {
  __typename?: 'sage_AnalysisAlgorithm_DataPoint';
  anomalyDirection?: Maybe<Sage_AnalysisAlgorithm_DataPoint_AnomalyDirection>;
  attributeValue?: Maybe<Falcon_ConstantValue>;
  measureValue?: Maybe<Scalars['Float']>;
};

export enum Sage_AnalysisAlgorithm_DataPoint_AnomalyDirection {
  High = 'HIGH',
  Low = 'LOW',
  Unknown = 'UNKNOWN'
}

export type Sage_AnalysisAlgorithm_LinearRegression = {
  __typename?: 'sage_AnalysisAlgorithm_LinearRegression';
  minRows?: Maybe<Scalars['Long']>;
  multiplier?: Maybe<Scalars['Float']>;
  pValueThreshold?: Maybe<Scalars['Float']>;
};

export type Sage_AnalysisAlgorithm_MadMedian = {
  __typename?: 'sage_AnalysisAlgorithm_MadMedian';
  median?: Maybe<Scalars['Float']>;
  medianAbsDev?: Maybe<Scalars['Float']>;
  minRows?: Maybe<Scalars['Long']>;
  multiplier?: Maybe<Scalars['Float']>;
};

export type Sage_AnalysisAlgorithm_SeasonalHybridEsd = {
  __typename?: 'sage_AnalysisAlgorithm_SeasonalHybridESD';
  alpha?: Maybe<Scalars['Float']>;
  minRows?: Maybe<Scalars['Long']>;
  multiplier?: Maybe<Scalars['Float']>;
};

export type Sage_AnalysisAlgorithm_StdevMean = {
  __typename?: 'sage_AnalysisAlgorithm_StdevMean';
  mean?: Maybe<Scalars['Float']>;
  minRows?: Maybe<Scalars['Long']>;
  multiplier?: Maybe<Scalars['Float']>;
  stdDev?: Maybe<Scalars['Float']>;
};

export type Sage_AnalysisAlgorithm_TrendAnalysis = {
  __typename?: 'sage_AnalysisAlgorithm_TrendAnalysis';
  linearRegression?: Maybe<Sage_AnalysisAlgorithm_LinearRegression>;
  minAbsGradientRadThreshold?: Maybe<Scalars['Float']>;
  minRelativeDifference?: Maybe<Scalars['Float']>;
  minRows?: Maybe<Scalars['Long']>;
  pValue?: Maybe<Scalars['Float']>;
  percentPoints?: Maybe<Scalars['Float']>;
  relativeDifference?: Maybe<Scalars['Float']>;
  slope?: Maybe<Scalars['Float']>;
};

export enum Sage_AnalysisAlgorithm_Type {
  AbsDiffMajority = 'ABS_DIFF_MAJORITY',
  AnomalyExplanation = 'ANOMALY_EXPLANATION',
  CrossCorrelation = 'CROSS_CORRELATION',
  LinearRegression = 'LINEAR_REGRESSION',
  MadMedian = 'MAD_MEDIAN',
  Shesd = 'SHESD',
  StdevMean = 'STDEV_MEAN',
  TrendAnalysis = 'TREND_ANALYSIS'
}

export type Sage_AnalysisDescriptor = {
  __typename?: 'sage_AnalysisDescriptor';
  analysisClass?: Maybe<Sage_AnalysisDescriptor_AnalysisClass>;
  anomalyExplanation?: Maybe<Sage_AnalysisDescriptor_AnomalyExplanation>;
  crossCorrelation?: Maybe<Sage_AnalysisDescriptor_CrossCorrelation>;
  customRAnalysis?: Maybe<Sage_AnalysisDescriptor_CustomRAnalysis>;
  diffExplanation?: Maybe<Sage_AnalysisDescriptor_DiffExplanation>;
  outlierDetection?: Maybe<Sage_AnalysisDescriptor_OutlierDetection>;
  trendAnalysis?: Maybe<Sage_AnalysisDescriptor_TrendAnalysis>;
};

export enum Sage_AnalysisDescriptor_AnalysisClass {
  AnomalyExplanation = 'ANOMALY_EXPLANATION',
  CrossCorrelation = 'CROSS_CORRELATION',
  CustomRAnalysis = 'CUSTOM_R_ANALYSIS',
  DiffExplanation = 'DIFF_EXPLANATION',
  OutlierDetection = 'OUTLIER_DETECTION',
  TrendAnalysis = 'TREND_ANALYSIS'
}

export type Sage_AnalysisDescriptor_AnomalyExplanation = {
  __typename?: 'sage_AnalysisDescriptor_AnomalyExplanation';
  algorithm?: Maybe<Sage_AnalysisAlgorithm>;
  columnBinding?: Maybe<Array<Maybe<Sage_AnalysisDescriptor_CustomRAnalysis_ColumnBinding>>>;
};

export type Sage_AnalysisDescriptor_CrossCorrelation = {
  __typename?: 'sage_AnalysisDescriptor_CrossCorrelation';
  algorithm?: Maybe<Sage_AnalysisAlgorithm>;
};

export type Sage_AnalysisDescriptor_CustomRAnalysis = {
  __typename?: 'sage_AnalysisDescriptor_CustomRAnalysis';
  columnBinding?: Maybe<Array<Maybe<Sage_AnalysisDescriptor_CustomRAnalysis_ColumnBinding>>>;
  rOutputType?: Maybe<Sage_AnalysisDescriptor_CustomRAnalysis_ROutputType>;
  rScript?: Maybe<Scalars['String']>;
  rTemplateId?: Maybe<Scalars['String']>;
  unselectedSageOutputColumnId?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Sage_AnalysisDescriptor_CustomRAnalysis_ColumnBinding = {
  __typename?: 'sage_AnalysisDescriptor_CustomRAnalysis_ColumnBinding';
  columnName?: Maybe<Scalars['String']>;
  sageOutputColumnId?: Maybe<Scalars['String']>;
  variableName?: Maybe<Scalars['String']>;
};

export enum Sage_AnalysisDescriptor_CustomRAnalysis_ROutputType {
  Csv = 'CSV',
  Error = 'ERROR',
  Png = 'PNG'
}

export type Sage_AnalysisDescriptor_DiffExplanation = {
  __typename?: 'sage_AnalysisDescriptor_DiffExplanation';
  algorithm?: Maybe<Sage_AnalysisAlgorithm>;
};

export type Sage_AnalysisDescriptor_OutlierDetection = {
  __typename?: 'sage_AnalysisDescriptor_OutlierDetection';
  algorithm?: Maybe<Sage_AnalysisAlgorithm>;
};

export type Sage_AnalysisDescriptor_TrendAnalysis = {
  __typename?: 'sage_AnalysisDescriptor_TrendAnalysis';
  algorithm?: Maybe<Sage_AnalysisAlgorithm>;
};

export type Sage_AnalysisParam = {
  __typename?: 'sage_AnalysisParam';
  analysisDescriptor?: Maybe<Array<Maybe<Sage_AnalysisDescriptor>>>;
  autotuneDateBoundary?: Maybe<Scalars['Boolean']>;
  excludeNull?: Maybe<Scalars['Boolean']>;
  excludeZeroMeasure?: Maybe<Scalars['Boolean']>;
  highlightBestValue?: Maybe<Scalars['Boolean']>;
  maxFalconQueries?: Maybe<Scalars['Long']>;
  maxFalconResponseRows?: Maybe<Scalars['Long']>;
  maxInsightsOpts?: Maybe<Sage_MaxInsightOptions>;
  resourceOpts?: Maybe<Sage_ResourceOptions>;
};

export type Sage_BooleanTypeProto = {
  __typename?: 'sage_BooleanTypeProto';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_BooleanTypeProto_E {
  And = 'AND',
  Default = 'DEFAULT',
  Or = 'OR'
}

export type Sage_BuildReason = {
  __typename?: 'sage_BuildReason';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_BuildReason_E {
  DataVersionForceUpdated = 'DATA_VERSION_FORCE_UPDATED',
  FalconConfigUpdated = 'FALCON_CONFIG_UPDATED',
  Forced = 'FORCED',
  GetSampleTokensFailed = 'GET_SAMPLE_TOKENS_FAILED',
  MetadataServingColumnsChanged = 'METADATA_SERVING_COLUMNS_CHANGED',
  MetadataServingGroupsChanged = 'METADATA_SERVING_GROUPS_CHANGED',
  MetadataServingUsersChanged = 'METADATA_SERVING_USERS_CHANGED',
  PinSageBuildingFailed = 'PIN_SAGE_BUILDING_FAILED',
  PinSageBuildingInvalidFuture = 'PIN_SAGE_BUILDING_INVALID_FUTURE',
  PinSageServingFailed = 'PIN_SAGE_SERVING_FAILED',
  SampleTokenStreamScheduleFailed = 'SAMPLE_TOKEN_STREAM_SCHEDULE_FAILED',
  SampleTokenStreamSetupFailed = 'SAMPLE_TOKEN_STREAM_SETUP_FAILED',
  SamplingFailed = 'SAMPLING_FAILED',
  TableAssignmentChanged = 'TABLE_ASSIGNMENT_CHANGED',
  TokenStreamScheduleFailed = 'TOKEN_STREAM_SCHEDULE_FAILED',
  TokenStreamSetupFailed = 'TOKEN_STREAM_SETUP_FAILED',
  Unknown = 'UNKNOWN',
  UpdateFailed = 'UPDATE_FAILED'
}

export type Sage_Column = {
  __typename?: 'sage_Column';
  id?: Maybe<Sage_EntityHeader>;
  joinPaths?: Maybe<Array<Maybe<Sage_JoinPathProto>>>;
  schemaTableId?: Maybe<Scalars['Int']>;
  table?: Maybe<Sage_EntityHeader>;
};

export type Sage_ColumnIndexSkipReason = {
  __typename?: 'sage_ColumnIndexSkipReason';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_ColumnIndexSkipReason_E {
  SkipCantCreateQuery = 'SKIP_CANT_CREATE_QUERY',
  SkipDataIndexDisabled = 'SKIP_DATA_INDEX_DISABLED',
  SkipDate = 'SKIP_DATE',
  SkipDbViewTable = 'SKIP_DB_VIEW_TABLE',
  SkipDontIndex = 'SKIP_DONT_INDEX',
  SkipEmptyQueries = 'SKIP_EMPTY_QUERIES',
  SkipExceededDefaultMaxSize = 'SKIP_EXCEEDED_DEFAULT_MAX_SIZE',
  SkipExceededExtDsDefaultMaxSize = 'SKIP_EXCEEDED_EXT_DS_DEFAULT_MAX_SIZE',
  SkipExceededExtDsGlobalMaxSize = 'SKIP_EXCEEDED_EXT_DS_GLOBAL_MAX_SIZE',
  SkipExceededGlobalMaxSize = 'SKIP_EXCEEDED_GLOBAL_MAX_SIZE',
  SkipExternalDsDataIndexDisabled = 'SKIP_EXTERNAL_DS_DATA_INDEX_DISABLED',
  SkipFormulaColumnNotIndexable = 'SKIP_FORMULA_COLUMN_NOT_INDEXABLE',
  SkipFormulaIndexingDisabled = 'SKIP_FORMULA_INDEXING_DISABLED',
  SkipHiddenColumn = 'SKIP_HIDDEN_COLUMN',
  SkipIndexingDisabledOnTable = 'SKIP_INDEXING_DISABLED_ON_TABLE',
  SkipInternalStatsTable = 'SKIP_INTERNAL_STATS_TABLE',
  SkipInvalidFalconRequest = 'SKIP_INVALID_FALCON_REQUEST',
  SkipLowRelevance = 'SKIP_LOW_RELEVANCE',
  SkipMapped = 'SKIP_MAPPED',
  SkipNone = 'SKIP_NONE',
  SkipNonActiveUser = 'SKIP_NON_ACTIVE_USER',
  SkipNotAttribute = 'SKIP_NOT_ATTRIBUTE',
  SkipNoData = 'SKIP_NO_DATA',
  SkipSamplingFailed = 'SKIP_SAMPLING_FAILED',
  SkipSetupTokenStreamFailed = 'SKIP_SETUP_TOKEN_STREAM_FAILED',
  SkipUnknownTier = 'SKIP_UNKNOWN_TIER'
}

export type Sage_ColumnIndexSourceType = {
  __typename?: 'sage_ColumnIndexSourceType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_ColumnIndexSourceType_E {
  FalconQuery = 'FALCON_QUERY',
  InlineValues = 'INLINE_VALUES',
  RlsAwareExternalQuery = 'RLS_AWARE_EXTERNAL_QUERY',
  RlsAwareFalconQuery = 'RLS_AWARE_FALCON_QUERY'
}

export type Sage_ColumnIndexType = {
  __typename?: 'sage_ColumnIndexType';
  _?: Maybe<Scalars['String']>;
};

export type Sage_ColumnIndexTypeReason = {
  __typename?: 'sage_ColumnIndexTypeReason';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_ColumnIndexTypeReason_E {
  DataScore = 'DATA_SCORE',
  EntityDetected = 'ENTITY_DETECTED',
  ExceededMaxDefaultCardinality = 'EXCEEDED_MAX_DEFAULT_CARDINALITY',
  ExceededMaxGlobalCardinality = 'EXCEEDED_MAX_GLOBAL_CARDINALITY',
  ExceededMaxLongTokens = 'EXCEEDED_MAX_LONG_TOKENS',
  FalconDataTypeNotChar = 'FALCON_DATA_TYPE_NOT_CHAR',
  IgnoreRelevance = 'IGNORE_RELEVANCE',
  User = 'USER'
}

export enum Sage_ColumnIndexType_E {
  Default = 'DEFAULT',
  DontIndex = 'DONT_INDEX',
  PrefixAndSubstring = 'PREFIX_AND_SUBSTRING',
  PrefixAndWordSubstring = 'PREFIX_AND_WORD_SUBSTRING',
  PrefixOnly = 'PREFIX_ONLY'
}

export type Sage_ColumnType = {
  __typename?: 'sage_ColumnType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_ColumnType_E {
  Attribute = 'ATTRIBUTE',
  Measure = 'MEASURE',
  Unknown = 'UNKNOWN'
}

export type Sage_CompareTypeProto = {
  __typename?: 'sage_CompareTypeProto';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_CompareTypeProto_E {
  BeginsWith = 'BEGINS_WITH',
  Bw = 'BW',
  BwInc = 'BW_INC',
  BwIncMax = 'BW_INC_MAX',
  BwIncMin = 'BW_INC_MIN',
  Contains = 'CONTAINS',
  EndsWith = 'ENDS_WITH',
  Eq = 'EQ',
  Ge = 'GE',
  Gt = 'GT',
  In = 'IN',
  Le = 'LE',
  Like = 'LIKE',
  Lt = 'LT',
  Ne = 'NE'
}

export type Sage_DateFilterProto = {
  __typename?: 'sage_DateFilterProto';
  datePeriod?: Maybe<Sage_DateFilterProto_DatePeriod>;
  dateRange?: Maybe<Sage_DateFilterProto_DateRange>;
  epoch?: Maybe<Scalars['Long']>;
  forEachPeriod?: Maybe<Sage_DateFilterProto_DatePeriod>;
  month?: Maybe<Sage_DateFilterProto_Month>;
  monthName?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  op?: Maybe<Sage_CompareTypeProto_E>;
  quarter?: Maybe<Sage_DateFilterProto_Quarter>;
  quarterName?: Maybe<Scalars['String']>;
  type?: Maybe<Sage_DateFilterProto_DateFilterType>;
  weekDay?: Maybe<Sage_DateFilterProto_WeekDay>;
  weekDayName?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
  yearName?: Maybe<Scalars['String']>;
};

export enum Sage_DateFilterProto_DateFilterType {
  ExactDate = 'EXACT_DATE',
  ExactDateRange = 'EXACT_DATE_RANGE',
  ExactDateTime = 'EXACT_DATE_TIME',
  ExactTime = 'EXACT_TIME',
  LastNPeriod = 'LAST_N_PERIOD',
  LastPeriod = 'LAST_PERIOD',
  MonthOnly = 'MONTH_ONLY',
  MonthYear = 'MONTH_YEAR',
  NextNPeriod = 'NEXT_N_PERIOD',
  NextPeriod = 'NEXT_PERIOD',
  Now = 'NOW',
  NumDateFilters = 'NUM_DATE_FILTERS',
  NPeriodAgo = 'N_PERIOD_AGO',
  PeriodOnly = 'PERIOD_ONLY',
  PeriodToDate = 'PERIOD_TO_DATE',
  QuarterOnly = 'QUARTER_ONLY',
  QuarterYear = 'QUARTER_YEAR',
  ThisPeriod = 'THIS_PERIOD',
  Today = 'TODAY',
  Tomorrow = 'TOMORROW',
  WeekdayOnly = 'WEEKDAY_ONLY',
  YearOnly = 'YEAR_ONLY',
  Yesterday = 'YESTERDAY'
}

export enum Sage_DateFilterProto_DatePeriod {
  Day = 'DAY',
  Hour = 'HOUR',
  Minute = 'MINUTE',
  Month = 'MONTH',
  NumDatePeriods = 'NUM_DATE_PERIODS',
  Quarter = 'QUARTER',
  Second = 'SECOND',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type Sage_DateFilterProto_DateRange = {
  __typename?: 'sage_DateFilterProto_DateRange';
  highEpoch?: Maybe<Scalars['Long']>;
  lowEpoch?: Maybe<Scalars['Long']>;
};

export enum Sage_DateFilterProto_Month {
  April = 'APRIL',
  August = 'AUGUST',
  December = 'DECEMBER',
  February = 'FEBRUARY',
  January = 'JANUARY',
  July = 'JULY',
  June = 'JUNE',
  March = 'MARCH',
  May = 'MAY',
  November = 'NOVEMBER',
  NumMonths = 'NUM_MONTHS',
  October = 'OCTOBER',
  September = 'SEPTEMBER'
}

export enum Sage_DateFilterProto_Quarter {
  NumQuarters = 'NUM_QUARTERS',
  Q1 = 'Q1',
  Q2 = 'Q2',
  Q3 = 'Q3',
  Q4 = 'Q4'
}

export enum Sage_DateFilterProto_WeekDay {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  NumWeekDays = 'NUM_WEEK_DAYS',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type Sage_DrillExplanation = {
  __typename?: 'sage_DrillExplanation';
  attribute?: Maybe<Sage_Auto_Complete_V2_RecognizedToken>;
  measure?: Maybe<Sage_Auto_Complete_V2_RecognizedToken>;
  totalGroupsAnalyzed?: Maybe<Scalars['Long']>;
  totalInsightsGenerated?: Maybe<Scalars['Long']>;
  totalInsightsShown?: Maybe<Scalars['Long']>;
};

export type Sage_EntityCategory = {
  __typename?: 'sage_EntityCategory';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_EntityCategory_E {
  CompanyOrg = 'COMPANY_ORG',
  Default = 'DEFAULT',
  LatLong = 'LAT_LONG',
  Money = 'MONEY',
  NumTypes = 'NUM_TYPES',
  Person = 'PERSON',
  Place = 'PLACE',
  Product = 'PRODUCT',
  Time = 'TIME',
  ZipCode = 'ZIP_CODE'
}

export type Sage_EntityHeader = {
  __typename?: 'sage_EntityHeader';
  created?: Maybe<Scalars['Long']>;
  description?: Maybe<Scalars['String']>;
  guid?: Maybe<Scalars['String']>;
  indexVersion?: Maybe<Scalars['Long']>;
  modified?: Maybe<Scalars['Long']>;
  name?: Maybe<Scalars['String']>;
};

export type Sage_FeatureScore = {
  __typename?: 'sage_FeatureScore';
  contribution?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
};

export type Sage_FeedbackScore = {
  __typename?: 'sage_FeedbackScore';
  negativeScore?: Maybe<Scalars['Float']>;
  positiveScore?: Maybe<Scalars['Float']>;
};

export type Sage_FeedbackType = {
  __typename?: 'sage_FeedbackType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_FeedbackType_E {
  Association = 'ASSOCIATION',
  NumTypes = 'NUM_TYPES',
  Synonym = 'SYNONYM'
}

export type Sage_I18nGroup = {
  __typename?: 'sage_I18nGroup';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_I18nGroup_E {
  DateFilter = 'DATE_FILTER',
  DayOfWeek = 'DAY_OF_WEEK',
  Month = 'MONTH',
  None = 'NONE',
  Quarter = 'QUARTER'
}

export type Sage_IndexCategory = {
  __typename?: 'sage_IndexCategory';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_IndexCategory_E {
  Global = 'GLOBAL',
  NumCategory = 'NUM_CATEGORY',
  Personal = 'PERSONAL'
}

export type Sage_IndexSourceType = {
  __typename?: 'sage_IndexSourceType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_IndexSourceType_E {
  ExternalDs = 'EXTERNAL_DS',
  Falcon = 'FALCON',
  Metadata = 'METADATA',
  Unknown = 'UNKNOWN',
  Usage = 'USAGE'
}

export type Sage_IndexType = {
  __typename?: 'sage_IndexType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_IndexType_E {
  Data = 'DATA',
  Metadata = 'METADATA'
}

export type Sage_InsightFeature = {
  __typename?: 'sage_InsightFeature';
  anomalousPoint?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Sage_EntityHeader>;
  id?: Maybe<Scalars['String']>;
  isPresentInOriginalQuery?: Maybe<Scalars['Boolean']>;
  sageProgram?: Maybe<Sage_Auto_Complete_V2_SageProgram>;
  type?: Maybe<Sage_InsightFeature_Type>;
};

export enum Sage_InsightFeature_Type {
  AllAnomaliesObvious = 'ALL_ANOMALIES_OBVIOUS',
  AllChangesExpected = 'ALL_CHANGES_EXPECTED',
  AnomalousPointUninteresting = 'ANOMALOUS_POINT_UNINTERESTING',
  AttributeColumnUninteresting = 'ATTRIBUTE_COLUMN_UNINTERESTING',
  AttributeFilterCombinationUninteresting = 'ATTRIBUTE_FILTER_COMBINATION_UNINTERESTING',
  BetterDateBucket = 'BETTER_DATE_BUCKET',
  CorrelationObvious = 'CORRELATION_OBVIOUS',
  DataSourceUninteresting = 'DATA_SOURCE_UNINTERESTING',
  DiffExpected = 'DIFF_EXPECTED',
  DiffValueUninteresting = 'DIFF_VALUE_UNINTERESTING',
  FilterColumnUninteresting = 'FILTER_COLUMN_UNINTERESTING',
  MeasureColumnUninteresting = 'MEASURE_COLUMN_UNINTERESTING',
  MeasureFilterCombinationObvious = 'MEASURE_FILTER_COMBINATION_OBVIOUS',
  TrendBetterDateAttribute = 'TREND_BETTER_DATE_ATTRIBUTE',
  TrendObvious = 'TREND_OBVIOUS'
}

export type Sage_JoinPathProto = {
  __typename?: 'sage_JoinPathProto';
  id?: Maybe<Sage_EntityHeader>;
  isConnected?: Maybe<Scalars['Boolean']>;
  join?: Maybe<Array<Maybe<Sage_JoinProto>>>;
  /** @deprecated Field no longer supported */
  joins?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
  leafTable?: Maybe<Sage_EntityHeader>;
  rootTable?: Maybe<Sage_EntityHeader>;
};

export type Sage_JoinProto = {
  __typename?: 'sage_JoinProto';
  destColumn?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
  destination?: Maybe<Sage_EntityHeader>;
  id?: Maybe<Sage_EntityHeader>;
  joinNulls?: Maybe<Scalars['Boolean']>;
  joinType?: Maybe<Sage_JoinProto_JoinType>;
  oneToOne?: Maybe<Scalars['Boolean']>;
  source?: Maybe<Sage_EntityHeader>;
  sourceColumn?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
};

export enum Sage_JoinProto_JoinType {
  Cross = 'CROSS',
  FullOuter = 'FULL_OUTER',
  Inner = 'INNER',
  LeftOuter = 'LEFT_OUTER',
  RightOuter = 'RIGHT_OUTER'
}

export type Sage_KeyType = {
  __typename?: 'sage_KeyType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_KeyType_E {
  DelimiterNormalized = 'DELIMITER_NORMALIZED',
  Morphed = 'MORPHED',
  Stemmed = 'STEMMED',
  Undefined = 'UNDEFINED',
  Unstemmed = 'UNSTEMMED'
}

export type Sage_LogicalTableType = {
  __typename?: 'sage_LogicalTableType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_LogicalTableType_E {
  NumTypes = 'NUM_TYPES',
  OneToOne = 'ONE_TO_ONE',
  UserTable = 'USER_TABLE',
  Worksheet = 'WORKSHEET'
}

export type Sage_MatchScore = {
  __typename?: 'sage_MatchScore';
  featureScore?: Maybe<Array<Maybe<Sage_FeatureScore>>>;
};

export type Sage_MatchType = {
  __typename?: 'sage_MatchType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_MatchType_E {
  Approximate = 'APPROXIMATE',
  ApproximatePrefix = 'APPROXIMATE_PREFIX',
  ApproximateWordPrefix = 'APPROXIMATE_WORD_PREFIX',
  Exact = 'EXACT',
  ExactStemmed = 'EXACT_STEMMED',
  PartialSubstring = 'PARTIAL_SUBSTRING',
  Prefix = 'PREFIX',
  Substring = 'SUBSTRING',
  Suffix = 'SUFFIX',
  Undefined = 'UNDEFINED',
  WordPrefix = 'WORD_PREFIX'
}

export type Sage_MatchedToken = {
  __typename?: 'sage_MatchedToken';
  autoGeneratedSynonym?: Maybe<Scalars['Boolean']>;
  cardinalityScore?: Maybe<Scalars['Float']>;
  debugString?: Maybe<Scalars['String']>;
  keyType?: Maybe<Sage_KeyType_E>;
  matchType?: Maybe<Sage_MatchType_E>;
  synonymSource?: Maybe<Sage_SynonymSource_E>;
  token?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  usageFrequency?: Maybe<Scalars['Int']>;
  usageScore?: Maybe<Scalars['Float']>;
  usageScoreDetail?: Maybe<Array<Maybe<Sage_MatchedToken_UsageScoreDetail>>>;
  weight?: Maybe<Scalars['Float']>;
};

export type Sage_MatchedToken_UsageScoreDetail = {
  __typename?: 'sage_MatchedToken_UsageScoreDetail';
  boost?: Maybe<Scalars['Float']>;
  columnGuid?: Maybe<Array<Maybe<Scalars['String']>>>;
  contextId?: Maybe<Scalars['String']>;
  feature?: Maybe<Scalars['String']>;
  featureType?: Maybe<Scalars['String']>;
  featureUsageFrequency?: Maybe<Scalars['Float']>;
  featureWeight?: Maybe<Scalars['Float']>;
  groupId?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Sage_MaxInsightOptions = {
  __typename?: 'sage_MaxInsightOptions';
  /** @deprecated Field no longer supported */
  boostDateColumns?: Maybe<Scalars['Boolean']>;
  crossCorrelationAllPairs?: Maybe<Scalars['Boolean']>;
  maxAnomalies?: Maybe<Scalars['Int']>;
  maxAnomalyExplanationInsights?: Maybe<Scalars['Int']>;
  maxCrossCorrelationDateColumns?: Maybe<Scalars['Int']>;
  maxCrossCorrelationInsights?: Maybe<Scalars['Int']>;
  maxDateColumns?: Maybe<Scalars['Int']>;
  maxDrillAttributes?: Maybe<Scalars['Int']>;
  maxLrAnomalies?: Maybe<Scalars['Int']>;
  maxMeasures?: Maybe<Scalars['Int']>;
  maxShesdAnomalies?: Maybe<Scalars['Int']>;
  maxTrends?: Maybe<Scalars['Int']>;
  simpleChangeDistribution?: Maybe<Scalars['Boolean']>;
};

export type Sage_NlPhraseTemplate = {
  __typename?: 'sage_NLPhraseTemplate';
  token?: Maybe<Array<Maybe<Sage_NlToken>>>;
};

export type Sage_NlQueryClassificationInfo = {
  __typename?: 'sage_NLQueryClassificationInfo';
  confidenceScore?: Maybe<Scalars['Float']>;
  queryComplexity?: Maybe<Sage_NlQueryComplexity_E>;
};

export type Sage_NlQueryComplexity = {
  __typename?: 'sage_NLQueryComplexity';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_NlQueryComplexity_E {
  Complex = 'COMPLEX',
  Simple = 'SIMPLE',
  Unknown = 'UNKNOWN'
}

export type Sage_NlTemplate = {
  __typename?: 'sage_NLTemplate';
  description?: Maybe<Scalars['String']>;
  phraseTemplate?: Maybe<Array<Maybe<Sage_NlPhraseTemplate>>>;
};

export type Sage_NlTemplatePair = {
  __typename?: 'sage_NLTemplatePair';
  name?: Maybe<Scalars['String']>;
  template?: Maybe<Sage_NlTemplate>;
};

export type Sage_NlTemplates = {
  __typename?: 'sage_NLTemplates';
  templatePair?: Maybe<Array<Maybe<Sage_NlTemplate>>>;
};

export type Sage_NlToken = {
  __typename?: 'sage_NLToken';
  metadata?: Maybe<Sage_NlTokenMetadata>;
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Sage_NlTokenType_E>;
};

export type Sage_NlTokenMetadata = {
  __typename?: 'sage_NLTokenMetadata';
  canonicalName?: Maybe<Scalars['String']>;
  table?: Maybe<Sage_EntityHeader>;
};

export type Sage_NlTokenType = {
  __typename?: 'sage_NLTokenType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_NlTokenType_E {
  Aggregate = 'AGGREGATE',
  Attribute = 'ATTRIBUTE',
  Filter = 'FILTER',
  Keyword = 'KEYWORD',
  Measure = 'MEASURE',
  NumTypes = 'NUM_TYPES'
}

export type Sage_PhraseType = {
  __typename?: 'sage_PhraseType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_PhraseType_E {
  AggregatedAttributeValuePhrase = 'AGGREGATED_ATTRIBUTE_VALUE_PHRASE',
  AggregatedColumnPhrase = 'AGGREGATED_COLUMN_PHRASE',
  Begin = 'BEGIN',
  CalendarPhrase = 'CALENDAR_PHRASE',
  DelimiterPhrase = 'DELIMITER_PHRASE',
  End = 'END',
  FilteredCountPhrase = 'FILTERED_COUNT_PHRASE',
  FilterPhrase = 'FILTER_PHRASE',
  FormulaPhrase = 'FORMULA_PHRASE',
  ForEachPhrase = 'FOR_EACH_PHRASE',
  GeofilterPhrase = 'GEOFILTER_PHRASE',
  GroupByColumnPhrase = 'GROUP_BY_COLUMN_PHRASE',
  GrowthPhrase = 'GROWTH_PHRASE',
  HavingPhrase = 'HAVING_PHRASE',
  InFilterPhrase = 'IN_FILTER_PHRASE',
  InFilterSubqueryPhrase = 'IN_FILTER_SUBQUERY_PHRASE',
  OfPhrase = 'OF_PHRASE',
  PercentageOfPhrase = 'PERCENTAGE_OF_PHRASE',
  PivotPhrase = 'PIVOT_PHRASE',
  ShowColumnPhrase = 'SHOW_COLUMN_PHRASE',
  SkipTokenPhrase = 'SKIP_TOKEN_PHRASE',
  SortByPhrase = 'SORT_BY_PHRASE',
  StopWordPhrase = 'STOP_WORD_PHRASE',
  TopBottomFilterPhrase = 'TOP_BOTTOM_FILTER_PHRASE',
  TopBottomPhrase = 'TOP_BOTTOM_PHRASE',
  UndefinedPhrase = 'UNDEFINED_PHRASE',
  VersusPhrase = 'VERSUS_PHRASE',
  VersusSubqueryPhrase = 'VERSUS_SUBQUERY_PHRASE'
}

export type Sage_PhysicalTableType = {
  __typename?: 'sage_PhysicalTableType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_PhysicalTableType_E {
  NumTypes = 'NUM_TYPES',
  Statsdb = 'STATSDB',
  System = 'SYSTEM',
  User = 'USER'
}

export type Sage_ProviderType = {
  __typename?: 'sage_ProviderType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_ProviderType_E {
  AdminViaCli = 'ADMIN_VIA_CLI',
  EnliteRewriters = 'ENLITE_REWRITERS',
  NumTypes = 'NUM_TYPES',
  UserViaFrontEnd = 'USER_VIA_FRONT_END'
}

export type Sage_RequestType = {
  __typename?: 'sage_RequestType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_RequestType_E {
  Classic = 'CLASSIC',
  Enlite = 'ENLITE'
}

export type Sage_ResourceOptions = {
  __typename?: 'sage_ResourceOptions';
  queryTimeout?: Maybe<Scalars['Int']>;
};

export type Sage_SageExpression = {
  __typename?: 'sage_SageExpression';
  column?: Maybe<Sage_Column>;
  constant?: Maybe<Sage_SageExpression_Constant>;
  dataType?: Maybe<Falcon_DataType_E>;
  exprClass?: Maybe<Sage_SageExpression_ExpressionClass>;
  exprRef?: Maybe<Sage_SageExpression_ExpressionRef>;
  formatingType?: Maybe<Common_FormatingType_E>;
  function?: Maybe<Sage_SageExpression_Function>;
  variable?: Maybe<Sage_SageExpression_Variable>;
  variableName?: Maybe<Scalars['String']>;
};

export type Sage_SageExpressionInternal = {
  __typename?: 'sage_SageExpressionInternal';
  columnType?: Maybe<Sage_ColumnType_E>;
};

export type Sage_SageExpression_Constant = {
  __typename?: 'sage_SageExpression_Constant';
  boolValue?: Maybe<Scalars['Boolean']>;
  dateEpochValue?: Maybe<Scalars['Long']>;
  doubleValue?: Maybe<Scalars['Float']>;
  intValue?: Maybe<Scalars['Long']>;
  isNull?: Maybe<Scalars['Boolean']>;
  normalize?: Maybe<Scalars['Boolean']>;
  strValue?: Maybe<Scalars['String']>;
};

export enum Sage_SageExpression_ExpressionClass {
  ExprColumn = 'EXPR_COLUMN',
  ExprConstant = 'EXPR_CONSTANT',
  ExprFunction = 'EXPR_FUNCTION',
  ExprVariable = 'EXPR_VARIABLE'
}

export type Sage_SageExpression_ExpressionRef = {
  __typename?: 'sage_SageExpression_ExpressionRef';
  refId?: Maybe<Sage_EntityHeader>;
};

export type Sage_SageExpression_Function = {
  __typename?: 'sage_SageExpression_Function';
  arguments?: Maybe<Array<Maybe<Sage_SageExpression>>>;
  hasVarargs?: Maybe<Scalars['Boolean']>;
  isAggregate?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type Sage_SageExpression_Variable = {
  __typename?: 'sage_SageExpression_Variable';
  id?: Maybe<Sage_EntityHeader>;
  isDefault?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Sage_SageExpression>;
};

export type Sage_SparseBitmapProto = {
  __typename?: 'sage_SparseBitmapProto';
  /** @deprecated Field no longer supported */
  base?: Maybe<Scalars['Int']>;
  data?: Maybe<Scalars['String']>;
  /** @deprecated Field no longer supported */
  size?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  version?: Maybe<Sage_SparseBitmapProto_Version>;
};

export enum Sage_SparseBitmapProto_Version {
  V1 = 'V1',
  V2 = 'V2',
  V3 = 'V3'
}

export type Sage_SynonymProto = {
  __typename?: 'sage_SynonymProto';
  name?: Maybe<Scalars['String']>;
  permittedUsers?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
};

export type Sage_SynonymSource = {
  __typename?: 'sage_SynonymSource';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_SynonymSource_E {
  AutoGenerated = 'AUTO_GENERATED',
  NlSynonymDictionary = 'NL_SYNONYM_DICTIONARY',
  SynonymDictionary = 'SYNONYM_DICTIONARY',
  Unknown = 'UNKNOWN',
  UserDefined = 'USER_DEFINED',
  Wordnet = 'WORDNET'
}

export type Sage_TimeBucket = {
  __typename?: 'sage_TimeBucket';
  _?: Maybe<Scalars['String']>;
};

export type Sage_TimeBucketQualifierProto = {
  __typename?: 'sage_TimeBucketQualifierProto';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_TimeBucketQualifierProto_E {
  DayOverDay = 'DAY_OVER_DAY',
  MonthOverMonth = 'MONTH_OVER_MONTH',
  None = 'NONE',
  QuarterOverQuarter = 'QUARTER_OVER_QUARTER',
  WeekOverWeek = 'WEEK_OVER_WEEK',
  YearOverYear = 'YEAR_OVER_YEAR'
}

export enum Sage_TimeBucket_E {
  Auto = 'AUTO',
  Daily = 'DAILY',
  DayOfMonth = 'DAY_OF_MONTH',
  DayOfQuarter = 'DAY_OF_QUARTER',
  DayOfWeek = 'DAY_OF_WEEK',
  DayOfYear = 'DAY_OF_YEAR',
  Hourly = 'HOURLY',
  HourOfDay = 'HOUR_OF_DAY',
  Monthly = 'MONTHLY',
  MonthOfQuarter = 'MONTH_OF_QUARTER',
  MonthOfYear = 'MONTH_OF_YEAR',
  NoBucket = 'NO_BUCKET',
  Quarterly = 'QUARTERLY',
  QuarterOfYear = 'QUARTER_OF_YEAR',
  Weekly = 'WEEKLY',
  WeekOfMonth = 'WEEK_OF_MONTH',
  WeekOfQuarter = 'WEEK_OF_QUARTER',
  WeekOfYear = 'WEEK_OF_YEAR',
  Yearly = 'YEARLY'
}

export type Sage_TokenType = {
  __typename?: 'sage_TokenType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_TokenType_E {
  Any = 'ANY',
  Attribute = 'ATTRIBUTE',
  Bool = 'BOOL',
  Calendar = 'CALENDAR',
  Constant = 'CONSTANT',
  Date = 'DATE',
  DateBucket = 'DATE_BUCKET',
  Delimiter = 'DELIMITER',
  Double = 'DOUBLE',
  EndFsm = 'END_FSM',
  Formula = 'FORMULA',
  FunctionName = 'FUNCTION_NAME',
  IncludeFsm = 'INCLUDE_FSM',
  Integer = 'INTEGER',
  Keyword = 'KEYWORD',
  MaxType = 'MAX_TYPE',
  Measure = 'MEASURE',
  NamedPhrase = 'NAMED_PHRASE',
  Operator = 'OPERATOR',
  Parameter = 'PARAMETER',
  PositiveInt = 'POSITIVE_INT',
  PrefixValue = 'PREFIX_VALUE',
  SkipToken = 'SKIP_TOKEN',
  StopWord = 'STOP_WORD',
  String = 'STRING',
  SubstringValue = 'SUBSTRING_VALUE',
  SuffixValue = 'SUFFIX_VALUE',
  TemplateArg = 'TEMPLATE_ARG',
  Time = 'TIME',
  Unrecognized = 'UNRECOGNIZED',
  Value = 'VALUE',
  Year = 'YEAR'
}

export type Sage_Auto_Complete_V2_AcChosenColumn = {
  __typename?: 'sage_auto_complete_v2_ACChosenColumn';
  chosenIdx?: Maybe<Scalars['Int']>;
  column?: Maybe<Array<Maybe<Scalars['String']>>>;
  startIdx?: Maybe<Scalars['Int']>;
};

export type Sage_Auto_Complete_V2_AcChosenJoinPath = {
  __typename?: 'sage_auto_complete_v2_ACChosenJoinPath';
  chosenIdx?: Maybe<Scalars['Int']>;
  joinPath?: Maybe<Array<Maybe<Sage_JoinPathProto>>>;
  startIdx?: Maybe<Scalars['Int']>;
};

export type Sage_Auto_Complete_V2_AcColumn = {
  __typename?: 'sage_auto_complete_v2_ACColumn';
  header?: Maybe<Sage_EntityHeader>;
  table?: Maybe<Sage_EntityHeader>;
};

export type Sage_Auto_Complete_V2_AcContext = {
  __typename?: 'sage_auto_complete_v2_ACContext';
  constrainedSearchContext?: Maybe<Sage_Auto_Complete_V2_ConstrainedSearchContext>;
  formula?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_AcFormula>>>;
  headerDef?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
  join?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_AcJoin>>>;
  nlContext?: Maybe<Sage_Auto_Complete_V2_NlContext>;
  parameter?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_AcParameter>>>;
  pivotContexts?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_PivotContext>>>;
  queryRewrite?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_NlqRewrite>>>;
  schemaGraph?: Maybe<Sage_Auto_Complete_V2_SchemaGraphProto>;
  searchAssistContext?: Maybe<Sage_Auto_Complete_V2_SearchAssistContext>;
  table?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_AcTable>>>;
  tokenDisambiguation?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_AcTokenDisambiguation>>>;
  v?: Maybe<Sage_Auto_Complete_V2_AcVersion_E>;
  version?: Maybe<Sage_Auto_Complete_V2_AcContext_Version>;
};

export enum Sage_Auto_Complete_V2_AcContext_Version {
  V1 = 'V1',
  V2 = 'V2'
}

export type Sage_Auto_Complete_V2_AcFormula = {
  __typename?: 'sage_auto_complete_v2_ACFormula';
  aggregationType?: Maybe<Sage_AggregationType_E>;
  columnType?: Maybe<Sage_ColumnType_E>;
  dataType?: Maybe<Falcon_DataType_E>;
  defaultCalendar?: Maybe<Sage_EntityHeader>;
  deprecatedExpression?: Maybe<Scalars['String']>;
  error?: Maybe<Sage_Auto_Complete_V2_AcFormulaError>;
  expression?: Maybe<Sage_SageExpression>;
  header?: Maybe<Sage_EntityHeader>;
  isAutoGenerated?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
  version?: Maybe<Sage_Auto_Complete_V2_AcVersion_E>;
  wasAutoGenerated?: Maybe<Scalars['Boolean']>;
};

export type Sage_Auto_Complete_V2_AcFormulaError = {
  __typename?: 'sage_auto_complete_v2_ACFormulaError';
  errorCode?: Maybe<Sage_Auto_Complete_V2_ErrorCode_E>;
  errorMessage?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_AcJoin = {
  __typename?: 'sage_auto_complete_v2_ACJoin';
  error?: Maybe<Sage_Auto_Complete_V2_AcJoinError>;
  header?: Maybe<Sage_EntityHeader>;
  left?: Maybe<Sage_EntityHeader>;
  leftColumn?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
  right?: Maybe<Sage_EntityHeader>;
  rightColumn?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
  version?: Maybe<Sage_Auto_Complete_V2_AcVersion_E>;
};

export type Sage_Auto_Complete_V2_AcJoinError = {
  __typename?: 'sage_auto_complete_v2_ACJoinError';
  errorCode?: Maybe<Sage_Auto_Complete_V2_ErrorCode_E>;
  errorMessage?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_AcParameter = {
  __typename?: 'sage_auto_complete_v2_ACParameter';
  dataType?: Maybe<Falcon_DataType_E>;
  header?: Maybe<Sage_EntityHeader>;
};

export type Sage_Auto_Complete_V2_AcRequestInfo = {
  __typename?: 'sage_auto_complete_v2_ACRequestInfo';
  authToken?: Maybe<Sage_Auto_Complete_V2_AuthToken>;
  clientTimestampMs?: Maybe<Scalars['Long']>;
  deleteInvalidPhrases?: Maybe<Scalars['Boolean']>;
  downstreamRequestId?: Maybe<Scalars['String']>;
  featureFlag?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_FeatureFlag>>>;
  flag?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_FeatureFlag_E>>>;
  incidentId?: Maybe<Scalars['String']>;
  isAnswerPage?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  queryStreamId?: Maybe<Scalars['String']>;
  requestCallId?: Maybe<Scalars['Int']>;
  shouldCountViews?: Maybe<Scalars['Boolean']>;
  stateKey?: Maybe<Sage_Auto_Complete_V2_AcStateKey>;
  statefulRequestInfo?: Maybe<Common_StatefulRequestInfo>;
  timeBudgetMs?: Maybe<Scalars['Int']>;
  userFeedback?: Maybe<Sage_Auto_Complete_V2_UserFeedback>;
  worksheetGuid?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_AcResponseInfo = {
  __typename?: 'sage_auto_complete_v2_ACResponseInfo';
  incidentId?: Maybe<Scalars['String']>;
  latencyBreakUp?: Maybe<Array<Maybe<Scalars['Int']>>>;
  responseCallId?: Maybe<Scalars['Int']>;
  serverLatencyMs?: Maybe<Scalars['Int']>;
  stateKey?: Maybe<Sage_Auto_Complete_V2_AcStateKey>;
  statefulResponseInfo?: Maybe<Common_StatefulResponseInfo>;
};

export type Sage_Auto_Complete_V2_AcStateKey = {
  __typename?: 'sage_auto_complete_v2_ACStateKey';
  generationNumber?: Maybe<Scalars['Int']>;
  transactionId?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_AcTable = {
  __typename?: 'sage_auto_complete_v2_ACTable';
  /** @deprecated Field no longer supported */
  column?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
  deprecatedError?: Maybe<Sage_Auto_Complete_V2_AcTableError>;
  deprecatedQuery?: Maybe<Scalars['String']>;
  error?: Maybe<Sage_Auto_Complete_V2_ErrorCollection>;
  expression?: Maybe<Sage_SageExpression>;
  formatted?: Maybe<Sage_Auto_Complete_V2_FormattedTokens>;
  hashKey?: Maybe<Scalars['String']>;
  header?: Maybe<Sage_EntityHeader>;
  isSkipToken?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  nlToken?: Maybe<Array<Maybe<Sage_NlToken>>>;
  query?: Maybe<Sage_Auto_Complete_V2_SageProgram>;
  unmappedColumn?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
  version?: Maybe<Sage_Auto_Complete_V2_AcVersion_E>;
  wordRange?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_WordRange>>>;
};

export type Sage_Auto_Complete_V2_AcTableError = {
  __typename?: 'sage_auto_complete_v2_ACTableError';
  errorCode?: Maybe<Sage_Auto_Complete_V2_ErrorCode_E>;
  errorMessage?: Maybe<Scalars['String']>;
  errorMessagePosition?: Maybe<Scalars['Int']>;
  errorSpan?: Maybe<Scalars['Int']>;
  severity?: Maybe<Sage_Auto_Complete_V2_ErrorSeverity_E>;
};

export type Sage_Auto_Complete_V2_AcTokenDisambiguation = {
  __typename?: 'sage_auto_complete_v2_ACTokenDisambiguation';
  chosenColumn?: Maybe<Sage_Auto_Complete_V2_AcChosenColumn>;
  chosenJoinPath?: Maybe<Sage_Auto_Complete_V2_AcChosenJoinPath>;
  version?: Maybe<Sage_Auto_Complete_V2_AcVersion_E>;
};

export type Sage_Auto_Complete_V2_AcVersion = {
  __typename?: 'sage_auto_complete_v2_ACVersion';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_AcVersion_E {
  MaxVersion = 'MAX_VERSION',
  Pre_4_3 = 'PRE_4_3',
  V_4_3 = 'V_4_3',
  V_4_4_1 = 'V_4_4_1',
  V_4_4_1_3 = 'V_4_4_1_3',
  V_4_5 = 'V_4_5',
  V_4_5_1 = 'V_4_5_1',
  V_5 = 'V_5',
  V_5_2 = 'V_5_2',
  V_6_2 = 'V_6_2',
  V_6_3_1 = 'V_6_3_1',
  V_8_0_0Cl = 'V_8_0_0_CL',
  V_8_2_0Cl = 'V_8_2_0_CL',
  V_8_7_0Cl = 'V_8_7_0_CL',
  V_8_8_0Cl = 'V_8_8_0_CL',
  V_8_8_1Sw = 'V_8_8_1_SW',
  V_9_1_0Cl = 'V_9_1_0_CL'
}

export type Sage_Auto_Complete_V2_AuthToken = {
  __typename?: 'sage_auto_complete_v2_AuthToken';
  expirationTime?: Maybe<Scalars['Int']>;
  /** @deprecated Field no longer supported */
  groupMask?: Maybe<Scalars['Long']>;
  logicalSchemaVersion?: Maybe<Scalars['Long']>;
  orgId?: Maybe<Scalars['Long']>;
  rlsGroups?: Maybe<Sage_SparseBitmapProto>;
  user?: Maybe<Sage_EntityHeader>;
  value?: Maybe<Scalars['Long']>;
};

export type Sage_Auto_Complete_V2_AutoBucketCache = {
  __typename?: 'sage_auto_complete_v2_AutoBucketCache';
  cacheEntries?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_AutoBucketCache_AutoBucketCacheEntry>>>;
};

export type Sage_Auto_Complete_V2_AutoBucketCache_AutoBucketCacheEntry = {
  __typename?: 'sage_auto_complete_v2_AutoBucketCache_AutoBucketCacheEntry';
  bucket?: Maybe<Sage_TimeBucket_E>;
  outputGuid?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_AutoBucketPolicy = {
  __typename?: 'sage_auto_complete_v2_AutoBucketPolicy';
  autoBucketCache?: Maybe<Sage_Auto_Complete_V2_AutoBucketCache>;
  useData?: Maybe<Scalars['Boolean']>;
};

export type Sage_Auto_Complete_V2_ClientState = {
  __typename?: 'sage_auto_complete_v2_ClientState';
  deprecatedSerializedFormulaTokens?: Maybe<Scalars['String']>;
  deprecatedTokenColor?: Maybe<Scalars['String']>;
  originalToken?: Maybe<Scalars['String']>;
  truncated?: Maybe<Scalars['Boolean']>;
};

export type Sage_Auto_Complete_V2_ColumnMetadata = {
  __typename?: 'sage_auto_complete_v2_ColumnMetadata';
  estimatedUniqueCount?: Maybe<Scalars['Int']>;
  guid?: Maybe<Scalars['String']>;
  isIndexed?: Maybe<Scalars['Boolean']>;
};

export type Sage_Auto_Complete_V2_ConstrainedSearchContext = {
  __typename?: 'sage_auto_complete_v2_ConstrainedSearchContext';
  avoidTokens?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_ConstrainedSearchContext_TokenProperties>>>;
  columnGuid?: Maybe<Scalars['String']>;
  explorationType?: Maybe<Sage_Auto_Complete_V2_ConstrainedSearchContext_ExplorationType>;
  isAggregated?: Maybe<Scalars['Boolean']>;
  isDateBucket?: Maybe<Scalars['Boolean']>;
};

export enum Sage_Auto_Complete_V2_ConstrainedSearchContext_ExplorationType {
  Add = 'ADD',
  Compare = 'COMPARE',
  Filter = 'FILTER',
  Replace = 'REPLACE'
}

export type Sage_Auto_Complete_V2_ConstrainedSearchContext_TokenProperties = {
  __typename?: 'sage_auto_complete_v2_ConstrainedSearchContext_TokenProperties';
  aggregated?: Maybe<Scalars['Boolean']>;
  columnGuid?: Maybe<Scalars['String']>;
  dataType?: Maybe<Falcon_DataType_E>;
  displayGuid?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  tokenType?: Maybe<Sage_TokenType_E>;
  versusGenerated?: Maybe<Scalars['Boolean']>;
};

export type Sage_Auto_Complete_V2_DataScope = {
  __typename?: 'sage_auto_complete_v2_DataScope';
  filterSageQuery?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
  forcedRoot?: Maybe<Scalars['String']>;
  logicalColumn?: Maybe<Array<Maybe<Scalars['String']>>>;
  logicalTable?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Sage_Auto_Complete_V2_DataScopeTable = {
  __typename?: 'sage_auto_complete_v2_DataScopeTable';
  column?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
  confidence?: Maybe<Scalars['Float']>;
  header?: Maybe<Sage_EntityHeader>;
  type?: Maybe<Sage_Auto_Complete_V2_DataScopeTableType_E>;
};

export type Sage_Auto_Complete_V2_DataScopeTableType = {
  __typename?: 'sage_auto_complete_v2_DataScopeTableType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_DataScopeTableType_E {
  Logical = 'LOGICAL',
  UserDefined = 'USER_DEFINED',
  Worksheet = 'WORKSHEET'
}

export type Sage_Auto_Complete_V2_EditInMiddleInfo = {
  __typename?: 'sage_auto_complete_v2_EditInMiddleInfo';
  prevPhrases?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_PhraseDefinition>>>;
  prevTokens?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
};

export type Sage_Auto_Complete_V2_Error = {
  __typename?: 'sage_auto_complete_v2_Error';
  debugInfo?: Maybe<Sage_Auto_Complete_V2_ErrorDebugInfo>;
  errorCode?: Maybe<Sage_Auto_Complete_V2_ErrorCode_E>;
  errorMessage?: Maybe<Scalars['String']>;
  errorMessagePosition?: Maybe<Scalars['Int']>;
  errorSpan?: Maybe<Scalars['Int']>;
  severity?: Maybe<Sage_Auto_Complete_V2_ErrorSeverity_E>;
};

export type Sage_Auto_Complete_V2_ErrorCode = {
  __typename?: 'sage_auto_complete_v2_ErrorCode';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_ErrorCode_E {
  AmbiguousToken = 'AMBIGUOUS_TOKEN',
  BadRecognizedTokens = 'BAD_RECOGNIZED_TOKENS',
  BadTokenSequence = 'BAD_TOKEN_SEQUENCE',
  Cancelled = 'CANCELLED',
  Failure = 'FAILURE',
  ForbiddenWord = 'FORBIDDEN_WORD',
  InconsistentJoinPath = 'INCONSISTENT_JOIN_PATH',
  IncrementalRequestNotApplicable = 'INCREMENTAL_REQUEST_NOT_APPLICABLE',
  InvalidColumn = 'INVALID_COLUMN',
  InvalidJoinPath = 'INVALID_JOIN_PATH',
  InvalidRequest = 'INVALID_REQUEST',
  InvalidTable = 'INVALID_TABLE',
  InvalidTransform = 'INVALID_TRANSFORM',
  JoinPathAmbiguity = 'JOIN_PATH_AMBIGUITY',
  LessonPlanUpgraded = 'LESSON_PLAN_UPGRADED',
  LessonPlanUpgradeFailed = 'LESSON_PLAN_UPGRADE_FAILED',
  LlmDisabled = 'LLM_DISABLED',
  LlmFormat = 'LLM_FORMAT',
  LlmNotEnoughQuestions = 'LLM_NOT_ENOUGH_QUESTIONS',
  LlmNotFoundInPensieve = 'LLM_NOT_FOUND_IN_PENSIEVE',
  LlmPensieveWriteError = 'LLM_PENSIEVE_WRITE_ERROR',
  LlmUnavailable = 'LLM_UNAVAILABLE',
  NotFound = 'NOT_FOUND',
  NotReady = 'NOT_READY',
  NoJoinPath = 'NO_JOIN_PATH',
  NoMatch = 'NO_MATCH',
  PermissionDenied = 'PERMISSION_DENIED',
  QueryTemplateToTemplateEntryMismatch = 'QUERY_TEMPLATE_TO_TEMPLATE_ENTRY_MISMATCH',
  RelationshipGraphHasCycles = 'RELATIONSHIP_GRAPH_HAS_CYCLES',
  Success = 'SUCCESS',
  TimeOutError = 'TIME_OUT_ERROR',
  UnsupportedLanguage = 'UNSUPPORTED_LANGUAGE',
  UserGroupMaskNotSet = 'USER_GROUP_MASK_NOT_SET'
}

export type Sage_Auto_Complete_V2_ErrorCollection = {
  __typename?: 'sage_auto_complete_v2_ErrorCollection';
  error?: Maybe<Sage_Auto_Complete_V2_Error>;
  errorDetail?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_Error>>>;
};

export type Sage_Auto_Complete_V2_ErrorDebugInfo = {
  __typename?: 'sage_auto_complete_v2_ErrorDebugInfo';
  forbiddenType?: Maybe<Sage_Auto_Complete_V2_ErrorDebugInfo_ForbiddenType>;
  numFailedLookups?: Maybe<Scalars['Int']>;
};

export enum Sage_Auto_Complete_V2_ErrorDebugInfo_ForbiddenType {
  ForbiddenByData = 'FORBIDDEN_BY_DATA',
  ForbiddenByLang = 'FORBIDDEN_BY_LANG'
}

export type Sage_Auto_Complete_V2_ErrorSeverity = {
  __typename?: 'sage_auto_complete_v2_ErrorSeverity';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_ErrorSeverity_E {
  Error = 'ERROR',
  Suggestion = 'SUGGESTION',
  Warning = 'WARNING'
}

export type Sage_Auto_Complete_V2_FeatureFlag = {
  __typename?: 'sage_auto_complete_v2_FeatureFlag';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_FeatureFlag_E {
  AutoResolveJoinAmbiguity = 'AUTO_RESOLVE_JOIN_AMBIGUITY',
  DisableApproximateMatches = 'DISABLE_APPROXIMATE_MATCHES',
  DisableDataBasedAutoBucketing = 'DISABLE_DATA_BASED_AUTO_BUCKETING',
  DisableFollowUpSuggestions = 'DISABLE_FOLLOW_UP_SUGGESTIONS',
  DisableObjectSearch = 'DISABLE_OBJECT_SEARCH',
  DisableSearchHistoryLookup = 'DISABLE_SEARCH_HISTORY_LOOKUP',
  DisableTokenization = 'DISABLE_TOKENIZATION',
  DisableUbr = 'DISABLE_UBR',
  DisableUbrFeedbackLookup = 'DISABLE_UBR_FEEDBACK_LOOKUP',
  EnableDataBasedAutoBucketing = 'ENABLE_DATA_BASED_AUTO_BUCKETING',
  EnableNlpTokenizer = 'ENABLE_NLP_TOKENIZER',
  EnableOutOfScopeMatches = 'ENABLE_OUT_OF_SCOPE_MATCHES',
  EnableRequestProfiling = 'ENABLE_REQUEST_PROFILING',
  EnableSearchHistory = 'ENABLE_SEARCH_HISTORY',
  LookupEnlitePreferredColumns = 'LOOKUP_ENLITE_PREFERRED_COLUMNS',
  LookupOnlyColumns = 'LOOKUP_ONLY_COLUMNS',
  NumFeatureFlags = 'NUM_FEATURE_FLAGS',
  ShowDebugInfo = 'SHOW_DEBUG_INFO',
  SingleTokenCompletionsOnly = 'SINGLE_TOKEN_COMPLETIONS_ONLY',
  UseWhiteSpaceInfo = 'USE_WHITE_SPACE_INFO',
  WriteRequestSnapshot = 'WRITE_REQUEST_SNAPSHOT'
}

export type Sage_Auto_Complete_V2_ForbiddenWordInfo = {
  __typename?: 'sage_auto_complete_v2_ForbiddenWordInfo';
  forbiddenMessage?: Maybe<Scalars['String']>;
  forbiddenType?: Maybe<Sage_Auto_Complete_V2_ForbiddenWordInfo_ForbiddenType>;
};

export enum Sage_Auto_Complete_V2_ForbiddenWordInfo_ForbiddenType {
  ForbiddenByData = 'FORBIDDEN_BY_DATA',
  ForbiddenByLang = 'FORBIDDEN_BY_LANG'
}

export type Sage_Auto_Complete_V2_FormattedTokens = {
  __typename?: 'sage_auto_complete_v2_FormattedTokens';
  phrase?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_PhraseDefinition>>>;
  token?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
};

export type Sage_Auto_Complete_V2_IncrementalRequest = {
  __typename?: 'sage_auto_complete_v2_IncrementalRequest';
  edit?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_TokenEdit>>>;
  prevResponseIncidentId?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_JoinPathChoice = {
  __typename?: 'sage_auto_complete_v2_JoinPathChoice';
  affectedToken?: Maybe<Array<Maybe<Scalars['Int']>>>;
  newRoot?: Maybe<Scalars['String']>;
  newTokenEditable?: Maybe<Scalars['Boolean']>;
  newTokenPath?: Maybe<Sage_JoinPathProto>;
  oldRoot?: Maybe<Scalars['String']>;
  oldTokensEditable?: Maybe<Scalars['Boolean']>;
  preferredChoice?: Maybe<Scalars['Boolean']>;
  prependPath?: Maybe<Sage_JoinPathProto>;
};

export type Sage_Auto_Complete_V2_JoinPathCollection = {
  __typename?: 'sage_auto_complete_v2_JoinPathCollection';
  choice?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_JoinPathChoice>>>;
  newTokenIndex?: Maybe<Scalars['Int']>;
  newTokenIndices?: Maybe<Array<Maybe<Scalars['Int']>>>;
  oldColumnGuid?: Maybe<Array<Maybe<Scalars['String']>>>;
  rootIndex?: Maybe<Scalars['Int']>;
};

export type Sage_Auto_Complete_V2_LanguageType = {
  __typename?: 'sage_auto_complete_v2_LanguageType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_LanguageType_E {
  Answer = 'ANSWER',
  ConstrainedSearch = 'CONSTRAINED_SEARCH',
  Formula = 'FORMULA',
  FormulaTranslation = 'FORMULA_TRANSLATION',
  NumLanguageTypes = 'NUM_LANGUAGE_TYPES',
  RlsFormula = 'RLS_FORMULA',
  Worksheet = 'WORKSHEET'
}

export type Sage_Auto_Complete_V2_NlContext = {
  __typename?: 'sage_auto_complete_v2_NLContext';
  isNlQuerySourced?: Maybe<Scalars['Boolean']>;
  queryMappingInfo?: Maybe<Sage_Auto_Complete_V2_NlQueryMappingInfo>;
  showNlQueryMapping?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Sage_Auto_Complete_V2_AcVersion_E>;
};

export type Sage_Auto_Complete_V2_NlPhraseMappingInfo = {
  __typename?: 'sage_auto_complete_v2_NLPhraseMappingInfo';
  sortByPhraseMapping?: Maybe<Sage_Auto_Complete_V2_SortByPhraseMapping>;
  type?: Maybe<Sage_Auto_Complete_V2_NlPhraseMappingInfo_Type>;
};

export enum Sage_Auto_Complete_V2_NlPhraseMappingInfo_Type {
  NumTypes = 'NUM_TYPES',
  SortBy = 'SORT_BY'
}

export type Sage_Auto_Complete_V2_NlqRewrite = {
  __typename?: 'sage_auto_complete_v2_NLQRewrite';
  disambiguationContext?: Maybe<Sage_Auto_Complete_V2_NlqRewriteContext>;
  phrase?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_PhraseDefinition>>>;
  rewrittenToken?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
  score?: Maybe<Scalars['Float']>;
  sourceType?: Maybe<Sage_Auto_Complete_V2_NlqRewriteSourceType_E>;
  suggestionType?: Maybe<Sage_Auto_Complete_V2_NlqRewriteSuggestionType_E>;
  version?: Maybe<Sage_Auto_Complete_V2_AcVersion_E>;
};

export type Sage_Auto_Complete_V2_NlqRewriteContext = {
  __typename?: 'sage_auto_complete_v2_NLQRewriteContext';
  posTag?: Maybe<Sage_Nlp_PosTag_E>;
  query?: Maybe<Scalars['String']>;
  queryCtxToken?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_NlQueryContextToken>>>;
  relation?: Maybe<Scalars['String']>;
  tokens?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
  wordRange?: Maybe<Sage_Auto_Complete_V2_WordRange>;
};

export type Sage_Auto_Complete_V2_NlqRewriteSourceType = {
  __typename?: 'sage_auto_complete_v2_NLQRewriteSourceType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_NlqRewriteSourceType_E {
  ContextCache = 'CONTEXT_CACHE',
  ContextChoice = 'CONTEXT_CHOICE',
  InferredRewrite = 'INFERRED_REWRITE',
  NumSources = 'NUM_SOURCES',
  QueryRewrite = 'QUERY_REWRITE',
  SearchToggle = 'SEARCH_TOGGLE',
  SuperlativeRewrite = 'SUPERLATIVE_REWRITE',
  UbrFeedback = 'UBR_FEEDBACK',
  Unknown = 'UNKNOWN'
}

export type Sage_Auto_Complete_V2_NlqRewriteSuggestion = {
  __typename?: 'sage_auto_complete_v2_NLQRewriteSuggestion';
  disambiguationContext?: Maybe<Sage_Auto_Complete_V2_NlqRewriteContext>;
  forbiddenWordInfo?: Maybe<Sage_Auto_Complete_V2_ForbiddenWordInfo>;
  phrase?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_PhraseDefinition>>>;
  suggestion?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
  suggestionType?: Maybe<Sage_Auto_Complete_V2_NlqRewriteSuggestionType_E>;
};

export type Sage_Auto_Complete_V2_NlqRewriteSuggestionType = {
  __typename?: 'sage_auto_complete_v2_NLQRewriteSuggestionType';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_NlqRewriteSuggestionType_E {
  Date = 'DATE',
  Entropy = 'ENTROPY',
  Forbidden = 'FORBIDDEN',
  Ignore = 'IGNORE',
  Keyword = 'KEYWORD',
  NumTypes = 'NUM_TYPES',
  Refinement = 'REFINEMENT',
  SearchToggle = 'SEARCH_TOGGLE',
  Superlative = 'SUPERLATIVE',
  Undefined = 'UNDEFINED',
  Unknown = 'UNKNOWN',
  UnmatchedEntity = 'UNMATCHED_ENTITY'
}

export type Sage_Auto_Complete_V2_NlQueryContextToken = {
  __typename?: 'sage_auto_complete_v2_NLQueryContextToken';
  posTag?: Maybe<Sage_Nlp_PosTag_E>;
  relation?: Maybe<Scalars['String']>;
  token?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
  type?: Maybe<Sage_Auto_Complete_V2_NlQueryContextToken_ContextRelationType>;
  wordRange?: Maybe<Sage_Auto_Complete_V2_WordRange>;
};

export enum Sage_Auto_Complete_V2_NlQueryContextToken_ContextRelationType {
  Child = 'CHILD',
  NeighbourhoodWord = 'NEIGHBOURHOOD_WORD',
  Parent = 'PARENT',
  Unknown = 'UNKNOWN'
}

export type Sage_Auto_Complete_V2_NlQueryMappingInfo = {
  __typename?: 'sage_auto_complete_v2_NLQueryMappingInfo';
  charAfter?: Maybe<Array<Maybe<Scalars['String']>>>;
  phraseMappingInfo?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_NlPhraseMappingInfo>>>;
  queryToken?: Maybe<Array<Maybe<Scalars['String']>>>;
  tokenMappingInfo?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_NlTokenMappingInfo>>>;
};

export type Sage_Auto_Complete_V2_NlTokenMappingInfo = {
  __typename?: 'sage_auto_complete_v2_NLTokenMappingInfo';
  confidence?: Maybe<Sage_Auto_Complete_V2_NlTokenMappingInfo_SegmentMatchConfidenceBucket>;
  disambiguationType?: Maybe<Sage_Auto_Complete_V2_NlqRewriteSuggestionType_E>;
  isPartOfInterpretation?: Maybe<Scalars['Boolean']>;
  tokenList?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_TokenList>>>;
  wordRange?: Maybe<Sage_Auto_Complete_V2_WordRange>;
};

export enum Sage_Auto_Complete_V2_NlTokenMappingInfo_SegmentMatchConfidenceBucket {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type Sage_Auto_Complete_V2_Object = {
  __typename?: 'sage_auto_complete_v2_Object';
  action?: Maybe<Sage_Auto_Complete_V2_Object_ActionProto>;
  authorDisplayName?: Maybe<Sage_Auto_Complete_V2_Object_HighlightedString>;
  authorGuid?: Maybe<Scalars['String']>;
  authorName?: Maybe<Sage_Auto_Complete_V2_Object_HighlightedString>;
  explanation?: Maybe<Scalars['String']>;
  generationNum?: Maybe<Scalars['Long']>;
  guid?: Maybe<Scalars['String']>;
  helpPage?: Maybe<Sage_Auto_Complete_V2_Object_HelpPageProto>;
  modifiedEpochMs?: Maybe<Scalars['Long']>;
  name?: Maybe<Sage_Auto_Complete_V2_Object_HighlightedString>;
  question?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_Object_Question>>>;
  score?: Maybe<Scalars['Float']>;
  type?: Maybe<Sage_Auto_Complete_V2_Object_Type>;
  viz?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_Object_Viz>>>;
};

export type Sage_Auto_Complete_V2_Object_ActionProto = {
  __typename?: 'sage_auto_complete_v2_Object_ActionProto';
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Sage_Auto_Complete_V2_Object_ActionProto_ActionType>;
};

export enum Sage_Auto_Complete_V2_Object_ActionProto_ActionType {
  AdminAddNewGroup = 'ADMIN_ADD_NEW_GROUP',
  AdminAddNewUser = 'ADMIN_ADD_NEW_USER',
  AdminManageBusinessDataModel = 'ADMIN_MANAGE_BUSINESS_DATA_MODEL',
  AdminManageDataSecurity = 'ADMIN_MANAGE_DATA_SECURITY',
  AdminManageJobs = 'ADMIN_MANAGE_JOBS',
  AdminViewGroups = 'ADMIN_VIEW_GROUPS',
  AdminViewSystemHealthAlertsAndEvents = 'ADMIN_VIEW_SYSTEM_HEALTH_ALERTS_AND_EVENTS',
  AdminViewSystemHealthClusterManager = 'ADMIN_VIEW_SYSTEM_HEALTH_CLUSTER_MANAGER',
  AdminViewSystemHealthData = 'ADMIN_VIEW_SYSTEM_HEALTH_DATA',
  AdminViewSystemHealthOverview = 'ADMIN_VIEW_SYSTEM_HEALTH_OVERVIEW',
  AdminViewUsers = 'ADMIN_VIEW_USERS',
  CreatePinboard = 'CREATE_PINBOARD',
  CreateWorksheet = 'CREATE_WORKSHEET',
  EditProfile = 'EDIT_PROFILE',
  UploadData = 'UPLOAD_DATA',
  UploadSchema = 'UPLOAD_SCHEMA',
  ViewAnswers = 'VIEW_ANSWERS',
  ViewDataSources = 'VIEW_DATA_SOURCES',
  ViewDataTables = 'VIEW_DATA_TABLES',
  ViewPinboards = 'VIEW_PINBOARDS',
  ViewSchema = 'VIEW_SCHEMA'
}

export type Sage_Auto_Complete_V2_Object_HelpPageProto = {
  __typename?: 'sage_auto_complete_v2_Object_HelpPageProto';
  URL?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_Object_Highlight = {
  __typename?: 'sage_auto_complete_v2_Object_Highlight';
  size?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type Sage_Auto_Complete_V2_Object_HighlightedString = {
  __typename?: 'sage_auto_complete_v2_Object_HighlightedString';
  highlight?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_Object_Highlight>>>;
  text?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_Object_Question = {
  __typename?: 'sage_auto_complete_v2_Object_Question';
  acContext?: Maybe<Sage_Auto_Complete_V2_AcContext>;
  text?: Maybe<Sage_Auto_Complete_V2_Object_HighlightedString>;
};

export enum Sage_Auto_Complete_V2_Object_Type {
  Action = 'ACTION',
  Answer = 'ANSWER',
  HelpPage = 'HELP_PAGE',
  Pinboard = 'PINBOARD'
}

export type Sage_Auto_Complete_V2_Object_Viz = {
  __typename?: 'sage_auto_complete_v2_Object_Viz';
  chartType?: Maybe<Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto>;
  explanation?: Maybe<Scalars['String']>;
  guid?: Maybe<Scalars['String']>;
  modifiedEpochMs?: Maybe<Scalars['Long']>;
  question?: Maybe<Sage_Auto_Complete_V2_Object_Question>;
  score?: Maybe<Scalars['Float']>;
  title?: Maybe<Sage_Auto_Complete_V2_Object_HighlightedString>;
  type?: Maybe<Sage_Auto_Complete_V2_Object_VizType>;
  vizTitle?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_Object_VizType {
  Chart = 'CHART',
  Headline = 'HEADLINE',
  Table = 'TABLE'
}

export type Sage_Auto_Complete_V2_OutputColumn = {
  __typename?: 'sage_auto_complete_v2_OutputColumn';
  aggregationType?: Maybe<Sage_AggregationType_E>;
  bucket?: Maybe<Sage_TimeBucket_E>;
  calendarGuid?: Maybe<Scalars['String']>;
  columnGuid?: Maybe<Scalars['String']>;
  joinPaths?: Maybe<Array<Maybe<Sage_JoinPathProto>>>;
  showGrowth?: Maybe<Scalars['Boolean']>;
};

export type Sage_Auto_Complete_V2_OutputGuidCacheProto = {
  __typename?: 'sage_auto_complete_v2_OutputGuidCacheProto';
  cacheEntries?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_OutputGuidCacheProto_OutputGuidCacheEntry>>>;
};

export type Sage_Auto_Complete_V2_OutputGuidCacheProto_OutputGuidCacheEntry = {
  __typename?: 'sage_auto_complete_v2_OutputGuidCacheProto_OutputGuidCacheEntry';
  column?: Maybe<Sage_Auto_Complete_V2_OutputColumn>;
  outputGuid?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_PhraseDefinition = {
  __typename?: 'sage_auto_complete_v2_PhraseDefinition';
  isCompletePhrase?: Maybe<Scalars['Boolean']>;
  numTokens?: Maybe<Scalars['Int']>;
  phraseType?: Maybe<Sage_PhraseType_E>;
  startIndex?: Maybe<Scalars['Int']>;
};

export type Sage_Auto_Complete_V2_PivotColumn = {
  __typename?: 'sage_auto_complete_v2_PivotColumn';
  formulaGuid?: Maybe<Scalars['String']>;
  outputGuid?: Maybe<Scalars['String']>;
  values?: Maybe<Sage_Auto_Complete_V2_ValueList>;
};

export type Sage_Auto_Complete_V2_PivotContext = {
  __typename?: 'sage_auto_complete_v2_PivotContext';
  attributeOutputGuids?: Maybe<Array<Maybe<Scalars['String']>>>;
  pivotGroups?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_PivotGroup>>>;
};

export type Sage_Auto_Complete_V2_PivotGroup = {
  __typename?: 'sage_auto_complete_v2_PivotGroup';
  aggregation?: Maybe<Sage_AggregationType_E>;
  columns?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_PivotColumn>>>;
  measureOutputGuid?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_RecognizedToken = {
  __typename?: 'sage_auto_complete_v2_RecognizedToken';
  autoGeneratedSynonym?: Maybe<Scalars['Boolean']>;
  autoInsertedSpace?: Maybe<Scalars['Boolean']>;
  bulkFilterValue?: Maybe<Array<Maybe<Scalars['String']>>>;
  canBeExtended?: Maybe<Scalars['Boolean']>;
  canEditJoinPath?: Maybe<Scalars['Boolean']>;
  canonicalForm?: Maybe<Scalars['String']>;
  clientState?: Maybe<Sage_Auto_Complete_V2_ClientState>;
  dataType?: Maybe<Falcon_DataType_E>;
  dateFilter?: Maybe<Sage_DateFilterProto>;
  deprecatedSageExpression?: Maybe<Scalars['String']>;
  deprecatedTokenIdx?: Maybe<Scalars['Int']>;
  entityCategory?: Maybe<Sage_EntityCategory_E>;
  explicitJoinPathEdit?: Maybe<Scalars['Boolean']>;
  formulaId?: Maybe<Scalars['String']>;
  guid?: Maybe<Scalars['String']>;
  hasSpaceAfter?: Maybe<Scalars['Boolean']>;
  idxInPrevQuery?: Maybe<Scalars['Int']>;
  inconsistentJoinPaths?: Maybe<Scalars['Boolean']>;
  isAutoDisambiguated?: Maybe<Scalars['Boolean']>;
  isCohort?: Maybe<Scalars['Boolean']>;
  isSkipped?: Maybe<Scalars['Boolean']>;
  joinPath?: Maybe<Array<Maybe<Sage_JoinPathProto>>>;
  lightweightTokenId?: Maybe<Scalars['String']>;
  matchType?: Maybe<Sage_MatchType_E>;
  outputGuid?: Maybe<Scalars['String']>;
  placeholderText?: Maybe<Scalars['String']>;
  preserveQuotes?: Maybe<Scalars['Boolean']>;
  rankingScore?: Maybe<Scalars['Float']>;
  reResolve?: Maybe<Scalars['Boolean']>;
  requiresDelimiters?: Maybe<Scalars['Boolean']>;
  /** @deprecated Field no longer supported */
  sageExpression?: Maybe<Sage_SageExpression>;
  schemaTableId?: Maybe<Scalars['Int']>;
  synonymSource?: Maybe<Sage_SynonymSource_E>;
  token?: Maybe<Scalars['String']>;
  tokenMetadata?: Maybe<Sage_Auto_Complete_V2_TokenMetadata>;
  twiddlerRank?: Maybe<Scalars['Int']>;
  typeEnum?: Maybe<Sage_TokenType_E>;
  valueMatch?: Maybe<Scalars['Boolean']>;
  whiteSpaceSuffix?: Maybe<Sage_Auto_Complete_V2_WhiteSpaceInfo>;
  worksheetColumnGuid?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_RequestStage = {
  __typename?: 'sage_auto_complete_v2_RequestStage';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_RequestStage_E {
  Completion = 'COMPLETION',
  HintGen = 'HINT_GEN',
  QueryCompletion = 'QUERY_COMPLETION',
  QueryGen = 'QUERY_GEN',
  QueryTransformation = 'QUERY_TRANSFORMATION',
  Queue = 'QUEUE',
  Tokenization = 'TOKENIZATION'
}

export type Sage_Auto_Complete_V2_SageProgram = {
  __typename?: 'sage_auto_complete_v2_SageProgram';
  displaySageQuery?: Maybe<Sage_Auto_Complete_V2_SageQuery>;
  programType?: Maybe<Sage_Auto_Complete_V2_SageProgram_ProgramType>;
  statements?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_Statement>>>;
};

export enum Sage_Auto_Complete_V2_SageProgram_ProgramType {
  ChasmTrap = 'CHASM_TRAP',
  QueryOnQuery = 'QUERY_ON_QUERY',
  Simple = 'SIMPLE',
  Unknown = 'UNKNOWN'
}

export type Sage_Auto_Complete_V2_SageQuery = {
  __typename?: 'sage_auto_complete_v2_SageQuery';
  columns?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_SageQuery_Column>>>;
  defaultTimeDimensions?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_SageQuery_Column>>>;
  filters?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_SageQuery_Filter>>>;
  growthDimension?: Maybe<Sage_Auto_Complete_V2_SageQuery_GrowthDimension>;
  header?: Maybe<Sage_EntityHeader>;
  isPivotTable?: Maybe<Scalars['Boolean']>;
  isSubQuery?: Maybe<Scalars['Boolean']>;
  queryRootGuid?: Maybe<Scalars['String']>;
  relatedAttributes?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_SageQuery_Column>>>;
  relatedMeasures?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_SageQuery_Column>>>;
  resultForEachValue?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_SageQuery_Column>>>;
  sortColumns?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_SageQuery_ColumnSortInfo>>>;
  topCount?: Maybe<Scalars['Int']>;
  topInfo?: Maybe<Sage_Auto_Complete_V2_SageQuery_TopInfo>;
};

export type Sage_Auto_Complete_V2_SageQuery_Column = {
  __typename?: 'sage_auto_complete_v2_SageQuery_Column';
  aggregationType?: Maybe<Sage_AggregationType_E>;
  bucket?: Maybe<Sage_TimeBucket_E>;
  calendar?: Maybe<Sage_EntityHeader>;
  column?: Maybe<Sage_SageExpression>;
  columnType?: Maybe<Sage_ColumnType_E>;
  deprecatedDataType?: Maybe<Falcon_DataType_E>;
  deprecatedSerializedRecognizedToken?: Maybe<Scalars['String']>;
  formulaId?: Maybe<Scalars['String']>;
  groupBy?: Maybe<Scalars['Boolean']>;
  header?: Maybe<Sage_EntityHeader>;
  id?: Maybe<Scalars['String']>;
  isUnmapped?: Maybe<Scalars['Boolean']>;
  joinPath?: Maybe<Sage_Auto_Complete_V2_SageQuery_JoinPath>;
  markedForDisambiguation?: Maybe<Scalars['Boolean']>;
  mustHaveOnChart?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  pivotBy?: Maybe<Scalars['Boolean']>;
  /** @deprecated Field no longer supported */
  recognizedToken?: Maybe<Sage_Auto_Complete_V2_RecognizedToken>;
  showColumn?: Maybe<Scalars['Boolean']>;
  showGrowth?: Maybe<Scalars['Boolean']>;
  sortAscending?: Maybe<Scalars['Boolean']>;
  sortOrder?: Maybe<Scalars['Int']>;
  uniqueValues?: Maybe<Scalars['Long']>;
  versusGenerated?: Maybe<Scalars['Boolean']>;
  worksheetColumnGuid?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_SageQuery_ColumnSortInfo = {
  __typename?: 'sage_auto_complete_v2_SageQuery_ColumnSortInfo';
  guid?: Maybe<Scalars['String']>;
  sortAscending?: Maybe<Scalars['Boolean']>;
};

export type Sage_Auto_Complete_V2_SageQuery_Filter = {
  __typename?: 'sage_auto_complete_v2_SageQuery_Filter';
  aggregationType?: Maybe<Sage_AggregationType_E>;
  booleanValue?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  calendar?: Maybe<Sage_EntityHeader>;
  column?: Maybe<Sage_SageExpression>;
  columnGuid?: Maybe<Scalars['String']>;
  columnName?: Maybe<Scalars['String']>;
  columnType?: Maybe<Sage_ColumnType_E>;
  dateFilter?: Maybe<Array<Maybe<Sage_DateFilterProto>>>;
  doubleValue?: Maybe<Array<Maybe<Scalars['Float']>>>;
  filterId?: Maybe<Scalars['String']>;
  filterValueQuery?: Maybe<Sage_Auto_Complete_V2_SageQuery_Filter_FilterValueQuery>;
  floatValue?: Maybe<Array<Maybe<Scalars['Float']>>>;
  formulaId?: Maybe<Scalars['String']>;
  geoInfo?: Maybe<Sage_Auto_Complete_V2_SageQuery_Filter_GeoInfo>;
  header?: Maybe<Sage_EntityHeader>;
  includeNull?: Maybe<Scalars['Boolean']>;
  int32Value?: Maybe<Array<Maybe<Scalars['Int']>>>;
  int64Value?: Maybe<Array<Maybe<Scalars['Long']>>>;
  isAutoGenerated?: Maybe<Scalars['Boolean']>;
  joinPath?: Maybe<Sage_Auto_Complete_V2_SageQuery_JoinPath>;
  markedForDisambiguation?: Maybe<Scalars['Boolean']>;
  negateFilter?: Maybe<Scalars['Boolean']>;
  op?: Maybe<Sage_CompareTypeProto_E>;
  stringValue?: Maybe<Array<Maybe<Scalars['String']>>>;
  timeBucket?: Maybe<Sage_TimeBucket_E>;
  type?: Maybe<Sage_Auto_Complete_V2_SageQuery_FilterType>;
  worksheetColumnGuid?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_SageQuery_FilterType {
  Geo = 'GEO',
  NumFilters = 'NUM_FILTERS',
  Simple = 'SIMPLE'
}

export type Sage_Auto_Complete_V2_SageQuery_Filter_FilterValueQuery = {
  __typename?: 'sage_auto_complete_v2_SageQuery_Filter_FilterValueQuery';
  column?: Maybe<Sage_EntityHeader>;
  query?: Maybe<Sage_Auto_Complete_V2_SageQuery>;
};

export type Sage_Auto_Complete_V2_SageQuery_Filter_GeoInfo = {
  __typename?: 'sage_auto_complete_v2_SageQuery_Filter_GeoInfo';
  circle?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_SageQuery_Filter_GeoInfo_GeoCircle>>>;
};

export type Sage_Auto_Complete_V2_SageQuery_Filter_GeoInfo_GeoCircle = {
  __typename?: 'sage_auto_complete_v2_SageQuery_Filter_GeoInfo_GeoCircle';
  inclusive?: Maybe<Scalars['Boolean']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
};

export type Sage_Auto_Complete_V2_SageQuery_GrowthDimension = {
  __typename?: 'sage_auto_complete_v2_SageQuery_GrowthDimension';
  bucket?: Maybe<Sage_TimeBucket_E>;
  calendar?: Maybe<Sage_EntityHeader>;
  column?: Maybe<Sage_SageExpression>;
  header?: Maybe<Sage_EntityHeader>;
  joinPath?: Maybe<Sage_Auto_Complete_V2_SageQuery_JoinPath>;
  mustHaveOnChart?: Maybe<Scalars['Boolean']>;
  qualifier?: Maybe<Sage_TimeBucketQualifierProto_E>;
  timeColumn?: Maybe<Scalars['String']>;
  timeColumnGuid?: Maybe<Scalars['String']>;
  worksheetColumnGuid?: Maybe<Scalars['String']>;
  yearOverYear?: Maybe<Scalars['Boolean']>;
};

export type Sage_Auto_Complete_V2_SageQuery_JoinPath = {
  __typename?: 'sage_auto_complete_v2_SageQuery_JoinPath';
  joinGuid?: Maybe<Array<Maybe<Scalars['String']>>>;
  rootTableGuid?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_SageQuery_TopInfo = {
  __typename?: 'sage_auto_complete_v2_SageQuery_TopInfo';
  sortColumns?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_SageQuery_ColumnSortInfo>>>;
  topCount?: Maybe<Scalars['Int']>;
};

export type Sage_Auto_Complete_V2_SchemaGraphProto = {
  __typename?: 'sage_auto_complete_v2_SchemaGraphProto';
  schemaTables?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_SchemaGraphProto_SchemaTable>>>;
};

export type Sage_Auto_Complete_V2_SchemaGraphProto_SchemaJoin = {
  __typename?: 'sage_auto_complete_v2_SchemaGraphProto_SchemaJoin';
  dstSchemaTableId?: Maybe<Scalars['Int']>;
  joinId?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_SchemaGraphProto_SchemaTable = {
  __typename?: 'sage_auto_complete_v2_SchemaGraphProto_SchemaTable';
  joins?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_SchemaGraphProto_SchemaJoin>>>;
  logicalTableId?: Maybe<Scalars['String']>;
  schemaTableId?: Maybe<Scalars['Int']>;
  userDefinedName?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_SearchAssistContext = {
  __typename?: 'sage_auto_complete_v2_SearchAssistContext';
  queryLessonId?: Maybe<Scalars['Int']>;
};

export type Sage_Auto_Complete_V2_SortByPhraseMapping = {
  __typename?: 'sage_auto_complete_v2_SortByPhraseMapping';
  allowedAggregation?: Maybe<Array<Maybe<Sage_AggregationType_E>>>;
  allowedToken?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
};

export type Sage_Auto_Complete_V2_Statement = {
  __typename?: 'sage_auto_complete_v2_Statement';
  join?: Maybe<Sage_Auto_Complete_V2_TableJoin>;
  query?: Maybe<Sage_Auto_Complete_V2_SageQuery>;
};

export type Sage_Auto_Complete_V2_TableJoin = {
  __typename?: 'sage_auto_complete_v2_TableJoin';
  deprecatedTables?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
  header?: Maybe<Sage_EntityHeader>;
  joinedColumns?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_TableJoin_JoinedColumn>>>;
  tables?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_TableJoin_JoinInputTable>>>;
};

export type Sage_Auto_Complete_V2_TableJoin_JoinInputTable = {
  __typename?: 'sage_auto_complete_v2_TableJoin_JoinInputTable';
  outerJoin?: Maybe<Scalars['Boolean']>;
  table?: Maybe<Sage_EntityHeader>;
};

export type Sage_Auto_Complete_V2_TableJoin_JoinedColumn = {
  __typename?: 'sage_auto_complete_v2_TableJoin_JoinedColumn';
  input?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
  output?: Maybe<Sage_EntityHeader>;
  serializedRecognizedToken?: Maybe<Scalars['String']>;
};

export type Sage_Auto_Complete_V2_TokenEdit = {
  __typename?: 'sage_auto_complete_v2_TokenEdit';
  endOffset?: Maybe<Scalars['Int']>;
  op?: Maybe<Sage_Auto_Complete_V2_TokenEditOp_E>;
  startOffset?: Maybe<Scalars['Int']>;
  token?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
};

export type Sage_Auto_Complete_V2_TokenEditOp = {
  __typename?: 'sage_auto_complete_v2_TokenEditOp';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_TokenEditOp_E {
  Delete = 'DELETE',
  Insert = 'INSERT',
  Replace = 'REPLACE'
}

export type Sage_Auto_Complete_V2_TokenList = {
  __typename?: 'sage_auto_complete_v2_TokenList';
  token?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_RecognizedToken>>>;
};

export type Sage_Auto_Complete_V2_TokenMetadata = {
  __typename?: 'sage_auto_complete_v2_TokenMetadata';
  deprecatedTableGuid?: Maybe<Scalars['String']>;
  deprecatedTableName?: Maybe<Scalars['String']>;
  isFormula?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  rootTables?: Maybe<Array<Maybe<Sage_EntityHeader>>>;
  table?: Maybe<Sage_EntityHeader>;
};

export type Sage_Auto_Complete_V2_UserFeedback = {
  __typename?: 'sage_auto_complete_v2_UserFeedback';
  description?: Maybe<Scalars['String']>;
  userRating?: Maybe<Sage_Auto_Complete_V2_UserRating_E>;
};

export type Sage_Auto_Complete_V2_UserRating = {
  __typename?: 'sage_auto_complete_v2_UserRating';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Auto_Complete_V2_UserRating_E {
  Bad = 'BAD',
  Good = 'GOOD',
  Ugly = 'UGLY',
  Unknown = 'UNKNOWN'
}

export type Sage_Auto_Complete_V2_ValueList = {
  __typename?: 'sage_auto_complete_v2_ValueList';
  value?: Maybe<Array<Maybe<Falcon_ConstantValue>>>;
};

export type Sage_Auto_Complete_V2_WhiteSpaceElement = {
  __typename?: 'sage_auto_complete_v2_WhiteSpaceElement';
  count?: Maybe<Scalars['Int']>;
  type?: Maybe<Sage_Auto_Complete_V2_WhiteSpaceElement_Type>;
};

export enum Sage_Auto_Complete_V2_WhiteSpaceElement_Type {
  NewLine = 'NEW_LINE',
  Space = 'SPACE'
}

export type Sage_Auto_Complete_V2_WhiteSpaceInfo = {
  __typename?: 'sage_auto_complete_v2_WhiteSpaceInfo';
  type?: Maybe<Sage_Auto_Complete_V2_WhiteSpaceInfo_Type>;
  whiteSpaceElement?: Maybe<Array<Maybe<Sage_Auto_Complete_V2_WhiteSpaceElement>>>;
};

export enum Sage_Auto_Complete_V2_WhiteSpaceInfo_Type {
  Complex = 'COMPLEX',
  NoWhiteSpace = 'NO_WHITE_SPACE',
  SingleSpace = 'SINGLE_SPACE'
}

export type Sage_Auto_Complete_V2_WordRange = {
  __typename?: 'sage_auto_complete_v2_WordRange';
  completeQuery?: Maybe<Scalars['Boolean']>;
  numWords?: Maybe<Scalars['Int']>;
  startIdx?: Maybe<Scalars['Int']>;
};

export enum Sage_Nlp_Language {
  English = 'English',
  Unknown = 'Unknown'
}

export type Sage_Nlp_NlpText = {
  __typename?: 'sage_nlp_NlpText';
  rawText?: Maybe<Scalars['String']>;
  sentence?: Maybe<Array<Maybe<Sage_Nlp_SentenceProto>>>;
};

export type Sage_Nlp_PosTag = {
  __typename?: 'sage_nlp_POSTag';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Nlp_PosTag_E {
  Adjective = 'ADJECTIVE',
  AdjectiveComparative = 'ADJECTIVE_COMPARATIVE',
  AdjectiveSuperlative = 'ADJECTIVE_SUPERLATIVE',
  Adverb = 'ADVERB',
  AdverbComparative = 'ADVERB_COMPARATIVE',
  AdverbSuperlative = 'ADVERB_SUPERLATIVE',
  CardinalNumber = 'CARDINAL_NUMBER',
  Ignore = 'IGNORE',
  Noun = 'NOUN',
  Predeterminer = 'PREDETERMINER',
  Preposition = 'PREPOSITION',
  Pronoun = 'PRONOUN',
  Undefined = 'UNDEFINED',
  Verb = 'VERB'
}

export type Sage_Nlp_ParseLabel = {
  __typename?: 'sage_nlp_ParseLabel';
  _?: Maybe<Scalars['String']>;
};

export enum Sage_Nlp_ParseLabel_E {
  Other = 'OTHER',
  Root = 'ROOT',
  Advcl = 'advcl',
  Advmod = 'advmod',
  Amod = 'amod',
  Aux = 'aux',
  Auxpass = 'auxpass',
  Cc = 'cc',
  Ccomp = 'ccomp',
  Conj = 'conj',
  Cop = 'cop',
  Csubj = 'csubj',
  Dep = 'dep',
  Det = 'det',
  Dobj = 'dobj',
  Expl = 'expl',
  Infmod = 'infmod',
  Iobj = 'iobj',
  Mark = 'mark',
  Mwe = 'mwe',
  Neg = 'neg',
  Nn = 'nn',
  Npadvmod = 'npadvmod',
  Nsubj = 'nsubj',
  Nsubjpass = 'nsubjpass',
  Num = 'num',
  Number = 'number',
  Partmod = 'partmod',
  Pcomp = 'pcomp',
  Pobj = 'pobj',
  Poss = 'poss',
  Possessive = 'possessive',
  Predet = 'predet',
  Prep = 'prep',
  Prt = 'prt',
  Punct = 'punct',
  Quantmod = 'quantmod',
  Rcmod = 'rcmod',
  Tmod = 'tmod'
}

export type Sage_Nlp_SentenceProto = {
  __typename?: 'sage_nlp_SentenceProto';
  rawText?: Maybe<Scalars['String']>;
  token?: Maybe<Array<Maybe<Sage_Nlp_Token>>>;
};

export type Sage_Nlp_SentenceTranslation = {
  __typename?: 'sage_nlp_SentenceTranslation';
  sentenceProto?: Maybe<Sage_Nlp_SentenceProto>;
  utterance?: Maybe<Scalars['String']>;
};

export type Sage_Nlp_Token = {
  __typename?: 'sage_nlp_Token';
  isBound?: Maybe<Scalars['Boolean']>;
  parentIndex?: Maybe<Scalars['Int']>;
  posTag?: Maybe<Sage_Nlp_PosTag_E>;
  rawPosTag?: Maybe<Scalars['String']>;
  rawText?: Maybe<Scalars['String']>;
  relation?: Maybe<Scalars['String']>;
  wordIndex?: Maybe<Scalars['Int']>;
};

export type Sage_Nlp_TranslationCache = {
  __typename?: 'sage_nlp_TranslationCache';
  translation?: Maybe<Array<Maybe<Sage_Nlp_SentenceTranslation>>>;
};

export type ScheduleOption = {
  cron_expression?: InputMaybe<Scalars['String']>;
  schedule_frequency?: InputMaybe<Scalars['String']>;
  schedule_id?: InputMaybe<Scalars['String']>;
  schedule_type?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
};

export type ScheduleOptionResult = {
  __typename?: 'scheduleOptionResult';
  cron_expression?: Maybe<Scalars['String']>;
  schedule_frequency?: Maybe<Scalars['String']>;
  schedule_id?: Maybe<Scalars['String']>;
  schedule_type?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type ShowLbDetailsResponse = {
  __typename?: 'showLbDetailsResponse';
  liverboadVerifiedDate?: Maybe<Scalars['Float']>;
  requestedDate?: Maybe<Scalars['Float']>;
  requester?: Maybe<Scalars['String']>;
  requestorId?: Maybe<Scalars['String']>;
  verifier?: Maybe<Scalars['String']>;
  verifierId?: Maybe<Scalars['String']>;
};

export type TableList = {
  __typename?: 'tableList';
  /** Author of the table */
  author?: Maybe<UserNameAndId>;
  /** Date and time when the table was created */
  created?: Maybe<Scalars['String']>;
  /** Name of the database to which the table belongs */
  databaseStripe?: Maybe<Scalars['String']>;
  generationNum?: Maybe<Scalars['Float']>;
  /** GUID of the table */
  id?: Maybe<Scalars['String']>;
  indexVersion?: Maybe<Scalars['Float']>;
  /** Indicates if the table is deleted */
  isDeleted?: Maybe<Scalars['Boolean']>;
  /** Indicates if the table is deprecated */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  isExternal?: Maybe<Scalars['Boolean']>;
  /** Indicates if the table is hideen */
  isHidden?: Maybe<Scalars['Boolean']>;
  /** Date and time of last modification of the table */
  modified?: Maybe<Scalars['String']>;
  /** The user which last modified the table details */
  modifiedBy?: Maybe<UserNameAndId>;
  /** Name of the table */
  name?: Maybe<Scalars['String']>;
  /** The owner of the tabe */
  owner?: Maybe<UserNameAndId>;
  /** Name of the schema to which the table belongs */
  schemaStripe?: Maybe<Scalars['String']>;
  /** List of tags assigned to the table */
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Type of the table */
  type?: Maybe<Scalars['String']>;
};

export type Util_CardinalityEstimatorProto = {
  __typename?: 'util_CardinalityEstimatorProto';
  maxTrailingZeroes?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type TagFragment = { __typename?: 'Tag', id: string, name: string, author: string, created?: any | null, modified?: any | null, color?: string | null };

export type MetadataFragment = { __typename?: 'Metadata', id: string, name: string, authorName?: string | null, created?: number | null, modified?: number | null, isExternal?: boolean | null, isDeprecated?: boolean | null, aiAnswerGenerationDisabled?: boolean | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string, author: string, created?: any | null, modified?: any | null, color?: string | null }> | null };

export type GetSourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSourcesQuery = { __typename?: 'Query', getSourcesList: { __typename?: 'SourceByType', worksheets?: Array<{ __typename?: 'Metadata', id: string, name: string, authorName?: string | null, created?: number | null, modified?: number | null, isExternal?: boolean | null, isDeprecated?: boolean | null, aiAnswerGenerationDisabled?: boolean | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string, author: string, created?: any | null, modified?: any | null, color?: string | null }> | null }> | null, views?: Array<{ __typename?: 'Metadata', id: string, name: string, authorName?: string | null, created?: number | null, modified?: number | null, isExternal?: boolean | null, isDeprecated?: boolean | null, aiAnswerGenerationDisabled?: boolean | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string, author: string, created?: any | null, modified?: any | null, color?: string | null }> | null }> | null, imported?: Array<{ __typename?: 'Metadata', id: string, name: string, authorName?: string | null, created?: number | null, modified?: number | null, isExternal?: boolean | null, isDeprecated?: boolean | null, aiAnswerGenerationDisabled?: boolean | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string, author: string, created?: any | null, modified?: any | null, color?: string | null }> | null }> | null, tables?: Array<{ __typename?: 'Metadata', id: string, name: string, authorName?: string | null, created?: number | null, modified?: number | null, isExternal?: boolean | null, isDeprecated?: boolean | null, aiAnswerGenerationDisabled?: boolean | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string, author: string, created?: any | null, modified?: any | null, color?: string | null }> | null }> | null }, getTagsList: { __typename?: 'Tags', tags?: Array<{ __typename?: 'Tag', id: string, name: string, author: string, created?: any | null, modified?: any | null, color?: string | null }> | null } };

export type GetTagDetailsQueryVariables = Exact<{
  ids: Array<Scalars['GUID']> | Scalars['GUID'];
}>;


export type GetTagDetailsQuery = { __typename?: 'Query', getSourceDetailById: Array<{ __typename?: 'SourceDetail', id: string, name: string }> };

export type RecentlyViewedQueryVariables = Exact<{
  param: MetadataListParamsInput;
  types: Array<Scalars['String']> | Scalars['String'];
}>;


export type RecentlyViewedQuery = { __typename?: 'Query', Metadata__recentlyViewed?: { [key: string]: any } | null };

export type HeaderFragment = { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null };

export type UsageInfoFragment = { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null };

export type VisualizationMetadataFragment = { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null };

export type WorksheetInfoFragment = { __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null };

export type EurekaAnswerFragment = { __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null };

export type EurekaSearchTokenFragment = { __typename?: 'eureka_EurekaSearchToken', value?: string | null, guid?: string | null, type?: Eureka_EurekaSearchToken_Type | null, highlights?: Array<{ __typename?: 'eureka_EurekaSearchToken_Range', start?: number | null, end?: number | null } | null> | null };

export type EurekaResultsFragment = { __typename?: 'eureka_SearchResponse', version?: string | null, nextPageOffset?: number | null, batchSizeRequired?: number | null, isFinalPage?: boolean | null, totalResults?: number | null, totalFacetResultCount?: number | null, facets?: Array<{ __typename?: 'eureka_Facet', facetType?: Eureka_FacetType | null, facetValue?: Array<string | null> | null, facetValues?: Array<{ __typename?: 'eureka_FacetValue', id?: string | null, resultCount?: number | null, name?: string | null } | null> | null } | null> | null, requestIdentifiers?: { __typename?: 'eureka_common_HttpClientRequestIdentifiers', apiRequestId?: string | null, appActivityId?: string | null } | null, sageQuerySuggestions?: Array<{ __typename?: 'eureka_SageQuerySuggestion', tokens?: Array<string | null> | null, tmlTokens?: Array<string | null> | null, worksheetId?: string | null, description?: string | null, title?: string | null } | null> | null, results?: Array<{ __typename?: 'eureka_Result', score?: number | null, debugInfo?: Array<string | null> | null, resultType?: Eureka_Result_ResultType | null, sageQuery?: string | null, objectSecurityInfo?: { __typename?: 'eureka_Result_ObjectSecurityInfo', objectType?: string | null, objectId?: string | null, objectIdForDeletionCheck?: string | null, objectTypeForDeletionCheck?: string | null, isD13ySourced?: boolean | null, offset?: number | null } | null, searchAnswer?: { __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null } | null, searchPinboardViz?: { __typename?: 'eureka_PinboardVizResult', answer?: { __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null } | null, pinboardHeader?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null } | null } | null, searchPinboard?: { __typename?: 'eureka_PinboardResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, answers?: Array<{ __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null } | null> | null, vizCount?: { __typename?: 'eureka_VizCount', charts?: number | null, metrics?: number | null, tables?: number | null } | null } | null, snippetInfo?: { __typename?: 'eureka_SnippetInfo', titleSnippet?: { __typename?: 'eureka_SnippetInfo_Snippet', snippetString?: string | null, highlights?: Array<{ __typename?: 'eureka_SnippetInfo_Range', start?: number | null, end?: number | null } | null> | null } | null, descriptionSnippet?: { __typename?: 'eureka_SnippetInfo_Snippet', snippetString?: string | null, highlights?: Array<{ __typename?: 'eureka_SnippetInfo_Range', start?: number | null, end?: number | null } | null> | null } | null, sageQuerySnippet?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, dataType?: Falcon_DataType_E | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null, sageQuerySnippetWithHighlights?: Array<{ __typename?: 'eureka_SnippetInfo_SageSnippet', phraseType?: Sage_PhraseType_E | null, phraseValue?: string | null, highlights?: Array<{ __typename?: 'eureka_SnippetInfo_Range', start?: number | null, end?: number | null } | null> | null } | null> | null } | null } | null> | null };

export type EurekaCompletionsFragment = { __typename?: 'eureka_CompleteResponse', requestIdentifiers?: { __typename?: 'eureka_common_HttpClientRequestIdentifiers', apiRequestId?: string | null, appActivityId?: string | null } | null, result?: Array<{ __typename?: 'eureka_CompleteResult', viewCount?: number | null, type?: Eureka_CompleteInfo_Type | null, score?: number | null, debugInfo?: string | null, numPrefixTokens?: number | null, numSuffixTokens?: number | null, isRecentlyViewed?: boolean | null, columnResult?: { __typename?: 'eureka_ColumnResult', name?: string | null } | null, columnValueResult?: { __typename?: 'eureka_ColumnValueResult', value?: string | null, name?: string | null } | null, objectResult?: { __typename?: 'eureka_CompleteObjectResult', guid?: string | null, name?: string | null, authorName?: string | null, authorGuid?: string | null, type?: Eureka_CompleteObjectResult_Type | null, parentGuid?: string | null } | null, userResult?: { __typename?: 'eureka_UserResult', name?: string | null, guid?: string | null } | null, token?: { __typename?: 'eureka_EurekaSearchToken', value?: string | null, guid?: string | null, type?: Eureka_EurekaSearchToken_Type | null, highlights?: Array<{ __typename?: 'eureka_EurekaSearchToken_Range', start?: number | null, end?: number | null } | null> | null } | null, objectSecurityInfo?: { __typename?: 'eureka_CompleteResult_ObjectSecurityInfo', objectId?: string | null, objectType?: string | null, objectIdForDeletionCheck?: string | null, objectTypeForDeletionCheck?: string | null, isD13ySourced?: boolean | null } | null } | null> | null, tokens?: Array<{ __typename?: 'eureka_EurekaSearchToken', value?: string | null, guid?: string | null, type?: Eureka_EurekaSearchToken_Type | null, highlights?: Array<{ __typename?: 'eureka_EurekaSearchToken_Range', start?: number | null, end?: number | null } | null> | null } | null> | null, queryResult?: Array<{ __typename?: 'eureka_CompleteQueryResult', query?: string | null, type?: Eureka_CompleteQueryResult_Type | null, fieldName?: string | null, fieldType?: string | null } | null> | null };

export type GetEurekaCompletionsQueryVariables = Exact<{
  params?: InputMaybe<Input_Eureka_CompleteRequest>;
}>;


export type GetEurekaCompletionsQuery = { __typename?: 'Query', queryComplete?: { __typename?: 'eureka_CompleteResponse', requestIdentifiers?: { __typename?: 'eureka_common_HttpClientRequestIdentifiers', apiRequestId?: string | null, appActivityId?: string | null } | null, result?: Array<{ __typename?: 'eureka_CompleteResult', viewCount?: number | null, type?: Eureka_CompleteInfo_Type | null, score?: number | null, debugInfo?: string | null, numPrefixTokens?: number | null, numSuffixTokens?: number | null, isRecentlyViewed?: boolean | null, columnResult?: { __typename?: 'eureka_ColumnResult', name?: string | null } | null, columnValueResult?: { __typename?: 'eureka_ColumnValueResult', value?: string | null, name?: string | null } | null, objectResult?: { __typename?: 'eureka_CompleteObjectResult', guid?: string | null, name?: string | null, authorName?: string | null, authorGuid?: string | null, type?: Eureka_CompleteObjectResult_Type | null, parentGuid?: string | null } | null, userResult?: { __typename?: 'eureka_UserResult', name?: string | null, guid?: string | null } | null, token?: { __typename?: 'eureka_EurekaSearchToken', value?: string | null, guid?: string | null, type?: Eureka_EurekaSearchToken_Type | null, highlights?: Array<{ __typename?: 'eureka_EurekaSearchToken_Range', start?: number | null, end?: number | null } | null> | null } | null, objectSecurityInfo?: { __typename?: 'eureka_CompleteResult_ObjectSecurityInfo', objectId?: string | null, objectType?: string | null, objectIdForDeletionCheck?: string | null, objectTypeForDeletionCheck?: string | null, isD13ySourced?: boolean | null } | null } | null> | null, tokens?: Array<{ __typename?: 'eureka_EurekaSearchToken', value?: string | null, guid?: string | null, type?: Eureka_EurekaSearchToken_Type | null, highlights?: Array<{ __typename?: 'eureka_EurekaSearchToken_Range', start?: number | null, end?: number | null } | null> | null } | null> | null, queryResult?: Array<{ __typename?: 'eureka_CompleteQueryResult', query?: string | null, type?: Eureka_CompleteQueryResult_Type | null, fieldName?: string | null, fieldType?: string | null } | null> | null } | null };

export type GetEurekaResultsQueryVariables = Exact<{
  params?: InputMaybe<Input_Eureka_SearchRequest>;
}>;


export type GetEurekaResultsQuery = { __typename?: 'Query', queryRequest?: { __typename?: 'eureka_SearchResponse', version?: string | null, nextPageOffset?: number | null, batchSizeRequired?: number | null, isFinalPage?: boolean | null, totalResults?: number | null, totalFacetResultCount?: number | null, facets?: Array<{ __typename?: 'eureka_Facet', facetType?: Eureka_FacetType | null, facetValue?: Array<string | null> | null, facetValues?: Array<{ __typename?: 'eureka_FacetValue', id?: string | null, resultCount?: number | null, name?: string | null } | null> | null } | null> | null, requestIdentifiers?: { __typename?: 'eureka_common_HttpClientRequestIdentifiers', apiRequestId?: string | null, appActivityId?: string | null } | null, sageQuerySuggestions?: Array<{ __typename?: 'eureka_SageQuerySuggestion', tokens?: Array<string | null> | null, tmlTokens?: Array<string | null> | null, worksheetId?: string | null, description?: string | null, title?: string | null } | null> | null, results?: Array<{ __typename?: 'eureka_Result', score?: number | null, debugInfo?: Array<string | null> | null, resultType?: Eureka_Result_ResultType | null, sageQuery?: string | null, objectSecurityInfo?: { __typename?: 'eureka_Result_ObjectSecurityInfo', objectType?: string | null, objectId?: string | null, objectIdForDeletionCheck?: string | null, objectTypeForDeletionCheck?: string | null, isD13ySourced?: boolean | null, offset?: number | null } | null, searchAnswer?: { __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null } | null, searchPinboardViz?: { __typename?: 'eureka_PinboardVizResult', answer?: { __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null } | null, pinboardHeader?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null } | null } | null, searchPinboard?: { __typename?: 'eureka_PinboardResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, answers?: Array<{ __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null } | null> | null, vizCount?: { __typename?: 'eureka_VizCount', charts?: number | null, metrics?: number | null, tables?: number | null } | null } | null, snippetInfo?: { __typename?: 'eureka_SnippetInfo', titleSnippet?: { __typename?: 'eureka_SnippetInfo_Snippet', snippetString?: string | null, highlights?: Array<{ __typename?: 'eureka_SnippetInfo_Range', start?: number | null, end?: number | null } | null> | null } | null, descriptionSnippet?: { __typename?: 'eureka_SnippetInfo_Snippet', snippetString?: string | null, highlights?: Array<{ __typename?: 'eureka_SnippetInfo_Range', start?: number | null, end?: number | null } | null> | null } | null, sageQuerySnippet?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, dataType?: Falcon_DataType_E | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null, sageQuerySnippetWithHighlights?: Array<{ __typename?: 'eureka_SnippetInfo_SageSnippet', phraseType?: Sage_PhraseType_E | null, phraseValue?: string | null, highlights?: Array<{ __typename?: 'eureka_SnippetInfo_Range', start?: number | null, end?: number | null } | null> | null } | null> | null } | null } | null> | null } | null };

export type GetEurekaResultsForSourceOverviewQueryVariables = Exact<{
  params?: InputMaybe<Input_Eureka_SearchRequest>;
}>;


export type GetEurekaResultsForSourceOverviewQuery = { __typename?: 'Query', queryRequest?: { __typename?: 'eureka_SearchResponse', version?: string | null, nextPageOffset?: number | null, batchSizeRequired?: number | null, isFinalPage?: boolean | null, totalResults?: number | null, totalFacetResultCount?: number | null, facets?: Array<{ __typename?: 'eureka_Facet', facetType?: Eureka_FacetType | null, facetValue?: Array<string | null> | null, facetValues?: Array<{ __typename?: 'eureka_FacetValue', id?: string | null, resultCount?: number | null, name?: string | null } | null> | null } | null> | null, requestIdentifiers?: { __typename?: 'eureka_common_HttpClientRequestIdentifiers', apiRequestId?: string | null, appActivityId?: string | null } | null, sageQuerySuggestions?: Array<{ __typename?: 'eureka_SageQuerySuggestion', tokens?: Array<string | null> | null, tmlTokens?: Array<string | null> | null, worksheetId?: string | null, description?: string | null, title?: string | null } | null> | null, results?: Array<{ __typename?: 'eureka_Result', score?: number | null, debugInfo?: Array<string | null> | null, resultType?: Eureka_Result_ResultType | null, sageQuery?: string | null, objectSecurityInfo?: { __typename?: 'eureka_Result_ObjectSecurityInfo', objectType?: string | null, objectId?: string | null, objectIdForDeletionCheck?: string | null, objectTypeForDeletionCheck?: string | null, isD13ySourced?: boolean | null, offset?: number | null } | null, searchAnswer?: { __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null } | null, searchPinboardViz?: { __typename?: 'eureka_PinboardVizResult', answer?: { __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null } | null, pinboardHeader?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null } | null } | null, searchPinboard?: { __typename?: 'eureka_PinboardResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, answers?: Array<{ __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null } | null> | null, vizCount?: { __typename?: 'eureka_VizCount', charts?: number | null, metrics?: number | null, tables?: number | null } | null } | null, snippetInfo?: { __typename?: 'eureka_SnippetInfo', titleSnippet?: { __typename?: 'eureka_SnippetInfo_Snippet', snippetString?: string | null, highlights?: Array<{ __typename?: 'eureka_SnippetInfo_Range', start?: number | null, end?: number | null } | null> | null } | null, descriptionSnippet?: { __typename?: 'eureka_SnippetInfo_Snippet', snippetString?: string | null, highlights?: Array<{ __typename?: 'eureka_SnippetInfo_Range', start?: number | null, end?: number | null } | null> | null } | null, sageQuerySnippet?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, dataType?: Falcon_DataType_E | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null, sageQuerySnippetWithHighlights?: Array<{ __typename?: 'eureka_SnippetInfo_SageSnippet', phraseType?: Sage_PhraseType_E | null, phraseValue?: string | null, highlights?: Array<{ __typename?: 'eureka_SnippetInfo_Range', start?: number | null, end?: number | null } | null> | null } | null> | null } | null } | null> | null } | null };

export type GetEurekaVizSnapshotsQueryVariables = Exact<{
  id: Scalars['String'];
  reportBookId: Scalars['String'];
  reportBookType: Scalars['String'];
  version: Scalars['Int'];
}>;


export type GetEurekaVizSnapshotsQuery = { __typename?: 'Query', getEurekaVizSnapshot?: { __typename?: 'EurekaVizSnapshot', id?: string | null, vizContent?: string | null, snapshotType?: SnapshotType | null, createdMs?: number | null } | null };

export type GetEurekaVizSnapshotStatusQueryVariables = Exact<{
  snapshotStatusRequests: Array<SnapshotStatusRequestData> | SnapshotStatusRequestData;
}>;


export type GetEurekaVizSnapshotStatusQuery = { __typename?: 'Query', getEurekaVizSnapshotStatus?: Array<{ __typename?: 'EurekaVizSnapshotStatus', id?: string | null } | null> | null };

export type GetAuthorNamesListQueryVariables = Exact<{
  params?: InputMaybe<MetadataListParamsInput>;
}>;


export type GetAuthorNamesListQuery = { __typename?: 'Query', getUsersList: { __typename?: 'MetadataList', objects?: Array<{ __typename?: 'Metadata', id: string, displayName?: string | null }> | null } };

export type GetTagsListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsListQuery = { __typename?: 'Query', getTagsList: { __typename?: 'Tags', tags?: Array<{ __typename?: 'Tag', id: string, name: string, color?: string | null, author: string }> | null } };

export type GetTrendingListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrendingListQuery = { __typename?: 'Query', getTrendingList: { __typename?: 'Trending', pinboards?: Array<{ __typename?: 'TrendingItem', id?: string | null, type?: string | null, author?: string | null, authorDisplayName?: string | null, authorName?: string | null, name?: string | null, stats?: { __typename?: 'TrendingStats', views?: number | null } | null }> | null, answers?: Array<{ __typename?: 'TrendingItem', id?: string | null, type?: string | null, author?: string | null, authorDisplayName?: string | null, authorName?: string | null, name?: string | null, stats?: { __typename?: 'TrendingStats', views?: number | null } | null }> | null } };

export type GetUnresolvedTokensQueryVariables = Exact<{
  params?: InputMaybe<Input_Eureka_Agent_TokensRequest>;
}>;


export type GetUnresolvedTokensQuery = { __typename?: 'Query', getTokenQuery?: { __typename?: 'eureka_agent_TokensResponse', tokenType?: Eureka_Agent_TokenType | null, tokens?: Array<{ __typename?: 'eureka_agent_TokenInfo', queryCount?: number | null, tokenValue?: string | null, userCount?: number | null, queries?: Array<{ __typename?: 'eureka_agent_Query', count?: number | null, text?: string | null } | null> | null } | null> | null } | null };

export type ResolveTokenMutationVariables = Exact<{
  params?: InputMaybe<Input_Eureka_Agent_ResolveTokenRequest>;
}>;


export type ResolveTokenMutation = { __typename?: 'Mutation', resolveTokenMutation?: { __typename?: 'eureka_agent_ResolveTokenResponse', status?: Eureka_Agent_ResolveTokenResponse_Status | null } | null };

export type UpdateEurekaSearchMutationVariables = Exact<{
  params?: InputMaybe<Input_Eureka_SearchRequest>;
}>;


export type UpdateEurekaSearchMutation = { __typename?: 'Mutation', mutationRequest?: { __typename?: 'eureka_SearchResponse', version?: string | null, nextPageOffset?: number | null, batchSizeRequired?: number | null, isFinalPage?: boolean | null, totalResults?: number | null, totalFacetResultCount?: number | null, facets?: Array<{ __typename?: 'eureka_Facet', facetType?: Eureka_FacetType | null, facetValue?: Array<string | null> | null, facetValues?: Array<{ __typename?: 'eureka_FacetValue', id?: string | null, resultCount?: number | null, name?: string | null } | null> | null } | null> | null, requestIdentifiers?: { __typename?: 'eureka_common_HttpClientRequestIdentifiers', apiRequestId?: string | null, appActivityId?: string | null } | null, sageQuerySuggestions?: Array<{ __typename?: 'eureka_SageQuerySuggestion', tokens?: Array<string | null> | null, tmlTokens?: Array<string | null> | null, worksheetId?: string | null, description?: string | null, title?: string | null } | null> | null, results?: Array<{ __typename?: 'eureka_Result', score?: number | null, debugInfo?: Array<string | null> | null, resultType?: Eureka_Result_ResultType | null, sageQuery?: string | null, objectSecurityInfo?: { __typename?: 'eureka_Result_ObjectSecurityInfo', objectType?: string | null, objectId?: string | null, objectIdForDeletionCheck?: string | null, objectTypeForDeletionCheck?: string | null, isD13ySourced?: boolean | null, offset?: number | null } | null, searchAnswer?: { __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null } | null, searchPinboardViz?: { __typename?: 'eureka_PinboardVizResult', answer?: { __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null } | null, pinboardHeader?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null } | null } | null, searchPinboard?: { __typename?: 'eureka_PinboardResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, answers?: Array<{ __typename?: 'eureka_AnswerResult', header?: { __typename?: 'eureka_Header', id?: string | null, title?: string | null, description?: string | null, authorGuid?: string | null, authorName?: string | null, createdOn?: any | null, tagIds?: Array<string | null> | null } | null, usageInfo?: { __typename?: 'eureka_UsageInfo', favouriteCount?: number | null, viewCount?: number | null } | null, preferredViz?: { __typename?: 'eureka_VisualizationMetadata', vizType?: string | null, chartType?: Callosum_VisualizationProto_ChartVisualizationContentProto_ChartTypeEnumProto | null, vizSnapshotRequestData?: { __typename?: 'eureka_VizSnapshotRequestData', parentReportbookGuid?: string | null, parentType?: Eureka_ParentType | null, version?: number | null, vizGuid?: string | null } | null } | null, worksheetInfo?: Array<{ __typename?: 'eureka_WorksheetInfo', id?: string | null, name?: string | null } | null> | null, formatted?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null } | null> | null, vizCount?: { __typename?: 'eureka_VizCount', charts?: number | null, metrics?: number | null, tables?: number | null } | null } | null, snippetInfo?: { __typename?: 'eureka_SnippetInfo', titleSnippet?: { __typename?: 'eureka_SnippetInfo_Snippet', snippetString?: string | null, highlights?: Array<{ __typename?: 'eureka_SnippetInfo_Range', start?: number | null, end?: number | null } | null> | null } | null, descriptionSnippet?: { __typename?: 'eureka_SnippetInfo_Snippet', snippetString?: string | null, highlights?: Array<{ __typename?: 'eureka_SnippetInfo_Range', start?: number | null, end?: number | null } | null> | null } | null, sageQuerySnippet?: { __typename?: 'sage_auto_complete_v2_FormattedTokens', phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', isCompletePhrase?: boolean | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null, startIndex?: number | null } | null> | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, dataType?: Falcon_DataType_E | null, typeEnum?: Sage_TokenType_E | null } | null> | null } | null, sageQuerySnippetWithHighlights?: Array<{ __typename?: 'eureka_SnippetInfo_SageSnippet', phraseType?: Sage_PhraseType_E | null, phraseValue?: string | null, highlights?: Array<{ __typename?: 'eureka_SnippetInfo_Range', start?: number | null, end?: number | null } | null> | null } | null> | null } | null } | null> | null } | null };

export type UpdateEurekaCompletionsMutationVariables = Exact<{
  params?: InputMaybe<Input_Eureka_CompleteRequest>;
}>;


export type UpdateEurekaCompletionsMutation = { __typename?: 'Mutation', mutationComplete?: { __typename?: 'eureka_CompleteResponse', requestIdentifiers?: { __typename?: 'eureka_common_HttpClientRequestIdentifiers', apiRequestId?: string | null, appActivityId?: string | null } | null, result?: Array<{ __typename?: 'eureka_CompleteResult', viewCount?: number | null, type?: Eureka_CompleteInfo_Type | null, score?: number | null, debugInfo?: string | null, numPrefixTokens?: number | null, numSuffixTokens?: number | null, isRecentlyViewed?: boolean | null, columnResult?: { __typename?: 'eureka_ColumnResult', name?: string | null } | null, columnValueResult?: { __typename?: 'eureka_ColumnValueResult', value?: string | null, name?: string | null } | null, objectResult?: { __typename?: 'eureka_CompleteObjectResult', guid?: string | null, name?: string | null, authorName?: string | null, authorGuid?: string | null, type?: Eureka_CompleteObjectResult_Type | null, parentGuid?: string | null } | null, userResult?: { __typename?: 'eureka_UserResult', name?: string | null, guid?: string | null } | null, token?: { __typename?: 'eureka_EurekaSearchToken', value?: string | null, guid?: string | null, type?: Eureka_EurekaSearchToken_Type | null, highlights?: Array<{ __typename?: 'eureka_EurekaSearchToken_Range', start?: number | null, end?: number | null } | null> | null } | null, objectSecurityInfo?: { __typename?: 'eureka_CompleteResult_ObjectSecurityInfo', objectId?: string | null, objectType?: string | null, objectIdForDeletionCheck?: string | null, objectTypeForDeletionCheck?: string | null, isD13ySourced?: boolean | null } | null } | null> | null, tokens?: Array<{ __typename?: 'eureka_EurekaSearchToken', value?: string | null, guid?: string | null, type?: Eureka_EurekaSearchToken_Type | null, highlights?: Array<{ __typename?: 'eureka_EurekaSearchToken_Range', start?: number | null, end?: number | null } | null> | null } | null> | null, queryResult?: Array<{ __typename?: 'eureka_CompleteQueryResult', query?: string | null, type?: Eureka_CompleteQueryResult_Type | null, fieldName?: string | null, fieldType?: string | null } | null> | null } | null };

export type ShareRelevanceFeedbackMutationVariables = Exact<{
  request?: InputMaybe<Input_Eureka_RelevanceFeedbackRequest>;
}>;


export type ShareRelevanceFeedbackMutation = { __typename?: 'Mutation', mutationRelevanceFeedback?: { __typename?: 'eureka_RelevanceFeedbackResponse', status?: { __typename?: 'common_StatusProto', code?: Common_ErrorCode | null, message?: string | null } | null } | null };

export type GetSeedQuestionsQueryVariables = Exact<{
  dataSourceId: Scalars['String'];
  aiQuestionCount: Scalars['Int'];
  regenerate?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetSeedQuestionsQuery = { __typename?: 'Query', getSeedQuestions?: { __typename?: 'SeedQuestionsResponse', questions: Array<{ __typename?: 'SeedQuestion', questionId?: string | null, questionText?: string | null, sageQuery?: string | null } | null> } | null };

export type GetQuestionFragmentsQueryVariables = Exact<{
  request?: InputMaybe<Input_Eureka_GetQuestionFragmentsRequest>;
}>;


export type GetQuestionFragmentsQuery = { __typename?: 'Query', queryGetQuestionFragments?: { __typename?: 'eureka_GetQuestionFragmentsResponse', worksheetId?: string | null, fragmentPayload?: Array<{ __typename?: 'eureka_FragmentPayload', isSubmitted?: boolean | null, nlQueryFragment?: string | null, rating?: Eureka_SearchResultRelevanceFeedback_Rating | null, sqlQuery?: string | null, sessionId?: string | null, genNo?: number | null, token?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, dataType?: Falcon_DataType_E | null, typeEnum?: Sage_TokenType_E | null } | null> | null, phrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', startIndex?: number | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null } | null> | null } | null> | null } | null };

export type GetNlQueryFeedbackQueryVariables = Exact<{
  request?: InputMaybe<Input_Eureka_GetNlQueryFeedbackRequest>;
}>;


export type GetNlQueryFeedbackQuery = { __typename?: 'Query', queryGetNlQueryFeedback?: { __typename?: 'eureka_GetNlQueryFeedbackResponse', nlQueryInfo?: Array<{ __typename?: 'eureka_NlQueryInfo', nlQuery?: string | null, upvoteCount?: any | null, downvoteCount?: any | null, reviewerId?: string | null, scope?: Eureka_FeedbackScope | null, parentQuery?: Array<string | null> | null, id?: Array<string | null> | null, modifiedAt?: any | null, tmlTokensUsed?: Array<string | null> | null, fixedPhrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', startIndex?: number | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null } | null> | null, fixedToken?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, dataType?: Falcon_DataType_E | null, typeEnum?: Sage_TokenType_E | null } | null> | null, originalPhrase?: Array<{ __typename?: 'sage_auto_complete_v2_PhraseDefinition', startIndex?: number | null, numTokens?: number | null, phraseType?: Sage_PhraseType_E | null } | null> | null, originalToken?: Array<{ __typename?: 'sage_auto_complete_v2_RecognizedToken', token?: string | null, dataType?: Falcon_DataType_E | null, typeEnum?: Sage_TokenType_E | null } | null> | null, user?: { __typename?: 'sage_EntityHeader', guid?: string | null, name?: string | null } | null, worksheet?: { __typename?: 'sage_EntityHeader', guid?: string | null, name?: string | null } | null } | null> | null } | null };

export type UpdateNlQueryFeedbackMutationVariables = Exact<{
  request?: InputMaybe<Input_Eureka_PutNlQueryFeedbackRequest>;
}>;


export type UpdateNlQueryFeedbackMutation = { __typename?: 'Mutation', mutationPutNlQueryFeedback?: { __typename?: 'eureka_PutNlQueryFeedbackResponse', isUpdated?: boolean | null } | null };

export type DeleteNlQueryFeedbackMutationVariables = Exact<{
  request?: InputMaybe<Input_Eureka_PutNlQueryFeedbackRequest>;
}>;


export type DeleteNlQueryFeedbackMutation = { __typename?: 'Mutation', mutationPutNlQueryFeedback?: { __typename?: 'eureka_PutNlQueryFeedbackResponse', isDeleted?: boolean | null } | null };

export const TagFragmentDoc = gql`
    fragment tag on Tag {
  id
  name
  author
  created
  modified
  color
}
    `;
export const MetadataFragmentDoc = gql`
    fragment metadata on Metadata {
  id
  name
  authorName
  created
  modified
  isExternal
  isDeprecated
  aiAnswerGenerationDisabled
  tags {
    ...tag
  }
}
    ${TagFragmentDoc}`;
export const HeaderFragmentDoc = gql`
    fragment header on eureka_Header {
  id
  title
  description
  authorGuid
  authorName
  createdOn
  tagIds
}
    `;
export const UsageInfoFragmentDoc = gql`
    fragment usageInfo on eureka_UsageInfo {
  favouriteCount
  viewCount
}
    `;
export const VisualizationMetadataFragmentDoc = gql`
    fragment visualizationMetadata on eureka_VisualizationMetadata {
  vizType
  chartType
  vizSnapshotRequestData {
    parentReportbookGuid
    parentType
    version
    vizGuid
  }
}
    `;
export const WorksheetInfoFragmentDoc = gql`
    fragment worksheetInfo on eureka_WorksheetInfo {
  id
  name
}
    `;
export const EurekaAnswerFragmentDoc = gql`
    fragment eurekaAnswer on eureka_AnswerResult {
  header {
    ...header
  }
  usageInfo {
    ...usageInfo
  }
  preferredViz {
    ...visualizationMetadata
  }
  worksheetInfo {
    ...worksheetInfo
  }
  formatted {
    phrase {
      isCompletePhrase
      numTokens
      phraseType
      startIndex
    }
    token {
      token
      typeEnum
    }
  }
}
    ${HeaderFragmentDoc}
${UsageInfoFragmentDoc}
${VisualizationMetadataFragmentDoc}
${WorksheetInfoFragmentDoc}`;
export const EurekaResultsFragmentDoc = gql`
    fragment eurekaResults on eureka_SearchResponse {
  facets {
    facetType
    facetValue
    facetValues {
      id
      resultCount
      name
    }
  }
  requestIdentifiers {
    apiRequestId
    appActivityId
  }
  sageQuerySuggestions {
    tokens
    tmlTokens
    worksheetId
    description
    title
    tmlTokens
  }
  results {
    objectSecurityInfo {
      objectType
      objectId
      objectIdForDeletionCheck
      objectTypeForDeletionCheck
      isD13ySourced
      offset
    }
    searchAnswer {
      ...eurekaAnswer
    }
    searchPinboardViz {
      answer {
        ...eurekaAnswer
      }
      pinboardHeader {
        id
        title
      }
    }
    searchPinboard {
      header {
        ...header
      }
      usageInfo {
        ...usageInfo
      }
      answers {
        ...eurekaAnswer
      }
      vizCount {
        charts
        metrics
        tables
      }
    }
    snippetInfo {
      titleSnippet {
        snippetString
        highlights {
          start
          end
        }
      }
      descriptionSnippet {
        snippetString
        highlights {
          start
          end
        }
      }
      sageQuerySnippet {
        phrase {
          isCompletePhrase
          numTokens
          phraseType
          startIndex
        }
        token {
          token
          dataType
          typeEnum
        }
      }
      sageQuerySnippetWithHighlights {
        highlights {
          start
          end
        }
        phraseType
        phraseValue
      }
    }
    score
    debugInfo
    resultType
    sageQuery
  }
  version
  nextPageOffset
  batchSizeRequired
  isFinalPage
  totalResults
  totalFacetResultCount
}
    ${EurekaAnswerFragmentDoc}
${HeaderFragmentDoc}
${UsageInfoFragmentDoc}`;
export const EurekaSearchTokenFragmentDoc = gql`
    fragment eurekaSearchToken on eureka_EurekaSearchToken {
  value
  guid
  type
  highlights {
    start
    end
  }
}
    `;
export const EurekaCompletionsFragmentDoc = gql`
    fragment eurekaCompletions on eureka_CompleteResponse {
  requestIdentifiers {
    apiRequestId
    appActivityId
  }
  result {
    columnResult {
      name
    }
    columnValueResult {
      value
      name
    }
    objectResult {
      guid
      name
      authorName
      authorGuid
      type
      parentGuid
    }
    userResult {
      name
      guid
    }
    viewCount
    type
    score
    debugInfo
    numPrefixTokens
    token {
      ...eurekaSearchToken
    }
    numSuffixTokens
    objectSecurityInfo {
      objectId
      objectType
      objectIdForDeletionCheck
      objectTypeForDeletionCheck
      isD13ySourced
    }
    isRecentlyViewed
  }
  tokens {
    ...eurekaSearchToken
  }
  queryResult {
    query
    type
    fieldName
    fieldType
  }
}
    ${EurekaSearchTokenFragmentDoc}`;
export const GetSourcesDocument = gql`
    query GetSources {
  getSourcesList {
    worksheets {
      ...metadata
    }
    views {
      ...metadata
    }
    imported {
      ...metadata
    }
    tables {
      ...metadata
    }
  }
  getTagsList {
    tags {
      ...tag
    }
  }
}
    ${MetadataFragmentDoc}
${TagFragmentDoc}`;

/**
 * __useGetSourcesQuery__
 *
 * To run a query within a React component, call `useGetSourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSourcesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSourcesQuery(baseOptions?: Apollo.QueryHookOptions<GetSourcesQuery, GetSourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSourcesQuery, GetSourcesQueryVariables>(GetSourcesDocument, options);
      }
export function useGetSourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSourcesQuery, GetSourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSourcesQuery, GetSourcesQueryVariables>(GetSourcesDocument, options);
        }
export type GetSourcesQueryHookResult = ReturnType<typeof useGetSourcesQuery>;
export type GetSourcesLazyQueryHookResult = ReturnType<typeof useGetSourcesLazyQuery>;
export type GetSourcesQueryResult = Apollo.QueryResult<GetSourcesQuery, GetSourcesQueryVariables>;
export const GetTagDetailsDocument = gql`
    query GetTagDetails($ids: [GUID!]!) {
  getSourceDetailById(ids: $ids, type: TAG) {
    id
    name
  }
}
    `;

/**
 * __useGetTagDetailsQuery__
 *
 * To run a query within a React component, call `useGetTagDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagDetailsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetTagDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetTagDetailsQuery, GetTagDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagDetailsQuery, GetTagDetailsQueryVariables>(GetTagDetailsDocument, options);
      }
export function useGetTagDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagDetailsQuery, GetTagDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagDetailsQuery, GetTagDetailsQueryVariables>(GetTagDetailsDocument, options);
        }
export type GetTagDetailsQueryHookResult = ReturnType<typeof useGetTagDetailsQuery>;
export type GetTagDetailsLazyQueryHookResult = ReturnType<typeof useGetTagDetailsLazyQuery>;
export type GetTagDetailsQueryResult = Apollo.QueryResult<GetTagDetailsQuery, GetTagDetailsQueryVariables>;
export const RecentlyViewedDocument = gql`
    query RecentlyViewed($param: MetadataListParamsInput!, $types: [String!]!) {
  Metadata__recentlyViewed(params: $param, types: $types)
}
    `;

/**
 * __useRecentlyViewedQuery__
 *
 * To run a query within a React component, call `useRecentlyViewedQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentlyViewedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentlyViewedQuery({
 *   variables: {
 *      param: // value for 'param'
 *      types: // value for 'types'
 *   },
 * });
 */
export function useRecentlyViewedQuery(baseOptions: Apollo.QueryHookOptions<RecentlyViewedQuery, RecentlyViewedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentlyViewedQuery, RecentlyViewedQueryVariables>(RecentlyViewedDocument, options);
      }
export function useRecentlyViewedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentlyViewedQuery, RecentlyViewedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentlyViewedQuery, RecentlyViewedQueryVariables>(RecentlyViewedDocument, options);
        }
export type RecentlyViewedQueryHookResult = ReturnType<typeof useRecentlyViewedQuery>;
export type RecentlyViewedLazyQueryHookResult = ReturnType<typeof useRecentlyViewedLazyQuery>;
export type RecentlyViewedQueryResult = Apollo.QueryResult<RecentlyViewedQuery, RecentlyViewedQueryVariables>;
export const GetEurekaCompletionsDocument = gql`
    query GetEurekaCompletions($params: Input_eureka_CompleteRequest) {
  queryComplete(request: $params) {
    ...eurekaCompletions
  }
}
    ${EurekaCompletionsFragmentDoc}`;

/**
 * __useGetEurekaCompletionsQuery__
 *
 * To run a query within a React component, call `useGetEurekaCompletionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEurekaCompletionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEurekaCompletionsQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetEurekaCompletionsQuery(baseOptions?: Apollo.QueryHookOptions<GetEurekaCompletionsQuery, GetEurekaCompletionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEurekaCompletionsQuery, GetEurekaCompletionsQueryVariables>(GetEurekaCompletionsDocument, options);
      }
export function useGetEurekaCompletionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEurekaCompletionsQuery, GetEurekaCompletionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEurekaCompletionsQuery, GetEurekaCompletionsQueryVariables>(GetEurekaCompletionsDocument, options);
        }
export type GetEurekaCompletionsQueryHookResult = ReturnType<typeof useGetEurekaCompletionsQuery>;
export type GetEurekaCompletionsLazyQueryHookResult = ReturnType<typeof useGetEurekaCompletionsLazyQuery>;
export type GetEurekaCompletionsQueryResult = Apollo.QueryResult<GetEurekaCompletionsQuery, GetEurekaCompletionsQueryVariables>;
export const GetEurekaResultsDocument = gql`
    query GetEurekaResults($params: Input_eureka_SearchRequest) {
  queryRequest(request: $params) {
    ...eurekaResults
  }
}
    ${EurekaResultsFragmentDoc}`;

/**
 * __useGetEurekaResultsQuery__
 *
 * To run a query within a React component, call `useGetEurekaResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEurekaResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEurekaResultsQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetEurekaResultsQuery(baseOptions?: Apollo.QueryHookOptions<GetEurekaResultsQuery, GetEurekaResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEurekaResultsQuery, GetEurekaResultsQueryVariables>(GetEurekaResultsDocument, options);
      }
export function useGetEurekaResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEurekaResultsQuery, GetEurekaResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEurekaResultsQuery, GetEurekaResultsQueryVariables>(GetEurekaResultsDocument, options);
        }
export type GetEurekaResultsQueryHookResult = ReturnType<typeof useGetEurekaResultsQuery>;
export type GetEurekaResultsLazyQueryHookResult = ReturnType<typeof useGetEurekaResultsLazyQuery>;
export type GetEurekaResultsQueryResult = Apollo.QueryResult<GetEurekaResultsQuery, GetEurekaResultsQueryVariables>;
export const GetEurekaResultsForSourceOverviewDocument = gql`
    query GetEurekaResultsForSourceOverview($params: Input_eureka_SearchRequest) {
  queryRequest(request: $params) {
    ...eurekaResults
  }
}
    ${EurekaResultsFragmentDoc}`;

/**
 * __useGetEurekaResultsForSourceOverviewQuery__
 *
 * To run a query within a React component, call `useGetEurekaResultsForSourceOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEurekaResultsForSourceOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEurekaResultsForSourceOverviewQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetEurekaResultsForSourceOverviewQuery(baseOptions?: Apollo.QueryHookOptions<GetEurekaResultsForSourceOverviewQuery, GetEurekaResultsForSourceOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEurekaResultsForSourceOverviewQuery, GetEurekaResultsForSourceOverviewQueryVariables>(GetEurekaResultsForSourceOverviewDocument, options);
      }
export function useGetEurekaResultsForSourceOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEurekaResultsForSourceOverviewQuery, GetEurekaResultsForSourceOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEurekaResultsForSourceOverviewQuery, GetEurekaResultsForSourceOverviewQueryVariables>(GetEurekaResultsForSourceOverviewDocument, options);
        }
export type GetEurekaResultsForSourceOverviewQueryHookResult = ReturnType<typeof useGetEurekaResultsForSourceOverviewQuery>;
export type GetEurekaResultsForSourceOverviewLazyQueryHookResult = ReturnType<typeof useGetEurekaResultsForSourceOverviewLazyQuery>;
export type GetEurekaResultsForSourceOverviewQueryResult = Apollo.QueryResult<GetEurekaResultsForSourceOverviewQuery, GetEurekaResultsForSourceOverviewQueryVariables>;
export const GetEurekaVizSnapshotsDocument = gql`
    query GetEurekaVizSnapshots($id: String!, $reportBookId: String!, $reportBookType: String!, $version: Int!) {
  getEurekaVizSnapshot(
    id: $id
    reportBookId: $reportBookId
    reportBookType: $reportBookType
    version: $version
  ) {
    id
    vizContent
    snapshotType
    createdMs
  }
}
    `;

/**
 * __useGetEurekaVizSnapshotsQuery__
 *
 * To run a query within a React component, call `useGetEurekaVizSnapshotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEurekaVizSnapshotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEurekaVizSnapshotsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      reportBookId: // value for 'reportBookId'
 *      reportBookType: // value for 'reportBookType'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useGetEurekaVizSnapshotsQuery(baseOptions: Apollo.QueryHookOptions<GetEurekaVizSnapshotsQuery, GetEurekaVizSnapshotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEurekaVizSnapshotsQuery, GetEurekaVizSnapshotsQueryVariables>(GetEurekaVizSnapshotsDocument, options);
      }
export function useGetEurekaVizSnapshotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEurekaVizSnapshotsQuery, GetEurekaVizSnapshotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEurekaVizSnapshotsQuery, GetEurekaVizSnapshotsQueryVariables>(GetEurekaVizSnapshotsDocument, options);
        }
export type GetEurekaVizSnapshotsQueryHookResult = ReturnType<typeof useGetEurekaVizSnapshotsQuery>;
export type GetEurekaVizSnapshotsLazyQueryHookResult = ReturnType<typeof useGetEurekaVizSnapshotsLazyQuery>;
export type GetEurekaVizSnapshotsQueryResult = Apollo.QueryResult<GetEurekaVizSnapshotsQuery, GetEurekaVizSnapshotsQueryVariables>;
export const GetEurekaVizSnapshotStatusDocument = gql`
    query GetEurekaVizSnapshotStatus($snapshotStatusRequests: [SnapshotStatusRequestData!]!) {
  getEurekaVizSnapshotStatus(snapshotStatusRequests: $snapshotStatusRequests) {
    id
  }
}
    `;

/**
 * __useGetEurekaVizSnapshotStatusQuery__
 *
 * To run a query within a React component, call `useGetEurekaVizSnapshotStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEurekaVizSnapshotStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEurekaVizSnapshotStatusQuery({
 *   variables: {
 *      snapshotStatusRequests: // value for 'snapshotStatusRequests'
 *   },
 * });
 */
export function useGetEurekaVizSnapshotStatusQuery(baseOptions: Apollo.QueryHookOptions<GetEurekaVizSnapshotStatusQuery, GetEurekaVizSnapshotStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEurekaVizSnapshotStatusQuery, GetEurekaVizSnapshotStatusQueryVariables>(GetEurekaVizSnapshotStatusDocument, options);
      }
export function useGetEurekaVizSnapshotStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEurekaVizSnapshotStatusQuery, GetEurekaVizSnapshotStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEurekaVizSnapshotStatusQuery, GetEurekaVizSnapshotStatusQueryVariables>(GetEurekaVizSnapshotStatusDocument, options);
        }
export type GetEurekaVizSnapshotStatusQueryHookResult = ReturnType<typeof useGetEurekaVizSnapshotStatusQuery>;
export type GetEurekaVizSnapshotStatusLazyQueryHookResult = ReturnType<typeof useGetEurekaVizSnapshotStatusLazyQuery>;
export type GetEurekaVizSnapshotStatusQueryResult = Apollo.QueryResult<GetEurekaVizSnapshotStatusQuery, GetEurekaVizSnapshotStatusQueryVariables>;
export const GetAuthorNamesListDocument = gql`
    query GetAuthorNamesList($params: MetadataListParamsInput) {
  getUsersList(params: $params) {
    objects {
      id
      displayName
    }
  }
}
    `;

/**
 * __useGetAuthorNamesListQuery__
 *
 * To run a query within a React component, call `useGetAuthorNamesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorNamesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorNamesListQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetAuthorNamesListQuery(baseOptions?: Apollo.QueryHookOptions<GetAuthorNamesListQuery, GetAuthorNamesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthorNamesListQuery, GetAuthorNamesListQueryVariables>(GetAuthorNamesListDocument, options);
      }
export function useGetAuthorNamesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorNamesListQuery, GetAuthorNamesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthorNamesListQuery, GetAuthorNamesListQueryVariables>(GetAuthorNamesListDocument, options);
        }
export type GetAuthorNamesListQueryHookResult = ReturnType<typeof useGetAuthorNamesListQuery>;
export type GetAuthorNamesListLazyQueryHookResult = ReturnType<typeof useGetAuthorNamesListLazyQuery>;
export type GetAuthorNamesListQueryResult = Apollo.QueryResult<GetAuthorNamesListQuery, GetAuthorNamesListQueryVariables>;
export const GetTagsListDocument = gql`
    query GetTagsList {
  getTagsList {
    tags {
      id
      name
      color
      author
    }
  }
}
    `;

/**
 * __useGetTagsListQuery__
 *
 * To run a query within a React component, call `useGetTagsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsListQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsListQuery, GetTagsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsListQuery, GetTagsListQueryVariables>(GetTagsListDocument, options);
      }
export function useGetTagsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsListQuery, GetTagsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsListQuery, GetTagsListQueryVariables>(GetTagsListDocument, options);
        }
export type GetTagsListQueryHookResult = ReturnType<typeof useGetTagsListQuery>;
export type GetTagsListLazyQueryHookResult = ReturnType<typeof useGetTagsListLazyQuery>;
export type GetTagsListQueryResult = Apollo.QueryResult<GetTagsListQuery, GetTagsListQueryVariables>;
export const GetTrendingListDocument = gql`
    query GetTrendingList {
  getTrendingList {
    pinboards {
      id
      type
      author
      authorDisplayName
      authorName
      name
      stats {
        views
      }
    }
    answers {
      id
      type
      author
      authorDisplayName
      authorName
      name
      stats {
        views
      }
    }
  }
}
    `;

/**
 * __useGetTrendingListQuery__
 *
 * To run a query within a React component, call `useGetTrendingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrendingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrendingListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTrendingListQuery(baseOptions?: Apollo.QueryHookOptions<GetTrendingListQuery, GetTrendingListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTrendingListQuery, GetTrendingListQueryVariables>(GetTrendingListDocument, options);
      }
export function useGetTrendingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrendingListQuery, GetTrendingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTrendingListQuery, GetTrendingListQueryVariables>(GetTrendingListDocument, options);
        }
export type GetTrendingListQueryHookResult = ReturnType<typeof useGetTrendingListQuery>;
export type GetTrendingListLazyQueryHookResult = ReturnType<typeof useGetTrendingListLazyQuery>;
export type GetTrendingListQueryResult = Apollo.QueryResult<GetTrendingListQuery, GetTrendingListQueryVariables>;
export const GetUnresolvedTokensDocument = gql`
    query GetUnresolvedTokens($params: Input_eureka_agent_TokensRequest) {
  getTokenQuery(request: $params) {
    tokenType
    tokens {
      queries {
        count
        text
      }
      queryCount
      tokenValue
      userCount
    }
  }
}
    `;

/**
 * __useGetUnresolvedTokensQuery__
 *
 * To run a query within a React component, call `useGetUnresolvedTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnresolvedTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnresolvedTokensQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetUnresolvedTokensQuery(baseOptions?: Apollo.QueryHookOptions<GetUnresolvedTokensQuery, GetUnresolvedTokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnresolvedTokensQuery, GetUnresolvedTokensQueryVariables>(GetUnresolvedTokensDocument, options);
      }
export function useGetUnresolvedTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnresolvedTokensQuery, GetUnresolvedTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnresolvedTokensQuery, GetUnresolvedTokensQueryVariables>(GetUnresolvedTokensDocument, options);
        }
export type GetUnresolvedTokensQueryHookResult = ReturnType<typeof useGetUnresolvedTokensQuery>;
export type GetUnresolvedTokensLazyQueryHookResult = ReturnType<typeof useGetUnresolvedTokensLazyQuery>;
export type GetUnresolvedTokensQueryResult = Apollo.QueryResult<GetUnresolvedTokensQuery, GetUnresolvedTokensQueryVariables>;
export const ResolveTokenDocument = gql`
    mutation resolveToken($params: Input_eureka_agent_ResolveTokenRequest) {
  resolveTokenMutation(request: $params) {
    status
  }
}
    `;
export type ResolveTokenMutationFn = Apollo.MutationFunction<ResolveTokenMutation, ResolveTokenMutationVariables>;

/**
 * __useResolveTokenMutation__
 *
 * To run a mutation, you first call `useResolveTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResolveTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resolveTokenMutation, { data, loading, error }] = useResolveTokenMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useResolveTokenMutation(baseOptions?: Apollo.MutationHookOptions<ResolveTokenMutation, ResolveTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResolveTokenMutation, ResolveTokenMutationVariables>(ResolveTokenDocument, options);
      }
export type ResolveTokenMutationHookResult = ReturnType<typeof useResolveTokenMutation>;
export type ResolveTokenMutationResult = Apollo.MutationResult<ResolveTokenMutation>;
export type ResolveTokenMutationOptions = Apollo.BaseMutationOptions<ResolveTokenMutation, ResolveTokenMutationVariables>;
export const UpdateEurekaSearchDocument = gql`
    mutation updateEurekaSearch($params: Input_eureka_SearchRequest) {
  mutationRequest(request: $params) {
    ...eurekaResults
  }
}
    ${EurekaResultsFragmentDoc}`;
export type UpdateEurekaSearchMutationFn = Apollo.MutationFunction<UpdateEurekaSearchMutation, UpdateEurekaSearchMutationVariables>;

/**
 * __useUpdateEurekaSearchMutation__
 *
 * To run a mutation, you first call `useUpdateEurekaSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEurekaSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEurekaSearchMutation, { data, loading, error }] = useUpdateEurekaSearchMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUpdateEurekaSearchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEurekaSearchMutation, UpdateEurekaSearchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEurekaSearchMutation, UpdateEurekaSearchMutationVariables>(UpdateEurekaSearchDocument, options);
      }
export type UpdateEurekaSearchMutationHookResult = ReturnType<typeof useUpdateEurekaSearchMutation>;
export type UpdateEurekaSearchMutationResult = Apollo.MutationResult<UpdateEurekaSearchMutation>;
export type UpdateEurekaSearchMutationOptions = Apollo.BaseMutationOptions<UpdateEurekaSearchMutation, UpdateEurekaSearchMutationVariables>;
export const UpdateEurekaCompletionsDocument = gql`
    mutation updateEurekaCompletions($params: Input_eureka_CompleteRequest) {
  mutationComplete(request: $params) {
    ...eurekaCompletions
  }
}
    ${EurekaCompletionsFragmentDoc}`;
export type UpdateEurekaCompletionsMutationFn = Apollo.MutationFunction<UpdateEurekaCompletionsMutation, UpdateEurekaCompletionsMutationVariables>;

/**
 * __useUpdateEurekaCompletionsMutation__
 *
 * To run a mutation, you first call `useUpdateEurekaCompletionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEurekaCompletionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEurekaCompletionsMutation, { data, loading, error }] = useUpdateEurekaCompletionsMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUpdateEurekaCompletionsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEurekaCompletionsMutation, UpdateEurekaCompletionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEurekaCompletionsMutation, UpdateEurekaCompletionsMutationVariables>(UpdateEurekaCompletionsDocument, options);
      }
export type UpdateEurekaCompletionsMutationHookResult = ReturnType<typeof useUpdateEurekaCompletionsMutation>;
export type UpdateEurekaCompletionsMutationResult = Apollo.MutationResult<UpdateEurekaCompletionsMutation>;
export type UpdateEurekaCompletionsMutationOptions = Apollo.BaseMutationOptions<UpdateEurekaCompletionsMutation, UpdateEurekaCompletionsMutationVariables>;
export const ShareRelevanceFeedbackDocument = gql`
    mutation shareRelevanceFeedback($request: Input_eureka_RelevanceFeedbackRequest) {
  mutationRelevanceFeedback(request: $request) {
    status {
      code
      message
    }
  }
}
    `;
export type ShareRelevanceFeedbackMutationFn = Apollo.MutationFunction<ShareRelevanceFeedbackMutation, ShareRelevanceFeedbackMutationVariables>;

/**
 * __useShareRelevanceFeedbackMutation__
 *
 * To run a mutation, you first call `useShareRelevanceFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShareRelevanceFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shareRelevanceFeedbackMutation, { data, loading, error }] = useShareRelevanceFeedbackMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useShareRelevanceFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<ShareRelevanceFeedbackMutation, ShareRelevanceFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShareRelevanceFeedbackMutation, ShareRelevanceFeedbackMutationVariables>(ShareRelevanceFeedbackDocument, options);
      }
export type ShareRelevanceFeedbackMutationHookResult = ReturnType<typeof useShareRelevanceFeedbackMutation>;
export type ShareRelevanceFeedbackMutationResult = Apollo.MutationResult<ShareRelevanceFeedbackMutation>;
export type ShareRelevanceFeedbackMutationOptions = Apollo.BaseMutationOptions<ShareRelevanceFeedbackMutation, ShareRelevanceFeedbackMutationVariables>;
export const GetSeedQuestionsDocument = gql`
    query GetSeedQuestions($dataSourceId: String!, $aiQuestionCount: Int!, $regenerate: Boolean) {
  getSeedQuestions(
    dataSourceId: $dataSourceId
    aiQuestionCount: $aiQuestionCount
    regenerate: $regenerate
  ) {
    questions {
      questionId
      questionText
      sageQuery
    }
  }
}
    `;

/**
 * __useGetSeedQuestionsQuery__
 *
 * To run a query within a React component, call `useGetSeedQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeedQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeedQuestionsQuery({
 *   variables: {
 *      dataSourceId: // value for 'dataSourceId'
 *      aiQuestionCount: // value for 'aiQuestionCount'
 *      regenerate: // value for 'regenerate'
 *   },
 * });
 */
export function useGetSeedQuestionsQuery(baseOptions: Apollo.QueryHookOptions<GetSeedQuestionsQuery, GetSeedQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSeedQuestionsQuery, GetSeedQuestionsQueryVariables>(GetSeedQuestionsDocument, options);
      }
export function useGetSeedQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSeedQuestionsQuery, GetSeedQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSeedQuestionsQuery, GetSeedQuestionsQueryVariables>(GetSeedQuestionsDocument, options);
        }
export type GetSeedQuestionsQueryHookResult = ReturnType<typeof useGetSeedQuestionsQuery>;
export type GetSeedQuestionsLazyQueryHookResult = ReturnType<typeof useGetSeedQuestionsLazyQuery>;
export type GetSeedQuestionsQueryResult = Apollo.QueryResult<GetSeedQuestionsQuery, GetSeedQuestionsQueryVariables>;
export const GetQuestionFragmentsDocument = gql`
    query GetQuestionFragments($request: Input_eureka_GetQuestionFragmentsRequest) {
  queryGetQuestionFragments(request: $request) {
    fragmentPayload {
      isSubmitted
      nlQueryFragment
      rating
      sqlQuery
      sessionId
      genNo
      token {
        token
        dataType
        typeEnum
      }
      phrase {
        startIndex
        numTokens
        phraseType
      }
    }
    worksheetId
  }
}
    `;

/**
 * __useGetQuestionFragmentsQuery__
 *
 * To run a query within a React component, call `useGetQuestionFragmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionFragmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionFragmentsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetQuestionFragmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetQuestionFragmentsQuery, GetQuestionFragmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionFragmentsQuery, GetQuestionFragmentsQueryVariables>(GetQuestionFragmentsDocument, options);
      }
export function useGetQuestionFragmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionFragmentsQuery, GetQuestionFragmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionFragmentsQuery, GetQuestionFragmentsQueryVariables>(GetQuestionFragmentsDocument, options);
        }
export type GetQuestionFragmentsQueryHookResult = ReturnType<typeof useGetQuestionFragmentsQuery>;
export type GetQuestionFragmentsLazyQueryHookResult = ReturnType<typeof useGetQuestionFragmentsLazyQuery>;
export type GetQuestionFragmentsQueryResult = Apollo.QueryResult<GetQuestionFragmentsQuery, GetQuestionFragmentsQueryVariables>;
export const GetNlQueryFeedbackDocument = gql`
    query GetNlQueryFeedback($request: Input_eureka_GetNlQueryFeedbackRequest) {
  queryGetNlQueryFeedback(request: $request) {
    nlQueryInfo {
      fixedPhrase {
        startIndex
        numTokens
        phraseType
      }
      fixedToken {
        token
        dataType
        typeEnum
      }
      nlQuery
      originalPhrase {
        startIndex
        numTokens
        phraseType
      }
      originalToken {
        token
        dataType
        typeEnum
      }
      upvoteCount
      downvoteCount
      reviewerId
      scope
      user {
        guid
        name
      }
      worksheet {
        guid
        name
      }
      parentQuery
      id
      modifiedAt
      tmlTokensUsed
    }
  }
}
    `;

/**
 * __useGetNlQueryFeedbackQuery__
 *
 * To run a query within a React component, call `useGetNlQueryFeedbackQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNlQueryFeedbackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNlQueryFeedbackQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetNlQueryFeedbackQuery(baseOptions?: Apollo.QueryHookOptions<GetNlQueryFeedbackQuery, GetNlQueryFeedbackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNlQueryFeedbackQuery, GetNlQueryFeedbackQueryVariables>(GetNlQueryFeedbackDocument, options);
      }
export function useGetNlQueryFeedbackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNlQueryFeedbackQuery, GetNlQueryFeedbackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNlQueryFeedbackQuery, GetNlQueryFeedbackQueryVariables>(GetNlQueryFeedbackDocument, options);
        }
export type GetNlQueryFeedbackQueryHookResult = ReturnType<typeof useGetNlQueryFeedbackQuery>;
export type GetNlQueryFeedbackLazyQueryHookResult = ReturnType<typeof useGetNlQueryFeedbackLazyQuery>;
export type GetNlQueryFeedbackQueryResult = Apollo.QueryResult<GetNlQueryFeedbackQuery, GetNlQueryFeedbackQueryVariables>;
export const UpdateNlQueryFeedbackDocument = gql`
    mutation UpdateNlQueryFeedback($request: Input_eureka_PutNlQueryFeedbackRequest) {
  mutationPutNlQueryFeedback(request: $request) {
    isUpdated
  }
}
    `;
export type UpdateNlQueryFeedbackMutationFn = Apollo.MutationFunction<UpdateNlQueryFeedbackMutation, UpdateNlQueryFeedbackMutationVariables>;

/**
 * __useUpdateNlQueryFeedbackMutation__
 *
 * To run a mutation, you first call `useUpdateNlQueryFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNlQueryFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNlQueryFeedbackMutation, { data, loading, error }] = useUpdateNlQueryFeedbackMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateNlQueryFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNlQueryFeedbackMutation, UpdateNlQueryFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNlQueryFeedbackMutation, UpdateNlQueryFeedbackMutationVariables>(UpdateNlQueryFeedbackDocument, options);
      }
export type UpdateNlQueryFeedbackMutationHookResult = ReturnType<typeof useUpdateNlQueryFeedbackMutation>;
export type UpdateNlQueryFeedbackMutationResult = Apollo.MutationResult<UpdateNlQueryFeedbackMutation>;
export type UpdateNlQueryFeedbackMutationOptions = Apollo.BaseMutationOptions<UpdateNlQueryFeedbackMutation, UpdateNlQueryFeedbackMutationVariables>;
export const DeleteNlQueryFeedbackDocument = gql`
    mutation DeleteNlQueryFeedback($request: Input_eureka_PutNlQueryFeedbackRequest) {
  mutationPutNlQueryFeedback(request: $request) {
    isDeleted
  }
}
    `;
export type DeleteNlQueryFeedbackMutationFn = Apollo.MutationFunction<DeleteNlQueryFeedbackMutation, DeleteNlQueryFeedbackMutationVariables>;

/**
 * __useDeleteNlQueryFeedbackMutation__
 *
 * To run a mutation, you first call `useDeleteNlQueryFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNlQueryFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNlQueryFeedbackMutation, { data, loading, error }] = useDeleteNlQueryFeedbackMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteNlQueryFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNlQueryFeedbackMutation, DeleteNlQueryFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNlQueryFeedbackMutation, DeleteNlQueryFeedbackMutationVariables>(DeleteNlQueryFeedbackDocument, options);
      }
export type DeleteNlQueryFeedbackMutationHookResult = ReturnType<typeof useDeleteNlQueryFeedbackMutation>;
export type DeleteNlQueryFeedbackMutationResult = Apollo.MutationResult<DeleteNlQueryFeedbackMutation>;
export type DeleteNlQueryFeedbackMutationOptions = Apollo.BaseMutationOptions<DeleteNlQueryFeedbackMutation, DeleteNlQueryFeedbackMutationVariables>;