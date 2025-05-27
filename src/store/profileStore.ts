import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { Profile } from "../types";

type ProfileState = {
  profiles: Omit<Profile, "id">[];
  addProfile: (profile: Omit<Profile, "id" | "updatedAt">) => void;
  updateProfile: (profile: Omit<Profile, "id">) => void;
  deleteProfile: (profile: Pick<Profile, "userId">) => void;
};

export const useProfileStore = create(
  persist<ProfileState>(
    (set) => ({
      profiles: [],
      addProfile: (profile: Omit<Profile, "id" | "updatedAt">) => {
        set((state) => {
          return {
            ...state,
            profiles: [
              ...state.profiles,
              { ...profile, updatedAt: Date.now() },
            ],
          };
        });
      },
      updateProfile: (profile: Omit<Profile, "id" | "updatedAt">) => {
        set((state) => {
          const existingProfile = state.profiles.find(
            (p) => p.userId === profile.userId,
          );
          if (existingProfile) {
            return {
              ...state,
              profiles: state.profiles.map((p) =>
                p.userId === profile.userId
                  ? { ...p, ...profile, updatedAt: Date.now() }
                  : p,
              ),
            };
          }
          return state;
        });
      },
      deleteProfile: (profile: Pick<Profile, "userId">) => {
        set((state) => {
          return {
            ...state,
            profiles: state.profiles.filter((p) => p.userId !== profile.userId),
          };
        });
      },
    }),
    {
      name: "profile-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
