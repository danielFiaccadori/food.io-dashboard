import Lottie from "lottie-react";

function Placeholder({ animation, title, height = 50, width = 50 }) {
    return (
        <div className="text-center text-white mt-20 flex flex-col items-center justify-center h-64">
            <Lottie
                autoplay
                loop
                animationData={animation}
                style={{ height, width }}
            />
            {title && <p className="text-lg font-medium mt-4">{title}</p>}
        </div>
    );
}

export default Placeholder;