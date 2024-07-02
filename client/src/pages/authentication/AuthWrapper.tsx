import PropTypes from "prop-types"; // prop-types 라이브러리를 가져옵니다. prop 유효성을 검사하기 위해 사용됩니다.
import { Box, Grid } from "@mui/material"; // Material-UI에서 Box와 Grid 컴포넌트를 가져옵니다.

// 프로젝트 내부 컴포넌트
import AuthCard from "./AuthCard"; // AuthCard 컴포넌트를 가져옵니다. 이 컴포넌트는 인증 카드를 감싸는 컨테이너 역할을 합니다.
import Logo from "@/components/Logo/Logo";

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

// AuthWrapper 컴포넌트를 선언합니다.
const AuthWrapper = ({ children }) => (
    <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
        }}
    >
        <Grid
            container
            justifyContent="center" // 자식 요소들을 가운데로 정렬합니다.
            alignItems="center" // 자식 요소들을 수직 방향으로 가운데로 정렬합니다.
            // sx={{
            //     minHeight: "100vh", // 컨테이너의 최소 높이를 화면 전체 높이로 설정합니다.
            // }}
        >
            <Grid>
                <Grid container alignItems="center" justifyContent="center">
					<Box sx={{pb: "1rem"}}>
						<Logo width={250} />
					</Box>
                </Grid>
                <AuthCard>{children}</AuthCard>{" "}
                {/* 인증 카드를 표시하고, children을 전달합니다. */}
            </Grid>
        </Grid>
    </Box>
);

// props 유효성 검사를 위해 propTypes를 설정합니다.
AuthWrapper.propTypes = {
    children: PropTypes.node, // children prop의 데이터 타입을 지정합니다.
};

export default AuthWrapper; // AuthWrapper 컴포넌트를 기본 내보내기로 설정합니다.
