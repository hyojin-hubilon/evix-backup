import { Grid } from "@mui/material";
import SupportForm from "./components/SupportForm";
import MainCard from "@components/MainCard";
const SupportPage = () => {
  return(
      <Grid container alignItems="center" justifyContent="center" width={1}>
        <Grid item xs={12} sm={8} md={8} lg={6}>
          <MainCard  
            sx={{
              margin: { xs: 2.5, md: 3 }, // 마진을 설정합니다.
              "& > *": {
                  // 자식 요소에 스타일을 적용합니다.
                  flexGrow: 1, // 자동으로 늘어나는 크기를 설정합니다.
                  flexBasis: "50%", // 기본 크기를 설정합니다.
              },
              }}
            content={false} // 내용 속성을 설정합니다.
          >
            <SupportForm />
          </MainCard>
        </Grid>
      </Grid>
    
  )
}

export default SupportPage;