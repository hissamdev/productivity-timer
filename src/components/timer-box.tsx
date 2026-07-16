import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
    label: string;
};
export default function TimerBox({ label }: Props) {
    const [running, setRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (running && !timerRef.current) {
            timerRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [running]);

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
            <Text style={{ fontSize: 20 }}>{label}</Text>
            <TouchableOpacity
                onPress={() => setRunning((prev) => !prev)}
                style={{
                    height: 100,
                    backgroundColor: "#e1e1e1",
                    borderRadius: 5,
                }}
            >
                <Text>{seconds}</Text>
                <Text>{formatSeconds(seconds)}</Text>
            </TouchableOpacity>
        </View>
    );
}
