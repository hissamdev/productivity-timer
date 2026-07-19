import { useProfileStore } from "@/components/state-management/useProfileStore";
import { useRouter } from "expo-router";
import { EllipsisVertical } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const router = useRouter();
    const { profiles, createProfile } = useProfileStore();
    const [createState, setCreateState] = useState("Create Profile");

    const callCreateProfile = () => {
        const res = createProfile();
        if (!res) setCreateState("Failed, try again");
    };

    return (
        <ScrollView>
            <View style={{ marginTop: 40, marginHorizontal: 15 }}>
                <Text style={{ marginTop: 30, fontSize: 20 }}>
                    Timer Profiles
                </Text>
                <Text>Profiles of timers</Text>
                <View
                    style={{
                        marginTop: 20,
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
                                            "/timer/multiple-timers-screen",
                                        params: {
                                            groupId: profile.name,
                                        },
                                    })
                                }
                                style={{
                                    paddingVertical: 18,
                                    paddingHorizontal: 18,
                                    minHeight: 120,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderWidth: 1,
                                    borderColor: "#00000024",
                                    borderRadius: 6,
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 17,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {profile.name}
                                        </Text>
                                        {profile.desc && (
                                            <Text>{profile.desc}</Text>
                                        )}
                                    </View>
                                    <View>
                                        <EllipsisVertical
                                            size={18}
                                            style={{ marginRight: -5 }}
                                        />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Text style={{ fontSize: 12 }}>
                                        2 Timers Coding, Gaming
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            fontStyle: "italic",
                                        }}
                                    >
                                        Last Used: 05 mins ago
                                    </Text>
                                </View>
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
        </ScrollView>
    );
}
