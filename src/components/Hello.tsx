export interface HelloProps {
  name: string;
}

export function Hello({ name }: HelloProps) {
  return (
    <h2 className="text-2xl font-semibold text-gray-800">
      Hello, <span className="text-sky-600">{name}</span> 👋
    </h2>
  );
}