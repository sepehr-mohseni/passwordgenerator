import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/material';
export default function Footer() {
  return (
      <div
          style={{
              position: "absolute",
              bottom: 5
      }}
      >
          
          <Link
              underline="none"
              href="https://github.com/sepehr-mohseni/pass-gen"
          >
              <GitHubIcon
                  color="secondary"
                  fontSize="large"
              />
          </Link>
    </div>
  )
}
