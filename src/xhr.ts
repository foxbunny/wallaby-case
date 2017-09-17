const req = async (name: string) => {
  const resp = await fetch("/name", {
    body: JSON.stringify({name}),
    method: "POST",
  });
  return resp.text();
};

export default req;
