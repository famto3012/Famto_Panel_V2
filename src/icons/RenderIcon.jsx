import { useState, useEffect } from "react";
import * as Icons from "./Icons";
import { SkeletonCircle } from "@/components/ui/skeleton";

const RenderIcon = ({ iconName, size, loadingSize }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;
  const IconComponent = Icons[iconName];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading && attempts < maxAttempts) {
        setAttempts((prev) => prev + 1);
      } else if (attempts >= maxAttempts) {
        setIsLoading(false);
        setError(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoading, attempts]);

  useEffect(() => {
    if (IconComponent) {
      setIsLoading(false);
    }
  }, [IconComponent]);

  return (
    <>
      {isLoading ? (
        <SkeletonCircle size={6} />
      ) : error ? (
        <div className="w-5 h-5 rounded-full bg-gray-500"></div>
      ) : IconComponent ? (
        <IconComponent size={size} />
      ) : (
        <div className="w-5 h-5 rounded-full bg-gray-500"></div>
      )}
    </>
  );
};

export default RenderIcon;
