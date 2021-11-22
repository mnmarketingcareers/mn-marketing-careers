import React from "react";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
    <h1 className="aboutHeadline" >About</h1>

    <div className="aboutContainer">
      <div className="leftColumn">
        <p className="aboutParagraph">
          Minnesota Marketing Careers is a weekly email campaign that is curated
          by Marketing Consultant{" "}
          <a
            style={{ color: "black" }}
            href="https://eepurl.us2.list-manage.com/track/click?u=988880c6e24cb98ce8f81835c&id=90307bf3b4&e=96e0281bf4"
            target="_blank"
          >
            <b>Casey Tilli</b>
          </a>{" "}
          and Minnesota-based Recruiter
          <a
            style={{ color: "black" }}
            href="https://eepurl.us2.list-manage.com/track/click?u=988880c6e24cb98ce8f81835c&id=1f24c25d8e&e=96e0281bf4"
            target="_blank"
          >
            {" "}
            <b>Elizabeth Laukka</b>
          </a>.
          <br /><br />
          The purpose of this campaign is to help recruiters and employers spread of the word about open positions and to help job-seekers find roles.
        </p>
        </div>
        <div className="rightColumn">
        <img className="aboutImage" src="./images/aboutImage1.png" />
      </div>
    </div>
    </>
  );
}

export default AboutPage;
