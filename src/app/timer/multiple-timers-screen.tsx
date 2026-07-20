import { useProfileStore } from "@/components/state-management/useProfileStore";
import TimerBox from "@/components/timer-box";
import { useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function TimersScreen() {
    const { profiles, createTimer } = useProfileStore();
    const params = useLocalSearchParams<{ groupId: string }>();
    const currentProfile = profiles.find((p) => p.name === params.groupId);
    if (!currentProfile) {
        console.error("Profile was not found");
        return <Text>Error: Profile was not found</Text>;
    }

    const callCreateTimer = async () => {
        await createTimer(currentProfile.id);
    };

    if (currentProfile.timers.length === 0) {
        return (
            <View
                style={{ marginTop: 200, borderWidth: 1, borderColor: "black" }}
            >
                <TouchableOpacity onPress={callCreateTimer}>
                    <Text>Create timer</Text>
                </TouchableOpacity>
            </View>
        );
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
                <TimerBox
                    key={timer.id}
                    label={timer.label}
                    timerId={timer.id}
                />
            ))}
        </View>
    );
}
