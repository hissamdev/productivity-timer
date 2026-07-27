import { ReactNode, SetStateAction, useState } from "react";
import { Pressable } from "react-native";

type Props = {
    setShow: React.Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
};

export default function Modal({ setShow, children }: Props) {
    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [color, setColor] = useState("");

    return (
        <Pressable
            onPress={() => setShow(false)}
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
            <Pressable
                onPress={(e) => e.stopPropagation()}
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
                {children}
            </Pressable>
        </Pressable>
    );
}
