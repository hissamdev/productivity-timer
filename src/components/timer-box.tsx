import { TimerWithData } from "@/types/types";
import { handleTimerData } from "@/utils/timerDataSetters";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useProfileStore } from "./state-management/useProfileStore";

type Props = {
    groupId: string;
    timer: TimerWithData;
};
export default function TimerBox({ groupId, timer }: Props) {
    const { updateData, setTimerRunning } = useProfileStore();
    const [seconds, setSeconds] = useState(0);
    const [timerState, setTimerState] = useState<
        "initial" | "running" | "paused"
    >("initial");

    const isInitial = !timer.data.length || timer.data[0].type === "reset";
    const isContinue =
        timer.data?.[0]?.type === "start" || timer.data?.[0]?.type === "resume";
    const isPaused = timer.data?.[0]?.type === "pause";
    console.log({
        initial: isInitial,
        continue: isContinue,
        paused: isPaused,
    });

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(() => {
        if (isContinue) {
            const updateElapsedSeconds = () => {
                const currentTime = new Date();
                const elapsedLast =
                    (currentTime.getTime() -
                        timer.data[0].timestamp.getTime()) /
                    1000;
                const elapsedTotal = elapsedLast + timer.data[0].elapsedTotal;
                setSeconds(elapsedTotal);
            };
            updateElapsedSeconds();
            timerRef.current = setInterval(updateElapsedSeconds, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [isContinue]);

    const formatSeconds = (rawSeconds: number) => {
        const mins = Math.floor((rawSeconds / 60) % 60)
            .toString()
            .padStart(2, "0");
        const secs = Math.floor(rawSeconds % 60)
            .toString()
            .padStart(2, "0");

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
        <View>
            <View style={styles.pausedText}>
                <Text
                    style={{
                        textAlign: "center",
                    }}
                >
                    Paused for: {formatSeconds(timer?.data?.[0]?.pausedTotal)}
                </Text>
            </View>

            <TouchableOpacity
                onPress={handleTimerPress}
                style={styles.timerContainer}
            >
                <Text style={{ marginTop: 16 }}>{timer.label}</Text>
                <Text style={{ fontSize: 30 }}>
                    {isPaused ? "Paused" : formatSeconds(seconds)}
                </Text>
                <TouchableOpacity style={styles.stopCircle}>
                    <View
                        style={{
                            aspectRatio: 1 / 1,
                            width: 10,
                            backgroundColor: "black",
                        }}
                    ></View>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    timerContainer: {
        marginTop: 20,
        marginHorizontal: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        aspectRatio: 1 / 1,
        width: 200,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: "100%",
    },

    stopCircle: {
        aspectRatio: 1 / 1,
        width: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: "100%",
    },
    pausedText: {
        marginHorizontal: "auto",
        paddingVertical: 2,
        paddingHorizontal: 18,
        borderRadius: 18,
        backgroundColor: "#EBEBEB",
    },
    debugBorder: {
        borderWidth: 1,
        borderColor: "black",
    },
});
