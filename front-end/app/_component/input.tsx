"use client";

export const Input = ({
  placeholder,
  type,
}: {
  placeholder: string;
  type: string;
}) => {
  // const { text, type } = props;
  return (
    <div>
      <input
        name=""
        type={type}
        className="border-[#E4E4E7] border-2 w-[416px] px-3 py-0.5 h-9 rounded-[6px]"
        placeholder={placeholder}
      />
    </div>
  );
};
