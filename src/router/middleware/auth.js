export default function auth({ next, router }) {
  if (!localStorage.getItem("token")) {
    console.log(true);
    return router.push({ name: "login" });
  }

  return next();
}
