import { handleCreateProfile } from "@/utils/helpers";
import { create } from "zustand";
type Timer = {
    label: string;
};

type Profile = {
    name: string;
    timers: Timer[];
};

type ProfileState = {
    profiles: Profile[];
    createProfile: () => Promise<void>;
};

export const useProfileStore = create<ProfileState>((set) => ({
    profiles: [
        {
            name: "Multitask",
            timers: [
                {
                    label: "Coding",
                    timer: 0,
                    running: false,
                },
                {
                    label: "Valorant",
                    timer: 0,
                    running: false,
                },
            ],
        },
    ],
    createProfile: async () => {
        const res = await handleCreateProfile();
        if (!res) {
            return;
        }

        set((prev) => {
            const newProfile = {
                name: "New Profile",
                timers: [],
            };

            return { profiles: [...prev.profiles, newProfile] };
        });
    },
}));
