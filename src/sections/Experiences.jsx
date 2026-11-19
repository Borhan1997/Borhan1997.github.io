import { Timeline } from "../components/Timeline";
import { experiences, education } from "../constants";
const Experiences = () => {
  return (
    <div id="work" className="w-full">
      <Timeline data={experiences} />
      <div id="education">
        <Timeline data={education} title="My Education" />
      </div>
    </div>
  );
};

export default Experiences;
