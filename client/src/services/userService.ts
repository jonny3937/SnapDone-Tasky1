import API from "../api/axios";

export const updateUserProfile = async (
  profile: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  },
  token: string,
) => {
  const response = await API.patch("/api/user", profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    const error = response.data;
    throw new Error(error.message || "Failed to update profile");
  }
  return response.data;
};

export const updateAvatar = async (avatar: string, token: string) => {
  const response = await API.patch(
    "/api/user/avatar",
    { avatar },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status !== 200) {
    const error = response.data;
    throw new Error(error.message || "Failed to update avatar");
  }
  return response.data;
};

export const getProfile = async (token: string) => {
  const response = await API.get("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    const error = response.data;
    throw new Error(error.message || "Failed to fetch profile");
  }
  return response.data;
};
