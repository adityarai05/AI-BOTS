'use client';
import { useState } from 'react';
import type { JSX, ComponentProps } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Transform {
	x: number;
	y: number;
	rotationZ: number;
}

const transforms: Transform[] = [
	{ x: -0.8, y: -0.6, rotationZ: -29 },
	{ x: -0.2, y: -0.4, rotationZ: -6 },
	{ x: -0.05, y: 0.1, rotationZ: 12 },
	{ x: -0.05, y: -0.1, rotationZ: -9 },
	{ x: -0.1, y: 0.55, rotationZ: 3 },
	{ x: 0, y: -0.1, rotationZ: 9 },
	{ x: 0, y: 0.15, rotationZ: -12 },
	{ x: 0, y: 0.15, rotationZ: -17 },
	{ x: 0, y: -0.65, rotationZ: 9 },
	{ x: 0.1, y: 0.4, rotationZ: 12 },
	{ x: 0, y: -0.15, rotationZ: -9 },
	{ x: 0.2, y: 0.15, rotationZ: 12 },
	{ x: 0.8, y: 0.6, rotationZ: 20 },
];

type TextDisperseProps = ComponentProps<'div'> & {
	/** children should be string (max 13 chars) */
	children: string;
	onHover?: (isActive: boolean) => void;
};

export function TextDisperse({
	children,
	onHover,
	className,
	...props
}: Omit<TextDisperseProps, 'onMouseEnter' | 'onMouseLeave'>) {
	const [isAnimated, setIsAnimated] = useState(false);

	const splitWord = (text: string) => {
		const words = text.split(' ');
		let charIndex = 0;
		return words.map((word, wordIdx) => (
			<span key={wordIdx} className="flex flex-row items-center">
				{word.split('').map((char) => {
					const index = charIndex++;
					return (
						<motion.span
							custom={index}
							variants={{
								open: (i: number) => ({
									x: transforms[i % transforms.length].x + 'em',
									y: transforms[i % transforms.length].y + 'em',
									rotateZ: transforms[i % transforms.length].rotationZ,
									transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
									zIndex: 1,
								}),
								closed: {
									x: 0,
									y: 0,
									rotateZ: 0,
									transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
									zIndex: 0,
								},
							}}
							animate={isAnimated ? 'open' : 'closed'}
							key={index}
						>
							{char}
						</motion.span>
					);
				})}
				{wordIdx < words.length - 1 && (
					<span className="w-[0.25em] inline-block">&nbsp;</span>
				)}
			</span>
		));
	};

	const manageMouseEnter = () => {
		onHover?.(true);
		setIsAnimated(true);
	};

	const manageMouseLeave = () => {
		onHover?.(false);
		setIsAnimated(false);
	};

	return (
		<div
			className={cn(
				"relative flex flex-wrap justify-center items-center",
				className,
			)}
			onMouseEnter={manageMouseEnter}
			onMouseLeave={manageMouseLeave}
			{...props}
		>
			{splitWord(children)}
		</div>
	);
}
