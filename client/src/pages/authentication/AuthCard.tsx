// project import
import MainCard from '@components/MainCard'; // MainCard 컴포넌트를 가져옵니다.
import PropTypes from 'prop-types'; // prop-types를 가져옵니다.

// material-ui
import { Box } from '@mui/material'; // Box 컴포넌트를 가져옵니다.

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = (
    { children, ...other } // AuthCard 함수형 컴포넌트를 정의합니다.
) => (
    <MainCard // MainCard 컴포넌트를 렌더링합니다.
        sx={{
            // 스타일을 설정합니다.
            maxWidth: { xs: 400, lg: 600 }, // 최대 너비를 설정합니다.
            // margin: { xs: 2.5, md: 3 }, // 마진을 설정합니다.
            '& > *': {
                // 자식 요소에 스타일을 적용합니다.
                flexGrow: 1, // 자동으로 늘어나는 크기를 설정합니다.
                flexBasis: '50%', // 기본 크기를 설정합니다.
            },
        }}
        content={false} // 내용 속성을 설정합니다.
        {...other} // 다른 속성을 전달합니다.
        // border={false} // 테두리 속성을 설정합니다.
        // boxShadow // 박스 쉐도우 속성을 설정합니다.
    >
        <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>{' '}
        {/* 상자의 패딩을 설정하고 자식 컴포넌트를 렌더링합니다. */}
    </MainCard>
);

AuthCard.propTypes = {
    // 컴포넌트의 prop-types를 설정합니다.
    children: PropTypes.node, // children 속성의 prop-types를 설정합니다.
};

export default AuthCard; // AuthCard 컴포넌트를 내보냅니다.
