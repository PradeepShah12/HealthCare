import { ApiResponse } from "../../.."
import api from "../api"
import {
  ChangePassword,
  ChangePasswordResponse,
  CheckFacebookUser,
  FacebookLoginDto,
  ForgotPasswordResponse,
  InviteResponse,
  LoginDto,
  LoginResponse,
  RefreshToken,
  RefreshTokenResponse,
  RegisterDto,
  ResetPasswordDto,
} from "./types"

class Auth {
  async register(body: RegisterDto) {
    const response = await api.post<LoginResponse>("/user/signup/userregistration", body)

    return response.data
  }

  async login(body: LoginDto) {
    const response = await api.post<LoginResponse>("/user/chklogin", body)
    return response.data
  }

  async updateProfile(body: RegisterDto) {
    const response = await api.post<LoginResponse>("/user/update/user", body)
    return response.data
  }

  async subscribe(body: {UserID:string,IsSubscribed:boolean}) {
    const response = await api.post<LoginResponse>("/user/update/subscription", body)
    return response.data
  }


  async authGoogle(accessToken: string) {
    const response = await api.get<LoginResponse>(`/auth/oauth2?access_token=${accessToken}&provider=google`)
    return response.data
  }





  async invite(emails: string) {
    const formData = new FormData();
    formData.append("email", emails);

    const response = await api.post<InviteResponse>("/auth/invite", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }


  async refreshUser(body: RefreshToken) {
    const response = await api.post<ApiResponse<RefreshTokenResponse>>("/auth/token", body)

    return response.data
  }

  async forgotPassword(body: { Email: string }) {
    console.log('forget password')
    const response = await api.post<ApiResponse<ForgotPasswordResponse>>(
      "/user/signup/forgotpassword",
      body,
    )

    return response.data
  }

  async resetPassword(body: ResetPasswordDto) {
    const response = await api.post("/user/signup/resetpassword", body)

    return response.data
  }

  async loginWithFacebook(body: FacebookLoginDto) {
    const response = await api.post<ApiResponse<LoginResponse>>("/auth/facebook", body)

    return response.data
  }

  async loginWithSocial(body: FacebookLoginDto) {
    const response = await api.post<ApiResponse<LoginResponse>>("/auth/single-sign-on", body)

    return response.data
  }

  async verifyOtp(body: { reset_token: number; id: string }) {
    const response = await api.post("/auth/verify-otp", body)

    return response.data
  }

  async checkFacebookUser(params: CheckFacebookUser) {
    const response = await api.get("/auth/is-facebook-user", { params })

    return response.data
  }

  async checkSocialUser(params: CheckFacebookUser) {
    const response = await api.get(
      `/auth/is-single-sign-on?provider_id=${params.provider_id}&provider=${params.provider}`,
    )
    return response.data
  }

  async changePassword(body: ChangePassword) {
    const response = await api.post<ApiResponse<ChangePasswordResponse>>(
      "/auth/change-password",
      body,
    )
    return response.data
  }
}

export const AuthService = new Auth()
