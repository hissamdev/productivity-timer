import { useProfileStore } from "@/components/state-management/useProfileStore";
import TimerBox from "@/components/timer-box";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

type RouteParams = {
    groupId: string;
};

export default function TimersScreen() {
    const { profiles } = useProfileStore();
    const params = useLocalSearchParams<RouteParams>();
    const currentProfile = profiles.find((p) => p.name === params.groupId);

    if (!currentProfile?.timers || currentProfile?.timers.length === 0) {
        return <Text>No Timers</Text>;
    }

    return (
        <View
            style={{
                marginVertical: "auto",
                marginHorizontal: 10,
                minHeight: "60%",
                display: "flex",
                flexDirection: "row",
                gap: 10,
                // borderColor: "black",
                // borderWidth: 2,
            }}
        >
            {currentProfile.timers.map((timer) => (
                <TimerBox key={timer.label} label={timer.label}></TimerBox>
            ))}
        </View>
    );
}
