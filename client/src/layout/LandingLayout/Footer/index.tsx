import { useState } from "react";

import { useTheme } from '@mui/material/styles';
import { Container, Box, Grid, Link } from '@mui/material';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';


import footerLogo from '@assets/images/EVIDNET_LOGO.svg';
import SimpleModal from "@components/ui/SimpleModal";
import LanguageSelector from "./LangaugeSelector";

const cookieDescriptionButtonText = "Accept all";
const cookieDescriptionStyle = {
    position: "absolute",
    top: "92%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "white",
    boxShadow: 24,
    p: 1,
};

const cookiePolicyText = (
    <div
        dangerouslySetInnerHTML={{
            __html: `<h3>Cookie Policy</h3>
            <h4>What are cookies?</h4>
            When you visit a website such as uMotif.com, the website stores data in small files on your computer, known as cookies.
            Cookies are used to store information about you and your preferences, so that you don’t have to keep re-entering them, and improve your browsing experience.
            <h4>How do we use cookies?</h4>
            There are several different types of cookie:
            <h4>Strictly necessary cookies</h4>
            These cookies are essential to enable you to move around the website and use its features, such as accessing secure areas of the website.  Without these cookies, the services you have asked for cannot be provided.
            <h4>Examples of how we use strictly necessary cookies include:</h4>
            Session Cookies: A session cookie is stored in temporary memory and is not retained after the browser is closed.  Session cookies do not collect information from the user’s computer, and contain only a session identifier which is not personally identifiable.
            <h4>Authentication Cookies:</h4> If you register and authenticate (log in) to any of uMotif’s services you may receive authentication cookies these are used to securely maintain a logged-in state to one or more of our services and will usually expire after a period for your safety.  They contain no personally identifiable information.
            <h4>Performance cookies</h4>
            These cookies collect information about how visitors use a website, for instance, which pages visitors go to most often, and if they get error messages from web pages.  These cookies don’t collect information that identifies a visitor.  All information these cookies collect is aggregated and therefore anonymous. It is only used to improve how a website works.
            <h4>Examples of how we use functionality cookies include:</h4>
            <h4>Preference Cookies</h4>
            We may store non-personally identifiable preferences such as your preferred language choice so that we can display content in the correct language to you when you use our services.
            `,
        }}
    />
);

const cookiePolicyButtonText = "Close";
const cookiePolicyStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "white",
    boxShadow: 24,
    p: 1,
};

const LandingFooter = () => {
  const [isCookieDescriptionOpen, setIsCookieDescriptionOpen] = useState(false);
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);

  const handleCookieDescriptionOpen = () => {
    setIsCookieDescriptionOpen((prev) => !prev);
  };
  const handleCookiePolicyOpen = () => {
      setIsCookiePolicyOpen((prev) => !prev);
  };

  const cookieDescriptionText = (
    <div>
        The website uses technologies such as cookies to activate essential site features and use them for analysis,
        personalization, and target advertising purposes. You can change the settings at any time or leave the
        default settings as they are. You can close this banner if you want to continue using only required cookies.
        <span style={{ color: "blue", cursor: "pointer" }} onClick={handleCookiePolicyOpen}>
            Cookie Policy
        </span>
    </div>
);

  const theme = useTheme();

  const FooterLink = styled(Link)(({theme}) => ({
    color: theme.palette.common.white,
    fontSize:16,
    fontWeight: 600,
    display: 'flex',
    alignItems:'center'
  }));

	const SocialButton = styled(Link)(() => ({
		padding: "13px 13px 12px",
		border: "1px solid rgba(228, 219, 233, 0.25)",
		color: "#FFF",
		display: "flex",
		"&:hover": {
			borderColor: "rgba(228, 219, 233, 0.5)"
		}
	}));	


  return(
    <>
    <Box sx={{
        pt: "3rem",
        width: 1,
        minHeight: 180,
        alignItems: 'center',
        backgroundColor:"#111"
    }}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} sm={3} md={3} lg={2} gap={10}>
            <Link sx={{ maxWidth: "100%"}}>
				<img src={footerLogo} alt="evidnet" style={{width: "100%", maxWidth: "200px"}} />
			</Link>
          </Grid>
          <Grid item xs={12} sm={8} md={4} lg={4}>
            <Box sx={{width: 1, display: 'flex', gap: 3}}>
              <FooterLink href="support">Support</FooterLink>
              <FooterLink>Privacy</FooterLink>
              <FooterLink>Terms</FooterLink>
              <FooterLink onClick={handleCookieDescriptionOpen}>
                Cookie Policy
              </FooterLink>
            </Box>
            <Box sx={{width: 1, paddingTop: '10px'}}>
              <span style={{color: theme.palette.text.secondary}}>&#169; 2024 evidnet Inc. All Rights Reserved.</span>
            </Box>  
          </Grid>


          <Grid item container xs={12} sm={12} md={4} lg={5}
            alignItems="center" 
            spacing={2}
            sx={{
                justifyContent: {
                    xs: "flex-start",
                    md: "flex-end",
                    lg: "flex-end"
                },
                mt: {
                    xs: "0.5rem",
                    md: "0"
                },
                mb: {
                    xs: "1.5rem",
                    md: "0"
                }
            }}
          >
			<Grid item container xs="auto" spacing={1}
                sx={{
                    justifyContent: {
                        xs: "flex-start",
                        md: "flex-end"
                    },
                    pt:0
                }}
            >
				<Grid item sx={{pt:0}}>
                    <SocialButton>
                        <FacebookIcon></FacebookIcon>
                    </SocialButton>
				</Grid>
				<Grid item sx={{pt:0}}>
                    <SocialButton>
                        <InstagramIcon></InstagramIcon>
                    </SocialButton> 
				</Grid>
				<Grid item sx={{pt:0}}>
                    <SocialButton>
                        <XIcon></XIcon>
                    </SocialButton>
				</Grid>
			</Grid>
			<Grid item xs={4} md={6} sx={{p:0}}>
				<LanguageSelector />
			</Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <SimpleModal
        text={cookieDescriptionText}
        isOpen={isCookieDescriptionOpen}
        handleOpen={handleCookieDescriptionOpen}
        handleClick={handleCookieDescriptionOpen}
        style={cookieDescriptionStyle}
        buttonText={cookieDescriptionButtonText}
    />
    <SimpleModal
        text={cookiePolicyText}
        isOpen={isCookiePolicyOpen}
        handleOpen={handleCookiePolicyOpen}
        handleClick={handleCookiePolicyOpen}
        style={cookiePolicyStyle}
        buttonText={cookiePolicyButtonText}
    />
    </>
  )
}

export default LandingFooter;