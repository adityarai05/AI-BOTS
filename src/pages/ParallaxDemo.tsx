'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import Lenis from 'lenis'
import { ZoomParallax } from "@/components/ui/zoom-parallax";

export default function ParallaxDemo() {

	React.useEffect( () => {
        const lenis = new Lenis()
       
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy();
        }
    },[])


	const images = [
		{
			src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Modern architecture building',
		},
		{
			src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Urban cityscape at sunset',
		},
		{
			src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Abstract geometric pattern',
		},
		{
			src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Mountain landscape',
		},
		{
			src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Minimalist design elements',
		},
		{
			src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Ocean waves and beach',
		},
		{
			src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Forest trees and sunlight',
		},
	];

	return (
		<main className="min-h-screen w-full bg-black text-white">
			<div className="relative flex h-[100vh] flex-col items-center justify-center text-center px-4">
				{/* Radial spotlight */}
				<div
					aria-hidden="true"
					className={cn(
						'pointer-events-none absolute top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full',
						'bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/.15),transparent_70%)]',
						'blur-[100px]',
					)}
				/>
				<h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
					Experience <span className="text-gradient">Depth.</span>
				</h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                    Scroll down to witness the immersive zoom parallax effect, powered by Framer Motion and Lenis.
                </p>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
                </div>
			</div>
			<ZoomParallax images={images} />
			<div className="h-[100vh] flex items-center justify-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-500">End of Journey</h2>
            </div>
		</main>
	);
}
