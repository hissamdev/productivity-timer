import { useProfileStore } from "@/components/state-management/useProfileStore";
import TimerBox from "@/components/timer-box";
import { useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function TimersScreen() {
    const params = useLocalSearchParams<{ groupId: string }>();
    // Get profile based on id
    const { profiles, createTimer } = useProfileStore();
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
                marginTop: 100,
                marginHorizontal: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 14,
                    textTransform: "uppercase",
                    color: "#858585",
                    letterSpacing: 1.2,
                }}
            >
                Group of Timers
            </Text>
            <Text
                style={{
                    marginTop: 10,
                    fontSize: 22,
                }}
            >
                {currentProfile.name}
            </Text>
            <View
                style={{
                    marginTop: 20,
                }}
            >
                {currentProfile.timers.map((timer) => (
                    <TimerBox
                        key={timer.id}
                        groupId={currentProfile.id}
                        timer={timer}
                    />
                ))}
            </View>
        </View>
    );
}
