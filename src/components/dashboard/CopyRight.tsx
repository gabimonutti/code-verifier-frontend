import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export const Copyright = (props:any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" { ...props }>
            { "CopyRight © "}
            <Link color="inherit" href="https://github.com/gabimonutti">
                Gabriel's Repo 
            </Link>{" "}
            { new Date().getFullYear() }
        </Typography>
    )
}