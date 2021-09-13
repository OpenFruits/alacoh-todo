import type { NextPage } from "next";
import { useCallback, useState } from "react";
import { Layout } from "src/components/layout";
import { styled } from "../styles/stitches.config";

const Headline = styled("h2", {
  color: "$teal11",
});

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const inputText = useCallback((e) => setText(e.target.value), [setText]);
  console.log(text);

  const submit = () => {
    setText("");
  };

  return (
    <Layout>
      <div>
        <Headline>INPUT</Headline>
        <input type="text" onChange={inputText} />
        <button onChange={submit}>Add</button>
      </div>
      <div>
        <Headline>TODAY&apos;S TODO</Headline>
        <ol>
          <li>task1</li>
          <li>task2</li>
          <li>task3</li>
        </ol>
      </div>
      <div>
        <Headline>NEXT DAY</Headline>
        <ul>
          <li>task1</li>
          <li>task2</li>
          <li>task3</li>
        </ul>
      </div>
      <div>
        <Headline>LATER</Headline>
        <ul>
          <li>foo</li>
          <li>bar</li>
          <li>baz</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
