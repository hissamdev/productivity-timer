import { Text, TouchableOpacity } from "react-native";

type Props = {
    label: string;
};
export default function TimerBox({ label }: Props) {
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                height: 60,
                backgroundColor: "#e1e1e1",
                borderRadius: 5,
            }}
        >
            <Text style={{ margin: "auto" }}>{label}</Text>
        </TouchableOpacity>
    );
}
