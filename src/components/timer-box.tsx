import { CodeXml } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
    label: string;
};
export default function TimerBox({ label }: Props) {
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
        } else {
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
            <CodeXml />
            <Text style={{ fontSize: 20 }}>{label}</Text>
            <TouchableOpacity
                onPress={() =>
                    setTimerState((prev) =>
                        prev === "initial"
                            ? "running"
                            : prev === "running"
                              ? "paused"
                              : "running",
                    )
                }
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
                <Text>{timerState}</Text>
            </TouchableOpacity>
        </View>
    );
}
