import { motion } from 'framer-motion';
import { Action } from '~/components/Action';

interface ScreenConversationProps {
  messages: Array<{
    speaker: 'a' | 'b';
    text: string;
  }>;
}

export function ScreenConversation({ messages }: ScreenConversationProps) {
  return (
    <Action name='ScreenText'>
      {(controls) => (
        <motion.div
          animate={controls}
          initial='initial'
          variants={{
            initial: { opacity: 0 },
            entrance: {
              opacity: 1,
              transition: { duration: 0.3 }
            },
            exit: {
              opacity: 0,
              transition: {
                duration: 0.1,
                ease: 'easeOut'
              }
            }
          }}
          className='absolute inset-0 h-full flex items-center justify-center bg-slate-800/80'
        >
          <div className='relative rounded-xl bg-gray-800/90 p-8 w-full max-w-[80%] h-[80%] overflow-auto flex flex-col-reverse gap-y-4'>
            {[...messages].reverse().map((msg, index) => (
              <>
                {index === 1 && (
                  <div className='w-full border-b text-center text-lg'>
                    <span className='transparent px-3 tracking-widest uppercase leading-10'>
                      Nuevos mensajes
                    </span>
                  </div>
                )}

                <motion.div
                  key={`msg-${index}`}
                  className='rounded-xl bg-gray-700 p-4 max-w-md text-4xl'
                  style={{
                    marginLeft: msg.speaker === 'a' ? 0 : 'auto',
                    marginRight: msg.speaker === 'b' ? 0 : 'auto'
                  }}
                >
                  {msg.text}
                </motion.div>
              </>
            ))}

            <div className='w-full border-b text-center text-lg'>
              <span className='transparent px-3 tracking-widest uppercase leading-10'>
                Inicio de los mensajes
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </Action>
  );
}
