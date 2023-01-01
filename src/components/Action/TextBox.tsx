import { Action } from '.';
import { motion } from 'framer-motion';

interface TextBoxProps {
    durationMs?: number;
}

export function TextBox({ durationMs = 50 }: TextBoxProps) {
    return (
        <Action
            name="TextBox"
            behavior={['skippable_timed', { durationMs }]}
            showUntil={(statement) =>
                statement.actionName === 'TextBox' ||
                statement.actionName === 'ClearTextBox'
            }
        >
            {(controls) => (
                <motion.div
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
                    <div className="absolute inset-x-4 bottom-4 h-52 rounded-md bg-slate-800/90"></div>
                </motion.div>
            )}
        </Action>
    );
}

export function ClearTextBox() {
    return (
        <Action
            name="ClearTextBox"
            behavior={['skippable_timed', { durationMs: 50 }]}
        >
            {(controls) => (
                <motion.div
                    variants={{
                        initial: { opacity: 0 },
                        entrance: {
                            opacity: 1,
                            transition: { duration: 0.5 },
                        },
                    }}
                    initial="initial"
                    animate={controls}
                ></motion.div>
            )}
        </Action>
    );
}
