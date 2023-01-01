import { Action } from '.';
import { ActionViewAnimation } from './ActionView';
import { motion } from 'framer-motion';

interface BackgroundSource {
    uri: string;
    animation?: ActionViewAnimation;
}

interface BackgroundProps {
    src: string | BackgroundSource;
    durationMs?: number;
}

export function Background({ src, durationMs = 800 }: BackgroundProps) {
    const normalizedSource = typeof src === 'object' ? src : { uri: src };

    return (
        <Action
            name="Background"
            // behavior={['skippable_timed', { durationMs }]}
            showUntil={(statement) => statement.actionName === 'Background'}
        >
            {(controls) => (
                <>
                    <motion.div
                        key={`${normalizedSource.uri}`}
                        variants={{
                            initial: { opacity: 0 },
                            entrance: {
                                opacity: 1,
                                transition: { duration: 1 },
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
                            src={normalizedSource.uri}
                            alt=""
                            className="absolute w-full"
                        />
                    </motion.div>
                </>
            )}
        </Action>
    );
}
