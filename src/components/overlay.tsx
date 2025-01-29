import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useEffect } from "react";

const Section = (props: any) => {
    return (
        <section
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "2.5rem",
                alignItems: "center",
                opacity: props.opacity,
            }}
        >
            <div
                style={{
                    width: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        maxWidth: "24rem",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "0.5rem",
                            padding: "3rem 2rem",
                        }}
                    >
                        {props.children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Overlay = () => {
    const scroll = useScroll();
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        console.log("Overlay component mounted");
    }, []);

    useFrame(() => {
        const newOpacity = scroll.range(2 / 3, 1 / 3);
        console.log("Scroll range:", newOpacity);
        setOpacity(newOpacity);
    });

    return (
        <Scroll html>
            <div style={{ width: "100vw" }}>
                <Section opacity={opacity}>
                    <h1
                        style={{
                            fontWeight: "600",
                            fontFamily: "serif",
                            fontSize: "1.5rem",
                        }}
                    >
                        🤙 Call me maybe?
                    </h1>
                    <p style={{ color: "#6b7280" }}>
                        I'm very expensive but you won't regret it
                    </p>
                    <p
                        style={{
                            marginTop: "1.5rem",
                            padding: "0.75rem",
                            backgroundColor: "#e2e8f0",
                            borderRadius: "0.5rem",
                        }}
                    >
                        📞 <a href="tel:(+42) 4242-4242-424242">(+42) 4242-4242-424242</a>
                    </p>
                </Section>
            </div>
        </Scroll>
    );
};
