export function FieldError({ messages }: { messages?: string[] }) {
  if (!messages || messages.length === 0) return null;

  return (
    <div className="mt-1.5 flex flex-col gap-0.5">
      {messages.map((message) => (
        <p key={message} className="text-[12px] text-[#B4304A]">
          {message}
        </p>
      ))}
    </div>
  );
}
