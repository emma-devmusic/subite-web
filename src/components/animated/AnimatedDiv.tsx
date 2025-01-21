'use client'
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

interface AnimatedDivProps {
    children: React.ReactNode;
    animationType?: "fade" | "slideLeftFade" | "slideRightFade";
}

const AnimatedDiv: React.FC<AnimatedDivProps> = ({
    children,
    animationType = "fadeIn",
}) => {
    const [ref, isVisible] = useIntersectionObserver(0.4);

    return (
        <div
            ref={ref as React.LegacyRef<HTMLDivElement>}
            className={`opacity-0 transition-all ${isVisible ? `animate-${animationType}In` : `animate-${animationType}Out`}`}
        >
            {children}
        </div>
    );
};

export default AnimatedDiv;