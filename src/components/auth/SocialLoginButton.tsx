import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
interface SocialLoginButtonProps {
  icon: LucideIcon;
  provider: string;
  onClick: () => void;
}

export function SocialLoginButton({
  icon: Icon,
  provider,
  onClick,
}: SocialLoginButtonProps) {
  const handleClick = () => {
    onClick();
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleClick}
        className="flex items-center justify-center gap-2"
      >
        <Icon size={20} />
        <span>{provider}</span>
      </Button>
    </>
  );
}
