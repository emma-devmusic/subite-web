
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


export interface GetUserProfile {
    error:   boolean;
    code:    number;
    message: string;
    data:    DataUserProfile;
}

export interface DataUserProfile {
    auth_user_audits_status_id:          number;
    auth_user_audits_status_description: string;
    auth_user_audits_status_date:        Date;
    data_created:                        Date;
    data_modified:                       Date;
    id:                                  number;
    email:                               string;
    name:                                string;
    last_name:                           string;
    dni:                                 string;
    cell_phone:                          string;
    cell_phone_secondary:                null;
    address:                             string;
    floor:                               null;
    description:                         null;
    age:                                 string;
    enable:                              boolean;
    two_factor_enabled:                  boolean;
    account_verified:                    boolean;
    email_verified:                      boolean;
    image_profiles:                      ImageProfile[];
}

export interface ImageProfile {
    id:            number;
    data_created:  Date;
    image_url:     string;
    original_name: string;
    default:       boolean;
}
