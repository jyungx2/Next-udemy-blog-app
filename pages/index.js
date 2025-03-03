import { Fragment } from "react";

function HomePage() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts />;
    </Fragment>
  );
}
export default HomePage;

// 1) Hero => present ourselves
// 2) Featured Posts
