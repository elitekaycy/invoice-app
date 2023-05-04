// check the url using the window api
// switch localhost to url name depending on the version used
// create the base api start

export const host =
  window?.location?.hostname == 'localhost'
    ? 'http://localhost:3000'
    : 'https://' + String(process.env.REACT_APP_PROD_HOST);
