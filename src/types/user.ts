
export interface AuthRole {
    id: number;
    description: string;
}

export interface AuthUserProfileImage {
    data_created: Date;
    id: number;
    image_url: string;
    type_image: string;
    content_type_image: string;
}

export interface UserPermission {
    id: number;
    auth_module_id?: number;
    module_description?: string;
    module_endpoint?: string;
    auth_actions_id?: number;
    action_description?: string;
    action_method?: string;
}

export interface AuthUser {
    id: number;
    email: string;
    name: string;
    last_name: string;
    enable: boolean;
    two_factor_enabled: boolean;
    auth_role: AuthRole;
    image_profiles: AuthUserProfileImage[];
}

export interface UserPermissions {
    user_data: AuthUser;
    user_permissions: UserPermission[];
}