// interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

// }

export default function SecondaryButton({
  ...props
}: Readonly<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      {...props}
      className="cursor-pointer text-steel-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-transparent ring-1 ring-steel-blue-800 hover:bg-gray-50 hover:ring-steel-blue-500 focus:ring-2 focus:ring-steel-blue-400 focus:outline-hidden"
    />
  );
}
