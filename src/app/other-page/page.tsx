import Link from "next/link";
import React from "react";

const AnotherPage = () => {
  return (
    <div>
      <button>
        <Link href="/">Go to Home</Link>
      </button>
      <br />
      I am a other page.
    </div>
  );
};

export default AnotherPage;
