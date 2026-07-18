import { useProfileStore } from "@/components/state-management/useProfileStore";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function GroupedTimersScreen() {
    const router = useRouter();
    const { profiles } = useProfileStore();

    return (
        <View>
            <Text>Hi</Text>
            <View
                style={{ display: "flex", flexDirection: "row", gap: 5 }}
            ></View>
            <View
                style={{
                    margin: 10,
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                }}
            >
                {profiles.map((profile) => (
                    <TouchableOpacity
                        key={profile.name}
                        onPress={() =>
                            router.push({
                                pathname:
                                    "/timer/group-of-timers/timers-screen",
                                params: {
                                    groupId: profile.name,
                                },
                            })
                        }
                        style={{
                            height: 50,
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#e1e1e1",
                        }}
                    >
                        <Text>{profile.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
