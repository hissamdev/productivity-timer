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
    setProfiles: () => void;
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
    setProfiles: () => {
        console.log("Set Profiles Function");
    },
}));
