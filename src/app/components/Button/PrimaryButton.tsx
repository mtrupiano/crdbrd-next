// interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

// }

export default function PrimaryButton({
  ...props
}: Readonly<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      {...props}
      className="cursor-pointer text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-steel-blue-700 hover:bg-steel-blue-900 focus:ring-2 focus:ring-steel-blue-800 focus:outline-hidden"
    />
  );
}
