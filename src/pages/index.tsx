import type { NextPage } from 'next'
import { Layout } from 'src/components/layout';
import { styled } from '../styles/stitches.config';

const Headline = styled('h2', {
  color: "$teal11"
})

const Home: NextPage = () => {
  return (
    <Layout>
      <div>
        <Headline>INPUT</Headline>
        <input type="text" />
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
  )
}

export default Home
