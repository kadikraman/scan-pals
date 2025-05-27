import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { Profile } from "../types";
import uuid from "react-native-uuid";

type UserState = {
  myProfile: Omit<Profile, "id"> | null;
  setMyProfile: (profile: Omit<Profile, "id" | "updatedAt" | "userId">) => void;
  hasFinishedOnboarding: boolean;
  toggleHasOnboarded: () => void;
  resetProfile: () => void;
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      myProfile: null,
      setMyProfile: (profile: Omit<Profile, "id" | "updatedAt" | "userId">) => {
        set((state) => {
          return {
            ...state,
            myProfile: {
              ...profile,
              userId: state.myProfile?.userId || uuid.v4(),
              updatedAt: Date.now(),
            },
          };
        });
      },
      hasFinishedOnboarding: false,
      toggleHasOnboarded: () => {
        set((state) => {
          return {
            ...state,
            hasFinishedOnboarding: !state.hasFinishedOnboarding,
          };
        });
      },
      resetProfile: () => {
        set((state) => {
          return {
            ...state,
            myProfile: null,
          };
        });
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
