export default function ToggleSwitch({ checked, onChange }) {
  return (
    <div className="flex items-center gap-2">
    <div
      className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
        checked ? 'bg-white' : 'bg-gray-300'
      }`}
      onClick={() => onChange(!checked)}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
          checked ? 'translate-x-6 bg-[#29ac79]' : 'bg-[#DA0063]'
        }`}
      ></div>
    </div>
  </div>

  )
}