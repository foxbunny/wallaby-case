const RESPONSES: any[] = [];

const mock = (response: any) => {
  RESPONSES.push(response);
};

const req = jest.fn((name: string) => {
  const nextResponse = RESPONSES.shift();
  return Promise.resolve(nextResponse);
});

export {mock};
export default req;
