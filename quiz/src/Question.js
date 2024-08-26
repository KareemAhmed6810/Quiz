export default function Question({ questionNum, dispatch, ans }) {
  console.log('sssssssssssssss', questionNum);
  return (
    <div>
      <h4>{questionNum.question}</h4>
      {questionNum.options.map(function (options, idx) {
        return (
          <Item
            options={options}
            idx={idx}
            dispatch={dispatch}
            ans={ans}
            correctOption={questionNum.correctOption}
          />
        );
      })}
    </div>
  );
}
function Item({ options, idx, dispatch, ans, correctOption }) {
  return (
    <button
      className={`btn btn-option ${idx === ans ? 'answer' : ''}
      ${ans !== null ? (idx === correctOption ? 'correct' : 'wrong') : ''}`}
      // 3alshan lama el user ykhtar mara my8yrhash
      disabled={ans !== null}
      onClick={() => dispatch({ type: 'newAns', payload: idx })}
    >
      {options}
    </button>
  );
}
