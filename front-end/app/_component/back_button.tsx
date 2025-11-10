type Props = {
  setCurrentIndex: any;
  currentIndex: any;
};
export const ButtonBackWard = ({ setCurrentIndex, currentIndex }: Props) => {
  return (
    <div>
      {currentIndex > 0 && (
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="cursor-pointer"
        >
          <div className="border  w-fit px-4 py-2 rounded-[6px] cursor-pointer">
            <img src="/images/chevron-left.png" alt="" />
          </div>
        </button>
      )}
    </div>
  );
};
