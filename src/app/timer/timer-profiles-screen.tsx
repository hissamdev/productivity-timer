import { useProfileStore } from "@/components/state-management/useProfileStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function GroupedTimersScreen() {
    const router = useRouter();
    const { profiles, createProfile } = useProfileStore();
    const [createState, setCreateState] = useState("Create Group");

    const callCreateProfile = () => {
        const res = createProfile();
        if (!res) setCreateState("Failed, try again");
    };

    return (
        <View>
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
                        key={profile.id}
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
                <TouchableOpacity
                    onPress={callCreateProfile}
                    style={{
                        height: 50,
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#e1e1e1",
                    }}
                >
                    <Text>{createState}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
