import { Action } from '.';
import { ActionBaseAnimation } from './ActionView';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CharacterSource {
    uri: string;
    side?: 'left' | 'center' | 'right';
    animation?: ActionBaseAnimation;
}

interface CharacterProps {
    srcs: Array<CharacterSource>;
}

export function Character({ srcs }: CharacterProps) {
    return (
        <Action
            name="Character"
            behavior={['skippable_timed', { durationMs: 100 }]}
            showUntil={(statement) =>
                statement.actionName === 'Character' ||
                statement.actionName === 'ClearCharacter'
            }
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
                                className={clsx(
                                    'absolute top-52 scale-150',
                                    {
                                        'left-20': src.side === 'left',
                                        'left-1/2': src.side === 'center',
                                        'right-20': src.side === 'right',
                                    },
                                    !src.side &&
                                        'left-0 right-0 ml-auto mr-auto'
                                )}
                            />
                        </motion.div>
                    ))}
                </>
            )}
        </Action>
    );
}

export function ClearCharacter() {
    return (
        <Action
            name="ClearCharacter"
            behavior={['skippable_timed', { durationMs: 100 }]}
        >
            {(controls) => (
                <motion.div
                    variants={{
                        initial: { opacity: 0 },
                        entrance: {
                            opacity: 1,
                            transition: { duration: 1 },
                        },
                    }}
                    initial="initial"
                    animate={controls}
                ></motion.div>
            )}
        </Action>
    );
}
