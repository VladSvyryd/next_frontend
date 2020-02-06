import { Nav } from "../components/nav/Nav";
import fetch from "isomorphic-unfetch";
import { useState } from "react";
function HomePage({ pages }) {
  const [pageObject, set] = useState(pages.find(p => p.path === "home"));
  console.log(pageObject);
  return (
    <div>
      <h1>Welcome</h1>
      <Nav />
      <div>This is {pageObject.path}</div>
      <div>{pageObject.paragraph}</div>
      <div>
        {" "}
        {pageObject.picture.map(pic => (
          <div key={pic.id}>
            <img
              src={`http://localhost:1337${pic.url}`}
              style={{ width: "200px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
HomePage.getInitialProps = async () => {
  const res = await fetch("http://localhost:1337/pages");
  const json = await res.json();
  return { pages: json };
};
export default HomePage;
