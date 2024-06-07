// Generated by https://quicktype.io

export interface UserPayload {
  data: User;
}

export interface AxiosUserResponse {
  data: User;
}

export interface User {
  bio: null;
  color_scheme: string;
  created_at: string;
  date_format: string;
  default_dashboard_range: string;
  display_name: string;
  email: string;
  full_name: string;
  has_premium_features: boolean;
  human_readable_website: string;
  id: string;
  is_email_confirmed: boolean;
  is_email_public: boolean;
  is_hireable: boolean;
  is_onboarding_finished: boolean;
  languages_used_public: boolean;
  last_branch?: string;
  last_heartbeat_at: string;
  last_plugin: string;
  last_plugin_name: string;
  last_project?: string;
  location: string;
  logged_time_public: boolean;
  modified_at: string;
  needs_payment_method: boolean;
  photo: string;
  photo_public: boolean;
  plan: string;
  public_email: string;
  show_machine_name_ip: boolean;
  time_format_24hr: boolean;
  timeout: number;
  timezone: string;
  username: string;
  website: string;
  weekday_start: number;
  writes_only: boolean;
}

export interface CurrentUser {
  error?: unknown;
  pending?: boolean;
  user?: User;
}

export interface ApiKeyPayload {
  data: ApiKey;
}

export interface ApiKey {
  api_key: string;
}
