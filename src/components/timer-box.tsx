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
    const { updateData, createTimer } = useProfileStore();
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const isInitial = !timer.data.length || timer.data[0].type === "reset";
    const isContinue =
        timer.data?.[0]?.type === "start" || timer.data?.[0]?.type === "resume";
    const isPaused = timer.data?.[0]?.type === "pause";
    // console.log({
    //     initial: isInitial,
    //     continue: isContinue,
    //     paused: isPaused,
    // });

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
        } else if (isPaused) {
            const updateElapsedSeconds = () => {
                const currentTime = new Date().getTime() / 1000;
                const lastTimestamp = timer.data[0].timestamp.getTime() / 1000;

                const previousElapsed = timer.data[0].pausedTotal;
                const elapsedNow = currentTime - lastTimestamp;
                const totalElapsed = previousElapsed + elapsedNow;

                setSeconds(totalElapsed);
            };

            updateElapsedSeconds();
            timerRef.current = setInterval(updateElapsedSeconds, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [isContinue]);

    const formatSeconds = (rawSeconds: number) => {
        const hours = Math.floor(rawSeconds / 3600);
        const mins = Math.floor((rawSeconds % 3600) / 60)
            .toString()
            .padStart(2, "0");
        const secs = Math.floor(rawSeconds % 60)
            .toString()
            .padStart(2, "0");
        return hours > 0 ? `${hours}:${mins}:${secs}` : `${mins}:${secs}`;
    };

    const handleTimerPress = async () => {
        if (isInitial) {
            const res = await handleTimerData(timer.id, "start", timer.data[0]);
            if (!res) return;

            updateData(groupId, timer.id, res[0]); // Add the event to local state, which brings us fresh props to render the time
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

    const handleTimerReset = async () => {
        const res = await handleTimerData(timer.id, "reset", timer.data[0]);
        if (!res) return;
        updateData(groupId, timer.id, res[0]);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={handleTimerPress}
                style={styles.timerContainer}
            >
                <Text style={{ marginTop: 12 }}>{timer.label}</Text>
                <Text style={{ fontSize: 18 }}>
                    {isInitial
                        ? "00:00"
                        : isPaused
                          ? "Paused"
                          : formatSeconds(seconds)}
                </Text>
                <TouchableOpacity
                    onPress={handleTimerReset}
                    style={styles.stopCircle}
                >
                    <View
                        style={{
                            aspectRatio: 1 / 1,
                            width: 10,
                            backgroundColor: "black",
                        }}
                    ></View>
                </TouchableOpacity>
            </TouchableOpacity>
            <View style={styles.pausedText}>
                <Text
                    style={{
                        fontSize: 12,
                        textAlign: "center",
                    }}
                >
                    Paused for:{" "}
                    {isInitial
                        ? "00:00"
                        : isContinue
                          ? formatSeconds(timer?.data?.[0]?.pausedTotal)
                          : formatSeconds(seconds)}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    debugBorder: {
        borderWidth: 1,
        borderColor: "black",
    },
    timerContainer: {
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        aspectRatio: 1 / 1,
        width: 140,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: "100%",
    },
    stopCircle: {
        marginTop: 8,
        aspectRatio: 1 / 1,
        width: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: "100%",
    },
    pausedText: {
        marginTop: 20,
        paddingVertical: 2,
        paddingHorizontal: 10,
        alignSelf: "center",
        borderRadius: 18,
        backgroundColor: "#EBEBEB",
    },
});
