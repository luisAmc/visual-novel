import { Action } from '.';
import { ActionViewAnimation } from './ActionView';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CharacterSource {
    uri: string;
    side: 'left' | 'center' | 'right';
    animation?: ActionViewAnimation;
}

interface CharacterProps {
    srcs: Array<CharacterSource>;
}

export function Character({ srcs }: CharacterProps) {
    return (
        <Action
            name="Character"
            behavior={['skippable_timed', { durationMs: 100 }]}
            showUntil={(statement) => statement.actionName === 'Background'}
        >
            {(controls) => (
                <>
                    {srcs.map((src, index) => (
                        <motion.div
                            key={`${src.uri}_${index}`}
                            variants={{
                                initial: { opacity: 0 },
                                entrance: {
                                    opacity: 1,
                                    transition: { duration: 0.5 },
                                },
                                exit: {
                                    opacity: 0,
                                    transition: {
                                        delay: 1,
                                        duration: 0.5,
                                        ease: 'easeOut',
                                    },
                                },
                            }}
                            initial="initial"
                            animate={controls}
                            className="pointer-events-none absolute inset-0 flex"
                        >
                            <img
                                src={src.uri}
                                alt=""
                                className={clsx('absolute top-52 scale-150', {
                                    'left-20': src.side === 'left',
                                    'left-1/2': src.side === 'center',
                                    'right-20': src.side === 'right',
                                })}
                            />
                        </motion.div>
                    ))}
                </>
            )}
        </Action>
    );
}
