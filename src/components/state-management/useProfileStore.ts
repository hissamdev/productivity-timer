import { ProfileWithTimers, TimerData } from "@/types/types";
import {
    getProfiles,
    handleCreateProfile,
    handleCreateTimer,
} from "@/utils/helpers";
import { create } from "zustand";

type ProfileState = {
    profiles: ProfileWithTimers[];
    initProfiles: () => void;
    updateData: (groupId: string, timerId: string, newData: TimerData) => void;
    setTimerRunning: (groupId: string, timerId: string, bool: boolean) => void;
    createProfile: () => Promise<void>;
    createTimer: (profileId: string) => Promise<void>;
};

export const useProfileStore = create<ProfileState>((set) => ({
    profiles: [],
    initProfiles: async () => {
        const profileData = await getProfiles();

        if (!profileData) {
            console.log(profileData);
            return;
        }
        set({ profiles: profileData });
    },
    setTimerRunning: (groupId, timerId, bool) => {
        set((prev) => ({
            profiles: prev.profiles.map((profile) =>
                profile.id === groupId
                    ? {
                          ...profile,
                          timers: profile.timers.map((timer) =>
                              timer.id === timerId
                                  ? {
                                        ...timer,
                                        running: bool,
                                    }
                                  : timer,
                          ),
                      }
                    : profile,
            ),
        }));
    },
    updateData: (groupId, timerId, newData) => {
        set((prev) => ({
            profiles: prev.profiles.map((profile) =>
                profile.id === groupId
                    ? {
                          ...profile,
                          timers: profile.timers.map((timer) =>
                              timer.id === timerId
                                  ? {
                                        ...timer,
                                        data: [newData, ...timer.data],
                                    }
                                  : timer,
                          ),
                      }
                    : profile,
            ),
        }));
    },
    createProfile: async () => {
        const res = await handleCreateProfile();
        if (!res) {
            return;
        }

        set((prev) => {
            const newProfile = {
                id: res[0].id,
                name: res[0].name,
                desc: res[0].desc,
                lastUsed: res[0].lastUsed,
                timers: [],
            };

            return { profiles: [...prev.profiles, newProfile] };
        });
    },
    createTimer: async (profileId) => {
        const res = await handleCreateTimer(profileId);
        if (!res) return;
        set((prev) => ({
            profiles: prev.profiles.map((profile) =>
                profile.id === profileId
                    ? {
                          ...profile,
                          timers: [
                              ...profile.timers,
                              {
                                  ...res[0],
                                  data: [],
                              },
                          ],
                      }
                    : profile,
            ),
        }));
    },
}));
