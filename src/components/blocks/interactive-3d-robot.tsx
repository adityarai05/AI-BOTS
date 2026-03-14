'use client';

import Spline from '@splinetool/react-spline';

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export function InteractiveRobotSpline({ scene = ROBOT_SCENE_URL, className }: InteractiveRobotSplineProps) {
  return (
    <Spline
      scene={scene}
      className={className} 
    />
  );
}
