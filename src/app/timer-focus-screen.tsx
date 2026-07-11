import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TimerFocusScreen() {
    const [second, setSecond] = useState(0);
    const [isRunning, setIsRunning] = useState<
        "initial" | "running" | "paused"
    >("initial");
    const timer = useRef<ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        if (isRunning === "running") {
            timer.current = setInterval(() => {
                setSecond((prev) => prev + 1);
            }, 1000);
        } else if (timer.current) {
            clearInterval(timer.current);
        }

        return () => {
            if (timer.current) clearInterval(timer.current);
        };
    }, [isRunning]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const sec = (seconds % 60).toString().padStart(2, "0");

        return `${mins}:${sec}`;
    };

    return (
        <TouchableOpacity
            onPress={() =>
                setIsRunning((prev) =>
                    prev === "paused" ? "running" : "paused",
                )
            }
            style={[
                {
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#2A2F33",
                },
            ]}
        >
            <View
                style={{
                    marginTop: 180,
                    padding: 4,
                    width: 261,
                    aspectRatio: 1,
                    backgroundColor: "white",
                    borderRadius: "100%",
                }}
            >
                <TouchableOpacity
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#2A2F33",
                        borderRadius: "100%",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 70,
                        }}
                    >
                        {isRunning === "initial" ? "Start" : formatTime(second)}
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Text>Start/Stop</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}
