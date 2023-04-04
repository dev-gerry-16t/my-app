import Counter from "../views/Counter/Counter";
import TemperatureTransform from "../views/Temperature/TemperatureTransform";
import ImageCarousel from "../views/Image/ImageCarousel";
import ToDo from "../views/ToDo/ToDoWork";
import APINBA from "../views/NBA/ApiNba";

const RoutesPages = [
  {
    title: "Counter",
    path: "contador",
    component: Counter,
  },
  {
    title: "TemperatureConverter",
    path: "temperatura",
    component: TemperatureTransform,
  },
  {
    title: "ImageCarousel",
    path: "carousel",
    component: ImageCarousel,
  },
  {
    title: "To-Do",
    path: "tareas",
    component: ToDo,
  },
  {
    title: "API-NBA",
    path: "nbaInfo",
    component: APINBA,
  },
];

export default RoutesPages;
