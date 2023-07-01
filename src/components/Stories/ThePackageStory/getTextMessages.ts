import { MessageType } from './ScreenConversation';

const INITIAL_OLD_MSGS: Array<MessageType> = [
  {
    speaker: 'a',
    text: 'Hoy andube en Kabukichō, cada dos pasos hay alguien tratando de venderte cerveza xD'
  },
  { speaker: 'b', text: 'A saber cuanto tomaste hoy entonces jaja' },
  {
    speaker: 'a',
    text: 'Hay que hacele fuerzas para seguir viendo las tiendas jaja'
  },
  {
    speaker: 'a',
    text: 'Vieras la comida tambien, hay un carrito que te venden los cangrejos fritos... con todo y caparazón'
  },
  { speaker: 'a', text: '(ㆆ_ㆆ)' },
  { speaker: 'a', text: 'Y sin mentirte, son bien ricos xD' },
  { speaker: 'b', text: 'Nambe suena a que es quiebra dientes eso xD' },
  { speaker: 'a', text: 'Vieras que buenos' },
  { speaker: 'a', text: '( ͡° ͜ʖ ͡° )' },
  { speaker: 'a', text: 'Por cierto, ya te llegará el paquete, ¿no?' },
  { speaker: 'a', text: 'Me escribis tu reacción cuando ya lo tengas... c:' },
  {
    speaker: 'b',
    text: '¿Crees que hagán hoy la entrega? Queria ir al parque hoy en la noche...'
  }
];

const NEW_MSGS_1: Array<MessageType> = [
  {
    speaker: 'a',
    text: 'Si no llega hoy llegará hasta el lunes, me dijerón que no hacen entregas en los fines de semana.'
  }
];

const NEW_MSGS_2: Array<MessageType> = [
  { speaker: 'a', text: '¿Qué ondas?' },
  { speaker: 'a', text: '¿Ya fuerón por la muñeca?' },
  { speaker: 'b', text: 'Todavía no fijate.' },
  {
    speaker: 'a',
    text: 'Fijo si era para tí, y ahora estas maldito'
  },
  { speaker: 'a', text: '(ʘ‿ʘ)' },
  { speaker: 'b', text: 'Je, nombre' },
  { speaker: 'b', text: 'No bromeés así.' },
  {
    speaker: 'a',
    text: 'Nombe tranquí, talvez llego a tu velorio jaja'
  },
  { speaker: 'b', text: 'Deja de molestar hombe' },
  { speaker: 'b', text: 'ಠ~ಠ' },
  { speaker: 'a', text: 'jajaja' }
];

const NEW_MSGS_3: Array<MessageType> = [
  {
    speaker: 'b',
    text: 'Ahorita vino el repartido que dejo la muñeca'
  },
  {
    speaker: 'b',
    text: 'Pero solo dejo una nota y se volvio a ir...'
  },
  {
    speaker: 'a',
    text: '¿No le dijiste que te entregó algo por error?'
  },
  {
    speaker: 'b',
    text: 'No pude, cuando abrí la puerta ya se habia ido'
  },
  { speaker: 'a', text: '☉_☉' },
  { speaker: 'a', text: '¿Y que dice la nota?' },
  { speaker: 'b', text: 'Dice que no la haga enojar...' },
  {
    speaker: 'a',
    text: '¿Mmm?'
  },
  {
    speaker: 'a',
    text: '¿A quién? ¿A la muñeca?'
  },
  {
    speaker: 'b',
    text: 'Pues no se si se refiere a la muñeca, es mas ni se si era para acá la nota'
  },
  {
    speaker: 'b',
    text: 'Antes que abriera la puerta el man hizo un sonido extraño, creo que anda tomado'
  },
  {
    speaker: 'a',
    text: 'Bueno, es un viernes y ya es de noche, entonces como que tiene sentido...'
  },
  { speaker: 'a', text: 'Esperame... ¿Todavía tenes la muñeca?' },
  { speaker: 'a', text: '¿Nadie a ido a preguntar por ella?' },
  { speaker: 'b', text: 'Si, aquí la tengo...' },
  {
    speaker: 'a',
    text: '¿No seria mejor que sacaras esa muñeca al pasillo? Así la persona de quien es la mira (que capaz ni se acuerde de ella) y la agarre poe'
  },
  {
    speaker: 'b',
    text: 'Nombe, vaya y se la roban y despues viene el dueño a cobrarmela...'
  },
  { speaker: 'a', text: 'Eso si...' },
  {
    speaker: 'a',
    text: 'Pero si nadie viene vas a tener una nueva compañera de cuarto jajaja'
  },
  { speaker: 'b', text: 'Vaya hombe' },
  { speaker: 'b', text: 'ರ_ರ' }
];

export function getTextMessages(iteration: number) {
  switch (iteration) {
    case 0: {
      return { pastMessages: INITIAL_OLD_MSGS, newMessages: NEW_MSGS_1 };
    }

    case 1: {
      return {
        pastMessages: [...INITIAL_OLD_MSGS, ...NEW_MSGS_1],
        newMessages: NEW_MSGS_2
      };
    }

    case 2: {
      return {
        pastMessages: [...INITIAL_OLD_MSGS, ...NEW_MSGS_1, ...NEW_MSGS_2],
        newMessages: NEW_MSGS_3
      };
    }

    default:
      return { pastMessages: [], newMessages: [] };
  }
}
