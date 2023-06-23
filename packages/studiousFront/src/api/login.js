import service from "./index";

export function login() {
  return service.get("/");
}
