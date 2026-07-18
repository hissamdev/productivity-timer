import { ProfileWithTimers } from "@/types/types";
import { getProfiles } from "@/utils/getFunctions";
import { handleCreateProfile } from "@/utils/helpers";
import { create } from "zustand";
// type Timer = {
//     label: string;
// };

// type Profile = {
//     name: string;
//     timers: Timer[];
// };

type ProfileState = {
    profiles: ProfileWithTimers[];
    initProfiles: () => void;
    createProfile: () => Promise<void>;
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
                name: "New Profile",
                timers: [],
            };

            return { profiles: [...prev.profiles, newProfile] };
        });
    },
}));
