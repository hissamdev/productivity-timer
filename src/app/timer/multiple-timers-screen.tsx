import { useProfileStore } from "@/components/state-management/useProfileStore";
import TimerBox from "@/components/timer-box";
import { useLocalSearchParams } from "expo-router";
import { Plus, Settings } from "lucide-react-native";
import { useState } from "react";
import {
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function TimersScreen() {
    const [showMenu, setShowMenu] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [editing, setEditing] = useState(false);
    const [timerLabel, setTimerLabel] = useState("");
    const params = useLocalSearchParams<{ groupId: string }>();
    // Get profile based on id
    const { profiles, createTimer } = useProfileStore();
    const currentProfile = profiles.find((p) => p.name === params.groupId);

    if (!currentProfile) {
        console.error("Profile was not found");
        return <Text>Error: Profile was not found</Text>;
    }

    const callCreateTimer = async (timerLabel: string) => {
        await createTimer(currentProfile.id, timerLabel);
    };

    if (currentProfile.timers.length === 0) {
        return (
            <View
                style={{ marginTop: 200, borderWidth: 1, borderColor: "black" }}
            >
                <Text>Create your first timer for this group</Text>
            </View>
        );
    }

    return (
        <View
            style={{
                marginTop: 50,
                marginHorizontal: 20,
                flex: 1,
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
                </View>

                <View
                    style={{
                        alignSelf: "flex-end",
                        position: "relative",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setShowMenu((prev) => !prev)}
                    >
                        <Settings />
                    </TouchableOpacity>
                    {showMenu && (
                        <View
                            style={{
                                position: "absolute",
                                top: 30,
                                right: 0,
                                paddingVertical: 10,
                                paddingHorizontal: 8,
                                width: 160,
                                zIndex: 20,
                                backgroundColor: "white",
                                boxShadow: "solid",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setEditing((prev) => !prev)}
                                style={{
                                    paddingVertical: 4,
                                    paddingHorizontal: 8,
                                    backgroundColor: "#f7f7f7",
                                    borderRadius: 4,
                                }}
                            >
                                <Text>Edit timer names</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
            <View
                style={{
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
            >
                {currentProfile.timers.map((timer) => (
                    <TimerBox
                        key={timer.id}
                        groupId={currentProfile.id}
                        timer={timer}
                        editing={editing}
                        setEditing={setEditing}
                    />
                ))}
            </View>

            <View style={{ position: "absolute", right: 20, bottom: 60 }}>
                {showCreate && (
                    <View
                        style={{
                            position: "absolute",
                            bottom: 60,
                            right: 0,
                            paddingVertical: 10,
                            paddingHorizontal: 30,
                            width: 230,
                            height: 140,
                            backgroundColor: "white",
                            borderRadius: 6,
                        }}
                    >
                        <Text>Timer Name</Text>
                        <TextInput
                            onChangeText={(text) => setTimerLabel(text)}
                            style={{
                                marginTop: 6,
                                borderWidth: 1,
                                borderColor: "#e1e1e1",
                            }}
                        />
                        <Pressable
                            onPress={() => callCreateTimer(timerLabel)}
                            style={{
                                marginTop: 12,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingVertical: 8,
                                backgroundColor: "lightblue",
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{}}>Done</Text>
                        </Pressable>
                    </View>
                )}
                <TouchableOpacity
                    onPress={() => setShowCreate((prev) => !prev)}
                    style={{
                        aspectRatio: 1 / 1,
                        width: 50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#10BFFF",
                        borderRadius: 18,
                    }}
                >
                    <Plus color="white" size={29} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
