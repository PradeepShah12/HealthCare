import api from "../api"
import { AuthService } from "./auth.api"
import { CheckFacebookUser, LoginDto, RefreshToken, RegisterDto, ResetPasswordDto } from "./types"

// Mock the 'api' module
jest.mock("../api")

// Mock the response data
const mockApiResponse = {
  data: "mock data",
}

describe("Auth", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("register", () => {
    it("should return the response data", async () => {
      // Mock the 'api.post' method
      ;(api.post as jest.Mock).mockImplementationOnce(() => Promise.resolve(mockApiResponse))

      const registerDto: RegisterDto = {
        first_name: "First Name",
        last_name: "Last Name",
        confirm_password: "abcdef",
        password: "abcdef",
        email: "rupakkarki123@gmail.com",
        mobile_no: "9861445109",
        role: "member",
      }
      const result = await AuthService.register(registerDto)

      expect(api.post).toHaveBeenCalledWith("/auth/register", registerDto)
      expect(result).toEqual(mockApiResponse.data)
    })
  })

  describe("login", () => {
    it("should return the response data", async () => {
      // Mock the 'api.post' method
      ;(api.post as jest.Mock).mockImplementationOnce(() => Promise.resolve(mockApiResponse))

      const loginDto: LoginDto = {
        email: "email@email.com",
        password: "password",
      }
      const result = await AuthService.login(loginDto)

      expect(api.post).toHaveBeenCalledWith("/auth/login", loginDto)
      expect(result).toEqual(mockApiResponse.data)
    })
  })

  describe("refreshUser", () => {
    it("should return the response data", async () => {
      // Mock the 'api.post' method
      ;(api.post as jest.Mock).mockImplementationOnce(() => Promise.resolve(mockApiResponse))

      const refreshToken: RefreshToken = {
        refresh_token: "refresh_token",
      }
      const result = await AuthService.refreshUser(refreshToken)

      expect(api.post).toHaveBeenCalledWith("/auth/token", refreshToken)
      expect(result).toEqual(mockApiResponse.data)
    })
  })

  describe("forgotPassword", () => {
    it("should return the response data", async () => {
      // Mock the 'api.post' method
      ;(api.post as jest.Mock).mockImplementationOnce(() => Promise.resolve(mockApiResponse))

      const body = { email: "test@example.com" }
      const result = await AuthService.forgotPassword(body)

      expect(api.post).toHaveBeenCalledWith("/auth/forgot-password", body)
      expect(result).toEqual(mockApiResponse.data)
    })
  })

  describe("resetPassword", () => {
    it("should return the response data", async () => {
      // Mock the 'api.post' method
      ;(api.post as jest.Mock).mockImplementationOnce(() => Promise.resolve(mockApiResponse))

      const resetPasswordDto: ResetPasswordDto = {
        confirm_password: "abc",
        password: "abc",
        reset_token: "abc",
        uid: "user_id",
      }
      const result = await AuthService.resetPassword(resetPasswordDto)

      expect(api.post).toHaveBeenCalledWith("/auth/reset-password", resetPasswordDto)
      expect(result).toEqual(mockApiResponse.data)
    })
  })

  describe("loginWithFacebook", () => {
    it("should return the response data", async () => {
      // Mock the 'api.post' method
      ;(api.post as jest.Mock).mockImplementationOnce(() => Promise.resolve(mockApiResponse))

      const facebookLoginDto = {
        /* provide the required data for FacebookLoginDto */
      }
      const result = await AuthService.loginWithFacebook(facebookLoginDto)

      expect(api.post).toHaveBeenCalledWith("/auth/facebook", facebookLoginDto)
      expect(result).toEqual(mockApiResponse.data)
    })
  })

  describe("verifyOtp", () => {
    it("should return the response data", async () => {
      // Mock the 'api.post' method
      ;(api.post as jest.Mock).mockImplementationOnce(() => Promise.resolve(mockApiResponse))

      const body = { reset_token: 123456, id: "testId" }
      const result = await AuthService.verifyOtp(body)

      expect(api.post).toHaveBeenCalledWith("/auth/verify-otp", body)
      expect(result).toEqual(mockApiResponse.data)
    })
  })

  describe("checkFacebookUser", () => {
    it("should return the response data", async () => {
      // Mock the 'api.get' method
      ;(api.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(mockApiResponse))

      const params: CheckFacebookUser = {
        provider: "facebook",
        provider_id: "asbdasd2332",
      }
      const result = await AuthService.checkFacebookUser(params)

      expect(api.get).toHaveBeenCalledWith("/auth/is-facebook-user", { params })
      expect(result).toEqual(mockApiResponse.data)
    })
  })
})
