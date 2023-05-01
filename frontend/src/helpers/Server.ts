// check the url using the window api
// switch localhost to url name depending on the version used
// create the base api start

const baseUrl = `${process.env.REACT_APP_DEV_HOST}:3000`;

export const host =
  window?.location?.hostname == 'localhost'
    ? baseUrl
    : String(process.env.REACT_APP_PROD_HOST);
