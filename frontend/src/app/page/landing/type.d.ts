export interface RootObject {
  data: Data;
}

export interface StickyNode {
  __typename: Typename;
  accessibility_caption: null;
  dash_info?: DashInfo;
  dimensions: Dimensions;
  display_url: string;
  edge_media_to_tagged_user: Data;
  fact_check_information: null;
  fact_check_overall_rating: null;
  gating_info: null;
  has_audio?: boolean;
  has_upcoming_event: boolean;
  id: string;
  is_video: boolean;
  media_overlay_info: null;
  media_preview: null | string;
  owner: Owner;
  sharing_friction_info: SharingFrictionInfo;
  shortcode: string;
  tracking_token?: string;
  video_url?: string;
  video_view_count?: number;
}

export interface EdgeSidecarToChildrenEdge {
  node: StickyNode;
}

export interface EdgeSidecarToChildren {
  edges: EdgeSidecarToChildrenEdge[];
}

export interface PurpleNode {
  __typename: Typename;
  accessibility_caption: null;
  clips_music_attribution_info?: ClipsMusicAttributionInfo;
  coauthor_producers: any[];
  comments_disabled: boolean;
  dash_info?: DashInfo;
  dimensions: Dimensions;
  display_url: string;
  edge_liked_by: Edge;
  edge_media_preview_like: Edge;
  edge_media_to_caption: EdgeMediaToCaption;
  edge_media_to_comment: Edge;
  edge_media_to_tagged_user: EdgeMediaToTaggedUser;
  edge_sidecar_to_children?: EdgeSidecarToChildren;
  fact_check_information: null;
  fact_check_overall_rating: null;
  felix_profile_grid_crop?: null;
  gating_info: null;
  has_audio?: boolean;
  has_upcoming_event: boolean;
  id: string;
  is_video: boolean;
  location: null;
  media_overlay_info: null;
  media_preview: null | string;
  nft_asset_info: null;
  owner: Owner;
  pinned_for_users: any[];
  product_type?: string;
  sharing_friction_info: SharingFrictionInfo;
  shortcode: string;
  taken_at_timestamp: number;
  thumbnail_resources: ThumbnailResource[];
  thumbnail_src: string;
  tracking_token?: string;
  video_url?: string;
  video_view_count?: number;
}

export interface DataEdge {
  node: PurpleNode;
}

export interface Data {
  edges: DataEdge[];
}

export enum Typename {
  GraphImage = 'GraphImage',
  GraphSidecar = 'GraphSidecar',
  GraphVideo = 'GraphVideo',
}

export interface DashInfo {
  is_dash_eligible: boolean;
  number_of_qualities: number;
  video_dash_manifest: null;
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface Owner {
  id: string;
  username: Name;
}

export enum Name {
  Kyliecosmetics = 'kyliecosmetics',
}

export interface SharingFrictionInfo {
  bloks_app_url: null;
  should_have_sharing_friction: boolean;
}

export interface ClipsMusicAttributionInfo {
  artist_name: Name;
  audio_id: string;
  should_mute_audio: boolean;
  should_mute_audio_reason: string;
  song_name: string;
  uses_original_audio: boolean;
}

export interface Edge {
  count: number;
}

export interface EdgeMediaToCaption {
  edges: EdgeMediaToCaptionEdge[];
}

export interface EdgeMediaToCaptionEdge {
  node: FluffyNode;
}

export interface FluffyNode {
  text: string;
}

export interface EdgeMediaToTaggedUser {
  edges: PurpleEdge[];
}

export interface PurpleEdge {
  node: TentacledNode;
}

export interface TentacledNode {
  user: User;
  x: number;
  y: number;
}

export interface User {
  followed_by_viewer: boolean;
  full_name: string;
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
}

export interface ThumbnailResource {
  config_height: number;
  config_width: number;
  src: string;
}
