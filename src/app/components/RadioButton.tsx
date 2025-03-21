export default function RadioButton({
  label,
  id,
  name,
  inputValueName,
  defaultChecked,
}: ReadOnly<{
  label: string | React.ReactNode;
  id: string;
  name: string;
  inputValueName: string;
  defaultChecked: boolean;
}>) {
  return (
    <div className="flex items-center">
      <input
        defaultChecked={defaultChecked as boolean}
        type="radio"
        name={name}
        value={inputValueName}
        id={id}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 peer"
      />
      <label
        className="ms-2 text-sm font-medium text-gray-500 peer-checked:text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
