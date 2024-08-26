export default function Progress({ index, numQuestions, points, maxPoints }) {
  // console.log(points);
  return (
    <header className='progress'>
      <progress max={numQuestions} value={index}></progress>

      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
}
