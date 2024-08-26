import { useEffect, useReducer } from 'react';
import './index.css';
import Header from './Header';
import Error from './Error';
import Main from './Main';
import Loader from './Loader';
import Question from './Question';
import StartingScreen from './StartingScreen';
import NextButton from './NextButton';
import Progress from './progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';
const SECS_PER_QUESTION = 45;
let initialState = {
  ques: [],
  status: 'loading', // loading, error, ready, active, finished
  index: 0,
  ans: null,
  points: 0,
  secondsRemaining: null,
};

function reducer(curState, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...curState,
        ques: action.payload,
        status: 'ready',
        secondsRemaining: SECS_PER_QUESTION * curState.ques.length,
      };
    case 'Failed':
      return { ...curState, status: 'Error' };
    case 'start':
      return { ...curState, status: 'active' };
    case 'newAns':
      const questionScore = curState.ques[curState.index];

      return {
        ...curState,
        ans: action.payload,
        points:
          action.payload === questionScore.correctOption
            ? curState.points + questionScore.points
            : curState.points,
      };
    case 'nextQuestion':
      return { ...curState, index: curState.index + 1, ans: null };
    case 'finish':
      return { ...curState, status: 'finished' };
    case 'restart':
      return { ...initialState, status: 'ready', ques: curState.ques };
    case 'tick':
      return {
        ...curState,
        secondsRemaining: curState.secondsRemaining - 1,
        status: curState.secondsRemaining === 0 ? 'finished' : curState.status,
      };
    default:
      throw new Error('UNKNOWN ACTION');
  }
}

export default function App() {
  let msg = 'ssssss';
  const [state, dispatch] = useReducer(reducer, initialState);
  const numQuestions = state.ques.length;
  let maxPoints = state.ques.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    async function startQuiz() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        let data = await res.json();
        if (data) dispatch({ type: 'dataReceived', payload: data });
        console.log(data);
      } catch (err) {
        dispatch({ type: 'Failed' });
      }
    }
    startQuiz();
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {state.status === 'loading' && <Loader />}
        {state.status === 'Error' && <Error />}
        {state.status === 'ready' && (
          <StartingScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {state.status === 'active' && (
          <>
            <Progress
              index={state.index}
              numQuestions={numQuestions}
              points={state.points}
              maxPoints={maxPoints}
            />

            <Question
              questionNum={state.ques[state.index]}
              dispatch={dispatch}
              ans={state.ans}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={state.secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={state.ans}
                index={state.index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {state.status === 'finished' && (
          <FinishScreen
            points={state.points}
            maxPossiblePoints={maxPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
