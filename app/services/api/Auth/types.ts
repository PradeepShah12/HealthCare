
export interface RegisterDto {
  FirstName: string
  LastName: string
  Email: string
  Username: string
  Password: string
  Height: string
  Weight: string
  Country: string
  DateOfBirth:string

}

export interface LoginDto {
  Email: string
  Password: string

}

export interface User {
  id: number;
    guid: string;
    email: string;
    username: string;
    display_name: string;
    firstname: string;
    lastname: string;
    bio: string;
    followers: number;
    contentcontainer_id:number;
    following: number;
    friends: number;
    spaces: number;
    url: string;
    image: string;
    friend_state:number
}

export interface InviteResponse {
  success: boolean;
  message:string;
  email:string[];
  invitedUsers: string[];
  failedInvitations: string[];
}



export interface LoginResponse {
  message: string
  auth_token: string
  user:User

}

export interface RefreshToken {
  refresh_token: string
}

export interface RefreshTokenResponse {
  token: string
  expiration: number
}

export interface ResetPasswordDto {
  Email: string
  OldPassword: string
  NewPassword: string
}

export interface FacebookLoginDto {
  first_name?: string
  last_name?: string
  mobile_no?: string
  email?: string
  provider_id?: string
  provider?: string
  role?: string
  fcm_token: string,
}

export interface ForgotPasswordResponse {
  id: string
  message: string
}

export interface CheckFacebookUser {
  provider_id: string
  provider: string
}

export interface ChangePassword {
  old_password: string
  new_password: string
  confirm_password: string
}

export interface ChangePasswordResponse {
  message: string
}
