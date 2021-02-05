import Widget from '../Widget';

const ResultWidget = ({ results }) => (
  <Widget>
    <Widget.Header>
      Tela de resultado:
    </Widget.Header>

    <Widget.Content>
      <p>
        Você acertou
        {' '}
        {/* {results.reduce((soma, resultado) => {
          const isTrue = resultado === true;

          return isTrue ? soma + 1 : soma;
        }, 0)} */}

        {results.filter((result) => result).length}
        {' '}
        Perguntas
      </p>
      <ul>
        {results.map((result, index) => (
          <li key={`result__${result}`}>
            {' '}
            {index + 1}
            {' '}
            Resultado:

            {result === true ? ' Acertou' : ' Falhou'}
          </li>
        ))}
      </ul>
    </Widget.Content>
  </Widget>
);

export default ResultWidget;
