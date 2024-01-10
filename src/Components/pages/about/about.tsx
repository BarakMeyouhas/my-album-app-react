import { Container, Paper, Typography } from "@mui/material";
import "./about.css";

function About(): JSX.Element {
  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={6} className="About">
        <Typography
          align="center"
          gutterBottom
          variant="h4"
          className="about-heading"
        >
          About My Album App
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to My Photo Album App! This application allows you to organize
          and manage your photos in a simple and intuitive way.
        </Typography>
        <Typography variant="h5" gutterBottom className="feature-heading">
          Key Features:
        </Typography>
        <ul className="feature-list">
          <li>
            <Typography variant="body1">
              Explore and search images by search engine with filter options{" "}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Add photos with custom descriptions and categorize them.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              View photos organized by categories.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Edit photo details, including descriptions and categories.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">Delete unwanted photos.</Typography>
          </li>
        </ul>
        <Typography variant="h5" gutterBottom className="get-started-heading">
          How to Get Started:
        </Typography>
        <Typography variant="body1" paragraph className="get-started-text">
          To get started, navigate to the "Add Photo" section where you can
          input the image URL, add a description, and choose a category. Once
          your photos are added, you can view them organized by categories on
          the main page. The app provides options to edit photo details, such as
          descriptions and categories, ensuring that your collection stays
          well-organized. If you wish to remove any photos, use the delete
          option for a hassle-free experience. Additionally, the Explore
          component allows you to search for images and discover new additions
          to your album. Enjoy the simplicity and efficiency of My Photo Album
          App as you curate and cherish your memories.
        </Typography>
        <Typography variant="body1" paragraph>
          We hope you enjoy using My Photo Album App and find it helpful in
          managing your precious memories!
        </Typography>
        <Typography variant="h5" gutterBottom className="contact-heading">
          Contact Me:
        </Typography>
        <Typography variant="body1" paragraph className="contact-text">
          If you have any questions or feedback, feel free to contact me at
          barakm25@gmail.com. and my{" "}
          <a target="_blank" href="https://github.com/BarakMeyouhas">
            GitHub account
          </a>
        </Typography>
      </Paper>
    </Container>
  );
}

export default About;
