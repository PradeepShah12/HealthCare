import { ApiResponse } from "../../..";
import { User } from "../Auth/types";
import api from "../api";



interface Group {
  id: number;
  name: string;
  description: string;
  show_at_registration: number;
  show_in_directory: number;
  space_id: number;
  sort_order: number;
  // Add other group properties as needed
}

interface Member {
  userId: number;
  isManager: number;
  // Add other member properties as needed
}



export interface RequestBody{
  friend_id:number
}
class Users {
  async getUserByUsername(username: string) {
    const response = await api.get<ApiResponse<User>>(`/user/get-by-username?username=${username}`);
    return response.data;
  }

  async getUserByEmail(email: string) {
    const response = await api.get<User>(`/user/get-by-email?email=${email}`);
    return response.data;
  }

  async getUserById(id:number) {
    const response = await api.get<User>(`/user/${id}`);
    return response.data ;
  }

  async listGroups() {
    const response = await api.get<ApiResponse<Group[]>>("/user/group");
    return response.data;
  }

  async addGroup(data: {
    name: string;
    description: string;
    show_at_registration: number;
    show_in_directory: number;
    space_id: number;
    sort_order: number;
  }) {
    const response = await api.post<ApiResponse<Group>>("/user/group", data);
    return response.data;
  }

  async editGroup(groupId: number, data: {
    name: string;
    description: string;
    show_at_registration: number;
    show_in_directory: number;
    space_id: number;
    sort_order: number;
  }) {
    const response = await api.put<ApiResponse<Group>>(`/user/group/${groupId}`, data);
    return response.data;
  }

  async deleteGroup(groupId: number) {
    await api.delete(`/user/group/${groupId}`);
  }

  async listMembers(groupId: number) {
    const response = await api.get<ApiResponse<Member[]>>(`/user/group/${groupId}/member`);
    return response.data;
  }

  async addMember(groupId: number, userId: number, isManager: number, data: {
    name: string;
    description: string;
    show_at_registration: number;
    show_in_directory: number;
    space_id: number;
    sort_order: number;
  }) {
    await api.put(`/user/group/${groupId}/member?userId=${userId}&isManager=${isManager}`, data);
  }

  async removeMember(groupId: number, userId: number) {
    await api.delete<ApiResponse<[]>>(`/user/group/${groupId}/member?userId=${userId}`);
  }

  async inviteNewUsers(data: {
    emails: string[];
  }) {
    await api.post("/user/invite", data);
  }


    async getUsersByParam (params:string) {
   
      const response = await api.get<ApiResponse<User[]>>(`/user?param=${params}`);
  
      return response.data.results;
   
  };


  async AddAcceptFriendById(body:RequestBody){
    const response = await api.post<ApiResponse<User[]>>(`/user/friendship/add`,body);
  
    return response.data.results;
 


  }

  async cancelRequestById(body:RequestBody){
    const response = await api.delete<ApiResponse<User[]>>(`/user/friendship/delete/${body.friend_id}`);
  
    return response.data.results;
 


  }


  async followUser(body:FormData) {
    await api.post(`/follow/follow-user`,body);
  }

  async unFollowUser(UserId:number) {
    await api.post(`/follow/unfollow-user/${UserId}`);
  }


  async getUserFollowers (userId:number) {
   
    const response = await api.get<ApiResponse<User[]>>(`/follow/get-followers-user/${userId}`);

    return response.data.results;
 
};


async getUserFollowiung (userId:number) {
   
  const response = await api.get<ApiResponse<User[]>>(`/follow/get-following-user/${userId}`);

  return response.data.results;

};
  
}

export const UserService = new Users();
