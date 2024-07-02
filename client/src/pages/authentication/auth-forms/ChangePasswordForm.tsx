import { Container, Typography, Stack, OutlinedInput, Button } from "@mui/material";
import { useState } from "react";

const ChangePasswordForm = () => {
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');


  const handleChangePassword = (e) => {
	setPassword(e.target.value);
  }

  const handleChangeNewPassword = (e) => {
	setNewPassword(e.target.value);
  }


  return(
    <Container>
      <Typography variant="h4" gutterBottom>
        Change password
      </Typography>

      <Stack spacing={1} sx={{mb: 2}}>
        <Typography gutterBottom>
          Please enter a new password.
        </Typography>
        <Typography>
          After the change, go to the login screen.
        </Typography>
      </Stack>

      <Stack spacing={3} width={1}>
        <OutlinedInput
          id="password"
          type="password"
          value={password}
          name="password"
          onChange={handleChangePassword}
          placeholder="New Password"
          fullWidth
        />
         <OutlinedInput
          id="new-password"
          type="password"
          value={newPassword}
          name="new-password"
          onChange={handleChangeNewPassword}
          placeholder="New Password Confirm"
          fullWidth
        />
        <Button
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
        >
            Change Password
        </Button>
      </Stack>
    </Container>
  )
}

export default ChangePasswordForm;