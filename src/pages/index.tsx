// import dynamic from 'next/dynamic';

// const Game = dynamic(
//     () => import('src/components/Game').then((component) => component.Game),
//     { ssr: false }
// );

// export default Game;

import { TestGame } from 'src/components/TestGame';

export default TestGame;
