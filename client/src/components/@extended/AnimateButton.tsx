import PropTypes from 'prop-types';

// third-party
import { motion } from 'framer-motion';

// ==============================|| ANIMATION BUTTON ||============================== //

export default function AnimateButton({ children, type = 'scale' }) {
    switch (type) {
        case 'rotate': // 유료 버전에서만 사용 가능
        case 'slide': // 유료 버전에서만 사용 가능
        case 'scale': // 유료 버전에서만 사용 가능
        default:
            return (
                <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                    {children}
                </motion.div>
            );
    }
}

AnimateButton.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(['slide', 'scale', 'rotate']),
};
