import { useEffect } from 'react';

const adjustAbsolutePosition = (ref) => {
    if (!ref?.current) return null;

    const childRect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    let newStyles = {
        top: '100%',
        bottom: 'auto',
        left: '0',
        right: 'auto'
    };

    // Nếu child bị tràn xuống dưới màn hình
    if (childRect.bottom > windowHeight) {
        if (childRect.top < childRect.height) {
            newStyles.top = '100%';
            newStyles.bottom = 'auto';
        } else {
            newStyles.top = 'auto';
            newStyles.bottom = `100%`; // Đẩy lên trên parent
        }

    }
    // Nếu child bị tràn ra khỏi màn hình bên phải
    if (childRect.right > windowWidth) {
        if (childRect.left < childRect.width) {
            newStyles.left = '0';
            newStyles.right = 'auto';
        } else {
            newStyles.left = 'auto';
            newStyles.right = '0';
        }
    }

    // Nếu child bị tràn ra khỏi màn hình bên trái
    if (childRect.left < 0) {
        newStyles.left = '0';
        newStyles.right = 'auto';
    }
    return newStyles;
};

const useAutoAdjustAbsolutePosition = (absoluteRef, isShow= null) => {
    useEffect(() => {
        const applyAbsolutePosition = () => {
            const newStyles = adjustAbsolutePosition(absoluteRef);
            if (newStyles) {
                Object.assign(absoluteRef.current.style, newStyles);
            }
        };

        if (isShow) {
            applyAbsolutePosition();
        }

        window.addEventListener('resize', applyAbsolutePosition);
        window.addEventListener('load', applyAbsolutePosition);

        // Clean up event listeners
        return () => {
            window.removeEventListener('resize', applyAbsolutePosition);
            window.removeEventListener('load', applyAbsolutePosition);
        };
    }, [absoluteRef, isShow]);
};

export default useAutoAdjustAbsolutePosition;