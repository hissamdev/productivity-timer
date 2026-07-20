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
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(() => {
        if (timerState === "running") {
            timerRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [timerState]);

    const formatSeconds = (rawSeconds: number) => {
        const mins = Math.floor((rawSeconds / 60) % 60)
            .toString()
            .padStart(2, "0");
        const secs = (rawSeconds % 60).toString().padStart(2, "0");

        return `${mins}:${secs}`;
    };

    const handleTimerPress = async () => {
        if (
            !timer.running ||
            !timer.data.length ||
            timer.data[0].type === "reset"
        ) {
            console.log("Start detected:", timer.running, timer.data);
            const res = await handleTimerData(timer.id, "start");
            if (!res?.length) return;

            setTimerRunning(groupId, timer.id, true);
            updateData(groupId, timer.id, res[0]);
        } else if (
            timer.data[0].type === "start" ||
            timer.data[0].type === "resume"
        ) {
            const res = await handleTimerData(timer.id, "pause");
            if (!res?.length) return;

            updateData(groupId, timer.id, res[0]);
        } else if (timer.data[0].type === "pause") {
            const res = await handleTimerData(timer.id, "resume");
            if (!res?.length) return;

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
                <Text>{timer.data?.[0]?.type}</Text>
            </TouchableOpacity>
        </View>
    );
}
