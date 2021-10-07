export default function dragEndHandler(event) {
  event.target.style.opacity = "";
  event.target.style.cursor = "grab";
}
