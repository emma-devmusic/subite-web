import { Permission } from "@/types";
import { getSession, objToArray } from "./helpers";

const objPermissions = (data: Permission[]) => {
    const objModules: any = {}
    data?.forEach(e => {
        if (!!objModules[e.auth_module_id]) {
            objModules[e.auth_module_id] = {
                module_description: e.module_description,
                module_endpoint: e.module_endpoint,
                permission: [
                    ...objModules[e.auth_module_id]['permission'],
                    {
                        action_method: e.action_method,
                        action_description: e.action_description
                    }
                ]
            };
        } else {
            objModules[e.auth_module_id] = {
                module_description: e.module_description,
                module_endpoint: e.module_endpoint,
                permission: [{
                    action_method: e.action_method,
                    action_description: e.action_description
                }]
            };
        }
    })
    return objModules
}
const objPermissionsId = (data: Permission[]) => {
    const objModules: any = {}
    data?.forEach(e => {
        objModules[e.module_endpoint] = e.auth_module_id
    })
    return objModules
}

export default class DecryptedSession {
    constructor() {
        this.sessionDecrypted = this.sessionDecrypted
        this.getArrayPermissions = this.getArrayPermissions.bind(this);
        this.getModuleById = this.getModuleById.bind(this);
        this.getData = this.getData.bind(this);
        this.getRoleId = this.getRoleId.bind(this);
        this.getPermissionsId = this.getPermissionsId.bind(this);
    }
    sessionDecrypted = getSession().data;
    getArrayPermissions() {
        return objToArray( 
            objPermissions(this.sessionDecrypted.permission) 
        )
    }
    getModuleById(id: number) {
        return objPermissions(this.sessionDecrypted.permission)[id]
    }
    getData() {
        return this.sessionDecrypted.basic_data
    }
    getRoleId() {
        return this.sessionDecrypted.role_id
    }
    getPermissionsId() {
        return objPermissionsId(this.sessionDecrypted.permission)
    }
}
