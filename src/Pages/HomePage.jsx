import React from "react";
import Features from "../Components/Features";
import GetStartedButton from "../Components/GetStartedButton";


const HomePage = () => {
  return (
    <div>
      <section>
        <h1>Welcome to Smart Chama!</h1>
        <p>Automate, Organize, and Grow Your Chama with Ease.</p>
        <div>
          <p>
            Smart Chama is an easy-to-use platform that enables investment
            groups to efficiently manage their activities and finances. The
            solution empowers group administrators to track member
            contributions, manage loans, monitor fines, and keep accurate member
            records all in one place. With Smart Chama, your chama can save time
            on administration and focus on building wealth together.
          </p>
        </div>
        <div>
          <GetStartedButton />
        </div>
      </section>

     
      <section id="features">
        <Features />
      </section>
    </div>
  );
};

export default HomePage;
