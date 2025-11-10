type Props = {
  setCurrentIndex: any;
  currentIndex: any;
};
export const ButtonForward = ({ setCurrentIndex, currentIndex }: Props) => {
  return (
    <div>
      {currentIndex < 2 && (
        <button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          className="text-[#FAFAFA] font-medium text-[14px] cursor-pointer"
        >
          <div className="bg-[#E4E4E7] w-[416px] h-9 px-8 border-2 rounded-[6px] flex justify-center items-center cursor-pointer">
            Let's Go
          </div>
        </button>
      )}
    </div>
  );
};
