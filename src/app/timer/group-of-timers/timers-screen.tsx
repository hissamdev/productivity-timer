import TimerBox from "@/components/timer-box";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

type RouteParams = {
    timers: string;
};

type Timers = {
    label: string;
}[];

export default function TimersScreen() {
    const params = useLocalSearchParams<RouteParams>();
    const timers: Timers = JSON.parse(params.timers);
    if (!timers || timers.length === 0) {
        return <Text>No Timers</Text>;
    }

    return (
        <View
            style={{
                marginVertical: "auto",
                marginHorizontal: 30,
                minHeight: "60%",
                display: "flex",
                flexDirection: "row",
                gap: 8,
                // borderColor: "black",
                // borderWidth: 2,
            }}
        >
            {timers.map((timer) => (
                <TimerBox key={timer.label} label={timer.label}></TimerBox>
            ))}
        </View>
    );
}
