import type { ReactNode } from "react";

type IPhone15Props = {
  children: ReactNode;
  label: string;
};

export function IPhone15({ children, label }: IPhone15Props) {
  return (
    <div className="relative mx-auto w-[280px] px-2" aria-label={label}>
      <span className="absolute top-[92px] left-0 z-20 h-5 w-[3px] rounded-l-sm bg-zinc-500" />
      <span className="absolute top-[122px] left-0 z-20 h-9 w-[3px] rounded-l-sm bg-zinc-500" />
      <span className="absolute top-[164px] left-0 z-20 h-9 w-[3px] rounded-l-sm bg-zinc-500" />
      <span className="absolute top-[148px] right-0 z-20 h-14 w-[3px] rounded-r-sm bg-zinc-400" />
      <div className="relative rounded-[2.7rem] bg-[linear-gradient(160deg,#9a9aa0_0%,#3a3a3e_22%,#141416_48%,#6a6a70_78%,#1c1c1f_100%)] p-[3px] shadow-2xl shadow-emerald-500/10">
        <div className="h-[568px] rounded-[2.55rem] bg-black p-[10px]">
          <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-black">
            <div className="pointer-events-none absolute top-3 left-1/2 z-20 flex h-[28px] w-[108px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2.5 ring-1 ring-zinc-800">
              <span className="size-[7px] rounded-full bg-[#141416] ring-1 ring-zinc-700" />
            </div>
            {children}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-tr from-transparent to-white/5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
