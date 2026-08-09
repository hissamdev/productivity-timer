import { create } from "zustand";

type SingleTimerState = {
    timers: SingleTimerState[];
};

export const useSingleTimerStore = create<SingleTimerState>((set) => ({
    timers: [],
}));
