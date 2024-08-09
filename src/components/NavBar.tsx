import React from "react"
import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import { styled } from "@mui/material/styles"

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  "&.active": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
}))

const NavBar: React.FC = () => {
  const location = useLocation()

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FMSCA Dashboard
        </Typography>
        <StyledButton
          className={location.pathname === "/fmsca-viewer" ? "active" : ""}
          component={Link}
          to="/fmsca-viewer"
        >
          Table View
        </StyledButton>
        <StyledButton
          className={
            location.pathname === "/fmsca-viewer/pivot" ? "active" : ""
          }
          component={Link}
          to="/fmsca-viewer/pivot"
        >
          Pivot Table View
        </StyledButton>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar