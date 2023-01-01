import { Action } from '.';
import { motion } from 'framer-motion';

interface TextProps {
    speaker?: string;
    children: string;
}

export function Text({ speaker, children }: TextProps) {
    return (
        <Action name="Text">
            {(controls) => (
                <motion.div
                    variants={{
                        initial: { opacity: 0 },
                        entrance: {
                            opacity: 1,
                            transition: { duration: 0.3 },
                        },
                        exit: {
                            opacity: 0,
                            transition: {
                                duration: 0.1,
                                ease: 'easeOut',
                            },
                        },
                    }}
                    initial="initial"
                    animate={controls}
                    className="pointer-events-none absolute inset-0 flex"
                >
                    <div className="absolute inset-x-4 bottom-4 h-56 rounded-md bg-transparent">
                        {speaker && (
                            <div className="absolute -mt-7 flex items-center justify-center px-4 py-1 text-2xl font-bold text-white">
                                <div className="absolute h-full w-full rounded-md bg-slate-800/90"></div>
                                <div className="relative">{speaker}</div>
                            </div>
                        )}

                        <div className="h-full px-16 py-10 text-2xl leading-10 text-white">
                            {children}
                        </div>
                    </div>
                </motion.div>
            )}
        </Action>
    );
}
