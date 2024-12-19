import clsx from 'clsx';
import {mapFrom01Linear} from '@dsp-ts/math';

export function KnobBaseThumb({theme, value01}) {
  const angleMin = -145;
  const angleMax = 145;
  const angle = mapFrom01Linear(value01, angleMin, angleMax);
  return (
    <div
      className={clsx(
        'absolute h-full w-full rounded-full border-solid border-8 border-slate-950',
        theme === 'stone' && 'bg-stone-300',
        theme === 'pink' && 'bg-pink-300',
        theme === 'green' && 'bg-green-300',
        theme === 'sky' && 'bg-sky-300',
      )}
    >
      <div className='absolute h-full w-full' style={{rotate: `${angle}deg`}}>
        <div className='absolute left-1/2 top-0 h-1/2 w-[6px] -translate-x-1/2 rounded-sm bg-stone-950' />
      </div>
    </div>
  );
}