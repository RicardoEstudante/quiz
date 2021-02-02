import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

export const Bloco = styled.div`
  display: flex;
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: black;
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  };

  const handleChange = (eventInfo) => {
    setName(eventInfo.target.value);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>
          Quiz
        </title>
      </Head>

      <QuizContainer>

        <QuizLogo />

        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={handleSubmit}>
              <Input
                name="nomeDoUsuário"
                onChange={handleChange}
                placeholder="Nome"
                value={name}
              />

              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>

        <Footer />

      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/omariosouto" />
    </QuizBackground>
  );
}
