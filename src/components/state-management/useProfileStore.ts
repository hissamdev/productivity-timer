import { ProfileWithTimers } from "@/types/types";
import { getProfiles } from "@/utils/getFunctions";
import { handleCreateProfile, handleCreateTimer } from "@/utils/helpers";
import { create } from "zustand";

type ProfileState = {
    profiles: ProfileWithTimers[];
    initProfiles: () => void;
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
                          timers: [...profile.timers, res[0]],
                      }
                    : profile,
            ),
        }));
    },
}));
