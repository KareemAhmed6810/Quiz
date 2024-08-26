export default function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;
  console.log('NEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', index);
  if (index + 1 < numQuestions)
    return (
      <button
        className='btn btn-uni'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );
  else
    return (
      <button
        className='btn btn-uni'
        onClick={() => dispatch({ type: 'finish' })}
      >
        Submit
      </button>
    );
}
