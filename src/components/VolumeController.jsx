import Knob from '@/components/Knob';

export default function VolumeController() {
  return (
    <div className="flex flex-col items-center justify-center border-dotted rounded-xl border-[#0CA789] border-4 px-4 py-2 gap-1">
      <h1 className="font-semibold text-lg text-slate-950 mb-1">Master</h1>
      <Knob
        theme="master"
        label="Volume"
        valueDefault={0.5}
        valueMin={0}
        valueMax={1}
        stepFn={(value) => 0.05} //these are for keyboard input
        stepLargerFn={(value) => 0.1} //these are for keyboard input
        valueRawDisplayFn={(value) => `${(value * 100).toFixed(0)}%`}
        orientation={"vertical"}
      />
    </div>
  );
}
