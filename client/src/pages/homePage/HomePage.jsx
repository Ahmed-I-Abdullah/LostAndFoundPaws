import CoolImage from "../../sharedStyles/CoolImage.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMap } from "@fortawesome/free-solid-svg-icons";
import { rgba } from "polished";
import Toggle from "../../components/Toggle/Toggle";
import theme from "../../theme/theme";

const viewTypeOptions = [
  {
    label: "List View",
    icon: <FontAwesomeIcon icon={faList} />,
    color: rgba(theme.palette.primary.main, 0.3),
  },
  {
    label: "Map View",
    icon: <FontAwesomeIcon icon={faMap} />,
    color: rgba(theme.palette.primary.main, 0.3),
  },
];

const HomePageTemp = () => {
  const navigate = useNavigate();
  const initialIndex = 0;

  const handleToggle = (index) => {
    const view = viewTypeOptions[index].label;
    if (view === "List View") {
      navigate("/");
    } else if (view === "Map View") {
      navigate("/mapView");
    }
  };

  return (
    <div>
      <div className="toggle">
        <Toggle
          options={viewTypeOptions}
          onToggleCallback={handleToggle}
          initialIndex={initialIndex}
        />
      </div>
      <div>TODO Add list/map/sightings view here</div>
      <div>
        <img
          src={CoolImage}
          alt="Logo"
          style={{ width: "40%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default HomePageTemp;
