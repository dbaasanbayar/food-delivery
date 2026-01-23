type Props = {
  setCurrentIndex: (index: number) => void;
  currentIndex: number;
};
export const ButtonForward = ({ setCurrentIndex, currentIndex }: Props) => {
  return (
    <div className="w-full">
      {currentIndex < 2 && (
        <button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          className="font-medium w-full h-10 bg-[#18181B] text-[#FAFAFA] border-2 border-transparent rounded-[6px] flex justify-center items-center cursor-pointer transition-all hover:bg-[#27272a] active:scale-[0.98]"
        >
          <span className="font-medium text-base">Let's Go</span>
        </button>
      )}
    </div>
  );
};
