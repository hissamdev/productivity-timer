import { TimerWithData } from "@/types/types";
import { handleTimerData } from "@/utils/timerDataSetters";
import { CodeXml } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useProfileStore } from "./state-management/useProfileStore";

type Props = {
    groupId: string;
    timer: TimerWithData;
};
export default function TimerBox({ groupId, timer }: Props) {
    const { updateData, setTimerRunning } = useProfileStore();
    const [timerState, setTimerState] = useState<
        "initial" | "running" | "paused"
    >("initial");

    const isInitial = !timer.data.length || timer.data[0].type === "reset";
    const isContinue =
        timer.data[0].type === "start" || timer.data[0].type === "resume";
    const isPaused = timer.data[0].type === "pause";

    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    const formatSeconds = (rawSeconds: number) => {
        const mins = Math.floor((rawSeconds / 60) % 60)
            .toString()
            .padStart(2, "0");
        const secs = (rawSeconds % 60).toString().padStart(2, "0");

        return `${mins}:${secs}`;
    };

    const handleTimerPress = async () => {
        if (isInitial) {
            console.log("Start detected:", timer.running, timer.data);
            const res = await handleTimerData(timer.id, "start", timer.data[0]);
            if (!res) return;

            setTimerRunning(groupId, timer.id, true);
            updateData(groupId, timer.id, res[0]);
        } else if (isContinue) {
            const res = await handleTimerData(timer.id, "pause", timer.data[0]);
            if (!res) return;

            updateData(groupId, timer.id, res[0]);
        } else if (isPaused) {
            const res = await handleTimerData(
                timer.id,
                "resume",
                timer.data[0],
            );
            if (!res) return;

            updateData(groupId, timer.id, res[0]);
        }
    };

    return (
        <View
            style={{
                // borderWidth: 2,
                // borderColor: "black",
                // height: 100,
                display: "flex",
                flex: 1,
                gap: 10,
            }}
        >
            <View style={{}}>
                <CodeXml />
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >
                    {timer.label}
                </Text>
            </View>
            <TouchableOpacity
                onPress={handleTimerPress}
                style={{
                    height: 100,
                    backgroundColor: "#ffffff96",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ fontSize: 30 }}>
                    {timerState === "initial"
                        ? "Start"
                        : formatSeconds(seconds)}
                </Text>
                <Text>
                    {timer.data?.[0]?.type} {timer.data[0].elapsedTotal}{" "}
                    {timer.data[0].pausedTotal}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
