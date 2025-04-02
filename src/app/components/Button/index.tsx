import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant, 'primary' or 'secondary'
   */
  variant: "primary" | "secondary";
}

export default function Button({ variant, ...props }: Readonly<ButtonProps>) {
  if (variant === "secondary") {
    return <SecondaryButton {...props} />;
  }

  return <PrimaryButton {...props} />;
}
