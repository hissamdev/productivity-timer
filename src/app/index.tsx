import { useProfileStore } from "@/components/state-management/useProfileStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const router = useRouter();
    const { profiles, createProfile } = useProfileStore();
    const [createState, setCreateState] = useState("Create Profile");

    const callCreateProfile = () => {
        const res = createProfile();
        if (!res) setCreateState("Failed, try again");
    };

    return (
        <View style={{ margin: 10 }}>
            <Text style={{ marginTop: 30, fontSize: 20 }}>Timer Profiles</Text>
            <View
                style={{
                    marginTop: 10,
                    display: "flex",
                    gap: 10,
                }}
            >
                {profiles.length === 0 ? (
                    <Text>No Profiles Found</Text>
                ) : (
                    profiles.map((profile) => (
                        <TouchableOpacity
                            key={profile.id}
                            onPress={() =>
                                router.push({
                                    pathname:
                                        "/timer/group-of-timers/timer-screen",
                                    params: {
                                        groupId: profile.name,
                                    },
                                })
                            }
                            style={{
                                height: 50,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "black",
                                borderRadius: 8,
                            }}
                        >
                            <Text>{profile.name}</Text>
                        </TouchableOpacity>
                    ))
                )}
                <TouchableOpacity
                    onPress={callCreateProfile}
                    style={{
                        height: 50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "black",
                        borderRadius: 8,
                    }}
                >
                    <Text>{createState}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
