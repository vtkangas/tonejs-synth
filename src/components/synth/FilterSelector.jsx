import Selector from "@/components/Selector";
import { filters } from "@/config/index";
import "./synth.css";

export default function FilterSelector({ synthSettings, updateSynthSettings }) {
  const handleFilterChange = (id) => {
    console.log(id);
    updateSynthSettings({ ...synthSettings, filterType: id });
  };

  return (
    <Selector
      options={filters}
      selectedOption={synthSettings.filterType}
      onSelect={handleFilterChange}
      label="Type"
    />
  );
}
