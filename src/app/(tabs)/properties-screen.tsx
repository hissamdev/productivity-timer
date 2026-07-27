import { Plus, X } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Milestones() {
    const [showCreate, setShowCreate] = useState(false);

    return (
        <View>
            <View
                style={{
                    margin: 20,
                    position: "relative",
                    height: "100%",
                }}
            >
                <View
                    style={{
                        marginTop: 50,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setShowCreate((prev) => !prev)}
                        style={{
                            backgroundColor: "#4696FF",
                            borderRadius: 5,
                        }}
                    >
                        <Plus color="white" strokeWidth={1.3} size={20} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 21,
                        }}
                    >
                        Milestones
                    </Text>
                </View>
                <Text
                    style={{
                        marginTop: 10,
                        width: "80%",
                    }}
                >
                    Update your properties daily and reflect on historic data
                </Text>
            </View>
            {showCreate && (
                <View
                    onBlur={() => setShowCreate(false)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        zIndex: 20,
                        inset: 0,
                        paddingHorizontal: 20,
                        paddingVertical: 80,
                        height: "auto",
                    }}
                >
                    <View
                        style={{
                            padding: 20,
                            width: "100%",
                            height: "100%",
                            // borderWidth: 1,
                            // borderColor: "black",
                            borderRadius: 18,
                            backgroundColor: "white",
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 19,
                                    fontWeight: 600,
                                }}
                            >
                                Create Property
                            </Text>
                            <View>
                                <TouchableOpacity
                                    onPress={() => setShowCreate(false)}
                                    style={{
                                        padding: 5,
                                        flex: 0,
                                        borderWidth: 1,
                                        borderColor: "#94A3B8",
                                        borderRadius: 4,
                                    }}
                                >
                                    <X size={16} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}
